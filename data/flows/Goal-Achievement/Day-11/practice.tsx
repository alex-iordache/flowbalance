import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Fiecare om are propriul său bagaj de calităţi, de resurse, de acele aspecte care îl fac să fie unic. Tu eşti conştient/ă de ale tale?</p>
    <p>Pentru ziua aceasta află de la trei persoane ce anume adoră la tine (colegi, prieteni, familie etc.).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Fiecare om are propriul său bagaj de calităţi, de resurse, de acele aspecte care îl fac să fie unic. Tu eşt…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
