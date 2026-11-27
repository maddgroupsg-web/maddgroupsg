import Image from "next/image";
import { mediaLogos } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

// Media logos in bracketed cells (small L-shaped corners, no full lines), moving in a continuous row.
// Hovering pauses it. The list is doubled so the loop is seamless.
export default function MediaLogos() {
  return (
    <section className="py-20 lg:py-28 border-b border-line">
      <div className="container-x">
        <Reveal><SectionHeading align="center" title="AS FEATURED ON LEADING MEDIA PLATFORMS" /></Reveal>
      </div>
      <div className="marquee relative mt-14 lg:mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="marquee-track gap-3 lg:gap-5" style={{ animationDuration: "45s" }}>
          {[...mediaLogos, ...mediaLogos].map((l, i) => (
            <div key={i} className="relative flex h-32 lg:h-40 w-[190px] sm:w-[230px] lg:w-[250px] shrink-0 items-center justify-center px-6" aria-hidden={i >= mediaLogos.length || undefined}>
              <Corners />
              <Image src={l.src} alt={i < mediaLogos.length ? l.name : ""} width={l.w} height={l.h} className="max-h-7 lg:max-h-8 max-w-[120px] lg:max-w-[140px] w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// four small L-shaped brackets, one in each corner of a cell
function Corners() {
  const c = "pointer-events-none absolute h-3.5 w-3.5 border-white/30";
  return (
    <>
      <span aria-hidden className={`${c} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${c} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${c} left-0 bottom-0 border-l border-b`} />
      <span aria-hidden className={`${c} right-0 bottom-0 border-r border-b`} />
    </>
  );
}
