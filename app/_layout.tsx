import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider, Theme } from 'tamagui';
import { PortalProvider } from '@tamagui/portal';
import config from '../tamagui.config';
import ToastHost from '@/src/ui/ToastHost';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useHabitStore } from '@/src/stores/habitStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useProStore } from '@/src/stores/proStore';
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
  const midnightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeName = useSettingsStore((s) => s.theme);
  const initPro = useProStore((s) => s.init);
  const { t } = useTranslation();
  const isDark = themeName === 'dark';

  const headerBase = {
    headerStyle: { backgroundColor: isDark ? '#000' : '#fff' },
    headerTintColor: isDark ? '#fff' : '#000',
    headerTitleStyle: { color: isDark ? '#fff' : '#000' },
    headerShadowVisible: false,
  } as const;

  useEffect(() => {
    const scheduleMidnightSync = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0);
      const delay = next.getTime() - now.getTime();
      return setTimeout(() => {
        const today = getLocalDateKey();
        if (today !== lastDate.current) {
          useHabitStore.getState().loadAll();
          lastDate.current = today;
        }
        midnightTimer.current = scheduleMidnightSync();
      }, delay);
    };

    midnightTimer.current = scheduleMidnightSync();

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

    return () => {
      sub.remove();
      if (midnightTimer.current) {
        clearTimeout(midnightTimer.current);
        midnightTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    void initPro();
  }, [initPro]);

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <PortalProvider shouldAddRootHost>
          <Theme name={themeName}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: config.tokens.color.background.val },
              }}>
              <Stack.Screen name="index" />
              <Stack.Screen
                name="settings/index"
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerTitle: t('settings'),
                  ...headerBase,
                }}
              />
              <Stack.Screen
                name="habit/edit"
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerTitle: t('editHabitTitle'),
                  ...headerBase,
                }}
              />
              <Stack.Screen
                name="pro/index"
                options={{
                  presentation: 'modal',
                  headerShown: true,
                  headerTitle: t('proHeaderTitle'),
                  ...headerBase,
                }}
              />
            </Stack>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <ToastHost />
          </Theme>
        </PortalProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
