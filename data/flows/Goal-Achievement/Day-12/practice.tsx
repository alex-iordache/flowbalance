import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Tu cum ţi-ai definit succesul? Pentru fiecare persoană, succesul poate avea un înţeles diferit. În orice caz, gândirea pe care o ai, îţi influențează semnificativ rezultatele şi acţiunile zilnice.</p>
    <p>De aceea, pentru ziua aceasta spune-ți, de cel puțin cinci ori, de-a lungul zilei: “Succesul meu îi ajută pe alții, insuccesul meu nu ajută pe nimeni.”</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      How have you defined success for yourself? For each person, success can mean something different. In any case, the
      way you think strongly influences your results and your daily actions.
    </p>
    <p>
      For today, say to yourself at least five times throughout the day: “My success helps others; my lack of success
      helps no one.”
    </p>
    <p>
      Listen to this audio recording—it will help you develop the quality you feel you need in order to keep moving
      forward toward your goal.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-12',
  position: 12,
  title: { ro: 'Ziua 12', en: 'Day 12' },
  name: { ro: 'Ziua 12', en: 'Day 12' },
  intro: {
    ro: 'Tu cum ţi-ai definit succesul? Pentru fiecare persoană, succesul poate avea un înţeles diferit. În orice ca…',
    en: 'Define success for yourself and reinforce a supportive mindset.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
