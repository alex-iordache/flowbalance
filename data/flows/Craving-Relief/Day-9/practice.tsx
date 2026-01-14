import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi îți reamintești cine ești dincolo de poftă. Pofta este o experiență, nu o definiție.
    </p>
    <p>Notează:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>ce ai reușit în aceste zile,</li>
      <li>ce ai observat diferit la tine.</li>
    </ul>
    <p>Recunoaște fiecare pas mic.</p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today you remember who you are beyond the craving. A craving is an experience, not a definition.
    </p>
    <p>Write down:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>what you managed to do during these days,</li>
      <li>what you noticed differently about yourself.</li>
    </ul>
    <p>Acknowledge every small step.</p>
    <p>In the evening, listen to the audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-09",
  position: 9,
  title: { ro: "Ziua 9 – Identitatea calmă", en: "Day 9 – Calm Identity" },
  name: { ro: "Identitatea calmă", en: "Calm Identity" },
  intro: { ro: "Privește progresul și reamintește-ți cine ești dincolo de poftă.", en: "Review your progress and remember who you are beyond cravings." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/identitatea-calma-eu-dincolo-de-pofta.mp3", en: "audioFiles/identitatea-calma-eu-dincolo-de-pofta.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
