import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { openClasses as oc } from "@/content/misc";
import PageHero from "@/components/PageHero";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { PRIVATE_BOOKING_URL, contact } from "@/content/site";
import { galleryFor } from "@/content/programmes";

export const metadata: Metadata = { title: seo["/open-classes"].title, description: seo["/open-classes"].description, alternates: { canonical: "/open-classes" } };
const g = galleryFor({ gallery: "age-18-35", galleryCount: 7 });

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow="YOUTH & ADULTS · FROM $18 PER CLASS" title={oc.h1} sub={oc.intro[0]} image={g[3]} tall><Button href={PRIVATE_BOOKING_URL}>BOOK AN OPEN CLASS</Button><Button href={contact.telegramOpenClasses} variant="outline">TELEGRAM UPDATES</Button></PageHero>
      <section className="py-14 bg-ink-2"><div className="container-x grid gap-6 lg:grid-cols-2"><Reveal><p className="text-mute">{oc.intro[1]}</p><p className="mt-4 display text-2xl text-accent">{oc.price}</p><p className="mt-3 text-xs text-white/60">{oc.note}</p></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace open class dancers" aspect="aspect-[4/3]" slide="basis-[85%] sm:basis-[60%]" /></Reveal></div></section>
      <section className="py-16 lg:py-24"><div className="container-x"><Reveal><SectionHeading title="LEVELS" sub="Different levels for different levels of dancers." /></Reveal><div className="mt-10 grid gap-4 md:grid-cols-3">{oc.levels.map((l, i) => <Reveal key={l.name} delay={i * 0.09} className="glass rounded-xl p-6"><div className="display text-accent text-4xl">0{i + 1}</div><h3 className="display text-3xl mt-1">{l.name}</h3><p className="mt-2 text-sm text-mute">{l.copy}</p></Reveal>)}</div></div></section>
      <section className="py-16 bg-ink-2"><div className="container-x"><Reveal><SectionHeading title="OPEN CLASSES" sub="A taste of what runs on the open class timetable." /></Reveal><div className="mt-8 grid gap-4 md:grid-cols-3">{oc.videos.map((v) => <Reveal key={v.title} className="glass rounded-xl p-6"><h3 className="font-semibold">{v.title}</h3><p className="mt-2 text-sm text-mute">{v.copy}</p></Reveal>)}</div><p className="mt-6 text-xs text-white/50">Nothing to book right now? Check back soon, or follow the Telegram channel for updates.</p></div></section>
      <FinalCta image={g[1]} primary={{ label: "BOOK AN OPEN CLASS", href: PRIVATE_BOOKING_URL }} />
    </Shell>
  );
}
