# Testing Guide - Clerk Authentication

Your app is now configured to use **Clerk authentication** with your **Vercel deployment**.

## What Was Configured

✅ **Vercel URL**: `https://flowbalance-jdk.vercel.app`  
✅ **Capacitor Config**: Updated to point to Vercel  
✅ **Clerk Integration**: Using official `@clerk/nextjs` SDK  
✅ **Environment Variables**: Set in Vercel deployment  

## Important Note About Redirects

**You do NOT need to configure OAuth redirect URLs manually in Clerk Dashboard!**

With the modern `@clerk/nextjs` SDK, Clerk automatically handles redirects for your Next.js app based on your deployment domain. The redirect URLs are automatically inferred and managed by Clerk.

## Testing Steps

### 1. Test in Browser First

Before testing on mobile, verify the auth flow works in a browser:

1. **Visit your Vercel URL**:
   ```
   https://flowbalance-jdk.vercel.app
   ```

2. **You should be redirected to `/sign-in`**

3. **Click "Continue with Google"**

4. **Complete Google authentication**

5. **You should be redirected to `/home`** and see your app content

6. **Go to Settings** and click "Sign Out"

7. **You should be redirected back to `/sign-in`**

**If this works in the browser, the OAuth setup is correct!**

---

### 2. Install Dependencies & Sync

Before building for mobile:

```bash
cd /Users/alexandru.iordache/FlowBalance/flowbalance

# Install new Clerk package
npm install

# Sync Capacitor with new config
npx cap sync android
```

---

### 3. Test on Mobile

#### Build and Run:

```bash
# Build for Android
npm run android:dev

# Or build release APK
npm run make-android-release
```

#### What to Expect:

1. **App opens** → Shows loading/splash screen
2. **App loads from Vercel** → You see the sign-in page
3. **Click "Continue with Google"** → Opens Google auth page
4. **Complete authentication** → Redirected back to app
5. **App shows home screen** → You're signed in!
6. **Navigate to Settings** → Click "Sign Out"
7. **Back to sign-in page** → You're signed out

---

## Troubleshooting

### Issue: App shows blank screen

**Cause**: Cannot reach Vercel server  
**Solution**:
- Check internet connection on device
- Verify Vercel URL is correct: `https://flowbalance-jdk.vercel.app`
- Test the URL in phone browser first

---

### Issue: "Sign in with Google" doesn't work

**Cause**: OAuth not configured correctly  
**Solution**:
1. Test in browser first (see step 1 above)
2. If browser works, mobile should work too
3. If browser doesn't work, check Vercel environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

---

### Issue: After Google auth, stays in browser

**Cause**: This shouldn't happen with the new setup, but if it does:  
**Solution**:
- The app loads from Vercel, so auth happens in the same webview
- There's no redirect to external browser anymore
- Everything happens within the app

---

### Issue: Can't build - "module not found @clerk/clerk-react"

**Cause**: Old dependency still referenced  
**Solution**:
```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Sign out doesn't work

**Cause**: Clerk instance not available  
**Solution**:
- Check browser console for errors
- Verify `@clerk/nextjs` is installed: `npm list @clerk/nextjs`
- Clear browser/app cache

---

## Verification Checklist

Before considering this done, verify:

- [ ] Browser: Can sign in with Google
- [ ] Browser: Can sign out
- [ ] Browser: Redirects to /home after sign-in
- [ ] Browser: Redirects to /sign-in after sign-out
- [ ] Mobile: App loads from Vercel
- [ ] Mobile: Can sign in with Google
- [ ] Mobile: Can navigate between tabs
- [ ] Mobile: Can sign out from Settings

---

## Network Requirements

⚠️ **Your mobile app now requires internet connectivity**

The app is no longer a static bundle. It connects to your Vercel server:
- Loads UI from server
- Authenticates via server
- Fetches data from server

**Benefits:**
- ✅ OAuth works correctly
- ✅ Can update server without rebuilding mobile app
- ✅ Real server-side authentication
- ✅ Session management

**Trade-offs:**
- ⚠️ Requires internet connection
- ⚠️ Slight latency from server requests

---

## Next Steps After Testing

Once everything works:

1. **Remove debug logs** (if any were added)
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Integrate Clerk authentication with Vercel deployment"
   git push
   ```
3. **Vercel will auto-deploy** the updated code

4. **Consider custom domain** (optional):
   - In Vercel dashboard, add a custom domain
   - Update Capacitor config with new domain
   - Re-sync and rebuild

---

## Development Workflow

### For Local Development:

1. **Find your local IP**:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   # Example: 192.168.1.100
   ```

2. **Update Capacitor config temporarily**:
   ```json
   {
     "server": {
       "url": "http://192.168.1.100:3000"
     }
   }
   ```

3. **Start dev server**:
   ```bash
   npm run dev
   ```

4. **Run on device**:
   ```bash
   npx cap sync
   npx cap run android
   ```

5. **Before production build**, restore Vercel URL in config!

---

## Support

If you encounter issues:
1. Check browser first - if it works, mobile should work
2. Verify Vercel deployment is live and environment variables are set
3. Check Capacitor config has correct Vercel URL
4. Ensure internet connectivity on device

**The setup is now complete!** Test thoroughly and report any issues.
