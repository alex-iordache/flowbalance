import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi începem acest program prin a aduce atenția către abundența care există deja în viața ta.
      Nu vorbim despre bani încă, ci despre ceea ce ai primit de-a lungul timpului, prin oameni, relații și experiențe.
      Abundența nu începe cu cifrele, ci cu ceea ce a crescut în tine.
    </p>
    <p>
      Pentru ziua de astăzi, te invit să faci o listă cu cel puțin <strong>30 de persoane</strong> din viața ta care, prin existența lor,
      au lăsat o amprentă asupra ta. Pot fi membri ai familiei, prieteni, profesori, mentori, autori sau oameni pe care i-ai întâlnit o singură dată.
    </p>
    <p>Pentru fiecare persoană, concentrează-te pe:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>aspectele pozitive</li>
      <li>valorile pe care le-a adus în viața ta</li>
      <li>modul în care te-a ajutat să crești, chiar și indirect</li>
    </ul>
    <p>
      <strong>Gândul zilei:</strong> „Astăzi observ toată bogăția care mă înconjoară.”
    </p>
    <p>Seara, înainte de culcare, ascultă înregistrarea audio a zilei. O poți face înainte sau după temă.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we begin by bringing attention to the abundance that already exists in your life.
      We’re not talking about money yet—we’re talking about what you’ve received over time through people, relationships, and experiences.
      Abundance doesn’t start with numbers; it starts with what has grown in you.
    </p>
    <p>
      For today, make a list of at least <strong>30 people</strong> in your life who, simply by being who they are, left a mark on you.
      They can be family members, friends, teachers, mentors, authors, or someone you met only once.
    </p>
    <p>For each person, focus on:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>the positive aspects</li>
      <li>the values they brought into your life</li>
      <li>how they helped you grow, even indirectly</li>
    </ul>
    <p>
      <strong>Thought of the day:</strong> “Today I notice all the richness around me.”
    </p>
    <p>In the evening, before sleep, listen to today’s audio recording. You can do it before or after the exercise.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Abundența care s-a format în timp", en: "Day 1 – Abundance Built Over Time" },
  name: { ro: "Abundența care s-a format în timp", en: "Abundance Built Over Time" },
  intro: { ro: "Observă abundența deja prezentă în viața ta—dincolo de cifre.", en: "Notice the abundance already present in your life—beyond numbers." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/abundenta-care-s-a-transformat-in-timp.mp3", en: "audioFiles/abundenta-care-s-a-transformat-in-timp.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
