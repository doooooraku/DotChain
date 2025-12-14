import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NotificationManager from '@/src/core/notification/NotificationManager';
import { initNotifications } from '@/src/core/notification/NotificationManager';

export type HeatmapDaysOption = 30 | 60 | 180 | 365;

type SettingsState = {
  sound: boolean;
  haptics: boolean;
  theme: 'dark' | 'neonPink' | 'cyberBlue';
  tapSound: 'click' | 'pop';
  hasSeenOnboarding: boolean;
  heatmapDays: HeatmapDaysOption;
  electricFlow: boolean;
  hasRequestedReview: boolean;
  isPro: boolean;
  reminderEnabled: boolean;
  reminderTime: string; // "HH:MM"
  setSound: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
  setTheme: (v: SettingsState['theme']) => void;
  setTapSound: (v: SettingsState['tapSound']) => void;
  setHasSeenOnboarding: (v: boolean) => void;
  setHeatmapDays: (days: HeatmapDaysOption) => void;
  setElectricFlow: (v: boolean) => void;
  setHasRequestedReview: (v: boolean) => void;
  setIsPro: (v: boolean) => void;
  setReminderEnabled: (v: boolean) => Promise<void>;
  setReminderTime: (time: string) => Promise<void>;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      sound: true,
      haptics: true,
      theme: 'dark',
      tapSound: 'click',
      hasSeenOnboarding: false,
      heatmapDays: 60,
      electricFlow: true,
      hasRequestedReview: false,
      isPro: false,
      reminderEnabled: false,
      reminderTime: '08:00',
      setSound: (v) => set({ sound: v }),
      setHaptics: (v) => set({ haptics: v }),
      setTheme: (v) => set({ theme: v }),
      setTapSound: (v) => set({ tapSound: v }),
      setHasSeenOnboarding: (v) => set({ hasSeenOnboarding: v }),
      setHeatmapDays: (days) => {
        const allowed: HeatmapDaysOption[] = [30, 60, 180, 365];
        const safe = allowed.includes(days) ? days : 60;
        set({ heatmapDays: safe });
      },
      setElectricFlow: (v) => set({ electricFlow: Boolean(v) }),
      setHasRequestedReview: (v) => set({ hasRequestedReview: Boolean(v) }),
      setIsPro: (v) => set({ isPro: Boolean(v) }),
      setReminderEnabled: async (v) => {
        set({ reminderEnabled: Boolean(v) });
        if (v) {
          await initNotifications();
          const granted = await NotificationManager.requestPermissions();
          if (granted) {
            const { reminderTime } = get();
            await NotificationManager.scheduleDailyReminder(reminderTime);
          } else {
            set({ reminderEnabled: false });
          }
        } else {
          await NotificationManager.cancelDailyReminder();
        }
      },
      setReminderTime: async (time) => {
        // 安全な "HH:MM" 形式にサニタイズ
        const [hStr = '8', mStr = '0'] = time.split(':');
        let hour = Number(hStr);
        let minute = Number(mStr);
        if (!Number.isFinite(hour) || hour < 0 || hour > 23) hour = 8;
        if (!Number.isFinite(minute) || minute < 0 || minute > 59) minute = 0;
        const safe = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        set({ reminderTime: safe });

        if (get().reminderEnabled) {
          await initNotifications();
          await NotificationManager.scheduleDailyReminder(safe);
        }
      },
    }),
    {
      name: 'dotchain-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
