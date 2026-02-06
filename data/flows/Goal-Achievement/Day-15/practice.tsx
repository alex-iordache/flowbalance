import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Se spune că oamenii care au obiective bine determinte reușesc pentru că știu încotro de îndreaptă.</p>
    <p>Pentru ziua aceasta pune pe hârtie 3 cele mai importante obiective pentru tine azi, care au legătură cu obiectivul principal și ține-te de ele.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      It’s said that people with well-defined goals succeed because they know where they’re heading.
    </p>
    <p>
      For today, write down the 3 most important goals for you today that are connected to your main objective—and keep
      your commitment to them.
    </p>
    <p>
      Listen to this audio recording—it will help you improve your productivity and your sense of wellbeing.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-15',
  position: 15,
  title: { ro: 'Ziua 15', en: 'Day 15' },
  name: { ro: 'Ziua 15', en: 'Day 15' },
  intro: {
    ro: 'Se spune că oamenii care au obiective bine determinte reușesc pentru că știu încotro de îndreaptă.',
    en: 'Clarify today’s top 3 priorities connected to your main goal.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
