import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Amânarea reprezintă inamicul progresului.</p>
    <p>Pentru ziua aceasta gândește-te la ceva important ce amâni să faci de ceva vreme și fă-o, nu mai amâna!</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Procrastination is the enemy of progress.
    </p>
    <p>
      For today, think of something important you’ve been postponing for a while—and do it. Don’t postpone it again.
    </p>
    <p>
      Listen to this audio recording—it will help you build confidence in yourself and your actions to get where you
      want to go.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-29',
  position: 29,
  title: { ro: 'Ziua 29', en: 'Day 29' },
  name: { ro: 'Ziua 29', en: 'Day 29' },
  intro: {
    ro: 'Amânarea reprezintă inamicul progresului.',
    en: 'Choose one postponed task and do it today.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFilesEnAi/incredere-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
