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
  id: "Boost-Performance",
  position: 8,

  title: { ro: "Crește performanța", en: "Boost Performance" },
  name: { ro: "Crește performanța", en: "Boost Performance" },
  intro: { ro: "Apari mai „sharp”—fără să te arzi pe interior.", en: "Show up sharper—without burning yourself out." },
  description: { ro: "Performanța nu înseamnă doar efort; înseamnă și reglare. Acest flow te ajută să intri într-o stare de focus, să revii mai repede după greșeli și să îți păstrezi energia pe tot parcursul zilei. E excelent înainte de antrenament, sprinturi de lucru sau orice situație în care vrei să dai ce ai mai bun la comandă.", en: "Performance is not only effort; it’s regulation. This flow helps you enter a focused state, recover faster after mistakes, and keep energy for the whole day. Great before training, work sprints, or any situation where you want your best self on demand." },
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
