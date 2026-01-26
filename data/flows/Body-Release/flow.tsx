import type { Flow } from '../types';

const roDescription = (
  <>
    <p>{"Tensiunea este adesea stres neîncheiat, stocat în mușchi și respirație. Acest flow te ghidează prin eliberare blândă—maxilar, umeri, abdomen—ca sistemul tău să se liniștească. Folosește-l după stat mult pe scaun, după conflicte sau când te simți încordat fără să știi de ce."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Tension is often unfinished stress stored in muscles and breath. This flow guides you through gentle release—jaw, shoulders, belly—so your system can settle. Use it after long sitting, after conflict, or when you feel tight without knowing why."}</p>
  </>
);


const flow: Flow = {
  id: "Body-Release",
  position: 32,

  title: { ro: "Eliberare corporală", en: "Body Release" },
  name: { ro: "Eliberare corporală", en: "Body Release" },
  intro: { ro: "Lasă corpul să încheie ce a început stresul.", en: "Let the body complete what stress started." },
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
