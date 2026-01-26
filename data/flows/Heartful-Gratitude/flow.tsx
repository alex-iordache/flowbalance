import type { Flow } from '../types';

const roDescription = (
  <>
    <p>{"Recunoștința e o stare pe care o poți exersa, chiar și în zile grele. Acest flow te ajută să îți muți atenția către ce te susține—oameni, momente și resurse interioare. Folosește-l ca să înmoi resentimentele, să te reconectezi și să simți mai multă căldură în viața de zi cu zi."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Gratitude is a state you can practice, even on hard days. This flow helps you shift attention toward what supports you—people, moments, and inner resources. Use it to soften resentment, reconnect, and feel more warmth in daily life."}</p>
  </>
);


const flow: Flow = {
  id: "Heartful-Gratitude",
  position: 26,

  title: { ro: "Recunoștință din inimă", en: "Heartful Gratitude" },
  name: { ro: "Recunoștință din inimă", en: "Heartful Gratitude" },
  intro: { ro: "Lasă recunoștința să se așeze în corp, nu doar în minte.", en: "Let gratitude land in the body, not just the mind." },
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
