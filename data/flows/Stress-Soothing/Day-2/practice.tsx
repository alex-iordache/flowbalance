import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi continui lucrul cu situațiile stresante observate ieri, dar adăugăm <strong>dimensiunea alegerii
      conștiente</strong>. Stresul apare adesea atunci când reacționăm automat, fără pauză.
    </p>
    <p>Alege o situație notată ieri și completează următoarele, în scris:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce a declanșat reacția mea?</li>
      <li>Ce parte din mine a preluat controlul (frică, furie, nevoia de a demonstra, evitare, teama de abandon etc.)?</li>
      <li>Ce aș fi putut face diferit pentru a nu mă lăsa influențat de reacția automată?</li>
    </ul>
    <p>Apoi răspunde la aceste întrebări-cheie:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce soluții reale am în situații similare?</li>
      <li>Cum vreau să arate viitorul în acest context, știind că trecutul nu îl mai pot schimba?</li>
      <li>Ce m-ar sfătui partea mea interioară înțeleaptă, dacă aș asculta-o?</li>
    </ul>
    <p>
      Seara, ascultă din nou înregistrarea audio, permițând corpului să integreze ideea de{' '}
      <strong>pauză între stimul și reacție</strong>.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you continue with the stressful situations you noticed yesterday, and we add{' '}
      <strong>the dimension of conscious choice</strong>. Stress often appears when we react automatically, without a
      pause.
    </p>
    <p>Choose one situation you noted yesterday and complete the following in writing:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What triggered my reaction?</li>
      <li>What part of me took over (fear, anger, need to prove myself, avoidance, fear of abandonment, etc.)?</li>
      <li>What could I have done differently so as not to be carried away by the automatic reaction?</li>
    </ul>
    <p>Then answer these key questions:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What real options do I have in similar situations?</li>
      <li>How do I want the future to look in this context, knowing I can’t change the past?</li>
      <li>What would my wiser inner part advise me if I listened to it?</li>
    </ul>
    <p>
      In the evening, listen to the audio again, allowing your body to integrate the idea of{' '}
      <strong>a pause between trigger and reaction</strong>.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'Pauză între stimul și reacție: alege conștient cum răspunzi.',
    en: 'Pause between trigger and reaction: choose consciously how you respond.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFilesEnAi/trecerea-peste-obstacole-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
