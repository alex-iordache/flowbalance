import { NextRequest, NextResponse } from 'next/server';

const APP_STORE_URL = 'https://apps.apple.com/ro/app/flow-balance/id6758552078';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.flowbalance.app&pcampaignid=web_share';
const FALLBACK_URL = 'https://www.flowbalance.app';

function isIOS(ua: string): boolean {
  // iPhone/iPad/iPod + iPadOS desktop UA that still contains "Mobile".
  return /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && /Mobile/i.test(ua));
}

function isAndroid(ua: string): boolean {
  return /Android/i.test(ua);
}

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';

  if (isIOS(ua)) {
    return NextResponse.redirect(APP_STORE_URL, { status: 302 });
  }

  if (isAndroid(ua)) {
    return NextResponse.redirect(PLAY_STORE_URL, { status: 302 });
  }

  return NextResponse.redirect(FALLBACK_URL, { status: 302 });
}

