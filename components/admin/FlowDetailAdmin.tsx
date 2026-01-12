'use client';

import { useEffect, useMemo, useState } from 'react';
import { IonBadge, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { addOutline, arrowDownOutline, arrowUpOutline, createOutline, lockClosedOutline, playCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import Store from '../../store';
import { t, type Flow, type Language, type Practice } from '../../data/flows';
import { usePracticeAccess } from '../../hooks/useAccessControl';
import { isDesktopWeb } from './adminEnv';
import { loadDraftFlows, saveDraftFlows } from './draftStorage';
import SaveToRepoButton from './SaveToRepoButton';

function normalizePracticeOrder(practices: Practice[]): Practice[] {
  return practices.map((p, idx) => ({ ...p, position: idx + 1 }));
}

function createNewPractice(position: number): Practice {
  const id = `NewPractice-${Date.now()}`;
  return {
    id,
    position,
    title: { ro: 'New Practice', en: 'New Practice' },
    name: { ro: 'New Practice', en: 'New Practice' },
    intro: { ro: '', en: '' },
    description: { ro: '', en: '' },
    audioUrl: { ro: '', en: '' },

    finished: false,
    lastPositionSec: 0,
  };
}

function PracticeEditModal({
  isOpen,
  practice,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  practice: Practice | null;
  onClose: () => void;
  onSave: (updated: Practice) => void;
}) {
  const [draft, setDraft] = useState<Practice | null>(practice);

  useEffect(() => {
    setDraft(practice);
  }, [practice]);

  if (!isOpen || !draft) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">Edit practice</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-700">Practice ID</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.id}
              onChange={e => setDraft({ ...draft, id: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Audio URL (RO)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.audioUrl.ro}
              onChange={e => setDraft({ ...draft, audioUrl: { ...draft.audioUrl, ro: e.target.value } })}
            />
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
            <label className="text-sm font-semibold text-gray-700">Description (RO)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.description.ro}
              onChange={e => setDraft({ ...draft, description: { ...draft.description, ro: e.target.value } })}
              rows={4}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Description (EN)</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.description.en}
              onChange={e => setDraft({ ...draft, description: { ...draft.description, en: e.target.value } })}
              rows={4}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Audio URL (EN)</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={draft.audioUrl.en}
              onChange={e => setDraft({ ...draft, audioUrl: { ...draft.audioUrl, en: e.target.value } })}
            />
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

function PracticeAdminRow({
  practice,
  idx,
  flowId,
  flowIndex,
  lang,
  onMove,
  onEdit,
}: {
  practice: Practice;
  idx: number;
  flowId: string;
  flowIndex: number;
  lang: Language;
  onMove: (idx: number, dir: -1 | 1) => void;
  onEdit: (practiceId: string) => void;
}) {
  const hasAccess = usePracticeAccess(flowId, practice.id, flowIndex, idx);

  return (
    <IonItem key={practice.id} className="no-bg-color py-4 text-white" routerLink={`/flows/${flowId}/${practice.id}`}>
      <IonIcon className="text-white text-3xl" icon={hasAccess ? playCircleOutline : lockClosedOutline} />
      <IonLabel className="pl-5 text-white text-lg">
        {t(practice.name, lang)}
        {!hasAccess && (
          <IonBadge color="warning" className="ml-2">
            Premium
          </IonBadge>
        )}
      </IonLabel>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onMove(idx, -1);
          }}
          title="Move up"
        >
          <IonIcon icon={arrowUpOutline} />
        </button>
        <button
          type="button"
          className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onMove(idx, 1);
          }}
          title="Move down"
        >
          <IonIcon icon={arrowDownOutline} />
        </button>
        <button
          type="button"
          className="rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-white text-sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(practice.id);
          }}
          title="Edit"
        >
          <IonIcon icon={createOutline} />
        </button>
      </div>
    </IonItem>
  );
}

export default function FlowDetailAdmin({
  flowId,
  flowIndex,
  lang,
}: {
  flowId: string;
  flowIndex: number;
  lang: Language;
}) {
  const history = useHistory();
  const isSuperAdmin = Store.useState(s => s.isSuperAdmin);
  const adminContentEditingTools = Store.useState(s => Boolean((s.settings as any)?.adminContentEditingTools));
  const allowAdmin = isSuperAdmin && adminContentEditingTools && isDesktopWeb();

  const flows = Store.useState(s => s.flows);
  const flow = flows.find(f => f.id === flowId) ?? null;

  useEffect(() => {
    if (!allowAdmin) return;
    const draft = loadDraftFlows();
    if (!draft) return;
    Store.update(s => {
      s.flows = draft;
    });
  }, [allowAdmin]);

  const practices = useMemo(() => normalizePracticeOrder(flow?.practices ?? []), [flow?.practices]);

  const persistFlows = (nextFlows: Flow[]) => {
    Store.update(s => {
      s.flows = nextFlows;
    });
    saveDraftFlows(nextFlows);
  };

  const updateFlowPractices = (nextPractices: Practice[]) => {
    if (!flow) return;
    const nextFlows = flows.map(f =>
      f.id === flow.id
        ? {
            ...f,
            practices: normalizePracticeOrder(nextPractices),
            totalPractices: nextPractices.length,
          }
        : f,
    );
    persistFlows(nextFlows);
  };

  const movePractice = (idx: number, dir: -1 | 1) => {
    const next = [...practices];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return;
    const tmp = next[idx];
    next[idx] = next[to];
    next[to] = tmp;
    updateFlowPractices(next);
  };

  const addPractice = () => {
    updateFlowPractices([...practices, createNewPractice(practices.length + 1)]);
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = practices.find(p => p.id === editingId) ?? null;

  const savePractice = (updated: Practice) => {
    const next = practices.map(p => (p.id === editingId ? { ...updated, finished: p.finished, lastPositionSec: p.lastPositionSec } : p));
    updateFlowPractices(next);
    setEditingId(null);
  };

  if (!allowAdmin || !flow) return null;

  return (
    <div className="no-bg-color">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="text-xs text-white/70">Admin draft mode (local only).</div>
        <div className="flex items-center gap-2">
          <SaveToRepoButton />
          <IonButton onClick={addPractice} color="light" size="small">
            <IonIcon icon={addOutline} slot="start" />
            New practice
          </IonButton>
        </div>
      </div>

      {practices.map((practice, idx) => (
        <PracticeAdminRow
          key={practice.id}
          practice={practice}
          idx={idx}
          flowId={flowId}
          flowIndex={flowIndex}
          lang={lang}
          onMove={movePractice}
          onEdit={setEditingId}
        />
      ))}

      <PracticeEditModal
        isOpen={Boolean(editingId)}
        practice={editing}
        onClose={() => setEditingId(null)}
        onSave={savePractice}
      />
    </div>
  );
}

