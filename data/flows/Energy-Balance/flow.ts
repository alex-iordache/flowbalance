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
  id: "Energy-Balance",
  position: 14,

  title: { ro: "Echilibru energetic", en: "Energy Balance" },
  name: { ro: "Echilibru energetic", en: "Energy Balance" },
  intro: { ro: "Găsește mijlocul: energizat, nu agitat.", en: "Find the middle: energized, not wired." },
  description: { ro: "Unele zile ești fără energie; alte zile ești supra-stimulat. Acest flow te ajută să îți reglezi activarea astfel încât energia să fie stabilă și folosibilă. Vei exersa activare blândă, „downshift”-uri și ritmuri care susțin o zi echilibrată.", en: "Some days you’re flat; other days you’re overstimulated. This flow helps you regulate arousal so your energy feels usable and stable. You’ll practice gentle activation, downshifts, and rhythms that support a balanced day." },
  image: { ro: "/img/flow-bg.png", en: "/img/flow-bg.png" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
