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
        const id = await upsertHabit(input);
        await get().loadAll();
        playSuccess();
        return id;
      },
      removeHabit: async (id: string) => {
        await deleteHabit(id);
        await get().loadAll();
        playSuccess();
      },
      toggleToday: async (habitId: string) => {
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
        }));
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
