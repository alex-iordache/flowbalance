import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Un mic moment de respiro de la tumultul vieții cotidiene îți poate aduce mai mult decât crezi. Nu uita, câteodată
      cel mai bun lucru pe care îl poți face este să nu faci nimic.
    </p>
    <p>
      <strong>Pentru ziua aceasta conectează-te trei minute la propria respirație.</strong> Pur și simplu, ia o pauză și
      fii observatorul propriei respirații. Fă acest lucru din 3 în 3 ore.
    </p>
    <p>Ascultă seara această înregistrare audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      A short breather from the hustle of daily life can bring you more than you think. Remember: sometimes the best thing
      you can do is do nothing.
    </p>
    <p>
      <strong>For today, connect for three minutes with your own breath.</strong> Simply pause and be the observer of your
      breathing. Do this every 3 hours.
    </p>
    <p>In the evening, listen to this audio.</p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: '3 minute la respirație, la fiecare 3 ore; audio seara.',
    en: '3 minutes with your breath, every 3 hours; audio in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/calmarea-anxietatii-transformarea-senzatiilor-interioare.mp3',
    en: 'audioFilesEnAi/calmarea-anxietatii-transformarea-senzatiilor-interioare-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
