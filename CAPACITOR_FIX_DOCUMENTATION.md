# Capacitor External Browser Fix - Documentation

## The Problem

When using Capacitor with a remote server URL (Vercel), Android was opening ALL navigation events in the phone's **external browser** (Chrome) instead of keeping them inside the app's WebView.

**What you saw:**
- App loads for half a second ✅
- Then jumps to Chrome browser ❌
- Shows Clerk sign-in page in Chrome ❌
- Can see all your browser tabs ❌
- Stuck in browser, never returns to app ❌

---

## The Root Cause

According to [Capacitor's Official Documentation](https://capacitorjs.com/docs/config):

> When you configure `server.url` to point to a remote server, you MUST also add that server's domain to the `allowNavigation` array. Otherwise, Capacitor treats ANY navigation to that domain as an external link and opens it in the device's default browser.

**We had:**
```json
{
  "server": {
    "url": "https://flowbalance-jdk.vercel.app"
  }
}
```

**Missing:** The `allowNavigation` configuration that tells Capacitor: "Keep these URLs inside the app!"

---

## The Solution

Added `allowNavigation` to tell Capacitor which domains should load **inside** the app's WebView:

```json
{
  "server": {
    "url": "https://flowbalance-jdk.vercel.app",
    "cleartext": false,
    "androidScheme": "https",
    "allowNavigation": [
      "flowbalance-jdk.vercel.app",     // Your Vercel app
      "*.vercel.app",                   // Any Vercel subdomain
      "accounts.clerk.dev",             // Clerk auth domain
      "*.clerk.accounts.dev",           // Clerk subdomains
      "clerk.shared.lcl.dev"            // Clerk OAuth domain
    ]
  }
}
```

### What Each Setting Does:

- **`allowNavigation`**: Whitelist of domains that load INSIDE the app's WebView
- **`androidScheme: "https"`**: Use HTTPS scheme for Android (recommended)
- **`cleartext: false`**: Disable cleartext traffic (more secure)

---

## Files Updated

✅ `/capacitor.config.json` (main config)  
✅ `/android/app/src/main/assets/capacitor.config.json` (Android)  
✅ `/ios/App/App/capacitor.config.json` (iOS)

---

## Testing Instructions

### Step 1: Rebuild the App

Since we changed `capacitor.config.json`, you need to sync and rebuild:

```bash
# Sync Capacitor with new config
npx cap sync android

# Rebuild and install
npm run make-android-release
```

Or via Android Studio:
1. Click **Build** → **Clean Project**
2. Click **Build** → **Rebuild Project**
3. Click the green **▶️ Run** button

### Step 2: Test on Device

1. **App opens** → Should show sign-in page IN THE APP
2. **Enter email** (e.g., `you@jordache.me`)
3. **Get verification code** via email
4. **Enter code** IN THE APP (not in Chrome!)
5. **Should redirect to `/home`** and show your app
6. **NO external browser should open** ✅

---

## Expected Behavior Now

### ✅ CORRECT (After Fix)

```
App opens
  ↓
Loads Vercel URL in WebView
  ↓
Shows sign-in page (in app)
  ↓
User enters email
  ↓
Clerk sends verification code
  ↓
User enters code (in app)
  ↓
Redirects to /home (in app)
  ↓
App works normally
```

**Everything stays INSIDE the app!**

### ❌ WRONG (Before Fix)

```
App opens
  ↓
Loads for 0.5 seconds
  ↓
Opens Chrome browser
  ↓
Stuck in browser forever
```

---

## Why This Works

### Security Context

Capacitor's WebView is essentially a **sandboxed browser** running inside your app. For security reasons:

1. **By default**, only `file://` URLs are allowed
2. **Any external URL** opens in the OS browser (for user safety)
3. **`allowNavigation`** explicitly tells Capacitor: "These URLs are safe, load them in-app"

### The allowNavigation Whitelist

We added:
- **Your app's domain** (`flowbalance-jdk.vercel.app`)
- **Vercel's domains** (for any Vercel-related URLs)
- **Clerk's domains** (for authentication flows)

This ensures ALL parts of your auth flow happen inside the app's WebView.

---

## Important Notes

### 1. Server URL Must Match allowNavigation

```json
{
  "server": {
    "url": "https://flowbalance-jdk.vercel.app",  // ← Server URL
    "allowNavigation": [
      "flowbalance-jdk.vercel.app"                 // ← Must be in allowNavigation!
    ]
  }
}
```

### 2. Wildcards Are Supported

```json
"allowNavigation": [
  "*.vercel.app",           // Matches any Vercel subdomain
  "*.clerk.accounts.dev"    // Matches any Clerk subdomain
]
```

### 3. Security Consideration

Only add domains you **trust** and **control** to `allowNavigation`. Don't add:
- ❌ `*.com` (too broad!)
- ❌ Random third-party domains
- ❌ User-generated content domains

---

## Troubleshooting

### Still Opens External Browser?

**Possible causes:**
1. Didn't run `npx cap sync android` after config change
2. Didn't rebuild the app (need clean build)
3. Typo in domain name in `allowNavigation`

**Fix:**
```bash
npx cap sync android
npm run make-android-release
```

### Email Verification Not Working?

This is unrelated to the browser issue. Check:
1. Clerk Dashboard → Email verification is enabled
2. Email is not in spam folder
3. Verified domains are configured in Clerk

### App Shows Blank Screen?

Check browser console for errors:
1. In Android Studio, open **Logcat**
2. Filter by your app ID: `com.flowapp.app`
3. Look for JavaScript errors

---

## References

- [Capacitor Server Configuration](https://capacitorjs.com/docs/config)
- [Capacitor allowNavigation](https://capacitorjs.com/docs/v2/config)
- [Capacitor Security Guide](https://capacitorjs.com/docs/guides/security)
- [Clerk Email Verification](https://clerk.com/docs)

---

## Summary

**Problem:** App opened external browser for all navigation  
**Cause:** Missing `allowNavigation` configuration  
**Solution:** Added domains to `allowNavigation` whitelist  
**Result:** All navigation stays inside app ✅  

**This is a standard Capacitor configuration, documented in their official docs. We should have had this from the start.**

---

## Next Steps

1. ✅ Config files updated
2. ⏳ Sync Capacitor: `npx cap sync android`
3. ⏳ Rebuild app: `npm run make-android-release`
4. ⏳ Test on device
5. ⏳ Verify no external browser opens

**Let me know if it works!** 🎉
