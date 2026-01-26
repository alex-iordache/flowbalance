import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi aducem atenția către modul în care investești în tine. De multe ori, cheltuiala vine la pachet cu vină, iar acest exercițiu este despre a schimba această asociere.
    </p>
    <p>Pentru ziua de astăzi:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Caută cel puțin 5 facturi, bonuri sau chitanțe.</li>
      <li>
        Pe spatele fiecăreia, scrie: <em>„Tot ceea ce cheltuiesc se întoarce către mine înmiit, sub formă de rezultate.”</em>
      </li>
    </ul>
    <p>
      Dacă nu ai suficiente documente, creează-le tu pe hârtie, notând suma, pe ce ai cheltuit și scopul.
    </p>
    <p>
      <strong>Gândul zilei:</strong> „Sunt o prioritate în viața mea.”
    </p>
    <p>Seara, ascultă propria ta înregistrare audio făcută la ziua 5.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we bring attention to how you invest in yourself. Often spending comes with guilt; this exercise is about changing that association.
    </p>
    <p>For today:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Find at least 5 invoices, receipts, or bills.</li>
      <li>
        On the back of each one, write: <em>“Everything I spend returns to me multiplied, as results.”</em>
      </li>
    </ul>
    <p>If you don’t have enough documents, create them on paper by writing the amount, what you spent it on, and the purpose.</p>
    <p>
      <strong>Thought of the day:</strong> “I am a priority in my life.”
    </p>
    <p>In the evening, listen to your own recording from Day 5.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-06",
  position: 6,
  title: { ro: "Ziua 6 – Investiția în tine", en: "Day 6 – Investing in Yourself" },
  name: { ro: "Investiția în tine", en: "Investing in Yourself" },
  intro: { ro: "Schimbă asocierea: investiția în tine fără vină, cu claritate și grijă.", en: "Shift the association: investing in yourself without guilt, with clarity and care." },
  description: { ro: roDescription, en: enDescription },
  // No R2 audio today (you listen to your own Day 5 recording).
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
