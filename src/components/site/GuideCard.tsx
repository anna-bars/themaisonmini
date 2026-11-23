import { Link } from "@tanstack/react-router";
import { type Guide, formatPrice } from "@/lib/catalog";
import { buttonVariants } from "@/components/ui/button";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group flex flex-col border-2 border-ink bg-card">
      <Link
        to="/guides/$slug"
        params={{ slug: guide.slug }}
        className="relative block aspect-[4/5] overflow-hidden border-b-2 border-ink bg-card"
      >
        <img
          src={guide.cover}
          alt={`${guide.title} cover`}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
            guide.coverStyle === "poster" ? "object-contain" : "object-contain p-4"
          }`}
        />
        {guide.coverStyle === "art" && (
          <>
            <span className="label-caps absolute left-3 top-3 bg-ink px-2 py-1 text-paper">
              {guide.tag}
            </span>
            <span className="label-caps absolute bottom-3 left-3 bg-primary px-2 py-1 text-primary-foreground">
              Interactive app
            </span>
          </>
        )}
        <span className="font-display absolute right-3 top-3 border-2 border-ink bg-paper px-2 py-0.5 text-xl text-primary">
          {formatPrice(guide.price)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to="/guides/$slug" params={{ slug: guide.slug }}>
          <h3 className="font-display text-2xl uppercase leading-tight transition-colors hover:text-primary">
            {guide.title}
          </h3>
        </Link>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {guide.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-primary">✦</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link
            to="/guides/$slug"
            params={{ slug: guide.slug }}
            className={buttonVariants({ variant: "ink", size: "pill" })}
          >
            Buy now · {formatPrice(guide.price)}
          </Link>
          <Link
            to="/guides/$slug"
            params={{ slug: guide.slug }}
            className="label-caps inline-flex h-11 items-center px-3 underline underline-offset-4 hover:text-primary"
          >
            See the app
          </Link>
        </div>
      </div>
    </article>
  );
}
