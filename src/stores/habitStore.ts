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

const todayStr = () => new Date().toISOString().slice(0, 10);

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
          const habits = await listHabits();
          const today = Object.fromEntries(
            await Promise.all(
              habits.map(async (h) => {
                const done = await dbTodayDone(h.id, todayStr());
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
        } catch (e: any) {
          playError();
          set({ loading: false, error: e?.message ?? 'Failed to load data' });
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
              ? 'タイトルは必須です'
              : '保存に失敗しました';
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
          set({ error: '削除に失敗しました' });
          playError();
          throw _err;
        }
      },
      toggleToday: async (habitId: string) => {
        try {
          const current = get().today[habitId];
          const nowIso = new Date().toISOString();
          if (current) {
            await deleteLogForDate(habitId, todayStr());
          } else {
            await insertLog(habitId, todayStr(), nowIso);
          }
          set((state) => ({
            today: { ...state.today, [habitId]: !current },
            logs: {
              ...state.logs,
              [habitId]: !current
                ? Array.from(new Set([...(state.logs[habitId] ?? []), todayStr()]))
                : (state.logs[habitId] ?? []).filter((d) => d !== todayStr()),
            },
            error: undefined,
          }));
        } catch (_err) {
          set({ error: '記録の更新に失敗しました' });
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

export const selectHeatmap = (habitId: string, days = 14) => (state: HabitState) => {
  const dates = state.logs[habitId] ?? [];
  return new Set(dates.slice(-days));
};
