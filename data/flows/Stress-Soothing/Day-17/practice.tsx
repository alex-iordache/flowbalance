import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Umorul sporește creativitatea și este unul dintre instrumentele cheie folosite pentru combaterea stresului. Nu
      încetăm să mai râdem pentru că îmbătrânim. Îmbătrânim pentru că am încetat să mai râdem.
    </p>
    <p>
      Pentru ziua aceasta, te rog, să te uiți la o comedie, și de azi înainte, introdu în agenda ta un moment de cel
      puțin 30 minute care să îți aducă râsul în viața ta (poți să citești bancuri, poți să te uiți la show-uri de
      comedie, la farse filmate, etc.)
    </p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Humour boosts creativity and is one of the key tools for coping with stress. We don’t stop laughing because we
      grow old. We grow old because we stopped laughing.
    </p>
    <p>
      Today please watch a comedy, and from now on, add to your schedule at least 30 minutes that bring laughter into
      your life (you can read jokes, watch comedy shows, funny clips, etc.)
    </p>
    <p>In the evening, listen to the audio.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-17',
  position: 17,
  title: { ro: 'Ziua 17', en: 'Day 17' },
  name: { ro: 'Ziua 17', en: 'Day 17' },
  intro: {
    ro: 'Umorul și râsul: cel puțin 30 minute care îți aduc râsul.',
    en: 'Humour and laughter: at least 30 minutes that bring laughter.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/relaxare-prin-respiratie.mp3', en: 'audioFilesEnAi/relaxare-prin-respiratie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
