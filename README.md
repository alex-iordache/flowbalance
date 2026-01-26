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
  - Note: `/subscribe` must be `exact` so it does **not** catch `/subscribe-web/*` return URLs on iOS.
- **Next routes**:
  - `/sign-in` → `app/sign-in/[[...sign-in]]/page.tsx` (Clerk `<SignIn />`)
  - `/sign-up` → `app/sign-up/[[...sign-up]]/page.tsx` (Clerk `<SignUp />`)
  - `/subscribe-web` → `app/subscribe-web/page.tsx` (Clerk `<PricingTable />`, web-only)
  - `/post-signup-redirect` → `app/post-signup-redirect/page.tsx` (legacy redirect helper; keep unless you remove env/dashboard redirects)

---

## Overlay system (reusable full-screen overlays)

We use a **state-driven, reusable overlay system** for “full-screen interruptions” that should sit above the Ionic app UI (e.g. onboarding, offline, critical errors).

- **Overlay wrapper**: `components/ui/Overlay.tsx`
  - Fullscreen purple background (`var(--fb-bg)`), high z-index
- **Overlay router/manager**: `components/OverlayManager.tsx`
  - Renders an overlay based on `Store.overlayType`
- **State + actions**
  - `store/index.ts`: `overlayType`, `overlayProps`
  - `store/actions.ts`: `showOverlay(type, props?)`, `hideOverlay()`

### Adding a new overlay type

1. Add the new union value to `StoreProps.overlayType` in `store/index.ts`
2. Create a content component in `components/overlays/` (ex: `OfflineOverlay.tsx`)
3. Add a render case in `components/OverlayManager.tsx`
4. Trigger it from anywhere via `showOverlay('your-type', { ...props })`

---

## Onboarding: first-time sign-in questionnaire (overlay)

New users (first sign-in) are required to complete a short questionnaire that:
- starts with **language selection** (default: **English**)
- produces **Top 3 flow categories**
- configures the Home screen to show **Start here** + **Recommended for you (3 + 1 random)**.

- **Guard**: `components/OnboardingGuard.tsx`
  - Runs after `SignedIn` and checks completion status per `userId`
  - If incomplete, it calls `showOverlay('onboarding')`
  - If completed, it loads the saved onboarding record into Store (`onboardingRecommendedCategories`, `onboardingStart`) so Home can render the right cards
- **UI**: `components/overlays/OnboardingOverlay.tsx`
  - 4 questions, with Q1 allowing max 2 selections
  - First step: **language selection** (UI + audio language; can be changed later in Settings)
  - End: shows a short **Welcome** splash that fades away and reveals Home (no results screen)
- **Question definitions**: `data/onboardingQuestions.ts`
- **Scoring + mapping**: `helpers/onboardingScoring.ts`
  - Scores categories: `emotional-regulation`, `performance-boost`, `mindset`, `stories`, `heart-balance`, `somatic-release`
  - Deterministic tie-breaking + fallback: `emotional-regulation → heart-balance → somatic-release`
  - Maps category → default Flow using `components/pages/flowsCatalog.ts` (`FLOW_CATEGORIES`)
- **Persistence**: `store/persistence.ts`
  - `saveOnboardingComplete(userId, recommendedCategories, start)`
  - `hasCompletedOnboarding(userId)`
  - `loadOnboardingComplete(userId)`
  - Stored via Capacitor `Preferences` per user key (`onboarding_complete:<userId>`)

---

## Offline UX (v1): remote-first with bundled fallback

The production mobile apps are configured as **remote-first** (`server.url` points at `https://www.flowbalance.app`) so most UI changes ship instantly via Vercel.

However, when the device is offline, the WebView can fail **before any JS runs**, producing the ugly native “Webpage not available” screen. A JS-only overlay cannot fix that.

To provide a clean offline experience:
- We bundle the web build (`webDir: out`) into the native apps (Capacitor sync copies it into the platform projects)
- On **cold start offline**, native code loads the bundled app entrypoint (`index.html`) so the UI can boot instead of a black/white WebView error screen.
- Once the UI boots, `OfflineGuard` shows the offline overlay (with Retry) and hides it when internet returns.

Native entrypoints:
- **iOS**: `FallbackBridgeViewController.swift` (wired in `ios/App/App/Base.lproj/Main.storyboard`)
- **Android**: `android/app/src/main/java/com/flowbalance/app/MainActivity.java`

