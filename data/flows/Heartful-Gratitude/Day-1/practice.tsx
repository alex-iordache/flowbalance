import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p><strong>Tema zilei:</strong></p>
    <p>
      Astăzi, alege un singur aspect concret din viața ta pentru care simți recunoștință autentică. Poate fi o persoană
      importantă, un animal de companie, o relație, un sprijin primit la momentul potrivit sau orice prezență care ți-a
      adus siguranță, bucurie sau alinare. Nu schimba alegerea pe parcursul zilei. Păstrează același reper.
    </p>
    <p>
      Seara, înainte de culcare, ascultă înregistrarea audio a zilei și permite corpului să recunoască și să integreze
      această stare de recunoștință, exact așa cum apare. Această înregistrare este un exercițiu de reglare emoțională.
      Recunoștința trăită la nivelul corpului ajută sistemul nervos să iasă din alertă, să reducă tensiunea interioară
      și să creeze o stare de siguranță care susține claritatea, motivația și echilibrul emoțional.
    </p>
    <p>
      Prin acest exercițiu, înveți să îți antrenezi atenția către o sursă reală de susținere, iar corpul tău învață să
      recunoască și să păstreze această stare, chiar și în zilele mai agitate. Practicată constant, această formă de
      recunoștință ajută la reducerea stresului, crește reziliența emoțională și susține o relație mai blândă cu tine și
      cu ceilalți.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p><strong>Today’s theme:</strong></p>
    <p>
      Today, choose one concrete aspect of your life for which you feel authentic gratitude. It can be an important
      person, a pet, a relationship, support you received at the right time, or any presence that brought you safety,
      joy, or comfort. Don’t change your choice throughout the day. Keep the same anchor.
    </p>
    <p>
      In the evening, before sleep, listen to today’s audio recording and let your body recognize and integrate this
      state of gratitude exactly as it appears. This recording is an emotional regulation exercise. Gratitude felt in
      the body helps your nervous system come out of alert, reduces inner tension, and creates a sense of safety that
      supports clarity, motivation, and emotional balance.
    </p>
    <p>
      Through this practice, you train your attention toward a real source of support, and your body learns to
      recognize and hold this state—even on more hectic days. Practiced consistently, this form of gratitude helps
      reduce stress, increases emotional resilience, and supports a kinder relationship with yourself and others.
    </p>
  </>
);

const practice: Practice = {
  id: "Heartful-Gratitude-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Recunoștință", en: "Day 1 – Gratitude" },
  name: { ro: "Recunoștință", en: "Gratitude" },
  intro: {
    ro: "Alege un reper concret și lasă recunoștința să se așeze în corp.",
    en: "Choose a concrete anchor and let gratitude land in the body.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/heartful-gratitude.mp3", en: "audioFilesEnAi/heartful-gratitude-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

