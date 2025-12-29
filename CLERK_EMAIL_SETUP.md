# Clerk Email Verification Setup Guide

This guide shows you how to configure Clerk for email-based authentication with your verified organization domains (jordache.me and dynamichr.ro).

## Step 1: Configure Authentication Methods

### Disable OAuth Providers (Optional)

Since you want email verification only, you can disable social sign-in:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your **Flow** application
3. Navigate to **Configure** → **User & authentication** → **Email, phone, username**
4. Under **Social connections**:
   - **Disable** or **Remove** Google OAuth
   - **Disable** any other OAuth providers you don't need

### Enable Email Verification

1. In **User & authentication**
2. Under **Contact information**:
   - ✅ **Enable Email address**
   - ✅ Set to **Required**
3. Under **Verification methods**:
   - ✅ **Enable Email verification code**
   - This sends a one-time code to the user's email

**Screenshot location**: Configure → User & authentication → Email, phone, username

---

## Step 2: Configure Organization Settings

### Enable Verified Domains

1. Navigate to **Configure** → **Organizations** → **Settings**
2. Toggle **ON** the "Enable verified domains" setting
3. Choose enrollment mode:
   - **Automatic invitation** (Recommended): Users with verified domains automatically get invited
   - **Automatic suggestion**: Users can request to join (requires admin approval)

**For your use case**, choose **Automatic invitation** so users from jordache.me and dynamichr.ro can sign up without friction.

### Verify Your Domains

You've already added:
- ✅ **jordache** organization → domain: `jordache.me`
- ✅ **dynamichr** organization → domain: `dynamichr.ro`

Make sure these domains are **verified**:

1. Go to each organization's settings
2. Under **Verified domains**, you should see your domain with a ✅ verified status
3. If not verified:
   - Click **Add domain**
   - Enter the domain (e.g., `jordache.me`)
   - Clerk will send a verification email to an address on that domain
   - Click the link to verify

---

## Step 3: Sign-Up Restrictions (Optional)

To ensure ONLY users from your verified domains can sign up:

1. Navigate to **Configure** → **User & authentication** → **Restrictions**
2. Enable **Allowlist**
3. Add email domains:
   ```
   jordache.me
   dynamichr.ro
   ```

This prevents users with other email domains (like @gmail.com) from signing up.

---

## Step 4: Configure Email Templates (Optional)

Customize the verification email your users receive:

1. Navigate to **Configure** → **Customization** → **Email**
2. Click on **"Verification code"** template
3. Customize the email content, logo, colors, etc.
4. **Save** changes

---

## How It Works Now

### User Sign-Up Flow

1. **User visits app** → Redirected to `/sign-in`
2. **User enters email** (e.g., `john@jordache.me`)
3. **Clerk sends verification code** to their email
4. **User enters code** in the app
5. **Email verified** → User is signed in
6. **Automatic organization invite** → User automatically added to "jordache" organization
7. **Redirected to `/home`** → App loads successfully

### User Sign-In Flow

1. **User enters email**
2. **Clerk sends sign-in code** to their email
3. **User enters code**
4. **Signed in** → Redirected to `/home`

---

## Testing Steps

### 1. Test with Browser First

Before testing on mobile:

1. Open browser: `https://flowbalance-jdk.vercel.app`
2. Should redirect to `/sign-in`
3. Click **"Don't have an account? Sign up"**
4. Enter email: `test@jordache.me` (or your actual jordache.me email)
5. Check email for verification code
6. Enter code in app
7. Should complete sign-up and redirect to `/home`

### 2. Test Sign-In

1. Go back to `/sign-in`
2. Enter your email
3. Get verification code via email
4. Enter code
5. Should sign in successfully

### 3. Test on Mobile

Once browser testing works:

```bash
# Deploy latest changes
git add .
git commit -m "Configure email verification for verified domains"
git push origin main

# Wait for Vercel deployment

# Build and install on phone
npm run make-android-release

# Or run via Android Studio
```

Expected behavior:
- ✅ App opens → shows sign-in page
- ✅ Enter email → receive code via email
- ✅ Enter code → signed in
- ✅ Redirected to `/home` → app works
- ✅ **NO external browser opens** (stays in app!)

---

## Troubleshooting

### "Email not allowed"

**Cause**: User's email domain is not in verified domains or allowlist.

**Fix**:
1. Check Clerk Dashboard → Organizations → verify domain status
2. Or check Restrictions → Allowlist settings

### "Code not received"

**Cause**: Email delivery issues or spam folder.

**Fix**:
1. Check spam/junk folder
2. In Clerk Dashboard → Customization → Email, verify email settings
3. Try resending code

### "Still opens external browser"

**Cause**: May still have OAuth enabled.

**Fix**:
1. Verify OAuth providers are disabled in Clerk Dashboard
2. Make sure you're using email verification, not OAuth

---

## Key Benefits of This Approach

✅ **No external browser** - Email verification stays in-app  
✅ **Verified domain support** - Only your company domains can sign up  
✅ **Automatic org assignment** - Users auto-join their company org  
✅ **Clerk features** - Still get all Clerk's user management benefits  
✅ **Mobile-friendly** - Works perfectly in Capacitor WebView  

---

## Next Steps

1. **Configure Clerk Dashboard** using this guide
2. **Test in browser** to verify email flow works
3. **Deploy to Vercel**: `git push origin main`
4. **Test on mobile** via Android Studio or APK

**Once email verification works, you'll have a fully functional mobile app with proper authentication! 🎉**
