'use client';

import type { Flow } from '../../data/flows';

const DRAFT_KEY = 'flow_admin_draft_v1';

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
    return parsed.flows;
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

