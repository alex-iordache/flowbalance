import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Într-un final, privește înapoi și revezi cele mai bune obiceiuri deprinse care vor fi temelia ta, atunci când simți
      că stresul sau grijile te acaparează. Continuă să le exersezi zilnic, pentru că orice mic câștig a fost la un
      moment dat, un obiectiv greu de atins.
    </p>
    <p>La finalul programului, te rog să te uiți la agenda ta zilnică și să remarci dacă ai introdus în viața ta zilnică:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>un moment special de trezire care te ajută să te setezi mental pentru o zi bună pentru tine.</li>
      <li>dacă ți-ai pus pauze de relaxare, fără să faci nimic.</li>
      <li>dacă ai făcut mișcare cel puțin 30 minute.</li>
      <li>dacă ai un moment de cel puțin 30 minute în care să râzi.</li>
      <li>dacă ți-ai ascultat corpul și ai simțit tensiunea.</li>
      <li>dacă ți-ai propus să faci ceva bun pentru corpul tău.</li>
      <li>dacă ți-ai propus să te relaxezi înainte de culcare.</li>
    </ul>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situațiile stresante din viața ta și să
      îți recapeți stare de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Finally, look back and review the best habits you’ve built—they will be your foundation when stress or worries take
      over. Keep practicing them daily, because every small win was once a hard goal to reach.
    </p>
    <p>At the end of the program, please look at your daily schedule and notice whether you’ve added to your daily life:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>a special wake-up moment that helps you set yourself mentally for a good day.</li>
      <li>relaxation breaks when you do nothing.</li>
      <li>at least 30 minutes of movement.</li>
      <li>at least 30 minutes of laughter.</li>
      <li>listening to your body and noticing tension.</li>
      <li>doing something good for your body.</li>
      <li>relaxing before bed.</li>
    </ul>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-30',
  position: 30,
  title: { ro: 'Ziua 30', en: 'Day 30' },
  name: { ro: 'Ziua 30', en: 'Day 30' },
  intro: {
    ro: 'Recapitulare: obiceiurile care sunt temelia ta de calm.',
    en: 'Recap: the habits that are your foundation for calm.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFilesEnAi/deconectare-relaxare-vindecare-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
