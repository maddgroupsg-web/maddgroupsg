import Image from "next/image";
import { mediaLogos } from "@/content/site";

export default function LogoMarquee({ title = "AS FEATURED IN LEADING MEDIA PLATFORMS", sub = "MADDspace has been featured across major media platforms for our students' performances, achievements and unique training approach for DSA", compact = false }: { title?: string; sub?: string; compact?: boolean }) {
  const logos = [...mediaLogos, ...mediaLogos];
  return (
    <section className={compact ? "py-10" : "py-20"} aria-label="Featured on">
      <div className="container-x text-center">
        {!compact && <div className="eyebrow mb-3">RECOGNISED BY LEADING MEDIA</div>}
        <h2 className={compact ? "display text-3xl" : "display text-4xl sm:text-6xl"}>{title}</h2>
        {sub && !compact && <p className="mt-4 max-w-2xl mx-auto text-mute">{sub}</p>}
      </div>
      <div className="marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track items-center gap-16 px-8">
          {logos.map((l, i) => (
            <div key={i} className="flex h-16 w-[170px] sm:w-[210px] shrink-0 items-center justify-center">
              <Image src={l.src} alt={l.name} width={l.w} height={l.h} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
