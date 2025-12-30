# OAuth Troubleshooting - Still Redirecting Wrong

## Current Status
- ✅ Environment variable set: `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect`
- ✅ Mobile OAuth allowlist configured in Clerk Dashboard
- ✅ Tested with deleted account
- ✅ Tested with brand new phone + new Google account
- ❌ Still redirecting to wrong page (/sign-in or /home instead of /subscribe)

---

## Critical Questions to Answer:

### 1. What URL does it actually redirect to?

When you sign up with Google on mobile, after the OAuth completes, **what exact URL do you see?**

Check the URL bar in the browser (if it opens in browser) or check the WebView URL.

Is it:
- `https://flowbalance-jdk.vercel.app/sign-in`
- `https://flowbalance-jdk.vercel.app/home`
- `https://flowbalance-jdk.vercel.app/post-signup-redirect`
- Something else?

### 2. Did you deploy the latest code?

The code with account age detection needs to be deployed. Check:

```bash
git log -1 --oneline
```

Should show: "Fix OAuth redirect: detect new users on sign-in page..."

If not, deploy:
```bash
git add .
git commit -m "Fix OAuth redirect with account age detection"
git push origin main
```

### 3. Check Browser Console Logs

After signing up with Google, check browser console (if accessible). Look for logs like:

```
[SignIn] New user detected (account age: Xs), redirecting to post-signup-redirect
[SignIn] Existing user, redirecting to home
[PostSignupRedirect] Debug: { ... }
```

---

## Possible Root Causes:

### Issue 1: Google Cloud Console Redirect URIs

Google OAuth has its own redirect URI configuration that's separate from Clerk.

**Check Google Cloud Console:**
1. Go to: https://console.cloud.google.com/
2. Select your project
3. APIs & Services → Credentials
4. Find your OAuth 2.0 Client ID for the app
5. Check "Authorized redirect URIs"

**What should be there:**
```
https://accounts.clerk.dev/v1/oauth_callback
https://YOUR-CLERK-FRONTEND-API.clerk.accounts.dev/v1/oauth_callback
```

**If you see custom URIs like:**
```
https://flowbalance-jdk.vercel.app/oauth-callback
https://flowbalance-jdk.vercel.app/sign-in
```

That might be the issue - these should be Clerk's callback URLs, not your app's URLs.

### Issue 2: Clerk Dashboard Paths Configuration

**Go to: Clerk Dashboard → Configure → Paths**

Check these settings:
```
Sign-up URL: /sign-up
After sign-up URL: [LEAVE EMPTY or set to /post-signup-redirect]
Sign-in URL: /sign-in
After sign-in URL: [LEAVE EMPTY or set to /home]
```

**Important:** If "After sign-up URL" is set to something else (like `/home` or `/sign-in`), it will override the environment variable!

**Try setting "After sign-up URL" to EMPTY and save.**

### Issue 3: OAuth Provider Settings in Clerk

**Go to: Clerk Dashboard → SSO Connections → Google**

Look for any redirect URL settings in the Google provider configuration itself.

Some things to check:
- Is there a "Redirect URL" field? What's it set to?
- Is there an "After OAuth callback" setting?
- Any custom configuration that might override the default behavior?

### Issue 4: Development vs Production Instance

**Check: Clerk Dashboard → Top left corner**

Are you testing against:
- Development instance?
- Production instance?

OAuth might behave differently. Make sure your Google OAuth credentials are configured for the correct instance.

Also check:
- Are your Vercel environment variables set for Production environment?
- Is your mobile app pointing to the Production deployment?

---

## Debug Steps:

### Step 1: Enable Detailed Logging

Add this to `/app/sign-in/[[...sign-in]]/page.tsx` at the very top of the useEffect:

```typescript
useEffect(() => {
  console.log('🔍 [SignIn] Page loaded');
  console.log('isLoaded:', isLoaded);
  console.log('userId:', userId);
  console.log('user:', user);
  console.log('user.createdAt:', user?.createdAt);
  console.log('account age seconds:', user?.createdAt ? (Date.now() - new Date(user.createdAt).getTime()) / 1000 : 'N/A');
  
  // Rest of the code...
}, [isLoaded, userId, user]);
```

Deploy this, then check console logs when signing up.

### Step 2: Add Logging to post-signup-redirect

Make sure the post-signup-redirect page is actually being hit.

Check if you see these logs in console:
```
[PostSignupRedirect] Debug: { ... }
```

If you DON'T see these logs, the page is never being reached.

### Step 3: Test Direct URL Access

After deploying, try accessing these URLs directly in your phone's browser:

1. `https://flowbalance-jdk.vercel.app/post-signup-redirect`
   - Should show "Setting up your account..." loading screen
   - Then redirect based on org status

2. `https://flowbalance-jdk.vercel.app/sign-in`
   - Should show sign-in page

If /post-signup-redirect doesn't work when accessed directly, there might be a routing issue.

---

## Nuclear Option: Simplify for Testing

Let's eliminate variables. Temporarily set BOTH sign-in and sign-up to redirect to the same place:

**In Vercel Environment Variables, ADD:**
```
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/post-signup-redirect
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
```

This way, NO MATTER WHAT (sign-in or sign-up), it should go to /post-signup-redirect.

Then:
1. Redeploy from Vercel
2. Test again with Google OAuth
3. If it NOW goes to /post-signup-redirect, we know the environment variables work
4. If it STILL doesn't work, the issue is elsewhere (Google Cloud Console, Clerk Paths, etc.)

---

## Action Items:

Please check and report back:

1. **What exact URL do you land on after Google OAuth?**
2. **Did you deploy the latest code?** (run `git log -1`)
3. **Check Clerk Dashboard → Configure → Paths** - What is "After sign-up URL" set to?
4. **Try the Nuclear Option** - Set BOTH SIGN_IN and SIGN_UP force redirect URLs to /post-signup-redirect
5. **Check browser console logs** - Any errors or relevant logs?

Once I know these answers, I can pinpoint the exact issue!
