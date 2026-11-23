import { Checkout, CheckoutElement, WhopElements } from "@whop/elements-react";
import { loadWhop } from "@whop/elements";
import { useMemo } from "react";
import { getAccessUrl } from "@/lib/checkout";

/**
 * Whop's embedded checkout. Loaded lazily and only after the buyer opens the
 * dialog, so it never runs during server rendering.
 */
export default function WhopCheckout({ planId, slug }: { planId: string; slug: string }) {
  const elements = useMemo(() => loadWhop(), []);
  const accessUrl = getAccessUrl(slug);
  const returnUrl = `${window.location.origin}/checkout/return?item=${encodeURIComponent(slug)}`;
  return (
    <WhopElements elements={elements}>
      <Checkout
        plan={planId}
        metadata={{ item: slug }}
        returnUrl={returnUrl}
        onComplete={(completion) => {
          // Paid inside the checkout: send the buyer straight to their guide in Whop,
          // or to our thank-you page (which links to the guide) if no direct link is set.
          if (completion.result !== "payment") return;
          window.location.assign(
            accessUrl ?? `/checkout/return?status=succeeded&item=${encodeURIComponent(slug)}`,
          );
        }}
      >
        <CheckoutElement />
      </Checkout>
    </WhopElements>
  );
}
