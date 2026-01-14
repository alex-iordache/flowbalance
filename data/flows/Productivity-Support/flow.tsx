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
    <p>{"Productivitatea este claritate plus momentum. Acest flow te ajută să alegi următoarea acțiune potrivită, să începi fără fricțiune și să continui fără auto-critică. Perfect în zilele cu procrastinare, blocaj sau sărit din task în task."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Productivity is clarity plus momentum. This flow helps you choose the next right action, start without friction, and keep going without self-criticism. Perfect for days when you procrastinate, feel stuck, or bounce between tasks."}</p>
  </>
);


const flow: Flow = {
  id: "Productivity-Support",
  position: 10,

  title: { ro: "Sprijin pentru productivitate", en: "Productivity Support" },
  name: { ro: "Sprijin pentru productivitate", en: "Productivity Support" },
  intro: { ro: "Mai puțină reactivitate, mai mult din ce contează.", en: "Do less reactivity, do more of what matters." },
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
