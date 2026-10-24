# T Gym — Landing Page

A bilingual (English / Arabic) landing page for **T Gym**, a gym in Dikirnis, Egypt. Built with Next.js 16 and Tailwind CSS v4.

**Live demo:** https://tgym1.vercel.app/

<img width="1903" height="944" alt="T Gym landing page" src="https://github.com/user-attachments/assets/45f09b34-5624-4b30-81c2-6c6d1dff0eab" />

## Features

- **English and Arabic.** English is served at `/` and Arabic at `/ar`, with full right-to-left layout and Arabic fonts (Lalezar, Cairo, Aref Ruqaa).
- **Sections:** hero with stats, training programs, photo gallery, call to action, and a footer with address, hours and contact links.
- **Gallery slider.** Click any photo to open a full-screen slider with arrows, thumbnails, keyboard controls (← → Esc) and swipe on mobile. It respects RTL in Arabic.
- **Animations:** load-in hero, scroll-reveal sections, parallax backgrounds, counting stats and self-drawing brush strokes. All of them are disabled for users who prefer reduced motion.
- **Sticky navbar** that turns solid on scroll and highlights the current section.
- **SEO:**
  - per-language titles and descriptions, with `hreflang` alternates
  - Open Graph and Twitter share image
  - `ExerciseGym` structured data (JSON-LD) with address, hours and phone
  - `sitemap.xml`, `robots.txt` and a web app manifest
- **Icons:** favicon and app icons generated from the gym's logo.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, `proxy.ts`)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- No other runtime dependencies. The animations, slider and translations are small hand-written components.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000 for English, or http://localhost:3000/ar for Arabic.

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

### Environment variables

| Variable                   | Required | Description                                                                                                  |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`     | No       | The site's public URL, e.g. `https://tgym1.vercel.app`. Used for canonical links, share images, the sitemap and structured data. On Vercel it defaults to the project's production domain; elsewhere it defaults to `http://localhost:3000`, so set it when hosting anywhere else. |
| `GOOGLE_SITE_VERIFICATION` | No       | The code from Google Search Console's "HTML tag" verification method. Adds the `google-site-verification` meta tag. |

## Editing content

You don't need to touch the page components to change the content:

| What you want to change                          | Where                                                         |
| ------------------------------------------------ | ------------------------------------------------------------- |
| Phone, social links, opening hours (for Google), site URL | [`lib/site.ts`](lib/site.ts)                          |
| English text                                     | [`lib/dictionaries/en.ts`](lib/dictionaries/en.ts)            |
| Arabic text                                      | [`lib/dictionaries/ar.ts`](lib/dictionaries/ar.ts)            |
| Gallery photos and how many show in the grid     | `sources` and `GRID_COUNT` in [`components/Gallery.tsx`](components/Gallery.tsx) |
| Hero stats (500+, 15+, …)                        | `stats` in [`app/[lang]/page.tsx`](app/[lang]/page.tsx)       |
| Brand colors and fonts                           | [`app/globals.css`](app/globals.css)                          |

The English and Arabic dictionaries share one TypeScript type. If you add a key to one and forget the other, the build fails.

Photos live in [`public/images/`](public/images/). To replace a photo, keep the same file name, or update the paths in the files above.

## Project structure

```
app/
  [lang]/
    layout.tsx      # Root layout: <html lang/dir>, fonts, per-language metadata
    page.tsx        # The landing page
  globals.css       # Tailwind theme, fonts per language, animations, RTL fixes
  sitemap.ts, robots.ts, manifest.ts
  favicon.ico, icon.png, apple-icon.png, opengraph-image.jpg, twitter-image.jpg
components/
  Navbar.tsx        # Sticky navbar, section highlight, mobile menu, language switch
  Gallery.tsx       # Photo grid + full-screen slider
  Footer.tsx        # Address (Google Maps link), hours, phone, socials
  JsonLd.tsx        # Structured data for Google
  Reveal.tsx        # Scroll-reveal animation wrapper
  Parallax.tsx      # Parallax background layer
  CountUp.tsx       # Animated stat counter
  icons.tsx         # Inline SVG icons
lib/
  site.ts           # Language-independent gym details
  i18n.ts           # Locales, default locale, URL helpers
  dictionaries/     # en.ts, ar.ts
proxy.ts            # Serves English at "/" and Arabic at "/ar"
_originals/         # Original, uncropped photos and logo
```

### How the language routing works

All pages live under `app/[lang]`. [`proxy.ts`](proxy.ts) rewrites requests without a language prefix to `/en` internally, so English shows at `/`. Arabic is served at `/ar`. Visiting `/en` directly redirects to `/`, so each page has a single public URL.

To change the default language, update `defaultLocale` in [`lib/i18n.ts`](lib/i18n.ts) and `DEFAULT_LOCALE` / `OTHER_LOCALES` in [`proxy.ts`](proxy.ts).

## Deploying

The site deploys to [Vercel](https://vercel.com) with no extra configuration. The site URL is picked up from Vercel automatically, including a custom domain once you add one.

## Contact

**T Gym**, Ashmoun El-Rumman, intersection of Souq Street and Al-Bahr Street, Dikirnis, Dakahlia, Egypt
📞 +20 103 000 0563 · [Instagram](https://www.instagram.com/tgymoffical) · [Facebook](https://www.facebook.com/tgymoffical)

---

© 2026 Mohamed Khaled
