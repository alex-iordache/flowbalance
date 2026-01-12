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
  id: "Self-Compassion",
  position: 29,

  title: { ro: "Compasiune de sine", en: "Self Compassion" },
  name: { ro: "Compasiune de sine", en: "Self Compassion" },
  intro: { ro: "Poartă-te cu tine ca și cum ai avea responsabilitatea să te ajuți.", en: "Treat yourself like someone you’re responsible for helping." },
  description: { ro: "Compasiunea de sine nu e slăbiciune; e reglare plus sinceritate. Acest flow te ajută să înmoi auto-judecata, să revii după greșeli și să construiești un spațiu interior mai sigur. Folosește-l când ești dur cu tine, rușinat sau epuizat de prea multă forțare.", en: "Self-compassion is not weakness; it’s regulation plus honesty. This flow helps you soften self-judgment, recover after mistakes, and build a safer inner environment. Use it when you’re harsh, ashamed, or exhausted from pushing too hard." },
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
