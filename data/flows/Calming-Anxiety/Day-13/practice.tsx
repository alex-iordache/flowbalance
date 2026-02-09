import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Umorul sporește creativitatea și este unul dintre instrumentele-cheie folosite pentru combaterea stresului, a
      anxietății, a depresiei. Nu încetăm să mai râdem pentru că îmbătrânim. Îmbătrânim pentru că am încetat să mai
      râdem.
    </p>
    <p>
      <strong>Pentru ziua aceasta uită-te în oglindă și strâmbă-te cât mai caraghios, până începi să râzi.</strong>
    </p>
    <p>Ascultă această înregistrare audio la început de zi.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Humour boosts creativity and is one of the key tools for coping with stress, anxiety, and depression. We don’t stop
      laughing because we grow old. We grow old because we stopped laughing.
    </p>
    <p>
      <strong>For today, look in the mirror and make the silliest faces until you start laughing.</strong>
    </p>
    <p>Listen to this audio at the start of the day.</p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Strâmbe-te în oglindă până râzi; audio la început de zi.',
    en: 'Make silly faces in the mirror until you laugh; audio at the start of the day.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFilesEnAi/incepe-ziua-cu-bucurie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
