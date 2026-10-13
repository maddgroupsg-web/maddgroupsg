import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { classesHub } from "@/content/programmes";
import { ourClasses } from "@/content/home";
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
          <h2 className="display text-3xl mt-14 mb-4">BY AGE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {ourClasses.tiles.map((t) => (
              <Link key={t.title} href={t.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-line">
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 1024px) 50vw, 16vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3"><div className="text-[10px] tracking-[0.2em] text-cyan">CLASSES FOR</div><div className="display text-2xl leading-none mt-1">{t.title}</div><div className="text-[11px] text-white/70 mt-1">{t.sub}</div></div>
              </Link>
            ))}
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
