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
  id: "Heart-Centered-Balance-Day-02",
  position: 2,
  title: { ro: "Echilibru centrat pe inimă - Ziua 2", en: "Heart-Centered Balance - Day 2" },
  name: { ro: "Ziua 2", en: "Day 2" },
  intro: { ro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
