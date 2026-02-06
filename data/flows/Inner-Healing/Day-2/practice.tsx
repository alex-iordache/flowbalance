import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru a progresa în orice aspect al vieţii tale este nevoie ca, uneori, să te opreşti şi să analizezi atent modul în
      care gestionezi situaţiile stresante din viaţa ta. Eşti conştient de reacţiile fizice aduse de fiecare situaţie
      stresantă cu care te confrunţi?
    </p>
    <p>
      Pentru ziua aceasta, fă o listă cu toate problemele fizice pe care le întâmpini atunci când ești stresat/ă. În dreptul
      fiecărei dureri ai putea trece care sunt emoțiile puternice care ți le declanșează: frică, nervi etc.
    </p>
    <p>
      De azi înainte, în fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la
      toaletă, o poți face și apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus
      față de poziția în care privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în
      care corpul tău era plin de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio seara, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi
      să îţi recapeţi starea de relaxare. Dacă adormi înainte să se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      To make progress in any area of your life, sometimes you need to pause and carefully analyse how you handle
      stressful situations. Are you aware of the physical reactions that each stressful situation brings up?
    </p>
    <p>
      For today, make a list of the physical problems you experience when you feel stressed. Next to each pain or
      symptom, note what strong emotions might trigger it (fear, anger, tension, etc.).
    </p>
    <p>
      From today on, every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can
      do that and then come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared
      to your usual position, with your eyes closed. After you finish counting, remember a time when your body felt full
      of vitality and health, and visualise yourself walking as you did then.
    </p>
    <p>
      In the evening, listen to this audio recording—it will help you disconnect from stressful situations in your life
      and regain a state of relaxation. If you fall asleep before the recording ends, that’s perfectly fine.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'Observă reacțiile fizice la stres.',
    en: 'Notice your body’s stress reactions.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/deconectare-relaxare-vindecare.mp3', en: 'audioFiles/deconectare-relaxare-vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

