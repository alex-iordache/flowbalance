import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Prin aducerea conștientizării și a recunoașterii a ceea ce simți în organism, poți reduce semnificativ stările de
      stres sau anxietate, atacurile de panică, durerile fizice.
    </p>
    <p>
      <strong>Pentru ziua aceasta începe un jurnal al dezamăgirilor, al eșecurilor și al acțiunilor autodistructive.</strong>{' '}
      Atunci când ceva nu merge bine, scrie mai întâi ceea ce sperai sau te așteptai să se întâmple, apoi ce s-a întâmplat
      cu adevărat.
    </p>
    <p>
      <strong>Ulterior, examinează-ți așteptările care te-au condus greșit</strong>—ai investit atât de mult efort, încât nu
      ai putut să te uiți realist la șansele tale de succes; ai fost afectat de influența socială (toată lumea este); ai
      uitat de eșecurile din trecut, de care îți amintești doar acum că ești dezamăgit/ă; erai obosit/ă și voiai s-o iei
      de la capăt—și așa mai departe.
    </p>
    <p>
      <strong>Următorul pas important:</strong> acum când ești dezamăgit/ă, ce concluzionezi din propria experiență?
      Emoțiile tale sunt mari în acest moment, așa că șansele unei concluzii defectuoase sunt destul de mari. După ce ai
      respins toate concluziile defectuoase, folosește-ți sinele conștient pentru a decide ce vei face diferit data
      viitoare.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental și emoțional pentru a deveni propriul
      arhitect al modului în care se va desfășura viața ta.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      By bringing awareness and acknowledgment to what you feel in your body, you can significantly reduce stress,
      anxiety, panic attacks, and physical pain.
    </p>
    <p>
      <strong>For today, start a journal of disappointments, failures, and self-sabotaging actions.</strong> When
      something goes wrong, first write what you hoped or expected would happen, then what actually happened.
    </p>
    <p>
      <strong>Then look at the expectations that led you astray</strong>—you invested so much effort you couldn’t see your
      chances of success realistically; you were affected by social influence (everyone is); you forgot past failures
      that you only remember now that you’re disappointed; you were tired and wanted a fresh start—and so on.
    </p>
    <p>
      <strong>Next important step:</strong> right now, as someone disappointed, what do you conclude from your own
      experience? Your emotions are strong at this moment, so the chance of a faulty conclusion is quite high. After you
      set aside those faulty conclusions, use your conscious self to decide what you’ll do differently next time.
    </p>
    <p>
      Listen to this audio; it will help you train mentally and emotionally to become the architect of how your life
      unfolds.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-06',
  position: 6,
  title: { ro: 'Ziua 6', en: 'Day 6' },
  name: { ro: 'Ziua 6', en: 'Day 6' },
  intro: {
    ro: 'Jurnal dezamăgiri/eșecuri; examinează așteptările; ce faci diferit data viitoare.',
    en: 'Disappointments and failures journal; examine expectations; what you’ll do differently next time.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/conectarea-la-propriul-intelept.mp3',
    en: 'audioFilesEnAi/conectarea-la-propriul-intelept-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
