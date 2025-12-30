# Sign-Up Flow Documentation

## Updated Behavior ✅

After signing up, users are intelligently redirected based on their account type:

### Organization Users (Type B)
**Email domains**: `@jordache.me`, `@dynamichr.ro`

```
Sign Up → Auth Complete → Detect Organization → Redirect to /home
                                ↓
                         All practices unlocked!
                         No payment required ✅
```

### Regular Users (Type A)
**All other email domains**

```
Sign Up → Auth Complete → No Organization → Redirect to /subscribe
                                ↓
                         PricingTable displayed
                         User chooses plan:
                            - Free Plan ($0)
                            - Pro Plan ($9.99/mo)
```

---

## Code Implementation

### Sign-Up Page (`app/sign-up/[[...sign-up]]/page.tsx`)

```typescript
const { isLoaded, userId } = useAuth();
const { organization, isLoaded: orgLoaded } = useOrganization();

useEffect(() => {
  if (isLoaded && userId && orgLoaded) {
    if (organization) {
      // Organization user → Full access → Home
      window.location.href = '/home';
    } else {
      // Regular user → Needs plan → Subscribe page
      window.location.href = '/subscribe';
    }
  }
}, [isLoaded, userId, orgLoaded, organization]);
```

### Sign-In Page (`app/sign-in/[[...sign-in]]/page.tsx`)

For **existing users** signing back in:

```typescript
useEffect(() => {
  if (isLoaded && userId) {
    // Existing users always go to home
    // They've already made their subscription choice
    window.location.href = '/home';
  }
}, [isLoaded, userId]);
```

---

## User Flows by Scenario

### Scenario 1: New Organization User Signs Up

1. User goes to `/sign-up`
2. Enters email: `john@jordache.me`
3. Signs up with Google OAuth
4. Clerk detects verified domain `jordache.me`
5. `useOrganization()` returns organization object
6. **Redirected to `/home`**
7. All practices unlocked (no payment needed)

### Scenario 2: New Regular User Signs Up

1. User goes to `/sign-up`
2. Enters email: `jane@gmail.com`
3. Signs up with Google OAuth
4. `useOrganization()` returns `null` (no organization)
5. **Redirected to `/subscribe`**
6. Sees pricing table with Free and Pro plans
7. Can choose:
   - **Pro Plan**: Subscribe via Stripe → All practices unlocked
   - **Free Plan**: Click "Back to App" → Only first practice accessible
   - **Skip**: Click "Back to App" → Can upgrade later from Settings

### Scenario 3: Existing User Signs In

1. User goes to `/sign-in`
2. Signs in with their credentials
3. **Redirected to `/home`**
4. Access level based on their existing subscription:
   - Organization user → Full access
   - Pro subscriber → Full access
   - Free/No subscription → First practice only

---

## Testing the Flow

### Test 1: Organization User Sign-Up ✅

```bash
1. Sign up with: test@jordache.me
2. Complete sign-up
3. Should redirect to /home
4. All practices should be unlocked
5. No payment required
```

### Test 2: Regular User Sign-Up ✅

```bash
1. Sign up with: test@gmail.com
2. Complete sign-up
3. Should redirect to /subscribe
4. See pricing table with Free and Pro plans
5. Can subscribe or skip
```

### Test 3: Existing User Sign-In ✅

```bash
1. Sign in with existing account
2. Should redirect to /home
3. Access based on subscription status:
   - Org user: Full access
   - Pro user: Full access
   - Free user: First practice only
```

---

## Important Notes

### Why Different Redirects?

- **Sign-Up (new users)**: Need to make subscription decision
  - Org users → Skip to home (already have access)
  - Regular users → Go to /subscribe (choose plan)

- **Sign-In (existing users)**: Already made their choice
  - Always go to home
  - Access controlled by existing subscription

### Organization Detection

Organization membership is determined by:
1. User's email domain (`@jordache.me`, `@dynamichr.ro`)
2. Verified domains configured in Clerk Dashboard
3. Clerk's `useOrganization()` hook returns org object

### Subscription Page

The `/subscribe` page displays Clerk's `<PricingTable />` component:
- Shows all "Publicly Available" plans
- Handles Stripe checkout automatically
- Opens payment in external browser (avoids Google Play fees)
- Updates user's subscription status after payment

---

## Edge Cases

### What if user closes /subscribe without choosing?

- They're treated as a free user
- Only first practice accessible
- Can upgrade later from Settings → "Manage Subscription"

### What if organization domain is added later?

- User needs to sign out and sign back in
- `useOrganization()` will detect org membership on next sign-in
- Automatically grants full access

### What if user switches from regular to organization email?

- Add new organization email in Clerk Dashboard
- User signs in with org email
- Automatically detected as org user
- Full access granted

---

## Settings Integration

Users can manage subscriptions from Settings page:

```
Settings → "Manage Subscription" → /subscribe
```

Shows:
- Current plan (Free/Pro/Organization)
- Option to upgrade/downgrade
- Billing history (if subscribed)

---

## Troubleshooting

### "Organization user redirected to /subscribe"

**Check**:
- Is domain verified in Clerk Dashboard?
- Is Organizations feature enabled?
- Is user signing up with correct org email?

### "Regular user goes to /home instead of /subscribe"

**Check**:
- Clear cache and try again
- Check browser console for errors
- Verify `useOrganization()` returns `null`

### "Subscription page shows no plans"

**Check**:
- Are plans created in Clerk Dashboard?
- Are plans marked "Publicly Available"?
- Is Billing enabled in Clerk Dashboard?

---

## Summary

✅ **Organization users** (`@jordache.me`, `@dynamichr.ro`) → Redirect to `/home`
✅ **Regular new users** → Redirect to `/subscribe`
✅ **Existing users signing in** → Redirect to `/home`
✅ **All access control** → Based on organization membership and subscription plan

This creates a seamless onboarding experience where:
- Organization users get instant access (no payment friction)
- Regular users are prompted to subscribe immediately
- Free users can still access the app (first practice)
- Everyone can upgrade later from Settings
