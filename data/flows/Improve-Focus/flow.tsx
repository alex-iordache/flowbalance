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
    <p>{"Concentrarea scade când mintea e împrăștiată sau supra-stimulată. Practicile de aici antrenează atenția pe un singur punct, reduc „switching”-ul mental și te aduc înapoi când rătăcești. Folosește-l înainte de lucru profund, studiu sau când te simți tras în zece direcții."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Focus fades when your mind is scattered or overstimulated. These practices train single-point attention, reduce mental switching, and bring you back when you drift. Use it before deep work, studying, or whenever you feel pulled in ten directions."}</p>
  </>
);


const flow: Flow = {
  id: "Improve-Focus",
  position: 9,

  title: { ro: "Îmbunătățește concentrarea", en: "Improve Focus" },
  name: { ro: "Îmbunătățește concentrarea", en: "Improve Focus" },
  intro: { ro: "Întărește atenția ca pe un mușchi—calm și consecvent.", en: "Strengthen attention like a muscle—calmly and consistently." },
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
