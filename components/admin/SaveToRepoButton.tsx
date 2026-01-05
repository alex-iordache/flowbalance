'use client';

import { useMemo, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';

import Store from '../../store';
import { loadDraftFlows } from './draftStorage';
import { getAsset } from './assetsDb';

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(blob);
  });
}

export default function SaveToRepoButton() {
  const storeFlows = Store.useState(s => s.flows);
  const flows = useMemo(() => loadDraftFlows() ?? storeFlows, [storeFlows]);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string>('');

  const canUse = isLocalhost();

  const save = async () => {
    if (!canUse) return;
    setIsSaving(true);
    setStatus('');
    try {
      const assets: Record<string, { dataUrl: string; mime?: string; name?: string }> = {};

      // Collect flow cover assets referenced as `asset:<key>`
      const keys = new Set<string>();
      flows.forEach(f => {
        [f.image?.ro, f.image?.en].forEach(u => {
          if (typeof u === 'string' && u.startsWith('asset:')) keys.add(u.slice('asset:'.length));
        });
      });

      for (const key of Array.from(keys)) {
        const rec = await getAsset(key);
        if (!rec) continue;
        assets[key] = {
          dataUrl: await blobToDataUrl(rec.blob),
          mime: rec.mime,
          name: rec.name,
        };
      }

      const token = process.env.NEXT_PUBLIC_ADMIN_WRITE_TOKEN || '';
      const res = await fetch('/api/admin/write-content', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ flows, assets }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      setStatus('Saved to repo files successfully.');
    } catch (e) {
      setStatus(`Save failed: ${(e as Error)?.message || String(e)}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!canUse) return null;

  return (
    <div className="flex items-center gap-2">
      <IonButton onClick={save} disabled={isSaving} color="light" size="small">
        <IonIcon icon={saveOutline} slot="start" />
        {isSaving ? 'Saving…' : 'Save to repo'}
      </IonButton>
      {status ? <span className="text-xs text-white/80">{status}</span> : null}
    </div>
  );
}

