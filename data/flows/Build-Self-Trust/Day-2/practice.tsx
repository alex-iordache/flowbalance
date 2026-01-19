import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Scrie numele a 30 de persoane pe care le-ai ajutat, influențat sau susținut de-a lungul vieții tale.
      Poate fi cineva pe care l-ai ascultat, cineva pe care l-ai sprijinit emoțional, pe care l-ai învățat ceva, cineva pentru care ai fost un exemplu.
      Lângă fiecare nume, notează <strong>cum ai contribuit</strong>.
    </p>
    <p>
      <strong>Pe parcursul zilei:</strong> alege <strong>două situații diferite</strong> în care apare autocritica. Pentru fiecare, scrie:
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Situația concretă</li>
      <li>Gândul critic exact</li>
      <li>Dovezi PRO gând</li>
      <li>Dovezi CONTRA gând</li>
    </ul>
    <p className="mt-2">
      <strong>Regulă:</strong> dovezile trebuie să fie fapte, nu impresii. Dacă nu ai dovezi clare, scrii: <em>„nu am dovezi reale”</em>.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> Write down the names of 30 people you have helped, influenced, or supported throughout your life.
      It can be someone you listened to, someone you supported emotionally, someone you taught, or someone for whom you were an example.
      Next to each name, note <strong>how you contributed</strong>.
    </p>
    <p>
      <strong>During the day:</strong> choose <strong>two different situations</strong> where self-criticism shows up. For each one, write:
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>The concrete situation</li>
      <li>The exact critical thought</li>
      <li>Evidence FOR the thought</li>
      <li>Evidence AGAINST the thought</li>
    </ul>
    <p className="mt-2">
      <strong>Rule:</strong> evidence must be facts, not impressions. If you don’t have clear evidence, write: <em>“I don’t have real evidence.”</em>
    </p>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-02",
  position: 2,
  title: { ro: "Ziua 2 – Impactul tău real", en: "Day 2 – Your Real Impact" },
  name: { ro: "Impactul tău real", en: "Your Real Impact" },
  intro: { ro: "Vezi concret cum ai contat pentru alții și verifică autocritica prin dovezi.", en: "See how you’ve mattered to others and test self-criticism against real evidence." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/impactul-meu-asupra-celorlalti.mp3", en: "audioFiles/impactul-meu-asupra-celorlalti.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
