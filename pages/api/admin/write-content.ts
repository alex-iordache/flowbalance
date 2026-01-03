import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'node:path';
import fs from 'node:fs/promises';

type Localized = { ro: string; en: string };

type PracticeDraft = {
  id: string;
  position: number;
  title: Localized;
  name: Localized;
  intro: Localized;
  description: Localized;
  audioUrl: Localized;
};

type FlowDraft = {
  id: string;
  position: number;
  title: Localized;
  name: Localized;
  intro: Localized;
  description: Localized;
  image: Localized;
  practices: PracticeDraft[];
};

type AssetPayload = {
  /** Full data URL: data:<mime>;base64,... */
  dataUrl: string;
  mime?: string;
  name?: string;
};

type Body = {
  flows: FlowDraft[];
  assets?: Record<string, AssetPayload>;
};

function isDevLocalhost(req: NextApiRequest): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  const host = String(req.headers.host || '').toLowerCase();
  return host.startsWith('localhost:') || host.startsWith('127.0.0.1:') || host === 'localhost' || host === '127.0.0.1';
}

function getToken(): string | null {
  return process.env.ADMIN_WRITE_TOKEN || process.env.NEXT_PUBLIC_ADMIN_WRITE_TOKEN || null;
}

function slugify(input: string): string {
  return String(input || '')
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extFromMime(mime: string): string {
  const m = (mime || '').toLowerCase();
  if (m === 'image/jpeg') return 'jpg';
  if (m === 'image/png') return 'png';
  if (m === 'image/webp') return 'webp';
  if (m === 'image/gif') return 'gif';
  if (m === 'image/avif') return 'avif';
  return 'bin';
}

function tsLocalized(v: Localized): string {
  return `{ ro: ${JSON.stringify(v?.ro ?? '')}, en: ${JSON.stringify(v?.en ?? '')} }`;
}

function daySlugFromPractice(p: PracticeDraft): string {
  const id = String(p?.id || '');
  const match = id.match(/-Ziua-(\d{3})$/i);
  if (match) return `Day-${String(parseInt(match[1], 10))}`;
  const name = String(p?.name?.en || p?.name?.ro || '');
  const m2 = name.match(/Day\s+(\d+)/i);
  if (m2) return `Day-${m2[1]}`;
  return slugify(name || id) || 'Practice';
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

async function readPublicFile(root: string, publicPath: string): Promise<Buffer | null> {
  const rel = publicPath.replace(/^\//, '');
  const abs = path.join(root, 'public', rel);
  try {
    return await fs.readFile(abs);
  } catch {
    return null;
  }
}

async function fetchToBuffer(url: string): Promise<{ buf: Buffer; mime: string } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const mime = res.headers.get('content-type') || '';
    const ab = await res.arrayBuffer();
    return { buf: Buffer.from(ab), mime };
  } catch {
    return null;
  }
}

function parseDataUrl(dataUrl: string): { mime: string; buf: Buffer } | null {
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) return null;
  const mime = m[1] || '';
  const b64 = m[2] || '';
  try {
    return { mime, buf: Buffer.from(b64, 'base64') };
  } catch {
    return null;
  }
}

async function resolveAndWriteImage(
  projectRoot: string,
  flowSlug: string,
  which: 'ro' | 'en',
  raw: string,
  assets: Record<string, AssetPayload> | undefined,
): Promise<string | null> {
  if (!raw) return null;

  let buf: Buffer | null = null;
  let mime = '';

  if (raw.startsWith('asset:')) {
    const key = raw.slice('asset:'.length);
    const payload = assets?.[key];
    if (!payload?.dataUrl) return null;
    const parsed = parseDataUrl(payload.dataUrl);
    if (!parsed) return null;
    buf = parsed.buf;
    mime = payload.mime || parsed.mime || '';
  } else if (raw.startsWith('http://') || raw.startsWith('https://')) {
    const fetched = await fetchToBuffer(raw);
    if (!fetched) return null;
    buf = fetched.buf;
    mime = fetched.mime || '';
  } else if (raw.startsWith('/')) {
    const fromPublic = await readPublicFile(projectRoot, raw);
    if (!fromPublic) return null;
    buf = fromPublic;
    mime = '';
  } else {
    return null;
  }

  const ext = extFromMime(mime || '');
  const fileName = `cover-${which}.${ext === 'bin' ? 'jpg' : ext}`;
  const publicPath = `/data/flows/${flowSlug}/${fileName}`;
  const absDir = path.join(projectRoot, 'public', 'data', 'flows', flowSlug);
  await ensureDir(absDir);
  await fs.writeFile(path.join(absDir, fileName), buf);
  return publicPath;
}

