import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Amânarea reprezintă inamicul progresului.</p>
    <p>Pentru ziua aceasta gândește-te la ceva important ce amâni să faci de ceva vreme și fă-o, nu mai amâna!</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-29',
  position: 29,
  title: { ro: 'Ziua 29', en: 'Day 29' },
  name: { ro: 'Ziua 29', en: 'Day 29' },
  intro: {
    ro: 'Amânarea reprezintă inamicul progresului.',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFiles/incredere.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
