"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "zoom";

type RevealProps = {
  children: ReactNode;
  variant?: Variant;
  /** Delay in ms, handy for staggering items in a list. */
  delay?: number;
  className?: string;
};

/** Fades its children in when they scroll into view. */
export default function Reveal({ children, variant = "up", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={variant} style={{ transitionDelay: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}
