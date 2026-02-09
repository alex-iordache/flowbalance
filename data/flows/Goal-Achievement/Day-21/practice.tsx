import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Obstacolele nu reprezintă mereu, ceea ce tindem să credem la prima vedere. Ele pot fi chiar cele mai bune oportunități întâlnite.</p>
    <p>Pentru ziua aceasta ia un obstacol din viața ta și găsește-i cel puțin 3 soluții, poți apela chiar și la un prieten.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Obstacles aren’t always what we think they are at first glance. They can even become some of the best
      opportunities you encounter.
    </p>
    <p>
      For today, take one obstacle from your life and find at least 3 solutions for it—you can even ask a friend.
    </p>
    <p>
      Listen to this audio recording—it will help you see the situation from a different angle and find the right
      solution for you.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-21',
  position: 21,
  title: { ro: 'Ziua 21', en: 'Day 21' },
  name: { ro: 'Ziua 21', en: 'Day 21' },
  intro: {
    ro: 'Obstacolele nu reprezintă mereu, ceea ce tindem să credem la prima vedere. Ele pot fi chiar cele mai bune o…',
    en: 'Choose one obstacle and find at least three solutions.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFilesEnAi/trecerea-peste-obstacole-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
