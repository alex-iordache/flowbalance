import { neon } from '@neondatabase/serverless';

/** Neon cold-start / serverless round-trip budget for health checks. */
export const DB_HEALTH_TIMEOUT_MS = 10_000;

export type SqlClient = ReturnType<typeof neon>;

export type DatabaseHealthResult = {
  ok: boolean;
  latencyMs: number;
  migrationCount?: number;
  error?: string;
};

function getDatabaseUrl(): string {
  const url = (process.env.DATABASE_URL || '').trim();
  if (!url) {
    throw new Error('Missing env var: DATABASE_URL');
  }
  return url;
}

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

/** Drop cached client after connection errors (next call creates a fresh one). */
export function resetSqlClient(): void {
  sqlClient = null;
}

function asRows<T>(result: T[] | { rows: T[] }): T[] {
  if (Array.isArray(result)) return result;
  return result.rows;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function checkDatabaseHealth(
  timeoutMs: number = DB_HEALTH_TIMEOUT_MS,
): Promise<DatabaseHealthResult> {
  if (!hasDatabaseUrl()) {
    return { ok: false, latencyMs: 0, error: 'DATABASE_URL not configured' };
  }

  const started = Date.now();

  try {
    const sql = getSql();

    await withTimeout(
      sql`select 1 as ok`,
      timeoutMs,
      `Database health check timed out after ${timeoutMs}ms`,
    );

    const migrationRows = asRows(
      await withTimeout(
        sql`select count(*)::int as count from schema_migrations`,
        timeoutMs,
        `Database migration count query timed out after ${timeoutMs}ms`,
      ),
    );

    const migrationCount =
      typeof migrationRows[0]?.count === 'number' ? migrationRows[0].count : undefined;

    return {
      ok: true,
      latencyMs: Date.now() - started,
      migrationCount,
    };
  } catch (err) {
    resetSqlClient();
    return {
      ok: false,
      latencyMs: Date.now() - started,
      error: err instanceof Error ? err.message : 'Unknown database error',
    };
  }
}
