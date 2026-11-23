import { buttonVariants } from "@/components/ui/button";
import { getFreeUrl } from "@/lib/checkout";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppDemo } from "@/components/site/AppDemo";
import { BundleCard } from "@/components/site/BundleCard";
import { BuyButton } from "@/components/site/BuyButton";
import { GuideCard } from "@/components/site/GuideCard";
import { SiteShell } from "@/components/site/SiteShell";
import { bundlesContaining, formatPrice, getGuide, guides } from "@/lib/catalog";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.guide;
    const title = g ? `${g.title} | The Maison Mini` : "Guide | The Maison Mini";
    const description = g?.blurb ?? "An interactive capsule wardrobe guide from The Maison Mini.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="px-8 py-32 text-center">
        <h1 className="font-display text-6xl uppercase text-primary">Guide not found</h1>
        <Link to="/" className="label-caps mt-6 inline-block underline">
          Back to the shop
        </Link>
      </div>
    </SiteShell>
  ),
  component: GuidePage,
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const relatedBundles = bundlesContaining(guide.slug);
  const freeUrl = getFreeUrl(guide.slug);
  const hasDemo = guide.slug === "elevate-your-wardrobe";

  return (
    <SiteShell>
      <div className="border-y-2 border-ink px-5 py-3 md:px-8">
        <Link to="/" hash="guides" className="label-caps hover:text-primary">
          ← All guides
        </Link>
      </div>

      <section className="grid gap-10 px-5 py-10 md:grid-cols-2 md:px-8 md:py-14">
        <div>
          <div className="relative border-2 border-ink bg-card shadow-offset">
            <img
              src={guide.cover}
              alt={`${guide.title} cover`}
              className={`aspect-[4/5] w-full ${guide.coverStyle === "poster" ? "object-contain" : "object-contain p-6"}`}
            />
            {guide.coverStyle === "art" && (
              <span className="label-caps absolute left-3 top-3 bg-ink px-2 py-1 text-paper">
                {guide.tag}
              </span>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            All the looks open inside the app after you buy.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <p className="label-caps text-primary">The Maison Mini · Interactive mini app</p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] text-primary md:text-7xl">
            {guide.title}
          </h1>
          <p className="text-lg text-muted-foreground">{guide.blurb}</p>
          <div className="flex items-center gap-4 border-y-2 border-ink py-4">
            <span className="font-display text-6xl text-primary">{formatPrice(guide.price)}</span>
            <span className="text-sm text-muted-foreground">
              One-time purchase · Instant access
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <BuyButton slug={guide.slug} itemName={guide.title} price={guide.price} size="pillLg" />
            {freeUrl ? (
              <a
                href={freeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "paper", size: "pillLg" })}
              >
                Get free access
              </a>
            ) : hasDemo ? (
              <a href="#try" className={buttonVariants({ variant: "paper", size: "pillLg" })}>
                Try it free
              </a>
            ) : null}
          </div>
          {relatedBundles.length > 0 && (
            <a
              href="#bundles"
              className="label-caps -mt-2 self-start underline underline-offset-4 hover:text-primary"
            >
              Want more? Save with a bundle ↓
            </a>
          )}

          <div className="mt-4">
            <h2 className="font-display text-3xl uppercase">What you can do in the app</h2>
            <ul className="mt-3 divide-y-2 divide-ink border-y-2 border-ink">
              {guide.inside.map((item, i) => (
                <li key={item} className="flex items-center gap-4 py-3">
                  <span className="font-display text-2xl text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Not a PDF or a set of pictures: an interactive app that opens in any browser on phone,
            tablet or computer. Progress saves in the browser you use. Illustrations are AI-created.
          </p>
        </div>
      </section>

      {hasDemo && (
        <section id="try" className="px-5 pt-6 md:px-8">
          <h2 className="font-display mb-2 border-b-2 border-ink pb-3 text-4xl uppercase md:text-5xl">
            Try the app right here
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Tap the pieces you own and watch the looks come into focus.
          </p>
          <AppDemo />
        </section>
      )}

      {relatedBundles.length > 0 && (
        <section id="bundles" className="px-5 pt-10 md:px-8">
          <h2 className="font-display mb-6 border-b-2 border-ink pb-3 text-4xl uppercase md:text-5xl">
            Get it in a bundle
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedBundles.map((b) => (
              <BundleCard key={b.slug} bundle={b} featured={b.slug === "complete-collection"} />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pt-20 md:px-8">
        <h2 className="font-display mb-6 border-b-2 border-ink pb-3 text-4xl uppercase md:text-5xl">
          You might also love
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
