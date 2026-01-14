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
    <p>{"Copleșirea apare când creierul încearcă să rezolve zece lucruri deodată. Acest flow te ghidează spre claritate micșorând sarcina: o respirație, un pas următor, o decizie blândă. E ideal în zile aglomerate, la suprasarcină emoțională sau după prea multă stimulare."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Overwhelm happens when your brain tries to solve ten problems at once. This flow guides you into clarity by shrinking the task: one breath, one next step, one kind decision. It’s ideal for busy days, emotional overload, or after too much stimulation."}</p>
  </>
);


const flow: Flow = {
  id: "Ease-Overwhelm",
  position: 4,

  title: { ro: "Reducerea copleșirii", en: "Ease Overwhelm" },
  name: { ro: "Reducerea copleșirii", en: "Ease Overwhelm" },
  intro: { ro: "Când e prea mult, revino la un singur lucru.", en: "When everything is too much, come back to one thing." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/ease-overwhelm.png", en: "/img/flows/ease-overwhelm.png" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
