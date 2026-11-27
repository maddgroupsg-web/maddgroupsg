import Image from "next/image";
import { mediaLogos } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

// Media logos moving in a continuous row.
// It never stops. The list is doubled so the loop is seamless.
export default function MediaLogos({ title = "AS FEATURED ON LEADING MEDIA PLATFORMS", compact = false }: { title?: string; compact?: boolean }) {
  return (
    <section className={compact ? "pt-14 pb-8 lg:pt-16 lg:pb-10" : "pt-20 lg:pt-28 pb-8 lg:pb-10"} aria-label="As featured on">
      <div className="container-x">
        <Reveal><SectionHeading align="center" title={title} /></Reveal>
      </div>
      <div className={`relative ${compact ? "mt-8 lg:mt-10" : "mt-14 lg:mt-16"} overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]`}>
        <div className="marquee-track gap-3 lg:gap-5" style={{ animationDuration: "45s" }}>
          {[...mediaLogos, ...mediaLogos].map((l, i) => (
            <div key={i} className="relative flex h-32 lg:h-40 w-[190px] sm:w-[230px] lg:w-[250px] shrink-0 items-center justify-center px-6" aria-hidden={i >= mediaLogos.length || undefined}>
              <Image src={l.src} alt={i < mediaLogos.length ? l.name : ""} width={l.w} height={l.h} className="max-h-7 lg:max-h-8 max-w-[120px] lg:max-w-[140px] w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

