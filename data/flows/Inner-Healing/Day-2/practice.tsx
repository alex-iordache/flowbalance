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

const practice: Practice = {
  id: 'Inner-Healing-Day-02',
  position: 2,
  title: { ro: 'Ziua 2', en: 'Day 2' },
  name: { ro: 'Ziua 2', en: 'Day 2' },
  intro: {
    ro: 'Observă reacțiile fizice la stres.',
    en: 'Notice your body’s stress reactions.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/deconectare-relaxare-vindecare.mp3', en: 'audioFiles/deconectare-relaxare-vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

