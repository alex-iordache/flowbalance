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
  id: "Stress-Soothing",
  position: 5,

  title: { ro: "Liniștirea stresului", en: "Stress Soothing" },
  name: { ro: "Liniștirea stresului", en: "Stress Soothing" },
  intro: { ro: "Coboară din modul de stres către un calm mai stabil.", en: "Downshift from stress mode into a calmer baseline." },
  description: { ro: "Stresul strânge corpul și îți îngustează gândirea. Pe parcursul a 12 zile, exersezi eliberarea micro-tensiunii, stabilizarea respirației și închiderea ciclurilor de stres, ca să te simți mai puțin „în alertă.” Folosește-l după muncă, după conflicte sau oricând simți presiune constantă.", en: "Stress tightens the body and narrows your thinking. Across 12 days, you’ll practice releasing micro-tension, steadying breath, and finishing stress cycles so you feel less “on edge.” Use it after work, after conflict, or anytime you notice constant pressure." },
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
