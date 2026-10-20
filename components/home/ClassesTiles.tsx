import Image from "next/image";
import Link from "next/link";
import { ourClasses } from "@/content/home";
import { Reveal, SectionHeading, Button } from "@/components/ui";

export default function ClassesTiles() {
  return (
    <section className="relative py-20 lg:py-28 bg-ink-2 border-y border-line">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow="FIND THEIR STARTING POINT" title={ourClasses.headline} />
          <div className="mt-6 space-y-4 text-mute leading-relaxed">
            {ourClasses.copy.map((p, i) => <p key={i} className={i === 2 ? "text-white font-semibold" : ""}>{p}</p>)}
          </div>
          <div className="mt-8"><Button href="/classes" variant="outline">EXPLORE ALL PROGRAMMES</Button></div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ourClasses.tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.09}>
              <Link href={t.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <div className="text-[10px] tracking-[0.2em] text-cyan">CLASSES FOR</div>
                  <h3 className="display text-2xl sm:text-3xl leading-none mt-1">{t.title}</h3>
                  <div className="text-[11px] text-white/70 mt-1">{t.sub}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
