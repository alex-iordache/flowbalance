import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Data viitoare când te simți tentat să fii supărat/ă, frustrat/ă, furios/furioasă, amintește-ți că este acea parte
      din viață care nu poate fi controlată; însă ceea ce poți controla este modul în care alegi să răspunzi sau cât
      durează emoția.
    </p>
    <p>
      Astăzi lucrăm cu <strong>afirmația conștientă</strong>, nu ca autosugestie, ci ca direcționare a atenției.
    </p>
    <p>Alege calitatea pe care o dezvolți în acest program. Pe parcursul zilei, spune-ți de mai multe ori:</p>
    <p className="pl-5 mt-2 font-medium">„Îmi permit să fiu ___ în situațiile mele zilnice.”</p>
    <p>Observă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce rezistență apare?</li>
      <li>Ce parte din tine se opune?</li>
    </ul>
    <p>Seara, notează ce ai descoperit și ce ai simțit în corp.</p>
    <p>
      În locul înregistrării audio, repetă mental un exercițiu care te ajută pe tine, de exemplu să te relaxezi: numără
      de la 100 la 0, sau ascultă respirația ta sau melodii etc.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Next time you feel tempted to be angry, frustrated, or furious, remind yourself that this is the part of life that
      can’t be controlled; what you can control is how you choose to respond and how long the emotion lasts.
    </p>
    <p>
      Today we work with <strong>conscious affirmation</strong>—not as autosuggestion, but as directing your attention.
    </p>
    <p>Choose the quality you’re developing in this program. Throughout the day, say to yourself several times:</p>
    <p className="pl-5 mt-2 font-medium">“I allow myself to be ___ in my daily situations.”</p>
    <p>Notice:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What resistance appears?</li>
      <li>What part of you pushes back?</li>
    </ul>
    <p>In the evening, write down what you discovered and what you felt in your body.</p>
    <p>
      Instead of the audio, repeat mentally an exercise that helps you relax: count from 100 to 0, or follow your breath,
      or listen to music, etc.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Afirmația conștientă: îți permiți să fii calitatea aleasă.',
    en: 'Conscious affirmation: you allow yourself to be the chosen quality.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
