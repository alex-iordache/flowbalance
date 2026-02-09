import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Ce calităţi te definesc pe tine, ca şi persoană? Care sunt calităţile de care te simţi cel mai mândru/ mândră? Care au fost persoanele sau lecţiile care ţi-au format cele mai importante calităţi al tale?</p>
    <p>Pentru ziua aceasta scrie acele calități de care ai nevoie ca să realizezi visul tău.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      What qualities define you as a person? Which qualities are you most proud of? Which people or lessons shaped your
      most important qualities?
    </p>
    <p>
      For today, write down the qualities you need in order to accomplish your dream.
    </p>
    <p>
      Listen to this audio recording—it will help you develop the quality you feel you need in order to keep moving
      forward toward your goal.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-09',
  position: 9,
  title: { ro: 'Ziua 9', en: 'Day 9' },
  name: { ro: 'Ziua 9', en: 'Day 9' },
  intro: {
    ro: 'Ce calităţi te definesc pe tine, ca şi persoană? Care sunt calităţile de care te simţi cel mai mândru/ mând…',
    en: 'Identify the qualities you need to reach your goal.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFilesEnAi/calitatea-de-care-ai-nevoie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
