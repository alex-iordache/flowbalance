import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Atunci când ai o noapte mai agitată în care nu poți dormi bine sau nu poți adormi ușor, știi că următoarea zi îți va
      fi foarte greu să îți păstrezi calmul și concentrarea pe lucrurile care contează cu adevărat.
    </p>
    <p>Pentru ziua aceasta fă o listă cu ceea ce te ajută să ai un somn odihnitor. Înainte de culcare, te rog, să asculți din nou înregistrarea de mai jos.</p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să observi tensiunile înmagazinate la nivelul corpului și să
      relaxezi zonele tensionate.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      When you have a restless night and can’t sleep well or fall asleep easily, you know the next day it will be
      harder to keep your calm and focus on what really matters.
    </p>
    <p>Today make a list of what helps you get restful sleep. Before bed, please listen again to the recording below.</p>
    <p>
      Listen to this audio; it will help you notice stored tension in your body and relax tense areas.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-22',
  position: 22,
  title: { ro: 'Ziua 22', en: 'Day 22' },
  name: { ro: 'Ziua 22', en: 'Day 22' },
  intro: {
    ro: 'Ce te ajută la somn odihnitor; body scan înainte de culcare.',
    en: 'What helps you sleep well; body scan before bed.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFiles/body-scan.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
