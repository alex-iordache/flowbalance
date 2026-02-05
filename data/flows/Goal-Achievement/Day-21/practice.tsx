import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Obstacolele nu reprezintă mereu, ceea ce tindem să credem la prima vedere. Ele pot fi chiar cele mai bune oportunități întâlnite.</p>
    <p>Pentru ziua aceasta ia un obstacol din viața ta și găsește-i cel puțin 3 soluții, poți apela chiar și la un prieten.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-21',
  position: 21,
  title: { ro: 'Ziua 21', en: 'Day 21' },
  name: { ro: 'Ziua 21', en: 'Day 21' },
  intro: {
    ro: 'Obstacolele nu reprezintă mereu, ceea ce tindem să credem la prima vedere. Ele pot fi chiar cele mai bune o…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFiles/trecerea-peste-obstacole.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
