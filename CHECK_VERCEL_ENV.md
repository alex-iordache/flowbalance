# 🔍 Verify Vercel Environment Variables

## The Issue

Google OAuth sign-up redirects to `/sign-in` instead of `/post-signup-redirect`.

This means Clerk is NOT using the correct redirect URL for sign-ups.

---

## ✅ What You Need to Check RIGHT NOW in Vercel

Go to: **https://vercel.com/your-account/flowbalance/settings/environment-variables**

### Look for These Exact Variable Names:

Copy and paste this checklist, then check YES or NO for each:

```
[ ] NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL exists?
    Value: _________________

[ ] NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL exists?
    Value: _________________

[ ] NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL exists?
    Value: _________________

[ ] NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL exists?
    Value: _________________

[ ] NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL exists? (deprecated)
    Value: _________________

[ ] NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL exists?
    Value: _________________
```

---

## 🔴 Critical Issues to Check:

### Issue 1: Variable Doesn't Exist
If `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` doesn't exist at all, that's the problem!

**Fix:**
```
Add: NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
Then: Redeploy from Deployments tab
```

### Issue 2: Variable Has Wrong Value
If it exists but has value `/home` or `/sign-in`, that's the problem!

**Fix:**
```
Change to: /post-signup-redirect
Then: Redeploy from Deployments tab
```

### Issue 3: Typo in Variable Name
Check for typos like:
- `NEXT_PUBLIC_CLERK_SIGNUP_FORCE_REDIRECT_URL` (missing underscore)
- `NEXT_PUBLIC_CLERK_SIGN_UP_REDIRECT_URL` (missing FORCE)
- `CLERK_SIGN_UP_FORCE_REDIRECT_URL` (missing NEXT_PUBLIC)

**Fix:**
```
Delete wrong variable
Add correct: NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
Then: Redeploy
```

### Issue 4: Variable Not Applied to All Environments
Vercel has three environments: Production, Preview, Development

Make sure the variable is checked for **Production** environment!

---

## 📋 Correct Vercel Environment Variables

Your variables should look EXACTLY like this:

```bash
# API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9wdWxhci1naWJib24tNjIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4pYAh6MWw2EhVcuQuQfIc80TJzsyigEdSrA7eV95nl

# Page URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Sign-in redirects (for existing users)
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home

# ⭐ Sign-up redirects (for NEW users) - THESE ARE CRITICAL!
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/post-signup-redirect
```

---

## 🚨 After Checking, Do This:

1. **Take a screenshot** of your actual Vercel environment variables
2. **Share the screenshot** (or list them here)
3. If anything is wrong, fix it and **REDEPLOY**
4. After redeploy, **uninstall/reinstall app** on phone
5. Test again

---

## Alternative: Check Using Vercel CLI

If you have Vercel CLI installed:

```bash
vercel env ls
```

This will show all environment variables. Look for the SIGN_UP ones.

---

## 🎯 Expected Behavior After Fix

When you sign up with Google:
1. Opens Google in browser ✅
2. Completes OAuth ✅
3. Redirects to `flowbalance-jdk.vercel.app/post-signup-redirect` ⭐
4. Shows "Setting up your account..." loading screen
5. Checks organization
6. Redirects to `/subscribe` (regular user) or `/home` (org user) ✅

---

## If Variables Are Correct But Still Not Working

Check these in **Clerk Dashboard**:

### Option 1: Paths Configuration
Go to: **Clerk Dashboard → Configure → Paths**

Check these settings:
```
Sign-up URL: /sign-up
After sign-up URL: /post-signup-redirect (or leave EMPTY)
Sign-in URL: /sign-in
After sign-in URL: /home (or leave EMPTY)
```

### Option 2: Development vs Production Instance
Are you testing on Development or Production instance in Clerk?

OAuth might behave differently in dev vs prod.

Check: **Clerk Dashboard → Top left → Instance dropdown**

Make sure you're looking at the correct instance (Development or Production).

---

## Debug: Check What Clerk Sees

Add this to your sign-up page temporarily to see what Clerk is using:

```typescript
// Add to app/sign-up/[[...sign-up]]/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SignUpPage() {
  useEffect(() => {
    console.log('🔍 Clerk Environment Variables:');
    console.log('SIGN_UP_URL:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL);
    console.log('SIGN_UP_FORCE_REDIRECT:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL);
    console.log('SIGN_UP_FALLBACK_REDIRECT:', process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL);
  }, []);

  return (
    <div className="...">
      <SignUp ... />
    </div>
  );
}
```

Deploy this, open the app, go to sign-up page, and check browser console.

It will show you what values Clerk is actually seeing.

---

## Summary

**MOST LIKELY ISSUE:**
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` is either:
  - ❌ Not set at all
  - ❌ Set to wrong value (`/home` or `/sign-in`)
  - ❌ Typo in variable name
  - ❌ Not applied to Production environment

**FIX:**
1. Check exact variable name and value in Vercel
2. Set to `/post-signup-redirect`
3. Redeploy
4. Test

**Please share your actual Vercel environment variables (you can redact the API keys) so I can see exactly what's set!**
