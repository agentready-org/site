"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navLink =
  "font-mono text-[15px] text-muted-foreground hover:text-foreground transition-colors";

const ANCHORS: { href: string; label: string }[] = [
  { href: "#essentials", label: "Essentials" },
  { href: "#guide", label: "Guide" },
  { href: "#beyond", label: "Scan" },
];

const EXTERNAL_LINKS: { href: string; label: string }[] = [
  { href: "https://github.com/agentready-org/standard", label: "GitHub" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <nav className="relative flex items-center justify-between px-4 sm:px-6 py-4 mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            aria-label="agentready.org"
            className="inline-flex items-center gap-2.5 font-mono text-[22px] font-bold tracking-wide text-foreground hover:opacity-70 transition-opacity"
          >
            <svg aria-hidden="true" viewBox="0 0 32 32" className="size-6 shrink-0">
              <rect width="32" height="32" rx="6" className="fill-foreground" />
              <path
                d="M6 15.5 L10.5 20 L18.5 10.5"
                fill="none"
                strokeWidth="3.6"
                strokeLinecap="square"
                className="stroke-background"
              />
              <rect x="21" y="20" width="7" height="3" fillOpacity="0.5" className="fill-background" />
            </svg>
            <span>
              agentready
              <span className="font-normal text-muted-foreground/55">.org</span>
            </span>
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          {ANCHORS.map((link) => (
            <a key={link.href} href={link.href} className={navLink}>
              {link.label}
            </a>
          ))}
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={navLink}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle className="-mr-1" />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="font-mono text-[14px] text-muted-foreground border border-border/70 rounded-md px-2.5 py-1.5 hover:bg-muted/30 hover:text-foreground transition-colors"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            Menu
          </button>
          {menuOpen && (
            <div
              ref={panelRef}
              className="absolute right-4 top-full mt-2 z-50 min-w-[11rem] rounded-lg border border-border/80 bg-card py-1.5 shadow-md"
              role="menu"
            >
              {ANCHORS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 font-mono text-[15px] text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {EXTERNAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2.5 font-mono text-[15px] text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
