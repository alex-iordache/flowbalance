import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi lucrăm cu relația ta directă cu banii și cu convingerile care s-au format de-a lungul timpului.
      Acest exercițiu este despre a-ți oferi permisiunea de a schimba modul în care te raportezi la bani.
    </p>
    <p>
      <strong>Pentru ziua de astăzi:</strong> Scrie de 10 ori următoarea afirmație, folosind numele tău complet:
    </p>
    <p>
      <em>
        „Eu, (numele), încep o nouă relație cu banii. Banii sunt un instrument care susține siguranța, bunăstarea și libertatea mea. Aleg să mă raportez la bani cu responsabilitate și claritate. Merit stabilitate și pot construi prosperitate într-un mod sănătos.”
      </em>
    </p>
    <p>– Apoi, înregistrează această afirmație o dată, cu vocea ta, și ascult-o ulterior.</p>
    <p>
      <strong>Gândul zilei:</strong> „Îmi dau voie să cresc dincolo de vechile convingeri.”
    </p>
    <p>Seara, ascultă propria ta înregistrare audio.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we work with your direct relationship with money and the beliefs formed over time.
      This exercise is about giving yourself permission to change how you relate to money.
    </p>
    <p>
      <strong>For today:</strong> Write the following statement 10 times, using your full name:
    </p>
    <p>
      <em>
        “I, (name), begin a new relationship with money. Money is a tool that supports my safety, well-being, and freedom. I choose to relate to money with responsibility and clarity. I deserve stability, and I can build prosperity in a healthy way.”
      </em>
    </p>
    <p>Then record this statement once in your own voice and listen to it later.</p>
    <p>
      <strong>Thought of the day:</strong> “I allow myself to grow beyond old beliefs.”
    </p>
    <p>In the evening, listen to your own audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-05",
  position: 5,
  title: { ro: "Ziua 5 – O nouă relație cu banii", en: "Day 5 – A New Relationship with Money" },
  name: { ro: "O nouă relație cu banii", en: "A New Relationship with Money" },
  intro: { ro: "Rescrie convingerile: banii ca instrument de siguranță, bunăstare și libertate.", en: "Rewrite the beliefs: money as a tool for safety, well-being, and freedom." },
  description: { ro: roDescription, en: enDescription },
  // No R2 audio today (you record your own).
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
