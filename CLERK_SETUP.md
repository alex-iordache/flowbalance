# Clerk Mobile Integration Setup

## Overview
This app now uses Clerk authentication with Capacitor deep linking to handle OAuth flows properly on mobile devices.

## What Was Implemented

### 1. Native Configuration
- **Android**: Added intent filters for `com.flowapp.app://oauth` and `clerk://com.flowapp.app` in `AndroidManifest.xml`
- **iOS**: Added `CFBundleURLTypes` for custom URL schemes in `Info.plist`
- Updated package names from `com.example.app` to `com.flowapp.app` across all configs

### 2. Dependencies
Added to `package.json`:
- `@clerk/clerk-react@^5.21.3` - Clerk React SDK (better for static export than @clerk/nextjs)
- `@capacitor/browser@^7.0.0` - For in-app OAuth browser

### 3. Clerk Components
Created in `components/clerk/`:
- `ClientClerk.tsx` - Wraps Clerk components with dynamic imports for static export
- `MobileGoogleSignIn.tsx` - Custom Google OAuth button that uses Capacitor Browser

### 4. App Structure
- `AppShell.tsx` - Now includes:
  - `ClerkProvider` wrapping the entire app
  - `DeepLinkHandler` to process OAuth redirects
  - Route guards using `<SignedIn>` and `<SignedOut>` components
  
- `pages/SignIn.tsx` - New mobile-optimized sign-in page with custom Google button
- `pages/Settings.tsx` - Added sign-out button

### 5. Next.js Configuration
- Updated `next.config.js` to transpile `@clerk/clerk-react`
- Added webpack fallbacks for client-only modules

## Environment Variables
Ensure `.env.local` exists with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9wdWxhci1naWJib24tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4pYAh6MWw2EhVcuQuQfIc80TJzsyigEdSrA7eV95nl
```

## Clerk Dashboard Configuration
In your Clerk Dashboard (https://dashboard.clerk.com):

1. Go to **Configure → Design → Redirects**
2. In **Allowlist for mobile SSO redirect**, add:
   - `https://localhost/sso-callback` (for Capacitor apps)
   - Or your actual production domain when deployed

## How It Works

### OAuth Flow (Updated for Mobile Compatibility)
1. User clicks "Continue with Google" on sign-in page
2. `MobileGoogleSignIn` creates a new SignIn and prepares OAuth with Google
3. Uses `prepareFirstFactor` API with a web-based redirect URL (`/sso-callback`)
4. OAuth URL is opened in Capacitor's in-app Browser
5. User authenticates with Google
6. Google redirects to Clerk's callback, which then redirects to `/sso-callback`
7. The `/sso-callback` page detects Capacitor environment and redirects to custom scheme
8. Capacitor catches `com.flowapp.app://sso-callback?...` deep link
9. App listens for this URL, closes browser, and reloads Clerk session
10. User is now signed in and redirected to `/home`

**Key Insight**: We use a web-based callback URL (`https://localhost/sso-callback`) with Clerk because Clerk only accepts http/https redirect URLs. The sso-callback page then handles the redirect to our custom scheme for the mobile app.

### Deep Link Handler
The `DeepLinkHandler` component:
- Listens for `appUrlOpen` events from Capacitor
- Extracts `__clerk_handshake` from the URL
- Updates `window.location` with the handshake params
- Waits for Clerk to process and establish the session
- Navigates to `/home` once authenticated

## Next Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Sync Capacitor**:
   ```bash
   npx cap sync
   ```

3. **Build and Test**:
   ```bash
   npm run make-android
   ```

4. **Test the Flow**:
   - Open the app on your phone
   - Click "Continue with Google"
   - Complete authentication in the browser
   - App should automatically return and show the home screen

## Troubleshooting

### If OAuth opens in external browser:
- Verify deep link intent filters are correct in `AndroidManifest.xml`
- Check Clerk Dashboard has the correct redirect URLs allowlisted
- Verify the app package name matches `com.flowapp.app`

### If you get 404 after OAuth:
- Check that the deep link handler is logging the incoming URL
- Verify the handshake parameter is being extracted correctly
- Ensure Clerk can process the handshake (check Clerk Dashboard settings)

### If sign-out doesn't work:
- Check that `useClerk()` hook returns the Clerk instance
- Verify the Clerk instance has the `signOut` method
- Check console logs for errors

## Debug Logging
All console logs are captured and can be viewed/copied from the sign-in page for easier debugging on mobile devices.
