# Native audio debug session (sideload APK)

Track what was added to debug native practice playback, permissions, notifications, and lock-screen controls on the **sideload APK only**.

**Current debug APK target**

| Field | Value | Where defined |
|-------|-------|----------------|
| `versionName` | `1.0.9` | `android/app/build.gradle`, `helpers/practiceAudioDebug.ts` |
| `versionCode` | `10` | `android/app/build.gradle`, `helpers/practiceAudioDebug.ts` |
| Min build for debug panel | `8` | `helpers/practiceAudioDebug.ts` (`PRACTICE_AUDIO_DEBUG_MIN_BUILD_CODE`) |

The debug panel and log collection only run when `App.getInfo()` reports **both** values above **and** the `NativeAudio` plugin is present. Play Store users on older APK versions never see the panel, even after a Vercel deploy.

When building the next sideload debug APK, bump version in `build.gradle` **and** update `PRACTICE_AUDIO_DEBUG_*` in `helpers/practiceAudioDebug.ts`.

---

## What was added for debugging

### 1. Debug logging system

**File:** `helpers/practiceAudioDebug.ts`

- In-memory log ring buffer (max 200 entries)
- `practiceAudioDebug(tag, message, detail?, level?)` — used across native audio flow
- `resolvePracticeAudioDebugEnabled()` — reads `@capacitor/app` `App.getInfo()` and gates on APK version/build
- `formatPracticeAudioDebugReport()` / `copyPracticeAudioDebugToClipboard()` — for the Copy logs button
- `logPracticeAudioEnvironment()` — snapshot of platform, plugins, origin on practice load

### 2. Debug UI panel

**File:** `components/ui/PracticeAudioDebugPanel.tsx`

- Collapsible black panel on practice screens
- Shows full log report
- **Copy logs** → clipboard
- **Clear** → reset log buffer

**Mounted in:**

- `components/pages/Practice.tsx` (below player)
- `components/pages/StandalonePractice.tsx` (below player)

### 3. Instrumentation calls

**File:** `helpers/nativePracticeAudio.ts`

- Logs: configure, preload, play/pause/resume/seek/stop, duration, foreground service, permissions

**File:** `helpers/nativeAudioAuth.ts`

- Logs: Clerk session presence, bearer token (length only, not value), cookie forwarding (keys + lengths only)

**File:** `components/ui/NativePracticeAudioPlayer.tsx`

- Calls `resolvePracticeAudioDebugEnabled()` at setup start
- Logs: setup, toggle, errors
- **`errorDetail` state** — shows `Native audio failed: <message>` in the player UI (verbose, for debugging)

### 4. Testing-only playback behavior

**File:** `components/ui/AudioPlayer.tsx`

- **No HTML5 fallback** when `NativeAudio` plugin exists — native path only; errors surface instead of silently falling back to `<audio>`
- (Play Store old APK still uses HTML5 because it has no `NativeAudio` plugin.)

### 5. Build comment

**File:** `android/app/build.gradle`

- Comment on `versionName` reminding to keep sync with `PRACTICE_AUDIO_DEBUG_*`

---

## Production changes (keep — not debug-only)

These are part of the native audio feature and should **stay** after testing (unless you deliberately revert the whole feature):

| Area | Files |
|------|--------|
| Capgo native audio player | `helpers/nativePracticeAudio.ts`, `components/ui/NativePracticeAudioPlayer.tsx`, `components/ui/AudioPlayer.tsx` |
| Auth for native HTTP fetch | `helpers/nativeAudioAuth.ts` |
| Bearer token on `/api/audio` | `app/api/audio/route.ts` (`resolveAudioAccess`) |
| Android foreground service | `PracticeForegroundService.java`, `PracticeForegroundPlugin.java` |
| Plugin registration | `MainActivity.java` (`registerPlugin` before `super.onCreate()`) |
| Capgo patch (background playback) | `patches/@capgo+native-audio+7.11.2.patch` |
| Dependencies | `@capgo/native-audio`, `@capacitor/local-notifications` |
| iOS background audio | `ios/App/App/Info.plist` (`UIBackgroundModes`) |
| Android manifest permissions | `AndroidManifest.xml` |

---

## Cleanup checklist (when testing is done)

Use this before shipping native audio to Play Store for all users.

### Remove entirely

- [ ] `helpers/practiceAudioDebug.ts`
- [ ] `components/ui/PracticeAudioDebugPanel.tsx`
- [ ] `docs/native-audio-debug-session.md` (this file)

### Remove imports / usage

- [ ] `components/pages/Practice.tsx` — `PracticeAudioDebugPanel` import + JSX block
- [ ] `components/pages/StandalonePractice.tsx` — `PracticeAudioDebugPanel` import + JSX block
- [ ] `helpers/nativePracticeAudio.ts` — remove `practiceAudioDebug` import and all `practiceAudioDebug(...)` calls
- [ ] `helpers/nativeAudioAuth.ts` — remove `practiceAudioDebug` import, `summarizeHeaders` if only used for logs, and all `practiceAudioDebug(...)` calls
- [ ] `components/ui/NativePracticeAudioPlayer.tsx` — remove `practiceAudioDebug`, `resolvePracticeAudioDebugEnabled` import; remove all debug calls; remove `await resolvePracticeAudioDebugEnabled()` in setup

### Simplify UI / behavior (recommended for production)

- [ ] `NativePracticeAudioPlayer.tsx` — remove or shorten `errorDetail` (e.g. back to generic `"Audio failed to play"` instead of exposing native error strings)
- [ ] `AudioPlayer.tsx` — **consider restoring HTML5 fallback** for old APK users until everyone updates, or keep native-only once Play Store ships the new native APK to all users (see note below)

### Build / version

- [ ] `android/app/build.gradle` — remove debug sync comment on `versionName` when no longer using version-gated debug panel
- [ ] Bump `versionCode` / `versionName` for the **production** Play Store release (not tied to debug constants)

### Optional (if you no longer need sideload-only debugging)

- [ ] Remove `PRACTICE_AUDIO_DEBUG_BUILD_CODE` / `PRACTICE_AUDIO_DEBUG_VERSION_NAME` concepts entirely (deleted with `practiceAudioDebug.ts`)

---

## HTML5 fallback decision (post-testing)

| Strategy | When |
|----------|------|
| **Keep native-only** (current) | After Play Store release includes `NativeAudio` + foreground service for everyone |
| **Restore fallback** in `AudioPlayer` / `NativePracticeAudioPlayer` | If you deploy JS to Vercel **before** all users have the new APK — protects old APK users if native preload fails |

The fallback removed for this session was:

```tsx
// AudioPlayer.tsx — previously switched to WebAudioPlayer on native failure
onNativeUnavailable={() => setUseNative(false)}
```

---

## How to test with this build

1. Commit + deploy to Vercel (JS includes debug panel gate + logging).
2. Install sideload APK **v1.0.9 (build 10)** — `android/app/build/outputs/apk/prod/release/app-prod-release.apk`
3. Open a practice → tap Play.
4. Confirm debug panel appears at bottom (only on this APK version).
5. Tap **Copy logs** → paste for analysis.

Play Store users on older APKs: no debug panel, HTML5 audio if no `NativeAudio` plugin.

---

## Open issues being investigated

- [ ] Native audio fails or falls back on sideload APK (auth / preload / permissions)
- [ ] No notification permission dialog
- [ ] No lock-screen / notification media controls
- [ ] Background playback past screen-off (~5 min)

Log tags to look for when copying logs: `env`, `auth`, `native`, `perm`, `fg`, `player`.
