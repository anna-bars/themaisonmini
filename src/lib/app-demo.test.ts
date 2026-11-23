import { describe, expect, it } from "vitest";
import { DEMO_BUDGET, demoLooks, isLookReady, nextStatus, spent } from "./app-demo";

describe("try-it app preview", () => {
  it("cycles own → will buy → clear on each tap", () => {
    expect([nextStatus(""), nextStatus("own"), nextStatus("buy")]).toEqual(["own", "buy", ""]);
  });

  it("budget is $100", () => expect(DEMO_BUDGET).toBe(100));

  it("owned pieces cost $0 and will-buy pieces count at their price", () => {
    expect(spent({ "dark-jeans": "own", "knit-sweater": "buy", scarf: "buy" })).toBe(13);
  });

  it("a look unlocks only when every piece is owned or will be bought", () => {
    const cozy = demoLooks.find((l) => l.id === "cozy-day");
    if (!cozy) throw new Error("missing look");
    expect(isLookReady({ "knit-sweater": "own", "dark-jeans": "buy" }, cozy)).toBe(false);
    expect(isLookReady({ "knit-sweater": "own", "dark-jeans": "buy", scarf: "own" }, cozy)).toBe(
      true,
    );
  });
});
