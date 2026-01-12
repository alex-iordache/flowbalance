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
  id: "Shake-Method",
  position: 34,

  title: { ro: "Metoda scuturării", en: "Shake Method" },
  name: { ro: "Metoda scuturării", en: "Shake Method" },
  intro: { ro: "Eliberează stresul prin mișcare—natural și în siguranță.", en: "Discharge stress through movement—safely and naturally." },
  description: { ro: "Scuturarea este un reset natural: corpul descarcă activarea în exces. Acest flow îți oferă un ritm simplu de scuturare și revenire, astfel încât după practică să te simți mai ușor și mai reglat. Folosește-l când ești „wired,” neliniștit sau porți tensiune care nu se mișcă.", en: "Shaking is a built-in human reset: the body releases excess activation. This flow introduces a simple shake rhythm and recovery so you feel lighter and more regulated afterward. Use it when you’re wired, restless, or carrying tension that won’t budge." },
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
