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
  id: "Nervous-System-Reset",
  position: 35,

  title: { ro: "Resetarea sistemului nervos", en: "Nervous System Reset" },
  name: { ro: "Resetarea sistemului nervos", en: "Nervous System Reset" },
  intro: { ro: "Un reset complet când te simți dereglat și blocat.", en: "A full reset when you feel dysregulated and stuck." },
  description: { ro: "Uneori nu ai nevoie de mai mult gândit—ai nevoie de un reset. Acest flow te ajută să îți schimbi starea prin respirație, senzații și coborârea activării, ca sistemul tău să repornească din calm. Folosește-l după zile intense, vârfuri emoționale sau când te simți „off” fără un motiv clar.", en: "Sometimes you don’t need more thinking—you need a reset. This flow helps you shift state through breath, sensation, and down-regulation so your system can restart from calm. Use it after intense days, emotional spikes, or when you feel “off” for no clear reason." },
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
