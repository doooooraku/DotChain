import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config';
import { ToastHost } from './ToastHost';
import { useEffect, useRef } from 'react';
import { AppState, Linking } from 'react-native';
import { useHabitStore } from '@/src/stores/habitStore';
import { triggerImpact } from '@/src/core/sensory/HapticManager';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useTranslation } from '@/src/core/i18n/i18n';

/**
 * ルートレイアウト
 * - 画面一覧: Home(index) / settings/index / habit/edit / pro/index / onboarding
 * - Settings, Edit, Pro はモーダル表示
 */
export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const lastDate = useRef(new Date().toDateString());
  const themeName = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (appState.current.match(/inactive|background/) && state === 'active') {
        const today = new Date().toDateString();
        if (today !== lastDate.current) {
          useHabitStore.getState().loadAll();
          lastDate.current = today;
        }
      }
      appState.current = state;
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const handler = ({ url }: { url: string }) => {
      const match = url.match(/record\/(.+)$/);
      if (match?.[1]) {
        const habitId = match[1];
        triggerImpact();
        useHabitStore.getState().toggleToday(habitId);
      }
    };
    const sub = Linking.addEventListener('url', handler);
    Linking.getInitialURL().then((url) => url && handler({ url }));
    return () => sub.remove();
  }, []);

  return (
    <TamaguiProvider config={config}>
      <Theme name={themeName}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="settings/index"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('settings') }}
          />
          <Stack.Screen
            name="habit/edit"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('editEditHabit') }}
          />
          <Stack.Screen
            name="pro/index"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('proHeaderTitle') }}
          />
          <Stack.Screen
            name="onboarding"
            options={{ presentation: 'transparentModal', headerShown: false }}
          />
        </Stack>
        <StatusBar style="light" />
        <ToastHost />
      </Theme>
    </TamaguiProvider>
  );
}
