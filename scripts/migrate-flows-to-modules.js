#!/usr/bin/env node
/**
 * One-time migration script:
 * - Reads legacy flows from data/index.ts
 * - Generates new module structure under data/flows/<FlowSlug>/** and public/data/flows/<FlowSlug>/**
 *
 * Safe to re-run: it will overwrite generated TS files, and ensure assets exist.
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const LEGACY_DATA = path.join(ROOT, 'data', 'index.ts');
const FLOWS_DIR = path.join(ROOT, 'data', 'flows');
const PUBLIC_DIR = path.join(ROOT, 'public');
const LEGACY_FLOW_IMG_DIR = path.join(PUBLIC_DIR, 'img', 'flows');
const NEW_PUBLIC_FLOW_DIR = path.join(PUBLIC_DIR, 'data', 'flows');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function slugify(input) {
  return String(input || '')
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function daySlugFromPractice(practice) {
  const id = String(practice?.id || '');
  const match = id.match(/-Ziua-(\d{3})$/i);
  if (match) {
    const n = String(parseInt(match[1], 10));
    return `Day-${n}`;
  }
  const name = String(practice?.name || '');
  const m2 = name.match(/Day\s+(\d+)/i);
  if (m2) return `Day-${m2[1]}`;
  return slugify(name || id) || 'Practice';
}

function localizedTextLiteral(s) {
  const safe = String(s ?? '');
  // keep EN same for now
  return `{ ro: ${JSON.stringify(safe)}, en: ${JSON.stringify(safe)} }`;
}

function localizedUrlLiteral(u) {
  const safe = String(u ?? '');
  return `{ ro: ${JSON.stringify(safe)}, en: ${JSON.stringify(safe)} }`;
}

function transpileAndEval(tsFile) {
  const source = fs.readFileSync(tsFile, 'utf8');
  const out = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: path.basename(tsFile),
  }).outputText;

  const module = { exports: {} };
  // IMPORTANT: CommonJS expects `exports` to alias `module.exports`.
  const sandbox = {
    module,
    exports: module.exports,
    require,
    console,
    __dirname: path.dirname(tsFile),
    __filename: tsFile,
  };
  vm.runInNewContext(out, sandbox, { filename: tsFile, timeout: 5000 });
  return module.exports;
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, 'utf8');
}

function copyFlowImage(flowSlug, legacyImagePath) {
  // legacyImagePath like "/img/flows/stress-break.jpg"
  const rel = String(legacyImagePath || '').replace(/^\//, '');
  const src = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(src)) {
    // fallback: try within legacy flows directory by basename
    const base = path.basename(rel);
    const alt = path.join(LEGACY_FLOW_IMG_DIR, base);
    if (fs.existsSync(alt)) return copyFlowImage(flowSlug, `/img/flows/${base}`);
    return { ro: legacyImagePath, en: legacyImagePath };
  }

  const ext = path.extname(src) || '.jpg';
  const dstDir = path.join(NEW_PUBLIC_FLOW_DIR, flowSlug);
  ensureDir(dstDir);
  const dst = path.join(dstDir, `cover${ext}`);
  fs.copyFileSync(src, dst);
  const publicPath = `/data/flows/${flowSlug}/cover${ext}`;
  return { ro: publicPath, en: publicPath };
}

function main() {
  ensureDir(FLOWS_DIR);
  ensureDir(NEW_PUBLIC_FLOW_DIR);

  const legacy = transpileAndEval(LEGACY_DATA);
  const flows = Array.isArray(legacy.flows) ? legacy.flows : [];
  if (!flows.length) {
    console.error('No flows found in legacy data/index.ts');
    process.exit(1);
  }

  const flowExports = [];

  flows.forEach((flow, flowIdx) => {
    const flowName = String(flow?.name || flow?.id || `Flow${flowIdx + 1}`);
    const flowSlug = slugify(flowName) || slugify(flow?.id) || `Flow-${flowIdx + 1}`;

    const flowDir = path.join(FLOWS_DIR, flowSlug);
    ensureDir(flowDir);

    // copy image
    const imageLocalized = copyFlowImage(flowSlug, flow?.image);

    // practices
    const practices = Array.isArray(flow?.practices) ? flow.practices : [];
    const practiceImports = [];
    const practiceRefs = [];

    practices.forEach((pr, idx) => {
      const pSlug = daySlugFromPractice(pr);
      const pDir = path.join(flowDir, pSlug);
      ensureDir(pDir);

      const prId = String(pr?.id || `${flow?.id || flowSlug}-Practice-${idx + 1}`);
      const prName = String(pr?.name || pSlug.replace('-', ' '));
      const prDesc = String(pr?.description || '');
      const prAudio = String(pr?.audioURL || '');

      const practiceVar = `practice_${idx + 1}`;
      const importPath = `./${pSlug}/practice`;
      practiceImports.push(`import ${practiceVar} from ${JSON.stringify(importPath)};`);
      practiceRefs.push(practiceVar);

      const practiceTs = `import type { Practice } from '../../types';\nimport { localizedText, localizedUrl } from '../../utils';\n\nconst practice: Practice = {\n  id: ${JSON.stringify(prId)},\n  position: ${idx + 1},\n  title: ${localizedTextLiteral(prName)},\n  name: ${localizedTextLiteral(prName)},\n  intro: ${localizedTextLiteral('')},\n  description: ${localizedTextLiteral(prDesc)},\n  audioUrl: ${localizedUrlLiteral(prAudio)},\n\n  finished: false,\n  lastPositionSec: 0,\n};\n\nexport default practice;\n`;
      const practiceTs = `import type { Practice } from '../../types';\n\nconst practice: Practice = {\n  id: ${JSON.stringify(prId)},\n  position: ${idx + 1},\n  title: ${localizedTextLiteral(prName)},\n  name: ${localizedTextLiteral(prName)},\n  intro: ${localizedTextLiteral('')},\n  description: ${localizedTextLiteral(prDesc)},\n  audioUrl: ${localizedUrlLiteral(prAudio)},\n\n  finished: false,\n  lastPositionSec: 0,\n};\n\nexport default practice;\n`;

      writeFile(path.join(pDir, 'practice.ts'), practiceTs);
    });

    const flowTs = `import type { Flow } from '../types';\nimport { withTotals } from '../utils';\n${practiceImports.join('\n')}\n\nconst flow: Flow = withTotals({\n  id: ${JSON.stringify(flow?.id || flowSlug)},\n  position: ${flowIdx + 1},\n  title: ${localizedTextLiteral(flowName)},\n  name: ${localizedTextLiteral(flowName)},\n  intro: ${localizedTextLiteral(flow?.intro || '')},\n  description: ${localizedTextLiteral(flow?.description || '')},\n  image: { ro: ${JSON.stringify(imageLocalized.ro)}, en: ${JSON.stringify(imageLocalized.en)} },\n\n  practices: [${practiceRefs.join(', ')}],\n\n  started: false,\n  finished: false,\n  practicesCompleted: 0,\n  lastPracticeFinishedId: null,\n  lastPracticePositionSec: 0,\n});\n\nexport default flow;\n`;

    writeFile(path.join(flowDir, 'flow.ts'), flowTs);

    const exportName = `flow_${flowIdx + 1}_${flowSlug.replace(/-/g, '_')}`;
    flowExports.push({ exportName, flowSlug });
  });

  // data/flows/index.ts
  const indexLines = [];
  indexLines.push(`import type { Flow } from './types';`);
  flowExports.forEach(({ exportName, flowSlug }) => {
    indexLines.push(`import ${exportName} from ${JSON.stringify(`./${flowSlug}/flow`)};`);
  });
  indexLines.push('');
  indexLines.push('export { t } from ./types;');
  indexLines.push('');
  indexLines.push('export type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language } from ./types;');
  indexLines.push('');
  indexLines.push('export const defaultFlows: Flow[] = [');
  flowExports.forEach(({ exportName }) => indexLines.push(`  ${exportName},`));
  indexLines.push('];');
  indexLines.push('');

  // Fix incorrect relative strings above by generating correctly:
  const indexContent = `import type { Flow } from './types';\nimport type { Practice, Localized, LocalizedText, LocalizedUrl, Language } from './types';\nimport { t } from './types';\n\n${flowExports
    .map(({ exportName, flowSlug }) => `import ${exportName} from ${JSON.stringify(`./${flowSlug}/flow`)};`)
    .join('\n')}\n\nexport { t };\nexport type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language };\n\nexport const defaultFlows: Flow[] = [\n${flowExports.map(({ exportName }) => `  ${exportName},`).join('\n')}\n];\n`;

  writeFile(path.join(FLOWS_DIR, 'index.ts'), indexContent);

  console.log(`Migrated ${flows.length} flows into data/flows/** and copied images into public/data/flows/**`);
}

main();

