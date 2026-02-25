import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Transformări profunde se petrec la nivelul corpului atunci când ne propunem să fim cu adevărat relaxați.
      Eliberează-ți mintea și creează-ți un obicei mic, care în timp îți poate aduce un impact uriaș.
    </p>
    <p>
      Pentru ziua aceasta, îți propun să îți aloci cel puțin un moment de relaxare, în care să te deconectezi de la
      problemele de serviciu sau de acasă.
    </p>
    <p>
      <strong>La finalul zilei de lucru, notează:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce las la serviciu?</li>
      <li>Ce aleg să duc cu mine acasă?</li>
    </ul>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de problemele de la serviciu, pentru a oferi
      relaxare întregului corp și să-ți menții vitalitatea până la finalul zilei.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Deep shifts happen at the body level when we commit to being truly relaxed. Free your mind and create a small
      habit that over time can have a huge impact.
    </p>
    <p>
      Today we suggest you set aside at least one moment of relaxation when you disconnect from work or home problems.
    </p>
    <p>
      <strong>At the end of the workday, note:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>What am I leaving at work?</li>
      <li>What do I choose to take home with me?</li>
    </ul>
    <p>
      Listen to this audio; it will help you disconnect from work issues, relax your whole body, and maintain your
      energy until the end of the day.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-20',
  position: 20,
  title: { ro: 'Ziua 20', en: 'Day 20' },
  name: { ro: 'Ziua 20', en: 'Day 20' },
  intro: {
    ro: 'Deconectare de la problemele de serviciu; ce lași și ce iei acasă.',
    en: 'Disconnect from work problems; what you leave and what you take home.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectarea-de-la-problemele-de-serviciu.mp3',
    en: 'audioFilesEnAi/deconectarea-de-la-problemele-de-serviciu-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
