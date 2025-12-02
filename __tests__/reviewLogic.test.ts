import { shouldAskForReview } from '../src/features/habit/useHabitRecord';

describe('shouldAskForReview', () => {
  it('7日連続かつ未依頼のときだけ true を返す', () => {
    expect(shouldAskForReview({ streak: 7, hasRequestedReview: false })).toBe(true);
    expect(shouldAskForReview({ streak: 6, hasRequestedReview: false })).toBe(false);
    expect(shouldAskForReview({ streak: 8, hasRequestedReview: false })).toBe(false);
    expect(shouldAskForReview({ streak: 7, hasRequestedReview: true })).toBe(false);
  });
});
