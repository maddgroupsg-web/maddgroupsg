import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { holidayCamps as hc } from "@/content/misc";
import { testimonials } from "@/content/home";
import PageHero from "@/components/PageHero";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { HOLIDAY_1DAY_URL, HOLIDAY_3DAY_URL } from "@/content/site";
import { galleryFor } from "@/content/programmes";
import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react";

export const metadata: Metadata = { title: seo["/holiday-camps"].title, description: seo["/holiday-camps"].description, alternates: { canonical: "/holiday-camps" } };
const g = galleryFor({ gallery: "holiday-camps", galleryCount: 8 });

export default function Page() {
  const t = testimonials[2];
  return (
    <Shell>
      <PageHero eyebrow={`${hc.season} · ${hc.status}`} title="HOLIDAY CAMPS" sub={<>{hc.intro[0]} {hc.intro[1]}</>} image={g[1]} tall><Button href={HOLIDAY_1DAY_URL}>SIGN UP · 1-DAY CAMPS</Button><Button href={HOLIDAY_3DAY_URL} variant="outline">SIGN UP · 3-DAY CAMPS</Button></PageHero>
      <section className="py-14 bg-ink-2 border-b border-line"><div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><Reveal><div className="space-y-2 text-mute">{hc.intro.slice(2).map((p) => <p key={p}>{p}</p>)}</div></Reveal><Reveal delay={0.1} className="glass rounded-xl p-6"><div className="display text-2xl text-accent">{hc.promoTitle}</div><div className="mt-3 grid grid-cols-2 gap-6 text-sm">{hc.promo.map((p) => <div key={p.title}><div className="font-semibold">{p.title}</div><ul className="mt-1 text-white/80">{p.rows.map((r) => <li key={r}>{r}</li>)}</ul></div>)}</div></Reveal></div></section>
      <section className="py-16 lg:py-24"><div className="container-x"><Reveal><SectionHeading title="CHOOSE YOUR CAMP" sub="Choose from a range of Singing, Dancing and Signature Sing & Dance options!" /></Reveal>
        <div className="mt-10 space-y-6">{hc.camps.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.04} className={`glass rounded-xl overflow-hidden grid lg:grid-cols-[360px_1fr] ${!c.url ? "opacity-70" : ""}`}>
            <div className="relative aspect-[4/3] lg:aspect-auto"><Image src={c.image} alt={c.title} fill sizes="(max-width: 1024px) 100vw, 360px" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2"><span className="rounded bg-accent/15 border border-accent/50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent">{c.type.toUpperCase()}</span>{!c.url && <span className="rounded border border-line px-2 py-0.5 text-[10px] tracking-widest text-white/60">UNAVAILABLE</span>}</div>
              <h3 className="display text-4xl mt-2">{c.title}</h3>
              {c.url && <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-white/85"><li className="flex gap-2"><Calendar size={15} className="text-accent shrink-0 mt-0.5" />Dates: {c.dates}</li><li className="flex gap-2"><Users size={15} className="text-accent shrink-0 mt-0.5" />Age Group: {c.ages}</li><li className="flex gap-2"><Clock size={15} className="text-accent shrink-0 mt-0.5" />Time: {c.time}</li><li className="flex gap-2"><MapPin size={15} className="text-accent shrink-0 mt-0.5" />Venue: {c.venue}</li><li className="flex gap-2"><Tag size={15} className="text-accent shrink-0 mt-0.5" />Fees: {c.fee}</li></ul>}
              <p className="mt-4 text-sm text-mute leading-relaxed">{c.copy}</p>
              <ul className="mt-3 flex flex-wrap gap-2">{c.includes.map((x) => <li key={x} className="rounded-full border border-line px-3 py-1 text-[11px] text-white/80">{x}</li>)}</ul>
              {c.url && <div className="mt-5"><Button href={c.url === "1day" ? HOLIDAY_1DAY_URL : HOLIDAY_3DAY_URL} className="!py-2.5 text-[11px]">Sign Up Here!</Button></div>}
            </div>
          </Reveal>
        ))}</div>
      </div></section>
      <section className="py-16 bg-ink-2 border-y border-line"><div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center"><Reveal><SectionHeading title={hc.parentsTitle} /><blockquote className="mt-6 glass rounded-xl p-6 text-lg italic">“{t.quote}”<footer className="mt-3 text-xs tracking-[0.2em] uppercase text-accent not-italic">— {t.name}, {t.role}</footer></blockquote></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace holiday camp participants" /></Reveal></div></section>
      <FinalCta image={g[4]} primary={{ label: "SIGN UP · 1-DAY CAMPS", href: HOLIDAY_1DAY_URL }} secondary={{ label: "SIGN UP · 3-DAY CAMPS", href: HOLIDAY_3DAY_URL }} />
    </Shell>
  );
}
