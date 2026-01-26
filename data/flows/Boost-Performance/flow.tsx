import type { Flow } from '../types';

const roDescription = (
  <>
    <p>{"Performanța nu înseamnă doar efort; înseamnă și reglare. Acest flow te ajută să intri într-o stare de focus, să revii mai repede după greșeli și să îți păstrezi energia pe tot parcursul zilei. E excelent înainte de antrenament, sprinturi de lucru sau orice situație în care vrei să dai ce ai mai bun la comandă."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Performance is not only effort; it’s regulation. This flow helps you enter a focused state, recover faster after mistakes, and keep energy for the whole day. Great before training, work sprints, or any situation where you want your best self on demand."}</p>
  </>
);


const flow: Flow = {
  id: "Boost-Performance",
  position: 8,

  title: { ro: "Crește performanța", en: "Boost Performance" },
  name: { ro: "Crește performanța", en: "Boost Performance" },
  intro: { ro: "Apari mai „sharp”—fără să te arzi pe interior.", en: "Show up sharper—without burning yourself out." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flow-bg.png", en: "/img/flow-bg.png" },
  comingSoon: true,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 0,
  practices: [],
};

export default flow;
