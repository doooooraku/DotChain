import { Alert } from 'react-native';
import { useCallback } from 'react';
import * as StoreReview from 'expo-store-review';

import { selectStreak, useHabitStore } from '@/src/stores/habitStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { t } from '@/src/core/i18n/i18n';
import { triggerImpact } from '@/src/core/sensory/HapticManager';
import { playClick, playSuccess } from '@/src/core/sensory/SoundManager';

/**
 * レビュー依頼判定用コンテキスト
 */
export type ReviewTriggerContext = {
  streak: number;
  hasRequestedReview: boolean;
};

/**
 * 「今レビューを依頼するべきか」を判定する純粋関数
 * - 既に依頼済みなら常に false
 * - ちょうど 7 日連続達成のときだけ true
 */
export const shouldAskForReview = (ctx: ReviewTriggerContext): boolean => {
  if (ctx.hasRequestedReview) return false;
  return ctx.streak === 7;
};

/**
 * レビュー API を安全に呼び出すヘルパー
 * - 利用可否を isAvailableAsync / hasAction でチェック
 * - 成功/失敗に関わらず hasRequestedReview を true にする
 */
const requestStoreReviewSafely = async (setHasRequestedReview: (v: boolean) => void) => {
  try {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (!isAvailable) return;

    const hasAction = await StoreReview.hasAction();
    if (!hasAction) return;

    await StoreReview.requestReview();
  } catch {
    // ユーザーには見せない
  } finally {
    setHasRequestedReview(true);
  }
};

/**
 * 習慣ボタンタップ時の共通処理。
 * 1) クリック音 + 振動で即フィードバック（完了を待たない）
 * 2) toggleToday で「SQLite の logs 更新 + Zustand の today/logs 更新」
 * 3) 成功時は成功音、失敗時はエラー音（いずれも待たない）
 */
export function useHabitRecord() {
  const toggleToday = useHabitStore((s) => s.toggleToday);
  const getHabitState = useHabitStore.getState;
  const hasRequestedReview = useSettingsStore((s) => s.hasRequestedReview);
  const setHasRequestedReview = useSettingsStore((s) => s.setHasRequestedReview);

  const record = useCallback(
    async (habitId: string) => {
      // フィードバック系は fire-and-forget（待たない）
      void playClick();
      void triggerImpact();
      try {
        await toggleToday(habitId);
        void playSuccess();

        // 7日連続達成祝い＆レビュー依頼（端末1回のみ）
        const state = getHabitState();
        const isDone = state.today[habitId] === true;
        if (isDone) {
          const streak = selectStreak(state);
          const ask = shouldAskForReview({
            streak,
            hasRequestedReview,
          });

          if (ask) {
            setTimeout(() => {
              Alert.alert(
                t('streak7Title'),
                t('streak7Message'),
                [
                  {
                    text: t('ok'),
                    onPress: () => {
                      void requestStoreReviewSafely(setHasRequestedReview);
                    },
                  },
                ],
                { cancelable: true },
              );
            }, 800);
          }
        }
      } catch (err) {
        throw err;
      }
    },
    [toggleToday, getHabitState, hasRequestedReview, setHasRequestedReview],
  );

  return { record };
}
