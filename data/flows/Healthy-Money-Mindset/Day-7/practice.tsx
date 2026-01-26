import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi lucrăm cu ideea de economisire ca formă de grijă, nu ca lipsă. Acest exercițiu antrenează mintea să asocieze viitorul cu siguranța.
    </p>
    <p>Pentru ziua de astăzi:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Alege o sumă mică de bani și pune-o într-un plic sau într-un loc dedicat.</li>
      <li>Decide pentru ce plăcere concretă vei folosi acești bani în viitor.</li>
    </ul>
    <p>
      Lasă suma neatinsă și observă ce apare în tine. Încearcă să faci acest lucru în cât mai multe zile.
    </p>
    <p>
      <strong>Gândul zilei:</strong> „Îmi creez siguranța pas cu pas.”
    </p>
    <p>Seara, ascultă audio-ul zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we work with saving as a form of care, not lack. This exercise trains your mind to associate the future with safety.
    </p>
    <p>For today:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Choose a small amount of money and place it in an envelope or a dedicated spot.</li>
      <li>Decide what concrete pleasure you’ll use this money for in the future.</li>
    </ul>
    <p>
      Leave the amount untouched and notice what comes up. Try to do this on as many days as possible.
    </p>
    <p>
      <strong>Thought of the day:</strong> “I build my safety step by step.”
    </p>
    <p>In the evening, listen to today’s audio.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-07",
  position: 7,
  title: { ro: "Ziua 7 – Economisirea ca grijă", en: "Day 7 – Saving as Care" },
  name: { ro: "Economisirea ca grijă", en: "Saving as Care" },
  intro: { ro: "Antrenează mintea să vadă economisirea ca protecție și grijă de sine.", en: "Train your mind to see saving as protection and self-care." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/economisirea-ca-grija-si-capacitatea-de-a-sta-fara-reactie.mp3", en: "audioFiles/economisirea-ca-grija-si-capacitatea-de-a-sta-fara-reactie.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
