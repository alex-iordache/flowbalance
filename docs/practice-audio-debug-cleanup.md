# Practice audio — debug build notes & cleanup checklist

This document tracks **temporary debugging** added for sideload testing of native practice audio (v1.0.7 / `versionCode` 8). Use it when testing is finished and before a normal Play Store release.

---

## Current debug APK target

| Field | Value | Where defined |
|-------|-------|----------------|
| `versionName` | `1.0.7` | `android/app/build.gradle`, `helpers/practiceAudioDebug.ts` |
| `versionCode` | `8` | `android/app/build.gradle`, `helpers/practiceAudioDebug.ts` |

The debug panel and log collection only run when `App.getInfo()` reports **both** values above **and** the `NativeAudio` Capacitor plugin is present. Play Store users on older APK versions never see the panel, even after a Vercel deploy.

**When building the next debug sideload:** bump `versionCode` / `versionName` in `build.gradle` and update `PRACTICE_AUDIO_DEBUG_BUILD_CODE` + `PRACTICE_AUDIO_DEBUG_VERSION_NAME` in `helpers/practiceAudioDebug.ts`.

---

## What was added for debugging

### 1. Debug log collector

**File:** `helpers/practiceAudioDebug.ts`

- In-memory log ring buffer (max 200 entries)
- `practiceAudioDebug(tag, message, detail?, level?)` — used across native audio flow
- `resolvePracticeAudioDebugEnabled()` — reads `@capacitor/app` `App.getInfo()` and gates on version/build
- `formatPracticeAudioDebugReport()` / `copyPracticeAudioDebugToClipboard()`
- `logPracticeAudioEnvironment()` — snapshot of platform, plugins, origin on practice load

### 2. Debug UI panel

**File:** `components/ui/PracticeAudioDebugPanel.tsx`

- Collapsible black panel on practice screens
- Shows live log report
- **Copy logs** → clipboard
- **Clear** → reset log buffer

**Mounted in:**

- `components/pages/Practice.tsx` (below player)
- `components/pages/StandalonePractice.tsx` (below player)

### 3. Instrumentation (log calls)

| File | What is logged |
|------|----------------|
| `helpers/nativePracticeAudio.ts` | configure, preload, play/pause/seek, permissions, foreground service |
| `helpers/nativeAudioAuth.ts` | Clerk session, bearer token presence (redacted), cookie forwarding |
| `components/ui/NativePracticeAudioPlayer.tsx` | setup, toggle, errors with message; calls `resolvePracticeAudioDebugEnabled()` before setup |

### 4. Native-only mode (no HTML5 fallback)

**Files:** `components/ui/AudioPlayer.tsx`, `components/ui/NativePracticeAudioPlayer.tsx`

- Removed `onNativeUnavailable` / `shouldFallbackToWebAudio` — when `NativeAudio` plugin exists, playback is native-only; failures show error text instead of falling back to `<audio>`.
- **Intended for debug sideload only.** Consider restoring Play Store–safe fallback before wide release (see cleanup below).

### 5. Build comment

**File:** `android/app/build.gradle`

- Comment on `versionName "1.0.7"` pointing to `practiceAudioDebug.ts` constants.

---

## Production/native work (keep — not debug-only)

These are **not** temporary debug additions; keep unless you intentionally revert the whole native audio feature:

| Area | Files |
|------|--------|
| Capgo native audio | `@capgo/native-audio`, `helpers/nativePracticeAudio.ts`, `patches/@capgo+native-audio+7.11.2.patch` |
| Auth for native HTTP fetch | `helpers/nativeAudioAuth.ts` |
| API Bearer token for `/api/audio` | `app/api/audio/route.ts` (`resolveAudioAccess`, `verifyToken`) |
| Android foreground service | `PracticeForegroundService.java`, `PracticeForegroundPlugin.java` |
| Plugin registration fix | `MainActivity.java` — `registerPlugin` **before** `super.onCreate()` |
| Local notifications permission | `@capacitor/local-notifications`, permission flow in `nativePracticeAudio.ts` |
| iOS background audio | `ios/App/App/Info.plist` — `UIBackgroundModes` → `audio` |
| Android manifest permissions | `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PLAYBACK`, `POST_NOTIFICATIONS`, etc. |
| Player routing | `components/ui/AudioPlayer.tsx` → `NativePracticeAudioPlayer` when `Capacitor.isPluginAvailable('NativeAudio')` |

---

## Cleanup checklist (remove after testing)

Use this when native audio + controls work and you are ready for a normal release.

### Remove entirely

- [ ] `helpers/practiceAudioDebug.ts`
- [ ] `components/ui/PracticeAudioDebugPanel.tsx`
- [ ] `docs/practice-audio-debug-cleanup.md` (this file)

### Remove imports & UI wiring

- [ ] `components/pages/Practice.tsx` — remove `PracticeAudioDebugPanel` import and JSX block
- [ ] `components/pages/StandalonePractice.tsx` — remove `PracticeAudioDebugPanel` import and JSX block

### Remove debug calls from production files

- [ ] `helpers/nativePracticeAudio.ts` — remove all `practiceAudioDebug(...)` and `practiceAudioDebug` import
- [ ] `helpers/nativeAudioAuth.ts` — remove all `practiceAudioDebug(...)` and import
- [ ] `components/ui/NativePracticeAudioPlayer.tsx` — remove `practiceAudioDebug`, `resolvePracticeAudioDebugEnabled` imports and calls; optional: simplify `errorDetail` UI if you prefer generic copy

### Revisit native-only / fallback behavior

- [ ] Decide Play Store policy: restore HTML5 fallback in `AudioPlayer` for old APKs without `NativeAudio` (was removed for debug clarity). Pattern:

  ```tsx
  // Old APK (no plugin) → WebAudioPlayer automatically
  // New APK, native fails → fallback vs hard error
  ```

- [ ] If restoring fallback: re-add `onNativeUnavailable` on `NativePracticeAudioPlayer` and `useState` in `AudioPlayer.tsx` (see git history).

### Build / version hygiene

- [ ] Remove debug comment from `android/app/build.gradle` (`// debug sideload: keep in sync with...`)
- [ ] Bump `versionCode` / `versionName` for Play Store release
- [ ] Rebuild prod APK after cleanup

### Optional log noise

- [ ] `PracticeForegroundPlugin.java` — `Log.i` / `Log.w` tags (`PracticeForeground`) can stay for native debugging or be stripped for release

---

## Known issues being investigated (context for logs)

1. **New APK + Vercel:** Native Capgo fetches `/api/audio` outside WebView → needs auth headers (`nativeAudioAuth.ts`) + API Bearer support.
2. **Play Store old APK:** No `NativeAudio` plugin → uses HTML5 player; no permissions/controls until store update.
3. **Remote-first:** JS ships via Vercel; native code ships via APK — both must be aligned for full native path.
4. **Permissions / lock-screen controls:** Still under test on v1.0.7; use **Copy logs** on debug panel and paste for analysis.

---

## Test workflow (sideload)

1. Commit + deploy to Vercel (JS changes).
2. Install sideload APK **v1.0.7** (`versionCode` 8).
3. Open a practice → confirm debug panel appears (only on this build).
4. Tap Play → watch logs for `auth`, `preload`, `perm`, `fg`, `native`.
5. Tap **Copy logs** → share for debugging.
6. When done: follow cleanup checklist above before Play Store submission.

---

## Rollback (if deploy breaks production)

Vercel: promote last known-good deployment (`d7403d0` — *backfill users scripts*, Jun 10).

Play Store users on old APK keep working on HTML5 as long as fallback is not removed for their code path.
