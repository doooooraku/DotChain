// __tests__/F03_settingsStore.test.ts

import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsStore';
import * as NotificationManager from '@/src/core/notification/NotificationManager';

// AsyncStorage を Jest 用にダミー実装に差し替える
// （F01_habitRecord.test.ts と同じパターン）
jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};
  return {
    __esModule: true,
    default: {
      setItem: jest.fn(async (key: string, value: string) => {
        store[key] = value;
      }),
      getItem: jest.fn(async (key: string) => {
        return store[key] ?? null;
      }),
      removeItem: jest.fn(async (key: string) => {
        delete store[key];
      }),
      clear: jest.fn(async () => {
        store = {};
      }),
    },
  };
});

// 通知マネージャもモックする
jest.mock('@/src/core/notification/NotificationManager', () => ({
  __esModule: true,
  requestPermissions: jest.fn(),
  scheduleDailyReminder: jest.fn(),
  cancelDailyReminder: jest.fn(),
}));

describe('F-03: 設定変更（SettingsStore のユニットテスト）', () => {
  beforeEach(() => {
    // Store を毎回きれいな状態に戻す
    const base = useSettingsStore.getState();
    useSettingsStore.setState({
      ...base,
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
    });

    jest.clearAllMocks();
  });

  //
  // 1. 単純なトグル・セッターのテスト
  //
  it('サウンド / バイブ / テーマ / タップ音 / 電流演出 / フラグ類が setter で正しく更新される', () => {
    const store = useSettingsStore.getState();

    store.setSound(false);
    store.setHaptics(false);
    store.setTheme('cyberBlue');
    store.setTapSound('pop');
    store.setHasSeenOnboarding(true);
    store.setElectricFlow(false);
    store.setHasRequestedReview(true);
    store.setIsPro(true);

    const updated = useSettingsStore.getState();

    expect(updated.sound).toBe(false);
    expect(updated.haptics).toBe(false);
    expect(updated.theme).toBe('cyberBlue');
    expect(updated.tapSound).toBe('pop');
    expect(updated.hasSeenOnboarding).toBe(true);
    expect(updated.electricFlow).toBe(false);
    expect(updated.hasRequestedReview).toBe(true);
    expect(updated.isPro).toBe(true);
  });

  //
  // 2. ヒートマップ日数の安全な更新ロジック
  //
  type HeatmapCase = {
    input: number;
    expected: HeatmapDaysOption;
  };

  const heatmapCases: HeatmapCase[] = [
    { input: 30, expected: 30 },
    { input: 60, expected: 60 },
    { input: 180, expected: 180 },
    { input: 365, expected: 365 },
    // 許可されていない値は 60 にフォールバック
    { input: 7, expected: 60 },
    { input: 999, expected: 60 },
    { input: 0, expected: 60 },
  ];

  test.each(heatmapCases)(
    'setHeatmapDays(%s) で heatmapDays が %s になる',
    ({ input, expected }) => {
      const { setHeatmapDays } = useSettingsStore.getState();

      // 型的には HeatmapDaysOption しか受け取らないが、
      // 実行時の防御ロジックを確認するため any キャストで無理やり渡す
      setHeatmapDays(input as any);

      const updated = useSettingsStore.getState();
      expect(updated.heatmapDays).toBe(expected);
    },
  );

  //
  // 3. リマインダー ON/OFF ロジック（setReminderEnabled）
  //

  it('リマインダーON + 権限許可 → フラグtrue & scheduleDailyReminder が呼ばれる', async () => {
    (NotificationManager.requestPermissions as jest.Mock).mockResolvedValue(true);

    const { setReminderEnabled } = useSettingsStore.getState();

    await setReminderEnabled(true);

    const updated = useSettingsStore.getState();
    expect(updated.reminderEnabled).toBe(true);

    expect(NotificationManager.requestPermissions).toHaveBeenCalledTimes(1);
    expect(NotificationManager.scheduleDailyReminder).toHaveBeenCalledTimes(1);
    expect(NotificationManager.scheduleDailyReminder).toHaveBeenCalledWith('08:00');

    expect(NotificationManager.cancelDailyReminder).not.toHaveBeenCalled();
  });

  it('リマインダーON + 権限拒否 → フラグは false に戻り、どのスケジュール関数も呼ばない', async () => {
    (NotificationManager.requestPermissions as jest.Mock).mockResolvedValue(false);

    const { setReminderEnabled } = useSettingsStore.getState();

    await setReminderEnabled(true);

    const updated = useSettingsStore.getState();
    // 一度 true にしたあと、拒否されたので false に戻る
    expect(updated.reminderEnabled).toBe(false);

    expect(NotificationManager.requestPermissions).toHaveBeenCalledTimes(1);
    expect(NotificationManager.scheduleDailyReminder).not.toHaveBeenCalled();
    expect(NotificationManager.cancelDailyReminder).not.toHaveBeenCalled();
  });

  it('リマインダーOFF → フラグfalse & cancelDailyReminder が呼ばれる', async () => {
    // 事前に ON だったケースを想定
    useSettingsStore.setState({
      ...useSettingsStore.getState(),
      reminderEnabled: true,
    });

    const { setReminderEnabled } = useSettingsStore.getState();

    await setReminderEnabled(false);

    const updated = useSettingsStore.getState();
    expect(updated.reminderEnabled).toBe(false);
    expect(NotificationManager.cancelDailyReminder).toHaveBeenCalledTimes(1);
  });

  //
  // 4. リマインダー時刻サニタイズ & 再スケジュール（setReminderTime）
  //

  it('有効な時刻文字列なら "HH:MM" に整形して保存（リマインダーOFF時はスケジュールされない）', async () => {
    const { setReminderTime } = useSettingsStore.getState();

    await setReminderTime('7:5');

    const updated = useSettingsStore.getState();
    // "07:05" にゼロ埋めされる
    expect(updated.reminderTime).toBe('07:05');

    expect(NotificationManager.scheduleDailyReminder).not.toHaveBeenCalled();
  });

  it('壊れた時刻文字列は "08:00" に補正して保存', async () => {
    const { setReminderTime } = useSettingsStore.getState();

    await setReminderTime('99:99');

    const updated = useSettingsStore.getState();
    expect(updated.reminderTime).toBe('08:00');

    expect(NotificationManager.scheduleDailyReminder).not.toHaveBeenCalled();
  });

  it('リマインダーONの状態で時刻を変更すると、その時刻で再スケジュールされる', async () => {
    useSettingsStore.setState({
      ...useSettingsStore.getState(),
      reminderEnabled: true,
    });

    const { setReminderTime } = useSettingsStore.getState();

    await setReminderTime('21:30');

    const updated = useSettingsStore.getState();
    expect(updated.reminderTime).toBe('21:30');

    expect(NotificationManager.scheduleDailyReminder).toHaveBeenCalledTimes(1);
    expect(NotificationManager.scheduleDailyReminder).toHaveBeenCalledWith('21:30');
  });
});
