-- Platform-1: mailing send log (email + template + status; idempotency for lifecycle sends)
create table if not exists email_log (
  id                bigserial primary key,
  user_key          bigint not null references user_identity (user_key) on delete cascade,
  email             text not null,
  template_id       text not null,
  status            text not null,
  skip_reason       text,
  idempotency_key   text not null unique,
  resend_message_id text,
  created_at        timestamptz not null default now(),
  constraint email_log_status_check check (status in ('sent', 'skipped', 'failed'))
);

create index if not exists email_log_user_key_created_idx on email_log (user_key, created_at desc);
create index if not exists email_log_template_created_idx on email_log (template_id, created_at desc);
create index if not exists email_log_created_at_idx on email_log (created_at desc);
