"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  /** How far the layer drifts, as a fraction of the section height (max 0.14). */
  speed?: number;
  className?: string;
};

/**
 * Moves a background layer at a slower rate than the page while scrolling.
 * The layer is oversized vertically so its edges never show.
 */
export default function Parallax({ children, speed = 0.12, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the section enters at the bottom, 0 when centered, 1 when it leaves at the top
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / ((vh + rect.height) / 2);
      // Stay within the 15% overhang so the layer's edges never show
      const shift = Math.max(-1, Math.min(1, progress)) * rect.height * Math.min(speed, 0.14);
      el.style.transform = `translate3d(0, ${shift}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`absolute inset-x-0 inset-y-[-15%] will-change-transform ${className}`}>
      {children}
    </div>
  );
}
