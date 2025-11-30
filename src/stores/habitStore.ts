import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HabitRow, deleteHabit, listHabits, upsertHabit } from '@/src/features/habit/habitTable';
import {
  deleteLogForDate,
  insertLog,
  listLogsByHabit,
  todayDone as dbTodayDone,
} from '@/src/features/habit/logTable';
import { playError, playSuccess } from '@/src/core/sensory/SoundManager';
import { t } from '@/src/core/i18n/i18n';
import { getLocalDateKey } from '@/src/core/dateKey';

type HabitState = {
  habits: HabitRow[];
  today: Record<string, boolean>;
  logs: Record<string, string[]>; // date strings
  loading: boolean;
  error?: string;
  setError: (msg?: string) => void;
  loadAll: () => Promise<void>;
  saveHabit: (input: Omit<HabitRow, 'id' | 'createdAt'> & { id?: string }) => Promise<string>;
  removeHabit: (id: string) => Promise<void>;
  toggleToday: (habitId: string) => Promise<void>;
};

const todayStr = () => getLocalDateKey(new Date());

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      today: {},
      loading: false,
      logs: {},
      setError: (msg) => set({ error: msg }),
      loadAll: async () => {
        set({ loading: true, error: undefined });
        try {
          const todayKey = todayStr();
          const habits = await listHabits();
          const today = Object.fromEntries(
            await Promise.all(
              habits.map(async (h) => {
                const done = await dbTodayDone(h.id, todayKey);
                return [h.id, done] as const;
              }),
            ),
          );
          const logsEntries = await Promise.all(
            habits.map(async (h) => {
              const rows = await listLogsByHabit(h.id);
              return [h.id, rows.map((r) => r.date)] as const;
            }),
          );
          set({ habits, today, logs: Object.fromEntries(logsEntries), loading: false, error: undefined });
        } catch {
          playError();
          set({ loading: false, error: t('errorLoadFailed') });
        }
      },
      saveHabit: async (input) => {
        try {
          const id = await upsertHabit(input);
          await get().loadAll();
          set({ error: undefined });
          playSuccess();
          return id;
        } catch (err: any) {
          const msg =
            err instanceof Error && err.message === 'TITLE_REQUIRED'
              ? t('errorTitleRequired')
              : t('errorSaveFailed');
          set({ error: msg });
          playError();
          throw err;
        }
      },
      removeHabit: async (id: string) => {
        try {
          await deleteHabit(id);
          await get().loadAll();
          set({ error: undefined });
          playSuccess();
        } catch (_err) {
          set({ error: t('errorDeleteFailed') });
          playError();
          throw _err;
        }
      },
      toggleToday: async (habitId: string) => {
        try {
          const todayKey = todayStr();
          const current = get().today[habitId];
          const nowIso = new Date().toISOString();
          if (current) {
            await deleteLogForDate(habitId, todayKey);
          } else {
            await insertLog(habitId, todayKey, nowIso);
          }
          set((state) => ({
            today: { ...state.today, [habitId]: !current },
            logs: {
              ...state.logs,
              [habitId]: !current
                ? Array.from(new Set([...(state.logs[habitId] ?? []), todayKey]))
                : (state.logs[habitId] ?? []).filter((d) => d !== todayKey),
            },
            error: undefined,
          }));
        } catch (_err) {
          set({ error: t('errorToggleFailed') });
          playError();
          throw _err;
        }
      },
    }),
    {
      name: 'dotchain-habits',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ today: state.today, habits: state.habits, logs: state.logs }),
    },
  ),
);

// 日付ごとの達成数と最大レベル（＝習慣数）を返す
export const selectHeatmapIntensity = (state: HabitState) => {
  const counts: Record<string, number> = {};
  Object.values(state.logs).forEach((dates) => {
    dates.forEach((date) => {
      counts[date] = (counts[date] ?? 0) + 1;
    });
  });
  const maxLevel = state.habits.length || 1;
  return { counts, maxLevel };
};

// 「1日に1つでも習慣を達成した日」の連続日数（最大365日遡る）
export const selectStreak = (state: HabitState) => {
  const { habits, logs } = state;
  if (habits.length === 0) return 0;

  const hasAnyDoneOn = (dateKey: string) => habits.some((h) => logs[h.id]?.includes(dateKey));

  const today = new Date();
  let streak = 0;

  for (let offset = 0; offset < 365; offset++) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = getLocalDateKey(d);

    if (!hasAnyDoneOn(key)) break;
    streak += 1;
  }

  return streak;
};

// 「その日に存在していた習慣をすべて達成できた日」が何日あるか（通算）
export const selectAllDoneDays = (state: HabitState) => {
  const { habits, logs } = state;
  if (habits.length === 0) return 0;

  const createdKeyByHabit: Record<string, string> = {};
  for (const h of habits) {
    createdKeyByHabit[h.id] = getLocalDateKey(new Date(h.createdAt));
  }

  const allDatesSet = new Set<string>();
  Object.values(logs).forEach((dates) => {
    dates.forEach((d) => allDatesSet.add(d));
  });
  if (allDatesSet.size === 0) return 0;

  const allDates = Array.from(allDatesSet).sort(); // YYYY-MM-DD の文字列ソートでOK
  let allDoneDays = 0;

  for (const dateKey of allDates) {
    const activeHabitIds = habits
      .filter((h) => createdKeyByHabit[h.id] <= dateKey)
      .map((h) => h.id);

    if (activeHabitIds.length === 0) continue;

    const allDone = activeHabitIds.every((habitId) => logs[habitId]?.includes(dateKey));
    if (allDone) allDoneDays += 1;
  }

  return allDoneDays;
};
