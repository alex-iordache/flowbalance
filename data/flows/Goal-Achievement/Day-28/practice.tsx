import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Dacă ai realiza cât de puternice sunt gândurile pe care le ai, nu ai mai gândi negativ niciodată. Gândirea pozitivă va face totul mai bine decât gândirea negativă.</p>
    <p>Pentru ziua aceasta scrie pe un bilețel fiecare gând negativ care vine, apoi rupe-l și aruncă-l.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      If you truly realised how powerful your thoughts are, you would never think negatively again. Positive thinking
      makes everything better than negative thinking.
    </p>
    <p>
      For today, write down each negative thought that shows up on a small note, then tear it up and throw it away.
    </p>
    <p>
      Listen to this audio recording—it will help you build confidence in yourself and your actions to get where you
      want to go.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-28',
  position: 28,
  title: { ro: 'Ziua 28', en: 'Day 28' },
  name: { ro: 'Ziua 28', en: 'Day 28' },
  intro: {
    ro: 'Dacă ai realiza cât de puternice sunt gândurile pe care le ai, nu ai mai gândi negativ niciodată. Gândirea…',
    en: 'Release negative thoughts: write them down, then tear them up.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFilesEnAi/incredere-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
