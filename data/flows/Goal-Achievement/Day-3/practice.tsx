import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Obiectivele personale şi profesionale reprezintă acele borne ale vieţii tale, care îţi oferă sens şi energie, care te bucură prin prisma atingerii lor, sau care te ajută prin prisma lecţiilor învăţate.</p>
    <p>Pentru ziua aceasta vei realiza o listă cu cele mai importante obiective personale pe care vrei să le realizezi în următoarele 12 luni.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Personal and professional goals are the milestones in your life that give you meaning and energy—goals that bring
      you joy when you reach them, and support you through the lessons you learn along the way.
    </p>
    <p>
      For today, make a list of the most important personal goals you want to accomplish in the next 12 months.
    </p>
    <p>
      Listen to this audio recording—it will help you analyse how you manage your life and how you balance work time
      with time outside your working hours.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-03',
  position: 3,
  title: { ro: 'Ziua 3', en: 'Day 3' },
  name: { ro: 'Ziua 3', en: 'Day 3' },
  intro: {
    ro: 'Obiectivele personale şi profesionale reprezintă acele borne ale vieţii tale, care îţi oferă sens şi energi…',
    en: 'Define the key goals you want to reach over the next year.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/VECHI-analiza-propriei-vieti.mp3', en: 'audioFilesEnAi/analiza-vietii-personale-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
