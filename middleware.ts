import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Canonicalize production host to www to avoid mixed-host redirects (important for Capacitor).
  // If the WebView ever navigates to a host not allowlisted, it can open externally.
  if (request.nextUrl.protocol === 'https:' && request.nextUrl.hostname === 'flowbalance.app') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.flowbalance.app';
    return NextResponse.redirect(url, 308);
  }

  // For mobile apps, we rely on client-side auth checks only
  // Server-side protection causes browser redirects in Capacitor
  // All routes are accessible, auth checks happen in components
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