Notes:
- This requires a **one-time native rebuild** (APK/IPA) when you change the fallback behavior.
- Once the app is loaded (online), the JS `OfflineGuard` can show/hide the offline overlay during runtime connectivity changes.
- `OfflineGuard` probes `https://www.flowbalance.app/favicon.ico` (not `window.location.origin`) so it still detects offline correctly when running from `capacitor://localhost`.

---

## Clerk: rules of engagement (important)

### What we want
- **No password sign-up** (email verification code only)
- **No custom auth forms** unless Clerk prebuilt cannot support a requirement

### What we actually use in code
- Prebuilt components:
  - `@clerk/nextjs` `<SignIn />` and `<SignUp />`
  - `fallbackRedirectUrl` + `forceRedirectUrl` props (new API; replaces `afterSignInUrl` / `afterSignUpUrl`)

### iOS: Subscribe / payments (system browser)
- If iOS logs `WebKitNamespace::Ignoring messageHandlers() request for non app-bound domain`, Capacitor plugins that rely on the JS↔native bridge may not fire.
- The most reliable pattern is to make the **Subscribe button a direct** `href` with `target="_blank"` to `/subscribe-web?...` (see `components/pages/Subscribe.tsx`), and treat Capacitor `Browser/AppLauncher` as optional enhancements.
- Because Safari → App return is not always delivered as a deep-link callback, the in-app `/subscribe` screen shows a **“Waiting for payment confirmation…”** overlay and polls Clerk every ~2s until the `pro_user` plan activates, then returns to the `return=` route.

### Official docs to reference first
- Redirect URLs: `https://clerk.com/docs/guides/development/customize-redirect-urls`
- Billing (B2C): `https://clerk.com/docs/nextjs/guides/billing/for-b2c`

### Mobile SSO Redirect allowlist (Clerk Dashboard)
Clerk → **Configure → Developers → Native applications → Allowlist for mobile SSO Redirect → Redirect URLs**

Current expected entries:

```text
capacitor://localhost/post-signup-redirect?
http://localhost/post-signup-redirect?
com.flowbalance.app://oauth?
clerk://com.flowbalance.app.oauth?
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
  - App ID: `com.flowbalance.app`
  - Label: `Flow`
  - WebView loads: `https://www.flowbalance.app` (aliases: `https://flowbalance.app`, `https://flowbalance.vercel.app`)
  - Deep link scheme: `com.flowbalance.app://sso-callback?...`

- **Staging**
  - App ID: `com.flowbalance.app.staging`
  - Label: `Flow Staging`
  - WebView loads: `https://flowbalance-staging.vercel.app`
  - Deep link scheme: `com.flowbalance.app.staging://sso-callback?...`

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
- **Checkout (subscribe / upgrade)**: in-app buttons open the **system browser** to:
  - `${current web origin}/subscribe-web` (prod → `www.flowbalance.app`, staging → `flowbalance-staging.vercel.app`)
- We pass a **Clerk sign-in token** so the browser page is authenticated:
  - `app/api/create-sign-in-token/route.ts`
  - The native app opens: `/subscribe-web?__clerk_ticket=...`
  - The web page consumes the ticket using `useSignIn().signIn.create({ strategy: 'ticket', ticket })`
