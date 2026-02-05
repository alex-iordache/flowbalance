import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Dacă îți dorești să-ți transformi viața, încearcă să fii mereu recunoscător/ recunoscătoare. Vei putea vedea astfel o viață complet nouă pentru tine.</p>
    <p>Pentru ziua aceasta scrie 10 aspecte din viața ta pentru care ești recunoscător/ recunoscătoare.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-16',
  position: 16,
  title: { ro: 'Ziua 16', en: 'Day 16' },
  name: { ro: 'Ziua 16', en: 'Day 16' },
  intro: {
    ro: 'Dacă îți dorești să-ți transformi viața, încearcă să fii mereu recunoscător/ recunoscătoare. Vei putea vede…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
