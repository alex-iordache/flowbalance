import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi exersăm capacitatea de a sta cu banii fără a reacționa imediat. Acesta este un exercițiu de toleranță emoțională.
    </p>
    <p>Pentru ziua de astăzi:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Alege o sumă de bani și las-o neatinsă timp de 24 de ore.</li>
      <li>Observă emoțiile și gândurile care apar.</li>
    </ul>
    <p>
      <strong>Gândul zilei:</strong> „Pot rămâne prezent/ă fără să mă grăbesc.”
    </p>
    <p>Seara, ascultă audio-ul zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you practice the ability to stay with money without reacting immediately. This is an emotional tolerance exercise.
    </p>
    <p>For today:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Choose an amount of money and leave it untouched for 24 hours.</li>
      <li>Notice the emotions and thoughts that arise.</li>
    </ul>
    <p>
      <strong>Thought of the day:</strong> “I can stay present without rushing.”
    </p>
    <p>In the evening, listen to today’s audio.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-08",
  position: 8,
  title: { ro: "Ziua 8 – Capacitatea de a sta fără reacție", en: "Day 8 – The Ability to Stay Without Reacting" },
  name: { ro: "Capacitatea de a sta fără reacție", en: "Staying Without Reacting" },
  intro: { ro: "Construiește toleranța emoțională: bani, timp, spațiu între impuls și decizie.", en: "Build emotional tolerance: money, time, space between impulse and decision." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/economisirea-ca-grija-si-capacitatea-de-a-sta-fara-reactie.mp3", en: "audioFilesEnAi/economisirea-ca-grija-si-capacitatea-de-a-sta-fara-reactie-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
