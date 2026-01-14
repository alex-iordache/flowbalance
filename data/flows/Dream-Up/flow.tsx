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
    <p>{"Often, we make all kinds of plans for ourselves to lead a better life, but there are situations where life circumstances take us by surprise and we end up neglecting ourselves. Some say they will exercise more, or eat healthier, or learn something new, or dedicate more time to their own passions, etc. Often self-sabotage intervenes, with many postponements and all plans go down the drain. This program is an invitation to recreate at a mental level different neural networks that support you to obtain the life you desire. It offers you the inner strength to do what you want for yourself. If you are happy, if you have success, then those dear to you will also benefit from your happiness and success."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Often, we make all kinds of plans for ourselves to lead a better life, but there are situations where life circumstances take us by surprise and we end up neglecting ourselves. Some say they will exercise more, or eat healthier, or learn something new, or dedicate more time to their own passions, etc. Often self-sabotage intervenes, with many postponements and all plans go down the drain. This program is an invitation to recreate at a mental level different neural networks that support you to obtain the life you desire. It offers you the inner strength to do what you want for yourself. If you are happy, if you have success, then those dear to you will also benefit from your happiness and success."}</p>
  </>
);


const flow: Flow = withTotals({
  id: "DreamUp",
  position: 3,
  title: { ro: "Dream Up", en: "Dream Up" },
  name: { ro: "Dream Up", en: "Dream Up" },
  intro: { ro: "Do you feel that your passion and motivation have decreased regarding your dreams? Do you want to attract more opportunities into your life?", en: "Do you feel that your passion and motivation have decreased regarding your dreams? Do you want to attract more opportunities into your life?" },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/data/flows/Dream-Up/cover-ro.jpg", en: "/data/flows/Dream-Up/cover-en.jpg" },

  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14, practice_15, practice_16, practice_17, practice_18, practice_19, practice_20],

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,
});

export default flow;
