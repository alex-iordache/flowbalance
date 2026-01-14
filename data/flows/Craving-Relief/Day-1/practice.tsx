import type { Practice } from '../../types';
const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi este prima zi a acestui program și primul pas către o relație mai calmă și mai conștientă cu impulsurile tale.
      Nu este despre control, nu este despre interdicții, ci despre a învăța să observi ce se întâmplă în interiorul tău, fără judecată.
    </p>
    <p>Pentru ziua de astăzi, te invit să devii atent/ă la momentele în care apare pofta. Nu încerca să o schimbi și nu încerca să o oprești.</p>
    <p>Notează într-un jurnal sau pe o foaie:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>când apare pofta,</li>
      <li>unde o simți în corp,</li>
      <li>ce făceai chiar înainte să apară.</li>
    </ul>
    <p>Este suficient să observi.</p>
    <p>Pe parcursul zilei, de fiecare dată când apare un impuls, spune-ți în gând:</p>
    <p><em><strong>„Observ ce se întâmplă în mine.”</strong></em></p>
    <p>Seara, înainte de culcare, ascultă această înregistrare audio, care te va ajuta să îți liniștești corpul și să începi să creezi spațiu între impuls și reacție.</p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today is the first day of this program and the first step toward a calmer, more conscious relationship with your impulses.
      This isn’t about control or restrictions—it’s about learning to notice what’s happening inside you, without judgment.
    </p>
    <p>
      For today, I invite you to pay attention to the moments when a craving appears.
      Don’t try to change it and don’t try to stop it.
    </p>
    <p>Write down in a journal or on a piece of paper:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>when the craving appears,</li>
      <li>where you feel it in your body,</li>
      <li>what you were doing right before it showed up.</li>
    </ul>
    <p>It’s enough to simply observe.</p>
    <p>Throughout the day, each time an impulse appears, tell yourself silently:</p>
    <p><em><strong>“I notice what’s happening inside me.”</strong></em></p>
    <p>
      In the evening, before bed, listen to this audio recording. It will help calm your body and begin creating space between impulse and reaction.
    </p>
  </>
);

const practice: Practice = {
  id: "Craving-Relief-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Conștientizarea poftei", en: "Day 1 – Awareness of the Craving" },
  name: { ro: "Conștientizarea poftei", en: "Awareness of the Craving" },
  intro: { ro: "Observă pofta fără judecată și notează contextul în care apare.", en: "Observe the craving without judgment and note the context in which it appears." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/valul-trece.mp3", en: "audioFiles/valul-trece.mp3" },
  finished: false,
  lastPositionSec: 0,
};

export default practice;



