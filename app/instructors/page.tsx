import type { Metadata } from "next";
import { Suspense } from "react";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal, Words } from "@/components/ui";
import InstructorCarousel from "@/components/InstructorCarousel";
import FinalCta from "@/components/home/FinalCta";
import { instructors } from "@/content/instructors";
import Image from "next/image";

export const metadata: Metadata = { title: seo["/instructors"].title, description: seo["/instructors"].description, alternates: { canonical: "/instructors" } };

export default function InstructorsPage() {
  const vocal = instructors.filter((i) => i.discipline === "vocal");
  const dance = instructors.filter((i) => i.discipline === "dance");
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-16 curtain overflow-hidden">
        <div className="absolute inset-0 spotlight" />
        <div className="container-x relative">
          <Reveal>
            <div className="eyebrow">MEET THE MENTORS</div>
            <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl"><Words>TRAIN WITH PEOPLE<br />WHO KNOW THE STAGE.</Words></h1>
            <p className="mt-4 text-mute">Experienced instructors. Individual guidance. Real performance insight.</p>
          </Reveal>
          <div className="mt-6"><Suspense fallback={null}><InstructorCarousel /></Suspense></div>
        </div>
      </section>
      <section id="vocal-grid" className="py-16 border-t border-line scroll-mt-24">
        <div className="container-x"><h2 className="display text-4xl sm:text-5xl"><Words>Vocal Instructors</Words></h2><Grid list={vocal} /></div>
      </section>
      <section id="dance-grid" className="py-16 border-t border-line bg-ink-2 scroll-mt-24">
        <div className="container-x"><h2 className="display text-4xl sm:text-5xl"><Words>Dance Instructors</Words></h2><Grid list={dance} /></div>
      </section>
      <FinalCta />
    </Shell>
  );
}

function Grid({ list }: { list: typeof instructors }) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {list.map((p) => (
        <figure key={p.slug} className="group rounded-lg overflow-hidden border border-line bg-ink-3 hover:border-cyan/60 transition-colors">
          <div className="relative aspect-square"><Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" /></div>
          <figcaption className="p-3"><div className="font-semibold text-sm uppercase tracking-wide">{p.name}</div><div className="text-[11px] tracking-[0.12em] uppercase text-cyan mt-0.5">{p.role}</div></figcaption>
        </figure>
      ))}
    </div>
  );
}
