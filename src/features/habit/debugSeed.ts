import { getLocalDateKey } from '@/src/core/dateKey';
import { getDb } from '@/src/db/database';
import { upsertHabit } from '@/src/features/habit/habitTable';
import { insertLog } from '@/src/features/habit/logTable';
import { useHabitStore } from '@/src/stores/habitStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = ['dotchain-habits'] as const;

const TEST_HABITS = [
  { title: '散歩', icon: 'walk-outline' },
  { title: '水を飲む', icon: 'water-outline' },
];

export async function resetAndSeedSevenDays() {
  if (!__DEV__) return;

  const db = await getDb();

  await db.execAsync('DELETE FROM logs; DELETE FROM habits;');
  await AsyncStorage.multiRemove(STORAGE_KEYS);

  const [walkId, drinkId] = await Promise.all([
    upsertHabit(TEST_HABITS[0]),
    upsertHabit(TEST_HABITS[1]),
  ]);

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = getLocalDateKey(d);
    const timestamp = d.toISOString();

    await insertLog(walkId, dateKey, timestamp);
    if (i % 2 === 0) {
      await insertLog(drinkId, dateKey, timestamp);
    }
  }

  await useHabitStore.getState().loadAll();
}
