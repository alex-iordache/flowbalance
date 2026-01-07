import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

function summarizeCookieNames(names: string[]) {
  const unique = Array.from(new Set(names)).sort();
  const clerkLike = unique.filter(
    n =>
      n.toLowerCase().includes('clerk') ||
      n.startsWith('__clerk') ||
      n === '__session' ||
      n === '__client' ||
      n === '__client_uat',
  );
  return { unique, clerkLike };
}

export async function GET() {
  const h = headers();
  const host = h.get('host') ?? '';

  const c = cookies();
  const all = c.getAll();
  const cookieNames = all.map(x => x.name);
  const { unique, clerkLike } = summarizeCookieNames(cookieNames);

  const res = NextResponse.json({
    ts: new Date().toISOString(),
    host,
    cookieCount: unique.length,
    cookieNames: unique,
    clerkCookieNames: clerkLike,
    hasProbeHttp: unique.includes('fb_probe_http'),
  });

  // Set a test HttpOnly cookie so we can confirm persistence across requests in iOS WKWebView.
  // We never return cookie values to the client.
  res.cookies.set({
    name: 'fb_probe_http',
    value: '1',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10 minutes
  });

  return res;
}


