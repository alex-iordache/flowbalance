import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>În viață, oriunde te vei afla, în orice capitol al vieții tale, este important să îți stabilești mai întâi obiectivele.</p>
    <p>Pentru ziua aceasta pune pe hârtie 3 cele mai importante obiective pentru tine azi și ține-te de ele.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți înțelegi mai bine eul tău interior și să încerci noi perspective.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      In life—wherever you are and whatever chapter you’re in—it’s important to set your goals first.
    </p>
    <p>
      For today, write down the 3 most important goals for you today and stick to them.
    </p>
    <p>
      Listen to this audio recording—it will help you understand your inner self better and explore new perspectives.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-24',
  position: 24,
  title: { ro: 'Ziua 24', en: 'Day 24' },
  name: { ro: 'Ziua 24', en: 'Day 24' },
  intro: {
    ro: 'În viață, oriunde te vei afla, în orice capitol al vieții tale, este important să îți stabilești mai întâi…',
    en: 'Set your goals first: commit to three key goals today.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriul-intelept.mp3', en: 'audioFilesEnAi/conectarea-la-propriul-intelept-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
