import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      După câteva ore de la consumarea unei băuturi alcoolice, nivelul alcoolului din sângele tău începe să scadă, ceea ce
      va trimite semnale către corpul tău că trebuie să se trezească. Unei persoane normale îi ia aproximativ două ore
      pentru a metaboliza un pahar de alcool, așa că dacă bei două pahare de vin înainte de cină, termină ultima înghițitură
      cu cel puțin două ore înainte de culcare.
    </p>

    <ul className="list-disc pl-5 mt-2">
      <li>Un pahar mare (250 ml) de vin este complet eliminat din sistem în aproximativ trei ore;</li>
      <li>O halbă de bere (500 ml) este complet eliminată din sistem în aproximativ două ore;</li>
      <li>Un shot de tequila (30 ml) este complet eliminat din sistem în aproximativ o oră;</li>
      <li>
        Un pahar de 100 ml băutură spirtoasă (vodcă, rom etc.) este complet eliminat din sistem în aproximativ patru ore.
      </li>
    </ul>

    <p className="mt-3">
      Aceste valori sunt estimative și pot varia în funcție de mai mulți factori, inclusiv de cantitatea de alcool
      ingerată. Sunt și cazuri în care alcoolul rămâne în organism până la 24 de ore, mai ales atunci când este consumată o
      cantitate mare de băuturi tari.
    </p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Bei alcool cu 4 ore înainte de culcare? Dacă da, atunci te invit ca timp de 5 zile să consumi alcool mai devreme și
      să remarci calitatea somnului tău. Deși alcoolul ne ajută să ne destindem, din păcate acesta ne afectează pe timp de
      noapte o funcție importantă a somnului și, de aceea, este posibil să ne trezim obosiți, indiferent dacă am dormit
      suficiente ore.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să priveşti situațiile dificile dintr-un alt unghi, astfel
      încât să găsești soluția potrivită pentru tine.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      A few hours after drinking alcohol, your blood alcohol level begins to drop, which can send signals to your body
      that it should wake up. For most people, it takes about two hours to metabolize one drink—so if you have two glasses
      of wine before dinner, finish the last sip at least two hours before bedtime.
    </p>

    <ul className="list-disc pl-5 mt-2">
      <li>A large glass (250 ml) of wine is fully eliminated from the system in about three hours;</li>
      <li>A pint (500 ml) of beer is fully eliminated in about two hours;</li>
      <li>A shot of tequila (30 ml) is fully eliminated in about one hour;</li>
      <li>A 100 ml glass of spirits (vodka, rum, etc.) is fully eliminated in about four hours.</li>
    </ul>

    <p className="mt-3">
      These values are estimates and can vary depending on several factors, including how much alcohol is consumed. In
      some cases, alcohol can remain in the body for up to 24 hours—especially after larger amounts of strong drinks.
    </p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you drink alcohol within 4 hours of bedtime? If yes, try for 5 days to drink earlier and observe your sleep
      quality. Although alcohol can help us relax, it unfortunately disrupts an important function of sleep at night—so
      you may wake up tired even if you slept enough hours.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you view difficult situations from another angle so you can find
      the solution that fits you.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-13",
  position: 13,
  title: { ro: "Ziua 13", en: "Day 13" },
  name: { ro: "Ziua 13", en: "Day 13" },
  intro: {
    ro: "Observă cum alcoolul îți afectează somnul și ajustează timing-ul.",
    en: "Notice how alcohol affects sleep and adjust the timing.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/coplesit-de-griji.mp3", en: "audioFilesEnAi/coplesit-de-griji-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

