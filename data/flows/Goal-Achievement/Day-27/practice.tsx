import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Te-ai gândit până acum în ce mod te văd ceilalți? Familia, prietenii, colegii? Cum apreciazi ei calitățile pe care le ai?</p>
    <p>Pentru ziua aceasta află de la cel puțin două persoane, unde te văd ele fiind expert/ă.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Have you ever thought about how others see you—family, friends, colleagues? How do they value the qualities you
      have?
    </p>
    <p>
      For today, ask at least two people where they see you as an expert.
    </p>
    <p>
      Listen to this audio recording—it will help you build confidence in yourself and your actions to get where you
      want to go.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-27',
  position: 27,
  title: { ro: 'Ziua 27', en: 'Day 27' },
  name: { ro: 'Ziua 27', en: 'Day 27' },
  intro: {
    ro: 'Te-ai gândit până acum în ce mod te văd ceilalți? Familia, prietenii, colegii? Cum apreciazi ei calitățile…',
    en: 'Ask two people where they see you as an expert.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFilesEnAi/incredere-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
