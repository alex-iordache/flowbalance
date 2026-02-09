import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Un aspect esențial al fericirii este iubirea de sine și ea începe cu aprecierea pe care o ai față de tine, față de atitudinea ta, față de comportamentele tale.</p>
    <p>Pentru ziua aceasta spune-i cuiva trei lucruri pe care le apreciezi la tine.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      An essential part of happiness is self-love—and it begins with the appreciation you have for yourself, your
      attitude, and your behaviours.
    </p>
    <p>
      For today, tell someone three things you appreciate about yourself.
    </p>
    <p>
      Listen to this audio recording—it will help you develop the quality you feel you need in order to keep moving
      forward toward your goal.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Un aspect esențial al fericirii este iubirea de sine și ea începe cu aprecierea pe care o ai față de tine,…',
    en: 'Practice self-appreciation and name what you value in yourself.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFilesEnAi/incepe-ziua-cu-bucurie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
