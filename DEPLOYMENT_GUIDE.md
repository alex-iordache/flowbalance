# Flow App - Deployment Guide

## What Changed

Your app has been refactored to use **Clerk's official Next.js integration** instead of static export with custom OAuth handling.

### Key Changes:
- ✅ Using `@clerk/nextjs` instead of `@clerk/clerk-react`
- ✅ Removed static export - now running as a Next.js server
- ✅ Proper middleware with `clerkMiddleware()`
- ✅ Clerk components: `<SignIn />`, `<SignUp />`, `<SignOutButton>`
- ✅ Server-side authentication protection

## Prerequisites

Before deploying, you need:
1. A Clerk account with your app configured
2. Your Clerk API keys (already in `.env.local`)
3. A deployment platform account (Vercel recommended)

## Step 1: Install Dependencies

Since we changed `package.json`, you need to install the new Clerk SDK:

```bash
npm install
```

This will install `@clerk/nextjs` and remove `@clerk/clerk-react`.

## Step 2: Test Locally

Start the development server to test authentication:

```bash
npm run dev
```

Visit `http://localhost:3000`:
- You should be redirected to `/sign-in`
- Click "Continue with Google"
- After signing in, you should be redirected to `/home`
- Test the sign-out button in Settings

## Step 3: Configure Clerk Dashboard

1. Go to https://dashboard.clerk.com
2. Select your "Flow" application
3. Navigate to **Configure → Paths**:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - Home URL: `/home`
   - After sign-out: `/sign-in`

4. Navigate to **Configure → Design → Redirects**:
   - Add your deployment URL (e.g., `https://your-app.vercel.app`)
   - Add `http://localhost:3000` for local testing

## Step 4: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Add environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
6. Click "Deploy"

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

The CLI will ask for environment variables - provide your Clerk keys.

## Step 5: Configure Capacitor for Your Server

After deployment, update `capacitor.config.json` with your server URL:

```json
{
  "appId": "com.flowapp.app",
  "appName": "Flow",
  "server": {
    "url": "https://your-app.vercel.app",
    "cleartext": true
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "CapacitorCookies": {
      "enabled": true
    }
  }
}
```

**Replace `https://your-app.vercel.app` with your actual Vercel URL.**

## Step 6: Update Clerk Dashboard with Production URL

1. Go back to Clerk Dashboard
2. Navigate to **Configure → Design → Redirects**
3. Add your Vercel URL to the allowlist:
   - `https://your-app.vercel.app`
   - `https://your-app.vercel.app/*`

## Step 7: Build and Test Mobile App

```bash
# Sync Capacitor with new config
npx cap sync android

# Run on device
npx cap run android
```

The mobile app will now connect to your deployed server instead of using local files.

## Development Workflow

### Local Development

For local development with mobile:

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Find your local IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows
   ipconfig
   ```

3. Update `capacitor.config.json` temporarily:
   ```json
   {
     "server": {
       "url": "http://YOUR_LOCAL_IP:3000",
       "cleartext": true
     }
   }
   ```

4. Sync and run:
   ```bash
   npx cap sync
   npx cap run android
   ```

### Production Builds

For production mobile builds:

1. Ensure `capacitor.config.json` points to your Vercel URL
2. Build the release APK:
   ```bash
   npm run make-android-release
   ```

## Troubleshooting

### "Clerk instance not found"
- Make sure `.env.local` has your Clerk keys
- Restart the dev server

### OAuth redirects to wrong URL
- Check Clerk Dashboard → Redirects
- Ensure your deployment URL is allowlisted

### Mobile app shows blank screen
- Check `capacitor.config.json` has correct server URL
- Run `npx cap sync` after config changes
- Check network connectivity on device

### Sign-out doesn't work
- Clear Clerk session: `localStorage.clear()` in browser console
- Or use Clerk's development mode to clear sessions

## Alternative Deployment Platforms

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Railway
1. Visit https://railway.app
2. Create new project
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Render
1. Visit https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set start command: `npm start`

## Environment Variables Reference

Required variables in `.env.local` and deployment platform:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Test locally: `npm run dev`
3. ✅ Configure Clerk Dashboard
4. ✅ Deploy to Vercel
5. ✅ Update Capacitor config
6. ✅ Build mobile app

---

**Note**: Your app is now using server-side authentication. The mobile app requires internet connectivity to authenticate and load content from your deployed server.
