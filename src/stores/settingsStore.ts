import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  setSound: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
  setTheme: (v: SettingsState['theme']) => void;
  setTapSound: (v: SettingsState['tapSound']) => void;
  setHasSeenOnboarding: (v: boolean) => void;
  setHeatmapDays: (days: HeatmapDaysOption) => void;
  setElectricFlow: (v: boolean) => void;
  setHasRequestedReview: (v: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sound: true,
      haptics: true,
      theme: 'dark',
      tapSound: 'click',
      hasSeenOnboarding: false,
      heatmapDays: 60,
      electricFlow: true,
      hasRequestedReview: false,
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
    }),
    {
      name: 'dotchain-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
