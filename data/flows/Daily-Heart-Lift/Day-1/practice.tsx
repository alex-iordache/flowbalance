import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p><strong>Tema zilei:</strong></p>
    <p>
      Astăzi, alege să îți amintești că nu trebuie să fii diferit pentru a fi valoros. De câteva ori pe parcursul zilei,
      oprește-te pentru câteva secunde și spune-ți în gând: <em>„Sunt complet, exact așa cum sunt acum.”</em>
    </p>
    <p>
      Observă ce se întâmplă în corpul tău când faci acest lucru, fără să analizezi și fără să corectezi.
    </p>
    <p>
      Seara, ascultă înregistrarea audio a zilei și permite inimii tale să se așeze într-o stare de acceptare și
      liniștire, exact așa cum apare.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p><strong>Today’s theme:</strong></p>
    <p>
      Today, choose to remember that you don’t have to be different in order to be worthy. A few times throughout the
      day, pause for a few seconds and say to yourself silently: <em>“I am whole, exactly as I am right now.”</em>
    </p>
    <p>
      Notice what happens in your body when you do this—without analyzing and without correcting.
    </p>
    <p>
      In the evening, listen to today’s audio recording and allow your heart to settle into a state of acceptance and
      soothing, exactly as it appears.
    </p>
  </>
);

const practice: Practice = {
  id: "Daily-Heart-Lift-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Întregire", en: "Day 1 – Wholeness" },
  name: { ro: "Întregire", en: "Wholeness" },
  intro: {
    ro: "Repetă o frază simplă și lasă corpul să integreze acceptarea.",
    en: "Repeat a simple phrase and let your body integrate acceptance.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/daily-heart-lift.mp3", en: "audioFilesEnAi/daily-heart-lift-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

