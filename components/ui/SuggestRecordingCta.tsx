'use client';

import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';

import type { Language } from '../../data/flows';

export default function SuggestRecordingCta(props: { lang: Language; onClick: () => void }) {
  const { lang, onClick } = props;
  const isRo = lang === 'ro';
  const title = isRo ? 'Sugerează o înregistrare' : 'Suggest a recording';
  const body = isRo
    ? 'Spune-ne ce ai vrea să asculți. Ne ajută să prioritizăm următoarele practici.'
    : 'Tell us what you’d like to hear. It helps us prioritize upcoming practices.';

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl px-3 py-3 text-left flex items-center justify-between gap-3"
      style={{
        backgroundColor: '#FBF7F2',
        border: '1px solid rgba(232, 222, 211, 0.85)',
        boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          src="/img/ui/suggest-recording.png"
          alt=""
          className="shrink-0"
          style={{ width: 54, height: 54, objectFit: 'contain' }}
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0">
          <div className="text-[13px] font-semibold leading-snug" style={{ color: '#4E5B4F' }}>
            {title}
          </div>
          <div className="mt-0.5 text-[12px] leading-snug line-clamp-2" style={{ color: '#7A746C' }}>
            {body}
          </div>
        </div>
      </div>
      <IonIcon icon={chevronForwardOutline} style={{ color: '#7A746C', fontSize: '18px' }} className="shrink-0" />
    </button>
  );
}

