# Project Context: FlowBalance Mobile App (Capacitor + Next.js + Clerk)

## Project Overview
I'm building a meditation mobile app called "FlowBalance" using:
- **Frontend**: Next.js 14 (App Router) + Ionic React + Capacitor 7
- **Authentication**: Clerk
- **Billing**: Clerk's built-in billing (NOT Stripe)
- **Platform**: Android (planning iOS later)
- **Deployment**: Vercel (flowbalance-jdk.vercel.app)

## Business Model & User Types

### User Types:
1. **Guest Users** - Can access only the first practice of the first flow (free)
2. **Free Authenticated Users** - Same as guest (first practice only)
3. **Pro Subscribers** - Full access to all content (pay via Clerk billing on web)
4. **Organization Users** - Full access (verified domains: `jordache.me`, `dynamichr.ro`)

### Google Play Compliance Issue:
- **CRITICAL**: Cannot have payment UI inside the mobile app (violates Google Play policies for digital content)
- **Solution**: All sign-up and payment happens in the phone's **system browser** (Chrome/Safari), NOT in-app

## Current Architecture

### Key Pages & Routes:

**In-App Pages (WebView):**
- `/sign-in` - Clerk sign-in + button to open sign-up in browser
- `/home` - Main app home (Ionic tabs)
- `/flows` - List of meditation flows
- `/flows/[id]` - Flow detail with practices
- `/flows/[flowId]/[practiceId]` - Practice player (audio)
- `/settings` - Settings with sign-in/out buttons
- `/subscribe` - Auto-redirects to `/subscribe-web` in system browser
- `/post-signup-redirect` - Just redirects org users to /home

**Web-Only Pages (External Browser):**
- `/sign-up-web` - Clerk sign-up form (opens in Chrome/Safari)
- `/signup-success` - "Return to app" message after registration
- `/subscribe-web` - Clerk `<PricingTable />` for payment

### Critical Pattern: Opening External Browser

```typescript
import { Capacitor } from '@capacitor/core';

const openExternalUrl = async (url: string) => {
  if (Capacitor.isNativePlatform()) {
    // Native: Open in system browser
    const { App } = await import('@capacitor/app');
    await App.openUrl({ url });
  } else {
    // Web: Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
```

**Why dynamic import?** Next.js builds for web/server context where Capacitor APIs don't exist. Must import at runtime.

## User Flows

### New User Sign-Up Flow:
1. User tries to access locked practice → PaywallModal appears
2. User clicks "Sign Up & Subscribe" → Goes to `/sign-in` page
3. User clicks "Create Account on Web" → Opens `sign-up-web` in Chrome
4. User completes sign-up in Chrome → Sees "Return to app" success page
5. User switches back to app (still on `/sign-in` page)
6. User signs in → Goes to `/home`
7. User tries locked practice again → PaywallModal shows "Upgrade to Pro"
8. User clicks upgrade → Opens `/subscribe-web` in Chrome
9. User completes payment in Chrome with Clerk PricingTable
10. User returns to app → Subscription syncs automatically

### Existing User Sign-In Flow:
1. User opens app → Goes to `/sign-in`
2. User signs in with email/password
3. Redirects to `/home`
4. If no subscription → sees locks on premium practices

## Key Files & Their Purposes

### Authentication:
- `/app/sign-in/[[...sign-in]]/page.tsx` - Sign-in page with external sign-up button
- `/app/sign-up-web/[[...sign-up]]/page.tsx` - Web-only sign-up (opens in browser)
- `/app/signup-success/page.tsx` - Success page after sign-up
- `/app/post-signup-redirect/page.tsx` - Simple redirect logic

### Subscription:
- `/app/subscribe/page.tsx` - In-app page that opens `/subscribe-web` in browser
- `/app/subscribe-web/page.tsx` - Clerk `<PricingTable />` for payment

### Access Control:
- `/hooks/useAccessControl.ts` - Hook that checks user type and subscription status
- `/hooks/useAccessControl.ts::usePracticeAccess()` - Checks if user can access specific practice

### UI Components:
- `/components/PaywallModal.tsx` - Modal shown when user tries to access locked content
- `/components/pages/Practice.tsx` - Practice player with access gating
- `/components/pages/FlowDetail.tsx` - Flow detail with lock icons on premium practices
- `/components/pages/Settings.tsx` - Settings with sign-in/out buttons

