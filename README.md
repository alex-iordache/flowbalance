# FlowBalance — Next.js + Ionic + Capacitor + Clerk

This repo is a hybrid mobile app (Android/iOS) + web app:
- **UI**: Next.js (App Router) + Ionic React + Tailwind
- **Auth**: Clerk (`@clerk/nextjs`) with **email verification code** (passwordless)
- **Billing**: Clerk Billing (B2C) shown in **external browser** (Google Play compliance)
- **Mobile shell**: Capacitor (WebView pointing at the deployed Next.js app)

The project is intentionally built to avoid “spaghetti” workarounds: we prefer Clerk’s prebuilt components and documented configuration over custom auth UIs.

---

## Fast commands

```bash
npm run dev
```

```bash
npm run make-android
```

```bash
npm run make-android-release
```

### Staging / Production Android builds (recommended)

These produce **two separate APKs** (different app IDs), so you can install both on one phone:

```bash
# Staging APK (debug) → points at https://flowbalance-staging.vercel.app
npm run make-android-staging
```

```bash
# Production APK (release) → points at https://www.flowbalance.app
npm run make-android-prod
```

APK output paths:
- **Staging (debug)**: `android/app/build/outputs/apk/staging/debug/app-staging-debug.apk`
- **Prod (release)**: `android/app/build/outputs/apk/prod/release/app-prod-release.apk`

### One-command “commit & deploy to Vercel”

We added a helper script:

```bash
npm run vercel -- "your commit message"
```

This runs: `git add .` → `git commit -m ...` → `git push origin main`.

---

## Environments: production vs staging (Vercel split)

We use **two Vercel projects** connected to the same GitHub repo:

- **Production**
  - **Domain**: `https://www.flowbalance.app` (aliases: `https://flowbalance.app`, `https://flowbalance.vercel.app`)
  - **Vercel project**: `flowbalance`
  - **Git branch**: `main`

- **Staging**
  - **Domain**: `https://flowbalance-staging.vercel.app`
  - **Vercel project**: `flowbalance-staging` (renamed from `flowbalance-jdk`)
  - **Git branch**: `staging` (this is the *Production Branch* of the staging project)

Rules:
- **Users should only be pointed at Production.**
- **All testing goes to Staging** (or per-PR Preview URLs).

How updates roll out:
- Most app changes are **web changes**. Pushing to `main` updates `www.flowbalance.app`, so **users get the update instantly** (no store update required).
- Use `staging` to test first. When stable, merge `staging` → `main`.
- You only need to ship a new APK/AAB when you change **native** things (Capacitor plugins, Android/iOS files, deep links, permissions, etc.).

---

## Architecture (how routing works)

This repo uses Ionic’s router for the in-app experience, and Next routes for auth + web-only pages.

- **Main app shell**: `components/AppShell.tsx`
  - Ionic routes: `/home`, `/flows`, `/progress`, `/settings`
- **Next routes**:
  - `/sign-in` → `app/sign-in/[[...sign-in]]/page.tsx` (Clerk `<SignIn />`)
  - `/sign-up` → `app/sign-up/[[...sign-up]]/page.tsx` (Clerk `<SignUp />`)
  - `/subscribe-web` → `app/subscribe-web/page.tsx` (Clerk `<PricingTable />`, web-only)
  - `/post-signup-redirect` → `app/post-signup-redirect/page.tsx` (legacy redirect helper; keep unless you remove env/dashboard redirects)

---

## Clerk: rules of engagement (important)

### What we want
- **No password sign-up** (email verification code only)
- **No custom auth forms** unless Clerk prebuilt cannot support a requirement

### What we actually use in code
- Prebuilt components:
  - `@clerk/nextjs` `<SignIn />` and `<SignUp />`
  - `fallbackRedirectUrl` + `forceRedirectUrl` props (new API; replaces `afterSignInUrl` / `afterSignUpUrl`)

### Official docs to reference first
- Redirect URLs: `https://clerk.com/docs/guides/development/customize-redirect-urls`
- Billing (B2C): `https://clerk.com/docs/nextjs/guides/billing/for-b2c`

### Mobile SSO Redirect allowlist (Clerk Dashboard)
Clerk → **Configure → Developers → Native applications → Allowlist for mobile SSO Redirect → Redirect URLs**

Current expected entries:

```text
capacitor://localhost/post-signup-redirect?
http://localhost/post-signup-redirect?
com.flowapp.app://oauth?
clerk://com.flowapp.app.oauth?
https://flowbalance.vercel.app/post-signup-redirect?
https://flowbalance.vercel.app/sign-in?
https://flowbalance.app/post-signup-redirect?
https://flowbalance.app/sign-in?
https://www.flowbalance.app/post-signup-redirect?
https://www.flowbalance.app/sign-in?
https://flowbalance-staging.vercel.app/post-signup-redirect?
https://flowbalance-staging.vercel.app/sign-in?
```

---

## Clerk: Production Setup (DNS + Environment Variables)

### DNS Configuration (Cloudflare)

After creating a **production Clerk instance** for `www.flowbalance.app`, Clerk requires these CNAME records in your DNS (Cloudflare):

