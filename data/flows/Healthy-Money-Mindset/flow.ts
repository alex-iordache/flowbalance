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
  id: "Healthy-Money-Mindset",
  position: 21,

  title: { ro: "Mindset sănătos despre bani", en: "Healthy Money Mindset" },
  name: { ro: "Mindset sănătos despre bani", en: "Healthy Money Mindset" },
  intro: { ro: "Adu calm, claritate și respect de sine în deciziile despre bani.", en: "Bring calm, clarity, and self-respect into money decisions." },
  description: { ro: "Banii pot activa rușine, urgență sau evitare. Acest flow te ajută să îți reglezi reacțiile ca să poți planifica, alege și acționa cu stabilitate. E util când îți faci buget, îți prețuiești munca, ceri mai mult sau treci prin incertitudine financiară.", en: "Money can trigger shame, urgency, or avoidance. This flow helps you regulate those reactions so you can plan, choose, and act with steadiness. Great when you’re budgeting, pricing your work, asking for more, or facing financial uncertainty." },
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
