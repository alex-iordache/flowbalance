import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Tema zilei:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        Scrie o listă detaliată cu tot ce ai în viața ta: lucruri materiale și spirituale, tangibile și intangibile, fără limită.
      </li>
      <li>
        Scrie o scrisoare către țara ta de origine, exprimând sincer tot ce simți, indiferent de emoțiile care apar, și încheie din spațiul recunoștinței.
      </li>
    </ul>
    <p>
      <strong>Reflecția zilei:</strong> „Simt recunoștință față de tot ce există în viața mea!”
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
        Write a detailed list of everything you have in your life: material and spiritual, tangible and intangible—no limits.
      </li>
      <li>
        Write a letter to your country of origin, honestly expressing everything you feel, whatever emotions arise, and end from a place of gratitude.
      </li>
    </ul>
    <p>
      <strong>Reflection of the day:</strong> “I feel gratitude for everything that exists in my life!”
    </p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-12",
  position: 12,
  title: { ro: "Ziua 12 – Recunoștință, integrare și încheiere", en: "Day 12 – Gratitude, Integration, and Closing" },
  name: { ro: "Recunoștință, integrare și încheiere", en: "Gratitude, Integration, and Closing" },
  intro: { ro: "Închide prin recunoștință și claritate: ce ai, ce simți, ce integrezi.", en: "Close with gratitude and clarity: what you have, what you feel, what you integrate." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
