import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Tema zilei:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        Descrie-ți mama din perspectiva ta: ce este pozitiv, ce este negativ, ce ai învățat de la ea și ce efect au aceste învățături în viața ta.
      </li>
      <li>
        Reflectează la cea mai mare durere din viața ei și la un vis pe care nu l-a împlinit. Dacă nu poți vorbi direct cu ea, conectează-te interior și scrie ce vine către tine.
      </li>
      <li>
        Observă ce trăiești acum în viața ta și identifică tiparele, comportamentele sau situațiile care se repetă și seamănă cu cele ale mamei tale. Trage concluzii.
      </li>
    </ul>
    <p>
      <strong>Reflecția zilei:</strong> „Îmi privesc rădăcinile cu blândețe.”
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Today’s theme:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        Describe your mother from your perspective: what is positive, what is negative, what you learned from her, and how those lessons affect your life.
      </li>
      <li>
        Reflect on the biggest pain in her life and a dream she didn’t fulfill. If you can’t talk to her directly, connect inward and write what comes to you.
      </li>
      <li>
        Notice what you are living now and identify patterns, behaviors, or situations that repeat and resemble your mother’s. Draw conclusions.
      </li>
    </ul>
    <p>
      <strong>Reflection of the day:</strong> “I look at my roots with gentleness.”
    </p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-10",
  position: 10,
  title: { ro: "Ziua 10 – Mama, rădăcina și tiparele", en: "Day 10 – Mother, Roots, and Patterns" },
  name: { ro: "Mama, rădăcina și tiparele", en: "Mother, Roots, and Patterns" },
  intro: { ro: "Observă rădăcinile și tiparele moștenite, fără judecată, cu blândețe.", en: "Notice inherited roots and patterns—without judgment, with gentleness." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
