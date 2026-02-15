import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Pentru a progresa în orice aspect al vieţii tale este nevoie, uneori, să te opreşti şi să analizezi atent modul în
      care îţi desfăşori întreaga zi. Devenind conştient de obiceiurile zilnice, poţi alege să reacţionezi şi să schimbi
      ceea ce nu este bun pentru tine.
    </p>

    <p><strong>Exercițiu:</strong></p>
    <p>
      Te invit ca, de azi înainte, să îți stabilești aceeași oră de culcare și de trezire, de care să te ții în
      majoritatea timpului. Atenție: dacă ora de culcare este mai devreme decât cea cu care erai obișnuit/ă, atunci
      trecerea trebuie făcută gradual, cu câte 15 minute până ajungi la ora dorită. Altfel, există probabilitatea destul
      de mare ca şi corpul tău să nu fie pregătit să facă trecerea bruscă, acesta având nevoie de timp de readaptare.
    </p>
    <p>
      Te rog să îți stabilești un ritual înainte de culcare care simți că te poate ajuta (ex.: o baie caldă în cadă, o
      muzică care te destinde, o conversație faină, citit etc.).
    </p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Ai afecţiuni medicale care determină dureri cronice precum artrita, neuropatiile sau traumatismele sau care
      afectează respiraţia precum astmul bronşic, bolile pulmonare obstructive cronice sau insuficienţa cardiacă
      congestivă (afectarea capacităţii inimii de a pompa sângele în organism)? Dacă da, atunci este o probabilitate mare
      ca acestea să îți influențeze calitatea somnului și atunci trebuie să stai de vorbă cu medicul tău să vezi ce
      soluții există.
    </p>

    <p className="mt-4">
      Seara, înainte de culcare, ascultă această înregistrare audio, care te va ajuta să te conectezi la propriul corp şi
      să observi tensiunile înmagazinate la nivelul corpului, relaxând zonele încordate.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      To make progress in any area of your life, sometimes you need to pause and carefully look at how your day actually
      unfolds. By becoming aware of your daily habits, you can choose to respond differently and change what isn’t good
      for you.
    </p>

    <p><strong>Exercise:</strong></p>
    <p>
      Starting today, set a consistent bedtime and wake-up time and stick to them most of the time. Important: if your
      target bedtime is earlier than what you’re used to, shift gradually—by 15 minutes at a time—until you reach the
      desired hour. Otherwise, there’s a good chance your body won’t be ready for a sudden change and will need time to
      adapt.
    </p>
    <p>
      Please create a pre-sleep ritual that feels supportive for you (e.g., a warm bath, relaxing music, a pleasant
      conversation, reading, etc.).
    </p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you have medical conditions that cause chronic pain (such as arthritis, neuropathy, or injuries) or that affect
      breathing (such as asthma, chronic obstructive pulmonary disease, or congestive heart failure)? If yes, there’s a
      high chance they influence your sleep quality—so it’s important to talk to your doctor about possible solutions.
    </p>

    <p className="mt-4">
      In the evening, before bed, listen to today’s audio recording. It will help you reconnect with your body and
      notice stored tension, relaxing the areas that are holding tightness.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-02",
  position: 2,
  title: { ro: "Ziua 2", en: "Day 2" },
  name: { ro: "Ziua 2", en: "Day 2" },
  intro: {
    ro: "Stabilește ore constante de culcare și trezire și creează un ritual de seară.",
    en: "Set consistent sleep hours and build an evening ritual.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/body-scan.mp3", en: "audioFilesEnAi/body-scan-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

