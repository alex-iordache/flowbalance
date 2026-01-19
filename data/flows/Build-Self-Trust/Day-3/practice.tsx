import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Listează 20 de decizii care ți-au schimbat viața în bine, chiar dacă au fost grele: plecări, renunțări, limite puse, începuturi.
      Pentru fiecare, notează:
    </p>
    <p>
      <em>Ce s-ar fi întâmplat dacă nu luam acea decizie?</em>
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
    <p><em><strong>Gând automat:</strong> „O să dau greș.”</em></p>
    <p><em><strong>Gând alternativ realist:</strong></em></p>
    <ul className="list-disc pl-5 mt-2">
      <li><em>„Nu pot ști dinainte rezultatul.”</em></li>
      <li><em>„Greșeala nu este echivalentă cu eșecul.”</em></li>
      <li><em>„Am mai gestionat situații incerte.”</em></li>
      <li><em>„Pot face ajustări dacă nu iese perfect.”</em></li>
    </ul>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> List 20 decisions that changed your life for the better, even if they were hard: leaving, letting go, setting boundaries, beginnings.
      For each one, note:
    </p>
    <p>
      <em>What would have happened if I hadn’t made that decision?</em>
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
    <p><em><strong>Automatic thought:</strong> “I’m going to mess up.”</em></p>
    <p><em><strong>Realistic alternative thought:</strong></em></p>
    <ul className="list-disc pl-5 mt-2">
      <li><em>“I can’t know the outcome in advance.”</em></li>
      <li><em>“A mistake isn’t the same as failure.”</em></li>
      <li><em>“I’ve handled uncertainty before.”</em></li>
      <li><em>“I can adjust if it’s not perfect.”</em></li>
    </ul>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-03",
  position: 3,
  title: { ro: "Ziua 3 – Deciziile care te-au salvat", en: "Day 3 – The Decisions That Saved You" },
  name: { ro: "Deciziile care te-au salvat", en: "The Decisions That Saved You" },
  intro: { ro: "Adu-ți aminte de deciziile grele pe care le-ai dus — și înlocuiește absoluturile cu gânduri credibile.", en: "Remember the hard decisions you carried through—and replace absolutes with believable thoughts." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/deciziile-care-m-au-salvat.mp3", en: "audioFiles/deciziile-care-m-au-salvat.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
