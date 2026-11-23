import { describe, expect, it } from "vitest";
import { bundleListPrice, bundleSavings, bundles, getGuide } from "./catalog";

const bundle = (slug: string) => {
  const b = bundles.find((x) => x.slug === slug);
  if (!b) throw new Error(`missing bundle ${slug}`);
  return b;
};

describe("guide prices", () => {
  it("$100 guide costs $12", () => expect(getGuide("elevate-your-wardrobe")?.price).toBe(12));
  it("Winter Playbook costs $12", () =>
    expect(getGuide("winter-capsule-playbook")?.price).toBe(12));
  it("Holiday Party Outfit Formulas costs $9", () =>
    expect(getGuide("holiday-party-outfit-formulas")?.price).toBe(9));
  it("Closet Reset Planner costs $7", () =>
    expect(getGuide("closet-reset-planner")?.price).toBe(7));
  it("Palette & Style Studio costs $9", () =>
    expect(getGuide("palette-and-style-studio")?.price).toBe(9));
});

describe("bundles", () => {
  it("Everyday Edit is $24, saving $4 off $28", () => {
    const b = bundle("everyday-edit");
    expect([b.price, bundleListPrice(b), bundleSavings(b)]).toEqual([24, 28, 4]);
  });
  it("Winter Edit is $24, saving $4 off $28", () => {
    const b = bundle("winter-edit");
    expect([b.price, bundleListPrice(b), bundleSavings(b)]).toEqual([24, 28, 4]);
  });
  it("Complete Collection is all 5 guides for $39, saving $10 off $49", () => {
    const b = bundle("complete-collection");
    expect([b.guideSlugs.length, b.price, bundleListPrice(b), bundleSavings(b)]).toEqual([
      5, 39, 49, 10,
    ]);
  });
});

describe("checkout links", () => {
  it("has a slot for every guide and bundle", async () => {
    const { checkoutUrls } = await import("./checkout");
    const { guides, bundles } = await import("./catalog");
    for (const item of [...guides, ...bundles]) expect(item.slug in checkoutUrls).toBe(true);
  });
  it("only accepts https links", async () => {
    const { getCheckoutUrl } = await import("./checkout");
    expect(
      getCheckoutUrl("elevate-your-wardrobe") === undefined ||
        getCheckoutUrl("elevate-your-wardrobe")!.startsWith("https://"),
    ).toBe(true);
    expect(getCheckoutUrl("nope")).toBeUndefined();
  });
});
