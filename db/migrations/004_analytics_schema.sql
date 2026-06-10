-- Analytics-1: raw events, aggregation watermark, daily rollups (no PII in analytics_events)
create table if not exists analytics_events (
  id                  bigserial primary key,
  event_id            uuid not null unique,
  user_key            bigint not null references user_identity (user_key),
  event_name          text not null,
  occurred_at         timestamptz not null,
  received_at         timestamptz not null default now(),
  platform            text not null,
  device_type         text,
  app_version         text,
  days_since_signup   int,
  user_status         text,
  properties          jsonb not null default '{}'
);

create index if not exists analytics_events_received_at_idx on analytics_events (received_at);
create index if not exists analytics_events_occurred_at_idx on analytics_events (occurred_at);
create index if not exists analytics_events_name_occurred_idx on analytics_events (event_name, occurred_at);
create index if not exists analytics_events_user_key_idx on analytics_events (user_key);

create table if not exists analytics_agg_state (
  id int primary key default 1,
  last_received_at_processed timestamptz not null default '1970-01-01',
  last_run_at timestamptz not null default now(),
  is_processing boolean not null default false,
  constraint analytics_agg_state_singleton check (id = 1)
);

insert into analytics_agg_state (id)
values (1)
on conflict (id) do nothing;

-- category_name / program_name use '' default so PK matches coalesce(null,'') rollup buckets
create table if not exists analytics_rollup_daily (
  day                   date not null,
  event_name            text not null,
  category_name         text not null default '',
  program_name          text not null default '',
  count                 bigint not null default 0,
  unique_users          bigint not null default 0,
  sum_duration_seconds  bigint,
  primary key (day, event_name, category_name, program_name)
);

create index if not exists analytics_rollup_daily_day_idx on analytics_rollup_daily (day);
