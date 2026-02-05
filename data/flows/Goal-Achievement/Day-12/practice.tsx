import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Tu cum ţi-ai definit succesul? Pentru fiecare persoană, succesul poate avea un înţeles diferit. În orice caz, gândirea pe care o ai, îţi influențează semnificativ rezultatele şi acţiunile zilnice.</p>
    <p>De aceea, pentru ziua aceasta spune-ți, de cel puțin cinci ori, de-a lungul zilei: “Succesul meu îi ajută pe alții, insuccesul meu nu ajută pe nimeni.”</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-12',
  position: 12,
  title: { ro: 'Ziua 12', en: 'Day 12' },
  name: { ro: 'Ziua 12', en: 'Day 12' },
  intro: {
    ro: 'Tu cum ţi-ai definit succesul? Pentru fiecare persoană, succesul poate avea un înţeles diferit. În orice ca…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
