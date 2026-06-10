-- Platform-2: mailing template settings, system settings, admin allowlist
create table if not exists email_template_settings (
  template_id               text primary key,
  enabled                   boolean not null default true,
  category                  text not null,
  days_offset               int,
  days_since_field          text,
  send_to_org               boolean not null default true,
  send_to_pro               boolean not null default true,
  send_to_free              boolean not null default true,
  exclude_payment_related   boolean not null default false,
  respects_cooldown         boolean not null default true,
  updated_at                timestamptz not null default now(),
  constraint email_template_settings_category_check check (
    category in ('transactional', 'lifecycle', 'marketing')
  ),
  constraint email_template_settings_days_since_field_check check (
    days_since_field is null
    or days_since_field in (
      'last_active_at',
      'trial_ended_at',
      'subscription_started_at',
      'clerk_created_at'
    )
  )
);

create table if not exists system_settings (
  key   text primary key,
  value jsonb not null
);

create table if not exists admin_users (
  email      text primary key,
  modules    text[] not null,
  created_at timestamptz not null default now()
);

-- 13 lifecycle / marketing templates (§6.1)
-- days_offset + days_since_field: elapsed-time rule from §2 (not calendar day-of-month)
insert into email_template_settings (
  template_id,
  category,
  days_offset,
  days_since_field,
  send_to_org,
  send_to_pro,
  send_to_free,
  exclude_payment_related,
  respects_cooldown
) values
  -- E01 Welcome — immediate on account_created
  ('E01', 'transactional', null, null, true, true, true, false, false),
  -- E02 Inactivity nudge — +3 days since last_active_at
  ('E02', 'lifecycle', 3, 'last_active_at', true, true, true, false, true),
  -- E02B Final inactivity nudge — +7 days since last_active_at
  ('E02B', 'marketing', 7, 'last_active_at', true, true, true, false, true),
  -- E03 Trial expiring — day 5 of 7-day trial (= 2 days before trial end)
  ('E03', 'lifecycle', 5, 'clerk_created_at', false, true, true, true, true),
  -- E04 Trial expired — immediate on trial_ended (webhook)
  ('E04', 'lifecycle', null, null, false, false, true, true, false),
  -- E05A Payment thank you — immediate on subscription_started
  ('E05A', 'transactional', null, null, false, true, false, true, false),
  -- E06A Progress 7d — +7 days since subscription_started_at
  ('E06A', 'lifecycle', 7, 'subscription_started_at', false, true, false, true, true),
  -- E07A Progress 30d — +30 days since subscription_started_at
  ('E07A', 'lifecycle', 30, 'subscription_started_at', false, true, false, true, true),
  -- E08A Monthly progress — monthly cadence from subscription (Mail-10 implements month logic)
  ('E08A', 'lifecycle', null, 'subscription_started_at', false, true, false, true, true),
  -- E09A Program completed — immediate, once per flow
  ('E09A', 'lifecycle', null, null, true, true, true, false, false),
  -- E05B What stopped you — immediate on trial_ended, not paid
  ('E05B', 'marketing', null, null, false, false, true, true, false),
  -- E06B Come back — +7 days since trial_ended_at
  ('E06B', 'marketing', 7, 'trial_ended_at', false, false, true, true, true),
  -- E07B Another try — +30 days since trial_ended_at
  ('E07B', 'marketing', 30, 'trial_ended_at', false, false, true, true, true),
  -- E08B Last try + STOP — +60 days since trial_ended_at
  ('E08B', 'marketing', 60, 'trial_ended_at', false, false, true, true, true)
on conflict (template_id) do nothing;

insert into system_settings (key, value) values
  ('send_hour_local', '10'::jsonb),
  ('global_marketing_cooldown_days', '3'::jsonb),
  ('monthly_progress_max_months', '12'::jsonb),
  ('analytics_track_max_retries', '3'::jsonb),
  ('email_send_max_retries', '2'::jsonb),
  ('analytics_retention_months', '24'::jsonb),
  ('staging_email_allowlist', '["alex@flowbalance.app"]'::jsonb)
on conflict (key) do nothing;

insert into admin_users (email, modules) values
  ('lex131@gmail.com', array['analytics', 'mailing', 'admin']),
  ('alex@flowbalance.app', array['analytics', 'mailing', 'admin'])
on conflict (email) do nothing;
