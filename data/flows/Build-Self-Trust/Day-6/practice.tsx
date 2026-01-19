import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Listează 15 situații în care ai simțit ceva „din interior” și s-a confirmat ulterior.
      Notează ce ai simțit în corp atunci.
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
    <p>
      <strong>Main exercise:</strong> List 15 situations where you felt something “from the inside” and it was later confirmed.
      Note what you felt in your body at that time.
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
  id: "Build-Self-Trust-Day-06",
  position: 6,
  title: { ro: "Ziua 6 – Intuiția care a avut dreptate", en: "Day 6 – The Intuition That Was Right" },
  name: { ro: "Intuiția care a avut dreptate", en: "The Intuition That Was Right" },
  intro: { ro: "Reține dovezi că vocea ta interioară a fost corectă — și încheie ziua cu 3–1–1.", en: "Collect evidence your inner voice has been right—and end the day with 3–1–1." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/intuitia-mea-este-reala.mp3", en: "audioFiles/intuitia-mea-este-reala.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
