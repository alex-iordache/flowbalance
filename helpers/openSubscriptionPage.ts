'use client';

import { openExternalUrl } from './openExternal';
import { getWebBaseUrl } from './webBaseUrl';

/**
 * Opens the subscription page in external browser with authentication token
 * 
 * For Clerk authentication to work in the external browser, we need to:
 * 1. Get the current session token from the app
 * 2. Pass it as a URL parameter
 * 3. The subscribe-web page will use it to authenticate
 */
export async function openSubscriptionPage() {
  try {
    // Get Clerk session token from current session
    // This requires useAuth hook, so we'll pass the token as parameter
    const baseUrl = `${getWebBaseUrl()}/subscribe-web`;
    
    // For now, open without token - the user will need to sign in
    // The proper solution requires Clerk's "transferable sessions" API
    await openExternalUrl(baseUrl);
  } catch (error) {
    console.error('Error opening subscription page:', error);
    // Fallback: just open the URL
    await openExternalUrl(`${getWebBaseUrl()}/subscribe-web`);
  }
}
