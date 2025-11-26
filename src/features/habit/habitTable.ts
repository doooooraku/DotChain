import { randomUUID } from 'expo-crypto';
import { getDb } from '@/src/db/database';

export type HabitRow = {
  id: string;
  title: string;
  icon: string;
  color: string;
  createdAt: string;
};

export async function listHabits(): Promise<HabitRow[]> {
  const db = await getDb();
  return db.getAllAsync<HabitRow>('SELECT * FROM habits ORDER BY createdAt ASC');
}

export async function upsertHabit(input: Omit<HabitRow, 'id' | 'createdAt'> & { id?: string }) {
  const db = await getDb();
  const id = input.id ?? randomUUID();
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO habits (id, title, icon, color, createdAt)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET title=excluded.title, icon=excluded.icon, color=excluded.color`,
    id,
    input.title,
    input.icon,
    input.color,
    now,
  );
  return id;
}

export async function deleteHabit(id: string) {
  const db = await getDb();
  await db.runAsync('DELETE FROM logs WHERE habitId = ?', id);
  await db.runAsync('DELETE FROM habits WHERE id = ?', id);
}
