'use client';

import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToolbar,
  IonAlert,
} from '@ionic/react';
import { chevronBackOutline, chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Store from '../../store';
import { t, type Language } from '../../data/flows';
import { FLOW_CATEGORIES } from './flowsCatalog';
import Logo from '../ui/Logo';

export default function SuggestRecording() {
  const history = useHistory();
  const location = useLocation<{ from?: string; categoryId?: string } | undefined>();
  const lang = Store.useState(s => s.settings.language) as Language;
  const isRo = lang === 'ro';

  const returnTo =
    typeof (location as any)?.state?.from === 'string' && String((location as any).state.from).startsWith('/')
      ? String((location as any).state.from)
      : '/home';

  const prefillCategoryId = useMemo(() => {
    const fromState = typeof (location as any)?.state?.categoryId === 'string' ? String((location as any).state.categoryId) : '';
    const fromQuery = (() => {
      try {
        const sp = new URLSearchParams((location as any)?.search ?? '');
        return String(sp.get('categoryId') ?? '');
      } catch {
        return '';
      }
    })();
    const candidate = (fromState || fromQuery).trim();
    if (!candidate) return '';
    // Only allow known categories (and exclude "stories").
    const ok = FLOW_CATEGORIES.some(c => c.id === candidate && c.id !== 'stories');
    return ok ? candidate : '';
  }, [location]);

  const [categoryId, setCategoryId] = useState<string>(() => prefillCategoryId);
  const [suggestion, setSuggestion] = useState<string>('');
  const [showThanks, setShowThanks] = useState(false);
  const [privacyAccordionValue, setPrivacyAccordionValue] = useState<string | undefined>(undefined);

  const categories = useMemo(() => {
    return [...FLOW_CATEGORIES]
      .filter(c => c.id !== 'stories')
      .sort((a, b) => t(a.title, lang).localeCompare(t(b.title, lang)));
  }, [lang]);

  const canSubmit = Boolean(categoryId && suggestion.trim().length >= 10);

  const title = isRo ? 'Sugerează o înregistrare' : 'Suggest a recording';
  const intro = isRo
    ? 'Spune-ne ce practică ai vrea să auzi în aplicație. Ne ajută să prioritizăm următoarele înregistrări.'
    : "Tell us what you'd like to hear in the app. This helps us prioritize upcoming recordings.";

  const anonTitle = isRo ? 'Confidențialitatea ta contează' : 'Your privacy is important';
  const anonBody = isRo
    ? 'Această cerere va fi trimisă anonim. Nu vom trimite către echipa Flow Balance date despre contul tău (email, nume, userId etc.).'
    : 'This request is sent anonymously. We will not send any account/user data to the Flow Balance team (email, name, userId, etc.).';

  const testingTitle = isRo ? 'În testare (încă nu este funcțional)' : 'Testing (not functional yet)';
  const testingBody = isRo
    ? 'Acest ecran este încă în testare. În curând vom activa trimiterea reală a mesajelor.'
    : 'This screen is still in testing. We will enable real message sending soon.';

  const thanksHeader = isRo ? 'Mulțumim!' : 'Thank you!';
  const thanksMessage = isRo
    ? 'Îți citim propunerea și o luăm în considerare. Revino peste câteva zile — facem tot posibilul să o înregistrăm cât mai curând.'
    : "We read every suggestion and will take it into consideration. Check back in a few days—we're doing our best to record it as soon as possible.";

  const handleSubmit = () => {
    if (!canSubmit) return;
    // NOTE: Intentionally UI-only for now (testing). We'll wire server delivery after validation.
    setShowThanks(true);
    setCategoryId('');
    setSuggestion('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ position: 'relative' }}>
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
            <IonBackButton
              defaultHref={returnTo}
              icon={chevronBackOutline}
              text=""
              style={{ '--color': '#4E5B4F' } as any}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <style>{`
          /* Alert OK button: avoid default Ionic blue */
          .fb-suggest-alert .alert-button.fb-suggest-ok {
            color: #C57A4A !important;
            font-weight: 700;
          }

          /* Accordion: remove Ionic white header/content backgrounds */
          .fb-suggest-accordion,
          .fb-suggest-accordion ion-accordion,
          .fb-suggest-accordion ion-accordion::part(header),
          .fb-suggest-accordion ion-accordion::part(content) {
            background: transparent !important;
          }
          .fb-suggest-accordion ion-accordion::part(content) {
            padding: 0 !important;
          }

          /* IonSelect: prevent grey hover/focus blocks; keep rounded look */
          .fb-suggest-select {
            width: 100%;
            display: block;
          }
          .fb-suggest-select::part(container) {
            background: #ffffff;
            border: 1px solid rgba(232, 222, 211, 0.85);
            border-radius: 14px;
            padding: 10px 12px;
            width: 100%;
            transition: background-color 120ms ease, border-color 120ms ease;
          }
          .fb-suggest-select:hover::part(container) {
            background: #ffffff;
          }
          .fb-suggest-select:focus-within::part(container) {
            background: #ffffff;
            border-color: rgba(197, 122, 74, 0.55);
            box-shadow: 0 0 0 3px rgba(197, 122, 74, 0.12);
          }
          .fb-suggest-select::part(text),
          .fb-suggest-select::part(placeholder) {
            color: #4E5B4F;
          }
          .fb-suggest-select::part(icon) {
            color: #7A746C;
            opacity: 1;
          }

          /* IonSelect popover: make the dropdown panel wider */
          ion-popover.fb-suggest-select-popover::part(content) {
            width: min(520px, calc(100vw - 32px));
            max-width: 520px;
          }
        `}</style>
        <div className="px-5 py-5 pb-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          <div
            className="text-[26px] md:text-[30px] leading-tight text-center"
            style={{ fontFamily: 'var(--font-logo), ui-serif, Georgia, serif', fontWeight: 600, color: '#4E5B4F' }}
          >
            {title}
          </div>

          <div className="mt-2 text-center text-[14px] md:text-[15px]" style={{ color: '#7A746C' }}>
            {intro}
          </div>

          {/* Testing disclaimer (temporary) */}
          <div
            className="mt-4 rounded-2xl px-4 py-3"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.10)',
              border: '1px solid rgba(245, 158, 11, 0.22)',
              boxShadow: '0 10px 24px rgba(120, 95, 70, 0.06)',
            }}
          >
            <div className="text-[13px] font-semibold" style={{ color: '#7A746C' }}>
              {testingTitle}
            </div>
            <div className="mt-1 text-[13px]" style={{ color: '#7A746C' }}>
              {testingBody}
            </div>
          </div>

          {/* Anonymous note (accordion) */}
          <div className="mt-3">
            <IonAccordionGroup
              className="fb-suggest-accordion"
              value={privacyAccordionValue}
              onIonChange={(e) => setPrivacyAccordionValue(typeof (e as any)?.detail?.value === 'string' ? (e as any).detail.value : undefined)}
            >
              <IonAccordion value="privacy">
                <div slot="header">
                  <div
                    className="rounded-2xl flex items-center justify-between gap-3 px-3 py-2"
                    style={{
                      backgroundColor: '#FBF7F2',
                      border: '1px solid rgba(232, 222, 211, 0.65)',
                      boxShadow: '0 10px 24px rgba(120, 95, 70, 0.06)',
                    }}
                  >
                    <div className="text-[13px] font-semibold" style={{ color: '#4E5B4F' }}>
                      {anonTitle}
                    </div>
                    <IonIcon
                      icon={privacyAccordionValue === 'privacy' ? chevronDownOutline : chevronForwardOutline}
                      style={{ color: '#7A746C', fontSize: 18 }}
                    />
                  </div>
                </div>
                <div
                  slot="content"
                  className="mt-2 px-3 py-2.5 text-[12px] leading-snug"
                  style={{
                    backgroundColor: '#FBF7F2',
                    color: '#7A746C',
                    borderRadius: 16,
                    border: '1px solid rgba(232, 222, 211, 0.65)',
                  }}
                >
                  {anonBody}
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </div>

          {/* Form */}
          <div
            className="mt-4 rounded-[16px] p-4 md:p-5"
            style={{
              backgroundColor: '#FBF7F2',
              border: '1px solid rgba(232, 222, 211, 0.85)',
              boxShadow: '0 10px 24px rgba(120, 95, 70, 0.08)',
            }}
          >
            <div className="text-[14px] md:text-[16px] font-semibold" style={{ color: '#4E5B4F' }}>
              {isRo ? 'Detalii' : 'Details'}
            </div>

            <div className="mt-3">
              <div className="text-[13px] font-semibold" style={{ color: '#7A746C' }}>
                {isRo ? 'Categorie' : 'Category'}
              </div>
              <div className="mt-2">
                <IonSelect
                  className="fb-suggest-select"
                  value={categoryId}
                  interface="popover"
                  interfaceOptions={{ cssClass: 'fb-suggest-select-popover' }}
                  placeholder={isRo ? 'Alege o categorie' : 'Select a category'}
                  onIonChange={(e) => setCategoryId(String(e.detail.value ?? ''))}
                >
                  {categories.map(c => (
                    <IonSelectOption key={c.id} value={c.id}>
                      {t(c.title, lang)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[13px] font-semibold" style={{ color: '#7A746C' }}>
                {isRo ? 'Sugestie' : 'Suggestion'}
              </div>
              <div className="mt-2">
                <IonTextarea
                  value={suggestion}
                  autoGrow={true}
                  rows={4}
                  placeholder={
                    isRo
                      ? 'Ex: O practică de 5 minute pentru calmare înainte de somn…'
                      : 'Example: A 5-minute practice to calm down before sleep…'
                  }
                  onIonInput={(e) => setSuggestion(String((e as any)?.detail?.value ?? ''))}
                  style={{
                    '--placeholder-color': '#7A746C',
                    '--color': '#4E5B4F',
                    '--background': '#ffffff',
                    borderRadius: '14px',
                    padding: '10px 12px',
                    border: '1px solid rgba(232, 222, 211, 0.85)',
                    minHeight: '110px',
                  } as any}
                />
              </div>
              <div className="mt-2 text-[12px]" style={{ color: '#7A746C' }}>
                {isRo ? 'Minim 10 caractere.' : 'Minimum 10 characters.'}
              </div>
            </div>

            <div className="mt-4">
              <IonButton
                expand="block"
                disabled={!canSubmit}
                onClick={handleSubmit}
                style={{
                  '--background': '#C57A4A',
                  '--background-activated': '#B56B3B',
                  '--border-radius': '16px',
                  '--box-shadow': '0 10px 24px rgba(120, 95, 70, 0.14)',
                } as any}
              >
                {isRo ? 'Trimite' : 'Send'}
              </IonButton>
            </div>
          </div>
        </div>

        <IonAlert
          isOpen={showThanks}
          onDidDismiss={() => {
            setShowThanks(false);
            // Behave like an overlay: return to the previous page and remove this form from history.
            history.replace(returnTo);
          }}
          cssClass="fb-suggest-alert"
          header={thanksHeader}
          message={thanksMessage}
          buttons={[
            {
              text: 'OK',
              cssClass: 'fb-suggest-ok',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

