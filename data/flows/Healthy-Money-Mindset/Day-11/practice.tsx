import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Tema zilei:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        Scrie o scrisoare de mulțumire unei persoane care te-a rănit, mulțumește pentru lecțiile pe care simți că le-ai primit prin intermediul acelei relații.
        Înainte, descarcă toate resentimentele într-o scrisoare separată, doar pentru tine, dacă ai.
      </li>
      <li>Apoi, scrie o scrisoare de mulțumire unei persoane pe care simți că ai rănit-o.</li>
      <li>Aceste scrisori nu trebuie trimise neapărat. Reprezintă procesul tău interior.</li>
    </ul>
    <p>
      <strong>Reflecția zilei:</strong> „Sunt parte dintr-un întreg.”
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
        Write a thank-you letter to someone who hurt you, thanking them for the lessons you feel you received through that relationship.
        Before that, if needed, unload all resentment in a separate letter—just for you.
      </li>
      <li>Then write a thank-you letter to someone you feel you hurt.</li>
      <li>These letters don’t need to be sent. They represent your inner process.</li>
    </ul>
    <p>
      <strong>Reflection of the day:</strong> “I am part of a whole.”
    </p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-11",
  position: 11,
  title: { ro: "Ziua 11 – Iertare, asumare și recunoștință în relații", en: "Day 11 – Forgiveness, Accountability, and Gratitude in Relationships" },
  name: { ro: "Iertare, asumare și recunoștință în relații", en: "Forgiveness, Accountability, and Gratitude in Relationships" },
  intro: { ro: "Eliberează tensiunea relațională prin scris: resentiment, recunoștință, asumare.", en: "Release relational tension through writing: resentment, gratitude, accountability." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
