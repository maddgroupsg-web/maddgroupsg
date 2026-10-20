import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { classesHub, byAge } from "@/content/programmes";
import WavyAccordion from "@/components/WavyAccordion";
import { nav } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = { title: seo["/classes"].title, description: seo["/classes"].description, alternates: { canonical: "/classes" } };

export default function ClassesPage() {
  const byType = nav.find((n) => n.label === "PROGRAMMES")!.children!.filter((c) => c.group === "BY TYPE");
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-10 curtain">
        <div className="container-x relative">
          <Reveal><SectionHeading as="h1" eyebrow="PROGRAMMES" title={classesHub.h1} sub={<>{classesHub.intro[0]}<br />{classesHub.intro[1]}</>} /></Reveal>
          <div className="mt-14 mb-5 flex items-end justify-between gap-4 flex-wrap">
            <h2 className="display text-3xl">BY AGE</h2>
            <p className="text-[11px] tracking-[0.2em] text-white/50 hidden md:block">HOVER TO EXPLORE · CLICK TO OPEN</p>
          </div>
          <WavyAccordion items={byAge} />
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/holiday-camps" className="glass rounded-lg px-5 py-3 text-xs tracking-[0.15em] font-semibold hover:border-cyan/60 hover:text-cyan transition-colors">HOLIDAY CAMPS →</Link>
            <Link href="/dsaacademy" className="glass rounded-lg px-5 py-3 text-xs tracking-[0.15em] font-semibold hover:border-cyan/60 hover:text-cyan transition-colors">DSA PREPARATION →</Link>
          </div>
          <h2 className="display text-3xl mt-12 mb-4">BY TYPE</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {byType.map((c) => <Link key={c.href} href={c.href} className="glass rounded-lg px-5 py-4 text-sm tracking-[0.15em] font-semibold hover:border-cyan/60 hover:text-cyan transition-colors">{c.label} →</Link>)}
          </div>
        </div>
      </section>
      <section className="py-20 bg-ink-2 border-y border-line">
        <div className="container-x">
          <Reveal><SectionHeading title={classesHub.philosophyTitle} /></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">{classesHub.philosophy.map((p, i) => <Reveal key={p} delay={i * 0.05} className="glass rounded-xl p-6 text-lg leading-relaxed">{p}</Reveal>)}</div>
        </div>
      </section>
      <Testimonials />
      <FinalCta />
    </Shell>
  );
}