### Configuration:
- `/capacitor.config.json` - Capacitor config (server URL, plugins)
- `/app/layout.tsx` - Root layout with ClerkProvider
- `/.env.local` - Clerk API keys

## Important Clerk Configuration

### Environment Variables (Vercel):
```bash
# Required - Keep these:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home

# DO NOT SET (page-level redirects handle this):
# NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL
# NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
# NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

### Clerk Dashboard Settings:
- **Authentication**: Email + Password (verification code)
- **Google OAuth**: DISABLED (causes session issues on mobile)
- **Organizations**: Enabled
- **Verified Domains**: `jordache.me`, `dynamichr.ro`
- **Billing**: Clerk's billing (NOT external Stripe)
- **Plans**: `free_user`, `pro_user`

## Current State & Known Issues

### ✅ What's Working:
- Sign-in flow works
- Access control works (locks on premium practices)
- Organization users get full access
- PaywallModal shows correctly
- Settings page with sign-in/out buttons

### ⚠️ Current Issue:
The `App.openUrl()` call should open the sign-up and subscription pages in the **phone's system browser** (Chrome), but we need to test if:
1. It actually opens in Chrome (not in-app browser)
2. The design looks good in Chrome
3. Clerk sign-up completes successfully
4. The "Return to app" message appears after sign-up
5. User can successfully subscribe and payment syncs

### 🎯 What Needs Testing:
1. Click "Create Account on Web" on `/sign-in` page
2. Verify it opens in Chrome (not Capacitor in-app browser)
3. Complete sign-up in Chrome
4. Verify success page appears with "Return to app" message
5. Return to app and sign in
6. Try to access premium practice
7. Click "Upgrade to Pro"
8. Verify `/subscribe-web` opens in Chrome
9. Complete payment with Clerk PricingTable
10. Return to app and verify full access

## Technical Constraints

### Next.js + Capacitor Patterns:
- **Always** use `'use client'` in pages that use Capacitor
- **Always** dynamically import Capacitor plugins
- **Always** use `Capacitor.isNativePlatform()` to gate native code
- **Never** import `@capacitor/app` statically at top level

### Ionic + React Router:
- Use `IonPage`, `IonContent`, `IonHeader` for page structure
- Use Ionic components for mobile UI (`IonButton`, `IonList`, etc.)
- Navigation uses React Router Dom (`useHistory`, `useParams`)

### Access Control Logic:
```typescript
// First practice of first flow is always free
if (flowIndex === 0 && practiceIndex === 0) return true;

// Organization users get full access
if (userType === 'organization') return true;

// Pro subscribers get full access
if (userType === 'pro') return true;

// Everyone else is locked out
return false;
```

## File Structure
```
/app
  /sign-in/[[...sign-in]]/page.tsx
  /sign-up-web/[[...sign-up]]/page.tsx
  /signup-success/page.tsx
  /subscribe/page.tsx
  /subscribe-web/page.tsx
  /post-signup-redirect/page.tsx
  /home/page.tsx
  layout.tsx
/components
  /pages
    Home.tsx
    Flows.tsx
    FlowDetail.tsx
    Practice.tsx
    Settings.tsx
    MyProgress.tsx
  PaywallModal.tsx
  CapacitorBrowserBlock.tsx
/hooks
  useAccessControl.ts
/store
  actions.ts
  index.ts
/data
  flows.json (meditation flows data)
/capacitor.config.json
```

## Next Steps Needed

1. **Test the external browser flow** - Verify `App.openUrl()` works correctly
2. **Fix any UI/UX issues** in the web sign-up and subscription pages
3. **Test subscription sync** - Ensure payment status updates in app
4. **Handle edge cases**:
   - What if user closes browser mid-signup?
   - What if user closes browser mid-payment?
   - What if network fails during sync?
5. **Add loading states** where needed
6. **Test on actual Android device** (not just emulator)

## Questions to Ask Me

1. Does clicking "Create Account on Web" open Chrome (your phone's browser)?
2. How does the sign-up page look in Chrome?
3. After signing up, do you see the "Return to app" success message?
4. Does the subscription page open in Chrome?
5. Does the Clerk PricingTable show properly with real pricing?
6. After payment, does your subscription sync automatically in the app?

## Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Build Android APK
npm run make-android-release

# Deploy to Vercel
git push origin main
```

---

**Current Status**: We've implemented the web-only sign-up and payment flow using `App.openUrl()` to open external browser. Ready for testing on actual device to verify it opens in system browser (Chrome) and not in-app browser.
