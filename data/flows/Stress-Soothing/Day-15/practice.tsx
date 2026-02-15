import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Dacă îți dorești să-ți transformi viața, încearcă să fii mereu recunoscător/recunoscătoare. Vei putea vedea astfel o
      viață complet nouă pentru tine.
    </p>
    <p>Pentru ziua aceasta fă o listă cu toate aspectele din viața ta pentru care ești recunoscător/recunoscătoare.</p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      If you want to transform your life, try to be grateful more often. You’ll be able to see a completely new life
      for yourself.
    </p>
    <p>Today make a list of everything in your life you are grateful for.</p>
    <p>In the evening, listen to the audio.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-15',
  position: 15,
  title: { ro: 'Ziua 15', en: 'Day 15' },
  name: { ro: 'Ziua 15', en: 'Day 15' },
  intro: {
    ro: 'Listă de recunoștință pentru aspectele din viața ta.',
    en: 'Gratitude list for what you have in your life.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/relaxare-prin-respiratie.mp3', en: 'audioFilesEnAi/relaxare-prin-respiratie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
