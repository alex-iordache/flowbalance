import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>{"For today, write down on paper the top 3 situations in your life that stress you out most often. Note what bothers you, what frustrates you, what disappoints you."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"For today, write down on paper the top 3 situations in your life that stress you out most often. Note what bothers you, what frustrates you, what disappoints you."}</p>
  </>
);


const practice: Practice = {
  id: "StressBreak-Ziua-001",
  position: 1,
  title: { ro: "Stress Break - Day 1", en: "Stress Break - Day 1" },
  name: { ro: "Stress Break - Day 1", en: "Stress Break - Day 1" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
