import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>Dormi mai puțin de 7 ore pe noapte? Iată câteva statistici interesante legate de somn şi calitatea acestuia:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        Dacă şofezi după ce ai dormit mai puţin de 4 ore, probabilitatea de a fi implicat într-un accident de maşină
        creşte cu 11.5 ori.
      </li>
      <li>Oamenii au nevoie de mai mult de 7 ore de somn pentru a-şi menţine nivelul performanţelor cognitive.</li>
      <li>
        Mai mulţi cercetători au demonstrat cum somnul vindecă sau ameliorează boli psihice precum depresia, tulburarea
        bipolară, anxietatea.
      </li>
      <li>
        Lipsa somnului atacă sistemul creator de amintiri din creier, împiedicând formarea amintirilor cu amprente
        durabile.
      </li>
      <li>
        Lipsa somnului afectează concentrarea atenţiei, ceea ce poate duce la accidente grave. Într-un experiment,
        oamenii care au dormit 6 ore/noapte timp de 10 zile au ajuns la performanţe la fel de slabe ca cei care nu
        dormiseră 24 de ore. Problema şi mai mare este că îşi subestimau cât de mult le era afectată performanţa.
      </li>
      <li>Lipsa somnului influențează agresivitatea, fenomenul de bullying şi probleme comportamentale la copii.</li>
      <li>
        O durată a somnului din ce în ce mai mică s-a asociat cu o creştere de 45% a riscului de îmbolnăvire/deces din
        cauza unei boli coronariene.
      </li>
      <li>
        Lipsa somnului duce la creşterea unui hormon care ne semnalizează satisfacerea nevoii de hrană, devenind astfel o
        cale spre îngrăşare.
      </li>
      <li>Lipsa somnului scade sistemul imunitar.</li>
      <li>
        Adenozina este un neurotransmiţător care trimite semnalul nevoii de a dormi. Pe timpul somnului, creierului îi ia
        aproximativ 8 ore ca să îi scadă complet concentrarea. De aici cerinţa de a dormi 8 ore/noapte.
      </li>
    </ul>

    <p className="mt-4"><strong>Exercițiu:</strong></p>
    <p>
      Când nu poți adormi, stai întins/ă pe pat, cu fața în sus, cu picioarele și brațele ușor îndepărtate, şi începe să
      numeri în gând de la 100 la 1. Privirea o ții cam la 20 de grade în sus față de poziția în care privești de obicei.
      Ochii îi menții închiși. Dacă apar gânduri, le spui că le vei relua a doua zi (dacă este cazul) și revii la numărat
      rar.
    </p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Îți place să ai lumină în spaţiul în care dormi, folosești dispozitive luminoase înainte de culcare (tabletă,
      telefon etc.)? Dacă da, încearcă timp de 5 zile să nu o mai faci cu cel puțin o oră înainte de somn, iar apoi
      verifică calitatea somnului.
    </p>

    <p className="mt-4">
      Seara, înainte de culcare, ascultă această înregistrare audio, care te va ajuta să te deconectezi de la grijile
      zilnice şi să intri într-o stare plăcută de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>Do you sleep less than 7 hours per night? Here are some interesting facts about sleep and sleep quality:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        If you drive after sleeping less than 4 hours, the probability of being involved in a car accident increases by
        11.5x.
      </li>
      <li>People need more than 7 hours of sleep to maintain cognitive performance.</li>
      <li>Researchers have shown that sleep can heal or improve mental health conditions such as depression, bipolar disorder, and anxiety.</li>
      <li>Sleep loss impacts the brain’s memory-making system, preventing durable memories from forming.</li>
      <li>
        Sleep loss affects attention and concentration, which can lead to serious accidents. In one experiment, people
        who slept 6 hours/night for 10 days performed as poorly as those who stayed awake for 24 hours—and they
        underestimated how impaired they were.
      </li>
      <li>Sleep loss can influence aggression, bullying, and behavioral problems in children.</li>
      <li>Shorter sleep duration has been associated with a 45% increase in risk of illness/death from coronary heart disease.</li>
      <li>Lack of sleep increases a hormone that signals hunger, becoming a pathway to weight gain.</li>
      <li>Sleep loss weakens the immune system.</li>
      <li>
        Adenosine is a neurotransmitter that signals the need for sleep. During sleep, it takes the brain about 8 hours
        to fully reduce its concentration—hence the common need for around 8 hours per night.
      </li>
    </ul>

    <p className="mt-4"><strong>Exercise:</strong></p>
    <p>
      When you can’t fall asleep, lie on your back in bed with your arms and legs slightly apart. Begin counting silently
      from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual resting gaze, with eyes closed. If
      thoughts appear, tell yourself you’ll revisit them tomorrow (if needed) and return to slow counting.
    </p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you like having light in your bedroom or using luminous devices before bed (tablet, phone, etc.)? If yes, try for
      5 days to avoid this at least one hour before sleep, then check how your sleep quality changes.
    </p>

    <p className="mt-4">
      In the evening, before bed, listen to today’s audio recording. It will help you disconnect from daily worries and
      enter a pleasant state of relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-03",
  position: 3,
  title: { ro: "Ziua 3", en: "Day 3" },
  name: { ro: "Ziua 3", en: "Day 3" },
  intro: {
    ro: "Înțelege impactul somnului și folosește un exercițiu simplu când nu poți adormi.",
    en: "Understand sleep’s impact and use a simple exercise when you can’t fall asleep.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/cum-trec-peste-insomnie.mp3", en: "audioFilesEnAi/cum-trec-peste-insomnie-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

