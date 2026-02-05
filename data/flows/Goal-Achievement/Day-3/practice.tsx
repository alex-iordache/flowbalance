import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Obiectivele personale şi profesionale reprezintă acele borne ale vieţii tale, care îţi oferă sens şi energie, care te bucură prin prisma atingerii lor, sau care te ajută prin prisma lecţiilor învăţate.</p>
    <p>Pentru ziua aceasta vei realiza o listă cu cele mai importante obiective personale pe care vrei să le realizezi în următoarele 12 luni.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-03',
  position: 3,
  title: { ro: 'Ziua 3', en: 'Day 3' },
  name: { ro: 'Ziua 3', en: 'Day 3' },
  intro: {
    ro: 'Obiectivele personale şi profesionale reprezintă acele borne ale vieţii tale, care îţi oferă sens şi energi…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3', en: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
