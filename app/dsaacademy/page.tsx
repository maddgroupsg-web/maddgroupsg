import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { dsa } from "@/content/typepages";
import { everyChild } from "@/content/achievements";
import ScaleInHero from "@/components/ScaleInHero";
import LogoMarquee from "@/components/LogoMarquee";
import Carousel from "@/components/Carousel";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { DSA_ACADEMY_URL } from "@/content/site";
import { galleryFor } from "@/content/programmes";
import { GraduationCap, Trophy, Award, BarChart3 } from "lucide-react";

export const metadata: Metadata = { title: seo["/dsaacademy"].title, description: seo["/dsaacademy"].description, alternates: { canonical: "/dsaacademy" } };
const g = galleryFor({ gallery: "dsa", galleryCount: 6 });
const icons = [GraduationCap, Trophy, Award, BarChart3];

export default function Page() {
  return (
    <Shell>
      <ScaleInHero logo="/images/brand/dsa-academy.png" eyebrow="THE DSA ACADEMY · ACHIEVE" title={dsa.h1} sub={dsa.h2} image={g[2]} alt="MADDspace DSA preparation student performing">
        <Button href={DSA_ACADEMY_URL}>VISIT THE ACADEMY</Button>
        <Button href="#enquire" variant="outline">BOOK A FREE DSA CONSULTATION</Button>
      </ScaleInHero>
      <section className="py-16 lg:py-24 bg-ink-2 border-y border-line">
        <div className="container-x">
          <Reveal><SectionHeading title={dsa.whyTitle} sub={dsa.whySub} /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{dsa.why.map((w, i) => { const I = icons[i]; return <Reveal key={w.title} delay={i * 0.09} className="glass rounded-xl p-6"><I className="text-accent" /><h3 className="display text-3xl mt-3">{w.title}</h3><p className="mt-2 text-sm text-mute">{w.copy}</p></Reveal>; })}</div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="THE DSA PATHWAY" title={dsa.stagesTitle} sub={dsa.stagesSub} /></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dsa.stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09} className="relative rounded-xl overflow-hidden border border-line min-h-[340px] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g[(i + 1) % g.length]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end"><div className="eyebrow">{s.n}</div><h3 className="display text-3xl mt-1">{s.title}</h3><p className="mt-2 text-sm text-white/80">{s.copy}</p></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12"><Reveal><Carousel images={g} alt="MADDspace DSA preparation students" /></Reveal></div>
        </div>
      </section>
      <LogoMarquee />
      <section className="py-16 text-center"><div className="container-x max-w-3xl"><Reveal><h2 className="display text-5xl sm:text-6xl">{everyChild.headline}</h2>{everyChild.copy.map((p) => <p key={p} className="mt-4 text-mute">{p}</p>)}</Reveal></div></section>
      <Locations formTitle="Book a Free DSA Consultation" formCopy="Tell us about your child and the schools they are considering. Our team will reach out to you shortly." preset="DSA Preparation" />
      <FinalCta image={g[0]} primary={{ label: "BOOK A FREE DSA CONSULTATION", href: "#enquire" }} />
    </Shell>
  );
}
