/* eslint-disable no-console */
/**
 * Cleanup codemod artifacts:
 * - Remove trailing commas inside JSX expression braces like:
 *     <p>{something,}</p>
 *   which can happen when the original TS had a trailing comma.
 *
 * We conservatively replace:
 *   ,}</
 * with:
 *   }</
 * across all flow/practice data files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const FLOWS_DIR = path.join(ROOT, 'data', 'flows');

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function main() {
  const files = walk(FLOWS_DIR).filter((p) => p.endsWith('flow.tsx') || p.endsWith('practice.tsx'));
  let changed = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const next = src.replace(/,\s*}\s*<\//g, '}</').replace(/,\s*}\s*<\/>/g, '}</>');
    if (next !== src) {
      fs.writeFileSync(f, next, 'utf8');
      changed += 1;
    }
  }
  console.log(`fix-jsx-trailing-commas: changed ${changed}/${files.length} files`);
}

main();

