import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Recitește tot ce ai scris în aceste 9 zile.
      Notează: ce imagine despre tine se schimbă, ce nu mai poți spune despre tine, ce știi acum cu certitudine despre tine.
    </p>
    <p>
      <strong>Scrisoare către viitor:</strong> scrie o scrisoare către tine din viitor, dintr-un moment precis în care ai reușit un lucru important pentru tine.
      Alege un obiectiv concret și realist, stabilește exact anul și luna în care este deja realizat și începe scrisoarea ca și cum ai trăi deja acel moment.
    </p>
    <p>
      Descrie în detaliu unde ești, cum arată ziua ta, cine a fost alături de tine și ce rol concret a avut fiecare.
      Notează ce spun ceilalți atunci când reușita ta devine vizibilă și, mai ales, ce îți spui tu în acel moment despre tine și despre capacitatea ta de a duce lucrurile până la capăt.
    </p>
    <p>
      Explică de ce ai reușit și ce ai făcut diferit ca să ajungi acolo: acțiuni clare, repetate, decizii menținute chiar și când a fost greu, lucruri la care ai renunțat și moduri concrete în care te-ai ținut de tine.
      Încheie scrisoarea cu un mesaj de susținere din partea ta, cel din viitor, către tine, cel de acum.
    </p>
    <p>
      <strong>Repetă</strong> întreg programul până simți că reușești să fii în punctul în care îți dorești să fii.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> Re-read everything you wrote over the last 9 days.
      Note: what your self-image is changing, what you can no longer say about yourself, and what you now know with certainty about yourself.
    </p>
    <p>
      <strong>Letter to your future self:</strong> write a letter to yourself from the future, from a precise moment when you achieved something important to you.
      Choose a concrete, realistic goal, set the exact year and month when it is already achieved, and begin the letter as if you are living that moment now.
    </p>
    <p>
      Describe in detail where you are, what your day looks like, who was there with you and what role each person played.
      Note what others say when your success becomes visible—and most importantly, what you tell yourself in that moment about you and your ability to follow through.
    </p>
    <p>
      Explain why you succeeded and what you did differently to get there: clear repeated actions, decisions you kept even when it was hard, things you let go of, and concrete ways you stayed with yourself.
      End the letter with a supportive message from your future self to your present self.
    </p>
    <p>
      <strong>Repeat</strong> the whole program until you feel you’re at the point you want to be.
    </p>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-10",
  position: 10,
  title: { ro: "Ziua 10 – Integrare totală", en: "Day 10 – Full Integration" },
  name: { ro: "Integrare totală", en: "Full Integration" },
  intro: { ro: "Integrează ce ai descoperit și scrie o scrisoare către tine din viitor.", en: "Integrate what you discovered and write a letter from your future self." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/integrare-si-continuitate.mp3", en: "audioFiles/integrare-si-continuitate.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
