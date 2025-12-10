import { getLocalDateKey } from '@/src/core/dateKey';
import { selectStreak } from '@/src/stores/habitStore';
import {
  shouldAskForReview,
  type ReviewTriggerContext,
} from '@/src/features/habit/useHabitRecord';

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
// → expo-sqlite / ネイティブDBに触れないようにする
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

// 効果音（SoundManager）は expo-av 経由でネイティブモジュールを使うので
// テストでは完全にモックしてしまう
jest.mock('@/src/core/sensory/SoundManager', () => ({
  __esModule: true,
  playSuccess: jest.fn(),
  playError: jest.fn(),
  playTap: jest.fn(),
  unloadSound: jest.fn(),
}));

// i18n も「キーをそのまま返すだけ」のモックにする
jest.mock('@/src/core/i18n/i18n', () => ({
  __esModule: true,
  t: (key: string) => key,
}));

/**
 * 1. shouldAskForReview 単体のテスト
 *    「streak と hasRequestedReview がこういう値のとき何を返すか」の表をそのままコードにしたもの
 */
describe('F-08: shouldAskForReview（レビュー依頼判定）のテスト', () => {
  type Case = {
    name: string;
    ctx: ReviewTriggerContext;
    expected: boolean;
  };

  const cases: Case[] = [
    {
      name: 'C1: streak=7 かつ hasRequestedReview=false → true（7日連続・未依頼端末）',
      ctx: { streak: 7, hasRequestedReview: false },
      expected: true,
    },
    {
      name: 'C2: streak<7（例:5） かつ hasRequestedReview=false → false（7日未満）',
      ctx: { streak: 5, hasRequestedReview: false },
      expected: false,
    },
    {
      name: 'C3: streak>7（例:8） かつ hasRequestedReview=false → false（8日以上）',
      ctx: { streak: 8, hasRequestedReview: false },
      expected: false,
    },
    {
      name: 'C4: streak=7 でも hasRequestedReview=true → false（既に依頼済み端末）',
      ctx: { streak: 7, hasRequestedReview: true },
      expected: false,
    },
  ];

  it.each(cases)('$name', ({ ctx, expected }) => {
    expect(shouldAskForReview(ctx)).toBe(expected);
  });
});

/**
 * 2. 「ログの並び」→ selectStreak → shouldAskForReview までをつないだテスト
 *    前に一緒に作った P1〜P4 の ○/× 表を、そのまま Jest に落とし込んだイメージ
 */
describe('F-08: ログの並びに応じた streak / shouldAskForReview の組み合わせテスト', () => {
  /**
   * 今日を基準に「何日前か」を指定して Date と YYYY-MM-DD を作るヘルパー
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
  const D5 = key(5); // 5日前
  const D6 = key(6); // 6日前
  const D7 = key(7); // 7日前

  type Case = {
    name: string;
    logs: string[]; // 1つの習慣 h1 の「達成した日付」の配列
    hasRequestedReview: boolean;
    expectedStreak: number;
    expectedAsk: boolean;
  };

  const cases: Case[] = [
    {
      name: 'P1: 7日連続達成 & 未依頼端末 → streak=7, ask=true',
      // D6〜D0 がすべて「○」のイメージ
      logs: [D6, D5, D4, D3, D2, D1, D0],
      hasRequestedReview: false,
      expectedStreak: 7,
      expectedAsk: true,
    },
    {
      name: 'P2: 7日未満（例: 今日だけ達成） → streak=1, ask=false',
      // 今日だけ「○」、それ以前は「×」のイメージ
      logs: [D0],
      hasRequestedReview: false,
      expectedStreak: 1,
      expectedAsk: false,
    },
    {
      name: 'P3: 8日連続達成（D7〜D0 がすべて○） → streak=8, ask=false',
      logs: [D7, D6, D5, D4, D3, D2, D1, D0],
      hasRequestedReview: false,
      expectedStreak: 8,
      expectedAsk: false,
    },
    {
      name: 'P4: 7日連続達成だが hasRequestedReview=true（既に依頼済み） → ask=false',
      logs: [D6, D5, D4, D3, D2, D1, D0],
      hasRequestedReview: true,
      expectedStreak: 7,
      expectedAsk: false,
    },
  ];

  it.each(cases)('$name', ({ logs, hasRequestedReview, expectedStreak, expectedAsk }) => {
    // selectStreak が期待した連続日数を返すか確認する
    // （habitStore のストア全体のうち、streak に必要な部分だけをダミーで作る）
    const dummyState = {
      habits: [
        {
          id: 'h1',
          title: 'テスト習慣',
          icon: 'flame',
          color: 'accent',
          // 十分過去の日付として 10 日前に作成されたことにする
          createdAt: makeDate(10).toISOString(),
        },
      ],
      logs: {
        h1: logs,
      },
      today: {},
      loading: false,
      error: undefined,
    };

    const streak = selectStreak(dummyState as any);
    expect(streak).toBe(expectedStreak);

    const ctx: ReviewTriggerContext = {
      streak,
      hasRequestedReview,
    };
    const ask = shouldAskForReview(ctx);
    expect(ask).toBe(expectedAsk);
  });
});
