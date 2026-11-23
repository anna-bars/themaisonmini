import { createFileRoute } from "@tanstack/react-router";
import leopardImg from "@/assets/leopard-red.png";
import { AppDemo } from "@/components/site/AppDemo";
import { BundleCard } from "@/components/site/BundleCard";
import { GuideCard } from "@/components/site/GuideCard";
import { SiteShell } from "@/components/site/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { bundles, editorialImages, guides, formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Maison Mini | Interactive Capsule Wardrobe Mini Apps" },
      {
        name: "description",
        content:
          "Interactive capsule wardrobe mini apps that open on your phone. Tap the pieces you own, track your budget and unlock outfits.",
      },
      { property: "og:title", content: "The Maison Mini | Dress the part. Spend less." },
      {
        property: "og:description",
        content: "Not a PDF: interactive mini apps where you tap pieces and unlock outfits. From $7.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const strip = [
  ["Interactive mini apps", "Not a PDF, not pictures"],
  ["Tap & track", "Own it, will buy, budget"],
  ["Outfits unlock", "Blurred until you have the pieces"],
  ["No download", "Opens on your phone"],
] as const;

const faqs = [
  ["Is this a PDF or a set of pictures?", "Neither. Each product is an interactive mini app: you tap pieces, track your budget, and outfits unlock as you go."],
  ["Do I need to download anything?", "No. The mini app opens in your web browser on a phone, tablet or computer. Nothing to install from an app store."],
  ["Is my progress saved?", "Yes, in the browser you use. Open it on the same device and browser to see your progress again."],
  ["Are the prices real store prices?", "Prices are target prices for secondhand, sale or clearance shopping. They vary by store, region and season."],
  ["Are the illustrations real photos?", "No. The illustrations are AI-created."],
  ["How do I get my app after buying?", "You get instant access right after checkout, plus a link by email."],
] as const;