function buildPracticeTs(practice: PracticeDraft, position: number): string {
  return `import type { Practice } from '../../types';\n\nconst practice: Practice = {\n  id: ${JSON.stringify(practice.id)},\n  position: ${position},\n  title: ${tsLocalized(practice.title)},\n  name: ${tsLocalized(practice.name)},\n  intro: ${tsLocalized(practice.intro)},\n  description: ${tsLocalized(practice.description)},\n  audioUrl: ${tsLocalized(practice.audioUrl)},\n\n  finished: false,\n  lastPositionSec: 0,\n};\n\nexport default practice;\n`;
}

function buildFlowTs(flow: FlowDraft, practiceImports: Array<{ name: string; path: string }>, position: number): string {
  return `import type { Flow } from '../types';\nimport { withTotals } from '../utils';\n${practiceImports.map(p => `import ${p.name} from ${JSON.stringify(p.path)};`).join('\n')}\n\nconst flow: Flow = withTotals({\n  id: ${JSON.stringify(flow.id)},\n  position: ${position},\n  title: ${tsLocalized(flow.title)},\n  name: ${tsLocalized(flow.name)},\n  intro: ${tsLocalized(flow.intro)},\n  description: ${tsLocalized(flow.description)},\n  image: ${tsLocalized(flow.image)},\n\n  practices: [${practiceImports.map(p => p.name).join(', ')}],\n\n  started: false,\n  finished: false,\n  practicesCompleted: 0,\n  lastPracticeFinishedId: null,\n  lastPracticePositionSec: 0,\n});\n\nexport default flow;\n`;
}

function buildFlowsIndexTs(entries: Array<{ importName: string; flowSlug: string }>): string {
  return `import type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language } from './types';\nimport { t } from './types';\n\n${entries.map(e => `import ${e.importName} from ${JSON.stringify(`./${e.flowSlug}/flow`)};`).join('\n')}\n\nexport { t };\nexport type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language };\n\nexport const defaultFlows: Flow[] = [\n${entries.map(e => `  ${e.importName},`).join('\n')}\n];\n`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isDevLocalhost(req)) {
    res.status(404).json({ error: 'Not available' });
    return;
  }

  const token = getToken();
  if (!token) {
    res.status(500).json({ error: 'Missing ADMIN_WRITE_TOKEN (or NEXT_PUBLIC_ADMIN_WRITE_TOKEN) in .env.local' });
    return;
  }

  const provided = String(req.headers['x-admin-token'] || '');
  if (provided !== token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body as Body;
  if (!body || !Array.isArray(body.flows)) {
    res.status(400).json({ error: 'Invalid body' });
    return;
  }

  const projectRoot = process.cwd();
  const flowsDir = path.join(projectRoot, 'data', 'flows');
  await ensureDir(flowsDir);

  const indexEntries: Array<{ importName: string; flowSlug: string }> = [];

  for (let i = 0; i < body.flows.length; i += 1) {
    const flow = body.flows[i];
    const flowSlug = slugify(flow.name.en || flow.name.ro || flow.id) || slugify(flow.id) || `Flow-${i + 1}`;
    const flowBase = path.join(flowsDir, flowSlug);
    await ensureDir(flowBase);

    // Materialize cover images into public/data/flows/<FlowSlug>/cover-*.ext when possible
    const roCover = await resolveAndWriteImage(projectRoot, flowSlug, 'ro', flow.image.ro, body.assets);
    const enCover = await resolveAndWriteImage(projectRoot, flowSlug, 'en', flow.image.en, body.assets);
    const nextFlow: FlowDraft = {
      ...flow,
      image: {
        ro: roCover || flow.image.ro,
        en: enCover || flow.image.en,
      },
    };

    const practiceImports: Array<{ name: string; path: string }> = [];
    const practices = Array.isArray(nextFlow.practices) ? nextFlow.practices : [];

    for (let p = 0; p < practices.length; p += 1) {
      const practice = practices[p];
      const practiceSlug = daySlugFromPractice(practice);
      const practiceDir = path.join(flowBase, practiceSlug);
      await ensureDir(practiceDir);
      const importName = `practice_${p + 1}`;
      practiceImports.push({ name: importName, path: `./${practiceSlug}/practice` });
      const practiceTs = buildPracticeTs(practice, p + 1);
      await fs.writeFile(path.join(practiceDir, 'practice.ts'), practiceTs, 'utf8');
    }

    const flowTs = buildFlowTs(nextFlow, practiceImports, i + 1);
    await fs.writeFile(path.join(flowBase, 'flow.ts'), flowTs, 'utf8');

    indexEntries.push({ importName: `flow_${i + 1}_${flowSlug.replace(/-/g, '_')}`, flowSlug });
  }

  const indexTs = buildFlowsIndexTs(indexEntries);
  await fs.writeFile(path.join(flowsDir, 'index.ts'), indexTs, 'utf8');

  res.status(200).json({ ok: true, flows: body.flows.length });
}

