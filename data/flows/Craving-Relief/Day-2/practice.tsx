import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi mutăm atenția din minte în corp. De multe ori, pofta este o senzație corporală, nu o nevoie reală.
    </p>
    <p>
      Pentru ziua de astăzi, te invit ca atunci când apare pofta să îți pui o mână pe abdomen și să observi ce se întâmplă în corpul tău timp de 30–60 de secunde.
    </p>
    <p>Observă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>tensiunea,</li>
      <li>agitația,</li>
      <li>căldura,</li>
      <li>presiunea.</li>
    </ul>
    <p>Nu analiza și nu interpreta. Doar simte.</p>
    <p>Pe parcursul zilei, practică acest exercițiu de câte ori apare pofta.</p>
    <p>
      Seara, ascultă din nou înregistrarea audio <em>„Valul trece”</em>, pentru a consolida capacitatea de observare fără reacție.
    </p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we shift attention from the mind into the body. Often, a craving is a bodily sensation, not a real need.
    </p>
    <p>
      For today, when a craving appears, place one hand on your belly and observe what happens in your body for 30–60 seconds.
    </p>
    <p>Notice:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>tension,</li>
      <li>restlessness,</li>
      <li>warmth,</li>
      <li>pressure.</li>
    </ul>
    <p>Don’t analyze and don’t interpret. Just feel.</p>
    <p>Throughout the day, practice this exercise each time a craving appears.</p>
    <p>
      In the evening, listen again to the audio recording <em>“The wave passes”</em>, to strengthen your ability to observe without reacting.
    </p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-02",
  position: 2,
  title: { ro: "Ziua 2 – Corpul și senzațiile", en: "Day 2 – The Body and Sensations" },
  name: { ro: "Corpul și senzațiile", en: "The Body and Sensations" },
  intro: { ro: "Mută atenția în corp și observă senzațiile poftei timp de 30–60 de secunde.", en: "Shift attention into the body and observe craving sensations for 30–60 seconds." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/valul-trece.mp3", en: "audioFiles/valul-trece.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
