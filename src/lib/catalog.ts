import everydayEditCover from "@/assets/bundles/everyday-edit.jpg";
import winterEditCover from "@/assets/bundles/winter-edit.jpg";
import completeCollectionCover from "@/assets/bundles/complete-collection.jpg";
import elevateCover from "@/assets/thumbs/elevate.png";
import closetCover from "@/assets/thumbs/closet-reset.png";
import paletteCover from "@/assets/thumbs/palette-studio.png";
import winterCover from "@/assets/thumbs/winter.png";
import holidayCover from "@/assets/thumbs/holiday.png";
import scarfSeason from "@/assets/editorial/scarf-season.jpg";
import officeClassic from "@/assets/editorial/office-classic.jpg";
import galleryWalk from "@/assets/editorial/gallery-walk.jpg";
import midiBoots from "@/assets/editorial/midi-boots.jpg";
import dateNight from "@/assets/editorial/date-night.jpg";
import cashmereCozy from "@/assets/editorial/cashmere-cozy.jpg";

export type Guide = {
  slug: string;
  tag: string;
  title: string;
  shortTitle: string;
  price: number;
  blurb: string;
  highlights: string[];
  inside: string[];
  cover: string;
  /** "poster" = a finished product cover; "art" = a single illustration shown with padding. */
  coverStyle: "poster" | "art";
};

export type Bundle = {
  slug: string;
  title: string;
  badge: string;
  guideSlugs: string[];
  price: number;
  /** Landscape thumbnail (1400×1000) shown on the bundle card. */
  cover: string;
};

export const guides: Guide[] = [
  {
    slug: "elevate-your-wardrobe",
    tag: "Start here",
    title: "Elevate Your Wardrobe for $100 or Less",
    shortTitle: "The $100 Capsule",
    price: 12,
    blurb:
      "Dress the part. Spend $100. A mini app you tap through: mark the pieces you own, plan what to buy, and watch 18 looks come into focus.",
    highlights: ["Tap 15 pieces: own it or will buy", "Live $100 budget meter", "18 looks that unlock as you go"],
    inside: [
      "Tap a piece once to own it, twice to add it to your buy list",
      "A live budget meter shows what you have left of $100",
      "Every look starts blurred and comes into focus as you mark its pieces",
      "Filter looks by Ready, Saved, Everyday, Work and Evening",
      "Build your color palette and hit “Surprise me” for an outfit",
    ],
    cover: elevateCover,
    coverStyle: "poster",
  },
  {
    slug: "winter-capsule-playbook",
    tag: "Winter ’26",
    title: "The Winter Capsule Playbook",
    shortTitle: "Winter Playbook",
    price: 12,
    blurb:
      "A winter wardrobe planner you tap through: track 30 essentials, build your buy list and unlock 22 cold-weather looks.",
    highlights: ["Tap 30 pieces: owned or to buy", "Live tracker + shopping budget", "22 looks that unlock"],
    inside: [
      "Tap any piece to cycle: don’t have, owned, to buy",
      "Live counters for pieces owned and looks unlocked",
      "Shopping budget with your own spending limit",
      "Looks stay blurred until you own all their pieces",
      "Build your winter palette and hit “Surprise me”",
    ],
    cover: winterCover,
    coverStyle: "poster",
  },
  {
    slug: "holiday-party-outfit-formulas",
    tag: "Holiday",
    title: "Holiday Party Outfit Formulas",
    shortTitle: "Holiday Formulas",
    price: 9,
    blurb:
      "Party mode, on a budget. Tap through 15 core pieces and 6 festive add-ons and watch 20 holiday looks unlock.",
    highlights: ["Tap 21 pieces: own it or will buy", "Live party budget meter", "20 looks that unlock"],
    inside: [
      "Tap once to own a piece, twice to add it to your buy list",
      "A live budget meter for your party shopping",
      "Every look starts blurred and comes into focus as you mark pieces",
      "Save favorites and hit “Surprise me” for a party look",
      "Works with the pieces from the $100 Capsule",
    ],
    cover: holidayCover,
    coverStyle: "poster",
  },
  {
    slug: "closet-reset-planner",
    tag: "Planner",
    title: "Closet Reset Planner",
    shortTitle: "Closet Reset",
    price: 7,
    blurb:
      "A 4-step mini app that resets your closet: sort, audit, find your gaps and tick off checklists, so you only buy what’s missing.",
    highlights: ["Add items and sort them into piles", "Tap to find your gaps", "Tick-off checklists with progress"],
    inside: [
      "Add each item and drop it in Love it, Maybe or Let go",
      "Quick audit you fill in before you shop",
      "Tap the pieces you own to see your real gaps",
      "Before, at the store and after checklists you tick off",
      "A progress bar across all 4 steps",
    ],
    cover: closetCover,
    coverStyle: "poster",
  },
  {
    slug: "palette-and-style-studio",
    tag: "Workbook",
    title: "Palette & Style Studio",
    shortTitle: "Palette Studio",
    price: 9,
    blurb:
      "Find the colors that love you back. Build your palette, run the face test and ask the app “buy or skip?” before every purchase.",
    highlights: ["Build a palette from 4 presets", "Interactive face test", "Buy-or-skip checker"],
    inside: [
      "Start from a preset, then tweak each color role",
      "Run the face test color by color",
      "Answer two quick questions and get buy or skip",
      "Copy your palette to take shopping",
    ],
    cover: paletteCover,
    coverStyle: "poster",
  },
];

export const bundles: Bundle[] = [
  {
    slug: "everyday-edit",
    title: "The Everyday Edit",
    badge: "Save $4",
    guideSlugs: ["elevate-your-wardrobe", "closet-reset-planner", "palette-and-style-studio"],
    price: 24,
    cover: everydayEditCover,
  },
  {
    slug: "winter-edit",
    title: "The Winter Edit",
    badge: "Save $4",
    guideSlugs: ["winter-capsule-playbook", "holiday-party-outfit-formulas", "closet-reset-planner"],
    price: 24,
    cover: winterEditCover,
  },
  {
    slug: "complete-collection",
    title: "The Complete Collection",
    badge: "Best value · Save $10",
    guideSlugs: guides.map((g) => g.slug),
    price: 39,
    cover: completeCollectionCover,
  },
];

export const editorialImages = {
  leopardScarf: scarfSeason,
  shirtSunnies: officeClassic,
  balcony: galleryWalk,
  boots: midiBoots,
  slipDress: dateNight,
  sweater: cashmereCozy,
};

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Sum of the individual guide prices in a bundle. */
export function bundleListPrice(bundle: Bundle): number {
  return bundle.guideSlugs.reduce((sum, slug) => sum + (getGuide(slug)?.price ?? 0), 0);
}

export function bundleSavings(bundle: Bundle): number {
  return bundleListPrice(bundle) - bundle.price;
}

export function bundlesContaining(slug: string): Bundle[] {
  return bundles.filter((b) => b.guideSlugs.includes(slug));
}

export function formatPrice(amount: number): string {
  return `$${amount}`;
}
