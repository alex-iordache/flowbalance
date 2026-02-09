import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      <strong>De-a lungul zilei, dacă îți apare vreun gând negativ, transformă-l în ceva pozitiv</strong> (de exemplu: nu
      îmi place task-ul X → ce pot face ca să îmi placă? SAU am o zi proastă → ce pot face ca să devină o zi bună?).
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge
      acolo unde îți dorești.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      <strong>Throughout the day, when a negative thought appears, turn it into something positive</strong> (e.g. I don’t
      like task X → what can I do so I like it? OR I’m having a bad day → what can I do to make it a good day?).
    </p>
    <p>
      Listen to this audio; it will help you trust yourself and your actions to get where you want to be.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Transformă gândurile negative în pozitive; audio încredere.',
    en: 'Turn negative thoughts into positive ones; confidence audio.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFilesEnAi/incredere-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
