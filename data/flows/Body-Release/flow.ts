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
  id: "Body-Release",
  position: 32,

  title: { ro: "Eliberare corporală", en: "Body Release" },
  name: { ro: "Eliberare corporală", en: "Body Release" },
  intro: { ro: "Lasă corpul să încheie ce a început stresul.", en: "Let the body complete what stress started." },
  description: { ro: "Tensiunea este adesea stres neîncheiat, stocat în mușchi și respirație. Acest flow te ghidează prin eliberare blândă—maxilar, umeri, abdomen—ca sistemul tău să se liniștească. Folosește-l după stat mult pe scaun, după conflicte sau când te simți încordat fără să știi de ce.", en: "Tension is often unfinished stress stored in muscles and breath. This flow guides you through gentle release—jaw, shoulders, belly—so your system can settle. Use it after long sitting, after conflict, or when you feel tight without knowing why." },
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
