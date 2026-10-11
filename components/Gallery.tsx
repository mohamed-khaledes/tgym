"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";
import { ChevronLeft, ChevronRight, Close, Expand } from "./icons";

/** Photo files, in the same order as the captions in the dictionaries (gallery.photos). */
const sources = [
  "/images/gym-08.jpg",
  "/images/gym-03.jpg",
  "/images/gym-01.jpg",
  "/images/gym-09.jpg",
  "/images/gym-04.jpg",
  "/images/gym-02.jpg",
  "/images/gym-05.jpg",
  "/images/gym-06.jpg",
  "/images/gym-07.jpg",
];

/** How many photos the grid shows; the rest are only in the slider. */
const GRID_COUNT = 5;

type Photo = { src: string; alt: string };
type GalleryText = Dictionary["gallery"];

export default function Gallery({ dict }: { dict: GalleryText }) {
  const photos: Photo[] = sources.map((src, i) => ({ src, alt: dict.photos[i] ?? "" }));
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + sources.length) % sources.length)),
    [setIndex],
  );

  return (
    <>
      <div className="mt-12 grid auto-rows-55 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {photos.slice(0, GRID_COUNT).map(({ src, alt }, i) => {
          const isLast = i === GRID_COUNT - 1;
          const remaining = photos.length - GRID_COUNT;
          return (
            <Reveal
              key={src}
              variant="zoom"
              delay={i * 100}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={`${dict.open}: ${alt}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
                <span className="absolute inset-e-4 top-4 grid h-10 w-10 place-items-center bg-brand opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand />
                </span>
                {isLast && remaining > 0 && (
                  <span className="absolute inset-0 grid place-items-center bg-black/55 transition-colors group-hover:bg-black/70">
                    <span className="text-center">
                      <span className="block font-brand text-5xl tracking-wide">+{remaining}</span>
                      <span className="text-xs font-semibold uppercase tracking-widest rtl:text-sm">{dict.viewAll}</span>
                    </span>
                  </span>
                )}
              </button>
            </Reveal>
          );
        })}
      </div>

      {index !== null && (
        <Lightbox photos={photos} dict={dict} index={index} onClose={close} onStep={go} onSelect={setIndex} />
      )}
    </>
  );
}

type LightboxProps = {
  photos: Photo[];
  dict: GalleryText;
  index: number;
  onClose: () => void;
  onStep: (step: number) => void;
  onSelect: (index: number) => void;
};

function Lightbox({ photos, dict, index, onClose, onStep, onSelect }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const photo = photos[index];

  // Keyboard controls, scroll lock and focus handling
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // In Arabic (right-to-left) "next" is towards the left
    const forward = document.documentElement.dir === "rtl" ? "ArrowLeft" : "ArrowRight";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft") onStep(e.key === forward ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, [onClose, onStep]);

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbs.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.dialog}
      className="lightbox-in fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <p className="font-brand text-2xl tracking-wide" dir="ltr">
          <span className="text-brand">{pad(index + 1)}</span>
          <span className="text-neutral-500"> / {pad(photos.length)}</span>
        </p>
        <p className="hidden text-sm uppercase tracking-widest text-neutral-300 sm:block rtl:text-base">{photo.alt}</p>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={dict.close}
          className="grid h-11 w-11 place-items-center border border-white/20 transition-colors hover:border-brand hover:bg-brand"
        >
          <Close />
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative flex-1"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 50) return;
          // Swiping towards the reading direction's start shows the next photo
          const rtl = document.documentElement.dir === "rtl";
          onStep((dx < 0) !== rtl ? 1 : -1);
        }}
      >
        <div key={photo.src} className="lightbox-slide pointer-events-none absolute inset-4 sm:inset-x-24">
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
        </div>

        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label={dict.prev}
          className="absolute inset-s-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/60 transition-colors hover:bg-brand sm:inset-s-6"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label={dict.next}
          className="absolute inset-e-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/60 transition-colors hover:bg-brand sm:inset-e-6"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div ref={thumbs} className="flex gap-3 overflow-x-auto px-5 py-4 lg:justify-center lg:px-8">
        {photos.map(({ src, alt }, i) => (
          <button
            key={src}
            type="button"
            data-index={i}
            onClick={() => onSelect(i)}
            aria-label={`${dict.show} ${i + 1}: ${alt}`}
            aria-current={i === index}
            className={`relative h-16 w-20 shrink-0 overflow-hidden border-2 transition-all sm:h-20 sm:w-24 ${
              i === index ? "border-brand opacity-100" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
