## FlowBalance content playbook (Flows / Practices / Audio / Images)

This is the “minimum spec” and the project conventions for adding new content fast and safely.

### Source of truth
- **Flows**: `data/flows/<FlowId>/flow.tsx`
- **Practices**: `data/flows/<FlowId>/(Day-<N>|Story-<N>)/practice.tsx`
- **Standalone practices list**: derived automatically by scanning practices (no separate registry)
  - Index logic: `helpers/standaloneAudioIndex.ts`
  - UI: `components/pages/StandalonePractices.tsx`

### Audio location + keys (IMPORTANT)
- **Romanian audio keys** must be: `audioFiles/<slug>.mp3`
- **English audio keys** must be: `audioFilesEnAi/<slug>-en.mp3`
- In `practice.tsx`, always set:
  - `audioUrl.ro = "audioFiles/<file>.mp3"`
  - `audioUrl.en = "audioFilesEnAi/<file>-en.mp3"` (optional, but if present should follow this pattern)
- Do **not** use full URLs in `audioUrl`. Use keys only.

### Titles for Standalone Practices (required for nice UI)
- Add every new canonical audio filename to `data/audioTitles.json`:

```json
"some-audio.mp3": { "ro": "Titlu RO", "en": "Title EN" }
```

- If you don’t, the UI falls back to a filename-like title (works, but looks rough).

### Audio aliases (legacy renames only)
- Use `data/audioAliases.json` only when you need to remap a legacy filename to a new canonical one.
- Example:

```json
"VECHI-old-name.mp3": "new-name.mp3"
```

### Practice conventions
- A practice is a plain object (`Practice`) exported as default.
- Required fields (project convention):
  - `id`: unique and stable
  - `position`: number used for ordering inside a flow
  - `title` + `name`: `{ ro, en }`
  - `audioUrl`: `{ ro, en? }` using the key rules above
  - `finished: false`, `lastPositionSec: 0` for initial state
- For “pick-a-recording” story flows, practices are stored under `Story-<N>/practice.tsx`.

### Wiring practices into a flow
In `data/flows/<FlowId>/flow.tsx`:
- Import new practices:
  - `import practice_2 from './Story-2/practice'`
- Update:
  - `totalPractices`
  - `practices: [practice_1, practice_2, ...]` (order matters)

### Flow images
- Flow `image` is typically:
  - `image: { ro: '/img/flows/<name>.webp', en: '/img/flows/<name>.webp' }`
- Prefer `.webp` and kebab-case filenames.

### Standalone Practices behavior (FYI)
- Standalone list is built from all flows by scanning `practice.audioUrl.ro`.
- English availability is detected only when `practice.audioUrl.en` starts with `audioFilesEnAi/`.
- Some flows are intentionally excluded from standalone exercises (see `helpers/standaloneAudioIndex.ts`).

### Minimal prompt you need to give next time
For adding practices fast, provide only:
- **FlowId**
- For each practice:
  - RO title, EN title
  - RO mp3 filename, EN mp3 filename
  - position + whether it’s `Day-*` or `Story-*`

