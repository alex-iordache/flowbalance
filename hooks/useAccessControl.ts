'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export interface AccessControlResult {
  hasFullAccess: boolean;
  userType: 'guest' | 'organization' | 'free' | 'pro' | 'trial';
  isAuthenticated: boolean;
  organization: string | null;
  plan: string | null;
}

/**
 * Custom hook to check user's access level based on:
 * 1. Organization membership (Type B - automatic full access)
 * 2. Subscription plan (Type A - free_user or pro_user)
 * 3. Guest status (no authentication)
 * 
 * According to Clerk documentation:
 * - useOrganization(): https://clerk.com/docs/guides/organizations/overview
 * - has(): https://clerk.com/docs/billing/overview
 */
export function useAccessControl(): AccessControlResult {
  const { has, userId, orgId } = useAuth();
  const { user } = useUser();

  // Check if user is authenticated
  const isAuthenticated = !!userId;

  // Type B: Organization users (via Clerk session orgId)
  if (isAuthenticated && orgId) {
    return {
      hasFullAccess: true,
      userType: 'organization',
      isAuthenticated: true,
      organization: orgId,
      plan: null,
    };
  }

  // Type A: Regular authenticated users - check subscription
  if (isAuthenticated) {
    // Check if user has pro_user plan (configured in Clerk Dashboard)
    const hasProPlan = has?.({ plan: 'pro_user' }) ?? false;
    
    // Check if user has free_user plan
    const hasFreePlan = has?.({ plan: 'free_user' }) ?? false;

    if (hasProPlan) {
      return {
        hasFullAccess: true,
        userType: 'pro',
        isAuthenticated: true,
        organization: null,
        plan: 'pro_user',
      };
    }

    // 3-day trial for normal users (non-org, non-pro) based on Clerk account creation date.
    // NOTE: `user.createdAt` is a Date in Clerk's frontend User resource.
    const createdAtMs = user?.createdAt ? user.createdAt.getTime() : null;
    const trialMs = 72 * 60 * 60 * 1000;
    const trialActive = typeof createdAtMs === 'number' && Date.now() < createdAtMs + trialMs;
    if (trialActive) {
      return {
        hasFullAccess: true,
        userType: 'trial',
        isAuthenticated: true,
        organization: null,
        plan: hasFreePlan ? 'free_user' : null,
      };
    }

    if (hasFreePlan) {
      return {
        hasFullAccess: false,
        userType: 'free',
        isAuthenticated: true,
        organization: null,
        plan: 'free_user',
      };
    }

    // Authenticated but no plan
    return {
      hasFullAccess: false,
      userType: 'free',
      isAuthenticated: true,
      organization: null,
      plan: null,
    };
  }

  // Guest user (not authenticated)
  return {
    hasFullAccess: false,
    userType: 'guest',
    isAuthenticated: false,
    organization: null,
    plan: null,
  };
}

/**
 * Helper to check if a specific practice is accessible
 * 
 * @param flowId - The ID of the flow
 * @param practiceId - The ID of the practice
 * @param flowIndex - The index of the flow in the flows array (0-based)
 * @param practiceIndex - The index of the practice in the flow's practices array (0-based)
 * @returns boolean - whether the practice is accessible
 */
export function usePracticeAccess(
  flowId: string,
  practiceId: string,
  flowIndex: number,
  practiceIndex: number
): boolean {
  const { hasFullAccess } = useAccessControl();

  // Full access users can access everything
  if (hasFullAccess) {
    return true;
  }

  // After trial expires, everything is Premium for normal users.
  return false;
}
