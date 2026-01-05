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
  id: "Calm-Your-Nervous-System",
  position: 6,

  title: { ro: "Calmează-ți sistemul nervos", en: "Calm Your Nervous System" },
  name: { ro: "Calmează-ți sistemul nervos", en: "Calm Your Nervous System" },
  intro: { ro: "Antrenează-ți sistemul nervos să recunoască din nou siguranța.", en: "Train your nervous system to recognize safety again." },
  description: { ro: "Acest flow este o reconfigurare blândă: ritm de respirație, semnale din corp și atenție care te învață reglarea. Vei construi un „setare implicită” mai calmă care se vede în conversații, somn și decizii. Repetă zilele care îți plac—consecvența bate intensitatea aici.", en: "This flow is a gentle re-patterning: breath pacing, body cues, and attention that teaches regulation. You’ll build a calmer “default setting” that shows up in conversations, sleep, and decision-making. Repeat the days you love—consistency beats intensity here." },
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
