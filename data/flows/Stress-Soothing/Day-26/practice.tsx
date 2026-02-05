import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Antrenează-ți mintea să vadă bunătatea și frumosul în jur. A fi pozitiv este o alegere. Fericirea din viața ta
      depinde de calitatea gândurilor tale.
    </p>
    <p>
      Pentru ziua aceasta stabilește un motto personal pentru a trece peste perioadele dificile din viața ta. De exemplu:
      Totul este trecător. Orice s-ar întâmpla, am toate resursele necesare să depășesc etc. Înainte de culcare te invit
      să asculți înregistrarea de mai jos.
    </p>
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
      Train your mind to see goodness and beauty around you. Being positive is a choice. The happiness in your life
      depends on the quality of your thoughts.
    </p>
    <p>
      Today choose a personal motto to help you through difficult times. For example: This too shall pass. Whatever
      happens, I have the resources I need to get through it. Before bed we invite you to listen to the recording below.
    </p>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-26',
  position: 26,
  title: { ro: 'Ziua 26', en: 'Day 26' },
  name: { ro: 'Ziua 26', en: 'Day 26' },
  intro: {
    ro: 'Motto personal pentru perioade dificile; relaxare seara.',
    en: 'Personal motto for difficult times; evening relaxation.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFiles/deconectare-relaxare-vindecare.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
