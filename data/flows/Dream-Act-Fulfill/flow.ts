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

const flow: Flow = withTotals({
  id: "DreamActFulfill",
  position: 9,
  title: { ro: "Dream Act Fulfill", en: "Dream Act Fulfill" },
  name: { ro: "Dream Act Fulfill", en: "Dream Act Fulfill" },
  intro: { ro: "Dream. Act. Fulfill.", en: "Dream. Act. Fulfill." },
  description: { ro: "Dream. Act. Fulfill.", en: "Dream. Act. Fulfill." },
  image: { ro: "/data/flows/Dream-Act-Fulfill/cover-ro.jpg", en: "/data/flows/Dream-Act-Fulfill/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14, practice_15, practice_16, practice_17, practice_18, practice_19, practice_20],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
