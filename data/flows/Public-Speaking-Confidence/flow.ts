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
  id: "Public-Speaking-Confidence",
  position: 17,

  title: { ro: "Încredere în vorbitul în public", en: "Public Speaking Confidence" },
  name: { ro: "Încredere în vorbitul în public", en: "Public Speaking Confidence" },
  intro: { ro: "Vorbește clar, cu un corp calm.", en: "Speak clearly while your body stays calm." },
  description: { ro: "Vorbitul în public nu e doar o abilitate; e un antrenament pentru sistemul nervos. Acest flow reduce tensiunea din gât și piept, stabilizează respirația și te ajută să rămâi ancorat când ești văzut. Folosește-l înainte de prezentări sau pentru a construi treptat confort.", en: "Public speaking isn’t just a skill; it’s nervous system training. This flow reduces throat and chest tension, steadies breath, and helps you feel grounded while being seen. Use it before presentations or to practice gradually building comfort." },
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
