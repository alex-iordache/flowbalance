import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  IonBadge,
} from '@ionic/react';
import { bodyOutline, bulbOutline, chevronBackOutline, pulseOutline, play, settingsOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useMemo } from 'react';

import Store from '../../store';
import { t, type Language } from '../../data/flows';
import Logo from '../ui/Logo';

type HelpPill = { id: string; icon: any; label: { ro: string; en: string } };

function getLandingExtras(flowId: string | undefined): { helpPills: HelpPill[]; protocol: Array<{ ro: string; en: string }> } {
  if (flowId === 'Calming-Anxiety') {
    return {
      helpPills: [
        { id: 'breath', icon: pulseOutline, label: { ro: 'Reglare respirație', en: 'Breath regulation' } },
        { id: 'body', icon: bodyOutline, label: { ro: 'Stabilizare corporală', en: 'Body stabilization' } },
        { id: 'cognitive', icon: bulbOutline, label: { ro: 'Reorientare cognitivă', en: 'Cognitive reframe' } },
      ],
      protocol: [
        { ro: 'Respirație 4–6', en: 'Breathing 4–6' },
        { ro: 'Ancorare corporală', en: 'Body grounding' },
        { ro: 'Activare resurse interne', en: 'Activate inner resources' },
      ],
    };
  }

  return { helpPills: [], protocol: [] };
}

export default function FlowDetail() {
  const history = useHistory();
  const { flowId } = useParams<{ flowId: string }>();
  const flows = Store.useState(s => s.flows);
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';

  const flow = useMemo(() => flows.find(f => f.id === flowId) ?? null, [flows, flowId]);
  const extras = useMemo(() => getLandingExtras(flowId), [flowId]);

  const helpPills = extras.helpPills;
  const protocolLines = extras.protocol;
  const showHelp = helpPills.length > 0;
  const showProtocol = protocolLines.length > 0;

  const description = flow ? t(flow.description, lang) : null;
  const descriptionIsString = typeof description === 'string';
  const descriptionClassName =
    'leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1';

  const startSession = () => {
    if (!flowId) return;
    history.push(`/flows/${flowId}/practices`);
  };

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

          <IonButtons slot="start">
            <IonBackButton defaultHref="/flows" icon={chevronBackOutline} text="" style={{ '--color': '#4E5B4F' } as any} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink="/settings" routerDirection="none">
              <IonIcon icon={settingsOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          <div
            className="text-[28px] md:text-[34px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {flow ? t(flow.title, lang) : ''}
            {flow?.comingSoon ? (
              <IonBadge color="medium" className="ml-2 align-middle">
                Coming Soon
              </IonBadge>
            ) : null}
          </div>

          <div className="mt-2 text-center text-[14px] md:text-[15px]" style={{ color: '#7A746C' }}>
            {flow ? t(flow.intro, lang) : ''}
          </div>

          <div
            className="mt-5 overflow-hidden rounded-[22px] relative"
            style={{
              backgroundColor: 'rgba(232, 222, 211, 0.55)',
              border: '1px solid rgba(232, 222, 211, 0.85)',
              boxShadow: '0 14px 40px rgba(120, 95, 70, 0.12)',
            }}
          >
            {flow?.image ? (
              <img
                src={t(flow.image, lang)}
                alt=""
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full aspect-[16/10]" style={{ backgroundColor: 'rgba(197, 122, 74, 0.14)' }} />
            )}

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(244,239,232,0.05) 0%, rgba(244,239,232,0.12) 45%, rgba(244,239,232,0.42) 100%)',
              }}
            />

            <button
              type="button"
              onClick={startSession}
              className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold"
              style={{
                backgroundColor: 'rgba(78, 91, 79, 0.62)',
                color: '#FBF7F2',
                border: '1px solid rgba(251, 247, 242, 0.35)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <IonIcon icon={play} style={{ color: '#FBF7F2' }} />
              {isRo ? 'Începe sesiunea' : 'Start session'}
            </button>
          </div>

          {/* Optional sections (only when we have content) */}
          {showHelp ? (
            <div className="mt-7">
              <div
                className="text-[20px] md:text-[22px]"
                style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
              >
                {isRo ? 'Cum te ajută' : 'How it helps'}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {helpPills.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    className="relative rounded-[14px] px-1.5 py-1.5"
                    style={{
                      backgroundColor: 'rgba(244, 239, 232, 0.72)',
                      border: '1px solid rgba(232, 222, 211, 0.62)',
                      boxShadow: '0 12px 26px rgba(120, 95, 70, 0.08)',
                    }}
                  >
                    {/* Thin vertical accent bar */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 3,
                        backgroundColor: '#CDAF87',
                        opacity: 0.8,
                        borderRadius: 999,
                      }}
                    />

                    <div className="flex items-center gap-1 min-w-0">
                      <IonIcon
                        icon={p.icon}
                        className="shrink-0"
                        style={{ color: 'rgba(205, 175, 135, 0.95)', fontSize: '22px' }}
                      />
                      <div
                        className="text-[11px] md:text-[12px] leading-tight line-clamp-2 min-w-0 break-normal"
                        style={{
                          fontFamily: 'var(--font-logo), ui-serif, Georgia, serif',
                          fontWeight: 500,
                          color: '#4E5B4F',
                          wordBreak: 'normal',
                          overflowWrap: 'normal',
                          hyphens: 'none',
                        }}
                      >
                        {isRo ? p.label.ro : p.label.en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {showProtocol ? (
            <div className="mt-7">
              <div
                className="text-[20px] md:text-[22px]"
                style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
              >
                {isRo ? 'Protocol scurt' : 'Short protocol'}
              </div>

              <div
                className="mt-3 rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: 'rgba(244, 239, 232, 0.6)',
                  border: '1px solid rgba(232, 222, 211, 0.58)',
                  boxShadow: '0 12px 26px rgba(120, 95, 70, 0.06)',
                }}
              >
                {protocolLines.slice(0, 5).map((line, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold"
                      style={{ backgroundColor: 'rgba(205, 175, 135, 0.55)', color: '#4E5B4F' }}
                    >
                      {idx + 1}
                    </div>
                    <div className="text-[14px] leading-snug" style={{ color: '#7A746C' }}>
                      {isRo ? line.ro : line.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Existing flow description (full, no inner scroll) */}
          {description ? (
            <div className="mt-8">
              {descriptionIsString ? (
                <p className={`${descriptionClassName} whitespace-pre-wrap`} style={{ color: '#4E5B4F' }}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName} style={{ color: '#4E5B4F' }}>
                  {description}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}

