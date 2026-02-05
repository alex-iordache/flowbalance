import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Această zi este dedicată identificării acelor obstacole din viața ta, care te împiedică să mergi înainte și să
      lucrezi pentru visul tău.
    </p>
    <p>
      <strong>Pentru ziua aceasta îți propun următorul exercițiu, pe care să îl practici înainte de culcare.</strong>
    </p>
    <p>
      <strong>Pasul 1.</strong> În timp ce stai comod și citești acest text, inspiră adânc, inhalând aerul până în abdomen.
      Simte cum se extinde pieptul, cum se mărește cutia toracică, iar abdomenul este împins în jos. Concentrează-te asupra
      acestor senzații interioare.
    </p>
    <p>
      <strong>Pasul 2.</strong> Respiră de încă 2 ori în modul explicat la punctul 1. Când inspiri, mărește-te și
      extinde-te; când expiri, eliberează-te de tensiune și relaxează-te.
    </p>
    <p>
      <strong>Pasul 3.</strong> Ce constați? Confort sau disconfort? Ușurință sau dificultate? Împotrivire? Plictiseală?
      Relaxare? Nu trebuie să schimbi nimic; este suficient să observi ceea ce se petrece chiar în momentul în care citești
      aceste cuvinte.
    </p>
    <p>
      <strong>Pasul 4.</strong> La următorul expir, ține-ți respirația o fracțiune de secundă. Îți simți bătaia inimii?
      Unde anume? În câte locuri? În ce loc zvâcnește? În ce loc abia murmură? Cum sunt bătaia inimii, pulsul, ritmul,
      senzația pe care o simți? O poți auzi? Continuă să respiri. Ce senzații și emoții iau naștere când îți observi bătaia
      inimii?
    </p>
    <p>
      <strong>Pasul 5.</strong> Concentrează-te asupra locului în care te-ai așezat. Cum percep mușchii tăi locul pe care
      stai? Unde se simte presiune în fese și picioare? Cum îți simți coloana vertebrală? Nu este nevoie să schimbi
      nimic: doar fii atent/ă.
    </p>
    <p>
      <strong>Pasul 6.</strong> Ce senzații simte pielea ta? Simte vreo adiere? O simți rece, caldă, umedă?
    </p>
    <p>
      <strong>Pasul 7.</strong> Ce auzi în acest moment? Ce gânduri îți trec prin minte? Simți vreo constrângere?
    </p>
    <p>
      <strong>Pasul 8.</strong> Poți merge chiar mai profund?
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situațiile stresante din viața ta și să
      îți recapeți starea de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      This day is about identifying the obstacles in your life that keep you from moving forward and working toward your
      dream.
    </p>
    <p>
      <strong>For today we suggest the following exercise, to practice before bed.</strong>
    </p>
    <p>
      <strong>Step 1.</strong> While sitting comfortably and reading this, breathe in deeply, drawing air into your
      belly. Feel your chest expand, your rib cage widen, your abdomen move down. Focus on these inner sensations.
    </p>
    <p>
      <strong>Step 2.</strong> Breathe like this 2 more times. When you inhale, expand; when you exhale, release tension
      and relax.
    </p>
    <p>
      <strong>Step 3.</strong> What do you notice? Comfort or discomfort? Ease or difficulty? Resistance? Boredom?
      Relaxation? You don’t need to change anything—just notice what’s happening as you read these words.
    </p>
    <p>
      <strong>Step 4.</strong> On the next exhale, hold your breath for a fraction of a second. Can you feel your
      heartbeat? Where? In how many places? Where is it strong? Where is it faint? What is the beat, the pulse, the
      rhythm, the sensation? Can you hear it? Keep breathing. What sensations and emotions arise when you notice your
      heartbeat?
    </p>
    <p>
      <strong>Step 5.</strong> Focus on where you’re sitting. How do your muscles feel the surface? Where do you feel
      pressure in your hips and legs? How does your spine feel? No need to change anything—just pay attention.
    </p>
    <p>
      <strong>Step 6.</strong> What does your skin feel? Any breeze? Cool, warm, damp?
    </p>
    <p>
      <strong>Step 7.</strong> What do you hear right now? What thoughts pass through your mind? Any tightness?
    </p>
    <p>
      <strong>Step 8.</strong> Can you go even deeper?
    </p>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-08',
  position: 8,
  title: { ro: 'Ziua 8', en: 'Day 8' },
  name: { ro: 'Ziua 8', en: 'Day 8' },
  intro: {
    ro: 'Exercițiu de conștientizare în 8 pași înainte de culcare; audio relaxare.',
    en: '8-step awareness exercise before bed; relaxation audio.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/furtuna.mp3', en: 'audioFiles/furtuna.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
