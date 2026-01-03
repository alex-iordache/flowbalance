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
    <ClerkProvider
      // Pin Clerk JS to a specific version to avoid transient load failures in dev
      // (e.g. attempts to load an unversioned @5 script that can be CORS-blocked).
      clerkJSVersion="5.117.0"
      allowedRedirectOrigins={[
        'https://flowbalance.vercel.app',
        'capacitor://localhost',
        'http://localhost',
        'ionic://localhost'
      ]}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          {children}
        </body>
        
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
