import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi lucrăm cu dorințele tale reale și cu pașii care le pot transforma în realitate.
      Abundența sănătoasă nu apare din visare, ci din claritate și acțiuni asumate.
    </p>
    <p>Pentru ziua de astăzi:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Notează 5 dorințe importante pentru tine, materiale sau nemateriale.</li>
      <li>Pentru fiecare dorință, scrie acțiunile necesare pentru ca ea să poată deveni realitate.</li>
    </ul>
    <p>Nu căuta soluții perfecte. Caută pași posibili.</p>
    <p>
      <strong>Gândul zilei:</strong> „Îmi transform dorințele în direcție.”
    </p>
    <p>Seara, înainte de culcare, ascultă înregistrarea audio a zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we work with your real desires and the steps that can turn them into reality.
      Healthy abundance doesn’t come from daydreaming—it comes from clarity and committed action.
    </p>
    <p>For today:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Write down 5 important desires for you—material or non-material.</li>
      <li>For each desire, list the actions needed for it to become real.</li>
    </ul>
    <p>Don’t look for perfect solutions. Look for possible steps.</p>
    <p>
      <strong>Thought of the day:</strong> “I turn my desires into direction.”
    </p>
    <p>In the evening, before sleep, listen to today’s audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-03",
  position: 3,
  title: { ro: "Ziua 3 – Vizualizarea obiectivului personal", en: "Day 3 – Visualizing Your Personal Goal" },
  name: { ro: "Vizualizarea obiectivului personal", en: "Visualizing Your Personal Goal" },
  intro: { ro: "Clarifică ce vrei cu adevărat și ce pași te apropie de acel obiectiv.", en: "Clarify what you truly want and the steps that move you toward it." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/vizualizarea-obiectului-personal.mp3", en: "audioFilesEnAi/vizualizarea-obiectului-personal-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
