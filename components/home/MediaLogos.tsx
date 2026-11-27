import Image from "next/image";
import { mediaLogos } from "@/content/site";

// Plain, static strip of the media logos. No movement, no slant.
export default function MediaLogos() {
  return (
    <section className="border-b border-line" aria-label="As featured on">
      <div className="container-x py-8 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="eyebrow shrink-0 text-white/45">As featured on</div>
        <ul className="flex flex-1 flex-wrap items-center justify-center lg:justify-between gap-x-10 gap-y-6">
          {mediaLogos.map((l) => (
            <li key={l.name} className="flex h-9 items-center">
              <Image src={l.src} alt={l.name} width={l.w} height={l.h} className="max-h-8 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
