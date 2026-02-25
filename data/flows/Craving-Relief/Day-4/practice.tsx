import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi consolidăm ceea ce corpul tău a început deja să învețe: că este în siguranță chiar și atunci când apare impulsul.
    </p>
    <p>Continuă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>observarea poftei,</li>
      <li>regula celor 10 minute,</li>
      <li>respirația conștientă.</li>
    </ul>
    <p>
      Adaugă astăzi o întrebare simplă când apare pofta: <em>„De ce am realmente nevoie acum?”</em>
    </p>
    <p>Poate fi odihnă, pauză, apă, mișcare sau liniște.</p>
    <p>Seara, ascultă din nou înregistrarea audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we strengthen what your body has already begun to learn: that it is safe even when an impulse appears.
    </p>
    <p>Continue with:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>observing the craving,</li>
      <li>the 10-minute rule,</li>
      <li>conscious breathing.</li>
    </ul>
    <p>
      Add one simple question when a craving appears: <em>“What do I truly need right now?”</em>
    </p>
    <p>It might be rest, a break, water, movement, or quiet.</p>
    <p>In the evening, listen again to the audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-04",
  position: 4,
  title: { ro: "Ziua 4 – Repetiție și siguranță", en: "Day 4 – Repetition and Safety" },
  name: { ro: "Repetiție și siguranță", en: "Repetition and Safety" },
  intro: { ro: "Consolidează pauza și întreabă-te de ce ai cu adevărat nevoie.", en: "Strengthen the pause and ask what you truly need." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/corp-sigur-calmarea-sistemului-nervos.mp3", en: "audioFilesEnAi/corp-sigur-calmarea-sistemului-nervos-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
