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

const flow: Flow = {
  id: "Calm-Stories",
  position: 22,

  title: { ro: "Povești pentru calm", en: "Calm Stories" },
  name: { ro: "Povești pentru calm", en: "Calm Stories" },
  intro: { ro: "Povești blânde care liniștesc mintea.", en: "Soft stories that settle the mind." },
  description: { ro: "Nu sunt lecții—sunt narațiuni blânde menite să încetinească ritmul interior. Lasă povestea să-ți poarte atenția departe de bucle și către imagini și ritm calm. Perfect înainte de somn, în recuperare sau când ai nevoie de blândețe.", en: "These are not lectures—these are gentle narratives meant to slow your inner pace. Let the story carry your attention away from loops and into calm imagery and rhythm. Perfect before sleep, during recovery, or whenever you need softness." },
  image: { ro: "/img/flow-bg.jpg", en: "/img/flow-bg.jpg" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
