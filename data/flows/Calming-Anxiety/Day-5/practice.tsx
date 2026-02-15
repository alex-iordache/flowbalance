import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Haosul cotidian poate fi acaparant, dezechilibrând uneori și cele mai puternice firi. Gândește-te la acea activitate
      care este extrem de relaxantă pentru tine și oferă-ți astăzi starea de bine pe care o meriți.
    </p>
    <p>
      <strong>Pentru ziua aceasta oferă-ți un moment zdravăn de relaxare, la ce oră vrei tu.</strong>
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să privești situațiile dificile dintr-un alt unghi, astfel
      încât să găsești soluția potrivită pentru tine.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Daily chaos can be overwhelming and can throw even the strongest off balance. Think of the activity that is deeply
      relaxing for you and give yourself the wellbeing you deserve today.
    </p>
    <p>
      <strong>For today, give yourself a solid moment of relaxation, at whatever time you choose.</strong>
    </p>
    <p>
      Listen to this audio; it will help you look at difficult situations from another angle so you can find what works
      for you.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Un moment de relaxare la ora ta; audio pentru perspectivă nouă.',
    en: 'A moment of relaxation at your chosen time; audio for a new perspective.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/anxietate-gandurile-care-vin-si-pleaca.mp3',
    en: 'audioFilesEnAi/anxietate-gandurile-care-vin-si-pleaca-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
