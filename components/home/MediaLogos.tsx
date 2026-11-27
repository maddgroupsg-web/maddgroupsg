import Image from "next/image";
import { mediaLogos } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

// Media logos under a normal section heading, moving in a straight strip.
export default function MediaLogos() {
  return (
    <section className="py-16 lg:py-20 border-b border-line">
      <div className="container-x">
        <Reveal><SectionHeading align="center" title="AS FEATURED ON LEADING MEDIA PLATFORMS" /></Reveal>
      </div>
      <div className="marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track items-center gap-20 px-10">
          {[...mediaLogos, ...mediaLogos].map((l, i) => (
            <div key={i} className="flex h-12 w-[170px] shrink-0 items-center justify-center">
              <Image src={l.src} alt={i < mediaLogos.length ? l.name : ""} width={l.w} height={l.h} className="max-h-9 max-w-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
