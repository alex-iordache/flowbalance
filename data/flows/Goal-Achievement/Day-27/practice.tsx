import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Te-ai gândit până acum în ce mod te văd ceilalți? Familia, prietenii, colegii? Cum apreciazi ei calitățile pe care le ai?</p>
    <p>Pentru ziua aceasta află de la cel puțin două persoane, unde te văd ele fiind expert/ă.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-27',
  position: 27,
  title: { ro: 'Ziua 27', en: 'Day 27' },
  name: { ro: 'Ziua 27', en: 'Day 27' },
  intro: {
    ro: 'Te-ai gândit până acum în ce mod te văd ceilalți? Familia, prietenii, colegii? Cum apreciazi ei calitățile…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFiles/incredere.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
