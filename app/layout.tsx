import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';

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

export const metadata: Metadata = {
  title: 'Flow - Find Your Balance',
  description: 'Meditation and wellness app',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
        
        {/* Prevent external browser opens in Capacitor */}
        <Script
          id="prevent-external-browser"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Block window.open completely
                window.open = function() {
                  console.log('[BLOCKED] Prevented window.open call');
                  return null;
                };
                
                // Intercept link clicks that might open browser
                document.addEventListener('click', function(e) {
                  var target = e.target;
                  while (target && target.tagName !== 'A') {
                    target = target.parentElement;
                  }
                  if (target && target.tagName === 'A') {
                    var href = target.getAttribute('href');
                    // Allow internal navigation
                    if (href && (href.startsWith('/') || href.startsWith('#'))) {
                      return;
                    }
                    // Block everything else
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[BLOCKED] Prevented external link:', href);
                  }
                }, true);
              }
            `
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
      </html>
    </ClerkProvider>
  );
}
