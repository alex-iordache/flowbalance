import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Absolut totul în viață reprezintă o reflecție a deciziilor luate până la acel moment. Dacă îți dorești rezultate diferite, trebuie să întreprinzi acțiuni diferite.</p>
    <p>Pentru ziua aceasta spune-ți, de cel puțin cinci ori, de-a lungul zilei: Merit să … (orice îți dorești tu, de exemplu: să fiu iubit/ă, să am casa mea… etc.).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți înțelegi mai bine eul tău interior și să încerci noi perspective.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Everything in your life is a reflection of the decisions you’ve made up to this point. If you want different
      results, you need to take different actions.
    </p>
    <p>
      For today, tell yourself at least five times throughout the day: “I deserve to …” (anything you want—for example:
      to be loved, to have my own home, etc.).
    </p>
    <p>
      Listen to this audio recording—it will help you understand your inner self better and explore new perspectives.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-25',
  position: 25,
  title: { ro: 'Ziua 25', en: 'Day 25' },
  name: { ro: 'Ziua 25', en: 'Day 25' },
  intro: {
    ro: 'Absolut totul în viață reprezintă o reflecție a deciziilor luate până la acel moment. Dacă îți dorești rezu…',
    en: 'Reinforce self-worth: repeat “I deserve to…” five times today.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriul-intelept.mp3', en: 'audioFilesEnAi/conectarea-la-propriul-intelept-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
