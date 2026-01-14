import type { Flow } from '../types';
import { withTotals } from '../utils';
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
import practice_13 from "./Day-13/practice";
import practice_14 from "./Day-14/practice";
import practice_15 from "./Day-15/practice";
import practice_16 from "./Day-16/practice";
import practice_17 from "./Day-17/practice";
import practice_18 from "./Day-18/practice";
import practice_19 from "./Day-19/practice";
import practice_20 from "./Day-20/practice";
import practice_21 from "./Day-21/practice";
import practice_22 from "./Day-22/practice";
import practice_23 from "./Day-23/practice";
import practice_24 from "./Day-24/practice";
import practice_25 from "./Day-25/practice";
import practice_26 from "./Day-26/practice";
import practice_27 from "./Day-27/practice";
import practice_28 from "./Day-28/practice";
import practice_29 from "./Day-29/practice";
import practice_30 from "./Day-30/practice";

const roDescription = (
  <>
    <p>{"The mind can be a tsunami of routines, activities, conditioned behaviors, commitments, intentions and desires. Add to this the unknown, unplanned and unexpected uncertainties that unfold with every message, email, phone call or conversation, and before you know it... you've been swept away by a wave of reactivity and lost track of the goal you set out to achieve."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"The mind can be a tsunami of routines, activities, conditioned behaviors, commitments, intentions and desires. Add to this the unknown, unplanned and unexpected uncertainties that unfold with every message, email, phone call or conversation, and before you know it... you've been swept away by a wave of reactivity and lost track of the goal you set out to achieve."}</p>
  </>
);


const flow: Flow = withTotals({
  id: "StressBreak",
  position: 1,
  title: { ro: "Stress Break", en: "Stress Break" },
  name: { ro: "Stress Break", en: "Stress Break" },
  intro: { ro: "The first step we must take is to calm ourselves, find peace, and relearn to breathe easily.", en: "The first step we must take is to calm ourselves, find peace, and relearn to breathe easily." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/data/flows/Stress-Break/cover-ro.jpg", en: "/data/flows/Stress-Break/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14, practice_15, practice_16, practice_17, practice_18, practice_19, practice_20, practice_21, practice_22, practice_23, practice_24, practice_25, practice_26, practice_27, practice_28, practice_29, practice_30],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
