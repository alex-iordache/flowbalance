-- Platform-1: user_identity (engagement fields merged here; no separate user_engagement table)
create table if not exists user_identity (
  user_key            bigserial primary key,
  clerk_user_id       text not null unique,
  email               text not null,
  email_verified      boolean not null default false,
  is_org_member       boolean not null default false,
  is_pro              boolean not null default false,
  clerk_created_at    timestamptz not null,
  timezone            text not null default 'Europe/Bucharest',
  country_code        text,
  marketing_opt_in    boolean not null default true,
  lifecycle_automation_stopped boolean not null default false,
  trial_ended_at      timestamptz,
  subscription_started_at timestamptz,
  last_active_at      timestamptz,
  flow_progress       jsonb not null default '{}',
  locale              text default 'ro',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists user_identity_email_idx on user_identity (email);
create index if not exists user_identity_last_active_at_idx on user_identity (last_active_at);
