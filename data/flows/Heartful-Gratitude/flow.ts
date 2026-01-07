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
  id: "Heartful-Gratitude",
  position: 26,

  title: { ro: "Recunoștință din inimă", en: "Heartful Gratitude" },
  name: { ro: "Recunoștință din inimă", en: "Heartful Gratitude" },
  intro: { ro: "Lasă recunoștința să se așeze în corp, nu doar în minte.", en: "Let gratitude land in the body, not just the mind." },
  description: { ro: "Recunoștința e o stare pe care o poți exersa, chiar și în zile grele. Acest flow te ajută să îți muți atenția către ce te susține—oameni, momente și resurse interioare. Folosește-l ca să înmoi resentimentele, să te reconectezi și să simți mai multă căldură în viața de zi cu zi.", en: "Gratitude is a state you can practice, even on hard days. This flow helps you shift attention toward what supports you—people, moments, and inner resources. Use it to soften resentment, reconnect, and feel more warmth in daily life." },
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
