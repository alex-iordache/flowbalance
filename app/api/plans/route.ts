import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

/**
 * API Route to fetch billing plans from Clerk
 * 
 * Returns plan data including name, description, price, and features
 */
export async function GET() {
  try {
    const client = await clerkClient();
    const plans = await client.billing.getPlanList();
    
    return NextResponse.json({ 
      plans: plans.data,
      success: true 
    });
  } catch (error) {
    console.error('[API] Error fetching plans:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch plans',
      success: false 
    }, { status: 500 });
  }
}
