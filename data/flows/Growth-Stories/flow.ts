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
  id: "Growth-Stories",
  position: 24,

  title: { ro: "Povești de creștere", en: "Growth Stories" },
  name: { ro: "Povești de creștere", en: "Growth Stories" },
  intro: { ro: "Un impuls narativ către următorul tău nivel.", en: "A narrative push toward your next level." },
  description: { ro: "Creșterea e rar liniară—iar poveștile îți amintesc asta. Narațiunile de aici susțin reziliența, curajul și disponibilitatea de a învăța din disconfort. Folosește-le când ai nevoie de perspectivă nouă, un strop de energie sau o reamintire că înaintezi.", en: "Growth is rarely linear—and stories remind you of that. These narratives support resilience, courage, and the willingness to learn from discomfort. Use them when you need a fresh perspective, a spark, or a reminder that you’re moving forward." },
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