| Record Type | Name | Target | Purpose |
|------------|------|--------|---------|
| CNAME | `clerk` | `frontend-api.clerk.services` | Frontend API |
| CNAME | `accounts` | `accounts.clerk.services` | Account portal |
| CNAME | `clkmail` | `mail.k5po7qtsqc7o.clerk.services` | Email delivery |
| CNAME | `clk._domainkey` | `dkim1.k5po7qtsqc7o.clerk.services` | DKIM signing (email) |
| CNAME | `clk2._domainkey` | `dkim2.k5po7qtsqc7o.clerk.services` | DKIM signing (email) |

**Note**: The `clkmail` and `_domainkey` targets are instance-specific. Get the exact values from **Clerk Dashboard → Configure → Domains → DNS Configuration**.

### Switching to Production Clerk Keys

Once DNS is verified and SSL certificates are issued:

1. **Get production keys** from Clerk Dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_live_...`)
   - `CLERK_SECRET_KEY` (starts with `sk_live_...`)

2. **Update Vercel Environment Variables** (Production project):
   - Replace the dev/test keys with production keys
   - **Do NOT** update staging yet (keep staging on dev keys for testing)

3. **Verify in app**:
   - Production domain (`www.flowbalance.app`) should use `clerk.flowbalance.app` (not `*.clerk.accounts.dev`)
   - No more "dev-browser-sync" redirect loops
   - Sign-in should stay inside the WebView (no external browser)

### Capacitor allowNavigation (Production Domains)

The app's Capacitor configs include these production Clerk domains so navigation stays inside the WebView:

- `clerk.flowbalance.app` (Frontend API)
- `accounts.flowbalance.app` (Account portal)

These are already added to all Capacitor configs (`capacitor.config.json` and platform-specific copies).

---

## Mobile: Capacitor configuration (critical)

### 1) Keep navigation inside the app WebView
When `server.url` points to a remote domain, that domain **must** be included in `server.allowNavigation` or Capacitor will open it externally.

Config lives in:
- `capacitor.config.json` (source of truth)
- generated copies under `android/.../capacitor.config.json` and `ios/.../capacitor.config.json` (sync keeps them updated)

### 2) Do NOT enable `CapacitorHttp` for Clerk
**Root cause of the “mobile WebView shows Email+Password (missing Clerk footer) vs browser shows correct passwordless sign-up”**:
when `CapacitorHttp` is enabled, Clerk’s requests go through native HTTP, which breaks the WebView cookie/session model Clerk expects.

Keep this setting:
- `plugins.CapacitorHttp.enabled = false`

If you change Capacitor config, always sync:

```bash
npx cap sync android
```

### Android: prod vs staging apps (two installs)

We build **two Android flavors** so you can install both on a single phone:

- **Prod**
  - App ID: `com.flowapp.app`
  - Label: `Flow`
  - WebView loads: `https://www.flowbalance.app` (aliases: `https://flowbalance.app`, `https://flowbalance.vercel.app`)
  - Deep link scheme: `com.flowapp.app://sso-callback?...`

- **Staging**
  - App ID: `com.flowapp.app.staging`
  - Label: `Flow Staging`
  - WebView loads: `https://flowbalance-staging.vercel.app`
  - Deep link scheme: `com.flowapp.app.staging://sso-callback?...`

Implementation notes:
- Android flavors are configured in `android/app/build.gradle`.
- Deep link scheme is parameterized via `manifestPlaceholders` in `AndroidManifest.xml`.
- Capacitor config is per-flavor via:
  - `android/app/src/prod/assets/capacitor.config.json`
  - `android/app/src/staging/assets/capacitor.config.json`

---

## Billing / subscriptions (Google Play compliance)

### Requirement
**Payments must happen outside the app WebView**.

### Current approach
- In-app buttons open the **system browser** to:
  - `${current web origin}/subscribe-web` (prod → `www.flowbalance.app`, staging → `flowbalance-staging.vercel.app`)
- We pass a **Clerk sign-in token** so the browser page is authenticated:
  - `app/api/create-sign-in-token/route.ts`
  - The native app opens: `/subscribe-web?__clerk_ticket=...`
  - The web page consumes the ticket using `useSignIn().signIn.create({ strategy: 'ticket', ticket })`

Key files:
- `components/pages/Settings.tsx` (“Manage Subscription”)
- `components/PaywallModal.tsx` (premium upsell → external browser)
- `helpers/openExternal.ts` / `helpers/openSubscriptionPage.ts`
- `helpers/webBaseUrl.ts` (figures out which domain we’re on)
- `app/subscribe-web/page.tsx`

---

## Known gotchas (and how we avoid them)

### Next.js hydration errors
Don’t render `window.location`, `navigator.userAgent`, etc. directly into JSX that’s server-rendered. Capture them in `useEffect` instead.

### Ionic SSR warnings
Sometimes `<ion-*>` elements can warn about extra `class` attributes during hydration. Avoid putting Tailwind `className` directly on Ionic web components when it causes warnings; put styling on wrappers.

---

