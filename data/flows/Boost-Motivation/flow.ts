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
  id: "Boost-Motivation",
  position: 27,

  title: { ro: "Crește motivația", en: "Boost Motivation" },
  name: { ro: "Crește motivația", en: "Boost Motivation" },
  intro: { ro: "Regăsește-ți „de ce”-ul și pornește din nou.", en: "Find your “why” and move again." },
  description: { ro: "Motivația scade când ești epuizat sau deconectat de sens. Practicile de aici te ajută să te reconectezi cu valorile, să creezi scântei mici de energie și să reduci fricțiunea mentală. Folosește-l când ți-ai pierdut avântul, te simți apatic sau ai nevoie de un restart curat.", en: "Motivation drops when you’re depleted or disconnected from meaning. These practices help you reconnect with values, generate small sparks of energy, and remove mental friction. Use it when you’ve lost drive, feel apathetic, or need a clean restart." },
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
