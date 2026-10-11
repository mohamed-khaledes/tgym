"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Close, Menu } from "./icons";

type NavbarProps = { dict: Dictionary["nav"]; lang: Locale };

export default function Navbar({ dict, lang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const otherLang: Locale = lang === "ar" ? "en" : "ar";

  const links = [
    { href: "#home", label: dict.home },
    { href: "#training", label: dict.training },
    { href: "#gallery", label: dict.gallery },
    { href: "#join", label: dict.join },
    { href: "#contact", label: dict.contact },
  ];

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
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3" dir="ltr">
          <Image src="/images/logo.png" alt="T Gym logo" width={52} height={52} className="h-12 w-12" />
          <span className="font-brand text-3xl leading-none tracking-wide">
            T <span className="text-brand">GYM</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative pb-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand rtl:text-base ${
                  i === 0 ? "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {languageSwitch}
          <a
            href="#join"
            className="inline-flex items-center gap-6 bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-brand-dark rtl:text-base"
          >
            {dict.cta} <ArrowUpRight />
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {languageSwitch}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-5 border border-white/10 bg-black/95 p-5 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-wider hover:text-brand rtl:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-between bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wider rtl:text-base"
          >
            {dict.cta} <ArrowUpRight />
          </a>
        </div>
      )}
    </header>
  );
}
