import type { Metadata } from 'next';

const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc7ek6kGyCPOs_n1Aw9J0GN_fU2hopFg86wV6sOPMZwd_e52w/viewform?embedded=true';

export const metadata: Metadata = {
  title: 'Promo • Flow Balance',
  description: 'Înscrie-te pentru 30 de zile gratuite — Flow Balance',
};

export default function PromoPage() {
  return (
    <main className="bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4" style={{ minHeight: '100dvh' }}>
      <div className="max-w-3xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl px-6 py-10 md:px-10 md:py-12 overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 32px)', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Flow Balance</h1>

          <p className="mt-4 text-gray-800 leading-relaxed">
            Aplicația de wellbeing care te ajută să găsești echilibrul — practici ghidate, progres personal și
            conținut audio atent ales.
          </p>

          <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-4">
            <p className="text-gray-900 font-semibold">Ofertă promo: 30 de zile gratuite</p>
            <p className="mt-2 text-gray-800 text-sm leading-relaxed">
              Completează formularul de mai jos cu adresa ta de email. Îți vom crea contul manual și îți vom trimite
              instrucțiunile de acces în aplicație.
            </p>
          </div>

          <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <iframe
              src={FORM_EMBED_URL}
              title="Formular înscriere promo Flow Balance"
              width="640"
              height="691"
              className="w-full max-w-full border-0 block"
              style={{ minHeight: '691px' }}
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
            >
              Se încarcă…
            </iframe>
          </div>

          <p className="mt-6 text-sm text-gray-600 leading-relaxed">
            Ai deja cont?{' '}
            <a className="text-gray-900 underline underline-offset-2" href="/sign-in">
              Autentificare
            </a>
            {' · '}
            <a className="text-gray-900 underline underline-offset-2" href="/get-app">
              Descarcă aplicația
            </a>
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Datele din formular sunt gestionate conform{' '}
            <a className="text-gray-900 underline underline-offset-2" href="/politica-de-confidentialitate">
              Politicii de confidențialitate
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
