'use client';

import type { Flow } from '../../data/flows';
import { defaultFlows } from '../../data/flows';

const DRAFT_KEY = 'flow_admin_draft_v1';
const LEGACY_REMOTE_AUDIO =
  'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/1-2-trecerea-peste-obstacole.mp3';
const DEFAULT_AUDIO_KEY = '1-2-trecerea-peste-obstacole.mp3';

type DraftPayload = {
  version: 1;
  flows: Flow[];
};

export function loadDraftFlows(): Flow[] | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DraftPayload;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.flows)) return null;

    // Guard against stale drafts from a different content set.
    // (Example: you change the repo's default flows, but the browser still has an older draft.)
    const draftIds = new Set(
      parsed.flows
        .map(f => (typeof (f as any)?.id === 'string' ? (f as any).id : null))
        .filter(Boolean),
    );
    const defaultIds = new Set(defaultFlows.map(f => f.id));

    let overlap = 0;
    for (const id of Array.from(draftIds)) {
      if (defaultIds.has(id)) overlap += 1;
    }

    const maxLen = Math.max(draftIds.size, defaultIds.size);
    const overlapRatio = maxLen === 0 ? 1 : overlap / maxLen;

    // If almost none of the ids match, treat it as an old draft and ignore it.
    // This still allows "draft adds a couple new flows" (high overlap) while blocking totally different datasets.
    if (overlap === 0 || overlapRatio < 0.5) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
      return null;
    }

    // Also sanitize known legacy remote audio URL to our canonical R2 key.
    return parsed.flows.map(flow => ({
      ...flow,
      practices: Array.isArray(flow.practices)
        ? flow.practices.map(p => ({
            ...p,
            audioUrl:
              p?.audioUrl?.ro === LEGACY_REMOTE_AUDIO || p?.audioUrl?.en === LEGACY_REMOTE_AUDIO
                ? { ro: DEFAULT_AUDIO_KEY, en: DEFAULT_AUDIO_KEY }
                : p.audioUrl,
          }))
        : flow.practices,
    }));
  } catch {
    return null;
  }
}

export function saveDraftFlows(flows: Flow[]): void {
  try {
    const payload: DraftPayload = { version: 1, flows };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function clearDraftFlows(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

