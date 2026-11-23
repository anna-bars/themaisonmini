import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { useEffect } from "react";
import { getAccessUrl, getCheckoutUrl } from "@/lib/checkout";

type ReturnSearch = { status?: string; payment?: string; item?: string };

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (s: Record<string, unknown>): ReturnSearch => ({
    status: typeof s.status === "string" ? s.status : undefined,
    payment: typeof s.payment === "string" ? s.payment : undefined,
    item: typeof s.item === "string" ? s.item : undefined,
  }),
  head: () => ({ meta: [{ title: "Your order | The Maison Mini" }, { name: "robots", content: "noindex" }] }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { status, item } = Route.useSearch();
  // Whop gives the buyer access to the guide itself; this link just opens it.
  const accessUrl = (item && (getAccessUrl(item) ?? getCheckoutUrl(item))) || "https://whop.com/hub";

  // After an off-site payment step (e.g. bank confirmation), also go straight to the guide.
  useEffect(() => {
    if (status !== "succeeded" || !item || !getAccessUrl(item)) return;
    const t = setTimeout(() => window.location.assign(accessUrl), 1500);
    return () => clearTimeout(t);
  }, [status, item, accessUrl]);

  let title = "Confirming your payment";
  let body = "Your payment is still being processed. We’ll email you as soon as it’s confirmed.";
  let action: React.ReactNode = null;

  if (status === "succeeded") {
    title = "Thank you!";
    body = "Your payment is complete. A receipt is on its way to your email, and taking you to your guide now.";
    action = (
      <a href={accessUrl} className="label-caps inline-block border-2 border-ink bg-primary px-6 py-3 text-paper">
        Open your guide
      </a>
    );
  } else if (status === "failed" || status === "canceled") {
    title = "Payment didn’t go through";
    body = "No money was taken. You can go back and try again with another payment method.";
    action = (
      <Link to="/" className="label-caps inline-block border-2 border-ink px-6 py-3">
        Back to the shop
      </Link>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-8 py-32 text-center">
        <h1 className="font-display text-6xl uppercase leading-none text-primary">{title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{body}</p>
        <div className="mt-8">{action}</div>
      </div>
    </SiteShell>
  );
}
