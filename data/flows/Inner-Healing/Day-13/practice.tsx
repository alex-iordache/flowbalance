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

const practice: Practice = {
  id: 'Inner-Healing-Day-13',
  position: 13,
  title: { ro: 'Ziua 13', en: 'Day 13' },
  name: { ro: 'Ziua 13', en: 'Day 13' },
  intro: {
    ro: 'Recunoștință și observare profundă.',
    en: 'Gratitude + deeper noticing.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

