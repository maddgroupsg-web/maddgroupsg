import Image from "next/image";
import { progression } from "@/content/home";
import { Reveal, SectionHeading, Button } from "@/components/ui";

// Static (non-pinned) version of "Start with a class. Discover where it could lead."
export default function Journey() {
  return (
    <section id="journey" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 spotlight" />
      <div className="container-x relative">
        <Reveal><SectionHeading eyebrow={progression.eyebrow} title={progression.headline} /></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {progression.stages.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative rounded-xl overflow-hidden glass">
              <div className="relative aspect-[4/5] sm:aspect-[4/3]">
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4 display text-cyan text-3xl">{s.n}</div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="display text-4xl sm:text-5xl">{s.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-white/80">{s.items.map((it, k) => <li key={it}>{it}{k < s.items.length - 1 && <span className="ml-2 text-cyan">•</span>}</li>)}</ul>
                </div>
              </div>
              {i < progression.stages.length - 1 && <div className="hidden md:flex absolute right-[-14px] top-1/2 z-10 h-7 w-7 rounded-full bg-cyan text-ink items-center justify-center text-xs font-bold">→</div>}
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <p className="display text-2xl sm:text-3xl"><span className="text-white">{progression.keyMessage[0]}</span> <span className="text-cyan normal-case font-sans text-base sm:text-lg tracking-normal">{progression.keyMessage[1]}</span></p>
          <Button href="#pathway" variant="outline">DISCOVER THE PATHWAY</Button>
        </Reveal>
      </div>
    </section>
  );
}
