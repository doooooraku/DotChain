import { randomUUID } from 'expo-crypto';
import { getDb } from '@/src/db/database';

export type HabitRow = {
  id: string;
  title: string;
  icon: string;
  color: string;
  createdAt: string;
};

export type UpsertHabitInput = {
  id?: string;
  title: string;
  icon: string;
  color?: string;
};

const DEFAULT_HABIT_COLOR = 'accent';

export async function listHabits(): Promise<HabitRow[]> {
  const db = await getDb();
  return db.getAllAsync<HabitRow>('SELECT * FROM habits ORDER BY createdAt ASC');
}

export async function upsertHabit(input: UpsertHabitInput) {
  const title = input.title?.trim();
  if (!title) {
    throw new Error('TITLE_REQUIRED');
  }

  const db = await getDb();
  const id = input.id ?? randomUUID();
  const now = new Date().toISOString();
  const color = input.color ?? DEFAULT_HABIT_COLOR;
  try {
    await db.runAsync(
      `INSERT INTO habits (id, title, icon, color, createdAt)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET title=excluded.title, icon=excluded.icon, color=excluded.color`,
      id,
      title,
      input.icon,
      color,
      now,
    );
    return id;
  } catch (err) {
    console.error('[upsertHabit] 保存に失敗しました', err);
    throw err;
  }
}

export async function deleteHabit(id: string) {
  const db = await getDb();
  try {
    await db.runAsync('DELETE FROM habits WHERE id = ?', id);
  } catch (err) {
    console.error('[deleteHabit] 削除に失敗しました', err);
    throw err;
  }
}
