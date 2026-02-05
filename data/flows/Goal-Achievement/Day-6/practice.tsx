import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Ştiai că vizualizarea propriul obiectiv, cât mai în detaliu, te poate aduce mai aproape de ceea ce îţi doreşti? Te-ai gândit până acum cum va arată ziua în care îţi vei fi atins obiectivul propus? Ce impact va avea?</p>
    <p>Pentru ziua aceasta gândește-te cum va impacta succesul tău și pe alți oameni, atunci când vei reuși să atingi obiectivul menţionat în ziua anterioară.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul arhitect al modului în care se va desfăşura viaţa ta.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-06',
  position: 6,
  title: { ro: 'Ziua 6', en: 'Day 6' },
  name: { ro: 'Ziua 6', en: 'Day 6' },
  intro: {
    ro: 'Ştiai că vizualizarea propriul obiectiv, cât mai în detaliu, te poate aduce mai aproape de ceea ce îţi dore…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
