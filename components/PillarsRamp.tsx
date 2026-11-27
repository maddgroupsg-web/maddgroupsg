import Image from "next/image";
import Link from "next/link";
import { maddGroup } from "@/content/home";
import { Reveal } from "@/components/ui";
import { toSentence } from "@/lib/utils";

// The four pillars as one straight row of equal panels. The text block starts at the same height in every panel,
// so the titles, names and lines all align across the row.
export default function PillarsRamp() {
  const p = maddGroup.pillars;
  return (
    <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {p.map((pl, i) => (
        <Reveal key={pl.name} delay={i * 0.08} className="bg-ink">
          <Link href={pl.href} className="group relative block h-[440px] lg:h-[540px] overflow-hidden">
            <Image src={pl.image} alt={`${pl.name} — ${pl.verb}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover opacity-60 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/85 to-transparent" />
            {pl.logo && <div className="absolute right-5 top-5 h-11 w-11 lg:h-12 lg:w-12 flex items-start justify-end"><Image src={pl.logo} alt="" width={120} height={120} className="max-h-full w-auto object-contain" /></div>}
            <div className="absolute inset-x-0 top-[52%] px-5 lg:px-7">
              <div className="font-display text-[2rem] lg:text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-accent">{pl.verb}</div>
              <div className="mt-2 font-display text-lg lg:text-xl font-semibold leading-tight tracking-[-0.02em] whitespace-nowrap">{toSentence(pl.name)}</div>
              <p className="mt-3 min-h-[3.25em] text-[13.5px] leading-relaxed text-white/80 max-w-[30ch] line-clamp-2">{pl.copy}</p>
              <span className="mt-4 inline-block text-[13px] font-medium text-white underline decoration-white/40 underline-offset-4 group-hover:decoration-white">Explore</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
