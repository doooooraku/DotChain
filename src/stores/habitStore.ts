import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  HabitRow,
  UpsertHabitInput,
  deleteHabit,
  listHabits,
  upsertHabit,
} from '@/src/features/habit/habitTable';
import {
  deleteLogForDate,
  insertLog,
  listLogsByHabit,
  todayDone as dbTodayDone,
} from '@/src/features/habit/logTable';
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
  saveHabit: (input: UpsertHabitInput) => Promise<string>;
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
          set({ loading: false, error: t('errorLoadFailed') });
        }
      },
      saveHabit: async (input) => {
        try {
          const id = await upsertHabit(input);
          await get().loadAll();
          set({ error: undefined });
          return id;
        } catch (err: any) {
          const msg =
            err instanceof Error && err.message === 'TITLE_REQUIRED'
              ? t('errorTitleRequired')
              : t('errorSaveFailed');
          set({ error: msg });
          throw err;
        }
      },
      removeHabit: async (id: string) => {
        try {
          await deleteHabit(id);
          await get().loadAll();
          set({ error: undefined });
        } catch (_err) {
          set({ error: t('errorDeleteFailed') });
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
          throw _err;
        }
      },
    }),
    {
      name: 'dotchain-habits',
      storage: createJSONStorage(() => AsyncStorage),
      // today は日付依存の一時データなので永続化しない（ズレ防止）
      partialize: (state) => ({ habits: state.habits, logs: state.logs }),
    },
  ),
);

// 日付ごとの達成数と最大レベル（＝習慣数）を返す
// メモ化キャッシュ（同じ状態なら同じ参照を返す）
let heatmapCache:
  | {
      logsRef: HabitState['logs'];
      habitsLen: number;
      result: { counts: Record<string, number>; maxLevel: number };
    }
  | undefined;

export const selectHeatmapIntensity = (state: HabitState) => {
  if (
    heatmapCache &&
    heatmapCache.logsRef === state.logs &&
    heatmapCache.habitsLen === state.habits.length
  ) {
    return heatmapCache.result;
  }

  const counts: Record<string, number> = {};
  Object.values(state.logs).forEach((dates) => {
    dates.forEach((date) => {
      counts[date] = (counts[date] ?? 0) + 1;
    });
  });
  const maxLevel = state.habits.length || 1;
  const result = { counts, maxLevel };
  heatmapCache = { logsRef: state.logs, habitsLen: state.habits.length, result };
  return result;
};

// 「1日に1つでも習慣を達成した日」の“現在の連続日数”
// - 今日から過去に向かって1日ずつさかのぼり、どこかで達成ゼロの日が出た時点で終了
// - ログに現れる最も古い日付より前にはさかのぼらない（= アプリ利用開始以降をカバー）
export const selectStreak = (state: HabitState) => {
  const { habits, logs } = state;
  if (habits.length === 0) return 0;

  const hasAnyDoneOn = (dateKey: string) => habits.some((h) => logs[h.id]?.includes(dateKey));

  // ログに出現する全ての日付から、最も古い日付キーを求める
  const allDatesSet = new Set<string>();
  Object.values(logs).forEach((dates) => {
    dates.forEach((d) => allDatesSet.add(d));
  });
  if (allDatesSet.size === 0) return 0;

  const allDates = Array.from(allDatesSet).sort(); // YYYY-MM-DD なので文字列ソートで昇順になる
  const earliestDateKey = allDates[0];

  const today = new Date();
  let streak = 0;

  for (let offset = 0; ; offset++) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = getLocalDateKey(d);

    // これ以上さかのぼってもログが存在しないので終了
    if (key < earliestDateKey) break;

    // 1日でも達成ゼロの日が出たら連続終了
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
