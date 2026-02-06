import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Într-un final, priveşte înapoi şi revezi cele mai bune obiceiuri deprinse care vor fi temelia ta, atunci când simţi că
      stresul sau grijile te acaparează. Continuă să le exersezi zilnic, pentru că orice mic câştig a fost la un moment dat,
      un obiectiv greu de atins.
    </p>
    <p>La finalul programului, te rog să te uiți la agenda ta zilnică și să remarci dacă ai introdus în viața ta zilnică:</p>
    <p>– dacă ți-ai pus pauze de relaxare, fără să faci nimic.</p>
    <p>– dacă ai un moment de cel puțin 30 minute în care să râzi.</p>
    <p>– dacă ți-ai ascultat corpul și ai simțit tensiunea.</p>
    <p>– dacă ți-ai propus să faci ceva bun pentru corpul tău.</p>
    <p>– dacă ți-ai propus să te relaxezi înainte de culcare.</p>
    <p>
      De acum înainte în fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă,
      o poți face și apoi te întorci în pat), numeri în gând de la 50 la 1. Privirea o ții cam la 20 grade în sus față de
      poziția în care privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care
      corpul tău era plin de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi să îţi
      recapeţi starea de relaxare. Dacă adormi înainte să se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Finally, look back and review the best habits you’ve learned—these will be your foundation when you feel stress or
      worries taking over. Keep practising them daily, because every small win was once a difficult goal.
    </p>
    <p>At the end of the program, look at your daily schedule and notice whether you introduced:</p>
    <p>– relaxation breaks where you do nothing</p>
    <p>– at least 30 minutes where you laugh</p>
    <p>– listening to your body and noticing tension</p>
    <p>– doing something good for your body</p>
    <p>– relaxing before bedtime</p>
    <p>
      From now on, every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do
      that and then come back)—count in your mind from 50 down to 1. Keep your gaze about 20 degrees upward compared to
      your usual position, with your eyes closed. After you finish counting, remember a time when your body felt full of
      vitality and health, and visualise yourself walking as you did then.
    </p>
    <p>
      Listen to this audio recording—it will help you disconnect from stressful situations in your life and regain a
      state of relaxation. If you fall asleep before the recording ends, that’s perfectly fine.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Integrare și ritualuri.',
    en: 'Integration and rituals.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/deconectare-relaxare-vindecare.mp3', en: 'audioFiles/deconectare-relaxare-vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

