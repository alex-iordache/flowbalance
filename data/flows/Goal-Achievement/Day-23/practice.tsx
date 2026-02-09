import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Nimic nu este mai important în viață decât pasiunea. Nu contează ceea ce faci în viață, atât timp cât o faci cu și din pasiune.</p>
    <p>Pentru ziua aceasta scrie pe o hârtie cel puțin 20 de soluții ca să creezi mai mult timp pentru pasiunile tale, pentru ceea ce te relaxează. Împărtășește ideile cu cel mai bun prieten.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți înțelegi mai bine eul tău interior și să încerci noi perspective.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Nothing is more important in life than passion. What you do matters less than doing it with passion.
    </p>
    <p>
      For today, write down at least 20 solutions to create more time for your passions—for what relaxes you. Share your
      ideas with your best friend.
    </p>
    <p>
      Listen to this audio recording—it will help you understand your inner self better and explore new perspectives.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-23',
  position: 23,
  title: { ro: 'Ziua 23', en: 'Day 23' },
  name: { ro: 'Ziua 23', en: 'Day 23' },
  intro: {
    ro: 'Nimic nu este mai important în viață decât pasiunea. Nu contează ceea ce faci în viață, atât timp cât o fac…',
    en: 'Create more time for what you love: write 20 solutions.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriul-intelept.mp3', en: 'audioFilesEnAi/conectarea-la-propriul-intelept-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
