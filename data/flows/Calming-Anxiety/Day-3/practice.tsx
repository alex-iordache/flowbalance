import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      <strong>Pentru ziua aceasta stabilește o calitate de care ai nevoie pentru a depăși anxietatea. Continuă exercițiul
      de ieri, poate fi aceeași calitate.</strong>
    </p>
    <p>
      Spune-ți, de cel puțin cinci ori, de-a lungul zilei: <strong>Merit să …</strong> (orice îți dorești tu, de exemplu: să
      fiu iubit/ă, să am casa mea… etc.).
    </p>
    <p>Ascultă seara, înainte de culcare, înregistrarea audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      <strong>For today, choose one quality you need to move past anxiety. Continue yesterday’s exercise—it can be the same
      quality.</strong>
    </p>
    <p>
      Say to yourself at least five times during the day: <strong>I deserve to …</strong> (whatever you want, e.g. be
      loved, have my own home, etc.).
    </p>
    <p>In the evening, before bed, listen to the audio.</p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-03',
  position: 3,
  title: { ro: 'Ziua 3', en: 'Day 3' },
  name: { ro: 'Ziua 3', en: 'Day 3' },
  intro: {
    ro: 'Calitatea aleasă + „Merit să…” de cel puțin 5 ori; audio seara.',
    en: 'Chosen quality + “I deserve to…” at least 5 times; audio in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFilesEnAi/calitatea-de-care-ai-nevoie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
