# Mobile Payment Solution

## Problem
Clerk's `<PricingTable />` component is designed for web browsers and opens Stripe checkout in-app when used in a Capacitor WebView, violating Google Play policies.

## Solution
Use Capacitor's Browser plugin to open payment in external browser.

---

## Architecture

```
Mobile User Flow:
1. User signs up with email (in-app)
2. Redirects to /post-signup-redirect (in-app)
3. Checks organization membership:
   - Organization user → /home ✅
   - Regular user → /subscribe
4. /subscribe shows plan info (in-app)
5. Clicks "View Plans" → Opens /subscribe-web in EXTERNAL browser ✅
6. Completes Stripe payment in browser ✅
7. Returns to app
8. Full access unlocked ✅
```

---

## Key Files

### `/app/subscribe/page.tsx` (Mobile)
- Shows plan information in-app
- Uses `Browser.open()` to launch external browser
- Clean, simple component

### `/app/subscribe-web/page.tsx` (Web)
- Full Clerk `<PricingTable />` component
- Opens in external browser only
- Handles Stripe checkout

### `/app/post-signup-redirect/page.tsx`
- Intelligent redirect after signup
- Checks organization membership
- Routes to appropriate page

---

## Code Cleanup

### Removed:
- ❌ Complex OAuth redirect logic in sign-in page
- ❌ Query parameter parsing
- ❌ Account age detection
- ❌ Manual Stripe iframe/link interception
- ❌ MutationObserver hacks
- ❌ Debug logging everywhere

### Simplified:
- ✅ Sign-in page: Just Clerk component
- ✅ Sign-up page: Just Clerk component + redirect props
- ✅ Layout: Just allowedRedirectOrigins
- ✅ Subscribe: Browser.open() only
- ✅ PaywallModal: Simple redirects

---

## How It Works

### Capacitor Browser Plugin
```typescript
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

const handleSubscribe = async () => {
  const isNative = Capacitor.isNativePlatform();
  
  if (isNative) {
    // Opens in device's default browser (Chrome, Safari, etc.)
    await Browser.open({ 
      url: 'https://flowbalance-jdk.vercel.app/subscribe-web' 
    });
  } else {
    // Desktop - normal navigation
    window.location.href = checkoutUrl;
  }
};
```

### Why This Works
1. **Compliance**: Payment happens outside the app (Google Play policy ✅)
2. **User Experience**: Familiar browser environment for payment
3. **Security**: Stripe handles everything in secure browser context
4. **Simplicity**: No complex workarounds or hacks needed

---

## Environment Variables

Required in Vercel:
```bash
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/post-signup-redirect
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/post-signup-redirect
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
```

These handle all redirects automatically - no custom code needed.

---

## Testing

1. Build and deploy:
   ```bash
   git add .
   git commit -m "Clean mobile payment solution with Browser.open()"
   git push origin main
   ```

2. Wait for Vercel deployment

3. Test on mobile:
   - Sign up with email
   - Should go to /subscribe (in-app)
   - Click "View Plans"
   - Should open external browser with /subscribe-web ✅
   - Complete payment in browser
   - Return to app
   - Verify full access

---

## Benefits

1. **Clean Code**: No spaghetti, no hacks
2. **Documented**: Uses official Capacitor Browser API
3. **Compliant**: Follows platform guidelines
4. **Maintainable**: Simple, clear logic
5. **Reliable**: Uses native platform capabilities
