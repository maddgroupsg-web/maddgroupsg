import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { toddlers } from "@/content/typepages";
import { instructors } from "@/content/instructors";
import PageHero from "@/components/PageHero";
import LogoMarquee from "@/components/LogoMarquee";
import Carousel from "@/components/Carousel";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";
import { galleryFor } from "@/content/programmes";
import { Speech, Activity, Smile } from "lucide-react";

export const metadata: Metadata = { title: seo["/dance-class-for-toddlers"].title, description: seo["/dance-class-for-toddlers"].description, alternates: { canonical: "/dance-class-for-toddlers" } };
const g = galleryFor({ gallery: "age-3-5", galleryCount: 10 });
const icons = [Speech, Activity, Smile];

export default function Page() {
  const dance = instructors.filter((i) => i.discipline === "dance").slice(0, 5);
  return (
    <Shell>
      <PageHero eyebrow="PRESCHOOL & TODDLER DANCE CLASSES" title={toddlers.h1} sub={toddlers.h2} image={g[4]} tall><Button href="/contact">SIGN UP NOW</Button><Button href={BOOK_TRIAL_URL} variant="outline">BOOK A $28 TRIAL</Button></PageHero>
      <section className="py-16 lg:py-24"><div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center"><Reveal><div className="space-y-4 text-mute leading-relaxed">{toddlers.intro.map((p) => <p key={p}>{p}</p>)}</div></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace toddler and preschool dance students" /></Reveal></div></section>
      <section className="py-16 bg-ink-2"><div className="container-x"><Reveal><SectionHeading title={toddlers.reasonsTitle} align="center" /></Reveal><div className="mt-10 grid gap-4 md:grid-cols-3">{toddlers.reasons.map((r, i) => { const I = icons[i]; return <Reveal key={r} delay={i * 0.09} className="glass rounded-xl p-6 text-center"><I className="mx-auto text-accent" size={32} /><h3 className="mt-4 text-lg font-semibold">{r}</h3></Reveal>; })}</div></div></section>
      <LogoMarquee title="OUR PRESCHOOL & TODDLER DANCE CLASSES ARE FEATURED ON" sub="" />
      <section className="py-16 lg:py-24 bg-ink-2"><div className="container-x"><Reveal><SectionHeading title={toddlers.instructorsTitle} sub={toddlers.instructorsCopy} /></Reveal><div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">{dance.map((p) => <figure key={p.slug} className="rounded-lg overflow-hidden border border-line bg-ink-3"><div className="relative aspect-square"><Image src={p.image} alt={p.name} fill sizes="20vw" className="object-cover object-top" /></div><figcaption className="p-3"><div className="font-semibold text-sm uppercase">{p.name}</div><div className="text-[11px] text-accent uppercase tracking-wider">{p.role}</div></figcaption></figure>)}</div><div className="mt-6"><Button href="/instructors?d=dance" variant="ghost">MEET ALL INSTRUCTORS</Button></div></div></section>
      <section className="py-16 lg:py-24"><div className="container-x"><Reveal><SectionHeading title={toddlers.classesTitle} /></Reveal><div className="mt-10 grid gap-6 lg:grid-cols-2">{toddlers.classes.map((c, i) => <Reveal key={c.title} delay={i * 0.09} className="glass rounded-xl overflow-hidden"><div className="relative aspect-[16/9]"><Image src={g[i === 0 ? 5 : 7]} alt="" fill sizes="50vw" className="object-cover" /></div><div className="p-6"><span className="rounded bg-accent/15 border border-accent/50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent">{c.badge.toUpperCase()}</span><h3 className="display text-4xl mt-2">{c.title}</h3><div className="mt-3 space-y-3 text-sm text-mute leading-relaxed">{c.copy.map((p) => <p key={p}>{p}</p>)}</div><div className="mt-5"><Button href="/contact" className="!py-2.5 text-[11px]">Sign Up or Enquire now!</Button></div></div></Reveal>)}</div></div></section>
      <Testimonials heading="WHY OUR PRESCHOOL & TODDLER DANCE CLASSES HAVE over 100 positive reviews on Facebook & Google" eyebrow="WHAT PEOPLE SAY" />
      <section className="py-16 bg-ink-2"><div className="container-x"><Reveal className="glass rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto text-center"><h2 className="display text-5xl">{toddlers.guaranteeTitle}</h2><p className="mt-4 text-mute">{toddlers.guarantee}</p><div className="mt-6"><Button href={BOOK_TRIAL_URL}>REGISTER FOR OUR DANCE CLASSES TODAY!</Button></div></Reveal></div></section>
      <FinalCta image={g[6]} />
    </Shell>
  );
}
