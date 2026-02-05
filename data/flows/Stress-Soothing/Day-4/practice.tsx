import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi continui lucrul cu <strong>calitatea aleasă</strong> ieri, dar mutăm atenția din plan mental în{' '}
      <strong>plan comportamental</strong>. Stresul se reduce atunci când începi să acționezi diferit, chiar și în pași
      mici.
    </p>
    <p>Pe parcursul zilei, observă următoarele:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>În ce momente apare tentația să reacționezi automat?</li>
      <li>Ce faci de obicei în acele situații?</li>
    </ul>
    <p>De fiecare dată când observi acest impuls, oprește-te câteva secunde și întreabă-te:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Cum ar acționa versiunea mea care are această calitate?</li>
      <li>Ce gest mic, concret, pot face diferit acum?</li>
    </ul>
    <p>Notează seara:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Unde am reușit să aplic această calitate?</li>
      <li>Unde mi-a fost greu și ce am simțit în corp?</li>
    </ul>
    <p>Seara, ascultă înregistrarea audio, permițând corpului să fixeze această nouă direcție interioară.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you continue with the <strong>quality you chose</strong> yesterday, but we move attention from the mental
      level to the <strong>behavioural level</strong>. Stress decreases when you start to act differently, even in small
      steps.
    </p>
    <p>Throughout the day, notice:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>When do you feel the urge to react automatically?</li>
      <li>What do you usually do in those situations?</li>
    </ul>
    <p>Whenever you notice this impulse, pause for a few seconds and ask yourself:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>How would the version of me that has this quality act?</li>
      <li>What one small, concrete thing can I do differently right now?</li>
    </ul>
    <p>In the evening, write down:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Where did I manage to apply this quality?</li>
      <li>Where was it hard and what did I feel in my body?</li>
    </ul>
    <p>In the evening, listen to the audio, allowing your body to anchor this new inner direction.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: 'Aplică calitatea aleasă în acțiuni mici, concrete.',
    en: 'Apply the chosen quality in small, concrete actions.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
