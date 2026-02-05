import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Uneori, a jongla cu toate responsabilitățile pe care le ai, poate fi chiar obositor. Una dintre cele mai mari probleme actuale este să încerci să faci totul de unul/una singur/a.</p>
    <p>Pentru ziua aceasta identifică chiar acum o responsabilitate de acasă, pe care o poți delega altcuiva măcar o dată.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți înțelegi mai bine eul tău interior și să încerci noi perspective.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-22',
  position: 22,
  title: { ro: 'Ziua 22', en: 'Day 22' },
  name: { ro: 'Ziua 22', en: 'Day 22' },
  intro: {
    ro: 'Uneori, a jongla cu toate responsabilitățile pe care le ai, poate fi chiar obositor. Una dintre cele mai ma…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriul-intelept.mp3', en: 'audioFiles/conectarea-la-propriul-intelept.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
