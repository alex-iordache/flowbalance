'use client';

import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';

type Props = {
  meta: string;
  title: string;
  onClick?: () => void;
  metaIcon?: any;
};

/**
 * Minimal “quick action” card inspired by the provided reference:
 * - small meta line (e.g. "5 min reading")
 * - title
 * - chevron on the right
 */
export default function QuickActionCard({ meta, title, onClick, metaIcon }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl px-4 py-3 text-left"
      style={{
        backgroundColor: 'rgba(255,255,255,0.10)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -14px 30px rgba(0,0,0,0.20)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {metaIcon ? (
            <IonIcon icon={metaIcon} className="text-white/80 text-2xl shrink-0" />
          ) : null}
          <div className="min-w-0">
            <div className="text-white/75 text-[11px] leading-tight">{meta}</div>
            <div className="mt-0.5 text-white text-[13px] font-semibold leading-tight truncate">
              {title}
            </div>
          </div>
        </div>
        <IonIcon icon={chevronForwardOutline} className="text-white/80 text-lg shrink-0" />
      </div>
    </button>
  );
}


