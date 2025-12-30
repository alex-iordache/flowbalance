# OAuth Redirect Issue - Google Sign-Up Goes to /sign-in

## The Problem

When signing up with Google OAuth:
1. Opens Google in external browser ✅
2. User authenticates with Google ✅
3. Redirects back to app
4. **Goes to `/sign-in` instead of `/post-signup-redirect`** ❌

## Why This Happens

OAuth redirects are controlled by:
1. **Clerk Dashboard** OAuth settings
2. **Vercel Environment Variables**

Our `forceRedirectUrl` prop only works for email/password flows, NOT for OAuth flows.

---

## Fix 1: Check Vercel Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

### Look for these variables:

❌ **REMOVE** if they exist:
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home
```

✅ **ADD** this variable:
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/post-signup-redirect
```

### Your environment variables should be:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/post-signup-redirect
```

**After adding/changing:**
1. Click "Save"
2. **IMPORTANT**: Redeploy your app (Vercel → Deployments → Redeploy)

---

## Fix 2: Check Clerk Dashboard

Go to: **Clerk Dashboard → Configure → Paths**

### Check these settings:

**Sign-up URL**
```
/sign-up
```

**After sign-up URL**
```
/post-signup-redirect
```

**Sign-in URL**
```
/sign-in
```

**After sign-in URL**
```
/home
```

**IMPORTANT**: Make sure "After sign-up URL" is set to `/post-signup-redirect`, NOT `/home` or `/sign-in`!

---

## Fix 3: Check OAuth Provider Settings (Google)

Go to: **Clerk Dashboard → Configure → SSO Connections → Google**

Under **Redirect URLs**, ensure it includes:
```
https://flowbalance-jdk.vercel.app
capacitor://localhost
```

---

## Alternative Solution: Update sign-up/page.tsx

If environment variables don't work, we can use Clerk's `afterSignUpUrl` prop directly:

```typescript
<SignUp 
  signInUrl="/sign-in"
  afterSignUpUrl="/post-signup-redirect"  // Add this
  forceRedirectUrl="/post-signup-redirect"
  appearance={{...}}
/>
```

Let me implement this as a backup:
