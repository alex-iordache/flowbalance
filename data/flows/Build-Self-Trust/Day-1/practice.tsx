import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>
      <strong>Exercițiu principal:</strong> Listează 100 de lucruri pe care le-ai realizat cu succes de când te-ai născut.
      Pot fi mici sau mari. Absolut orice contează: când ai învățat să mergi, când ai terminat școala, când ai luat decizii dificile, când ai continuat deși ți-a fost greu.
    </p>
    <p>
      Alege <strong>o singură situație</strong> din ziua de azi în care ai simțit nesiguranță, îndoială sau autocritică (o conversație, un mail, o decizie mică, o reacție emoțională).
    </p>
    <p>În jurnal, scrie clar:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        <strong>Situația (fapte, nu interpretări)</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>Ce s-a întâmplat concret</li>
          <li>Cine era implicat</li>
          <li>Ce s-a spus sau ce ai făcut</li>
        </ul>
      </li>
      <li>
        <strong>Gândul automat</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>Ce ți-ai spus exact în minte (ex: „Nu sunt suficient de bun”, „O să greșesc”, „N-am făcut bine”)</li>
        </ul>
      </li>
      <li>
        <strong>Faptele reale</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>Ce poți dovedi obiectiv că s-a întâmplat</li>
          <li>Fără presupuneri, fără „probabil”</li>
        </ul>
      </li>
    </ul>
  </>
);
const enDescription = (
  <>
    <p>
      <strong>Main exercise:</strong> List 100 things you’ve accomplished successfully since you were born.
      They can be small or big. Everything counts: learning to walk, finishing school, making hard decisions, continuing even when it was difficult.
    </p>
    <p>
      Choose <strong>one situation</strong> from today where you felt insecurity, doubt, or self-criticism (a conversation, an email, a small decision, an emotional reaction).
    </p>
    <p>In your journal, write clearly:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>
        <strong>The situation (facts, not interpretations)</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>What happened concretely</li>
          <li>Who was involved</li>
          <li>What was said or what you did</li>
        </ul>
      </li>
      <li>
        <strong>The automatic thought</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>What you told yourself exactly (e.g. “I’m not good enough”, “I’ll mess up”, “I didn’t do it right”)</li>
        </ul>
      </li>
      <li>
        <strong>The real facts</strong>
        <ul className="list-disc pl-5 mt-2">
          <li>What you can objectively prove happened</li>
          <li>No assumptions, no “probably”</li>
        </ul>
      </li>
    </ul>
  </>
);


const practice: Practice = {
  id: "Build-Self-Trust-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Dovada existenței tale", en: "Day 1 – Evidence of Your Existence" },
  name: { ro: "Dovada existenței tale", en: "Evidence of Your Existence" },
  intro: { ro: "Începe prin fapte: ce ai făcut deja și ce e real, nu ce îți spune autocritica.", en: "Start with facts: what you’ve already done and what’s real—not what self-criticism says." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/eu-sunt-suma-reusitelor-mele.mp3", en: "audioFiles/eu-sunt-suma-reusitelor-mele.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
