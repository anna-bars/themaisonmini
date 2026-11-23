import { useState } from "react";
import {
  DEMO_BUDGET,
  type DemoState,
  demoLooks,
  demoPieces,
  isLookReady,
  missingPieces,
  nextStatus,
  spent,
} from "@/lib/app-demo";
import { getGuide } from "@/lib/catalog";
import { BuyButton } from "./BuyButton";

const statusLabel = { own: "Own it", buy: "Will buy" } as const;

/**
 * Free, playable slice of the "$100 Capsule" mini app: tap pieces, watch the
 * budget move and the blurred looks come into focus.
 */
export function AppDemo() {
  const [state, setState] = useState<DemoState>({});
  const guide = getGuide("elevate-your-wardrobe");
  const total = spent(state);
  const ready = demoLooks.filter((l) => isLookReady(state, l)).length;
  const marked = Object.values(state).filter(Boolean).length;

  const tap = (id: string) =>
    setState((s) => {
      const next = nextStatus(s[id] ?? "");
      const copy = { ...s };
      if (next) copy[id] = next;
      else delete copy[id];
      return copy;
    });

  return (
    <div className="border-2 border-ink bg-paper shadow-offset">
      {/* App chrome */}
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2 text-paper">
        <span className="label-caps truncate">$100 Capsule app · preview</span>
        <span className="label-caps whitespace-nowrap text-primary">● Live</span>
      </div>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[1.25fr_1fr]">
        {/* Closet side */}
        <div>
          <div className="mb-4 border-2 border-ink bg-card p-4">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
              <span className="font-display text-5xl leading-none text-primary">
                ${total}
                <span className="text-2xl text-ink"> / ${DEMO_BUDGET}</span>
              </span>
              <span className="pb-1 text-xs text-muted-foreground">
                ${DEMO_BUDGET - total} left to spend · <b className="text-ink">{marked}</b>/
                {demoPieces.length} pieces · <b className="text-ink">{ready}</b>/{demoLooks.length}{" "}
                looks ready
              </span>
            </div>
            <div className="mt-3 h-3 border-2 border-ink bg-paper">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${Math.min(100, (total / DEMO_BUDGET) * 100)}%` }}
              />
            </div>
          </div>

          <p className="mb-3 text-xs text-muted-foreground">
            <b className="text-ink">Tap once:</b> own it. <b className="text-ink">Twice:</b> will
            buy.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {demoPieces.map((p) => {
              const s = state[p.id] ?? "";
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => tap(p.id)}
                  aria-label={`${p.name}${s ? `, ${statusLabel[s]}` : ""}`}
                  className={`relative flex flex-col border-2 border-ink bg-card text-left transition-transform active:scale-95 ${
                    s === "buy" ? "shadow-offset -translate-x-0.5 -translate-y-0.5" : ""
                  } ${s === "own" ? "-rotate-1" : ""}`}
                >
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  {s && (
                    <span
                      className={`label-caps absolute left-1 top-1 px-1 py-0.5 text-[0.5rem] sm:left-1.5 sm:top-1.5 sm:px-1.5 sm:text-[0.68rem] ${
                        s === "own" ? "bg-ink text-paper" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {statusLabel[s]}
                    </span>
                  )}
                  <span className="flex flex-col gap-0 border-t-2 border-ink px-1.5 py-1 sm:flex-row sm:items-center sm:justify-between sm:gap-1 sm:px-2 sm:py-1.5">
                    <span className="truncate text-[0.6rem] font-semibold sm:text-xs">
                      {p.name}
                    </span>
                    <span className="font-display text-sm text-primary sm:text-lg">
                      {s === "own" ? "$0" : `$${p.price}`}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setState({})}
            className="label-caps mt-4 rounded-full border-2 border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-paper"
          >
            Reset
          </button>
        </div>

        {/* Looks side */}
        <div>
          <p className="mb-3 text-xs text-muted-foreground">Mark the pieces to unlock the looks.</p>
          <div className="grid grid-cols-2 gap-3">
            {demoLooks.map((look) => {
              const missing = missingPieces(state, look).length;
              const done = missing === 0;
              const blur = (missing / look.pieceIds.length) * 9;
              return (
                <div
                  key={look.id}
                  className={`border-2 border-ink bg-card ${done ? "shadow-offset" : ""}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={look.img}
                      alt={done ? `Look ${look.number}: ${look.name}` : ""}
                      loading="lazy"
                      className="aspect-[3/5] w-full object-cover transition-[filter] duration-700"
                      style={{ filter: `blur(${blur}px) grayscale(${missing ? 0.4 : 0})` }}
                    />
                    <span className="label-caps absolute left-1.5 top-1.5 bg-ink px-1.5 py-0.5 text-paper">
                      Look {look.number}
                    </span>
                    {done && (
                      <span className="label-caps absolute inset-x-0 bottom-0 bg-primary py-1 text-center text-primary-foreground">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <div className="border-t-2 border-ink px-2 py-1.5">
                    <p className="truncate text-xs font-semibold">{look.name}</p>
                    <p className="text-[0.65rem] text-muted-foreground">
                      {done ? "Ready to wear" : `${missing} piece${missing > 1 ? "s" : ""} to go`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 border-2 border-dashed border-ink p-4">
            <p className="font-display text-2xl uppercase leading-tight">4 of 15 pieces.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The full app has 18 looks and a palette builder.
            </p>
            {guide && (
              <div className="mt-3">
                <BuyButton
                  slug={guide.slug}
                  itemName={guide.title}
                  price={guide.price}
                  label="Get the full app"
                  variant="red"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
