import type { LocalizedText } from './flows';

export type FlowLandingData = {
  pills: [LocalizedText, LocalizedText, LocalizedText];
  programLines: LocalizedText[]; // 1..5
};

/**
 * Copywriter-facing source lives in `data/workspace/Redesign/dataToBeFilled.md`.
 * This mapping is the runtime source used by the app.
 *
 * Notes:
 * - We intentionally keep the section title global: RO "Program structurat" / EN "Structured program".
 * - Only non–coming-soon flows are included here.
 */
export const FLOW_LANDING_DATA_BY_ID: Record<string, FlowLandingData> = {
  'Calming-Anxiety': {
    pills: [
      { ro: '14 zile de practică', en: '14 days of practice' },
      { ro: 'Liniștire și adaptare', en: 'Soothing and resilience' },
      { ro: 'Tehnici de relaxare', en: 'Relaxation techniques' },
    ],
    programLines: [
      { ro: 'Observare fără luptă', en: 'Observe without fighting' },
      { ro: 'Reglare respirație', en: 'Regulate breathing' },
      { ro: 'Ancorare în corp', en: 'Ground into the body' },
      { ro: 'Gânduri controlate', en: 'Steady thoughts' },
      { ro: 'Reducere panică', en: 'Reduce panic' },
    ],
  },

  'Boost-Motivation': {
    pills: [
      { ro: '1 ghidaj audio', en: '1 audio guide' },
      { ro: '30 zile de practică', en: '30 days of practice' },
      { ro: 'Motivare interioară', en: 'Inner motivation' },
    ],
    programLines: [
      { ro: 'Alegi motiv real', en: 'Choose a real reason' },
      { ro: 'Pauză fără presiune', en: 'Pause without pressure' },
      { ro: 'Claritate interioară', en: 'Inner clarity' },
      { ro: 'Energie pentru acțiune', en: 'Energy for action' },
      { ro: 'Repetare zilnică', en: 'Daily repetition' },
    ],
  },

  'Build-Self-Trust': {
    pills: [
      { ro: '10 zile de practică', en: '10 days of practice' },
      { ro: '7 ghidaje audio', en: '7 audio guides' },
      { ro: 'Antrenament zilnic', en: 'Daily training' },
    ],
    programLines: [
      { ro: 'Antrenament mental', en: 'Mind training' },
      { ro: 'Gânduri pozitive', en: 'Positive thoughts' },
      { ro: 'Decizii din trecut', en: 'Past decisions' },
      { ro: 'Promisiuni zilnice', en: 'Daily promises' },
      { ro: 'Scrisoare din viitor', en: 'Letter from the future' },
    ],
  },

  'Craving-Relief': {
    pills: [
      { ro: '10 zile de practică', en: '10 days of practice' },
      { ro: '6 ghidaje audio', en: '6 audio guides' },
      { ro: 'Pauză între impuls', en: 'Pause the impulse' },
    ],
    programLines: [
      { ro: 'Observare zilnică', en: 'Daily observation' },
      { ro: 'Regula 10 minute', en: 'The 10-minute rule' },
      { ro: 'Lucrul cu emoțiile', en: 'Work with emotions' },
      { ro: 'Autocompasiune activă', en: 'Active self-compassion' },
      { ro: 'Integrare finală', en: 'Final integration' },
    ],
  },

  'Daily-Heart-Lift': {
    pills: [
      { ro: '1 ghidaj audio', en: '1 audio guide' },
      { ro: 'Ritual zilnic', en: 'Daily ritual' },
      { ro: 'Inimă deschisă', en: 'Open heart' },
    ],
    programLines: [
      { ro: 'Acceptare prezentă', en: 'Present acceptance' },
      { ro: 'Întregire personală', en: 'Personal wholeness' },
      { ro: 'Boost emoțional', en: 'Emotional boost' },
      { ro: 'Sens și apartenență', en: 'Meaning and belonging' },
      { ro: 'Repetare zilnică', en: 'Daily repetition' },
    ],
  },

  'Goal-Achievement': {
    pills: [
      { ro: '30 zile de practică', en: '30 days of practice' },
      { ro: 'Antrenament mental', en: 'Mind training' },
      { ro: 'Consecvență zilnică', en: 'Daily consistency' },
    ],
    programLines: [
      { ro: 'Claritate obiective', en: 'Goal clarity' },
      { ro: 'Pași zilnici mici', en: 'Small daily steps' },
      { ro: 'Obstacole și soluții', en: 'Obstacles and solutions' },
      { ro: 'Resurse și calități', en: 'Resources and strengths' },
      { ro: 'Anti-procrastinare', en: 'Anti-procrastination' },
    ],
  },

  'Healthy-Money-Mindset': {
    pills: [
      { ro: '13 zile practică', en: '13 days of practice' },
      { ro: 'Exerciții practice', en: 'Practical exercises' },
      { ro: 'Relație matură bani', en: 'A mature relationship with money' },
    ],
    programLines: [
      { ro: 'Abundență existentă', en: 'Existing abundance' },
      { ro: 'Dorințe și pași clari', en: 'Desires and clear steps' },
      { ro: 'Convingeri financiare', en: 'Money beliefs' },
      { ro: 'Economisire conștientă', en: 'Conscious saving' },
      { ro: 'Rezultate concrete', en: 'Concrete results' },
    ],
  },

  'Heartful-Gratitude': {
    pills: [
      { ro: '1 ghidaj audio', en: '1 audio guide' },
      { ro: 'Practică zilnică', en: 'Daily practice' },
      { ro: 'Reglare emoțională', en: 'Emotional regulation' },
    ],
    programLines: [
      { ro: 'Alegi un reper', en: 'Choose an anchor' },
      { ro: 'Practica recunoștinței', en: 'Gratitude practice' },
      { ro: 'Relaxare corp', en: 'Body relaxation' },
      { ro: 'Siguranță interioară', en: 'Inner safety' },
      { ro: 'Liniștire', en: 'Soothing' },
    ],
  },

  'Improve-Sleep': {
    pills: [
      { ro: '14 zile de practică', en: '14 days of practice' },
      { ro: 'Stop gândurilor', en: 'Stop overthinking' },
      { ro: 'Ritual de somn', en: 'Sleep ritual' },
    ],
    programLines: [
      { ro: 'Obiectiv de somn', en: 'Sleep goal' },
      { ro: 'Obiceiuri sănătoase', en: 'Healthy habits' },
      { ro: 'Relaxare și respirație', en: 'Relaxation and breathing' },
      { ro: 'Igienă de somn', en: 'Sleep hygiene' },
      { ro: 'Viață relaxată', en: 'A more relaxed life' },
    ],
  },

  'Inner-Healing': {
    pills: [
      { ro: '14 zile de practică', en: '14 days of practice' },
      { ro: 'Tehnici de relaxare', en: 'Relaxation techniques' },
      { ro: 'Eliberare somatică', en: 'Somatic release' },
    ],
    programLines: [
      { ro: 'Placebo', en: 'Placebo' },
      { ro: 'Scanare și prezență', en: 'Body scan and presence' },
      { ro: 'Eliberare tensiuni', en: 'Release tension' },
      { ro: 'Eliberare emoții', en: 'Release emotions' },
      { ro: 'Relaxare seara', en: 'Evening relaxation' },
    ],
  },

  'Self-Compassion': {
    pills: [
      { ro: '1 ghidaj audio', en: '1 audio guide' },
      { ro: 'Practică repetată', en: 'Repeatable practice' },
      { ro: 'Blândețe interioară', en: 'Inner kindness' },
    ],
    programLines: [
      { ro: 'Observi auto-critica', en: 'Notice self-criticism' },
      { ro: 'Recunoști durerea', en: 'Acknowledge the pain' },
      { ro: 'Oferi acceptare', en: 'Offer acceptance' },
      { ro: 'Siguranță interioară', en: 'Inner safety' },
      { ro: 'Repetare săptămânală', en: 'Weekly repetition' },
    ],
  },

  'Stress-Soothing': {
    pills: [
      { ro: '30 zile practică', en: '30 days of practice' },
      { ro: 'Tehnici de relaxare', en: 'Relaxation techniques' },
      { ro: 'Setare mentală', en: 'Mindset reset' },
    ],
    programLines: [
      { ro: 'Observare stres', en: 'Notice stress' },
      { ro: 'Obiceiuri sănătoase', en: 'Healthy habits' },
      { ro: 'Calități cultivate', en: 'Cultivated strengths' },
      { ro: 'Respirație zilnică', en: 'Daily breathing' },
      { ro: 'Integrare obiceiuri', en: 'Integrate habits' },
    ],
  },

  'Calm-Stories': {
    pills: [
      { ro: 'Relaxare profundă', en: 'Deep relaxation' },
      { ro: 'Povești audio lente', en: 'Slow audio stories' },
      { ro: 'Ritual de seară', en: 'Evening ritual' },
    ],
    programLines: [
      { ro: 'Inducere naturală a somnului', en: 'Natural sleep induction' },
      { ro: 'Reducerea gândurilor repetitive', en: 'Reduce repetitive thoughts' },
      { ro: 'Siguranță și calm interior', en: 'Inner safety and calm' },
      { ro: 'Respirație regulată', en: 'Steady breathing' },
      { ro: 'Deconectare progresivă', en: 'Gradual unwinding' },
    ],
  },

  'Reflection-Stories': {
    pills: [
      { ro: 'Resetare prin perspectivă', en: 'Reset through perspective' },
      { ro: 'Povești audio ghidate', en: 'Guided audio stories' },
      { ro: 'Claritate mentală', en: 'Mental clarity' },
    ],
    programLines: [
      { ro: 'Ritual de seară', en: 'Evening ritual' },
      { ro: 'Recadrare emoțională', en: 'Emotional reframing' },
      { ro: 'Puterea metaforei', en: 'The power of metaphor' },
      { ro: 'Alegere conștientă', en: 'Conscious choice' },
      { ro: 'Integrare subtilă', en: 'Subtle integration' },
    ],
  },
};

