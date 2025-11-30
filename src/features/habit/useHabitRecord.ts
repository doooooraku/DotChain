import { Alert } from 'react-native';
import { useCallback } from 'react';
import * as StoreReview from 'expo-store-review';

import { selectStreak, useHabitStore } from '@/src/stores/habitStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { t } from '@/src/core/i18n/i18n';
import { triggerImpact } from '@/src/core/sensory/HapticManager';
import { playClick, playError, playSuccess } from '@/src/core/sensory/SoundManager';

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
         if (isDone && !hasRequestedReview) {
           const streak = selectStreak(state);
           if (streak === 7) {
             setTimeout(async () => {
               Alert.alert(
                 t('streak7Title'),
                 t('streak7Message'),
                 [
                   {
                     text: t('ok'),
                     onPress: async () => {
                       try {
                         const canAsk = await StoreReview.hasAction();
                         if (canAsk) {
                           await StoreReview.requestReview();
                         }
                       } catch {
                         // 失敗してもユーザーには見せない
                       } finally {
                         setHasRequestedReview(true);
                       }
                     },
                   },
                 ],
                 { cancelable: true },
               );
             }, 800);
           }
         }
      } catch (err) {
        void playError();
        throw err;
      }
    },
    [toggleToday, getHabitState, hasRequestedReview, setHasRequestedReview],
  );

  return { record };
}
