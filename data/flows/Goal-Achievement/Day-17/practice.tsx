import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Această zi este dedicată identificării acelor obstacole din viața ta, care te împiedică să mergi înainte.</p>
    <p>Pentru ziua aceasta, dacă ai ceva vicii, renunță la unul cel puțin 48 de ore.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today is dedicated to identifying the obstacles in your life that keep you from moving forward.
    </p>
    <p>
      For today, if you have any habits you’d like to change, give up one of them for at least 48 hours.
    </p>
    <p>
      Listen to this audio recording—it will help you improve your productivity and your sense of wellbeing.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-17',
  position: 17,
  title: { ro: 'Ziua 17', en: 'Day 17' },
  name: { ro: 'Ziua 17', en: 'Day 17' },
  intro: {
    ro: 'Această zi este dedicată identificării acelor obstacole din viața ta, care te împiedică să mergi înainte.',
    en: 'Identify what’s blocking you and pause one unhelpful habit for 48 hours.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFilesEnAi/incepe-ziua-cu-bucurie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
