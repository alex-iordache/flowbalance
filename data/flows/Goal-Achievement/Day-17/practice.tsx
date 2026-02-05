import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Această zi este dedicată identificării acelor obstacole din viața ta, care te împiedică să mergi înainte.</p>
    <p>Pentru ziua aceasta, dacă ai ceva vicii, renunță la unul cel puțin 48 de ore.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-17',
  position: 17,
  title: { ro: 'Ziua 17', en: 'Day 17' },
  name: { ro: 'Ziua 17', en: 'Day 17' },
  intro: {
    ro: 'Această zi este dedicată identificării acelor obstacole din viața ta, care te împiedică să mergi înainte.',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
