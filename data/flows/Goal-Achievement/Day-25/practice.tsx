import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Absolut totul în viață reprezintă o reflecție a deciziilor luate până la acel moment. Dacă îți dorești rezultate diferite, trebuie să întreprinzi acțiuni diferite.</p>
    <p>Pentru ziua aceasta spune-ți, de cel puțin cinci ori, de-a lungul zilei: Merit să … (orice îți dorești tu, de exemplu: să fiu iubit/ă, să am casa mea… etc.).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți înțelegi mai bine eul tău interior și să încerci noi perspective.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-25',
  position: 25,
  title: { ro: 'Ziua 25', en: 'Day 25' },
  name: { ro: 'Ziua 25', en: 'Day 25' },
  intro: {
    ro: 'Absolut totul în viață reprezintă o reflecție a deciziilor luate până la acel moment. Dacă îți dorești rezu…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriul-intelept.mp3', en: 'audioFiles/conectarea-la-propriul-intelept.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
