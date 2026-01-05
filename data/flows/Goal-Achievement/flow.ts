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
  id: "Goal-Achievement",
  position: 18,

  title: { ro: "Atingerea obiectivelor", en: "Goal Achievement" },
  name: { ro: "Atingerea obiectivelor", en: "Goal Achievement" },
  intro: { ro: "Transformă intenția în acțiune—fără forțare.", en: "Turn intention into action—without forcing it." },
  description: { ro: "Obiectivele eșuează când ne bazăm doar pe motivație. Acest flow susține consecvența: angajamente mici, priorități clare și abilitatea de a relua după o zi ratată. Folosește-l când ai nevoie de momentum, structură și un „pas următor” calm.", en: "Goals fail when we rely on motivation alone. This flow supports consistency: small commitments, clear priorities, and the ability to restart after a missed day. Use it when you need momentum, structure, and a calm “next step.”" },
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
