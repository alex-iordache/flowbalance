'use client';

import { useEffect, useState } from 'react';
import { getRuntimeFlag, type RuntimeFlagName } from '../config/runtimeFlags';

export function useRuntimeFlag(name: RuntimeFlagName): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getRuntimeFlag(name));

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'fb_runtime_flags_v1') {
        setEnabled(getRuntimeFlag(name));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [name]);

  return enabled;
}


