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
  id: "Calming-Anxiety",
  position: 1,

  title: { ro: "Calmarea anxietății", en: "Calming Anxiety" },
  name: { ro: "Calmarea anxietății", en: "Calming Anxiety" },
  intro: { ro: "Încetinește anxietatea și revino la o respirație stabilă.", en: "Slow anxious momentum and return to steady breath." },
  description: { ro: "Acest flow te ajută să înmoi grija la nivelul corpului: respirație, maxilar, abdomen și atenție. Vei exersa resetări scurte care întrerup spiralele „dar dacă…” și reconstruiesc senzația de siguranță. Folosește-l când mintea aleargă sau înainte de momente în care ai tendința să supra-analizezi.", en: "This flow helps you soften worry at the level of the body: breath, jaw, belly, and attention. You’ll practice short resets that interrupt “what if…” spirals and rebuild a felt sense of safety. Use it when your mind is racing or before moments you tend to overthink." },
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
