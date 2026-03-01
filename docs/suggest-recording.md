## Suggest a recording — implementation notes (tracker)

Last updated: 2026-03-01

### Goal
Add a lightweight way for users to suggest new audio recordings, from the Home screen (and later from category pages), and send suggestions anonymously to an email address.

---

## What was implemented

### 1) Home CTA (box above “Explore pathways”)
- A compact card was added above the “Explore pathways / Explorează direcțiile” section on the Home page.
- Left side: lamp icon
- Right side: localized title + short description
- Click opens the suggest form and passes a `from` location so we can return after submit.

**File**
- `components/pages/Home.tsx`
  - Uses shared component: `components/ui/SuggestRecordingCta.tsx`

**Asset**
- `public/img/ui/suggest-recording.png`

---

### 2) Suggest form page (route behaving like an overlay)
Created a new in-app page that looks/behaves like an overlay:
- Localized header + intro text
- “Your privacy is important” accordion (compact, with right/down chevron)
- Category dropdown (uses existing `FLOW_CATEGORIES`, excludes `stories`)
- Suggestion textarea + Send button
- On success: thank-you overlay appears
- After the overlay is dismissed: returns to the previous page via `history.replace(from)` so back button doesn’t get stuck on the form.

**Deep-link/prefill**
- The form can preselect category via:
  - navigation state: `{ categoryId }`
  - query string: `?categoryId=<id>`

**Files**
- `components/pages/SuggestRecording.tsx`
- `components/pages/Tabs.tsx` (route added)
- `components/AppShell.tsx` (route allowed at app shell level)

---

### 2.1 Category pages CTA (same box above flows list)
- The same CTA box is shown on every category page, above the flows list.
- Clicking it opens the form with:
  - `from` set to the current category page URL
  - `categoryId` set, so the dropdown is pre-selected automatically

**File**
- `components/pages/FlowCategory.tsx`

**Shared component**
- `components/ui/SuggestRecordingCta.tsx`

---

### 3) Sending email (anonymous)
Added a backend endpoint that sends a simple email with the suggestion.
- No Clerk/user/account data is sent.
- Includes a basic honeypot and basic in-memory rate limiting.

**File**
- `app/api/suggest-recording/route.ts`

**Dependency**
- Added `resend` (email API SDK)

---

## Environment variables

Set these in **Vercel** (and optionally in local `.env.local` for local testing):

### Required
- `RESEND_API_KEY` — API key from Resend

### Optional
- `SUGGEST_RECORDING_TO_EMAIL` — recipient email
  - Default (if env var is not set): `simona.nicolaescu@dynamichr.ro`
- `SUGGEST_RECORDING_FROM_EMAIL` — sender identity
  - Default used in code: `Flow Balance <suggestions@flowbalance.app>`
  - Required for sending to non-test recipients: the `from` address must use a verified domain (Resend requirement)

---

## How to test
1. Set `RESEND_API_KEY` in Vercel.
2. (Optional) Set `SUGGEST_RECORDING_TO_EMAIL=alexandru.iordache@mrm.com`.
3. Set `SUGGEST_RECORDING_FROM_EMAIL=Flow Balance <suggestions@flowbalance.app>` (or any sender on your verified domain).
4. Open app → Home → “Suggest a recording”.
5. Select a category + type a suggestion (10+ chars) → Send.
6. Confirm:
   - thank-you overlay appears
   - on dismiss, you return to the previous page
   - email arrives at the recipient inbox

---

## Notes / follow-ups (later)
- Add a smaller lamp icon on category pages (if desired) that opens:
  - `history.push('/suggest-recording', { from: currentPath, categoryId })`
- If spam becomes a problem: add Turnstile/hCaptcha or stronger rate limiting.

