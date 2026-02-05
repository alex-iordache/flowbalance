import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru a progresa în orice aspect al vieții tale este nevoie ca, uneori, să te oprești și să analizezi atent modul în
      care gestionezi situațiile stresante din viața ta. Fiind conștient de abilitățile de care dispui, poți reacționa cu
      calm și blândețe în fața provocărilor.
    </p>
    <p>
      <strong>Pentru ziua aceasta stabilește o calitate de care ai nevoie pentru a depăși anxietatea.</strong>
    </p>
    <p>
      <strong>VIZUALIZEAZĂ:</strong> Vizualizează toate aspectele din viața ta care s-ar schimba dacă ai avea acea
      calitate. Fă acest lucru timp de 5 minute, în fiecare zi.
    </p>
    <p>
      <strong>AFIRMĂ:</strong> Spune-ți că ai acea calitate, ești acea calitate. Fă acest lucru de mai multe ori pe zi.
    </p>
    <p>
      Stabilește un ritual zilnic de care să te ții. Stabilește-ți aceleași ore de culcare, aceleași ore de masă, aceleași
      ore la care să faci exerciții fizice. Seara cu 2 ore înainte de somn răsfață-te, fă activități care te relaxează.
      Asigură-te că ai un somn odihnitor.
    </p>
    <p>După ce ai terminat acest exercițiu, ascultă înregistrarea audio de mai jos.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      To make progress in any area of your life, you sometimes need to pause and look carefully at how you handle
      stressful situations. When you’re aware of the skills you have, you can respond with calm and kindness to
      challenges.
    </p>
    <p>
      <strong>For today, choose one quality you need to move past anxiety.</strong>
    </p>
    <p>
      <strong>VISUALISE:</strong> Visualise all the ways your life would change if you had that quality. Do this for 5
      minutes every day.
    </p>
    <p>
      <strong>AFFIRM:</strong> Tell yourself you have that quality, you are that quality. Do this several times a day.
    </p>
    <p>
      Set a daily ritual and stick to it: same bedtime, same mealtimes, same time for physical exercise. In the evening,
      two hours before sleep, treat yourself and do relaxing activities. Make sure you get restful sleep.
    </p>
    <p>After you finish this exercise, listen to the audio below.</p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'O calitate pentru anxietate: vizualizare + afirmare + ritual zilnic.',
    en: 'One quality for anxiety: visualisation + affirmation + daily ritual.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
