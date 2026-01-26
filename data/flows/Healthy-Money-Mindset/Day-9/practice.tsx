import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi ne uităm la tiparele care te limitează în relația cu banii. Scopul nu este să le elimini, ci să le recunoști.
    </p>
    <p>Pentru ziua de astăzi:</p>
    <p>Notează 5 atitudini sau comportamente care simți că te limitează financiar.</p>
    <p>Pentru fiecare, notează când apare și ce emoție o declanșează.</p>
    <p>
      Alege două dintre limitările identificate și scrie un plan simplu de acțiune pentru a le transforma.
      Definește pași concreți și realizabili pe termen scurt.
    </p>
    <p>
      <strong>Reflecția zilei:</strong> Schimbarea începe atunci când îmi asum pași mici și clari. Astăzi și în fiecare zi dăruiesc ceea ce vreau să primesc.
    </p>
    <p>Seara, ascultă audio-ul zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you’ll look at the patterns that limit you in your relationship with money. The goal isn’t to eliminate them—it’s to recognize them.
    </p>
    <p>For today:</p>
    <p>Write down 5 attitudes or behaviors you feel limit you financially.</p>
    <p>For each one, note when it shows up and what emotion it triggers.</p>
    <p>
      Choose two of the limitations you identified and write a simple action plan to transform them.
      Define concrete, achievable short-term steps.
    </p>
    <p>
      <strong>Reflection of the day:</strong> Change begins when I commit to small, clear steps. Today and every day, I give what I want to receive.
    </p>
    <p>In the evening, listen to today’s audio.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-09",
  position: 9,
  title: { ro: "Ziua 9 – Claritate și rezolvare interioară", en: "Day 9 – Clarity and Inner Resolution" },
  name: { ro: "Claritate și rezolvare interioară", en: "Clarity and Inner Resolution" },
  intro: { ro: "Recunoaște tiparele și alege pași mici, clari, pe care îi poți susține.", en: "Recognize patterns and choose small, clear steps you can sustain." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/claritate-si-rezolvarea-interioara.mp3", en: "audioFiles/claritate-si-rezolvarea-interioara.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
