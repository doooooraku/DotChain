import { useCallback } from 'react';
import { useHabitStore } from '@/src/stores/habitStore';
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

  const record = useCallback(
    async (habitId: string) => {
      // フィードバック系は fire-and-forget（待たない）
      void playClick();
      void triggerImpact();
      try {
        await toggleToday(habitId);
        void playSuccess();
      } catch (err) {
        void playError();
        throw err;
      }
    },
    [toggleToday],
  );

  return { record };
}
