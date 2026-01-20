import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy • Flow Balance',
  description: 'Privacy Policy for Flow Balance',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 p-4" style={{ minHeight: '100dvh' }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl px-6 py-10 md:px-10 md:py-12 overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 32px)', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy for Flow Balance</h1>

        <p className="mt-3 text-sm text-gray-600">
          <strong>Last updated:</strong> January 20, 2026
        </p>

        <p className="mt-6 text-gray-800 leading-relaxed">
          Flow Balance (“we”, “our”, or “us”) respects your privacy and is committed to protecting your personal data.
          This Privacy Policy explains how information is collected, used, and shared when you use the Flow Balance
          mobile application and website available at{' '}
          <a className="text-gray-900 underline underline-offset-2" href="https://www.flowbalance.app">
            https://www.flowbalance.app
          </a>
          .
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">1. Information We Collect</h2>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.1 Account Information</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">
          When you create an account, we collect and process personal information through <strong>Clerk</strong>, our
          authentication provider. This may include:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Email address</li>
          <li>User ID</li>
          <li>Authentication credentials (securely managed by Clerk)</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          We do <strong>not store passwords directly</strong> on our servers.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.2 Payment Information</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Premium features are available via paid subscriptions or one-time payments.
        </p>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Payments are processed securely by <strong>Stripe</strong>, via Clerk. We <strong>do not store or process
          credit card details</strong> ourselves.
        </p>
        <p className="mt-2 text-gray-800 leading-relaxed">Stripe may collect:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Payment method details</li>
          <li>Transaction data</li>
          <li>Billing-related information</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-gray-900">1.3 Usage &amp; Technical Data</h3>
        <p className="mt-2 text-gray-800 leading-relaxed">We may collect limited non-personal information such as:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Device type and operating system</li>
          <li>App usage statistics</li>
          <li>Anonymous crash and performance data</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          This data is used solely to improve app reliability and user experience.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">We use collected data to:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Provide and manage user accounts</li>
          <li>Enable premium access</li>
          <li>Process payments</li>
          <li>Improve app performance and stability</li>
          <li>Ensure security and prevent abuse</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">3. Third-Party Services</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Flow Balance relies on trusted third-party services:
        </p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>
            <strong>Clerk</strong> – authentication and user management
          </li>
          <li>
            <strong>Stripe</strong> – payment processing
          </li>
          <li>
            <strong>Vercel</strong> – application hosting and infrastructure
          </li>
          <li>
            <strong>Google Play Services</strong> – app distribution and analytics
          </li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          These services process data in accordance with their own privacy policies.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">4. Data Sharing</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">We do <strong>not sell or rent personal data</strong>.</p>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Data is shared only with the service providers listed above and only as necessary to operate the app.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">5. Data Retention</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          We retain personal data only for as long as necessary to provide the service or comply with legal obligations.
        </p>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Users may request deletion of their account and associated data at any time.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">6. Your Rights</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 mt-2 text-gray-800 leading-relaxed">
          <li>Access your personal data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent</li>
          <li>Request data portability</li>
        </ul>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Requests can be made using the contact information below.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">7. Children’s Privacy</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          Flow Balance is <strong>not intended for children under the age of 13</strong>. We do not knowingly collect
          personal data from children. If such data is discovered, it will be deleted promptly.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">8. Data Security</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          We use reasonable technical and organizational measures to protect your data. All authentication and payment
          processes are handled via secure, industry-standard providers.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">9. Changes to This Policy</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-gray-900">10. Contact Information</h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          If you have questions or requests regarding this Privacy Policy, please contact us at:
        </p>
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
      </div>
    </main>
  );
}

