import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { about, leader } from "@/content/team";
import { Reveal, SectionHeading, Button } from "@/components/ui";
import TeamCarousel from "@/components/TeamCarousel";
import StoryReveal from "@/components/StoryReveal";
import AboutHero from "@/components/AboutHero";
import LogoMarquee from "@/components/LogoMarquee";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Eye, Mic, Users } from "lucide-react";

export const metadata: Metadata = { title: seo["/about"].title, description: seo["/about"].description, alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <Shell>
      <AboutHero />
      {/* Leadership — "Building confidence. Creating opportunity." */}
      <section className="relative pt-20 lg:pt-28 pb-10 overflow-hidden">
        <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Reveal>
            <div className="eyebrow">THE PEOPLE BEHIND THE STAGE</div>
            <h2 className="display mt-3">Building confidence.<br />Creating opportunity.</h2>
            <p className="mt-4 text-mute max-w-md">Meet the people working together to educate, develop and inspire every MADDspace student.</p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto">
            <div className="relative w-[280px] sm:w-[360px] aspect-square rounded-lg overflow-hidden">
              <Image src={leader.image} alt={leader.name} fill sizes="360px" className="object-cover" priority />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-xs tracking-[0.25em] text-cyan">01 / LEADERSHIP</div>
            <h2 className="display mt-2 text-6xl lg:text-7xl">{leader.name}</h2>
            <div className="display text-cyan text-2xl mt-1">{leader.role[0]}<br />{leader.role[1]}</div>
            <p className="mt-5 text-lg text-white/85 leading-relaxed max-w-md">{leader.quote}</p>
            <ul className="mt-5 flex flex-wrap gap-5 text-[11px] tracking-[0.18em] uppercase text-white/75">
              <li className="flex items-center gap-2"><Eye size={16} className="text-cyan" />{leader.pills[0]}</li>
              <li className="flex items-center gap-2"><Mic size={16} className="text-cyan" />{leader.pills[1]}</li>
              <li className="flex items-center gap-2"><Users size={16} className="text-cyan" />{leader.pills[2]}</li>
            </ul>
            <div className="mt-6"><Button href="/instructors?d=vocal" variant="outline">MEET THE INSTRUCTORS</Button></div>
          </Reveal>
        </div>
        <div className="container-x relative mt-14" id="anchor1"><h2 className="display text-4xl mb-2">MADDspace Team</h2><TeamCarousel /></div>
      </section>

      <StoryReveal />
      <section className="py-20 lg:py-24 border-t border-line bg-ink-2">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal><SectionHeading eyebrow="ABOUT MADDSPACE" title={about.philosophyTitle} /><p className="mt-6 text-mute leading-relaxed">{about.philosophy}</p></Reveal>
          <Reveal delay={0.1}><Carousel images={["/images/about/about-hero.jpg", "/images/about/about-1.jpg", "/images/about/about-2.jpg", "/images/about/about-3.jpg", "/images/about/about-4.jpg"]} alt="Inside MADDspace" aspect="aspect-[4/3]" slide="basis-[85%] sm:basis-[70%]" /></Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-x">
          <Reveal><SectionHeading title={about.valuesTitle} align="center" /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.09} className="glass rounded-xl p-6">
                <div className="display text-cyan text-6xl leading-none">{v.letter}</div>
                <h3 className="display text-3xl mt-2">{v.name}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-ink-2 border-y border-line">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal><h2 className="display text-5xl">{about.missionTitle}</h2><div className="mt-5 space-y-4 text-mute leading-relaxed">{about.mission.map((p) => <p key={p}>{p}</p>)}</div></Reveal>
          <Reveal delay={0.1}><h2 className="display text-5xl">{about.visionTitle}</h2><p className="mt-5 text-mute leading-relaxed">{about.vision}</p>
            <div className="mt-8 flex gap-3 flex-wrap"><Button href="/instructors?d=vocal" variant="outline">VOCAL INSTRUCTORS</Button><Button href="/instructors?d=dance" variant="outline">DANCE INSTRUCTORS</Button></div></Reveal>
        </div>
      </section>
      <LogoMarquee title="FEATURED ON" />
      <FinalCta />
    </Shell>
  );
}
