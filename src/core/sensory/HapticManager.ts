import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/src/stores/settingsStore';

export async function triggerImpact() {
  const enable = useSettingsStore.getState().haptics;
  if (!enable) return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {
    // ignore
  }
}
