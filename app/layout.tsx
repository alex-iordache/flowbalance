import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Inter, Montserrat } from 'next/font/google';
import ClerkProviderClient from '../components/ClerkProviderClient';

import 'tailwindcss/tailwind.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Headings/brand font (requested): Montserrat
const fontTitle = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
  variable: '--font-title',
  display: 'swap',
});

// Logo font (original in our implementation): Cormorant Garamond
const fontLogo = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flow - Find Your Balance',
  description: 'Meditation and wellness app',
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderClient>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={[fontInter.variable, fontTitle.variable, fontLogo.variable].join(' ')}
          style={{ fontFamily: 'var(--font-title), var(--font-inter), ui-sans-serif, system-ui, -apple-system' }}
        >
          {children}

          {/* Capture early runtime errors that can cause a "blank purple screen" */}
          <Script
            id="fb-runtime-error-overlay"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  // Some third-party bundles (especially in iOS WebViews) still expect a Node-like
                  // global identifier. Provide a safe shim early.
                  try {
                    if (typeof window !== 'undefined' && !window.global) window.global = window;
                  } catch {}

                  function show(msg) {
                    try {
                      var id = '__fb_runtime_error_overlay__';
                      var el = document.getElementById(id);
                      if (!el) {
                        el = document.createElement('div');
                        el.id = id;
                        el.style.position = 'fixed';
                        el.style.zIndex = '2147483647';
                        el.style.left = '0';
                        el.style.right = '0';
                        el.style.top = '0';
                        el.style.bottom = '0';
                        el.style.padding = '24px';
                        el.style.background = 'rgba(42, 16, 70, 0.98)';
                        el.style.color = '#fff';
                        el.style.fontFamily = 'ui-sans-serif, system-ui, -apple-system';
                        el.style.overflow = 'auto';
                        el.innerHTML =
                          '<div style="max-width: 960px; margin: 0 auto;">' +
                            '<div style="font-size: 22px; font-weight: 700;">App runtime error</div>' +
                            '<div style="margin-top: 10px; font-size: 14px; opacity: 0.9;">Paste this message into chat so we can fix it.</div>' +
                            '<pre style="margin-top: 14px; white-space: pre-wrap; background: rgba(0,0,0,0.25); padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.15);"></pre>' +
                            '<button style="margin-top: 14px; padding: 10px 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.12); color: #fff; font-weight: 600;" onclick="location.reload()">Reload</button>' +
                          '</div>';
                        document.body.appendChild(el);
                      }
                      var pre = el.querySelector('pre');
                      if (pre) pre.textContent = String(msg || 'Unknown error');
                    } catch {}
                  }

                  window.addEventListener('error', function (e) {
                    var m = (function () {
                      try {
                        if (e && e.error) {
                          var msg = e.error.message || String(e.error);
                          var st = e.error.stack || '';
                          return st && st.indexOf(msg) === -1 ? (msg + '\\n' + st) : (st || msg);
                        }
                        return e && e.message ? e.message : String(e);
                      } catch {
                        return 'Unknown error';
                      }
                    })();
                    show(m);
                  });
                  window.addEventListener('unhandledrejection', function (e) {
                    var r = (function () {
                      try {
                        if (e && e.reason) {
                          var msg = e.reason.message || String(e.reason);
                          var st = e.reason.stack || '';
                          return st && st.indexOf(msg) === -1 ? (msg + '\\n' + st) : (st || msg);
                        }
                        return String(e);
                      } catch {
                        return 'Unknown rejection';
                      }
                    })();
                    show(r);
                  });
                })();
              `,
            }}
          />

          <Script
            type="module"
            src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
            strategy="lazyOnload"
          />
          <Script
            noModule
            src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
            strategy="lazyOnload"
          />
        </body>
      </html>
    </ClerkProviderClient>
  );
}
