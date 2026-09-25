"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { DownloadIcon } from "@/components/ui/Icons";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of NAV_ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">~/</span>
          {profile.shortName.toLowerCase()}
          <span className="animate-pulse text-accent">_</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? "bg-white/5 text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent transition hover:bg-accent hover:text-bg"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-muted hover:text-fg lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line px-5 py-3 lg:hidden">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-muted hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <a
              href={profile.cvUrl}
              download
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
