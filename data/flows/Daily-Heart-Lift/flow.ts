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
  id: "Daily-Heart-Lift",
  position: 30,

  title: { ro: "Revigorare zilnică a inimii", en: "Daily Heart Lift" },
  name: { ro: "Revigorare zilnică a inimii", en: "Daily Heart Lift" },
  intro: { ro: "O mică ridicare zilnică pentru dispoziție și conexiune.", en: "A small daily lift for mood and connection." },
  description: { ro: "Unele zile nu au nevoie de un „deep dive”—au nevoie de un lift. Practicile scurte de aici aduc căldură, perspectivă și un strop de optimism fără să nege realitatea. Folosește-l ca ritual zilnic pentru a-ți reseta tonul emoțional.", en: "Some days don’t need a deep dive—they need a lift. These short practices bring warmth, perspective, and a touch of optimism without denying reality. Use it as a daily ritual to reset your emotional tone." },
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
