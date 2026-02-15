import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Așa cum ai văzut deja, este foarte important ca în fiecare noapte să te bucuri de un somn odihnitor. Lasă
      problemele de la job acolo unde le este locul și bucură-te în fiecare seară de un moment de relaxare.
    </p>
    <p>
      Pentru ziua aceasta pune în agenda ta tot ceea ce te face să te deconectezi și te ajută să ai un somn profund. Pe
      timpul somnului, ne recuperăm fizic și emoțional, de aceea este foarte important să dormim minim 7h. Înainte de
      culcare, te rog să asculți din nou înregistrarea de mai jos.
    </p>
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
      As you’ve already seen, it’s very important to get restful sleep every night. Leave work issues where they
      belong and enjoy a moment of relaxation each evening.
    </p>
    <p>
      Today put in your schedule everything that helps you disconnect and get deep sleep. During sleep we recover
      physically and emotionally, so it’s very important to sleep at least 7 hours. Before bed, please listen again to
      the recording below.
    </p>
    <p>
      Listen to this audio; it will help you notice stored tension in your body and relax tense areas.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-23',
  position: 23,
  title: { ro: 'Ziua 23', en: 'Day 23' },
  name: { ro: 'Ziua 23', en: 'Day 23' },
  intro: {
    ro: 'Ritual de deconectare și somn (min. 7h); body scan seara.',
    en: 'Disconnect and sleep ritual (min. 7h); body scan in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFilesEnAi/body-scan-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
