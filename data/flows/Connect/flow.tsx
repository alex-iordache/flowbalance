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
    <p>{"Only when we are sick do we begin to stay connected to our own body. In fact, illness itself represents a signal from the body that we need to slow down our daily pace, rest, and give it more attention. The body is our most important life partner, it supports us with energy in everything we do. That is why it is essential to stay connected to it and prevent illness."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Only when we are sick do we begin to stay connected to our own body. In fact, illness itself represents a signal from the body that we need to slow down our daily pace, rest, and give it more attention. The body is our most important life partner, it supports us with energy in everything we do. That is why it is essential to stay connected to it and prevent illness."}</p>
  </>
);


const flow: Flow = withTotals({
  id: "Connect",
  position: 2,
  title: { ro: "Connect", en: "Connect" },
  name: { ro: "Connect", en: "Connect" },
  intro: { ro: "The body is our most important life partner, it supports us with energy in everything we do.", en: "The body is our most important life partner, it supports us with energy in everything we do." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/data/flows/Connect/cover-ro.jpg", en: "/data/flows/Connect/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
