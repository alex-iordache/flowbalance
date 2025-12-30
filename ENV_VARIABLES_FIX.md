# Environment Variables Fix - OAuth Redirect Issue

## 🎯 Root Cause

According to [Clerk's documentation](https://clerk.com/docs/guides/development/customize-redirect-urls):

> **Environment variables take precedence over component props.**

The redirect hierarchy is:
1. ✅ **Environment Variables** (highest priority - FORCE > FALLBACK)
2. ❌ Component props (`afterSignUpUrl`, `forceRedirectUrl`) - Can be overridden

**Our issue**: Component props in `sign-up/page.tsx` are being overridden by Vercel environment variables.

---

## ✅ Solution: Use Environment Variables

### Required Vercel Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

#### Add/Update These Variables:

```env
# Clerk API Keys (keep these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9wdWxhci1naWJib24tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4pYAh6MWw2EhVcuQuQfIc80TJzsyigEdSrA7eV95nl

# Sign-up/Sign-in page URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Sign-in redirects (for EXISTING users)
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home

# ⭐ Sign-up redirects (for NEW users) - THE KEY FIX!
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/post-signup-redirect
```

#### Remove These If They Exist:

```
❌ NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL (deprecated)
❌ Any variable with value /home for sign-up
❌ Any variable with value /sign-in for sign-up
```

---

## 🔍 Why FORCE_REDIRECT_URL?

From Clerk docs:

**FORCE** = Always redirects here, even if `redirect_url` query param exists
**FALLBACK** = Only used if no `redirect_url` query param exists

For OAuth (Google sign-up), Clerk might add a `redirect_url` query param, so we use **FORCE** to ensure it always goes to our post-signup-redirect page.

---

## 📋 Verification Checklist

After updating Vercel environment variables:

- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect` added
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/post-signup-redirect` added
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home` set
- [ ] No deprecated `AFTER_SIGN_UP_URL` variables
- [ ] Clicked "Save" in Vercel
- [ ] **Redeployed** from Vercel Deployments tab
- [ ] Updated local `.env.local` file (created in project)
- [ ] Cleared app data on phone or reinstalled app
- [ ] Tested sign-up with Google

---

## 🧪 Testing After Deploy

### Test 1: New User Sign-Up with Google
```
1. Open app
2. Click locked practice
3. PaywallModal → "Sign Up & Subscribe"
4. Should go to /sign-up page
5. Click "Sign up with Google"
6. Authenticate with Google (opens external browser)
7. ⭐ Should redirect to /post-signup-redirect (loading screen)
8. ⭐ Then redirect to /subscribe (pricing table)
```

### Test 2: Existing User Sign-In
```
1. Open app
2. Settings → "Sign In"
3. Sign in with existing account
4. Should go to /home ✅
```

### Test 3: Organization User Sign-Up
```
1. Sign up with user@jordache.me
2. Should go to /post-signup-redirect (loading screen)
3. Should redirect to /home (skip subscribe) ✅
```

---

## 🚨 If It Still Doesn't Work

### Check Clerk Dashboard Paths

Go to: **Clerk Dashboard → Configure → Paths**

Verify these settings:
```
Sign-up URL: /sign-up
After sign-up URL: /post-signup-redirect (or leave empty)
Sign-in URL: /sign-in
After sign-in URL: /home
```

### Check for Conflicting Environment Variables

In Vercel, look for any environment variables that might conflict:
- Variables ending in `_URL` related to sign-up
- Variables with `/home` or `/sign-in` values for sign-up flows

### Debug Console Logs

After sign-up with Google, check browser console for:
```
[PostSignupRedirect] Debug: { ... }
```

Share these logs to help diagnose the issue.

---

## 📚 Documentation References

- [Clerk: Customize Redirect URLs](https://clerk.com/docs/guides/development/customize-redirect-urls)
- [Clerk: Custom Sign-Up Page](https://clerk.com/docs/nextjs/guides/development/custom-sign-up-page)
- [Clerk: Environment Variables Priority](https://clerk.com/docs/guides/development/customize-redirect-urls#environment-variables)

---

## Summary

**The Fix:**
1. ✅ Add `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect` in Vercel
2. ✅ Redeploy from Vercel
3. ✅ Test sign-up with Google

**Why This Works:**
- Environment variables override component props
- FORCE_REDIRECT_URL ensures OAuth redirects go to our page
- Our `/post-signup-redirect` page handles org vs regular user logic

**Expected Flow:**
```
Sign Up → Google OAuth → /post-signup-redirect → Check Org → /subscribe or /home ✅
```
