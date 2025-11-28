import { Audio } from 'expo-av';
import { useSettingsStore } from '@/src/stores/settingsStore';

let tapSound: Audio.Sound | null = null;
let successSound: Audio.Sound | null = null;
let errorSound: Audio.Sound | null = null;

type TapVariant = 'click' | 'pop';

async function loadTap(variant: TapVariant) {
  if (tapSound) return tapSound;
  const asset = variant === 'pop' ? require('@/assets/sounds/pop.wav') : require('@/assets/sounds/click.wav');
  const { sound } = await Audio.Sound.createAsync(asset);
  tapSound = sound;
  return tapSound;
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

export async function playSuccess() {
  const enable = useSettingsStore.getState().sound;
  if (!enable) return;
  try {
    if (!successSound) {
      const { sound } = await Audio.Sound.createAsync(require('@/assets/sounds/success.wav'));
      successSound = sound;
    }
    await successSound?.replayAsync();
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
    await tapSound?.unloadAsync();
    await successSound?.unloadAsync();
    await errorSound?.unloadAsync();
  } catch {
    // ignore
  }
  tapSound = null;
  successSound = null;
  errorSound = null;
}
