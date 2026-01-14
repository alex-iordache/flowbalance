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

const roDescription = (
  <>
    <p>{"Train mentally. Play. Win the game."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Train mentally. Play. Win the game."}</p>
  </>
);


const flow: Flow = withTotals({
  id: "MentalTraining",
  position: 7,
  title: { ro: "Mental Training", en: "Mental Training" },
  name: { ro: "Mental Training", en: "Mental Training" },
  intro: { ro: "Train mentally. Play. Win the game.", en: "Train mentally. Play. Win the game." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/data/flows/Mental-Training/cover-ro.jpg", en: "/data/flows/Mental-Training/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14, practice_15, practice_16, practice_17, practice_18, practice_19, practice_20],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
