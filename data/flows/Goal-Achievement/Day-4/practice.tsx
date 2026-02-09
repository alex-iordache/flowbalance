import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Un prieten (sau o prietenă) este ca o piatră nepreţuită pe care fiecare om ar trebui să o aibă alături pe parcursul vieţii. Împărtăşirea unor lucruri personale cu prietenii te pot ajuta treci peste o problemă sau să înfrunţi anumite obstacole mai uşor.</p>
    <p>Pentru ziua aceasta vei spune unui apropiat ceea ce vrei să realizezi în următoarele 12 luni, legat de provocarea pe care ai avut-o de făcut în ziua anterioară.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      A friend is like a priceless stone—someone everyone should have by their side in life. Sharing personal things
      with friends can help you get through a problem or face obstacles more easily.
    </p>
    <p>
      For today, tell someone close to you what you want to achieve in the next 12 months, connected to the challenge
      you completed yesterday.
    </p>
    <p>
      Listen to this audio recording—it will help you analyse how you manage your life and how you balance work time
      with time outside your working hours.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: 'Un prieten (sau o prietenă) este ca o piatră nepreţuită pe care fiecare om ar trebui să o aibă alături pe p…',
    en: 'Share your goals with someone you trust.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/VECHI-analiza-propriei-vieti.mp3', en: 'audioFilesEnAi/analiza-vietii-personale-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
