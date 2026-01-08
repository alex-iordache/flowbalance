'use client';

import Store from '../../store';

export default function OfflineOverlay() {
  const props = Store.useState(s => s.overlayProps) as any;
  const message =
    typeof props?.message === 'string'
      ? props.message
      : 'No internet connection. Please check your network and try again.';

  return (
    <div className="h-full w-full flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="text-white text-[20px] font-semibold">You’re offline</div>
        <div className="mt-2 text-white/75 text-[13px] leading-snug">{message}</div>
      </div>
    </div>
  );
}

