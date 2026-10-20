import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { kidsDance } from "@/content/typepages";
import PageHero from "@/components/PageHero";
import { Checks } from "@/components/Blocks";
import LogoMarquee from "@/components/LogoMarquee";
import Carousel from "@/components/Carousel";
import Testimonials from "@/components/home/Testimonials";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/dance-classes-for-kids"].title, description: seo["/dance-classes-for-kids"].description, alternates: { canonical: "/dance-classes-for-kids" } };
const g = ["/images/classes/age-6-9/age-6-9-04.jpg", "/images/classes/age-6-9/age-6-9-05.jpg", "/images/classes/holiday-camps/holiday-camps-06.jpg", "/images/classes/age-10-18/age-10-18-07.jpg", "/images/classes/holiday-camps/holiday-camps-07.jpg", "/images/classes/age-3-5/age-3-5-09.jpg", "/images/classes/age-10-18/age-10-18-05.jpg", "/images/classes/holiday-camps/holiday-camps-01.jpg"];

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow={kidsDance.sub} title={kidsDance.h1} sub={<>{kidsDance.h2}</>} image={g[3]} tall h1Class="!text-4xl sm:!text-5xl lg:!text-6xl"><Button href={BOOK_TRIAL_URL}>{kidsDance.cta}</Button><Button href="#top" variant="outline">OUR TOP CLASSES</Button></PageHero>
      <section className="py-14 border-b border-line bg-ink-2"><div className="container-x grid gap-8 lg:grid-cols-2"><Reveal><div className="space-y-3 text-mute">{kidsDance.intro.map((p) => <p key={p}>{p}</p>)}</div></Reveal><Reveal delay={0.1}><ul className="space-y-2 text-sm sm:text-base">{kidsDance.highlights.map((h) => <li key={h} className="glass rounded-lg px-4 py-3">{h}</li>)}</ul></Reveal></div></section>
      <section className="py-16 lg:py-24"><div className="container-x"><Reveal><SectionHeading title={kidsDance.reasonsTitle} /></Reveal><div className="mt-10 grid gap-4 md:grid-cols-3">{kidsDance.reasons.map((r, i) => <Reveal key={r.title} delay={i * 0.09} className="glass rounded-xl p-6"><div className="display text-accent text-4xl">0{i + 1}</div><h3 className="display text-3xl mt-1">{r.title}</h3>{r.copy.map((p) => <p key={p} className="mt-3 text-sm text-mute">{p}</p>)}<div className="mt-5"><Button href={BOOK_TRIAL_URL} variant="ghost" className="text-[11px]">SIGN UP FOR A TRIAL NOW</Button></div></Reveal>)}</div></div></section>
      <section className="py-16 bg-ink-2 border-y border-line"><div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center"><Reveal><h2 className="display text-4xl">{kidsDance.studiosTitle}</h2><p className="mt-4 text-mute">{kidsDance.studiosCopy}</p><Checks items={kidsDance.studiosChecks} className="mt-4" /><p className="mt-4 font-semibold">🎶 Your child will be excited to dance every week!</p><div className="mt-5"><Button href={BOOK_TRIAL_URL}>EXPERIENCE MADD. GRAB OUR TRIAL PASS AT $28</Button></div></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace kids dance students" /></Reveal></div></section>
      <section id="top" className="py-16 lg:py-24 scroll-mt-20"><div className="container-x"><Reveal><SectionHeading title={kidsDance.topTitle} /></Reveal><div className="mt-10 space-y-6">{kidsDance.top.map((t, i) => <Reveal key={t.title} delay={i * 0.09} className="glass rounded-xl p-6 sm:p-8 grid gap-6 lg:grid-cols-[1fr_320px]"><div><h3 className="display text-3xl sm:text-4xl">{t.title}</h3><p className="mt-3 text-mute">{t.intro}</p><p className="mt-4 font-semibold">{t.lead}</p><Checks items={t.checks} className="mt-2" /><p className="mt-4 text-sm text-white/85">{t.close}</p><div className="mt-5 flex gap-3 flex-wrap"><Button href={BOOK_TRIAL_URL} className="!py-2.5 text-[11px]">SIGN UP FOR A TRIAL NOW</Button><Button href={t.href} variant="outline" className="!py-2.5 text-[11px]">LEARN MORE</Button></div></div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={g[(i * 2 + 1) % g.length]} alt="" className="hidden lg:block rounded-lg object-cover h-full w-full border border-line" /></Reveal>)}</div></div></section>
      <LogoMarquee title="WE HAVE BEEN FEATURED ON" sub="" />
      <section className="py-16 lg:py-24 bg-ink-2 border-y border-line"><div className="container-x"><Reveal><SectionHeading title={kidsDance.levelsTitle} sub={<><strong className="text-white">{kidsDance.levelsSub}</strong><br />{kidsDance.levelsIntro}</>} /></Reveal><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{kidsDance.levels.map((l, i) => <Reveal key={l.name} delay={i * 0.09} className="glass rounded-xl p-5"><div className="text-accent">⭐ <span className="display text-2xl align-middle">{l.name}</span></div><p className="mt-2 text-sm text-mute">{l.copy}</p></Reveal>)}</div></div></section>
      <Testimonials heading="Don't hear from us, hear from our students and parents..." />
      <section className="py-16"><div className="container-x"><Reveal className="glass glow-border rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto text-center"><div className="eyebrow">{kidsDance.guaranteeLead}</div><h2 className="display text-5xl mt-2">{kidsDance.guaranteeTitle}</h2>{kidsDance.guarantee.map((p) => <p key={p} className="mt-3 text-mute">{p}</p>)}<div className="mt-6"><Button href="#enquire">SIGN UP FOR A $28 TRIAL PASS NOW</Button></div></Reveal></div></section>
      <Locations formTitle="SIGN UP FOR A $28 TRIAL PASS NOW" formCopy="Fill up the form below and our team will get back to you shortly!" />
      <FinalCta image={g[2]} />
    </Shell>
  );
}
