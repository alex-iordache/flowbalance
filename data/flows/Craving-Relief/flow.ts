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
  id: "Craving-Relief",
  position: 3,

  title: { ro: "Reducerea poftelor", en: "Craving Relief" },
  name: { ro: "Reducerea poftelor", en: "Craving Relief" },
  intro: { ro: "Transformă poftele în informație, nu în comandă.", en: "Turn cravings into information, not commands." },
  description: { ro: "Poftele urcă și apoi trec—dacă poți rămâne prezent câteva minute. Aici înveți o pauză simplă, o scanare a corpului și un ritm de „surfing” pe impuls care reduce alegerile impulsive. Folosește-l pentru mâncare, nicotină, scrolling sau orice buclă de obicei care îți fură atenția.", en: "Cravings peak and pass—if you can stay present for a few minutes. Here you’ll learn a simple pause, body scan, and urge-surfing rhythm that reduces impulsive choices. Use it for food, nicotine, scrolling, or any habit loop that hijacks your attention." },
  image: { ro: "/img/flow-bg.jpg", en: "/img/flow-bg.jpg" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
