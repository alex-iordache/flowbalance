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
    <p>{"Încrederea în tine se construiește prin repetiție: fă ce ai spus că faci, blând și consecvent. Practicile de aici te ajută să reduci îndoiala, să te asculți și să acționezi aliniat. Ideal pentru a reconstrui încrederea după eșecuri sau inconsecvență."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Self-trust is built through repetition: do what you said you’d do, gently and consistently. These practices help you quiet doubt, listen inwardly, and take aligned action. Ideal for rebuilding confidence after setbacks or inconsistency."}</p>
  </>
);


const flow: Flow = {
  id: "Build-Self-Trust",
  position: 19,

  title: { ro: "Construiește încrederea în tine", en: "Build Self-Trust" },
  name: { ro: "Construiește încrederea în tine", en: "Build Self-Trust" },
  intro: { ro: "Ține-ți promisiunile față de tine—și simte diferența.", en: "Keep promises to yourself—and feel the difference." },
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
