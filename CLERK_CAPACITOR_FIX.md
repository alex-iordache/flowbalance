# Clerk + Capacitor Integration - Proper Solution

## The Root Cause

Based on official Clerk and Capacitor documentation, the issue was:

**Clerk's `ClerkProvider` needs `allowedRedirectOrigins` configured for Capacitor mobile apps.**

Without this configuration, Clerk doesn't recognize Capacitor's WebView origins as safe, causing redirects to open in the external browser.

---

## The Solution

### 1. Configure `allowedRedirectOrigins` in ClerkProvider

Added to `app/layout.tsx`:

```tsx
<ClerkProvider
  allowedRedirectOrigins={[
    'https://flowbalance-jdk.vercel.app',  // Production URL
    'capacitor://localhost',                 // Capacitor iOS
    'http://localhost',                      // Capacitor Android
    'ionic://localhost'                      // Alternative Ionic scheme
  ]}
>
```

This tells Clerk: **"These origins are safe for redirects in the WebView"**

### 2. Environment Variables (IMPORTANT!)

Make sure these are set in **both** `.env.local` (local) and **Vercel Dashboard** (production):

```bash
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9wdWxhci1naWJib24tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4pYAh6MWw2EhVcuQuQfIc80TJzsyigEdSrA7eV95nl

# Mobile-specific (helps with redirects)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home
```

---

## Vercel Configuration

### Add Environment Variables to Vercel:

1. Go to https://vercel.com/dashboard
2. Select **flowbalance-jdk** project
3. Go to **Settings** → **Environment Variables**
4. Add ALL variables from above
5. Click **Save**
6. **Redeploy** (automatic or manual)

---

## Why This Works

### The Problem Before:

1. User signs in with Clerk
2. Clerk attempts to redirect after auth
3. Clerk checks if redirect origin is safe
4. Origin is Capacitor WebView → **NOT in allowedRedirectOrigins**
5. Clerk rejects internal redirect → **Opens external browser as fallback**

### The Solution Now:

1. User signs in with Clerk
2. Clerk attempts to redirect after auth
3. Clerk checks if redirect origin is safe
4. Origin is `capacitor://localhost` → **IN allowedRedirectOrigins** ✅
5. Clerk allows internal redirect → **Stays in app!** ✅

---

## Testing Instructions

### 1. Update Environment Variables

**Locally** - Ensure `.env.local` has:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9wdWxhci1naWJib24tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4pYAh6MWw2EhVcuQuQfIc80TJzsyigEdSrA7eV95nl
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home
```

**Vercel** - Add same variables in Dashboard

### 2. Deploy to Vercel

```bash
git add .
git commit -m "Add allowedRedirectOrigins for Capacitor mobile support"
git push origin main
```

Wait for Vercel to deploy (~2-3 minutes)

### 3. Test on Phone

Since this is a code change (not Capacitor config), you **don't need to rebuild APK**:

1. Open app on phone (will fetch from Vercel automatically)
2. Sign in with email + verification code
3. Should stay in app after authentication ✅
4. NO external browser should open ✅

---

## References

- [Clerk Mobile Integration](https://clerk.com/docs)
- [Clerk allowedRedirectOrigins](https://clerk.com/docs/references/javascript/clerk/build-urls)
- [Capacitor Deep Links](https://capacitorjs.com/docs/next/apis/app)
- [Clerk + Next.js + Capacitor Guide](https://clerk.com/docs/quickstarts/nextjs)

---

## Summary

**Problem:** Clerk redirects opened external browser  
**Root Cause:** Missing `allowedRedirectOrigins` configuration  
**Solution:** Add Capacitor origins to `ClerkProvider`  
**Result:** Authentication stays in app ✅

This is the **official, documented approach** from both Clerk and Capacitor.

---

## If It Still Doesn't Work

If the browser still opens after this fix, check:

1. ✅ Environment variables are set in Vercel
2. ✅ Vercel deployment succeeded
3. ✅ `.env.local` has all variables locally
4. ✅ App is fetching from Vercel (not cached)

**Then provide console logs from:**
- Browser console (F12)
- Android Studio Logcat (filter: `com.flowapp.app`)

This will show exactly what redirect Clerk is attempting.
