import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Facebook, Instagram } from "./icons";

const { address } = site;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${address.street}, ${address.city}, ${address.country}`,
)}`;

export default function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black">
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3" dir="ltr">
            <Image src="/images/logo.png" alt={dict.logoAlt} width={56} height={56} className="h-14 w-14" />
            <span className="font-brand text-3xl tracking-wide">
              T <span className="text-brand">GYM</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{dict.tagline}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl tracking-wide">{dict.visit}</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-neutral-400">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
              {dict.address[0]}
              <br />
              {dict.address[1]}
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-display text-2xl tracking-wide">{dict.hoursTitle}</h2>
          <ul className="mt-3 text-sm leading-relaxed text-neutral-400">
            {dict.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl tracking-wide">{dict.contact}</h2>
          <a
            href={`tel:${site.phone}`}
            dir="ltr"
            className="mt-3 inline-block text-sm leading-relaxed text-neutral-400 transition-colors hover:text-brand"
          >
            {site.phoneDisplay}
          </a>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.instagram}
              className="grid h-10 w-10 place-items-center border border-white/20 transition-colors hover:border-brand hover:bg-brand"
            >
              <Instagram />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.facebook}
              className="grid h-10 w-10 place-items-center border border-white/20 transition-colors hover:border-brand hover:bg-brand"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </Reveal>
      <p className="border-t border-white/10 py-6 text-center text-xs uppercase tracking-widest text-neutral-500">
        {dict.copyright}
      </p>
    </footer>
  );
}
