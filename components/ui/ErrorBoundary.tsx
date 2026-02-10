'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
};

type State = { error: Error | null };

/**
 * Minimal error boundary to prevent "blank purple screen" failures.
 * Shows a readable message in-app and logs full error to console.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] UI crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    const msg = this.state.error?.message || String(this.state.error);

    return (
      <div className="h-full w-full flex items-center justify-center px-6">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          <div className="text-white text-[20px] md:text-[28px] font-semibold">
            {this.props.title ?? 'Something went wrong'}
          </div>
          <div className="mt-3 text-white/85 text-[13px] md:text-[15px] leading-snug">
            The app hit a UI error. Please refresh. If this keeps happening, share the message below.
          </div>
          <div
            className="mt-4 rounded-2xl p-4 text-white/90 text-[12px] md:text-[13px]"
            style={{ backgroundColor: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            {msg}
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 w-full rounded-2xl py-3 font-semibold bg-white text-[#3b1b6a]"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}

