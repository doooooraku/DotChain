export const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY NOT NULL,
    habitId TEXT NOT NULL,
    date TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (habitId) REFERENCES habits(id) ON DELETE CASCADE,
    UNIQUE (habitId, date)
  );
`;
