import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsState = {
  sound: boolean;
  haptics: boolean;
  theme: 'dark' | 'neonPink' | 'cyberBlue';
  tapSound: 'click' | 'pop';
  hasSeenOnboarding: boolean;
  setSound: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
  setTheme: (v: SettingsState['theme']) => void;
  setTapSound: (v: SettingsState['tapSound']) => void;
  setHasSeenOnboarding: (v: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sound: true,
      haptics: true,
      theme: 'dark',
      tapSound: 'click',
      hasSeenOnboarding: false,
      setSound: (v) => set({ sound: v }),
      setHaptics: (v) => set({ haptics: v }),
      setTheme: (v) => set({ theme: v }),
      setTapSound: (v) => set({ tapSound: v }),
      setHasSeenOnboarding: (v) => set({ hasSeenOnboarding: v }),
    }),
    {
      name: 'dotchain-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
