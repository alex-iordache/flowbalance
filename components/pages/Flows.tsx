import { t, type Flow, type Language } from '../../data/flows';
import Store from '../../store';
import { IonPage, IonContent, IonIcon, IonHeader, IonToolbar, IonButtons, IonButton } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { chevronForwardOutline, settingsOutline } from 'ionicons/icons';
import { FLOW_CATEGORIES } from './flowsCatalog';
import Logo from '../ui/Logo';

function CategoryList({ flows, lang }: { flows: Flow[]; lang: Language }) {
  const ionRouter = useIonRouter();
  const flowsById = new Map(flows.map(f => [f.id, f]));

  const warmShadow = '0 10px 24px rgba(120, 95, 70, 0.08)';

  // Redesign uses a single accent color across cards.
  const accent = '#CDAF87';

  return (
    <div className="px-4 pb-8 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex flex-col gap-3">
      {FLOW_CATEGORIES.map(cat => {
        const catFlows = cat.flowIds.map(id => flowsById.get(id)).filter(Boolean) as Flow[];
        const totalFlows = catFlows.length;
        const categoryImgWebpSrc = `/img/categories/${cat.id}.webp`;
        const categoryImgPngSrc = `/img/categories/${cat.id}.png`;

        return (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => ionRouter.push(`/flows/category/${cat.id}`, 'forward')}
            className="relative rounded-[16px] w-full cursor-pointer"
            style={{
              backgroundColor: '#FBF7F2',
              border: '1px solid rgba(232, 222, 211, 0.85)',
              boxShadow: warmShadow,
            }}
          >
            {/* Accent bar: flush on the left border */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 3,
                height: 66,
                backgroundColor: accent,
                opacity: 0.75,
                borderRadius: 999,
              }}
            />

            <div className="pl-3.5 pr-4 py-3 flex items-center gap-3.5">
              {/* Left: category thumbnail */}
              <img
                className="w-[78px] h-[78px] rounded-2xl shrink-0 object-cover"
                src={categoryImgWebpSrc}
                alt={t(cat.title, lang)}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Fallback to older PNGs if webp is missing on any environment.
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = categoryImgPngSrc;
                }}
              />

              {/* Middle: text + progress */}
              <div className="min-w-0 flex-1">
                <div
                  className="text-[18px] md:text-[20px] leading-tight"
                  style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
                >
                  {t(cat.title, lang)}
                </div>
                <div className="mt-0.5 text-[13px]" style={{ color: '#7A746C' }}>
                  {totalFlows} {lang === 'ro' ? 'flow-uri' : 'flows'}
                </div>
              </div>

              {/* Right: chevron */}
              <div className="flex items-center gap-2 shrink-0">
                <IonIcon icon={chevronForwardOutline} style={{ color: '#7A746C', fontSize: '18px' }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Flows = () => {
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ position: 'relative' }}>
          {/* Dead-center logo (independent of left/right icons) */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Logo />
          </div>

          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none" style={{ '--color': '#4E5B4F' } as any}>
              <IonIcon icon={settingsOutline} style={{ color: '#4E5B4F' }} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="pt-3">
          <div className="px-6 text-center">
            <div className="text-[14px]" style={{ color: '#7A746C' }}>
              {isRo ? 'Alege direcția în care vrei să evoluezi.' : 'Choose the direction you want to grow in.'}
            </div>
          </div>
          <div className="mt-4" style={{ borderTop: '1px solid rgba(232, 222, 211, 0.65)' }} />
          <div className="mt-4">
            <CategoryList flows={flows} lang={lang} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Flows;
