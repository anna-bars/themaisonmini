import { type Bundle, bundleListPrice, formatPrice, getGuide } from "@/lib/catalog";
import { BuyButton } from "./BuyButton";

export function BundleCard({ bundle, featured = false }: { bundle: Bundle; featured?: boolean }) {
  const items = bundle.guideSlugs.map((s) => getGuide(s)).filter((g) => g !== undefined);
  return (
    <article
      className={`flex flex-col gap-4 border-2 border-ink p-6 shadow-offset ${featured ? "bg-primary text-primary-foreground" : "bg-paper"}`}
    >
      <span
        className={`label-caps self-start px-2 py-1 ${featured ? "bg-paper text-primary" : "bg-primary text-primary-foreground"}`}
      >
        {bundle.badge}
      </span>
      <h3 className="font-display text-3xl uppercase leading-none">{bundle.title}</h3>
      <img
        src={bundle.cover}
        alt={`${bundle.title}: ${items.map((g) => g.title).join(", ")}`}
        loading="lazy"
        className="aspect-[7/5] w-full border-2 border-ink bg-paper object-cover"
      />
      <ul className={`space-y-1 text-sm ${featured ? "" : "text-muted-foreground"}`}>
        {items.map((g) => (
          <li key={g.slug}>— {g.title}</li>
        ))}
      </ul>
      <div className="mt-auto flex items-end gap-3">
        <span className="font-display text-5xl leading-none">{formatPrice(bundle.price)}</span>
        <span className="pb-1 text-sm line-through opacity-70">
          {formatPrice(bundleListPrice(bundle))}
        </span>
      </div>
      <BuyButton
        slug={bundle.slug}
        itemName={bundle.title}
        price={bundle.price}
        label="Get the bundle"
        variant={featured ? "paper" : "ink"}
      />
    </article>
  );
}
