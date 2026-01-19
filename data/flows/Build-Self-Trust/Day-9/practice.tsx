import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Scrie o pagină întreagă despre cine ești când ai încredere în tine: cum gândești, vorbești, alegi, reacționezi, cum este postura ta.
    </p>
    <p>
      <strong>Pe parcursul zilei:</strong> alege <strong>două situații</strong>. Pentru fiecare, scrie:
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Situația</li>
      <li>Gândul automat</li>
      <li>Dovezi CONTRA</li>
      <li><strong>Gând alternativ realist</strong></li>
    </ul>
    <p className="mt-2">
      <strong>Regulă importantă:</strong> gândul alternativ trebuie să fie <strong>credibil</strong>. Nu „Sunt grozav”, ci „Nu am dovezi că am eșuat”.
    </p>
    <p className="mt-2"><strong>Exemplu:</strong></p>
    <p><strong>Gând automat:</strong> „Nu sunt în stare.”</p>
    <p><strong>Gând alternativ realist:</strong></p>
    <ul className="list-disc pl-5 mt-2">
      <li>„Nu am dovezi că nu sunt în stare.”</li>
      <li>„Faptul că îmi este greu nu înseamnă că nu pot.”</li>
      <li>„Am mai învățat lucruri pe parcurs.”</li>
      <li>„Pot face pasul următor, nu trebuie să știu tot.”</li>
    </ul>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> Write a full page about who you are when you trust yourself: how you think, speak, choose, react, and what your posture is like.
    </p>
    <p>
      <strong>During the day:</strong> choose <strong>two situations</strong>. For each one, write:
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>The situation</li>
      <li>The automatic thought</li>
      <li>Evidence AGAINST</li>
      <li><strong>A realistic alternative thought</strong></li>
    </ul>
    <p className="mt-2">
      <strong>Important rule:</strong> the alternative thought must be <strong>believable</strong>. Not “I’m amazing,” but “I don’t have evidence that I failed.”
    </p>
    <p className="mt-2"><strong>Example:</strong></p>
    <p><strong>Automatic thought:</strong> “I can’t do it.”</p>
    <p><strong>Realistic alternative thought:</strong></p>
    <ul className="list-disc pl-5 mt-2">
      <li>“I don’t have evidence that I can’t do it.”</li>
      <li>“The fact that it’s hard doesn’t mean I can’t.”</li>
      <li>“I’ve learned things along the way before.”</li>
      <li>“I can take the next step; I don’t have to know everything.”</li>
    </ul>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-09",
  position: 9,
  title: { ro: "Ziua 9 – Identitatea încrederii", en: "Day 9 – The Identity of Confidence" },
  name: { ro: "Identitatea încrederii", en: "The Identity of Confidence" },
  intro: { ro: "Definește cine ești când ai încredere și exersează un gând alternativ realist.", en: "Define who you are when you trust yourself and practice a realistic alternative thought." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/autovalidare-si-punct-de-stabilitate-interioara.mp3", en: "audioFiles/autovalidare-si-punct-de-stabilitate-interioara.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
