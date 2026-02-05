import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru a-ți începe ziua într-un ton pozitiv, un material audio te poate ajuta, în fiecare zi, să te bucuri de o
      nouă zi din viața ta.
    </p>
    <p>
      Pentru ziua aceasta te invit să realizezi o înregistrare audio proprie care te ajută să te trezești în fiecare
      dimineață. Poți urma modelul înregistrărilor pe care le-ai ascultat până acum sau poți fi creativ/ă și să faci un
      altfel de text, să ai alte ținte.
    </p>
    <p>
      Ascultă propria înregistrare audio, care te va ajuta să te încarci cu energie pozitivă și să te setezi mental pentru
      o nouă zi.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      To start your day on a positive note, an audio can help you, every day, to enjoy a new day in your life.
    </p>
    <p>
      Today we invite you to create your own audio recording that helps you wake up each morning. You can follow the
      style of the recordings you’ve listened to so far, or be creative and write a different script with different
      intentions.
    </p>
    <p>
      Listen to your own recording; it will help you charge yourself with positive energy and set yourself mentally for a
      new day.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-09',
  position: 9,
  title: { ro: 'Ziua 9', en: 'Day 9' },
  name: { ro: 'Ziua 9', en: 'Day 9' },
  intro: {
    ro: 'Creează propria ta înregistrare pentru dimineață.',
    en: 'Create your own morning recording.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
