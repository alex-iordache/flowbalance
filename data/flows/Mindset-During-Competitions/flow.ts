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
  id: "Mindset-During-Competitions",
  position: 16,

  title: { ro: "Mindset în competiții", en: "Mindset During Competitions" },
  name: { ro: "Mindset în competiții", en: "Mindset During Competitions" },
  intro: { ro: "Intră în competiție cu prezență, nu cu panică.", en: "Compete with presence, not panic." },
  description: { ro: "Competiția amplifică totul: emoții, așteptări și dialog interior. Practicile de aici te ajută să canalizezi adrenalina în focus, să revii după greșeli și să rămâi „în banda ta.” E grozav cu o zi înainte de eveniment, în dimineața lui sau imediat după.", en: "Competition amplifies everything: nerves, expectations, and self-talk. These practices help you channel adrenaline into focus, recover after errors, and stay in your lane. Great the day before an event, on the morning of, or right after." },
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
