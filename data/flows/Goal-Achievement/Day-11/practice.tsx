import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Fiecare om are propriul său bagaj de calităţi, de resurse, de acele aspecte care îl fac să fie unic. Tu eşti conştient/ă de ale tale?</p>
    <p>Pentru ziua aceasta află de la trei persoane ce anume adoră la tine (colegi, prieteni, familie etc.).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Everyone carries their own set of qualities and resources—the things that make them unique. Are you aware of
      yours?
    </p>
    <p>
      For today, ask three people what they truly love about you (colleagues, friends, family, etc.).
    </p>
    <p>
      Listen to this audio recording—it will help you develop the quality you feel you need in order to keep moving
      forward toward your goal.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Fiecare om are propriul său bagaj de calităţi, de resurse, de acele aspecte care îl fac să fie unic. Tu eşt…',
    en: 'Ask three people what they appreciate most about you.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFilesEnAi/calitatea-de-care-ai-nevoie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
