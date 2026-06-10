#!/usr/bin/env node
/**
 * Apply SQL migrations in db/migrations/ (lexicographic order).
 * Tracks applied files in schema_migrations.
 *
 * Usage: DATABASE_URL=postgres://... node scripts/db-migrate.js
 */
const fs = require('fs');
const path = require('path');
const { Pool } = require('@neondatabase/serverless');

const projectRoot = path.join(__dirname, '..');
const migrationsDir = path.join(projectRoot, 'db', 'migrations');

function loadEnvFile(filename) {
  const fullPath = path.join(projectRoot, filename);
  if (!fs.existsSync(fullPath)) return;

  for (const line of fs.readFileSync(fullPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// Next.js loads these automatically; plain Node scripts do not.
loadEnvFile('.env');
loadEnvFile('.env.local');

function mustEnv(name) {
  const value = (process.env[name] || '').trim();
  if (!value) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const pool = new Pool({ connectionString: mustEnv('DATABASE_URL') });
  const client = await pool.connect();

  try {
    await client.query(`
      create table if not exists schema_migrations (
        filename text primary key,
        applied_at timestamptz not null default now()
      )
    `);

    const appliedRows = await client.query('select filename from schema_migrations');
    const applied = new Set(appliedRows.rows.map(row => row.filename));

    const files = fs
      .readdirSync(migrationsDir)
      .filter(name => name.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('No migration files found.');
      return;
    }

    for (const filename of files) {
      if (applied.has(filename)) {
        console.log(`skip ${filename}`);
        continue;
      }

      const fullPath = path.join(migrationsDir, filename);
      const body = fs.readFileSync(fullPath, 'utf8');
      console.log(`apply ${filename}`);

      await client.query('begin');
      try {
        await client.query(body);
        await client.query('insert into schema_migrations (filename) values ($1)', [filename]);
        await client.query('commit');
      } catch (err) {
        await client.query('rollback');
        throw err;
      }
    }

    console.log('Migrations complete.');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
