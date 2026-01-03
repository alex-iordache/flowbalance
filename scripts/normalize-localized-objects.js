#!/usr/bin/env node
/**
 * Converts generated data/flows modules from helper calls:
 *   localizedText("ro", "en") -> { ro: "ro", en: "en" }
 *   localizedUrl("ro", "en")  -> { ro: "ro", en: "en" }
 *
 * Also cleans up imports:
 * - practice.ts: removes `import { localizedText, localizedUrl } from '../../utils';`
 * - flow.ts: rewrites `import { localizedText, localizedUrl, withTotals } from '../utils';` -> `import { withTotals } from '../utils';`
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'data', 'flows');

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Matches a JS string literal in double quotes (generated via JSON.stringify).
const STR = '"(?:\\\\.|[^"\\\\])*"';
const reText = new RegExp(`localizedText\\(\\s*(${STR})\\s*,\\s*(${STR})\\s*\\)`, 'g');
const reUrl = new RegExp(`localizedUrl\\(\\s*(${STR})\\s*,\\s*(${STR})\\s*\\)`, 'g');

function transform(content) {
  let next = content;

  // Replace helper calls with object literals.
  next = next.replace(reText, '{ ro: $1, en: $2 }');
  next = next.replace(reUrl, '{ ro: $1, en: $2 }');

  // practice.ts imports
  next = next.replace(
    /^import\s+\{\s*localizedText\s*,\s*localizedUrl\s*\}\s+from\s+['"]\.\.\/\.\.\/utils['"];\s*\r?\n/gm,
    '',
  );

  // flow.ts imports (keep withTotals)
  next = next.replace(
    /^import\s+\{\s*localizedText\s*,\s*localizedUrl\s*,\s*withTotals\s*\}\s+from\s+['"]\.\.\/utils['"];\s*\r?\n/gm,
    `import { withTotals } from '../utils';\n`,
  );

  // If any flow.ts import variants remain (defensive)
  next = next.replace(
    /^import\s+\{\s*localizedText\s*,\s*withTotals\s*\}\s+from\s+['"]\.\.\/utils['"];\s*\r?\n/gm,
    `import { withTotals } from '../utils';\n`,
  );

  // Remove any now-unused localizedText/localizedUrl imports if present (best-effort).
  next = next.replace(
    /^import\s+\{\s*localizedText\s*,\s*localizedUrl\s*\}\s+from\s+['"][^'"]+['"];\s*\r?\n/gm,
    '',
  );

  return next;
}

function main() {
  const files = walk(TARGET_DIR).filter(p => p.endsWith('.ts'));
  let changed = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const after = transform(before);
    if (after !== before) {
      fs.writeFileSync(file, after, 'utf8');
      changed += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Normalized ${changed} files under data/flows/**`);
}

main();

