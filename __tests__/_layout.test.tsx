import React from 'react';
import { render } from '@testing-library/react-native';
import { AppState } from 'react-native';
import config from '../tamagui.config';
import RootLayout from '../app/_layout';

// =======================
// グローバルなモック変数
// =======================

// 習慣ストアの loadAll を監視するモック
const mockLoadAll = jest.fn();

// 日付キーを返す関数のモック
let mockGetLocalDateKey = jest.fn(() => '2025-12-04');

// =======================
// モジュールのモック
// =======================

// useHabitStore のモック
jest.mock('@/src/stores/habitStore', () => ({
  useHabitStore: {
    getState: () => ({
      loadAll: mockLoadAll,
    }),
  },
}));

// useSettingsStore のモック: theme は常に 'light'
jest.mock('@/src/stores/settingsStore', () => ({
  useSettingsStore: (selector: (state: { theme: string }) => string) =>
    selector({ theme: 'light' }),
}));

// i18n のモック: t('xxx') -> 't:xxx'
jest.mock('@/src/core/i18n/i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => `t:${key}`,
  }),
}));

// 日付キーのモック
jest.mock('@/src/core/dateKey', () => ({
  getLocalDateKey: () => mockGetLocalDateKey(),
}));

// TamaguiProvider / Theme のモック
jest.mock('tamagui', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    TamaguiProvider: ({ children, ...props }: any) => (
      <View testID="tamagui-provider-mock" {...props}>
        {children}
      </View>
    ),
    Theme: ({ children, name, ...props }: any) => (
      <View testID="theme-mock" themeName={name} {...props}>
        {children}
      </View>
    ),
  };
});

// expo-router の Stack のモック
jest.mock('expo-router', () => {
  const React = require('react');
  const { View } = require('react-native');

  const StackComponent = ({ children, screenOptions, ...rest }: any) => (
    <View testID="stack-mock" screenOptions={screenOptions} {...rest}>
      {children}
    </View>
  );

  const Screen = ({ children, ...props }: any) => (
    <View testID="stack-screen-mock" {...props}>
      {children}
    </View>
  );

  (StackComponent as any).Screen = Screen;

  return { Stack: StackComponent };
});

// expo-status-bar のモック
jest.mock('expo-status-bar', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    StatusBar: (props: any) => <View testID="status-bar-mock" {...props} />,
  };
});

// ToastHost のモック
jest.mock('../app/ToastHost', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    ToastHost: () => <View testID="toast-host-mock" />,
  };
});

// 各テスト前にモックをリセット
beforeEach(() => {
  jest.clearAllMocks();
  mockGetLocalDateKey.mockReset();
  mockGetLocalDateKey.mockImplementation(() => '2025-12-04');
});

describe('RootLayout: レイアウト構造', () => {
  it('TamaguiProvider / Theme / Stack / StatusBar / ToastHost が描画される', () => {
    const { getByTestId } = render(<RootLayout />);

    const provider = getByTestId('tamagui-provider-mock');
    const theme = getByTestId('theme-mock');
    const stack = getByTestId('stack-mock');
    const statusBar = getByTestId('status-bar-mock');
    const toastHost = getByTestId('toast-host-mock');

    expect(provider).toBeTruthy();
    expect(theme).toBeTruthy();
    expect(stack).toBeTruthy();
    expect(statusBar).toBeTruthy();
    expect(toastHost).toBeTruthy();

    // settingsStore の theme 値が Theme に渡っていること
    expect((theme.props as any).themeName).toBe('light');

    // StatusBar の style が "light" になっていること
    expect((statusBar.props as any).style).toBe('light');
  });

  it('Stack の screenOptions が header 非表示 & 背景色設定になっている', () => {
    const { getByTestId } = render(<RootLayout />);
    const stack = getByTestId('stack-mock');
    const screenOptions = (stack.props as any).screenOptions;

    expect(screenOptions.headerShown).toBe(false);
    expect(screenOptions.contentStyle).toMatchObject({
      backgroundColor: config.tokens.color.background.val,
    });
  });

  it('4つの Stack.Screen が定義され、name と headerTitle が正しい', () => {
    const { getAllByTestId } = render(<RootLayout />);
    const screens = getAllByTestId('stack-screen-mock');

    // index / settings/index / habit/edit / pro/index の4画面
    expect(screens).toHaveLength(4);

    const names = screens.map((screen) => (screen.props as any).name);
    expect(names).toEqual(['index', 'settings/index', 'habit/edit', 'pro/index']);

    // settings/index 画面
    const settingsScreen = screens[1];
    expect((settingsScreen.props as any).options.presentation).toBe('modal');
    expect((settingsScreen.props as any).options.headerShown).toBe(true);
    expect((settingsScreen.props as any).options.headerTitle).toBe('t:settings');

    // habit/edit 画面
    const editScreen = screens[2];
    expect((editScreen.props as any).options.presentation).toBe('modal');
    expect((editScreen.props as any).options.headerShown).toBe(true);
    expect((editScreen.props as any).options.headerTitle).toBe('t:editHabitTitle');

    // pro/index 画面
    const proScreen = screens[3];
    expect((proScreen.props as any).options.presentation).toBe('modal');
    expect((proScreen.props as any).options.presentation).toBe('modal');
    expect((proScreen.props as any).options.headerShown).toBe(true);
    expect((proScreen.props as any).options.headerTitle).toBe('t:proHeaderTitle');
  });
});

describe('RootLayout: AppState と日付跨ぎロジック', () => {
  it('マウント時に AppState.change リスナーを登録し、アンマウントで remove を呼ぶ', () => {
    const removeMock = jest.fn();
    const handlerContainer: { handler?: (state: string) => void } = {};

    const addListenerSpy = jest
      .spyOn(AppState as any, 'addEventListener')
      .mockImplementation(((type: string, handler: (state: string) => void) => {
        if (type === 'change') {
          handlerContainer.handler = handler;
        }
        return { remove: removeMock };
      }) as any);

    const { unmount } = render(<RootLayout />);

    // change リスナーが1回登録されていること
    expect(addListenerSpy).toHaveBeenCalledTimes(1);
    expect(addListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));

    const handler = handlerContainer.handler!;
    // active -> background （このときは何もしない）
    handler('background');

    // 日付が変わっていれば active 復帰時に loadAll が呼ばれる想定
    mockGetLocalDateKey.mockImplementationOnce(() => '2025-12-05');
    handler('active');

    expect(mockLoadAll).toHaveBeenCalledTimes(1);

    // アンマウントで remove() が 1 回呼ばれること
    unmount();
    expect(removeMock).toHaveBeenCalledTimes(1);

    addListenerSpy.mockRestore();
  });

  it('日付が変わっていない場合は loadAll を呼ばない', () => {
    const removeMock = jest.fn();
    const handlerContainer: { handler?: (state: string) => void } = {};

    jest
      .spyOn(AppState as any, 'addEventListener')
      .mockImplementation(((type: string, handler: (state: string) => void) => {
        if (type === 'change') {
          handlerContainer.handler = handler;
        }
        return { remove: removeMock };
      }) as any);

    render(<RootLayout />);

    const handler = handlerContainer.handler!;
    // active -> background
    handler('background');

    // 日付は変えずに active に戻す
    mockGetLocalDateKey.mockImplementationOnce(() => '2025-12-04');
    handler('active');

    // 日付が同じなので loadAll は呼ばれない
    expect(mockLoadAll).not.toHaveBeenCalled();
  });
});
