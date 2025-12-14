import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config';
import ToastHost from '@/src/ui/ToastHost';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useHabitStore } from '@/src/stores/habitStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useTranslation } from '@/src/core/i18n/i18n';
import { getLocalDateKey } from '@/src/core/dateKey';

/**
 * ルートレイアウト
 * - 画面一覧: Home(index) / settings/index / habit/edit / pro/index
 *   ※ v1.0 の初回体験は Home + TutorialOverlay で提供し、専用 Onboarding 画面は使用しない
 * - Settings, Edit, Pro はモーダル表示
 */
export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const lastDate = useRef(getLocalDateKey());
  const themeName = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (appState.current.match(/inactive|background/) && state === 'active') {
        const today = getLocalDateKey();
        if (today !== lastDate.current) {
          useHabitStore.getState().loadAll();
          lastDate.current = today;
        }
      }
      appState.current = state;
    });
    return () => sub.remove();
  }, []);

  return (
    <TamaguiProvider config={config}>
      <Theme name={themeName}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: config.tokens.color.background.val },
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="settings/index"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('settings') }}
          />
          <Stack.Screen
            name="habit/edit"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('editHabitTitle') }}
          />
          <Stack.Screen
            name="pro/index"
            options={{ presentation: 'modal', headerShown: true, headerTitle: t('proHeaderTitle') }}
          />
        </Stack>
        <StatusBar style="light" />
        <ToastHost />
      </Theme>
    </TamaguiProvider>
  );
}
