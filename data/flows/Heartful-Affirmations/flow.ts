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
  id: "Heartful-Affirmations",
  position: 31,

  title: { ro: "Afirmații din inimă", en: "Heartful Affirmations" },
  name: { ro: "Afirmații din inimă", en: "Heartful Affirmations" },
  intro: { ro: "Afirmații care se simt reale—pentru că pornesc din corp.", en: "Affirmations that feel real—because they start in the body." },
  description: { ro: "Cuvintele funcționează când sistemul nervos le poate primi. Acest flow combină ancorarea cu afirmații din inimă, ca să internalizezi sprijinul, nu doar să îl repeți. Folosește-l dimineața, înainte de provocări sau când ai nevoie de întărire blândă.", en: "Words work when your nervous system can receive them. This flow pairs grounding with heart-centered statements so you can internalize support instead of just repeating it. Use it in the morning, before challenges, or when you need gentle reinforcement." },
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
