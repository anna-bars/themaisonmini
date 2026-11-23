# Roadmap — The Maison Mini shop

- [x] Storefront in the red/cream editorial style (home, guide pages, bundles, FAQ)
- [x] Own covers: $100 Capsule, Holiday Formulas, Winter Playbook, Closet Reset, Palette Studio (outfit galleries removed)
- [x] Payments: switched from Stripe to **Whop** (seller is in Armenia; Whop checkout + file delivery). BuyButton redirects to Whop links from `src/lib/checkout.ts`
- [ ] Create 5 guide + 3 bundle products in Whop, attach delivered files, paste checkout links into `src/lib/checkout.ts`
- [ ] Set Whop success/redirect URL back to the site, test a real purchase
