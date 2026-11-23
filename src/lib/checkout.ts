/**
 * Whop checkout links, one per product (5 guides + 3 bundles).
 *
 * How to fill this in:
 *  1. In Whop, create a product for each item below and attach the guide
 *     file / app link as the delivered content (Whop emails it after payment).
 *  2. Create a plan with the same price, copy its checkout link
 *     (looks like https://whop.com/checkout/plan_XXXXXXXX) and paste it here.
 *
 * Any slug left empty keeps showing the "Checkout opens soon" dialog.
 */
export const checkoutUrls: Record<string, string> = {
  // Guides
  "elevate-your-wardrobe": "https://whop.com/themaisonmini/elevate-your-wardrobe-for-100-or-less/",
  "winter-capsule-playbook": "https://whop.com/themaisonmini/winter-wardrobe-planner/",
  "holiday-party-outfit-formulas": "https://whop.com/themaisonmini/party-mode-on-a-budget/",
  "closet-reset-planner": "https://whop.com/themaisonmini/closet-reset-planner/",
  "palette-and-style-studio": "https://whop.com/themaisonmini/palette-style-studio/",
  // Bundles
  "everyday-edit": "https://whop.com/themaisonmini/the-everyday-edit-02/",
  "winter-edit": "https://whop.com/themaisonmini/the-winter-edit/",
  "complete-collection": "https://whop.com/themaisonmini/the-complete-collection-31/",
};

/** Returns a valid https checkout URL for a guide/bundle slug, or undefined. */
export function getCheckoutUrl(slug: string): string | undefined {
  const url = checkoutUrls[slug]?.trim();
  return url && url.startsWith("https://") ? url : undefined;
}

/**
 * Whop plan IDs (look like "plan_XXXXXXXXXXXXX") for the embedded checkout, so
 * buyers pay without leaving the site. Find it in Whop: product -> Pricing ->
 * the plan (or in the checkout page URL: whop.com/checkout/plan_...).
 *
 * If a slug has a plan ID, the embedded checkout is used; otherwise the link
 * above is used as a fallback; otherwise the "coming soon" dialog shows.
 */
export const planIds: Record<string, string> = {
  "elevate-your-wardrobe": "plan_m0lmiGjU7rx1o",
  "winter-capsule-playbook": "plan_OmWyw909a1jiN",
  "holiday-party-outfit-formulas": "plan_t31S75wqRvZQF",
  "closet-reset-planner": "plan_YXPAr1hfg8EHc",
  "palette-and-style-studio": "plan_qhkMi6JVDNlXO",
  "everyday-edit": "plan_dwcSafJY1ACVq",
  "winter-edit": "plan_MnRxfVbex22uh",
  "complete-collection": "plan_fXm0wIJbchIT8",
};

export function getPlanId(slug: string): string | undefined {
  const id = planIds[slug]?.trim();
  return id && id.startsWith("plan_") ? id : undefined;
}

/**
 * Where buyers land right after a successful payment: the page inside Whop
 * where they open the mini app and the PDF. Open the product in Whop as a
 * member, copy the address bar (whop.com/<store>/exp_.../app/) and paste it here.
 */
export const accessUrls: Record<string, string> = {
  "elevate-your-wardrobe": "https://whop.com/themaisonmini/exp_f3iiyTSZleylVY/app/",
  "winter-capsule-playbook": "",
  "holiday-party-outfit-formulas": "",
  "closet-reset-planner": "",
  "palette-and-style-studio": "",
  "everyday-edit": "",
  "winter-edit": "",
  "complete-collection": "",
};

export function getAccessUrl(slug: string): string | undefined {
  const url = accessUrls[slug]?.trim();
  return url && url.startsWith("https://whop.com/") ? url : undefined;
}

/**
 * Optional free-trial / free-access links (e.g. a free Whop product or plan
 * with a sample of the app). When set, the product page shows a
 * "Get free access" button that opens it. Leave empty to hide it.
 * (The "Elevate Your Wardrobe" page has a built-in on-page demo instead.)
 */
export const freeUrls: Record<string, string> = {
  "elevate-your-wardrobe": "",
  "winter-capsule-playbook": "",
  "holiday-party-outfit-formulas": "",
  "closet-reset-planner": "",
  "palette-and-style-studio": "",
};

export function getFreeUrl(slug: string): string | undefined {
  const url = freeUrls[slug]?.trim();
  return url && url.startsWith("https://") ? url : undefined;
}
