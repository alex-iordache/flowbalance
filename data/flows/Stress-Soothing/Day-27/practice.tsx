import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Mișcarea fizică ne ajută fizicul să se păstreze într-o formă bună, dar mai ales psihicul să se elibereze de stres
      și să capete o stare de relaxare profundă.
    </p>
    <p>
      Pentru ziua aceasta stabilește un moment din zi în care să faci mișcare cel puțin 30 minute. Înainte de culcare te
      invit să asculți înregistrarea de mai jos.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Physical movement helps the body stay in good shape, but above all it helps the mind release stress and reach a
      state of deep relaxation.
    </p>
    <p>
      Today set a time in your day to move for at least 30 minutes. Before bed we invite you to listen to the recording
      below.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-27',
  position: 27,
  title: { ro: 'Ziua 27', en: 'Day 27' },
  name: { ro: 'Ziua 27', en: 'Day 27' },
  intro: {
    ro: 'Mișcare cel puțin 30 minute; relaxare seara.',
    en: 'Movement for at least 30 minutes; evening relaxation.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFilesEnAi/deconectare-relaxare-vindecare-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
