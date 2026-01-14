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
  id: "Calm-Your-Nervous-System-Day-01",
  position: 1,
  title: { ro: "Calmează-ți sistemul nervos - Ziua 1", en: "Calm Your Nervous System - Day 1" },
  name: { ro: "Ziua 1", en: "Day 1" },
  intro: { ro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
