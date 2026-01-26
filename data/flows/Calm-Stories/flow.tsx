import type { Flow } from '../types';

const roDescription = (
  <>
    <p>{"Nu sunt lecții—sunt narațiuni blânde menite să încetinească ritmul interior. Lasă povestea să-ți poarte atenția departe de bucle și către imagini și ritm calm. Perfect înainte de somn, în recuperare sau când ai nevoie de blândețe."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"These are not lectures—these are gentle narratives meant to slow your inner pace. Let the story carry your attention away from loops and into calm imagery and rhythm. Perfect before sleep, during recovery, or whenever you need softness."}</p>
  </>
);


const flow: Flow = {
  id: "Calm-Stories",
  position: 22,

  title: { ro: "Povești pentru calm", en: "Calm Stories" },
  name: { ro: "Povești pentru calm", en: "Calm Stories" },
  intro: { ro: "Povești blânde care liniștesc mintea.", en: "Soft stories that settle the mind." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flow-bg.png", en: "/img/flow-bg.png" },
  comingSoon: true,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 0,
  practices: [],
};

export default flow;
