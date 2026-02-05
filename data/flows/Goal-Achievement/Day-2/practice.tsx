import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Pentru a progresa în orice aspect al vieţii tale este nevoie ca, uneori, să te opreşti şi să analizezi modul în care gestionezi situaţiile zilnice. Cum reacţionezi în situaţiile critice? Cum celebrezi bucuriile vieţii?</p>
    <p>Pentru ziua aceasta te invit să identifici care aspecte din viaţa ta merg excelent şi care au nevoie să fie îmbunătăţite.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'Pentru a progresa în orice aspect al vieţii tale este nevoie ca, uneori, să te opreşti şi să analizezi modu…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3', en: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
