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

const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

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
