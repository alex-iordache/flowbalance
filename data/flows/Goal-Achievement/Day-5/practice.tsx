import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Se spune că atâta timp cât mintea îşi poate imagina, tot mintea poate atinge. Primul pas în definirea propriilor obiective, deja l-ai atins. Acum este momentul să începi să lucrezi pentru tine, pentru visul tău.</p>
    <p>Pentru ziua aceasta vei alege unul dintre obiectivele din ziua anterioară, care simți că este important pentru tine și vrei să lucrezi cu el în următoarele săptămâni. Definește-l cât mai clar în termeni de timp, resursele financiare de care ai nevoie, calitățile de care ai nevoie ca să îl îndeplinești.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Se spune că atâta timp cât mintea îşi poate imagina, tot mintea poate atinge. Primul pas în definirea propr…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
