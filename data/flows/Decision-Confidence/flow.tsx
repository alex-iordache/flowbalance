import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";
import practice_2 from "./Day-2/practice";
import practice_3 from "./Day-3/practice";
import practice_4 from "./Day-4/practice";
import practice_5 from "./Day-5/practice";
import practice_6 from "./Day-6/practice";
import practice_7 from "./Day-7/practice";
import practice_8 from "./Day-8/practice";
import practice_9 from "./Day-9/practice";
import practice_10 from "./Day-10/practice";
import practice_11 from "./Day-11/practice";
import practice_12 from "./Day-12/practice";

const roDescription = (
  <>
    <p>{"Indecizia ascunde adesea frică: frica de a greși, de a fi judecat sau de a pierde ceva. Practicile de aici te ajută să asculți semnalele din corp și din valori, apoi să alegi cu un angajament calm. Ideal când ești prins între opțiuni sau rulezi „și dacă alegeam altfel?”"}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Indecision often hides fear: fear of being wrong, judged, or missing out. These practices help you listen to signals from body and values, then choose with calm commitment. Ideal when you’re stuck between options or replaying “what if I chose differently?”"}</p>
  </>
);


const flow: Flow = {
  id: "Decision-Confidence",
  position: 13,

  title: { ro: "Încredere în decizii", en: "Decision Confidence" },
  name: { ro: "Încredere în decizii", en: "Decision Confidence" },
  intro: { ro: "Ia decizii cu mai puțină îndoială și mai multă aliniere.", en: "Make decisions with less doubt and more alignment." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flow-bg.png", en: "/img/flow-bg.png" },
  comingSoon: true,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
