# Clerk Authentication Integration

## Overview

This app uses **Clerk** for authentication with Next.js App Router integration.

## Architecture

```
app/
├── layout.tsx              # Root layout with ClerkProvider
├── sign-in/[[...sign-in]]/ # Clerk's sign-in component
├── sign-up/[[...sign-up]]/ # Clerk's sign-up component
└── middleware.ts           # Auth protection with clerkMiddleware()

components/
├── AppShell.tsx            # Ionic app shell with Clerk auth guards
└── pages/
    └── Settings.tsx        # Includes SignOutButton
```

## How It Works

### 1. Root Layout (`app/layout.tsx`)
Wraps the entire app with `<ClerkProvider>` to provide auth context throughout the application.

### 2. Middleware (`middleware.ts`)
Protects routes using `clerkMiddleware()`:
- Public routes: `/`, `/sign-in`, `/sign-up`
- Protected routes: Everything else (redirects to sign-in)

### 3. Sign-In/Sign-Up Pages
Uses Clerk's built-in `<SignIn />` and `<SignUp />` components with catch-all routes (`[[...sign-in]]`) to handle OAuth callbacks.

### 4. Auth Guards in AppShell
Uses `<SignedIn>` and `<SignedOut>` components to conditionally render content based on authentication status.

### 5. Sign-Out
Uses `<SignOutButton>` component in Settings page.

## Authentication Flow

1. User visits app
2. Middleware checks auth status
3. If not authenticated → redirect to `/sign-in`
4. User signs in with Google OAuth (or email)
5. Clerk handles OAuth flow server-side
6. User redirected to `/home` upon success
7. Subsequent requests include session token in cookies

## Mobile Considerations

### Server-Side vs Static Export

**Previous approach (static export)**:
- Generated static HTML files
- Ran entirely client-side
- Required custom OAuth handling
- Couldn't use Clerk's server features

**Current approach (server-side)**:
- Runs Next.js server
- OAuth handled server-side by Clerk
- Full Clerk feature support
- Mobile app connects to deployed server

### Capacitor Configuration

The mobile app connects to the deployed Next.js server:

```json
{
  "server": {
    "url": "https://your-app.vercel.app"
  }
}
```

This means:
- ✅ OAuth works properly (handled by Clerk)
- ✅ Sessions managed server-side
- ✅ Update server without rebuilding mobile app
- ⚠️ Requires internet connectivity
- ⚠️ Need to deploy to a server (can't use static files)

## Development

### Local Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Test sign-in flow
```

### Mobile Testing (Local)

```bash
# Update capacitor.config.json with your local IP
# E.g., "url": "http://192.168.1.100:3000"

npx cap sync
npx cap run android
```

### Production

```bash
# Deploy to Vercel
vercel --prod

# Update capacitor.config.json with Vercel URL
# E.g., "url": "https://your-app.vercel.app"

npx cap sync
npm run make-android-release
```

## Environment Variables

Required in `.env.local` and deployment platform:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Clerk Components Used

| Component | Usage | Location |
|-----------|-------|----------|
| `<ClerkProvider>` | Root auth provider | `app/layout.tsx` |
| `<SignIn />` | Sign-in UI | `app/sign-in/[[...sign-in]]/page.tsx` |
| `<SignUp />` | Sign-up UI | `app/sign-up/[[...sign-up]]/page.tsx` |
| `<SignedIn>` | Show when authenticated | `components/AppShell.tsx` |
| `<SignedOut>` | Show when not authenticated | `components/AppShell.tsx` |
| `<SignOutButton>` | Sign-out action | `components/pages/Settings.tsx` |
| `clerkMiddleware()` | Route protection | `middleware.ts` |

## Security

- ✅ Environment variables for sensitive keys
- ✅ Server-side session management
- ✅ HTTPS required in production
- ✅ Middleware protects all routes by default
- ✅ OAuth handled securely by Clerk's servers

## Troubleshooting

**Issue**: "Clerk instance not found"
- **Solution**: Check `.env.local` has correct keys

**Issue**: Infinite redirect loop
- **Solution**: Check middleware `isPublicRoute()` includes sign-in paths

**Issue**: Mobile app shows blank screen
- **Solution**: Verify `capacitor.config.json` server URL is correct

**Issue**: OAuth fails
- **Solution**: Add deployment URL to Clerk Dashboard allowlist

## Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/nextjs)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Capacitor Documentation](https://capacitorjs.com/docs)
