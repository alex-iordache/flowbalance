import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      A învăţa recunoştinţa e cel mai bun lucru pentru calitatea vieţii tale, în primul rand, pentru că nu mai trăieşti în ideea
      de a umple un gol în existenţa ta, ci din conştiinţa abundenţei care va atrage şi mai multe lucruri bune.
    </p>
    <p>Astăzi îți propun următorul exercițiu:</p>
    <p>
      În timp ce stai comod şi citeşti acest text, inspiră adânc, inhalând aerul până în abdomen. Simte cum se extinde pieptul,
      cum se măreşte cutia toracică, iar abdomenul este împins în jos. Concentrează-te asupra acestor senzaţii interioare.
    </p>
    <p>
      Respiră de încă 2 ori în modul explicat la punctul 1. Când inspiri, măreşte-te şi extinde-te; când expiri, eliberează-te de
      tensiune şi relaxează-te.
    </p>
    <p>
      Ce constaţi? Confort sau disconfort? Uşurinţă sau dificultate? Împotrivire? Plictiseală? Relaxare? Nu trebuie să schimbi
      nimic; este suficient să observi ceea ce se petrece chiar în momentul în care citeşti aceste cuvinte.
    </p>
    <p>
      La următorul expir, ţineţi respiraţia o fracţiune de secundă. Îţi simţi bătaia inimii? Unde anume? În câte locuri? În ce loc
      zvâcneşte? În ce loc abia murmură? Cum sunt bătaia inimii, pulsul, ritmul, senzaţia pe care o simţi? O poţi auzi? Continuă să
      respiri. Ce senzaţii şi emoţii iau naştere când îţi observi bătaia inimii?
    </p>
    <p>
      Concentrează-te asupra locului în care te-ai aşezat. Cum percep muşchii tăi locul pe care stai? Unde se simte presiune în fese şi
      picioare? Cum îţi simţi coloana vertebrală? Nu este nevoie să schimbi nimic: doar fii atent/ă.
    </p>
    <p>Ce senzaţii simte pielea ta? Simte vreo adiere? O simţi rece, caldă, umedă?</p>
    <p>Ce auzi în acest moment? Ce gânduri îţi trec prin minte? Simţi vreo constrângere?</p>
    <p>Poţi merge chiar mai profund?</p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și apoi te întorci
      în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care privești de obicei. Ochii îi menții
      închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio DOAR DACĂ AI O PROBLEMĂ FIZICĂ care are nevoie de sistem imunitar mai bun. Te va ajuta să identifici problemele
      la nivel fizic, cât şi cauzele care le-a produs de la nivel emoţional.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Learning gratitude is one of the best things you can do for your quality of life, first of all because you no
      longer live from the idea of “filling a gap”, but from an awareness of abundance—which attracts even more good
      things.
    </p>
    <p>Today I propose the following exercise:</p>
    <p>
      As you sit comfortably and read this text, take a deep breath, inhaling air down into the abdomen. Feel your chest
      expand, your ribcage widen, and the abdomen move downward. Focus on these inner sensations.
    </p>
    <p>
      Breathe two more times as described above. On the inhale, expand; on the exhale, release tension and relax.
    </p>
    <p>
      What do you notice—comfort or discomfort? Ease or difficulty? Resistance? Boredom? Relaxation? You don’t need to
      change anything; it’s enough to notice what’s happening in the moment you read these words.
    </p>
    <p>
      On the next exhale, hold your breath for a fraction of a second. Can you feel your heartbeat? Where exactly? In
      how many places? Where is it strong, and where is it barely a whisper? What is the rhythm and sensation like? Can
      you hear it? Continue breathing. What sensations and emotions arise as you observe your heartbeat?
    </p>
    <p>
      Bring attention to the place where you’re sitting. How do your muscles perceive the support beneath you? Where do
      you feel pressure in your glutes and legs? How does your spine feel? There’s no need to change anything—just pay
      attention.
    </p>
    <p>What does your skin feel? Do you feel any breeze? Does it feel cool, warm, humid?</p>
    <p>What do you hear right now? What thoughts pass through your mind? Do you feel any constriction?</p>
    <p>Can you go even deeper?</p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      Listen to this audio recording ONLY IF you have a physical issue that needs a stronger immune system. It will help
      you identify physical problems and the emotional causes behind them.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Recunoștință și observare profundă.',
    en: 'Gratitude + deeper noticing.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

