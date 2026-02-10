import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi îți îndrepți atenția către modelele de prosperitate pe care le-ai întâlnit de-a lungul vieții tale.
      Prosperitatea nu înseamnă doar bani, ci și echilibru, siguranță, bucurie și capacitatea de a-ți trăi viața așa cum îți dorești.
    </p>
    <p>Pentru ziua de astăzi, ai două etape de parcurs:</p>
    <p>
      <strong>Prima etapă:</strong> Fă o listă cu persoanele pe care le consideri prospere în familia ta sau în mediul apropiat.
      Poate fi vorba de oameni care, în copilăria ta, păreau să aibă „mai mult”: mai multă liniște, mai multă stabilitate, mai multă libertate.
    </p>
    <p>
      <strong>A doua etapă:</strong> Alege una sau două persoane publice pe care le percepi ca fiind prospere.
      Observă ce trăsături au, ce atitudine față de viață, ce fel de alegeri par să facă.
    </p>
    <p>La final, notează:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>unde recunoști aceste trăsături în tine</li>
      <li>unde le-ai văzut deja în familia ta</li>
    </ul>
    <p>
      <strong>Gândul zilei:</strong> „Îmi creez abundența personală din resurse reale.”
    </p>
    <p>Seara, ascultă înregistrarea audio a zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you’ll focus on the prosperity models you’ve encountered throughout your life.
      Prosperity doesn’t mean only money—it also means balance, safety, joy, and the ability to live the life you want.
    </p>
    <p>For today, you have two stages:</p>
    <p>
      <strong>Stage 1:</strong> Make a list of people you consider prosperous in your family or close environment.
      They may be people who, in your childhood, seemed to have “more”: more calm, more stability, more freedom.
    </p>
    <p>
      <strong>Stage 2:</strong> Choose one or two public figures you perceive as prosperous.
      Notice their traits, their attitude toward life, and the kinds of choices they seem to make.
    </p>
    <p>At the end, write down:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>where you recognize these traits in yourself</li>
      <li>where you’ve already seen them in your family</li>
    </ul>
    <p>
      <strong>Thought of the day:</strong> “I create my personal abundance from real resources.”
    </p>
    <p>In the evening, listen to today’s audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-02",
  position: 2,
  title: { ro: "Ziua 2 – Modele de prosperitate și oglindirea lor", en: "Day 2 – Prosperity Models and Their Reflection" },
  name: { ro: "Modele de prosperitate și oglindirea lor", en: "Prosperity Models and Their Reflection" },
  intro: { ro: "Observă ce înseamnă prosperitatea pentru tine și ce poți integra în mod real.", en: "Notice what prosperity means to you and what you can realistically integrate." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/modele-de-prosperitate-si-oglindirea-lor.mp3", en: "audioFilesEnAi/modele-de-prosperitate-si-oglindirea-lor-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
