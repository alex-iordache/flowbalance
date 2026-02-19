import type { Flow, Language, LocalizedText } from '../data/flows';
import audioTitles from '../data/audioTitles.json';
import audioAliases from '../data/audioAliases.json';

type AudioTitlesMap = Record<string, { ro: string; en: string }>;
type AudioAliasesMap = Record<string, string>;

const TITLES = audioTitles as AudioTitlesMap;
const ALIASES = audioAliases as AudioAliasesMap;
const warnedMissingTitles = new Set<string>();

function basenameFromKey(k: string): string {
  const s = String(k || '').trim();
  if (!s) return '';
  // Strip querystring
  const noQ = s.split('?')[0] ?? s;
  // Keep only the last segment
  const parts = noQ.split('/');
  return parts[parts.length - 1] ?? '';
}

function canonicalAudioId(fileName: string): string {
  return (ALIASES[fileName] ?? fileName).trim();
}

export type StandaloneAudioItem = {
  /** Canonical filename, e.g. "body-scan.mp3" */
  id: string;
  /** Best-effort RO key used for playback (may be aliased like VECHI-...). */
  roKey: string;
  /** Best-effort EN key used for playback (optional). */
  enKey: string | null;
  /** Flow IDs in which this audio appears (derived from current flow data). */
  flowIds: string[];
  /**
   * Example practice IDs per flow, used for `/api/audio` entitlement checks.
   * (We only need one representative practice per flow.)
   */
  examplePracticeIdByFlowId: Record<string, string>;
  /** Display name for UI. */
  title: LocalizedText;
};

export type AudioUsageIndex = {
  byId: Map<string, StandaloneAudioItem>;
};

/**
 * Build an index of unique audio recordings across all flows.
 * - Dedupes by canonical audio id (supports aliases like VECHI-*).
 * - Derives flow membership from current flow/practice data (future-proof for new flows).
 * - Detects EN availability by scanning practice.audioUrl.en for `audioFilesEnAi/`.
 */
export function buildAudioUsageIndex(flows: Flow[]): AudioUsageIndex {
  const map = new Map<string, StandaloneAudioItem>();
  const EXCLUDED_FLOW_IDS = new Set<string>([
    // Story flows have English-only audio uploads and are intentionally excluded from stand-alone Exercises.
    'Calm-Stories',
    'Reflection-Stories',
  ]);

  const upsert = (params: {
    flowId: string;
    practiceId: string;
    roKey: string;
    enKey: string | null;
  }) => {
    const roFile = basenameFromKey(params.roKey);
    if (!roFile) return;
    const id = canonicalAudioId(roFile);
    if (!id) return;

    const prev = map.get(id);
    const titleFromJson = TITLES[id] ?? null;
    const fallbackTitle = {
      ro: id.replace(/\.mp3$/i, '').replace(/-/g, ' '),
      en: id.replace(/\.mp3$/i, '').replace(/-/g, ' '),
    };
    const title = titleFromJson ? { ro: titleFromJson.ro, en: titleFromJson.en } : fallbackTitle;
    if (!titleFromJson && process.env.NODE_ENV !== 'production' && !warnedMissingTitles.has(id)) {
      warnedMissingTitles.add(id);
      // eslint-disable-next-line no-console
      console.warn(`[standaloneAudioIndex] Missing title for ${id}. Add it to data/audioTitles.json for a nicer label.`);
    }

    if (!prev) {
      map.set(id, {
        id,
        roKey: params.roKey,
        enKey: params.enKey,
        flowIds: [params.flowId],
        examplePracticeIdByFlowId: { [params.flowId]: params.practiceId },
        title,
      });
      return;
    }

    // Merge: keep the first roKey as a stable default; adopt enKey if we discover one.
    const nextFlowIds = prev.flowIds.includes(params.flowId) ? prev.flowIds : [...prev.flowIds, params.flowId];
    const nextEnKey = prev.enKey ?? params.enKey;
    const nextExamples = { ...prev.examplePracticeIdByFlowId };
    if (!nextExamples[params.flowId]) nextExamples[params.flowId] = params.practiceId;
    map.set(id, { ...prev, flowIds: nextFlowIds, enKey: nextEnKey, examplePracticeIdByFlowId: nextExamples });
  };

  for (const flow of flows) {
    if (EXCLUDED_FLOW_IDS.has(flow.id)) continue;
    const fid = flow.id;
    for (const p of flow.practices ?? []) {
      const ro = (p as any)?.audioUrl?.ro;
      const en = (p as any)?.audioUrl?.en;
      if (typeof ro !== 'string' || !ro) continue;

      // Detect EN key only when it points to audioFilesEnAi.
      const enKey =
        typeof en === 'string' && en.startsWith('audioFilesEnAi/')
          ? en
          : null;

      upsert({ flowId: fid, practiceId: p.id, roKey: ro, enKey });
    }
  }

  return { byId: map };
}

