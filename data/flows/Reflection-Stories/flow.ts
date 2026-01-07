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
  id: "Reflection-Stories",
  position: 23,

  title: { ro: "Povești de reflecție", en: "Reflection Stories" },
  name: { ro: "Povești de reflecție", en: "Reflection Stories" },
  intro: { ro: "Povești care te ajută să te oprești și să privești înăuntru.", en: "Stories that help you pause and look inward." },
  description: { ro: "Reflecția te schimbă fără să te forțeze. Poveștile de aici creează spațiu pentru întrebări, sens și auto-observare sinceră. Folosește-le când vrei să procesezi evenimente, emoții sau decizii cu mai multă profunzime și mai puțin zgomot.", en: "Reflection changes you without forcing you. These stories create space for questions, meaning, and honest self-observation. Use them when you want to process life events, emotions, or decisions with more depth and less noise." },
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
