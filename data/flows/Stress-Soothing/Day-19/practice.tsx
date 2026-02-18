import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Fiecare gând sau fiecare emoție corespunde unei reacții fizice. O glumă bună îți poate descreți fruntea și te poate
      face să te simți mai bine, în timp ce o ceartă cu cineva apropiat îți poate provoca o stare generală proastă, dureri
      de cap sau de stomac.
    </p>
    <p>
      Pentru ziua aceasta remarcă care sunt părțile din corpul tău pe care le încordezi atunci când o informație sau o
      situație nu îți convine. Adu-ți aminte că este important să nu lași corpul tău să fie chinuit de fiecare gând
      negativ. Dacă ai un disconfort fizic, te invit atunci să asculți înregistrarea de mai jos.
    </p>
    <p>
      <strong>Alege o tensiune fizică și notează:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce emoție o însoțește?</li>
      <li>Ce mesaj ar putea avea pentru tine?</li>
    </ul>
    <p>
      <strong>Permite corpului să fie ascultat.</strong>
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să analizezi fiecare reacție fizică pe care corpul tău o
      resimte atunci când ai un gând negativ.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Every thought or emotion has a physical counterpart. A good joke can relax your forehead and make you feel better,
      while an argument with someone close can leave you feeling unwell, with a headache or stomach ache.
    </p>
    <p>
      Today notice which parts of your body you tense when information or a situation doesn’t suit you. Remember it’s
      important not to let your body be tormented by every negative thought. If you have physical discomfort, we invite
      you to listen to the recording below.
    </p>
    <p>
      <strong>Choose one physical tension and note:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>What emotion goes with it?</li>
      <li>What message might it have for you?</li>
    </ul>
    <p>
      <strong>Let your body be heard.</strong>
    </p>
    <p>
      Listen to this audio; it will help you recognise each physical reaction your body has when you have a negative
      thought.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-19',
  position: 19,
  title: { ro: 'Ziua 19', en: 'Day 19' },
  name: { ro: 'Ziua 19', en: 'Day 19' },
  intro: {
    ro: 'Tensiune fizică și emoții; ascultă corpul.',
    en: 'Physical tension and emotions; listen to your body.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/redu-disconfortul-fizic.mp3', en: 'audioFilesEnAi/redu-disconfortul-fizic-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
