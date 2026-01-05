/**
 * One-time helper:
 * Migrate practice audioUrl values from local paths like "/audio/<file>.mp3"
 * to R2 object keys like "<file>.mp3".
 *
 * Run:
 *   node scripts/migrate-audio-urls-to-r2-keys.js
 */
/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const flowsRoot = path.join(repoRoot, 'data', 'flows');

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function migrateContent(raw) {
  // Replace quoted "/audio/<...>.mp3" or '/audio/<...>.mp3' with "<...>.mp3"
  // Keep it intentionally conservative: only touches strings that start with /audio/ and end with .mp3
  const re = /(["'])\/audio\/([^"'\\]+?\.mp3)\1/g;
  return raw.replace(re, (_m, quote, key) => `${quote}${key}${quote}`);
}

async function main() {
  const entries = await fs.readdir(flowsRoot, { withFileTypes: true });
  const flowDirs = entries.filter((e) => e.isDirectory()).map((e) => path.join(flowsRoot, e.name));

  let updated = 0;
  let scanned = 0;

  for (const flowDir of flowDirs) {
    const flowTs = path.join(flowDir, 'flow.ts');
    if (!(await fileExists(flowTs))) continue;

    const days = await fs.readdir(flowDir, { withFileTypes: true });
    const dayDirs = days.filter((d) => d.isDirectory() && d.name.startsWith('Day-')).map((d) => path.join(flowDir, d.name));

    for (const dayDir of dayDirs) {
      const practicePath = path.join(dayDir, 'practice.ts');
      if (!(await fileExists(practicePath))) continue;
      scanned += 1;

      const raw = await fs.readFile(practicePath, 'utf8');
      const next = migrateContent(raw);
      if (next !== raw) {
        await fs.writeFile(practicePath, next, 'utf8');
        updated += 1;
      }
    }
  }

  console.log(`Scanned ${scanned} practice files; updated ${updated}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