function Index() {
  const featured = [
    { img: editorialImages.leopardScarf, guide: guides[4] },
    { img: editorialImages.shirtSunnies, guide: guides[0] },
    { img: editorialImages.balcony, guide: guides[2] },
  ];

  return (
    <SiteShell>
      {/* Hero: says what you get, right away */}
      <section className="px-5 pb-12 pt-8 md:px-8 md:pb-20 md:pt-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div>
            <p className="label-caps text-primary">Interactive mini apps · from $7</p>
            <h1 className="font-display mt-3 text-[13vw] uppercase leading-[0.92] text-primary sm:text-6xl lg:text-7xl">
              Build a wardrobe you love for $100 or less.
            </h1>
            <p className="mt-5 max-w-md text-lg text-foreground">
              Tap what you own. Outfits unlock. Buy only what’s missing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#bundles"
                className="label-caps inline-flex h-12 items-center rounded-full border-2 border-primary bg-primary px-7 text-primary-foreground transition-colors hover:border-ink hover:bg-ink"
              >
                Get all 5 for {formatPrice(39)}
              </a>
              <a
                href="#try"
                className="label-caps inline-flex h-12 items-center rounded-full border-2 border-ink bg-paper px-7 text-ink transition-colors hover:border-primary hover:text-primary"
              >
                Try it free below
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:max-w-none">
            {[
              { g: guides[1], cls: "left-0 top-6 w-[58%] -rotate-3" },
              { g: guides[2], cls: "right-0 top-0 w-[58%] rotate-3" },
              { g: guides[0], cls: "left-[18%] bottom-0 w-[62%] z-10" },
            ].map(({ g, cls }) =>
              g ? (
                <a
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className={`absolute block border-2 border-ink bg-card shadow-offset transition-transform hover:z-20 hover:scale-105 ${cls}`}
                >
                  <img src={g.cover} alt={`${g.title} cover`} className="aspect-[4/5] w-full object-cover" />
                </a>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {/* Label strip */}
      <section className="grid grid-cols-2 gap-y-4 border-b-2 border-ink px-5 py-5 md:grid-cols-4 md:px-8">
        {strip.map(([a, b]) => (
          <div key={a} className="text-primary">
            <p className="label-caps">{a}</p>
            <p className="text-xs opacity-80">{b}</p>
          </div>
        ))}
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-3 md:gap-6">
          <p className="hidden self-center pb-4 text-right font-sans text-2xl font-semibold leading-tight text-primary underline decoration-2 underline-offset-8 sm:block md:text-4xl">
            Dress
            <br />
            the part.
          </p>
          <div className="relative">
            <h2 className="font-display relative z-0 text-[22vw] uppercase leading-[0.82] text-primary md:text-[11rem] lg:text-[13rem]">
              Spend
              <br />
              Less
            </h2>
            <img
              src={leopardImg}
              alt=""
              aria-hidden="true"
              className="animate-leap pointer-events-none absolute left-1/2 top-[58%] z-10 w-[105%] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p className="hidden self-center pb-4 font-sans text-2xl font-semibold leading-tight text-primary sm:block md:text-4xl">
            look
            <br />
            like more.
          </p>
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-muted-foreground">
          Not a PDF. Not a folder of pictures. Interactive mini apps you tap through on your phone: mark the
          pieces you own, watch your budget, and see your outfits unlock.
        </p>
      </section>

      {/* Editorial trio */}
      <section className="px-5 md:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-2 md:gap-4">
          {featured.map(({ img, guide }) =>
            guide ? (
              <a key={guide.slug} href={`/guides/${guide.slug}`} className="group relative block overflow-hidden border-2 border-ink bg-card">
                <img
                  src={img}
                  alt={`Illustration from ${guide.title}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="label-caps absolute right-2 top-2 border border-ink bg-paper px-1.5 py-0.5 text-ink">
                  {formatPrice(guide.price)}
                </span>
                <span className="label-caps absolute inset-x-0 bottom-0 bg-ink/90 px-2 py-2 text-center text-paper opacity-0 transition-opacity group-hover:opacity-100">
                  {guide.shortTitle}
                </span>
              </a>
            ) : null,
          )}
        </div>
        <h2 className="font-display mx-auto mt-10 max-w-2xl text-center text-3xl uppercase leading-tight text-primary md:text-5xl">
          For women who prefer intention over impulse buys.
        </h2>
        <p className="label-caps mt-3 text-center text-primary">Five mini apps · Three bundles · Instant access</p>
      </section>

      {/* Try it */}
      <section id="try" className="scroll-mt-6 px-5 pt-24 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-caps text-primary">It’s an app, not a PDF</p>
            <h2 className="font-display text-5xl uppercase md:text-7xl">Try it right here</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tap a piece. Watch a look unlock.
          </p>
        </div>
        <AppDemo />
      </section>

      {/* Guides */}
      <section id="guides" className="scroll-mt-6 px-5 pt-24 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-caps text-primary">The shop</p>
            <h2 className="font-display text-5xl uppercase md:text-7xl">The mini apps</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each mini app is a one-time purchase. Start with the one that fits your season.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      {/* Bundles */}
      <section id="bundles" className="scroll-mt-6 px-5 pt-24 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <p className="label-caps text-primary">Most customers pick one</p>
            <h2 className="font-display text-5xl uppercase md:text-7xl">Save with a bundle</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((b, i) => (
            <BundleCard key={b.slug} bundle={b} featured={i === bundles.length - 1} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-6 px-5 pt-24 md:px-8">
        <h2 className="font-display mb-8 border-b-2 border-ink pb-4 text-5xl uppercase md:text-7xl">
          How it works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {([
            ["01", "Buy once", "Checkout in a minute. Your mini app opens instantly, plus a link by email."],
            ["02", "Open on your phone", "It runs in your browser on phone, tablet or laptop. Nothing to download."],
            ["03", "Tap & unlock", "Tap the pieces you own, track your budget and watch your outfits unlock."],
          ] as const).map(([n, t, d]) => (
            <div key={n} className="border-2 border-ink bg-card p-6">
              <span className="font-display text-6xl text-primary">{n}</span>
              <h3 className="font-display mt-2 text-2xl uppercase">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-6 px-5 pt-24 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-5xl uppercase md:text-7xl">FAQ</h2>
            <img
              src={editorialImages.boots}
              alt="Illustration of a black mini dress with tall brown boots"
              loading="lazy"
              className="mt-6 hidden w-56 border-2 border-ink md:block"
            />
          </div>
          <Accordion type="single" collapsible className="border-t-2 border-ink">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-b-2 border-ink">
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:text-primary hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteShell>
  );
}
