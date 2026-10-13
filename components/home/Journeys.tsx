import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories, studentJourneys } from "@/content/achievements";
import { awards } from "@/content/site";
import { Reveal, SectionHeading, Button } from "@/components/ui";

export default function Journeys() {
  return (
    <section className="relative py-20 lg:py-28 bg-ink-2 border-y border-line">
      <div className="container-x">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading eyebrow="SOCIAL PROOF" title={<><span className="block">REAL STUDENTS.</span><span className="block text-cyan">REAL JOURNEYS.</span></>} sub="These are not one-off experiences — they are part of a structured pathway we build for every student." />
          <Button href="/achievements" variant="outline">ALL ACHIEVEMENTS</Button>
        </Reveal>

        {/* Student journeys */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {studentJourneys.map((j, i) => (
            <Reveal key={j.name} delay={i * 0.08} className="glass rounded-xl overflow-hidden grid sm:grid-cols-[200px_1fr]">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full"><Image src={j.image} alt={`${j.name} performing`} fill sizes="(max-width: 640px) 100vw, 200px" className="object-cover" /></div>
              <div className="p-6">
                <div className="eyebrow">{j.discipline}</div>
                <h3 className="display text-4xl mt-1">{j.name}</h3>
                <ol className="mt-4 space-y-2 border-l border-cyan/40 pl-4 text-sm text-white/80">
                  {j.steps.map((s, k) => <li key={k} className="relative"><span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_8px_#22d3d3]" />{s}</li>)}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stage stories */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link href={`/achievements#${s.slug}`} className="group block overflow-hidden rounded-xl border border-line bg-ink-3">
                <div className="relative aspect-[4/3]"><Image src={s.image} alt={s.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="p-4">
                  <div className="text-[10px] tracking-[0.2em] text-cyan">{s.place}</div>
                  <h3 className="mt-1 font-semibold leading-snug">{s.title}</h3>
                  {s.journey && <div className="mt-3 flex flex-wrap items-center gap-1 text-[10px] text-white/60">{s.journey.map((t, k) => <span key={t} className="flex items-center gap-1">{t}{k < s.journey!.length - 1 && <ArrowRight size={10} className="text-cyan" />}</span>)}</div>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Credibility strip */}
        <Reveal className="mt-14">
          <div className="text-center eyebrow">AWARDS & ACCREDITATIONS</div>
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-4 items-center">
            {awards.map((a) => <div key={a.src} className="relative aspect-square"><Image src={a.src} alt={a.alt} fill sizes="160px" className="object-contain" /></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
