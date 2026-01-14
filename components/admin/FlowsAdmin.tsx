'use client';

import { useEffect, useMemo, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { addOutline, createOutline, arrowUpOutline, arrowDownOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import { t, type Flow, type Language, type LocalizedText, type LocalizedUrl, type LocalizedRichText } from '../../data/flows';
import { isDesktopWeb } from './adminEnv';
import { loadDraftFlows, saveDraftFlows } from './draftStorage';
import { getAsset, putAsset } from './assetsDb';
import SaveToRepoButton from './SaveToRepoButton';

function emptyLocalizedText(): LocalizedText {
  return { ro: '', en: '' };
}

function emptyLocalizedUrl(): LocalizedUrl {
  return { ro: '', en: '' };
}

function emptyLocalizedRichText(): LocalizedRichText {
  return { ro: '', en: '' };
}

function normalizeFlowOrder(flows: Flow[]): Flow[] {
  return flows.map((f, idx) => ({ ...f, position: idx + 1 }));
}

function createNewFlow(position: number): Flow {
  const id = `NewFlow-${Date.now()}`;
  return {
    id,
    position,
    title: { ro: 'New Flow', en: 'New Flow' },
    name: { ro: 'New Flow', en: 'New Flow' },
    intro: emptyLocalizedText(),
    description: emptyLocalizedRichText(),
    image: emptyLocalizedUrl(),
    practices: [],
    totalPractices: 0,

    started: false,
    finished: false,
    practicesCompleted: 0,
    lastPracticeFinishedId: null,
    lastPracticePositionSec: 0,
  };
}

function FlowEditModal({
  isOpen,
  flow,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  flow: Flow | null;
  onClose: () => void;
  onSave: (updated: Flow) => void;
}) {
  const [draft, setDraft] = useState<Flow | null>(flow);

  useEffect(() => {
    setDraft(flow);
  }, [flow]);

  if (!isOpen || !draft) return null;
  const descRo = draft.description.ro;
  const descEn = draft.description.en;
  const descRoIsString = typeof descRo === 'string';
  const descEnIsString = typeof descEn === 'string';

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">Edit flow</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-700">Flow ID</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.id}
              onChange={e => setDraft({ ...draft, id: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Image URL (RO)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.image.ro}
              onChange={e => setDraft({ ...draft, image: { ...draft.image, ro: e.target.value } })}
              placeholder="/data/flows/Flow-Slug/cover.jpg or https://..."
            />
            <div className="mt-2">
              <label className="text-xs font-semibold text-gray-600">or upload (RO)</label>
              <input
                className="mt-1 block w-full text-xs"
                type="file"
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const key = `flow-cover:${draft.id}:ro`;
                  await putAsset(key, file);
                  setDraft(curr => (curr ? { ...curr, image: { ...curr.image, ro: `asset:${key}` } } : curr));
                }}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Title (RO)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.title.ro}
              onChange={e => setDraft({ ...draft, title: { ...draft.title, ro: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Title (EN)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.title.en}
              onChange={e => setDraft({ ...draft, title: { ...draft.title, en: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Name (RO)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.name.ro}
              onChange={e => setDraft({ ...draft, name: { ...draft.name, ro: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Name (EN)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.name.en}
              onChange={e => setDraft({ ...draft, name: { ...draft.name, en: e.target.value } })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Intro (RO)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.intro.ro}
              onChange={e => setDraft({ ...draft, intro: { ...draft.intro, ro: e.target.value } })}
              rows={2}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Intro (EN)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.intro.en}
              onChange={e => setDraft({ ...draft, intro: { ...draft.intro, en: e.target.value } })}
              rows={2}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Description (RO)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={descRoIsString ? descRo : ''}
              disabled={!descRoIsString}
              onChange={e => setDraft({ ...draft, description: { ...draft.description, ro: e.target.value } })}
              rows={4}
            />
            {!descRoIsString ? (
              <div className="mt-1 text-xs text-gray-500">
                This description is JSX-coded. Edit it in the source flow file (not here).
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Description (EN)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={descEnIsString ? descEn : ''}
              disabled={!descEnIsString}
              onChange={e => setDraft({ ...draft, description: { ...draft.description, en: e.target.value } })}
              rows={4}
            />
            {!descEnIsString ? (
              <div className="mt-1 text-xs text-gray-500">
                This description is JSX-coded. Edit it in the source flow file (not here).
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Image URL (EN)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.image.en}
              onChange={e => setDraft({ ...draft, image: { ...draft.image, en: e.target.value } })}
              placeholder="/data/flows/Flow-Slug/cover.jpg or https://..."
            />
            <div className="mt-2">
              <label className="text-xs font-semibold text-gray-600">or upload (EN)</label>
              <input
                className="mt-1 block w-full text-xs"
                type="file"
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const key = `flow-cover:${draft.id}:en`;
                  await putAsset(key, file);
                  setDraft(curr => (curr ? { ...curr, image: { ...curr.image, en: `asset:${key}` } } : curr));
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-lg border px-4 py-2 text-sm" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            onClick={() => onSave(draft)}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FlowsAdmin({ lang }: { lang: Language }) {
  const history = useHistory();

  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const adminContentEditingTools = Store.useState(s => Boolean((s.settings as any)?.adminContentEditingTools));
  const allowAdmin = isSuperAdmin && adminContentEditingTools && isDesktopWeb();

  const flows = Store.useState(s => s.flows);

  // On admin desktop web: load draft once and override current flows for editing.
  useEffect(() => {
    if (!allowAdmin) return;
    const draft = loadDraftFlows();
    if (!draft) return;
    Store.update(s => {
      s.flows = draft;
    });
  }, [allowAdmin]);

  // Keep a normalized, stable list (so positions reflect visual order).
  const normalized = useMemo(() => normalizeFlowOrder(flows), [flows]);

  // Resolve uploaded asset URLs to object URLs for preview.
  const [assetObjectUrls, setAssetObjectUrls] = useState<Record<string, string>>({});
  const imageKey = useMemo(
    () => normalized.map(f => `${f.image.ro}|${f.image.en}`).join('||'),
    [normalized],
  );
  useEffect(() => {
    let cancelled = false;
    const created: string[] = [];

    void (async () => {
      const assetKeys = new Set<string>();
      normalized.forEach(f => {
        [f.image.ro, f.image.en].forEach(u => {
          if (typeof u === 'string' && u.startsWith('asset:')) assetKeys.add(u.slice('asset:'.length));
        });
      });

      for (const key of Array.from(assetKeys)) {
        if (assetObjectUrls[key]) continue;
        const rec = await getAsset(key);
        if (!rec) continue;
        const url = URL.createObjectURL(rec.blob);
        created.push(url);
        if (cancelled) return;
        setAssetObjectUrls(prev => ({ ...prev, [key]: url }));
      }
    })();

    return () => {
      cancelled = true;
      created.forEach(u => {
        try {
          URL.revokeObjectURL(u);
        } catch {
          // ignore
        }
      });
    };
  }, [assetObjectUrls, imageKey, normalized]);

  const resolveUrl = (u: string): string => {
    if (u.startsWith('asset:')) {
      const key = u.slice('asset:'.length);
      return assetObjectUrls[key] ?? '';
    }
    return u;
  };

  const [editingFlowId, setEditingFlowId] = useState<string | null>(null);
  const editingFlow = normalized.find(f => f.id === editingFlowId) ?? null;

  const persistAndSet = (next: Flow[]) => {
    const normalizedNext = normalizeFlowOrder(next).map(f => ({ ...f, totalPractices: f.practices.length }));
    Store.update(s => {
      s.flows = normalizedNext;
    });
    saveDraftFlows(normalizedNext);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...normalized];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return;
    const tmp = next[idx];
    next[idx] = next[to];
    next[to] = tmp;
    persistAndSet(next);
  };

  const addFlow = () => {
    const next = [...normalized, createNewFlow(normalized.length + 1)];
    persistAndSet(next);
  };

  const saveFlow = (updated: Flow) => {
    const next = normalized.map(f => (f.id === editingFlowId ? { ...updated, practices: f.practices } : f));
    persistAndSet(next);
    setEditingFlowId(null);
  };

  if (!allowAdmin) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between py-3">
        <div className="text-xs text-white/70">
          Admin draft mode (local only). Use “Save to repo” on localhost to write files.
        </div>
        <div className="flex items-center gap-2">
          <SaveToRepoButton />
          <IonButton onClick={addFlow} color="light" size="small">
            <IonIcon icon={addOutline} slot="start" />
            New flow
          </IonButton>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6">
        {normalized.map((flow, idx) => (
          <div
            key={flow.id}
            className="flow-entry cursor-pointer flex flex-row items-start p-6 rounded-lg shadow-xl w-full gap-4 relative"
            onClick={() => history.push(`/flows/${flow.id}`)}
          >
            <img
              className="object-contain w-24 h-24 rounded-base flex-shrink-0 md:w-48 md:h-48 self-start"
              src={resolveUrl(t(flow.image, lang))}
              alt={t(flow.name, lang)}
            />
            <div className="flex flex-col justify-between flex-1 leading-normal min-w-0">
              <h5 className="mt-0 mb-2 text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                {t(flow.name, lang)}
              </h5>
              <p className="mb-1 text-sm md:text-base text-white">{t(flow.intro, lang)}</p>
            </div>

            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
                onClick={e => {
                  e.stopPropagation();
                  move(idx, -1);
                }}
                title="Move up"
              >
                <IonIcon icon={arrowUpOutline} />
              </button>
              <button
                type="button"
                className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
                onClick={e => {
                  e.stopPropagation();
                  move(idx, 1);
                }}
                title="Move down"
              >
                <IonIcon icon={arrowDownOutline} />
              </button>
              <button
                type="button"
                className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
                onClick={e => {
                  e.stopPropagation();
                  setEditingFlowId(flow.id);
                }}
                title="Edit"
              >
                <IonIcon icon={createOutline} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <FlowEditModal
        isOpen={Boolean(editingFlowId)}
        flow={editingFlow}
        onClose={() => setEditingFlowId(null)}
        onSave={saveFlow}
      />
    </div>
  );
}

