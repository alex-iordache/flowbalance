# Vercel Environment Variables Check

## ⚠️ Important: Remove These If They Exist

Go to your Vercel Dashboard → Your Project → Settings → Environment Variables

### Variables That MUST BE REMOVED:

❌ `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Remove this if it exists!
❌ `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` - Remove this if it exists!

These environment variables override the `forceRedirectUrl` prop on the `<SignUp>` component.

### Variables That Should Exist:

✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Keep this
✅ `CLERK_SECRET_KEY` - Keep this
✅ `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` - Keep this
✅ `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` - Keep this
✅ `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home` - Keep this (for existing users)

### Correct Environment Variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
```

**DO NOT SET** `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - We handle this in code now!

---

## 🔄 New Redirect Flow

### How It Works Now:

1. **User Signs Up**
   - Goes to `/sign-up` page
   - Completes sign-up with Clerk
   
2. **Clerk Redirects**
   - `forceRedirectUrl="/post-signup-redirect"` forces redirect to our page
   
3. **Post-Signup Page Checks Organization**
   - Loads user data
   - Loads organization data
   - Makes decision:
     - Has organization? → `/home` (Type B user)
     - No organization? → `/subscribe` (Type A user)

### Why This Approach?

The previous approach (useEffect in sign-up page) had a timing issue:
- Clerk's SignUp component has built-in redirect logic
- Environment variables can override component props
- useEffect might run before organization data loads

The new approach:
- Uses `forceRedirectUrl` to guarantee redirect to our page
- Dedicated page waits for all data to load (with 500ms buffer)
- Makes decision with complete information
- Console logs for debugging

---

## 🧪 Testing

After deploying:

1. **Clear all browser cookies and cache**
2. **Test Regular User**:
   ```
   Sign up with: test+1@gmail.com
   Should see: "Setting up your account..." loading screen
   Then redirect to: /subscribe ✅
   ```

3. **Test Organization User**:
   ```
   Sign up with: test+1@jordache.me
   Should see: "Setting up your account..." loading screen
   Then redirect to: /home ✅
   ```

4. **Check Browser Console**:
   Look for logs like:
   ```
   [PostSignupRedirect] Debug: { isLoaded: true, userId: "user_...", orgLoaded: true, hasOrg: false }
   [PostSignupRedirect] User authenticated, checking organization...
   [PostSignupRedirect] Regular user (no organization)
   [PostSignupRedirect] Redirecting to /subscribe
   ```

---

## 🚨 If It Still Redirects to /home:

### 1. Check Vercel Environment Variables
- Remove `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` if it exists
- Redeploy after removing

### 2. Check Browser Console
- Look for console logs from `[PostSignupRedirect]`
- What does it say about organization?
- Share the logs with developer

### 3. Are You Using Sign-In vs Sign-Up?
- **Sign In** (existing user) → Always goes to `/home` ✅ Correct!
- **Sign Up** (new user) → Should go through post-signup-redirect

### 4. Clear Clerk Session
```javascript
// In browser console:
localStorage.clear();
sessionStorage.clear();
// Then refresh page
```

### 5. Check Clerk Dashboard
- Go to Paths in Clerk Dashboard
- Make sure there are no hardcoded redirects there

---

## 📝 After Fixing

Once working correctly, you should see:

### New User (Gmail) Flow:
```
/sign-up 
  → Complete signup
  → /post-signup-redirect (loading screen)
  → /subscribe (pricing table) ✅
```

### New User (Org) Flow:
```
/sign-up 
  → Complete signup with @jordache.me
  → /post-signup-redirect (loading screen)
  → /home (all practices unlocked) ✅
```

### Existing User Flow:
```
/sign-in
  → Complete sign-in
  → /home ✅
```

---

## 🎯 Next Steps

1. ✅ Check Vercel environment variables (remove AFTER_SIGN_UP_URL if exists)
2. ✅ Deploy updated code
3. ✅ Clear browser cache and cookies
4. ✅ Test with new email addresses (test+2@gmail.com, test+2@jordache.me)
5. ✅ Check browser console for logs
6. ✅ Report what you see in console

If it still doesn't work after this, share the console logs!
