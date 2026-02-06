import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Dacă îți dorești să-ți transformi viața, încearcă să fii mereu recunoscător/ recunoscătoare. Vei putea vedea astfel o viață complet nouă pentru tine.</p>
    <p>Pentru ziua aceasta scrie 10 aspecte din viața ta pentru care ești recunoscător/ recunoscătoare.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      If you want to transform your life, try to stay grateful. Gratitude can help you see a completely new life for
      yourself.
    </p>
    <p>
      For today, write down 10 aspects of your life that you are grateful for.
    </p>
    <p>
      Listen to this audio recording—it will help you improve your productivity and your sense of wellbeing.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-16',
  position: 16,
  title: { ro: 'Ziua 16', en: 'Day 16' },
  name: { ro: 'Ziua 16', en: 'Day 16' },
  intro: {
    ro: 'Dacă îți dorești să-ți transformi viața, încearcă să fii mereu recunoscător/ recunoscătoare. Vei putea vede…',
    en: 'Practice gratitude: list 10 things you’re grateful for.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