- **Manage existing subscription (cancel, etc.)**: in-app Settings button opens the **system browser** to:
  - `${current web origin}/billing-web` (same pattern as checkout)
  - Uses the same sign-in token mechanism for authentication
  - The web page renders Clerk’s [`<SubscriptionDetailsButton />`](https://clerk.com/docs/nextjs/reference/components/billing/subscription-details-button) component
  - This button is only shown for **personal `pro_user` subscribers** (not for org access, and not for free users), so non-subscribed users still reach `/subscribe` only via Premium flows.

Key files:
- `components/pages/Settings.tsx` (“Manage Subscription” → opens `/billing-web` in external browser)
- `components/PaywallModal.tsx` (premium upsell → external browser)
- `helpers/openExternal.ts` / `helpers/openSubscriptionPage.ts`
- `helpers/webBaseUrl.ts` (figures out which domain we’re on)
- `app/subscribe-web/page.tsx` (checkout page)
- `app/billing-web/page.tsx` (subscription management page)

---

## Known gotchas (and how we avoid them)

### Next.js hydration errors
Don’t render `window.location`, `navigator.userAgent`, etc. directly into JSX that’s server-rendered. Capture them in `useEffect` instead.

### Ionic SSR warnings
Sometimes `<ion-*>` elements can warn about extra `class` attributes during hydration. Avoid putting Tailwind `className` directly on Ionic web components when it causes warnings; put styling on wrappers.

### iOS WKWebView gotchas (Clerk auth, cookies, and "stuck zoom")

This project runs inside a **Capacitor WKWebView** on iOS and uses **Clerk** for auth. There are two iOS-only classes of issues that can look unrelated but are both WebView quirks:

- **Auth redirect loops / non-persistent sessions** after email-code sign-in
- **First sign-in “zoomed UI / wrong scale / no scroll until relaunch”** (WKWebView got stuck zoomed after keyboard closes)

This section documents the full context so a future agent can re-apply the fixes quickly.

#### 1) iOS auth redirect loop after email-code sign-in

- **Symptoms**:
  - User enters email + code, briefly sees success, then gets sent back to `/sign-in`.
  - Logs show Clerk navigating through a **hosted** URL on `accounts.flowbalance.app` with a long query string including `redirect_url` and `*_force_redirect_url`.
  - WKWebView often logs `NSURLErrorDomain -999` because a navigation cancels another navigation mid-flight.

- **Root cause A (self-inflicted redirect chain)**:
  - We accidentally configured Clerk to **force redirect back to sign-in**:
    - `signInForceRedirectUrl="/sign-in?done=1"`
    - `signUpForceRedirectUrl="/sign-up?done=1"`
  - Clerk turns those into the `sign_in_force_redirect_url=...` and `sign_up_force_redirect_url=...` parameters used in the hosted `accounts.*` navigation, creating a loop back to sign-in.
  - Clerk also preserves the previous page in `redirect_url`, so combining `redirect_url` + force redirects can create multi-hop chains.
  - Clerk docs explain this behavior and how `forceRedirectUrl` / `fallbackRedirectUrl` interact with `redirect_url`:
    - [`https://clerk.com/docs/guides/development/customize-redirect-urls`](https://clerk.com/docs/guides/development/customize-redirect-urls)

- **Root cause B (iOS cookie restrictions causing “session drops”)**:
  - On iOS 14+, cookie behavior is stricter (especially around cross-site / multi-domain auth).
  - We saw sessions drop ~10–15 seconds after entering the app because Clerk couldn’t persist or rehydrate cookies reliably.

- **Fixes applied** (high level):
  - **Do not set** sign-in/sign-up force redirects to `/sign-in?...`:
    - `components/ClerkProviderClient.tsx` intentionally does **not** set `signInForceRedirectUrl` / `signUpForceRedirectUrl` / fallbacks.
  - **Avoid URL mutations inside WKWebView**:
    - Set Clerk components to `routing="virtual"`:
      - `app/sign-in/[[...sign-in]]/page.tsx`
      - `app/sign-up/[[...sign-up]]/page.tsx`
  - **Block cross-origin hosted hops inside the WebView**:
    - In `components/ClerkProviderClient.tsx`, `routerPush/routerReplace` block Clerk navigations marked as `navigationType: "window"` (those are cross-origin hops, e.g. `accounts.flowbalance.app`).
  - **Improve iOS cookie support**:
    - Enable Capacitor cookie patching:
      - `CapacitorCookies.enabled = true` (in `capacitor.config.json` and platform copies)
    - Keep native HTTP patching disabled (to avoid split cookie jars):
      - `CapacitorHttp.enabled = false`
    - Add `WKAppBoundDomains` in `ios/App/App/Info.plist` including:
      - `www.flowbalance.app`
      - `flowbalance.app`
      - `accounts.flowbalance.app`
      - `clerk.flowbalance.app`

- **Important configuration note**:
  - Do **not** set `server.iosScheme` to `https`. Capacitor’s config schema warns that iOS scheme can’t be set to schemes WKWebView already handles. We removed `iosScheme: "https"` from all configs.
  - Capacitor config schema reference:
    - [`https://capacitorjs.com/docs/config`](https://capacitorjs.com/docs/config)

#### 2) iOS “stuck zoom” after first sign-in (UI looks bigger than screen)

- **Symptoms**:
  - Immediately after first sign-in, the app renders “zoomed” (as if the UI is larger than the device).
  - Scrolling feels wrong because the page is in a zoomed/offset viewport state.
  - If you kill the app and reopen, it renders correctly.

- **Root cause**:
  - iOS Safari/WKWebView **auto-zooms** when focusing an `<input>` with `font-size < 16px`.
  - Clerk’s sign-in UI contains form fields; during the email/code flow, the keyboard opens/closes and WKWebView may end up stuck at a non-1.0 zoom scale.
  - Native logs confirmed this:
    - `zoomScale=1.2315...` around `keyboardWillHide` on `/sign-in`.
  - **Important nuance (the real “gotcha”)**:
    - Even after we forced `scrollView.zoomScale` and `webView.pageZoom` to `1.0`, the UI could still appear zoomed.
    - The smoking gun was **JS-side VisualViewport**:
      - Immediately after keyboard close, `window.visualViewport.scale` jumped (e.g. `1.566...`) and `visualViewport.width` shrank, while native `zoomScale/pageZoom` stayed at `1.0`.
    - That means the “zoom” was happening at the **browser viewport level**, not the scrollView zoom level.

- **Fixes applied**:
  - **Prevent auto-zoom** by forcing Clerk inputs to use `>= 16px` font size via Clerk `appearance`:
    - In `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`:
      - `appearance.elements.formFieldInput = "text-[16px]"`
  - **Lock viewport scaling globally (definitive fix)**:
    - In `app/layout.tsx` we set:
      - `minimumScale: 1`
      - `maximumScale: 1`
      - `userScalable: false`
    - This prevents iOS from applying the post-keyboard VisualViewport scale jump.
  - **iOS-only CSS hardening**:
    - In `styles/global.css`:
      - `-webkit-text-size-adjust: 100%`
      - `input, textarea, select { font-size: 16px; }`
    - This prevents iOS focus-driven zoom even when a third-party UI (Clerk) renders an input that isn’t covered by our component-level styling.
  - **Native fallback** (debug/robustness):
    - `ios/App/App/DebugBridgeViewController.swift` implements `normalizeZoomIfNeeded()` which resets `scrollView.zoomScale` back to `1.0` on:
      - `keyboardWillHide`
      - `viewDidLayoutSubviews`
      - `viewDidAppear`
      - `didFinishNavigation`
    - This was added because JS console logs can be blocked by “non app-bound domain” restrictions, so native logging is more reliable in Xcode.

#### 3) Debugging checklist (if this ever regresses)

- **Auth loop**:
  - Check `components/ClerkProviderClient.tsx` for any forced redirect props or env vars that point back to `/sign-in`.
  - Ensure `routing="virtual"` is still set on `<SignIn/>` and `<SignUp/>`.
  - We use `WKAppBoundDomains` for better iOS WKWebView stability/cookie persistence.
    **Important**: keep Stripe/checkout out of the app WKWebView so third‑party subframes/scripts never load
    inside the app WebView (otherwise you’ll see "non app-bound domain" spam).
    - iOS: use `@capacitor/browser` (`Browser.open`) for checkout (AppLauncher is not available on iOS in our build).

- **Session persistence**:
  - Confirm `CapacitorCookies.enabled = true` and `CapacitorHttp.enabled = false`.
  - Confirm iOS `WKAppBoundDomains` is present in `ios/App/App/Info.plist`.

- **Stuck zoom**:
  - Look for non-1.0 `zoomScale` around keyboard events in the `[NativeViewport]` logs.
  - Ensure Clerk input font size override remains at 16px.

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

### Data conventions: flows + practices (rich text + "AIT")

Flow and practice content lives in `data/flows/**` and is bundled at build time (not fetched from R2).

- **Descriptions are JSX**:
  - Each `flow.tsx` and `practice.tsx` defines:
    - `const roDescription = (<>...</>);`
    - `const enDescription = (<>...</>);`
  - And wires:
    - `description: { ro: roDescription, en: enDescription }`
- **"AIT" placeholder**:
  - `"AIT"` means “AI Translation pending”.
  - The `t()` helper treats `"AIT"` as a placeholder and falls back to the Romanian value, so the UI never shows `"AIT"`.
- **Audio keys**:
  - `audioUrl.{ro,en}` should be the R2 key used by `GET /api/audio?path=...`
  - Current convention supports subfolders (e.g. `"audioFiles/<name>.mp3"`). Only the legacy `audio/` prefix is normalized.

### UI conventions: FlowDetail split scrolling

`components/pages/FlowDetail.tsx` uses two independent scroll containers (scrollbars hidden):
- **Top**: flow description box (max height 40%)
- **Bottom**: practices list (fills remaining space)

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

<!-- (intentionally left blank) -->