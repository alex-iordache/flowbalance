import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Data viitoare când te simți tentat să fii supărat, frustrat, furios, amintește-ți ție însuți, că este acea parte din viață care nu poate fi controlată, însă, ceea ce poți controla este modul în care tu alegi să răspunzi.</p>
    <p>Pentru ziua aceasta, dacă ai vreun gând negativ azi, transformă-l în ceva pozitiv (de exemplu, nu îmi place task-ul X devine ce pot face ca să îmi placă? sau am o zi proastă devine ce pot face ca să devină o zi bună?).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești soluția potrivită pentru tine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Next time you feel tempted to be upset, frustrated, or angry, remind yourself: that’s the part of life you can’t
      control. What you can control is how you choose to respond.
    </p>
    <p>
      For today, if you notice a negative thought, transform it into something positive (for example: “I don’t like task
      X” becomes “What can I do so I like it more?”; or “I’m having a bad day” becomes “What can I do to make it a good
      day?”).
    </p>
    <p>
      Listen to this audio recording—it will help you see the situation from a different angle and find the right
      solution for you.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-20',
  position: 20,
  title: { ro: 'Ziua 20', en: 'Day 20' },
  name: { ro: 'Ziua 20', en: 'Day 20' },
  intro: {
    ro: 'Data viitoare când te simți tentat să fii supărat, frustrat, furios, amintește-ți ție însuți, că este acea…',
    en: 'Practice choosing your response: reframe one negative thought today.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFiles/trecerea-peste-obstacole.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
