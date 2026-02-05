import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Un mic moment de respiro de la tumultul vieții cotidiene îți poate aduce mai mult decât crezi. Câteodată cel mai
      bun lucru pe care îl poți face este să nu faci nimic.
    </p>
    <p>Pentru ziua aceasta fă o pauză de 5 minute în care ești atent/ă doar la respirația ta. Înainte de culcare te invit să asculți din nou înregistrarea de mai jos.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      A short breather from the hustle of daily life can bring you more than you think. Sometimes the best thing you can
      do is do nothing.
    </p>
    <p>Today take a 5-minute pause when you pay attention only to your breath. Before bed we invite you to listen again to the recording below.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-25',
  position: 25,
  title: { ro: 'Ziua 25', en: 'Day 25' },
  name: { ro: 'Ziua 25', en: 'Day 25' },
  intro: {
    ro: 'Pauză de 5 minute doar cu respirația; relaxare seara.',
    en: '5-minute pause with your breath only; evening relaxation.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFiles/deconectare-relaxare-vindecare.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
