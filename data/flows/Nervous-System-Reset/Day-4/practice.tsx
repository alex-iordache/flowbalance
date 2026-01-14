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
  id: "Nervous-System-Reset-Day-04",
  position: 4,
  title: { ro: "Resetarea sistemului nervos - Ziua 4", en: "Nervous System Reset - Day 4" },
  name: { ro: "Ziua 4", en: "Day 4" },
  intro: { ro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "1-2-trecerea-peste-obstacole.mp3", en: "1-2-trecerea-peste-obstacole.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
