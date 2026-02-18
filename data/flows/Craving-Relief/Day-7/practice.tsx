import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi nu adăugăm nimic nou. Repetiția creează siguranță în sistemul nervos.
    </p>
    <p>Continuă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>observarea,</li>
      <li>pauza,</li>
      <li>respirația,</li>
      <li>autocompasiunea.</li>
    </ul>
    <p>Chiar și o singură pauză conștientă este suficientă.</p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we’re not adding anything new. Repetition creates safety in the nervous system.
    </p>
    <p>Continue with:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>observation,</li>
      <li>the pause,</li>
      <li>breathing,</li>
      <li>self-compassion.</li>
    </ul>
    <p>Even a single conscious pause is enough.</p>
    <p>In the evening, listen to the audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-07",
  position: 7,
  title: { ro: "Ziua 7 – Repetiție conștientă", en: "Day 7 – Conscious Repetition" },
  name: { ro: "Repetiție conștientă", en: "Conscious Repetition" },
  intro: { ro: "Repetă pașii de până acum și observă cum crește siguranța.", en: "Repeat the steps so far and notice safety building." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/valul-trece.mp3", en: "audioFilesEnAi/valul-trece-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
