import { useCallback } from 'react';
import { useHabitStore } from '@/src/stores/habitStore';
import { triggerImpact } from '@/src/core/sensory/HapticManager';
import { playClick, playError, playSuccess } from '@/src/core/sensory/SoundManager';

/**
 * ボタン押下時の共通ロジック。
 * 1) 振動（即時）
 * 2) 楽観的更新（Zustandのtodayを即反転）
 * 3) SQLiteに保存/削除
 */
export function useHabitRecord() {
  const toggleToday = useHabitStore((s) => s.toggleToday);

  const record = useCallback(
    async (habitId: string) => {
      await playClick();
      await triggerImpact();
      try {
        await toggleToday(habitId);
        await playSuccess();
      } catch (err) {
        await playError();
        throw err;
      }
    },
    [toggleToday],
  );

  return { record };
}