## Debugging utilities

We keep the debug UI **as an optional component**:
- `components/DebugInfoBox.tsx`

Add it temporarily to any client page when debugging, then remove it for design work.

---

## Development workflow + user preferences (for future agents)

### Preferences (must follow)
- **Use official docs** before proposing changes. If unsure, link the exact doc page.
- **Don’t invent** Clerk behavior or props; verify against docs.
- **Don’t build custom auth UIs** unless explicitly requested (use Clerk prebuilt components).
- **Always give copy/paste commands** using:
  - `git add .`
  - or the preferred one-liner: `npm run vercel -- "message"`
- Keep changes clean and reversible; avoid “one-off hacks” that linger.

### Style preference
Tailwind-first styling. Only use raw CSS when necessary for Ionic theming or truly global concerns.

---

## Environment variables (minimum)

Set these in both local `.env.local` and Vercel:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

**Production vs Development keys:**
- **Production** (`www.flowbalance.app`): Use keys from your **production Clerk instance** (start with `pk_live_...` / `sk_live_...`)
- **Staging** (`flowbalance-staging.vercel.app`): Can use **dev/test keys** (start with `pk_test_...` / `sk_test_...`) for testing

**Important**: After setting up production Clerk instance (see "Clerk: Production Setup" above), update Vercel Production environment variables with production keys. Staging can keep dev keys.

Notes:
- We intentionally **do not rely** on old Clerk redirect env vars (like `NEXT_PUBLIC_CLERK_AFTER_*`).
  Redirect behavior is handled in code via Clerk component props on:
  - `app/sign-in/[[...sign-in]]/page.tsx`
  - `app/sign-up/[[...sign-up]]/page.tsx`

Optional (only relevant if you ever run in a non-http origin, e.g. a bundled mode):

```bash
NEXT_PUBLIC_WEB_BASE_URL=https://www.flowbalance.app
```

---

## Private audio (Cloudflare R2)

Audio is served via a **gated streaming endpoint**: `GET /api/audio?...` which:
- checks Clerk auth + entitlement (free preview = first practice of first flow)
- streams the mp3 from **private R2** using AWS SigV4 (supports `Range` for seeking)

### Security note (important)

**Never commit or paste real credentials into this repo** (including `README.md`).
Store secrets only in:
- local `.env.local` (not committed)
- Vercel Environment Variables (Prod + Staging)

If a secret was shared in chat or committed by accident, **revoke/rotate it immediately** in Cloudflare and update Vercel.

### Required Vercel env vars

Set these in Vercel (Prod + Staging) and locally in `.env.local`:

```bash
R2_ACCOUNT_ID=...                  # Cloudflare account id (for R2)
R2_ACCESS_KEY_ID=...               # R2 API token access key
R2_SECRET_ACCESS_KEY=...           # R2 API token secret
R2_BUCKET_NAME=...                 # bucket containing mp3s
R2_REGION=auto                     # recommended for R2
```

Tip: this repo includes a copy/paste template at `config/env.example`.
Create your local `.env.local` by copying it and filling in real values:

```bash
cp config/env.example .env.local
```

### How to create the Cloudflare token (recommended settings)

Create a token under Cloudflare R2 “S3 API tokens / R2 API tokens” (account-scoped).

Recommended settings for the **Vercel backend** token:
- **Name**: `vercel-flowbalance-prod-r2-read` (and optionally `vercel-flowbalance-staging-r2-read`)
- **Permission type**: **Object Read only**
- **Buckets**: **Apply to specific buckets only** → select `flowbalance`
- **Client IP filtering**: leave unset (Vercel does not have stable fixed egress IPs by default)

Cloudflare will show you (one-time):
- **Access Key ID** → set as `R2_ACCESS_KEY_ID` in Vercel
- **Secret Access Key** → set as `R2_SECRET_ACCESS_KEY` in Vercel

Note: Cloudflare also shows a “Cloudflare API token value” on that screen. **The app does not use it**.
For this project we only need the **S3-compatible Access Key ID / Secret Access Key** for SigV4.

### S3 endpoint (informational)

R2’s S3-compatible endpoint is derived from `R2_ACCOUNT_ID`:

```text
https://<accountId>.r2.cloudflarestorage.com
```

You do not need to set this as an env var; the backend builds it automatically.

### R2 object key convention

Practices store audio as the **R2 object key**, e.g. `"<filename>.mp3"` (bucket root).

Example:
- Practice audioUrl: `"1-2-trecerea-peste-obstacole.mp3"`
- R2 key: `"1-2-trecerea-peste-obstacole.mp3"`

### Cloudflare settings (security)

To actually prevent unauthorized access:
- Make the R2 bucket **private** (disable public access / public bucket URLs)
- If you keep `audio.flowbalance.app` publicly serving the bucket, it will remain bypassable

Code references:
- API route: `app/api/audio/route.ts`
- R2 signer/fetch: `lib/r2.ts`

## Git hygiene (don’t commit these)

Ensure `.gitignore` contains:

```gitignore
.npm-cache/
.gradle/
*.jks
android/keystore.properties
```

