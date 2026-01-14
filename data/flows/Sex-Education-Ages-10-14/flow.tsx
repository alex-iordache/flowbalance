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

const roDescription = (
  <>
    <p>{"Sex education program for children ages 10-14."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Sex education program for children ages 10-14."}</p>
  </>
);


const flow: Flow = withTotals({
  id: "Ages10to14",
  position: 11,
  title: { ro: "Sex Education Ages 10-14", en: "Sex Education Ages 10-14" },
  name: { ro: "Sex Education Ages 10-14", en: "Sex Education Ages 10-14" },
  intro: { ro: "Sex education program for children ages 10-14.", en: "Sex education program for children ages 10-14." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/data/flows/Sex-Education-Ages-10-14/cover-ro.jpg", en: "/data/flows/Sex-Education-Ages-10-14/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
