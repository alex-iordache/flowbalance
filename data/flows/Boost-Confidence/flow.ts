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
  id: "Boost-Confidence",
  position: 20,

  title: { ro: "Crește încrederea", en: "Boost Confidence" },
  name: { ro: "Crește încrederea", en: "Boost Confidence" },
  intro: { ro: "Fă un pas înainte cu un „da, pot” mai stabil.", en: "Step forward with a steadier “yes, I can.”" },
  description: { ro: "Încrederea crește când corpul se simte susținut și mintea clară. Acest flow combină ancorarea, postura și dialogul interior ca să te simți mai capabil în situații reale. Folosește-l înainte de conversații dificile, începuturi noi sau momente care te intimidează.", en: "Confidence grows when your body feels supported and your mind feels clear. This flow blends grounding, posture, and inner dialogue so you feel more capable in real situations. Use it before challenging conversations, new starts, or moments that intimidate you." },
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
