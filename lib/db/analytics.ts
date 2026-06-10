import { randomUUID } from 'crypto';

import { getSql } from './client';

export type ServerAnalyticsEventInput = {
  userKey: string | number | bigint;
  eventName: string;
  occurredAt: Date;
  platform?: string;
  userStatus?: string | null;
  daysSinceSignup?: number | null;
  properties?: Record<string, unknown>;
};

function asRows<T>(result: T[] | { rows: T[] }): T[] {
  if (Array.isArray(result)) return result;
  return result.rows;
}

export async function hasAnalyticsEvent(
  userKey: string | number | bigint,
  eventName: string,
): Promise<boolean> {
  const sql = getSql();
  const rows = asRows(
    await sql`
      select 1 as ok
      from analytics_events
      where user_key = ${String(userKey)}
        and event_name = ${eventName}
      limit 1
    `,
  );
  return rows.length > 0;
}

export async function insertServerAnalyticsEvent(
  input: ServerAnalyticsEventInput,
): Promise<{ inserted: boolean; eventId: string }> {
  const sql = getSql();
  const eventId = randomUUID();
  const properties = JSON.stringify(input.properties ?? {});

  const inserted = asRows(
    await sql`
      insert into analytics_events (
        event_id,
        user_key,
        event_name,
        occurred_at,
        platform,
        days_since_signup,
        user_status,
        properties
      )
      values (
        ${eventId}::uuid,
        ${String(input.userKey)},
        ${input.eventName},
        ${input.occurredAt.toISOString()},
        ${input.platform ?? 'web'},
        ${input.daysSinceSignup ?? null},
        ${input.userStatus ?? null},
        ${properties}::jsonb
      )
      on conflict (event_id) do nothing
      returning event_id
    `,
  );

  return {
    inserted: inserted.length > 0,
    eventId,
  };
}

export async function trackServerAnalyticsEventOnce(
  input: ServerAnalyticsEventInput,
): Promise<{ tracked: boolean; eventId?: string }> {
  const exists = await hasAnalyticsEvent(input.userKey, input.eventName);
  if (exists) {
    return { tracked: false };
  }

  const result = await insertServerAnalyticsEvent(input);
  return {
    tracked: result.inserted,
    eventId: result.eventId,
  };
}
