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
  id: "Mental-Clarity",
  position: 11,

  title: { ro: "Claritate mentală", en: "Mental Clarity" },
  name: { ro: "Claritate mentală", en: "Mental Clarity" },
  intro: { ro: "Ridică ceața mentală și vezi ce e real.", en: "Clear the mental fog and see what’s true." },
  description: { ro: "Când capul e aglomerat, și deciziile simple par grele. Practicile de aici creează spațiu: mai puține bucle, mai multă perspectivă și o narațiune interioară mai calmă. Folosește-l când ești confuz, supra-stimulat sau ai nevoie de un reset curat.", en: "When your head feels crowded, even simple decisions feel heavy. These practices create space: fewer loops, more perspective, and a calmer inner narrative. Use it when you’re confused, overstimulated, or craving a clean reset." },
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
