import { getLocalDateKey } from '@/src/core/dateKey';
import { useHabitStore, selectHeatmapIntensity, selectStreak, selectAllDoneDays } from '@/src/stores/habitStore';
import { insertLog, deleteLogForDate } from '@/src/features/habit/logTable';

// AsyncStorage を Jest 用にダミー実装に差し替える
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

// DB アクセス層（habitTable / logTable）は「全部モック」にする
jest.mock('@/src/features/habit/habitTable', () => ({
  __esModule: true,
  listHabits: jest.fn(),
  upsertHabit: jest.fn(),
  deleteHabit: jest.fn(),
}));

jest.mock('@/src/features/habit/logTable', () => ({
  __esModule: true,
  insertLog: jest.fn(),
  deleteLogForDate: jest.fn(),
  listLogsByHabit: jest.fn(),
  todayDone: jest.fn(),
}));

// 効果音と i18n も単純なモックにしておく（F-01 のロジック検証が目的なので）
jest.mock('@/src/core/sensory/SoundManager', () => ({
  __esModule: true,
  playSuccess: jest.fn(),
  playError: jest.fn(),
  playTap: jest.fn(),
  unloadSound: jest.fn(),
}));

jest.mock('@/src/core/i18n/i18n', () => ({
  __esModule: true,
  t: (key: string) => key,
}));

