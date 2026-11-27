import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { classesHub, byAge, byType } from "@/content/programmes";
import HoverPreviewList from "@/components/HoverPreviewList";
import PhilosophyAccordion from "@/components/PhilosophyAccordion";
import { Reveal, SectionHeading } from "@/components/ui";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = { title: seo["/classes"].title, description: seo["/classes"].description, alternates: { canonical: "/classes" } };

export default function ClassesPage() {
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-10">
        <div className="container-x relative">
          <Reveal><SectionHeading as="h1" eyebrow="PROGRAMMES" title={classesHub.h1} sub={<>{classesHub.intro[0]}<br />{classesHub.intro[1]}</>} /></Reveal>
          <h2 className="display text-3xl mt-14 mb-4">BY AGE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {byAge.map((t) => (
              <Link key={t.title} href={t.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4"><div className="text-[10px] tracking-[0.2em] text-cyan">CLASSES FOR</div><div className="display text-2xl sm:text-3xl leading-none mt-1">{t.title}</div><div className="text-[11px] text-white/70 mt-1">{t.ages}</div></div>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/holiday-camps" className="glass rounded-lg px-5 py-3 text-xs tracking-[0.15em] font-semibold hover:border-cyan/60 hover:text-cyan transition-colors">HOLIDAY CAMPS →</Link>
            <Link href="/dsaacademy" className="glass rounded-lg px-5 py-3 text-xs tracking-[0.15em] font-semibold hover:border-cyan/60 hover:text-cyan transition-colors">DSA PREPARATION →</Link>
          </div>
          <h2 className="display text-3xl mt-14 mb-6">BY TYPE</h2>
          <HoverPreviewList rows={byType} />
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-ink-2 border-y border-line">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="HOW WE TEACH" title={classesHub.philosophyTitle} sub="Open each card to see what guides every MADDspace lesson." />
          </Reveal>
          <Reveal delay={0.1}><PhilosophyAccordion /></Reveal>
        </div>
      </section>
      <Testimonials />
      <FinalCta />
    </Shell>
  );
}
