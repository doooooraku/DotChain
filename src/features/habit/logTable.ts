import { randomUUID } from 'expo-crypto';
import { getDb } from '@/src/db/database';

export type LogRow = {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
};

export async function insertLog(habitId: string, date: string, timestamp: string) {
  const db = await getDb();
  const id = randomUUID();
  await db.runAsync(
    'INSERT INTO logs (id, habitId, date, timestamp) VALUES (?, ?, ?, ?)',
    id,
    habitId,
    date,
    timestamp,
  );
  return id;
}

export async function deleteLogForDate(habitId: string, date: string) {
  const db = await getDb();
  await db.runAsync('DELETE FROM logs WHERE habitId = ? AND date = ?', habitId, date);
}

export async function listLogsByHabit(habitId: string): Promise<LogRow[]> {
  const db = await getDb();
  return db.getAllAsync<LogRow>('SELECT * FROM logs WHERE habitId = ? ORDER BY date DESC', habitId);
}

export async function todayDone(habitId: string, today: string): Promise<boolean> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM logs WHERE habitId = ? AND date = ?',
    habitId,
    today,
  );
  return (row?.count ?? 0) > 0;
}

export async function recentHeatmap(habitId: string, days: number): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ date: string }>(
    'SELECT date FROM logs WHERE habitId = ? ORDER BY date DESC LIMIT ?',
    habitId,
    days,
  );
  return rows.map((r) => r.date);
}
