import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Ştiai că vizualizarea propriul obiectiv, cât mai în detaliu, te poate aduce mai aproape de ceea ce îţi doreşti? Te-ai gândit până acum cum va arată ziua în care îţi vei fi atins obiectivul propus? Ce impact va avea?</p>
    <p>Pentru ziua aceasta gândește-te cum va impacta succesul tău și pe alți oameni, atunci când vei reuși să atingi obiectivul menţionat în ziua anterioară.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul arhitect al modului în care se va desfăşura viaţa ta.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Did you know that visualising your goal—in as much detail as possible—can bring you closer to what you want? Have
      you ever pictured the day when you’ve achieved your goal? What impact will it have?
    </p>
    <p>
      For today, think about how your success will impact other people as well, once you achieve the goal you chose
      yesterday.
    </p>
    <p>
      Listen to this audio recording—it will help you train mentally and emotionally so you can become the architect of
      the way your life unfolds.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-06',
  position: 6,
  title: { ro: 'Ziua 6', en: 'Day 6' },
  name: { ro: 'Ziua 6', en: 'Day 6' },
  intro: {
    ro: 'Ştiai că vizualizarea propriul obiectiv, cât mai în detaliu, te poate aduce mai aproape de ceea ce îţi dore…',
    en: 'Visualise your goal and the ripple effect of your success.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
