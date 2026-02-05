import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      A învăța recunoștința e cel mai bun lucru pentru calitatea vieții tale, în primul rând, pentru că nu mai trăiești
      în ideea de a umple un gol în existența ta, ci din conștiența abundenței care va atrage și mai multe lucruri bune.
    </p>
    <p>Pentru ziua aceasta fă o listă cu toate avantajele unui moment foarte dificil din viața ta: ce ai învățat nou despre tine, pentru ce altceva a făcut loc în viața ta etc.</p>
    <p>
      <strong>Astăzi introducem pauza de respirație ca instrument activ de reducere a stresului.</strong>
    </p>
    <p>Ori de câte ori apare un factor stresor:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>oprește-te</li>
      <li>respiră conștient de 3 ori, foarte profund</li>
      <li>observă corpul, mintea și emoțiile</li>
    </ul>
    <p>Notează seara:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce s-a schimbat după această pauză?</li>
      <li>Ce ai învățat despre tine?</li>
    </ul>
    <p>
      <strong>Seara, ascultă înregistrarea audio.</strong>
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Learning gratitude is one of the best things for the quality of your life—first, because you no longer live from
      the idea of filling a void in your existence, but from an awareness of abundance that attracts more good.
    </p>
    <p>
      Today make a list of all the benefits of a very difficult moment in your life: what you learned about yourself,
      what it made room for in your life, etc.
    </p>
    <p>
      <strong>Today we introduce the breathing pause as an active tool for reducing stress.</strong>
    </p>
    <p>Whenever a stressor appears:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>stop</li>
      <li>breathe consciously 3 times, very deeply</li>
      <li>notice your body, mind, and emotions</li>
    </ul>
    <p>In the evening, note:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What changed after this pause?</li>
      <li>What did you learn about yourself?</li>
    </ul>
    <p>
      <strong>In the evening, listen to the audio.</strong>
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Pauza de respirație: 3 respirații profunde la fiecare factor stresor.',
    en: 'Breathing pause: 3 deep breaths with each stressor.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/relaxare-prin-respiratie.mp3', en: 'audioFiles/relaxare-prin-respiratie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
