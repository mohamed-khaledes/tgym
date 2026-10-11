import Image from "next/image";
import { notFound } from "next/navigation";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import {
  ArrowUpRight,
  Barbell,
  Bolt,
  BrushStroke,
  Crown,
  Dumbbell,
  Flame,
  Heartbeat,
  Play,
  User,
} from "@/components/icons";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

// Labels come from the dictionaries, in the same order
const stats = [
  { icon: Dumbbell, value: "500+" },
  { icon: Flame, value: "15+" },
  { icon: Crown, value: "10K+" },
  { icon: Bolt, value: "100%" },
];

const programs = [
  { icon: Barbell, image: "/images/gym-07.jpg" },
  { icon: Heartbeat, image: "/images/gym-06.jpg" },
  { icon: User, image: "/images/gym-05.jpg" },
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, training, gallery, cta } = dict;

  return (
    <>
      <Navbar dict={dict.nav} lang={lang} />
      <main>
        {/* ---------------- HERO ---------------- */}
        <section
          id="home"
          className="relative isolate min-h-[min(100svh,960px)] overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Parallax speed={0.12}>
              <Image
                src="/images/gym-04.jpg"
                alt={hero.imageAlt}
                fill
                preload
                sizes="100vw"
                className="animate-slow-zoom object-cover object-[center_40%]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/25 rtl:bg-linear-to-l" />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/70" />
          </div>

          <div className="mx-auto grid min-h-[min(100svh,960px)] max-w-7xl items-center gap-10 px-5 pb-16 pt-32 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <h1 className="font-display text-[clamp(5rem,15vw,12rem)] leading-[0.85] tracking-tight text-neutral-100 rtl:text-[clamp(4rem,12vw,9rem)] rtl:leading-[1.15]">
                <span className="animate-rise block">{hero.line1}</span>
                <span className="animate-rise block [animation-delay:150ms]">
                  {hero.line2}
                  <span className="text-brand">.</span>
                </span>
              </h1>
              <BrushStroke
                className="animate-rise mt-3 h-5 w-64 text-brand sm:w-96"
                style={{ animationDelay: "450ms" }}
              />

              <p className="animate-rise mt-8 text-xl font-semibold uppercase tracking-wide [animation-delay:600ms] sm:text-2xl">
                {hero.tagline1}
                <br />
                <span className="text-brand">{hero.tagline2}</span>
              </p>

              <div className="animate-rise mt-10 flex flex-wrap items-center gap-8 [animation-delay:750ms]">
                <a
                  href="#join"
                  className="inline-flex items-center gap-12 bg-brand px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-brand-dark rtl:text-base"
                >
                  {hero.cta} <ArrowUpRight />
                </a>
                <a
                  href="#gallery"
                  className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-wider rtl:text-base"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/80 transition-colors group-hover:border-brand group-hover:text-brand">
                    <Play />
                  </span>
                  {hero.tour}
                </a>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-1 lg:gap-0">
              {stats.map(({ icon: Icon, value }, i) => (
                <li
                  key={value}
                  className="animate-rise border-white/15 lg:w-48 lg:border-b lg:py-6 lg:last:border-b-0"
                  style={{ animationDelay: `${500 + i * 150}ms` }}
                >
                  <Icon className="h-7 w-7 text-brand" />
                  <p className="mt-3 font-brand text-4xl tracking-wide" dir="ltr">
                    <CountUp value={value} />
                  </p>
                  <p className="text-xs uppercase tracking-widest text-neutral-300 rtl:text-sm">
                    {hero.stats[i]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- TRAINING ---------------- */}
        <section id="training" className="border-b border-white/10 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[18rem_1fr] lg:px-8">
            <Reveal variant="left" className="flex flex-col justify-center">
              <p className="font-display text-2xl tracking-wide text-brand">{training.eyebrow}</p>
              <h2 className="mt-2 font-display text-7xl leading-[0.85] tracking-tight rtl:text-6xl rtl:leading-[1.2]">
                {training.line1}
                <br />
                {training.line2}
                <span className="text-brand">.</span>
              </h2>
              <p className="mt-6 leading-relaxed text-neutral-300">{training.body}</p>
              <a
                href="#join"
                className="mt-10 inline-flex w-fit items-center gap-10 border border-white/70 px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-brand hover:bg-brand rtl:text-base"
              >
                {training.cta} <ArrowUpRight />
              </a>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-3">
              {programs.map(({ icon: Icon, image }, i) => {
                const { title, text } = training.programs[i];
                return (
                  <Reveal key={image} delay={i * 150}>
                    <article className="group relative isolate flex aspect-3/4 flex-col justify-between overflow-hidden p-5">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/40 to-black/10" />

                      <span className="grid h-11 w-11 place-items-center bg-brand">
                        <Icon />
                      </span>
                      <div>
                        <h3 className="font-display text-4xl tracking-wide">{title}</h3>
                        <div className="mt-2 flex items-end justify-between gap-4">
                          <p className="text-sm leading-relaxed text-neutral-300">
                            {text[0]}
                            <br />
                            {text[1]}
                          </p>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- GALLERY ---------------- */}
        <section id="gallery" className="border-b border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal variant="left">
                <p className="font-display text-2xl tracking-wide text-brand">{gallery.eyebrow}</p>
                <h2 className="mt-2 font-display text-6xl leading-[0.85] tracking-tight sm:text-7xl rtl:leading-[1.2] rtl:sm:text-6xl">
                  {gallery.title[0]} <span className="text-brand">{gallery.title[1]}</span> {gallery.title[2]}
                  <span className="text-brand">.</span>
                </h2>
              </Reveal>
              <Reveal variant="right" delay={150}>
                <p className="max-w-sm leading-relaxed text-neutral-300">{gallery.body}</p>
              </Reveal>
            </div>

            <Gallery dict={gallery} />
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section id="join" className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Parallax speed={0.12}>
              <Image
                src="/images/gym-02.jpg"
                alt={cta.imageAlt}
                fill
                sizes="100vw"
                className="object-cover object-[center_45%]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/25 rtl:bg-linear-to-l" />
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-ink/80" />
          </div>

          <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36">
            <h2 className="font-display text-[clamp(4.5rem,11vw,9rem)] leading-[0.85] tracking-tight rtl:text-[clamp(3.5rem,9vw,7rem)] rtl:leading-[1.2]">
              <Reveal variant="left">{cta.line1}</Reveal>
              <Reveal variant="left" delay={120}>
                <span className="text-brand">{cta.line2}</span>
              </Reveal>
              <Reveal variant="left" delay={240}>
                {cta.line3}
              </Reveal>
            </h2>
            <Reveal delay={400}>
              <p className="mt-2 -rotate-3 font-script text-4xl text-brand sm:text-5xl rtl:rotate-3 rtl:text-5xl rtl:sm:text-6xl">
                {cta.script}
              </p>
              <BrushStroke
                className="mt-5 h-4 w-60 text-neutral-100 sm:w-80 rtl:mt-9"
                style={{ animationDelay: "300ms" }}
              />
            </Reveal>

            <Reveal delay={550} className="mt-12 flex flex-wrap items-center gap-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-14 bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-brand-dark rtl:text-base"
              >
                {cta.button} <ArrowUpRight />
              </a>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["/images/gym-03.jpg", "/images/gym-05.jpg", "/images/gym-07.jpg", "/images/gym-09.jpg"].map(
                    (src) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full border-2 border-ink object-cover"
                      />
                    ),
                  )}
                </div>
                <p className="text-sm font-semibold uppercase leading-snug tracking-wide">
                  {cta.members1}
                  <br />
                  <span className="text-neutral-400">{cta.members2}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer dict={dict.footer} />
      <JsonLd lang={lang} dict={dict} />
    </>
  );
}
