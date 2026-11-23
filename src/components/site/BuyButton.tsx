import { lazy, Suspense, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/catalog";
import { getCheckoutUrl, getPlanId } from "@/lib/checkout";

const WhopCheckout = lazy(() => import("./WhopCheckout"));

type BuyButtonProps = {
  /** Guide or bundle slug, used to look up the Whop checkout link. */
  slug: string;
  itemName: string;
  price: number;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

/**
 * Checkout entry point. Sends the buyer to the Whop checkout for this product
 * (links live in `src/lib/checkout.ts`). If no link is set yet, it explains that
 * checkout is coming instead of pretending to take payment.
 */
export function BuyButton({
  slug,
  itemName,
  price,
  label = "Buy now",
  variant = "ink",
  size = "pill",
  className,
}: BuyButtonProps) {
  const [open, setOpen] = useState(false);
  const checkoutUrl = getCheckoutUrl(slug);
  const planId = getPlanId(slug);
  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => {
          if (planId) setOpen(true);
          else if (checkoutUrl) window.location.assign(checkoutUrl);
          else setOpen(true);
        }}
      >
        {label} · {formatPrice(price)}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        {planId ? (
          <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-ink bg-paper shadow-offset sm:rounded-none">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl uppercase leading-none">{itemName}</DialogTitle>
              <DialogDescription>Secure checkout · instant access after payment.</DialogDescription>
            </DialogHeader>
            <Suspense fallback={<p className="py-8 text-center">Loading checkout…</p>}>
              <WhopCheckout planId={planId} slug={slug} />
            </Suspense>
          </DialogContent>
        ) : (
          <DialogContent className="border-2 border-ink bg-paper shadow-offset sm:rounded-none">
            <DialogHeader>
              <p className="label-caps text-primary">Almost there</p>
              <DialogTitle className="font-display text-4xl uppercase leading-none">
                Checkout opens soon
              </DialogTitle>
              <DialogDescription className="pt-2 text-base text-muted-foreground">
                {itemName} ({formatPrice(price)}) will be available to buy here very soon, with instant
                access right after payment.
              </DialogDescription>
            </DialogHeader>
            <Button variant="red" size="pill" onClick={() => setOpen(false)}>
              Keep browsing
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
