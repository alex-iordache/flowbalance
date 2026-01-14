import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi privește înapoi și observă ce ai învățat despre tine și despre corpul tău. Autoreglarea este o abilitate care se construiește în timp.
    </p>
    <p>La finalul acestui program, te invit să observi dacă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>ai creat pauze între impuls și reacție,</li>
      <li>ai devenit mai atent/ă la corpul tău,</li>
      <li>ai fost mai blând/ă cu tine,</li>
      <li>ai ales conștient măcar o dată.</li>
    </ul>
    <p>Continuă să folosești aceste exerciții ori de câte ori simți nevoia.</p>
    <p>Ascultă această înregistrare audio ori de câte ori dorești să revii la calm și claritate.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today, look back and notice what you’ve learned about yourself and your body. Self-regulation is a skill that is built over time.
    </p>
    <p>At the end of this program, I invite you to notice whether:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>you created pauses between impulse and reaction,</li>
      <li>you became more attentive to your body,</li>
      <li>you were kinder to yourself,</li>
      <li>you made a conscious choice at least once.</li>
    </ul>
    <p>Keep using these exercises whenever you feel the need.</p>
    <p>Listen to this audio recording whenever you want to return to calm and clarity.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-10",
  position: 10,
  title: { ro: "Ziua 10 – Integrare", en: "Day 10 – Integration" },
  name: { ro: "Integrare", en: "Integration" },
  intro: { ro: "Integrează ce ai învățat și continuă să folosești exercițiile când ai nevoie.", en: "Integrate what you learned and keep using the exercises whenever you need them." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/integrare-valurile-trec-tu-ramai.mp3", en: "audioFiles/integrare-valurile-trec-tu-ramai.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
