import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Scrie 15 situații dificile din viața ta peste care ai trecut, chiar dacă nu perfect: pierderi, eșecuri, respingeri, perioade de confuzie.
      Lângă fiecare, scrie:
    </p>
    <p>
      <em>Ce m-a ajutat să merg mai departe?</em>
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
      <strong>Main exercise:</strong> Write 15 difficult situations in your life that you got through, even if not perfectly: losses, failures, rejections, periods of confusion.
      Next to each, write:
    </p>
    <p>
      <em>What helped me keep going?</em>
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
  id: "Build-Self-Trust-Day-04",
  position: 4,
  title: { ro: "Ziua 4 – Reziliența ta", en: "Day 4 – Your Resilience" },
  name: { ro: "Reziliența ta", en: "Your Resilience" },
  intro: { ro: "Amintește-ți cum ai mers mai departe și ține o promisiune mică, clară.", en: "Remember how you kept going and keep one small, clear promise." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/rezilienta-mea.mp3", en: "audioFiles/rezilienta-mea.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
