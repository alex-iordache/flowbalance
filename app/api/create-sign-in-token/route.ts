import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * API route to create a transferable sign-in token
 * This allows users to authenticate in external browsers
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Create a sign-in token that can be used in external browser
    const signInToken = await (await clerkClient()).signInTokens.createSignInToken({
      userId,
      expiresInSeconds: 3600, // 1 hour expiry
    });

    return NextResponse.json({ token: signInToken.token });
  } catch (error) {
    console.error('Error creating sign-in token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