export type OnboardingNeedId = string;

export type NeedFlowRef = { kind: 'flow' | 'category'; id: string };

export type NewOnboardingOption = {
  id: OnboardingNeedId;
  label: { ro: string; en: string };
  primary: NeedFlowRef;
  secondary: NeedFlowRef;
  /** Optional additional recommendations (used for Home flow recommendations). */
  third?: NeedFlowRef;
  fourth?: NeedFlowRef;
};

export type NewOnboardingConfig = {
  options: NewOnboardingOption[];
  constraints: { minSelections: number; maxSelections: number };
};

export type StandaloneAudioScored = StandaloneAudioItem & { points: number };

/**
 * Compute points for each audio item based on selected needs.
 * - Primary flow audio: +2
 * - Secondary flow audio: +1
 * - Sum across all selected needs, across overlapping flows.
 */
export function scoreStandaloneAudios(params: {
  flows: Flow[];
  audioIndex: AudioUsageIndex;
  selectedNeedIds: OnboardingNeedId[];
  onboarding: NewOnboardingConfig;
  resolvedNeedFlows: Map<
    OnboardingNeedId,
    { primaryFlowIds: string[]; secondaryFlowIds: string[] }
  >;
}): StandaloneAudioScored[] {
  const { audioIndex, selectedNeedIds, onboarding, resolvedNeedFlows } = params;

  const selectedSet = new Set(selectedNeedIds);
  const selectedInOrder = onboarding.options.filter(o => selectedSet.has(o.id)).map(o => o.id);

  const out: StandaloneAudioScored[] = [];

  for (const item of Array.from(audioIndex.byId.values())) {
    let points = 0;
    for (const needId of selectedInOrder) {
      const resolved = resolvedNeedFlows.get(needId) ?? { primaryFlowIds: [], secondaryFlowIds: [] };
      if (resolved.primaryFlowIds.some(fid => item.flowIds.includes(fid))) points += 2;
      if (resolved.secondaryFlowIds.some(fid => item.flowIds.includes(fid))) points += 1;
    }
    out.push({ ...item, points });
  }

  return out;
}

export function sortStandaloneAudios(list: StandaloneAudioScored[], lang: Language): StandaloneAudioScored[] {
  const pick = (t: LocalizedText) => (lang === 'ro' ? t.ro : t.en) ?? '';
  return [...list].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return pick(a.title).localeCompare(pick(b.title));
  });
}

/**
 * Pick the “context flow” for the dynamic message on the standalone practice detail screen.
 * Rules:
 * - Prefer one of the MAIN flows if present (Calming Anxiety / Improve Sleep / Self Trust / Healthy Money Mindset).
 * - Else use the first flow (deterministic).
 */
export function pickContextFlowId(flowIds: string[]): string | null {
  const MAIN = ['Calming-Anxiety', 'Improve-Sleep', 'Build-Self-Trust', 'Healthy-Money-Mindset'];
  for (const m of MAIN) if (flowIds.includes(m)) return m;
  return flowIds[0] ?? null;
}

export function getAudioKeyForLanguage(item: StandaloneAudioItem, lang: Language): string {
  if (lang === 'en' && item.enKey) return item.enKey;
  return item.roKey;
}
