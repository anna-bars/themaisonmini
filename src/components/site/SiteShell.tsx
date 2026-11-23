import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logoImg from "@/assets/logo.png";

const tickerItems = [
  "Interactive mini apps, not PDFs",
  "Tap, track, unlock outfits",
  "Instant access",
  "Opens on your phone, no download",
  "Dress the part, spend less",
];

function Ticker() {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden bg-ink py-2 text-paper">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="label-caps flex items-center gap-10">
            {item}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className="inline-block" aria-label="The Maison Mini home">
      <img src={logoImg} alt="The Maison Mini" className={`w-auto ${className}`} />
    </Link>
  );
}

function Header() {
  const navClass = "label-caps text-ink transition-colors hover:text-primary";
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-8">
      <nav className="flex gap-5">
        <a href="/#guides" className={navClass}>
          Shop
        </a>
        <a href="/#bundles" className={`${navClass} hidden sm:inline`}>
          Bundles
        </a>
        <a href="/#try" className={`${navClass} hidden md:inline`}>
          Try the app
        </a>
      </nav>
      <Logo className="h-8 sm:h-10 md:h-12" />
      <nav className="flex justify-end gap-5">
        <a href="/#faq" className={navClass}>
          FAQ
        </a>
        <a href="/#bundles" className={`${navClass} hidden whitespace-nowrap sm:inline`}>
          Shop all
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink px-5 pb-10 pt-12 md:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <Logo className="h-14 md:h-20" />
        <p className="font-display text-2xl uppercase text-primary md:text-3xl">
          For women who dress with intention, not a big budget.
        </p>
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="/#guides" className="label-caps hover:text-primary">
            The guides
          </a>
          <a href="/#bundles" className="label-caps hover:text-primary">
            Bundles
          </a>
          <a href="/#how" className="label-caps hover:text-primary">
            How it works
          </a>
          <a href="/#faq" className="label-caps hover:text-primary">
            FAQ
          </a>
        </nav>
        <p className="max-w-xl text-xs text-muted-foreground">
          © The Maison Mini. For personal use only. Please do not copy, resell or share the files.
          Illustrations are AI-created.
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-paper">
      <div className="w-full flex-1 overflow-hidden bg-paper">
        <Ticker />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
