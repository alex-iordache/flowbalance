import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Un prieten (sau o prietenă) este ca o piatră nepreţuită pe care fiecare om ar trebui să o aibă alături pe parcursul vieţii. Împărtăşirea unor lucruri personale cu prietenii te pot ajuta treci peste o problemă sau să înfrunţi anumite obstacole mai uşor.</p>
    <p>Pentru ziua aceasta vei spune unui apropiat ceea ce vrei să realizezi în următoarele 12 luni, legat de provocarea pe care ai avut-o de făcut în ziua anterioară.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: 'Un prieten (sau o prietenă) este ca o piatră nepreţuită pe care fiecare om ar trebui să o aibă alături pe p…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3', en: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
