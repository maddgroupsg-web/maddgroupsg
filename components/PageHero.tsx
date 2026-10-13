import Image from "next/image";
import { Reveal } from "@/components/ui";
import type { ReactNode } from "react";

export default function PageHero({ eyebrow, title, sub, image, children, tall = false, h1Class = "" }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; image: string; children?: ReactNode; tall?: boolean; h1Class?: string }) {
  return (
    <section className={`relative flex items-end overflow-hidden curtain ${tall ? "min-h-[88svh]" : "min-h-[68svh]"}`}>
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <div className="container-x relative pb-14 pt-40">
        <Reveal>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1 className={`display mt-3 text-5xl sm:text-6xl lg:text-7xl max-w-4xl ${h1Class}`}>{title}</h1>
          {sub && <div className="mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">{sub}</div>}
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
