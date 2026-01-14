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

const roDescription = (
  <>
    <p>{"Claritatea apare când te oprești din împins și începi să observi. Poveștile de aici invită realizări subtile despre obiceiuri, relații și felul în care îți vorbești. Folosește-le când te simți blocat și vrei un „aha” blând, nu un reset dur."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Insight arrives when you stop pushing and start noticing. These stories invite subtle realizations about habits, relationships, and the way you speak to yourself. Use them when you feel stuck and want a gentle “aha” rather than a hard reset."}</p>
  </>
);


const flow: Flow = {
  id: "Insight-Stories",
  position: 25,

  title: { ro: "Povești de claritate", en: "Insight Stories" },
  name: { ro: "Povești de claritate", en: "Insight Stories" },
  intro: { ro: "Povești care scot la lumină tipare pe care nu le vedeai.", en: "Stories that reveal patterns you couldn’t see before." },
  description: { ro: roDescription, en: enDescription },
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
