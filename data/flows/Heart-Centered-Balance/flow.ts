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
  id: "Heart-Centered-Balance",
  position: 28,

  title: { ro: "Echilibru centrat pe inimă", en: "Heart-Centered Balance" },
  name: { ro: "Echilibru centrat pe inimă", en: "Heart-Centered Balance" },
  intro: { ro: "Echilibrează mintea și inima—ca să te simți aliniat.", en: "Balance head and heart—so you feel aligned." },
  description: { ro: "Când trăiești doar în minte, pierzi căldura; când trăiești doar în emoție, pierzi direcția. Acest flow te ajută să le integrezi: gândire calmă și simțire deschisă. Folosește-l în relații, decizii și momente când vrei să acționezi din centrul tău.", en: "When you live only in the mind, you lose warmth; when you live only in emotion, you lose direction. This flow helps you integrate both: calm thinking and open feeling. Use it for relationships, decisions, and moments when you want to act from your center." },
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
