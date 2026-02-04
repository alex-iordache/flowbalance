import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p><strong>Tema zilei:</strong></p>
    <p>
      Astăzi, oprește-te pentru câteva momente și observă cum vorbești cu tine atunci când greșești, când ești obosit sau
      când lucrurile nu ies așa cum ți-ai dorit. Fără să încerci să schimbi nimic, alege o situație concretă din viața ta
      recentă în care ai fost dur cu tine sau te-ai simțit insuficient. Nu analiza și nu explica. Doar recunoaște acea
      experiență.
    </p>
    <p>
      Pe parcursul zilei, ori de câte ori îți amintești de acea situație, întreabă-te în tăcere: „Ce aș fi avut nevoie
      să aud sau să primesc atunci?” și lasă răspunsul să apară în forma lui, fără să îl corectezi.
    </p>
    <p>
      Seara, înainte de culcare, ascultă înregistrarea audio a zilei și permite corpului să trăiască această experiență
      de blândețe și acceptare. Această înregistrare este un exercițiu de reglare emoțională profundă.
    </p>
    <p>
      Practicată constant, auto-compasiunea reduce auto-critica, crește siguranța interioară și susține o relație mai
      caldă, mai stabilă și mai autentică cu tine și cu viața ta.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p><strong>Today’s theme:</strong></p>
    <p>
      Today, pause for a few moments and notice how you speak to yourself when you make a mistake, when you’re tired, or
      when things don’t turn out the way you wanted. Without trying to change anything, choose a concrete recent
      situation in which you were harsh with yourself or felt “not enough.” Don’t analyze or explain—just acknowledge
      the experience.
    </p>
    <p>
      During the day, whenever you remember that situation, ask yourself silently: “What did I need to hear or receive
      back then?” and let the answer arise in its own form, without correcting it.
    </p>
    <p>
      In the evening, before sleep, listen to today’s audio recording and allow your body to experience this sense of
      kindness and acceptance. This recording is a deep emotional regulation exercise.
    </p>
    <p>
      Practiced consistently, self-compassion reduces self-criticism, increases inner safety, and supports a warmer,
      steadier, and more authentic relationship with yourself and your life.
    </p>
  </>
);

const practice: Practice = {
  id: "Self-Compassion-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Blândețe", en: "Day 1 – Kindness" },
  name: { ro: "Blândețe", en: "Kindness" },
  intro: { ro: "Observă vocea interioară și oferă-ți exact ce ți-a lipsit: prezență și siguranță.", en: "Notice your inner voice and offer what was missing: presence and safety." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/self-compassion.mp3", en: "audioFiles/self-compassion.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

