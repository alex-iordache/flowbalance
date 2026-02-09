import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Pentru a progresa în orice aspect al vieţii tale este nevoie ca, uneori, să te opreşti şi să analizezi modul în care gestionezi situaţiile zilnice. Cum reacţionezi în situaţiile critice? Cum celebrezi bucuriile vieţii?</p>
    <p>Pentru ziua aceasta te invit să identifici care aspecte din viaţa ta merg excelent şi care au nevoie să fie îmbunătăţite.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      To make progress in any area of your life, sometimes you need to pause and look at how you handle everyday
      situations. How do you react in critical moments? How do you celebrate life’s joys?
    </p>
    <p>
      For today, identify which aspects of your life are going very well and which ones need improvement.
    </p>
    <p>
      Listen to this audio recording—it will help you analyse how you manage your life and how you balance work time
      with time outside your working hours.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'Pentru a progresa în orice aspect al vieţii tale este nevoie ca, uneori, să te opreşti şi să analizezi modu…',
    en: 'Pause and reflect on how you handle daily situations.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/VECHI-analiza-propriei-vieti.mp3', en: 'audioFilesEnAi/analiza-vietii-personale-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
