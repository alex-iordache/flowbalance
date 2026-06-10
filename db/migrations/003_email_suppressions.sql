-- Platform-1: opt-out, bounce, and complaint suppressions
create table if not exists email_suppressions (
  email       text primary key,
  reason      text not null,
  source      text,
  created_at  timestamptz not null default now(),
  constraint email_suppressions_reason_check check (
    reason in ('unsubscribe', 'bounce', 'complaint', 'manual')
  )
);

create index if not exists email_suppressions_created_at_idx on email_suppressions (created_at desc);
