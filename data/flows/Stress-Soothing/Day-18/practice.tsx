import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      De-a lungul unei zile, diverși factori îți pot întinde la maxim nervii și îți pot afecta starea de calm. Învață cum
      îți poți controla reacțiile astfel încât să nu lași stresul să îți acapareze viața.
    </p>
    <p>Pentru ziua aceasta fă o listă cu ceea ce te ajută să te calmezi după ce te enervezi. În cadrul înregistrării de mai jos vei învăța o nouă metodă.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să te relaxezi.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Throughout the day, various factors can stretch your nerves to the limit and affect your calm. Learn how to control
      your reactions so that stress doesn’t take over your life.
    </p>
    <p>Today make a list of what helps you calm down after you get upset. In the recording below you’ll learn a new method.</p>
    <p>Listen to this audio; it will help you see that situation from another angle and relax.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-18',
  position: 18,
  title: { ro: 'Ziua 18', en: 'Day 18' },
  name: { ro: 'Ziua 18', en: 'Day 18' },
  intro: {
    ro: 'Ce te calmează după ce te enervezi; o nouă metodă de calmare.',
    en: 'What calms you after you get upset; a new calming method.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/cum-te-calmezi.mp3', en: 'audioFilesEnAi/cum-te-calmezi-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
