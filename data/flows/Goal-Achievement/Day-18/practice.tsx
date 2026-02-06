import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Ai încercat vreodată să privești un obstacol dintr-o altă perspectivă? Obstacolele vieții sunt cel mai adesea plasate în calea ta, pentru a vedea cât de mult îți dorești să ajungi acolo unde ți-ai propus și cât efort ești dispus/ă să dai.</p>
    <p>Pentru ziua aceasta fă o listă cu obstacolele pe care le întâmpini ca să realizezi propriul obiectiv/vis.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Have you ever tried looking at an obstacle from a different perspective? Life’s obstacles are often placed in your
      path to see how much you want to get where you set out to go—and how much effort you’re willing to give.
    </p>
    <p>
      For today, make a list of the obstacles you encounter on the way to achieving your goal/dream.
    </p>
    <p>
      Listen to this audio recording—it will help you see the situation from a different angle and find the right
      solution for you.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-18',
  position: 18,
  title: { ro: 'Ziua 18', en: 'Day 18' },
  name: { ro: 'Ziua 18', en: 'Day 18' },
  intro: {
    ro: 'Ai încercat vreodată să privești un obstacol dintr-o altă perspectivă? Obstacolele vieții sunt cel mai ades…',
    en: 'List your obstacles and practice shifting your perspective.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFiles/trecerea-peste-obstacole.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
