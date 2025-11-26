import * as SQLite from 'expo-sqlite';
import { createTablesSQL } from './schema';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('dotchain.db');
    await dbInstance.execAsync(createTablesSQL);
  }
  return dbInstance;
}
