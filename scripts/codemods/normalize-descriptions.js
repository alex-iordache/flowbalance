/* eslint-disable no-console */
/**
 * Codemod: normalize flow/practice description fields to:
 *   const roDescription = (<>...</>);
 *   const enDescription = (<>...</>);
 * and then:
 *   description: { ro: roDescription, en: enDescription }
 *
 * - If EN is "AIT", we set enDescription = roDescription (so FE never shows "AIT")
 * - If description is already wired to roDescription/enDescription, we skip.
 *
 * This codemod is intentionally conservative and only targets a common pattern:
 *   description: { ro: <expr>, en: <expr> },
 * across both flow and practice files.
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

function isAitExpr(expr) {
  const t = expr.trim();
  return t === '"AIT"' || t === "'AIT'" || t === '`AIT`';
}

function hasConsts(src) {
  return /const\s+roDescription\s*=/.test(src) && /const\s+enDescription\s*=/.test(src);
}

function insertConstsAfterImports(src, constBlock) {
  // Insert after the last top-level import ...; line.
  const lines = src.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*import\s+.*;\s*$/.test(line)) lastImportIdx = i;
    // Stop once we hit first non-import, non-empty line after imports block.
    if (lastImportIdx >= 0 && i > lastImportIdx && line.trim() !== '' && !/^\s*import\s+/.test(line)) break;
  }

  const insertAt = lastImportIdx >= 0 ? lastImportIdx + 1 : 0;
  const before = lines.slice(0, insertAt);
  const after = lines.slice(insertAt);

  // Ensure a blank line separation.
  if (before.length && before[before.length - 1].trim() !== '') before.push('');
  before.push(...constBlock.trimEnd().split('\n'));
  before.push('');

  return [...before, ...after].join('\n');
}

function normalizeOneFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  if (hasConsts(src)) return { changed: false, reason: 'already_has_consts' };

  // Skip if already using roDescription/enDescription for the property.
  if (/description\s*:\s*\{\s*ro\s*:\s*roDescription\s*,\s*en\s*:\s*enDescription\s*\}/.test(src)) {
    return { changed: false, reason: 'already_wired' };
  }

  // Match:
  // description: { ro: <expr>, en: <expr> },
  // including multiline and string-concat expressions.
  const descRe = /(^[ \t]*)description\s*:\s*\{\s*ro\s*:\s*([\s\S]*?)\s*,\s*en\s*:\s*([\s\S]*?)\s*\}\s*,/m;
  const m = src.match(descRe);
  if (!m) return { changed: false, reason: 'no_match' };

  const indent = m[1] || '';
  const roExpr = m[2].trim();
  const enExpr = m[3].trim();

  // Build const blocks. We wrap non-JSX expressions in <p>{expr}</p>
  // We treat anything containing '<' as "probably JSX" (conservative).
  const roIsProbablyJsx = roExpr.includes('<');
  const enIsProbablyJsx = enExpr.includes('<');

  const roConst = roIsProbablyJsx
    ? `const roDescription = ${roExpr.replace(/;$/, '')};`
    : `const roDescription = (\n  <>\n    <p>{${roExpr}}</p>\n  </>\n);`;

  const enConst = isAitExpr(enExpr)
    ? `const enDescription = roDescription;`
    : enIsProbablyJsx
      ? `const enDescription = ${enExpr.replace(/;$/, '')};`
      : `const enDescription = (\n  <>\n    <p>{${enExpr}}</p>\n  </>\n);`;

  const constBlock = `${roConst}\n${enConst}`;

  // Replace description with constants.
  const replaced = src.replace(descRe, `${indent}description: { ro: roDescription, en: enDescription },`);
  const next = insertConstsAfterImports(replaced, constBlock);

  if (next === src) return { changed: false, reason: 'noop' };
  fs.writeFileSync(filePath, next, 'utf8');
  return { changed: true };
}

function main() {
  const files = walk(FLOWS_DIR).filter((p) => p.endsWith('flow.tsx') || p.endsWith('practice.tsx'));
  let changed = 0;
  const skipped = {};

  for (const f of files) {
    const res = normalizeOneFile(f);
    if (res.changed) changed += 1;
    else {
      skipped[res.reason] = (skipped[res.reason] || 0) + 1;
    }
  }

  console.log(`normalize-descriptions: changed ${changed}/${files.length} files`);
  console.log('skipped breakdown:', skipped);
}

main();

