import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support • Flow Balance',
  description: 'Support information for Flow Balance',
};

export default function SupportPage() {
  return (
    <main className="bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4" style={{ minHeight: '100dvh' }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl px-6 py-10 md:px-10 md:py-12 overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 32px)', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Support</h1>

          <p className="mt-4 text-gray-800 leading-relaxed">
            Need help with Flow Balance? Contact us and we’ll get back to you as soon as possible.
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-gray-900">
              <strong>Email:</strong>{' '}
              <a className="underline underline-offset-2" href="mailto:contact@flowbalance.app">
                contact@flowbalance.app
              </a>
            </p>
          </div>

          <h2 className="mt-10 text-xl font-semibold text-gray-900">Common topics</h2>
          <ul className="list-disc pl-5 mt-3 text-gray-800 leading-relaxed">
            <li>Sign-in / account access</li>
            <li>Subscriptions &amp; billing</li>
            <li>Restore purchases</li>
            <li>Account deletion</li>
            <li>Bug reports &amp; feedback</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-gray-900">Suport (Română)</h2>
          <p className="mt-3 text-gray-800 leading-relaxed">
            Ai nevoie de ajutor cu Flow Balance? Scrie-ne și îți răspundem cât de repede posibil.
          </p>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-gray-900">
              <strong>Email:</strong>{' '}
              <a className="underline underline-offset-2" href="mailto:contact@flowbalance.app">
                contact@flowbalance.app
              </a>
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            For privacy-related requests, see our{' '}
            <a className="text-gray-900 underline underline-offset-2" href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

