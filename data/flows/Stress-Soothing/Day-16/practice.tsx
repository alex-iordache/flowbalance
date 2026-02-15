import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Nimic nu este mai important în viață decât pasiunea. Nu contează ceea ce faci în viață, atâta timp cât o faci cu
      și din pasiune.
    </p>
    <p>Pentru ziua aceasta fă o listă cu pasiunile tale.</p>
    <p>Apoi, trece-le în programul tău de săptămâna aceasta. Dacă spațiul nu îți permite să le faci pe toate, atunci fă ceva legat de ele de acolo de unde ești. De exemplu, dacă una dintre pasiunile tale este călătoria, atunci planifică călătoria de anul viitor, stabilește unde vrei să mergi, ce vrei să vizitezi, etc.</p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Nothing is more important in life than passion. It doesn’t matter what you do in life, as long as you do it with and
      from passion.
    </p>
    <p>Today make a list of your passions.</p>
    <p>Then schedule them into this week. If there isn’t room for all of them, do something related to them from where you are. For example, if one of your passions is travel, plan next year’s trip—where you want to go, what you want to see, etc.</p>
    <p>In the evening, listen to the audio.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-16',
  position: 16,
  title: { ro: 'Ziua 16', en: 'Day 16' },
  name: { ro: 'Ziua 16', en: 'Day 16' },
  intro: {
    ro: 'Pasiunile tale: pune-le în program și fă ceva legat de ele.',
    en: 'Your passions: put them in your schedule and do something related to them.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/relaxare-prin-respiratie.mp3', en: 'audioFilesEnAi/relaxare-prin-respiratie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
