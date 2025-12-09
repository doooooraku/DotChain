import { getLocalDateKey } from '@/src/core/dateKey';
import { selectStreak, selectAllDoneDays } from '@/src/stores/habitStore';

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

// 効果音と i18n も単純なモックにしておく
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

/**
 * F-02: 習慣の追加・削除が行われたあとでも
 * 「ログの並び」に対して selectStreak / selectAllDoneDays が
 * 想定通りの値を返しているかを確認するテスト
 */
describe('F-02: ログの並びに応じたストリーク / All Done 日数のテスト', () => {
  /**
   * 今日を基準に「何日前か」を指定して Date と YYYY-MM-DD の文字列を作るヘルパー。
   * 例: key(0) -> 今日の 'YYYY-MM-DD'
   *     key(1) -> 1日前の 'YYYY-MM-DD'
   */
  const today = new Date();
  const makeDate = (offset: number) =>
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
  const key = (offset: number) => getLocalDateKey(makeDate(offset));

  // 読みやすさのためにシンボル名を用意しておく
  const D0 = key(0); // 今日
  const D1 = key(1); // 1日前
  const D2 = key(2); // 2日前
  const D3 = key(3); // 3日前
  const D4 = key(4); // 4日前

  type Case = {
    name: string;
    habits: {
      id: string;
      title: string;
      icon: string;
      color: string;
      createdAt: string;
    }[];
    logs: Record<string, string[]>;
    expectedStreak: number;
    expectedAllDoneDays: number;
  };

  const cases: Case[] = [
    {
      name: 'ケース1: 単一習慣で3日連続達成している',
      habits: [
        {
          id: 'h1',
          title: 'ランニング',
          icon: 'flame',
          color: 'accent',
          // 2日前に作成された習慣という設定
          createdAt: makeDate(2).toISOString(),
        },
      ],
      logs: {
        // D2, D1, D0 の3日連続で実行
        h1: [D2, D1, D0],
      },
      expectedStreak: 3,
      expectedAllDoneDays: 3,
    },
    {
      name: 'ケース2: 単一習慣で途中1日だけサボっている',
      habits: [
        {
          id: 'h1',
          title: '勉強',
          icon: 'book',
          color: 'accent',
          createdAt: makeDate(2).toISOString(),
        },
      ],
      logs: {
        // 2日前と今日だけ達成（1日前はサボり）
        h1: [D2, D0],
      },
      expectedStreak: 1, // 連続日は「今日だけ」
      expectedAllDoneDays: 2, // 達成した日（D2, D0）はどちらも「全習慣達成」
    },
    {
      name: 'ケース3: 途中から2つ目の習慣を追加し、そこからは両方毎日達成',
      habits: [
        {
          id: 'h1',
          title: '筋トレ',
          icon: 'dumbbell',
          color: 'accent',
          // 4日前から存在する習慣
          createdAt: makeDate(4).toISOString(),
        },
        {
          id: 'h2',
          title: '瞑想',
          icon: 'meditation',
          color: 'accent',
          // 1日前から存在する習慣
          createdAt: makeDate(1).toISOString(),
        },
      ],
      logs: {
        // h1 は 4日前から今日まで毎日達成
        h1: [D4, D3, D2, D1, D0],
        // h2 は 1日前から今日まで毎日達成
        h2: [D1, D0],
      },
      // ここ5日間（D4〜D0）のどの日も「少なくとも1つの習慣は達成」している
      expectedStreak: 5,
      // 4日前〜今日まで、存在している習慣がすべて達成されている
      expectedAllDoneDays: 5,
    },
    {
      name: 'ケース4: 2つ目の習慣は追加したが、追加初日はサボっている',
      habits: [
        {
          id: 'h1',
          title: '筋トレ',
          icon: 'dumbbell',
          color: 'accent',
          createdAt: makeDate(4).toISOString(),
        },
        {
          id: 'h2',
          title: '瞑想',
          icon: 'meditation',
          color: 'accent',
          createdAt: makeDate(1).toISOString(),
        },
      ],
      logs: {
        // h1 は 4日前から今日まで毎日達成
        h1: [D4, D3, D2, D1, D0],
        // h2 は 今日だけ達成（追加初日の D1 はサボり）
        h2: [D0],
      },
      // 毎日どれかの習慣は達成している
      expectedStreak: 5,
      // 4日前〜2日前: h1 のみ存在 → 全習慣達成
      // 1日前: h1 は達成だが h2 は未達 → 全習慣達成ではない
      // 今日: h1 / h2 両方達成 → 全習慣達成
      // 合計 4 日
      expectedAllDoneDays: 4,
    },
    {
      name: 'ケース5-1: 2つの習慣がある状態（削除前）',
      habits: [
        {
          id: 'h1',
          title: 'ストレッチ',
          icon: 'yoga',
          color: 'accent',
          createdAt: makeDate(2).toISOString(),
        },
        {
          id: 'h2',
          title: '日記',
          icon: 'pen',
          color: 'accent',
          createdAt: makeDate(2).toISOString(),
        },
      ],
      logs: {
        // h1 は3日連続で達成
        h1: [D2, D1, D0],
        // h2 は 2日前と今日だけ達成（1日前はサボり）
        h2: [D2, D0],
      },
      // 3日とも「どちらかは達成している」
      expectedStreak: 3,
      // 2日前: h1 / h2 両方達成 → カウント
      // 1日前: h2 が未達 → カウントしない
      // 今日: h1 / h2 両方達成 → カウント
      // 合計 2 日
      expectedAllDoneDays: 2,
    },
    {
      name: 'ケース5-2: h2 を削除したあとの状態（削除済みの習慣は評価対象外）',
      habits: [
        {
          id: 'h1',
          title: 'ストレッチ',
          icon: 'yoga',
          color: 'accent',
          createdAt: makeDate(2).toISOString(),
        },
        // h2 は削除された想定なので habits 配列に含めない
      ],
      logs: {
        // DB の ON DELETE CASCADE により、h2 のログも削除されている前提
        h1: [D2, D1, D0],
      },
      // h1 が3日連続で達成しているので 3
      expectedStreak: 3,
      // 「存在する習慣」は h1 のみ → 3日とも h1 が達成 → 3 日すべて All Done
      expectedAllDoneDays: 3,
    },
  ];

  test.each(cases)('$name', ({ habits, logs, expectedStreak, expectedAllDoneDays }) => {
    const dummyState = {
      habits,
      logs,
      today: {},
      loading: false,
      error: undefined,
    };

    const streak = selectStreak(dummyState as any);
    const allDoneDays = selectAllDoneDays(dummyState as any);

    expect(streak).toBe(expectedStreak);
    expect(allDoneDays).toBe(expectedAllDoneDays);
  });
});
