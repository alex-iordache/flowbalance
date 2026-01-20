import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate • Flow Balance',
  description: 'Politica de Confidențialitate pentru Flow Balance',
};

export default function PoliticaDeConfidentialitatePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Politica de Confidențialitate – Flow Balance</h1>

        <p className="mt-3 text-sm text-gray-600">
          <strong>Ultima actualizare:</strong> 20 ianuarie 2026
        </p>

        <p className="mt-6 text-gray-800 leading-relaxed">
          Flow Balance („noi”) respectă confidențialitatea utilizatorilor și se angajează să protejeze datele personale.
          Această politică explică modul în care datele sunt colectate, utilizate și protejate în aplicația Flow Balance
          și pe site-ul{' '}
          <a className="text-gray-900 underline underline-offset-2" href="https://www.flowbalance.app">
            https://www.flowbalance.app
          </a>
          .
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">1. Ce date colectăm</h2>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.1 Date de cont</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Pentru crearea și gestionarea contului, folosim serviciul <strong>Clerk</strong>. Pot fi colectate:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Adresa de email</li>
          <li>ID-ul utilizatorului</li>
          <li>Date necesare autentificării</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Parolele sunt gestionate exclusiv de Clerk și <strong>nu sunt stocate de noi</strong>.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.2 Date de plată</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Accesul premium este oferit prin plăți procesate de <strong>Stripe</strong>, prin intermediul Clerk.
        </p>
        <p className="mt-2 text-gray-800 leading-relaxed">Nu colectăm și nu stocăm:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Date de card</li>
          <li>Informații bancare</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">Stripe poate procesa:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Detalii de plată</li>
          <li>Istoric tranzacții</li>
          <li>Informații de facturare</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.3 Date tehnice și de utilizare</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">Putem colecta date nepersonale precum:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Tipul dispozitivului și sistemul de operare</li>
          <li>Interacțiuni cu aplicația</li>
          <li>Date anonime de performanță și erori</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Aceste date sunt utilizate exclusiv pentru îmbunătățirea aplicației.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">2. Scopul utilizării datelor</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">Datele sunt utilizate pentru:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Funcționarea conturilor de utilizator</li>
          <li>Oferirea accesului premium</li>
          <li>Procesarea plăților</li>
          <li>Îmbunătățirea performanței și securității aplicației</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">3. Servicii terțe</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">Flow Balance utilizează următorii furnizori:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>
            <strong>Clerk</strong> – autentificare și gestionare utilizatori
          </li>
          <li>
            <strong>Stripe</strong> – procesare plăți
          </li>
          <li>
            <strong>Vercel</strong> – găzduire aplicație
          </li>
          <li>
            <strong>Google Play Services</strong> – distribuție aplicație
          </li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Acești furnizori respectă propriile politici de confidențialitate.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">4. Partajarea datelor</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">Nu vindem și nu închiriem date personale.</p>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Datele sunt partajate exclusiv cu furnizorii menționați și doar în scopul funcționării aplicației.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">5. Stocarea datelor</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Datele sunt păstrate doar pe durata necesară furnizării serviciilor sau conform obligațiilor legale.
          Utilizatorii pot solicita ștergerea contului și a datelor asociate.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">6. Drepturile utilizatorului</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">Aveți dreptul de a:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Accesa datele personale</li>
          <li>Solicita corectarea sau ștergerea acestora</li>
          <li>Retrage consimțământul</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Solicitările pot fi trimise la adresa de contact de mai jos.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">7. Confidențialitatea copiilor</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Aplicația nu este destinată copiilor sub 13 ani și nu colectează intenționat date ale acestora.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">8. Securitatea datelor</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Folosim măsuri tehnice adecvate pentru protejarea datelor, iar autentificarea și plățile sunt gestionate de
          furnizori securizați.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">9. Modificări</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Această politică poate fi actualizată periodic. Orice modificare va fi publicată pe această pagină.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">10. Contact</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          <strong>Email:</strong>{' '}
          <a className="text-gray-900 underline underline-offset-2" href="mailto:contact@flowbalance.app">
            contact@flowbalance.app
          </a>
          <br />
          <strong>Website:</strong>{' '}
          <a className="text-gray-900 underline underline-offset-2" href="https://www.flowbalance.app">
            https://www.flowbalance.app
          </a>
        </p>
      </div>
    </main>
  );
}

