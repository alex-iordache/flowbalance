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
  id: "Positive-Mindset",
  position: 15,

  title: { ro: "Mindset pozitiv", en: "Positive Mindset" },
  name: { ro: "Mindset pozitiv", en: "Positive Mindset" },
  intro: { ro: "Construiește o minte care caută sprijin, nu amenințări.", en: "Build a mind that looks for support, not threats." },
  description: { ro: "Pozitiv nu înseamnă fals—înseamnă flexibil. Acest flow te antrenează să observi ce funcționează, să reîncadrezi obstacolele și să creezi o voce interioară mai blândă. Folosește-l dimineața sau când te simți pesimist, dur cu tine sau descurajat.", en: "Positive doesn’t mean fake—it means flexible. This flow trains you to notice what’s working, reframe setbacks, and create a kinder inner voice. Use it in the morning or whenever you feel pessimistic, harsh, or discouraged." },
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
