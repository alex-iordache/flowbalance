import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Se spune că atâta timp cât mintea îşi poate imagina, tot mintea poate atinge. Primul pas în definirea propriilor obiective, deja l-ai atins. Acum este momentul să începi să lucrezi pentru tine, pentru visul tău.</p>
    <p>Pentru ziua aceasta vei alege unul dintre obiectivele din ziua anterioară, care simți că este important pentru tine și vrei să lucrezi cu el în următoarele săptămâni. Definește-l cât mai clar în termeni de timp, resursele financiare de care ai nevoie, calitățile de care ai nevoie ca să îl îndeplinești.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      It’s said that as long as the mind can imagine something, the mind can also achieve it. You’ve already completed
      the first step in defining your goals. Now it’s time to start working for yourself—for your dream.
    </p>
    <p>
      For today, choose one of the goals from yesterday that feels important to you and that you want to work with over
      the coming weeks. Define it as clearly as possible in terms of time, the financial resources you need, and the
      qualities you need in order to accomplish it.
    </p>
    <p>
      Listen to this audio recording—it will help you train mentally and emotionally so you can become the architect of
      the way your life unfolds.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Se spune că atâta timp cât mintea îşi poate imagina, tot mintea poate atinge. Primul pas în definirea propr…',
    en: 'Choose one goal and define it as clearly as possible.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
