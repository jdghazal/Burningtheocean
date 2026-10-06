import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { SCHEMA_SQL } from "@/lib/schema";

type GlobalWithDatabase = typeof globalThis & {
  securityCareersDb?: DatabaseSync;
};

const globalWithDatabase = globalThis as GlobalWithDatabase;

function openDatabase() {
  const databaseFile = path.basename(
    process.env.DATABASE_FILENAME ?? "security-careers.db",
  );
  const databasePath = path.join(process.cwd(), "data", databaseFile);
  mkdirSync(path.dirname(databasePath), { recursive: true });

  const database = new DatabaseSync(databasePath);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec("PRAGMA foreign_keys = ON;");
  database.exec(SCHEMA_SQL);
  return database;
}

export const db = globalWithDatabase.securityCareersDb ?? openDatabase();

if (process.env.NODE_ENV !== "production") {
  globalWithDatabase.securityCareersDb = db;
}

export default db;
