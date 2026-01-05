'use client';

export type RuntimeFlagName = 'enableDebugBox' | 'debugWindowOpenLog';

type FlagsState = Record<RuntimeFlagName, boolean>;

/**
 * Committed defaults.
 * - Flip these in git when you want a default-on debug build (requires deploy/rebuild).
 * - For ad-hoc device debugging, use the localStorage overrides via DebugInfoBox.
 */
export const DEFAULT_RUNTIME_FLAGS: FlagsState = {
  enableDebugBox: false,
  debugWindowOpenLog: false,
};

const STORAGE_KEY = 'fb_runtime_flags_v1';

function safeReadStorage(): Partial<FlagsState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Partial<FlagsState>;
  } catch {
    return {};
  }
}

function safeWriteStorage(next: Partial<FlagsState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getRuntimeFlags(): FlagsState {
  const stored = typeof window !== 'undefined' ? safeReadStorage() : {};
  return {
    enableDebugBox: stored.enableDebugBox ?? DEFAULT_RUNTIME_FLAGS.enableDebugBox,
    debugWindowOpenLog: stored.debugWindowOpenLog ?? DEFAULT_RUNTIME_FLAGS.debugWindowOpenLog,
  };
}

export function getRuntimeFlag(name: RuntimeFlagName): boolean {
  return getRuntimeFlags()[name];
}

export function setRuntimeFlag(name: RuntimeFlagName, value: boolean): void {
  const curr = typeof window !== 'undefined' ? safeReadStorage() : {};
  safeWriteStorage({ ...curr, [name]: value });
}

export function clearRuntimeFlags(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}


