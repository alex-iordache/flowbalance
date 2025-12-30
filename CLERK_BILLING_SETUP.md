# Clerk B2C Billing Setup Guide

This guide walks you through setting up Clerk Billing for the FlowBalance app.

## 📚 Official Documentation

- [Clerk B2C Billing Docs](https://clerk.com/docs/nextjs/guides/billing/for-b2c)

## ⚠️ Important Notes

1. **Billing is in Beta** - APIs may change. Consider pinning SDK versions.
2. **Clerk Billing ≠ Stripe Billing** - Plans are managed in Clerk Dashboard, not Stripe.
3. **Cost**: 0.7% per transaction + Stripe fees (paid directly to Stripe).

---

## 🔧 Clerk Dashboard Setup (Required Steps)

### Step 1: Enable Billing

1. Go to [**Billing Settings**](https://dashboard.clerk.com/~/billing/settings)
2. Click **"Enable Billing"** button
3. Choose Payment Gateway:
   - **Development/Testing**: Select "Clerk development gateway" (uses shared test Stripe account)
   - **Production**: Connect your own Stripe account

> **Important**: A Stripe account created for development **cannot** be used for production.

---

### Step 2: Create Plans for Users (B2C)

1. Go to [**Subscription Plans**](https://dashboard.clerk.com/~/billing/plans)
2. Select the **"Plans for Users"** tab (not "Plans for Organizations")
3. Click **"Add Plan"**

#### Plan 1: Free User Plan

Create the free plan with these settings:

- **Plan Name**: `Free Plan` (display name shown to users)
- **Plan Key**: `free_user` (CRITICAL - must match code exactly!)
- **Price**: `$0.00` per month
- **Billing Period**: Monthly
- **Publicly Available**: ✅ Toggle ON
- **Description**: "Access to first practice only"

#### Plan 2: Pro User Plan

Create the premium plan with these settings:

- **Plan Name**: `Pro Plan` (display name shown to users)
- **Plan Key**: `pro_user` (CRITICAL - must match code exactly!)
- **Price**: Set your price (e.g., `$9.99` per month)
- **Billing Period**: Monthly
- **Publicly Available**: ✅ Toggle ON
- **Description**: "Unlimited access to all practices and flows"

> **Why these keys matter**: The code checks `has({ plan: 'free_user' })` and `has({ plan: 'pro_user' })`. If the keys don't match exactly, access control won't work!

---

### Step 3: Add Features to Plans (Optional but Recommended)

While creating or editing a plan:

1. Scroll to **"Features"** section
2. Click **"Add Feature"**

#### Recommended Features

**For Free Plan:**
- Feature Key: `basic_access`
- Name: "First Practice Access"
- Description: "Access to the first practice of the first flow"
- Publicly Available: ✅ ON

**For Pro Plan:**
- Feature Key: `full_access`
  - Name: "Full Access"
  - Description: "Access to all practices and flows"
  - Publicly Available: ✅ ON

- Feature Key: `offline_mode`
  - Name: "Offline Mode"
  - Description: "Download practices for offline use"
  - Publicly Available: ✅ ON

- Feature Key: `progress_tracking`
  - Name: "Progress Tracking"
  - Description: "Track your meditation progress"
  - Publicly Available: ✅ ON

---

### Step 4: Verify Organization Settings (Type B Users)

Organization users (Type B) get **automatic full access** without payment.

1. Go to **Organizations** settings in Clerk Dashboard
2. Verify these domains are added and verified:
   - ✅ `jordache.me`
   - ✅ `dynamichr.ro`

When a user signs up with an email from these domains (e.g., `user@jordache.me`), they automatically get full access without needing to subscribe.

---

## 🧪 Testing Your Setup

### Test 1: Guest User (No Login)
1. Open app
2. Try first practice of first flow → Should work ✅
3. Try any other practice → Should show paywall ❌

### Test 2: Free User
1. Sign up as regular user (not org domain)
2. Don't subscribe to any plan
3. Try first practice → Should work ✅
4. Try other practices → Should show paywall ❌
5. Click "Upgrade to Pro" → Should go to `/subscribe` page

### Test 3: Pro User (Paid Subscription)
1. Sign up as regular user
2. Go to `/subscribe` page (or click "Upgrade to Pro")
3. Subscribe to Pro Plan via Stripe checkout
4. All practices should now be unlocked ✅

### Test 4: Organization User (Type B)
1. Sign up with organization email (e.g., `test@jordache.me`)
2. All practices should be unlocked immediately ✅
3. No payment required ✅

---

## 🎨 User Flow

### Guest → Free → Pro Flow

```
1. Guest opens app (no login)
   ↓
2. Can access first practice only
   ↓
3. Clicks locked practice → Sees PaywallModal
   ↓
4. Clicks "Sign Up & Subscribe" → Goes to /sign-in
   ↓
5. Signs up with email/Google
   ↓
6. Redirected to /home (still free user)
   ↓
7. Clicks locked practice again → Sees PaywallModal
   ↓
8. Clicks "Upgrade to Pro" → Goes to /subscribe
   ↓
9. Selects Pro Plan → Clerk opens Stripe checkout in external browser
   ↓
10. Completes payment → Returns to app
   ↓
11. All practices unlocked! ✅
```

### Organization User Flow

```
1. Opens app
   ↓
2. Clicks "Sign In"
   ↓
3. Signs in with org email (user@jordache.me)
   ↓
4. All practices immediately unlocked! ✅
   (No payment required)
```

---

## 🔍 How It Works in Code

### Access Control Hook

```typescript
// hooks/useAccessControl.ts
const { has } = useAuth();

// Check if user has pro plan
const hasProPlan = has({ plan: 'pro_user' }); // ← Checks Clerk Billing

// Check if user is in organization
const { organization } = useOrganization();
if (organization) {
  // Type B user - full access!
}
```

### Practice Access Check

```typescript
// First practice of first flow is always free
if (flowIndex === 0 && practiceIndex === 0) {
  return true; // Free for everyone
}

// All other practices require full access (pro plan or organization)
return hasFullAccess;
```

### PricingTable Component

```tsx
// app/subscribe/page.tsx
<PricingTable />
```

This component automatically:
- Displays all "Publicly Available" plans
- Shows features for each plan
- Handles Stripe checkout (opens external browser on mobile)
- Updates subscription status after payment

---

## 📱 Mobile Considerations

### Stripe Checkout Opens Externally

When users click "Subscribe" on mobile, Clerk automatically opens Stripe checkout in the external browser. This is **intentional** to avoid Google Play's 30% fee on in-app purchases.

After payment completes, the user returns to the app and their subscription status updates automatically.

---

## 🚨 Troubleshooting

### "User is not subscribed but shows free access"

**Problem**: Users who sign up aren't automatically subscribed to the free plan.

**Solution**: Free users are just users without a paid subscription. They get access to the first practice only. This is working as intended.

### "has({ plan: 'pro_user' }) returns false after subscribing"

**Checklist**:
1. ✅ Is Billing enabled in Clerk Dashboard?
2. ✅ Is the plan key exactly `pro_user` (not `pro-user` or `Pro User`)?
3. ✅ Did the Stripe payment complete successfully?
4. ✅ Try refreshing the page (`window.location.reload()`)

### "Organization users don't get full access"

**Checklist**:
1. ✅ Is Organizations enabled in Clerk Dashboard?
2. ✅ Are the domains verified (`jordache.me`, `dynamichr.ro`)?
3. ✅ Is the user signing in with an email from a verified domain?
4. ✅ Check `useOrganization()` hook - does it return an organization object?

### "PricingTable component shows nothing"

**Checklist**:
1. ✅ Is Billing enabled?
2. ✅ Are plans created with "Publicly Available" toggled ON?
3. ✅ Are you on the "Plans for Users" tab (not "Plans for Organizations")?
4. ✅ Check browser console for Clerk errors

---

## 📋 Quick Checklist

Before testing, ensure:

- [ ] Billing enabled in [Billing Settings](https://dashboard.clerk.com/~/billing/settings)
- [ ] Payment gateway configured (dev or production Stripe)
- [ ] `free_user` plan created with key exactly `free_user`
- [ ] `pro_user` plan created with key exactly `pro_user`
- [ ] Both plans have "Publicly Available" toggled ON
- [ ] Organization domains verified: `jordache.me`, `dynamichr.ro`
- [ ] Code deployed to Vercel
- [ ] Test as guest, free user, pro user, and org user

---

## 🎯 Next Steps

After completing this setup:

1. **Deploy to Vercel**:
   ```bash
   git add .
   git commit -m "Add Clerk Billing with PricingTable and subscription management"
   git push origin main
   ```

2. **Test on mobile** via Android Studio or physical device

3. **Switch to Production Stripe** when ready to launch (in Billing Settings)

4. **Monitor subscriptions** in Clerk Dashboard

---

## 📞 Support

- [Clerk Discord](https://clerk.com/discord)
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Billing Docs](https://clerk.com/docs/nextjs/guides/billing/for-b2c)