// F-01: 習慣実行の記録 のユニットテスト
describe('F-01: 習慣実行の記録（HabitStore / セレクタのテスト）', () => {
  // 毎回テスト開始前に Store をきれいな状態にする
  beforeEach(() => {
    const baseState = useHabitStore.getState();
    const today = new Date();
    const createdAtDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const sampleHabit = {
      id: 'habit-1',
      title: '英単語を30語覚える',
      icon: 'book',
      color: '#FF0000',
      createdAt: createdAtDate.toISOString(),
    };

    useHabitStore.setState({
      ...baseState,
      habits: [sampleHabit],
      today: {},
      logs: {},
      loading: false,
      error: undefined,
    });

    (insertLog as jest.Mock).mockReset();
    (deleteLogForDate as jest.Mock).mockReset();
  });

  it('1回タップで今日のログが ON になり、insertLog が呼ばれる', async () => {
    const { toggleToday, today, logs } = useHabitStore.getState();
    const todayKey = getLocalDateKey(new Date());

    // 事前状態: まだ実行していない
    expect(today['habit-1']).toBeUndefined();
    expect(logs['habit-1']).toBeUndefined();

    // 実行
    await toggleToday('habit-1');

    const state = useHabitStore.getState();

    // 期待: today フラグと logs に今日の日付が反映される
    expect(state.today['habit-1']).toBe(true);
    expect(state.logs['habit-1']).toContain(todayKey);

    // 期待: DB への insertLog が 1 回呼ばれている
    expect(insertLog).toHaveBeenCalledTimes(1);
    expect(insertLog).toHaveBeenCalledWith('habit-1', todayKey, expect.any(String));
  });

  it('2回目のタップで今日のログが OFF になり、deleteLogForDate が呼ばれる', async () => {
    const todayKey = getLocalDateKey(new Date());

    // 事前に「今日 ON」の状態を直接セット
    useHabitStore.setState((state) => ({
      ...state,
      today: { ...state.today, 'habit-1': true },
      logs: { ...state.logs, 'habit-1': [todayKey] },
    }));

    const { toggleToday } = useHabitStore.getState();

    // 実行（2回目のタップに相当）
    await toggleToday('habit-1');

    const state = useHabitStore.getState();

    // 期待: today フラグが false になり、logs から今日の日付が消える
    expect(state.today['habit-1']).toBe(false);
    expect(state.logs['habit-1']).not.toContain(todayKey);

    // 期待: deleteLogForDate が 1 回呼ばれている
    expect(deleteLogForDate).toHaveBeenCalledTimes(1);
    expect(deleteLogForDate).toHaveBeenCalledWith('habit-1', todayKey);
  });

  it('DB エラー時は状態を変更せず error に errorToggleFailed が入る', async () => {
    const todayKey = getLocalDateKey(new Date());

    // 事前状態: OFF
    useHabitStore.setState((state) => ({
      ...state,
      today: { ...state.today, 'habit-1': false },
      logs: { ...state.logs, 'habit-1': [] },
      error: undefined,
    }));

    // insertLog をエラーを投げるモックに差し替え
    (insertLog as jest.Mock).mockImplementationOnce(() => {
      throw new Error('DB error');
    });

    const { toggleToday } = useHabitStore.getState();

    await expect(toggleToday('habit-1')).rejects.toThrow('DB error');

    const state = useHabitStore.getState();

    // DB エラー時の期待:
    //  - today / logs は変わっていない
    //  - error フィールドにエラーキーが入る（トースト表示用）
    expect(state.today['habit-1']).toBe(false);
    expect(state.logs['habit-1']).toEqual([]);
    expect(state.error).toBe('errorToggleFailed');
  });

  it('selectHeatmapIntensity: 日付ごとの達成件数と最大レベルが計算される', () => {
    const today = new Date();
    const key = (offset: number) =>
      getLocalDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset));

    const day0 = key(0);
    const day1 = key(1);

    const createdAtDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const createdAt = createdAtDate.toISOString();

    const dummyState = {
      // habits 数が「レベルの上限」に相当する
      habits: [
        { id: 'h1', title: 'A', icon: 'a', color: '#fff', createdAt },
        { id: 'h2', title: 'B', icon: 'b', color: '#fff', createdAt },
      ],
      logs: {
        h1: [day0, day1], // h1 は両日達成
        h2: [day0], // h2 は今日だけ達成
      },
      today: {},
      loading: false,
      error: undefined,
    };

    const { counts, maxLevel } = selectHeatmapIntensity(dummyState as any);

    expect(maxLevel).toBe(2); // 習慣が2つなので「最大レベル」は 2
    // day0 は h1 と h2 の2件、day1 は h1 の1件
    expect(counts.get(day0)).toBe(2);
    expect(counts.get(day1)).toBe(1);
  });

  it('selectStreak: 連続日数が正しくカウントされる', () => {
    const today = new Date();
    const key = (offset: number) =>
      getLocalDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset));

    // 「今日〜2日前まで毎日どれかの習慣を達成」している状態を作る
    const day0 = key(0); // 今日
    const day1 = key(1); // 1日前
    const day2 = key(2); // 2日前

    const createdAtDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const createdAt = createdAtDate.toISOString();

    const dummyState = {
      habits: [
        { id: 'h1', title: 'A', icon: 'a', color: '#fff', createdAt },
        { id: 'h2', title: 'B', icon: 'b', color: '#fff', createdAt },
      ],
      logs: {
        h1: [day0, day1], // h1: 今日と1日前
        h2: [day2], // h2: 2日前
      },
      today: {},
      loading: false,
      error: undefined,
    };

    const streak = selectStreak(dummyState as any);

    // 2日前〜今日まで 3 日連続で「1件以上」達成しているので 3 になる想定
    expect(streak).toBe(3);
  });

  it('selectAllDoneDays: 全習慣達成した日数だけをカウントする', () => {
    const today = new Date();
    const key = (offset: number) =>
      getLocalDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset));

    const day0 = key(0); // 今日
    const day1 = key(1); // 1日前

    const createdAtDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const createdAt = createdAtDate.toISOString();

    const dummyState = {
      habits: [
        { id: 'h1', title: 'A', icon: 'a', color: '#fff', createdAt },
        { id: 'h2', title: 'B', icon: 'b', color: '#fff', createdAt },
      ],
      logs: {
        h1: [day0, day1], // h1 は両日達成
        h2: [day0], // h2 は今日だけ達成
      },
      today: {},
      loading: false,
      error: undefined,
    };

    const allDoneDays = selectAllDoneDays(dummyState as any);

    // day0: h1 / h2 両方達成 → カウント対象
    // day1: h2 が達成していない → カウント対象外
    expect(allDoneDays).toBe(1);
  });
});
