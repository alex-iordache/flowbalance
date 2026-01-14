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
  id: "Heart-Centered-Balance-Day-09",
  position: 9,
  title: { ro: "Echilibru centrat pe inimă - Ziua 9", en: "Heart-Centered Balance - Day 9" },
  name: { ro: "Ziua 9", en: "Day 9" },
  intro: { ro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
