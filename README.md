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

### One-command “commit & deploy to Vercel”

We added a helper script:

```bash
npm run vercel -- "your commit message"
```

This runs: `git add .` → `git commit -m ...` → `git push origin main`.

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

---

## Billing / subscriptions (Google Play compliance)

### Requirement
**Payments must happen outside the app WebView**.

### Current approach
- In-app buttons open the **system browser** to:
  - `https://flowbalance.vercel.app/subscribe-web`
- We pass a **Clerk sign-in token** so the browser page is authenticated:
  - `app/api/create-sign-in-token/route.ts`
  - The native app opens: `/subscribe-web?__clerk_ticket=...`
  - The web page consumes the ticket using `useSignIn().signIn.create({ strategy: 'ticket', ticket })`

Key files:
- `components/pages/Settings.tsx` (“Manage Subscription”)
- `components/PaywallModal.tsx` (premium upsell → external browser)
- `helpers/openExternal.ts` / `helpers/openSubscriptionPage.ts`
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

If you use any redirect env vars, document them here and ensure they match existing routes. Avoid deprecated `NEXT_PUBLIC_CLERK_AFTER_*` variables.

