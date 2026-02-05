import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Bunătatea, fie că este dăruită sau primită, este întotdeauna un dar, care îl va îmbogăți atât pe cel care dăruiește, cât și pe cel care primește.</p>
    <p>Pentru ziua aceasta fă o listă cu ceea ce a fost bun pentru tine în ziua anterioară.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-19',
  position: 19,
  title: { ro: 'Ziua 19', en: 'Day 19' },
  name: { ro: 'Ziua 19', en: 'Day 19' },
  intro: {
    ro: 'Bunătatea, fie că este dăruită sau primită, este întotdeauna un dar, care îl va îmbogăți atât pe cel care d…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFiles/trecerea-peste-obstacole.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
