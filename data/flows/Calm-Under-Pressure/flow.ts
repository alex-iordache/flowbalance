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
  id: "Calm-Under-Pressure",
  position: 12,

  title: { ro: "Calm sub presiune", en: "Calm Under Pressure" },
  name: { ro: "Calm sub presiune", en: "Calm Under Pressure" },
  intro: { ro: "Rămâi stabil când miza pare mare.", en: "Stay steady when the stakes feel high." },
  description: { ro: "Presiunea activează urgență, tensiune și vedere „în tunel.” Acest flow te învață să lărgești atenția, să îți reglezi respirația și să îți păstrezi corpul moale în timp ce performezi. Folosește-l înainte de ședințe, examene, competiții—sau când simți că ești privit și judecat.", en: "Pressure triggers urgency, tightness, and tunnel vision. This flow teaches you to widen your attention, regulate breath, and keep your body soft while you perform. Use it before meetings, exams, competitions—or anytime you feel watched and judged." },
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
