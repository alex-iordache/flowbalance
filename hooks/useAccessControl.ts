'use client';

import { useAuth, useUser, useOrganization } from '@clerk/nextjs';

export interface AccessControlResult {
  hasFullAccess: boolean;
  userType: 'guest' | 'organization' | 'free' | 'pro';
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
  const { has, userId } = useAuth();
  const { user } = useUser();
  const { organization } = useOrganization();

  // Check if user is authenticated
  const isAuthenticated = !!userId;

  // Type B: Organization users
  // Preferred: Clerk organizations via useOrganization()
  if (organization) {
    return {
      hasFullAccess: true,
      userType: 'organization',
      isAuthenticated: true,
      organization: organization.name,
      plan: null,
    };
  }

  // Fallback: org-like users by email domain (for future orgs)
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const emailDomain = email.split('@')[1]?.toLowerCase() || '';
  const orgDomains = ['jordache.me', 'dynamichr.ro'];
  const isOrgUser = orgDomains.includes(emailDomain);

  if (isOrgUser) {
    return {
      hasFullAccess: true,
      userType: 'organization',
      isAuthenticated: true,
      organization: emailDomain,
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
  const { hasFullAccess, userType } = useAccessControl();

  // Full access users can access everything
  if (hasFullAccess) {
    return true;
  }

  // First practice of first flow is free for everyone
  // (flowIndex === 0 && practiceIndex === 0)
  if (flowIndex === 0 && practiceIndex === 0) {
    return true;
  }

  // All other practices require full access
  return false;
}
