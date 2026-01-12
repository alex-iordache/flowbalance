'use client';

import { useUser } from '@clerk/nextjs';
import { Preferences } from '@capacitor/preferences';
import { useEffect } from 'react';

import Store from '../store';
import rights from '../config/userRights.json';

const STORAGE_KEY_SUPERADMIN = 'flow_is_super_admin';
const STORAGE_KEY_EDITOR = 'flow_is_editor';

type PersistedFlags = { isSuperAdmin: boolean; isEditor: boolean };

function normalizeEmail(s: unknown): string {
  return typeof s === 'string' ? s.trim().toLowerCase() : '';
}

function listHasEmail(list: unknown, email: string): boolean {
  if (!email) return false;
  if (!Array.isArray(list)) return false;
  return list.map(normalizeEmail).includes(email);
}

function computeRoles(email: string): PersistedFlags {
  const superAdmins = (rights as any)?.userRights?.superAdmin ?? [];
  const editors = (rights as any)?.userRights?.editor ?? [];
  return {
    isSuperAdmin: listHasEmail(superAdmins, email),
    isEditor: listHasEmail(editors, email),
  };
}

async function readPersistedFlags(): Promise<PersistedFlags> {
  // Web (fast path)
  try {
    const rawSuper = localStorage.getItem(STORAGE_KEY_SUPERADMIN);
    const rawEditor = localStorage.getItem(STORAGE_KEY_EDITOR);
    if (rawSuper != null || rawEditor != null) {
      return {
        isSuperAdmin: rawSuper === '1',
        isEditor: rawEditor === '1',
      };
    }
  } catch {
    // ignore
  }

  // Capacitor (native + web fallback)
  try {
    const [s, e] = await Promise.all([
      Preferences.get({ key: STORAGE_KEY_SUPERADMIN }),
      Preferences.get({ key: STORAGE_KEY_EDITOR }),
    ]);
    return {
      isSuperAdmin: s.value === '1',
      isEditor: e.value === '1',
    };
  } catch {
    return { isSuperAdmin: false, isEditor: false };
  }
}

async function writePersistedFlags(value: PersistedFlags): Promise<void> {
  const vSuper = value.isSuperAdmin ? '1' : '0';
  const vEditor = value.isEditor ? '1' : '0';
  try {
    localStorage.setItem(STORAGE_KEY_SUPERADMIN, vSuper);
    localStorage.setItem(STORAGE_KEY_EDITOR, vEditor);
  } catch {
    // ignore
  }
  try {
    await Promise.all([
      Preferences.set({ key: STORAGE_KEY_SUPERADMIN, value: vSuper }),
      Preferences.set({ key: STORAGE_KEY_EDITOR, value: vEditor }),
    ]);
  } catch {
    // ignore
  }
}

export default function SuperAdminBootstrap() {
  const { isLoaded, user } = useUser();

  // Hydrate Store from persisted flag early (so admin UI can show immediately on reload).
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const persisted = await readPersistedFlags();
      if (cancelled) return;
      Store.update(s => {
        s.isSuperAdmin = persisted.isSuperAdmin;
        s.isEditor = persisted.isEditor;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Single decision point after sign-in: compute + persist the flag from Clerk user email.
  useEffect(() => {
    if (!isLoaded || !user) return;
    const email = normalizeEmail(user.primaryEmailAddress?.emailAddress);
    const next = computeRoles(email);

    const current = Store.getRawState();
    if (current.isSuperAdmin !== next.isSuperAdmin || current.isEditor !== next.isEditor) {
      Store.update(s => {
        s.isSuperAdmin = next.isSuperAdmin;
        s.isEditor = next.isEditor;
      });
      void writePersistedFlags(next);
    }
  }, [isLoaded, user]);

  return null;
}

