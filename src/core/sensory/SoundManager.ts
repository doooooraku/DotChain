import { Audio } from 'expo-av';
import { useSettingsStore } from '@/src/stores/settingsStore';

const tapSounds: Partial<Record<TapVariant, Audio.Sound>> = {};
let errorSound: Audio.Sound | null = null;

type TapVariant = 'click' | 'pop';

async function loadTap(variant: TapVariant) {
  const cached = tapSounds[variant];
  if (cached) return cached;
  const asset = variant === 'pop' ? require('@/assets/sounds/pop.wav') : require('@/assets/sounds/click.wav');
  const { sound } = await Audio.Sound.createAsync(asset);
  tapSounds[variant] = sound;
  return sound;
}

export async function playClick() {
  const { sound, tapSound } = useSettingsStore.getState();
  if (!sound) return;
  const variant: TapVariant = tapSound ?? 'click';
  try {
    const s = await loadTap(variant);
    await s.replayAsync();
  } catch {
    // ignore
  }
}

export async function playError() {
  const enable = useSettingsStore.getState().sound;
  if (!enable) return;
  try {
    if (!errorSound) {
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/error.wav'));
      errorSound = sound;
    }
    await errorSound?.replayAsync();
  } catch {
    // ignore
  }
}

export async function unloadSound() {
  try {
    await tapSounds.click?.unloadAsync();
    await tapSounds.pop?.unloadAsync();
    await errorSound?.unloadAsync();
  } catch {
    // ignore
  }
  tapSounds.click = undefined;
  tapSounds.pop = undefined;
  errorSound = null;
}
