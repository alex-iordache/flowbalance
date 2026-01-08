'use client';

import type React from 'react';

export default function Overlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        background: 'var(--fb-bg)',
        // Avoid iOS white flashes behind the overlay
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  );
}

