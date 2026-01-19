import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Scrie 20 de lucruri care sunt diferite la tine acum față de acum 5–10 ani, la nivel de: maturitate, claritate, limite, curaj, autocunoaștere.
    </p>
    <p>
      <strong>Dimineața:</strong> scrie o singură propoziție: <em>„Astăzi îmi promit un lucru mic și clar: ________.”</em>
    </p>
    <p><strong>Exemple:</strong></p>
    <ul className="list-disc pl-5 mt-2">
      <li>ies 10 minute la plimbare</li>
      <li>spun „nu” o dată</li>
      <li>termin un task început</li>
    </ul>
    <p className="mt-2"><strong>Seara:</strong> bifezi:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>făcut</li>
      <li>nefăcut</li>
    </ul>
    <p>Fără explicații. Fără judecată.</p>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> Write 20 things that are different about you now compared to 5–10 years ago: maturity, clarity, boundaries, courage, self-knowledge.
    </p>
    <p>
      <strong>Morning:</strong> write one sentence: <em>“Today I promise myself one small, clear thing: ________.”</em>
    </p>
    <p><strong>Examples:</strong></p>
    <ul className="list-disc pl-5 mt-2">
      <li>go for a 10-minute walk</li>
      <li>say “no” once</li>
      <li>finish one started task</li>
    </ul>
    <p className="mt-2"><strong>Evening:</strong> check one:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>done</li>
      <li>not done</li>
    </ul>
    <p>No explanations. No judgment.</p>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-05",
  position: 5,
  title: { ro: "Ziua 5 – Cine ai devenit", en: "Day 5 – Who You’ve Become" },
  name: { ro: "Cine ai devenit", en: "Who You’ve Become" },
  intro: { ro: "Observă schimbările reale din tine și continuă cu o promisiune mică.", en: "Notice real change in yourself and continue with one small promise." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/sunt-o-versiune-mai-solida-a-mea.mp3", en: "audioFiles/sunt-o-versiune-mai-solida-a-mea.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
