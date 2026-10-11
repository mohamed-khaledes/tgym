"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Close, Menu } from "./icons";

type NavbarProps = { dict: Dictionary["nav"]; lang: Locale };

const sectionIds = ["home", "training", "gallery", "join", "contact"] as const;

export default function Navbar({ dict, lang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const otherLang: Locale = lang === "ar" ? "en" : "ar";

  const labels: Record<(typeof sectionIds)[number], string> = {
    home: dict.home,
    training: dict.training,
    gallery: dict.gallery,
    join: dict.join,
    contact: dict.contact,
  };

  // Solid background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // A plain <a> on purpose: switching language swaps the root layout (lang/dir), which needs a full load
  const languageSwitch = (
    <a
      href={localePath(otherLang)}
      hrefLang={otherLang}
      lang={otherLang}
      aria-label={dict.switchAria}
      className="inline-flex items-center border border-white/30 px-3 py-2 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
    >
      {dict.switchLabel}
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[padding] duration-300 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a href="#home" className="flex items-center gap-3" dir="ltr">
          <Image
            src="/images/logo.png"
            alt="T Gym logo"
            width={52}
            height={52}
            className={`transition-all duration-300 ${scrolled ? "h-10 w-10" : "h-12 w-12"}`}
          />
          <span className="font-brand text-3xl leading-none tracking-wide">
            T <span className="text-brand">GYM</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative pb-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand rtl:text-base after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:bg-brand after:transition-transform after:duration-300 ${
                  active === id ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {languageSwitch}
          <a
            href="#join"
            className="group inline-flex items-center gap-6 bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-brand-dark rtl:text-base"
          >
            {dict.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {languageSwitch}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: slides open with a grid-rows transition */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6">
            <ul className="flex flex-col border-t border-white/10">
              {sectionIds.map((id) => (
                <li key={id} className="border-b border-white/10">
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand rtl:text-base ${
                      active === id ? "text-brand" : ""
                    }`}
                  >
                    {labels[id]}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="mt-5 flex items-center justify-between bg-brand px-5 py-4 text-sm font-semibold uppercase tracking-wider rtl:text-base"
            >
              {dict.cta} <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
