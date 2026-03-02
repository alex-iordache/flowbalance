# Audio Stats (Axiom)

Last updated: 2026-03-02

## Goal
- Provide an **admin-only** (web-only) Stats view showing **aggregated counts** of audio access.
- Avoid in-app analytics for end users; rely on **server-side structured logs** + Axiom aggregation.
- Enforce allowlist on **UI + API** using a server-only env var.
- Support B2B companies that **share logins** by tracking **active devices per organization** (privacy-friendly).

## What’s implemented in the codebase

### 1) Allowlist helper (server-side)
- File: `lib/statsAllow.ts`
- Env vars:
  - `STATS_ALLOWED_EMAILS` (comma-separated emails, lowercase)
  - `STATS_ENABLED` (optional; if unset, stats are enabled; set to `0` to disable)
- Defaults (if `STATS_ALLOWED_EMAILS` is missing):  
  - `alex@flowbalance.app,simona@flowbalance.app`

### 2) Permission endpoint (UI + API gating)
- `GET /api/stats/allow`
- Returns: `{ allowed: boolean }`
- Used by:
  - Settings UI (decide whether to show Stats button)
  - Stats page (hard-block + redirect if not allowed)

### 3) Structured logs for audio access
- File: `app/api/audio/route.ts`
- Emits one JSON log line to Vercel logs (to be drained to Axiom) when:
  - R2 returned `200` or `206`
  - the request is “initial-ish” (no Range header, or `Range: bytes=0-...`)
- Event schema (example fields):
  - `event: "audio_access"`
  - `ts` (ISO string)
  - `audioKey` (normalized key)
  - `orgId` (Clerk org id from the server session, or null)
  - `installId` (privacy-friendly per-install id from the client, or null)
  - `flowId`, `practiceId`
  - `categoryId`
  - `categoryNameRo`, `categoryNameEn`
  - `flowNameRo`, `flowNameEn`
  - `practiceNameRo`, `practiceNameEn`
  - `rangeStart`
  - `r2Status`

### 4) Stats query endpoint (server-side, Axiom-backed)
- `GET /api/stats/audio?range=24h|7d|30d|365d`
- Enforces allowlist via `lib/statsAllow.ts`
- Queries Axiom using APL (`/v1/datasets/_apl?format=tabular`) and returns:
  - `{ range, rows: [...] }`
  - rows are **grouped by**: `categoryId`, `flowId`, `practiceId`, `audioKey` with `accesses=count()`

Required env vars:
- `AXIOM_TOKEN`
- `AXIOM_DATASET`
- Optional: `AXIOM_ORG_ID` (only needed for some token types)

### 5) Web-only UI
- Settings button (web-only, allowlisted):
  - File: `components/pages/Settings.tsx`
  - Label: **Audio stats (web)** / **Statistici audio (web)**
  - Route: `/settings/stats`
- Stats page:
  - File: `components/pages/AudioStats.tsx`
  - Organization selector dropdown (Clerk org list)
  - Renders 4 always-visible cards:
    - `24h`, `7d`, `30d`, `365d`
    - **Active devices** (distinct `installId`)
    - **Plays** (estimated)

### 6) Org/device endpoints (admin-only)
- `GET /api/stats/orgs`
  - Returns `{ orgs: [{ id, name, slug }] }` for the dropdown.
- `GET /api/stats/org-usage?orgId=...`
  - Returns `{ orgId, ranges: { 24h: { activeDevices, plays }, 7d: ..., 30d: ..., 365d: ... } }`

## Manual setup (Vercel → Axiom)

### 1) Connect Vercel logs to Axiom
- In Vercel project settings, add an Axiom Log Drain / Integration.
- Choose (or create) the Axiom dataset you’ll use for logs.

### 2) Confirm the logs arrive in Axiom
In Axiom, run an APL query like:

```apl
['YOUR_DATASET'] | search "*audio_access*" | limit 10
```

If the dataset doesn’t have an `event` column (common with Vercel drains), use JSON parsing:

```apl
['YOUR_DATASET']
| search "*\"event\":\"audio_access\"*"
| extend raw = coalesce(
    ensure_field('message', typeof(string)),
    ensure_field('line', typeof(string)),
    ensure_field('log', typeof(string)),
    ensure_field('msg', typeof(string))
  )
| extend j = parse_json(raw)
| where tostring(j.event) == "audio_access"
| limit 10
```

You should see rows containing the JSON fields logged from `app/api/audio/route.ts`.

### 3) Create an Axiom API token
- Create a token with **query permissions**.
- Set Vercel env vars:
  - `AXIOM_TOKEN`
  - `AXIOM_DATASET`
  - (optional) `AXIOM_ORG_ID`

## Vercel environment variables (recommended)
- **Stats allowlist**:
  - `STATS_ALLOWED_EMAILS=alex@flowbalance.app,simona@flowbalance.app`
  - `STATS_ENABLED=1`
- **Axiom query**:
  - `AXIOM_TOKEN=...`
  - `AXIOM_DATASET=...`
  - `AXIOM_ORG_ID=...` (optional)

## Notes / caveats
- The Stats numbers are an **estimate of “plays”** based on counting only initial-ish requests (`rangeStart == 0` or missing). Browsers can make multiple Range requests per play/seek.
- **Shared logins (B2B)**: for company usage, rely on:
  - `orgId` (from Clerk session on the server) to attribute activity to a company
  - `installId` (random per-install id) to estimate how many devices are active
- We do **not** log user identifiers or hardware identifiers; `installId` is a random UUID stored locally (web: `localStorage`, native: Capacitor `Preferences`).

## APL validation for org active devices
Example query to validate “active devices” for a single org:

```apl
['YOUR_DATASET']
| search "*\"event\":\"audio_access\"*"
| extend raw = coalesce(
    ensure_field('message', typeof(string)),
    ensure_field('line', typeof(string)),
    ensure_field('log', typeof(string)),
    ensure_field('msg', typeof(string))
  )
| extend j = parse_json(raw)
| where tostring(j.event) == "audio_access"
| where tostring(j.orgId) == "org_XXXXX"
| extend rangeStart = toint(j.rangeStart)
| where isnull(rangeStart) or rangeStart == 0
| where isnotempty(tostring(j.installId))
| summarize activeDevices=dcount(tostring(j.installId)), plays=count()
```

