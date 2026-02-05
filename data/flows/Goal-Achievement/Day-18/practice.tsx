import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Ai încercat vreodată să privești un obstacol dintr-o altă perspectivă? Obstacolele vieții sunt cel mai adesea plasate în calea ta, pentru a vedea cât de mult îți dorești să ajungi acolo unde ți-ai propus și cât efort ești dispus/ă să dai.</p>
    <p>Pentru ziua aceasta fă o listă cu obstacolele pe care le întâmpini ca să realizezi propriul obiectiv/vis.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-18',
  position: 18,
  title: { ro: 'Ziua 18', en: 'Day 18' },
  name: { ro: 'Ziua 18', en: 'Day 18' },
  intro: {
    ro: 'Ai încercat vreodată să privești un obstacol dintr-o altă perspectivă? Obstacolele vieții sunt cel mai ades…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFiles/trecerea-peste-obstacole.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
