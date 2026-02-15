import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Dacă ai realiza cât de puternice sunt gândurile pe care le ai, nu ai mai gândi negativ niciodată. Gândirea
      pozitivă va face totul mai bine decât gândirea negativă.
    </p>
    <p>
      <strong>Pentru ziua aceasta scrie pe un bilețel fiecare gând negativ care vine, apoi rupe-l și aruncă-l.</strong>
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situațiile stresante din viața ta și să
      îți recapeți starea de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      If you realised how powerful your thoughts are, you would never think negatively again. Positive thinking will
      make everything better than negative thinking.
    </p>
    <p>
      <strong>For today, write each negative thought on a small piece of paper, then tear it up and throw it away.</strong>
    </p>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Scrie gândurile negative pe bilețel, rupe-le și aruncă-le; audio relaxare.',
    en: 'Write negative thoughts on paper, tear and throw away; relaxation audio.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/coplesit-de-griji.mp3', en: 'audioFilesEnAi/coplesit-de-griji-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
