import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>Astăzi, îți propun următorul exercițiu:</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>
        În timp ce stai comod şi citeşti acest text, inspiră adânc, inhalând aerul până în abdomen. Simte cum se extinde
        pieptul, cum se măreşte cutia toracică, iar abdomenul este împins în jos. Concentrează-te asupra acestor senzaţii
        interioare.
      </li>
      <li>
        Respiră de încă 2 ori în modul explicat la punctul 1. Când inspiri, măreşte-te şi extinde-te; când expiri,
        eliberează-te de tensiune şi relaxează-te.
      </li>
      <li>
        Ce constaţi? Confort sau disconfort? Uşurinţă sau dificultate? Împotrivire? Plictiseală? Relaxare? Nu trebuie să
        schimbi nimic; este suficient să observi ceea ce se petrece chiar în momentul în care citeşti aceste cuvinte.
      </li>
      <li>
        La următorul expir, ţineţi respiraţia o fracţiune de secundă. Îţi simţi bătaia inimii? Unde anume? În câte locuri?
        În ce loc zvâcneşte? În ce loc abia murmură? Cum este bătaia inimii, pulsul, ritmul, senzaţia pe care o simţi? O
        poţi auzi? Continuă să respiri. Ce senzaţii şi emoţii iau naştere când îţi observi bătaia inimii?
      </li>
      <li>
        Concentrează-te asupra locului în care te-ai aşezat. Cum percep muşchii tăi locul pe care stai? Unde se simte
        presiune în fese şi picioare? Cum îţi simţi coloana vertebrală? Nu este nevoie să schimbi nimic: doar fii atent/ă.
      </li>
      <li>Ce senzaţii simte pielea ta? Simte vreo adiere? O simţi rece, caldă, umedă?</li>
      <li>Ce auzi în acest moment? Ce gânduri îţi trec prin minte? Simţi vreo constrângere?</li>
      <li>Poţi merge chiar mai profund?</li>
    </ol>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te descarci de bagajele emoţionale pe care le porţi cu tine
      în fiecare zi.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>Today, I invite you to try the following exercise:</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>
        As you sit comfortably and read this text, take a deep breath, inhaling all the way into the belly. Feel how the
        chest expands, how the ribcage widens, and how the abdomen moves downward. Focus on these inner sensations.
      </li>
      <li>
        Breathe two more times in the same way. As you inhale, expand; as you exhale, release tension and relax.
      </li>
      <li>
        What do you notice? Comfort or discomfort? Ease or difficulty? Resistance? Boredom? Relaxation? You don’t need to
        change anything—just notice what is happening in the moment you read these words.
      </li>
      <li>
        On the next exhale, hold your breath for a brief moment. Can you feel your heartbeat? Where exactly? In how many
        places? Where does it pulse strongly, and where is it subtle? What is the rhythm like? Can you hear it? Continue
        breathing. What sensations and emotions arise as you observe your heartbeat?
      </li>
      <li>
        Bring attention to the place where you’re seated. How do your muscles perceive the surface supporting you? Where
        do you feel pressure in the hips and legs? How do you sense your spine? No need to change anything—just pay
        attention.
      </li>
      <li>What sensations does your skin feel? Any breeze? Does it feel cool, warm, or humid?</li>
      <li>What do you hear right now? What thoughts pass through your mind? Do you feel any constraint?</li>
      <li>Can you go even deeper?</li>
    </ol>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you release the emotional “baggage” you carry with you each day.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-11",
  position: 11,
  title: { ro: "Ziua 11", en: "Day 11" },
  name: { ro: "Ziua 11", en: "Day 11" },
  intro: {
    ro: "Adu atenția în corp și observă senzațiile, fără să schimbi nimic.",
    en: "Bring attention into the body and notice sensations without changing anything.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/bagaje.mp3", en: "audioFiles/bagaje.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

