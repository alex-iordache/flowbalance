import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Un aspect esențial al fericirii este iubirea de sine și ea începe cu aprecierea pe care o ai față de tine, față de atitudinea ta, față de comportamentele tale.</p>
    <p>Pentru ziua aceasta spune-i cuiva trei lucruri pe care le apreciezi la tine.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Un aspect esențial al fericirii este iubirea de sine și ea începe cu aprecierea pe care o ai față de tine,…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
