import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Tema:</strong> Te-ai susținut mai mult decât îți amintești.</p>
    <p>
      <strong>Exercițiu principal:</strong> Scrie 20 de momente în care te-ai ridicat singur/ă, fără ajutor: ai continuat, ai învățat, ai reparat, ai ales diferit.
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
    <p><strong>Theme:</strong> You have supported yourself more than you remember.</p>
    <p>
      <strong>Main exercise:</strong> Write 20 moments when you picked yourself up without help: you continued, learned, repaired, chose differently.
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
  id: "Build-Self-Trust-Day-07",
  position: 7,
  title: { ro: "Ziua 7 – Când ai fost acolo pentru tine", en: "Day 7 – When You Were There for Yourself" },
  name: { ro: "Când ai fost acolo pentru tine", en: "When You Were There for Yourself" },
  intro: { ro: "Recunoaște momentele în care te-ai ținut — și revino la fapte într-o situație de azi.", en: "Acknowledge moments you showed up for yourself—and return to facts in one situation from today." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/puterea-care-se-aseaza.mp3", en: "audioFiles/puterea-care-se-aseaza.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
