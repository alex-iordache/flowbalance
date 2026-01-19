import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Tema:</strong> Încrederea se construiește zilnic.</p>
    <p>
      <strong>Exercițiu principal:</strong> Alege 5 promisiuni mici pentru tine pe care le vei respecta zilnic timp de o săptămână.
      Exemple: pauză, apă, mișcare, somn, limită.
    </p>
    <p className="mt-2"><strong>Seara:</strong> scrii:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>3 lucruri făcute bine</li>
      <li>1 act de grijă față de tine</li>
      <li>1 lucru învățat</li>
    </ul>
  </>
);
const enDescription = (
  <>
    <p><strong>Theme:</strong> Confidence is built daily.</p>
    <p>
      <strong>Main exercise:</strong> Choose 5 small promises to yourself that you will keep daily for one week.
      Examples: a pause, water, movement, sleep, a boundary.
    </p>
    <p className="mt-2"><strong>Evening:</strong> write:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>3 things you did well</li>
      <li>1 act of care toward yourself</li>
      <li>1 thing you learned</li>
    </ul>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-08",
  position: 8,
  title: { ro: "Ziua 8 – Alegerile mici care contează", en: "Day 8 – The Small Choices That Matter" },
  name: { ro: "Alegerile mici care contează", en: "The Small Choices That Matter" },
  intro: { ro: "Alege promisiuni mici, ținute zilnic, și consolidează încrederea pas cu pas.", en: "Choose small daily promises and strengthen trust step by step." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/puterea-care-se-aseaza.mp3", en: "audioFiles/puterea-care-se-aseaza.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
