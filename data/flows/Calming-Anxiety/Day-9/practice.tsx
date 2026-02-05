import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Experiențele traumatice din viața noastră pot lăsa răni adânci, făcându-ne să ne simțim neputincioși, copleșiți,
      speriați, nesiguri în raport cu viitorul, fără speranță, aruncați într-o lume plină de pericole.
    </p>
    <p>
      <strong>Pentru ziua aceasta vei învăța cum să depășești un trecut traumatic, urmând pașii de mai jos:</strong>
    </p>
    <p>
      <strong>Pasul 1.</strong> Treci într-o stare de concentrare, de conectare la propriul corp, conform cu una din
      meditațiile din zilele anterioare.
    </p>
    <p>
      <strong>Pasul 2.</strong> Gândește-te la comportamentul autodistructiv care te deranjează și la experiențele
      traumatice cu care te-ai confruntat. Alege un moment traumatic.
    </p>
    <p>
      <strong>Pasul 3.</strong> Cum te-a afectat emoțional? Reacțiile normale la traumă sunt teroarea, neputința, furia,
      vinovăția, regretul, vina de sine, rușinea—sentimente atât de puternice încât te-ai simțit scăpat de sub control.
    </p>
    <p>
      <strong>Pasul 4.</strong> Care au fost efectele evidente ale traumei asupra ta? Ce fel de persoană erai înainte?
      Dar după? Sigur pe tine/anxios, fericit/nefericit, ușor/dificil, sănătos/nesănătos, optimist/pesimist, cald/rece? Ce
      s-a schimbat ca urmare a traumei?
    </p>
    <p>
      <strong>Pasul 5.</strong> Poți face o conexiune între comportamentul tău autodistructiv și traumă? Poate fi foarte
      evident sau foarte subtil. Dacă nu este evident, acordă-i o atenție sporită. Este posibil să controlezi excesiv, să
      îți fie teamă de intimitate și risc, de a pierde controlul emoțional, evitând lucrurile pe care le asociezi cu
      evenimentele traumatice. Rănirea altora îți aduce alinare temporară? Provocarea altcuiva îți oferă o distragere?
    </p>
    <p>
      <strong>Pasul 6.</strong> Mai simți sentimente sau episoade intense când ceva declanșează amintiri ale evenimentului
      traumatic? Dacă da, lucrează la identificarea declanșatorilor, astfel încât să nu mai fii surprins/ă. Le poți nota.
      Sentimentele declanșate sunt doar emoții și nu trebuie să te scoată de sub control. Lucrează la obținerea
      controlului: inspiră adânc, numără până la zece și privește situația și sentimentul cu atenție. Încearcă să stai în
      afara emoțiilor tale și să te privești cu curiozitate și compasiune: ce m-a făcut să mă simt așa? Cu cât faci mai
      mult acest lucru, cu atât devine mai ușor. Poți încerca să te expui treptat la situația declanșatoare; senzația că
      deții controlul va ajuta la stăpânirea pe care o are trauma asupra ta.
    </p>
    <p>
      <strong>Pasul 7.</strong> Încearcă abordarea de editare a poveștii. În patru seri consecutive, scrie-ți gândurile și
      sentimentele cele mai profunde despre acel eveniment. Pe măsură ce repeți scrierile, fii atent/ă la revenirea unor
      noi amintiri, schimbarea perspectivelor, lucruri la care poate nu te-ai gândit niciodată. Probabil ai reprimat multe
      informații și readucerea la sinele conștient te va ajuta să le stăpânești. Reflectă asupra modului în care
      evenimentul ți-a afectat viața. Lucrează la acceptarea radicală: orice ar fi fost, s-a întâmplat în acel moment și
      loc. Nu poți schimba asta; poți trăi cea mai bună viață în ciuda ei.
    </p>
    <p>
      <strong>Pasul 8.</strong> Asigură-te că starea de sănătate a creierului tău este bună. Dacă flashback-urile sau
      comportamentul autodistructiv par într-adevăr scăpate de control sau dacă „pierzi timpul” și nu îți poți aminti
      lucrurile, caută ajutor de specialitate (psihiatru sau neurolog cu experiență în traume).
    </p>
    <p>
      <strong>Pasul 9.</strong> Asigură-te că și corpul tău este în regulă. Fă verificări complete periodice. Traumele și
      stresul fac ravagii cu corpul.
    </p>
    <p>
      Ascultă această înregistrare audio înainte de culcare, care te va ajuta să te deconectezi de la probleme, pentru a
      oferi relaxare întregului corp.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Traumatic experiences in our lives can leave deep wounds, making us feel helpless, overwhelmed, scared, uncertain
      about the future, hopeless, thrown into a world full of danger.
    </p>
    <p>
      <strong>For today you’ll learn how to move past a traumatic past, following the steps below:</strong>
    </p>
    <p>
      <strong>Step 1.</strong> Enter a state of focus and connection to your body, as in one of the meditations from
      previous days.
    </p>
    <p>
      <strong>Step 2.</strong> Think about the self-sabotaging behaviour that bothers you and the traumatic experiences
      you’ve faced. Choose one traumatic moment.
    </p>
    <p>
      <strong>Step 3.</strong> How did it affect you emotionally? Normal reactions to trauma include terror, helplessness,
      anger, guilt, regret, self-blame, shame—feelings so strong you felt out of control.
    </p>
    <p>
      <strong>Step 4.</strong> What were the clear effects of the trauma on you? What kind of person were you before?
      After? Secure/anxious, happy/unhappy, light/heavy, healthy/unwell, optimistic/pessimistic, warm/cold? What changed
      as a result of the trauma?
    </p>
    <p>
      <strong>Step 5.</strong> Can you connect your self-sabotaging behaviour to the trauma? It may be very obvious or
      very subtle. If it’s not obvious, pay extra attention. You may overcontrol, fear intimacy and risk, fear losing
      emotional control, avoid things you associate with the trauma. Does hurting others bring you temporary relief? Does
      provoking someone give you a distraction?
    </p>
    <p>
      <strong>Step 6.</strong> Do you still have intense feelings or episodes when something triggers memories of the
      trauma? If yes, work on identifying your triggers so you’re not caught off guard. You can write them down. Triggered
      feelings are just emotions and don’t have to take over. Work on regaining control: breathe deeply, count to ten,
      and look at the situation and the feeling with care. Try to step outside your emotions and look at yourself with
      curiosity and compassion: I wonder what made me feel this way. The more you do this, the easier it gets. You may try
      gradually exposing yourself to the trigger; feeling that you have control helps reduce the hold the trauma has on
      you.
    </p>
    <p>
      <strong>Step 7.</strong> Try the story-editing approach. On four consecutive evenings, write your deepest thoughts
      and feelings about that event. As you repeat the writing, notice new memories surfacing, perspectives shifting,
      things you may never have considered. You may have repressed a lot; bringing it back to awareness can help you
      integrate it. Reflect on how the event affected your life. Work on radical acceptance: whatever happened, happened in
      that time and place. You can’t change it; you can live the best life you can despite it.
    </p>
    <p>
      <strong>Step 8.</strong> Make sure your brain health is in good shape. If flashbacks or self-sabotaging behaviour
      feel truly out of control, or you “lose time” and can’t remember things, seek specialist help (a psychiatrist or
      neurologist with experience in trauma).
    </p>
    <p>
      <strong>Step 9.</strong> Make sure your body is okay too. Have regular full check-ups. Trauma and stress take a
      heavy toll on the body.
    </p>
    <p>
      Listen to this audio before bed; it will help you disconnect from problems and relax your whole body.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-09',
  position: 9,
  title: { ro: 'Ziua 9', en: 'Day 9' },
  name: { ro: 'Ziua 9', en: 'Day 9' },
  intro: {
    ro: 'Depășirea unui trecut traumatic în 9 pași; audio înainte de culcare.',
    en: 'Moving past a traumatic past in 9 steps; audio before bed.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/cum-trec-peste-insomnie.mp3', en: 'audioFiles/cum-trec-peste-insomnie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
