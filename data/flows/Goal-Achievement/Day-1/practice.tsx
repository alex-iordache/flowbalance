import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Astăzi este prima zi a călătoriei tale, un prim pas spre drumul către succesul personal, în care vei obţine tăria necesară de a face ceea ce doreşti pentru tine şi pentru viaţa ta.</p>
    <p>Pentru ziua aceasta ai de făcut o listă cu toate rolurile din viaţa ta (de exemplu, părinte, copil, iubit/ă, prieten/ă, angajat etc.). După ce ai făcut această listă, te invit să scrii cât la % din timpul tău îl petreci în fiecare rol în parte. Apoi, scrie cât timp ți-ai dori de fapt să petreci.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să analizezi modul în care gestionezi viața ta, modul în care împaci timpul de la serviciu cu cel din afara orelor de program.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today is the first day of your journey—your first step toward personal success, where you’ll build the strength to
      do what you want for yourself and your life.
    </p>
    <p>
      For today, make a list of all the roles you have in your life (for example: parent, child, partner, friend,
      employee, etc.). After you write the list, note what percentage of your time you spend in each role. Then write
      how much time you would actually like to spend.
    </p>
    <p>
      Listen to this audio recording—it will help you analyse how you manage your life and how you balance work time
      with time outside your working hours.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-01',
  position: 1,
  title: { ro: 'Ziua 1', en: 'Day 1' },
  name: { ro: 'Ziua 1', en: 'Day 1' },
  intro: {
    ro: 'Astăzi este prima zi a călătoriei tale, un prim pas spre drumul către succesul personal, în care vei obţine…',
    en: 'Today is your first step toward personal success.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/VECHI-analiza-propriei-vieti.mp3', en: 'audioFilesEnAi/analiza-vietii-personale-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
