import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { dsa } from "@/content/typepages";
import { everyChild } from "@/content/achievements";
import ScaleInHero from "@/components/ScaleInHero";
import { heroLoops, byId } from "@/content/videos";
import LogoMarquee from "@/components/LogoMarquee";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading, Words } from "@/components/ui";
import { DSA_ACADEMY_URL } from "@/content/site";
import { galleryFor } from "@/content/programmes";
import { GraduationCap, Trophy, Award, BarChart3 } from "lucide-react";
import StairStages from "@/components/StairStages";

export const metadata: Metadata = { title: seo["/dsaacademy"].title, description: seo["/dsaacademy"].description, alternates: { canonical: "/dsaacademy" } };
const g = galleryFor({ gallery: "dsa", galleryCount: 6 });
const icons = [GraduationCap, Trophy, Award, BarChart3];

export default function Page() {
  return (
    <Shell>
      <ScaleInHero logo="/images/brand/dsa-academy.png" eyebrow="THE DSA ACADEMY · ACHIEVE" title={dsa.h1} sub={dsa.h2} image={byId(heroLoops.dsa).poster} video={byId(heroLoops.dsa).loop} alt="M1XXIE performing at MADD to Shine 2026">
        <Button href={DSA_ACADEMY_URL}>VISIT THE ACADEMY</Button>
        <Button href="/contact" variant="outline">BOOK A FREE DSA CONSULTATION</Button>
      </ScaleInHero>
      <section className="py-16 lg:py-24 bg-ink-2 border-y border-line">
        <div className="container-x">
          <Reveal><SectionHeading title={dsa.whyTitle} sub={dsa.whySub} /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{dsa.why.map((w, i) => { const I = icons[i]; return <Reveal key={w.title} delay={i * 0.09} className="glass rounded-xl p-6"><I className="text-accent" /><h3 className="display text-3xl mt-3">{w.title}</h3><p className="mt-2 text-sm text-mute">{w.copy}</p></Reveal>; })}</div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal><SectionHeading align="center" eyebrow="THE DSA PATHWAY" title={dsa.stagesTitle} sub={dsa.stagesSub} /></Reveal>
          <StairStages stages={dsa.stages} images={g} />
          <div className="mt-12"><Reveal><Carousel images={g} alt="MADDspace DSA preparation students" /></Reveal></div>
        </div>
      </section>
      <LogoMarquee />
      <section className="py-16 text-center"><div className="container-x max-w-3xl"><Reveal><h2 className="display text-5xl sm:text-6xl"><Words>{everyChild.headline}</Words></h2>{everyChild.copy.map((p) => <p key={p} className="mt-4 text-mute">{p}</p>)}</Reveal></div></section>
      <FinalCta image={g[0]} primary={{ label: "BOOK A FREE DSA CONSULTATION", href: "/contact" }} />
    </Shell>
  );
}
