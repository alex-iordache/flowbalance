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
  id: "Improve-Sleep",
  position: 7,

  title: { ro: "Îmbunătățește somnul", en: "Improve Sleep" },
  name: { ro: "Îmbunătățește somnul", en: "Improve Sleep" },
  intro: { ro: "Liniștește mintea și fă loc pentru odihnă adevărată.", en: "Unwind your mind and make space for real rest." },
  description: { ro: "Somnul mai bun începe înainte de culcare: cobori activarea, eliberezi tensiunea și reduci zgomotul mental. Practicile de aici susțin o tranziție mai lină către somn și o relație mai blândă cu trezirile nocturne. Folosește-l seara sau oricând corpul e obosit, dar mintea nu se oprește.", en: "Better sleep starts before bedtime: lower arousal, release tension, and reduce mental chatter. These practices support a smoother transition into sleep and a kinder relationship with nighttime wake-ups. Use it in the evening, or anytime your body feels tired but your mind won’t stop." },
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
