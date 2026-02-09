import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Într-un final, privește înapoi și revezi cele mai bune obiceiuri deprinse care vor fi temelia ta, atunci când simți
      că stresul, grijile sau anxietatea te acaparează. Continuă să le exersezi zilnic, pentru că orice mic câștig a fost
      la un moment dat, un obiectiv greu de atins.
    </p>
    <p>
      <strong>La finalul programului, te rog să te uiți în agenda ta și să remarci dacă ai introdus în viața ta zilnică:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>pauze de relaxare, fără să faci nimic.</li>
      <li>un moment de cel puțin 30 minute în care să râzi.</li>
      <li>dacă ți-ai ascultat corpul și ai simțit tensiunea.</li>
      <li>dacă ți-ai propus să faci ceva bun pentru corpul tău.</li>
      <li>dacă ți-ai propus să te relaxezi înainte de culcare.</li>
    </ul>
    <p>Ascultă această înregistrare audio la început de zi.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Finally, look back and review the best habits you’ve built—they will be your foundation when stress, worries, or
      anxiety take over. Keep practicing them daily, because every small win was once a hard goal to reach.
    </p>
    <p>
      <strong>At the end of the program, please look at your schedule and notice whether you’ve added to your daily life:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>relaxation breaks when you do nothing.</li>
      <li>at least 30 minutes of laughter.</li>
      <li>listening to your body and noticing tension.</li>
      <li>doing something good for your body.</li>
      <li>relaxing before bed.</li>
    </ul>
    <p>Listen to this audio at the start of the day.</p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Recapitulare: obiceiurile care sunt temelia ta; audio la început de zi.',
    en: 'Recap: the habits that are your foundation; audio at the start of the day.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFilesEnAi/incepe-ziua-cu-bucurie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
