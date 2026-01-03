'use client';

import { useUser } from '@clerk/nextjs';
import { Preferences } from '@capacitor/preferences';
import { useEffect } from 'react';

import Store from '../store';

const SUPERADMIN_EMAIL = 'lex131@gmail.com';
const STORAGE_KEY = 'flow_is_super_admin';

async function readPersistedFlag(): Promise<boolean> {
  // Web (fast path)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === '1') return true;
    if (raw === '0') return false;
  } catch {
    // ignore
  }

  // Capacitor (native + web fallback)
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    return value === '1';
  } catch {
    return false;
  }
}

async function writePersistedFlag(value: boolean): Promise<void> {
  const v = value ? '1' : '0';
  try {
    localStorage.setItem(STORAGE_KEY, v);
  } catch {
    // ignore
  }
  try {
    await Preferences.set({ key: STORAGE_KEY, value: v });
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
      const persisted = await readPersistedFlag();
      if (cancelled) return;
      Store.update(s => {
        s.isSuperAdmin = persisted;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Single decision point after sign-in: compute + persist the flag from Clerk user email.
  useEffect(() => {
    if (!isLoaded || !user) return;
    const email = user.primaryEmailAddress?.emailAddress?.toLowerCase() ?? '';
    const isSuperAdmin = email === SUPERADMIN_EMAIL;

    const current = Store.getRawState().isSuperAdmin;
    if (current !== isSuperAdmin) {
      Store.update(s => {
        s.isSuperAdmin = isSuperAdmin;
      });
      void writePersistedFlag(isSuperAdmin);
    }
  }, [isLoaded, user]);

  return null;
}

