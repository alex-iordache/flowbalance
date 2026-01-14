import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</p>
  </>
);


const practice: Practice = {
  id: "Positive-Mindset-Day-06",
  position: 6,
  title: { ro: "Mindset pozitiv - Ziua 6", en: "Positive Mindset - Day 6" },
  name: { ro: "Ziua 6", en: "Day 6" },
  intro: { ro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
