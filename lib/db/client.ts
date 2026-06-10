import { neon } from '@neondatabase/serverless';

function getDatabaseUrl(): string {
  const url = (process.env.DATABASE_URL || '').trim();
  if (!url) {
    throw new Error('Missing env var: DATABASE_URL');
  }
  return url;
}

export type SqlClient = ReturnType<typeof neon>;

let sqlClient: SqlClient | null = null;

export function getSql(): SqlClient {
  if (!sqlClient) {
    sqlClient = neon(getDatabaseUrl());
  }
  return sqlClient;
}

export function hasDatabaseUrl(): boolean {
  return Boolean((process.env.DATABASE_URL || '').trim());
}
