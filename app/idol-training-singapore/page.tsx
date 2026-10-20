import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { idol } from "@/content/typepages";
import { stories, everyChild } from "@/content/achievements";
import PillarsRamp from "@/components/PillarsRamp";
import PageHero from "@/components/PageHero";
import LogoMarquee from "@/components/LogoMarquee";
import VideoEmbed from "@/components/VideoEmbed";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/idol-training-singapore"].title, description: seo["/idol-training-singapore"].description, alternates: { canonical: "/idol-training-singapore" } };

export default function Page() {
  const feats = [stories[1], stories[0]];
  return (
    <Shell>
      <PageHero logo="/images/brand/madd-entertainment.png" eyebrow="MADD ENTERTAINMENT · LAUNCH" title={idol.h1} sub={<>{idol.h2[0]}<br />{idol.h2[1]}</>} image="/images/classes/age-10-18/age-10-18-02.jpg" tall>
        <Button href={BOOK_TRIAL_URL}>BOOK A TRIAL CLASS</Button>
        <Button href="#who" variant="outline">WHO IS THIS FOR?</Button>
      </PageHero>
      <section id="who" className="py-16 lg:py-24 scroll-mt-20">
        <div className="container-x">
          <Reveal><SectionHeading title={idol.whoTitle} /><div className="mt-5 max-w-3xl space-y-3 text-mute leading-relaxed">{idol.who.map((p, i) => <p key={p} className={i === 0 ? "text-white text-lg font-semibold" : ""}>{p}</p>)}</div></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{idol.pillars.map((p, i) => <Reveal key={p.title} delay={i * 0.09} className="glass rounded-xl p-6"><div className="display text-accent text-4xl">0{i + 1}</div><h3 className="display text-3xl mt-2">{p.title}</h3><p className="mt-2 text-sm text-mute">{p.copy}</p></Reveal>)}</div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-ink-2 border-y border-line overflow-hidden">
        <div className="container-x">
          <Reveal><SectionHeading title={idol.groupTitle} sub={idol.groupSub} align="center" /></Reveal>
          <div className="mt-10"><PillarsRamp /></div>
        </div>
      </section>
      {[feats[0], null, feats[1]].map((s, i) => s ? (
        <section key={s.slug} className={`py-16 lg:py-24 ${i === 2 ? "bg-ink-2 border-y border-line" : ""}`}>
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>{s.link?.href.includes("youtu") ? <VideoEmbed url={s.link.href} poster={s.image} title={s.title} /> : <div className="relative aspect-video rounded-xl overflow-hidden glow-border"><Image src={s.image} alt={s.title} fill sizes="50vw" className="object-cover" /></div>}</Reveal>
            <Reveal delay={0.1}><div className="eyebrow">{s.place}</div><h2 className="display mt-2 text-4xl sm:text-5xl">{s.title}</h2><p className="mt-4 text-mute">{s.copy}</p>{s.bullets && <ul className="mt-4 space-y-2 text-sm">{s.bullets.map((b) => <li key={b}>• {b}</li>)}</ul>}{s.link && <div className="mt-5"><Button href={s.link.href} variant="ghost">{s.link.label}</Button></div>}</Reveal>
          </div>
        </section>
      ) : (
        <section key="idollab" id="idollab" className="py-16 lg:py-24 bg-ink-2 border-y border-line scroll-mt-20">
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:[&>*:first-child]:order-2">
            <Reveal><VideoEmbed url={idol.idollab.video} poster={idol.idollab.image} title={idol.idollab.title} /></Reveal>
            <Reveal delay={0.1}><div className="flex items-center justify-between gap-4"><div className="eyebrow">{idol.idollab.place} · CREATE</div><Image src="/images/brand/idollab.png" alt="IDOLLAB by MADDspace" width={160} height={168} className="h-14 w-auto" /></div><h2 className="display mt-2 text-4xl sm:text-5xl">{idol.idollab.title}</h2><p className="mt-4 text-mute">{idol.idollab.copy}</p><div className="mt-5"><Button href={idol.idollab.video} variant="ghost">Watch Video</Button></div></Reveal>
          </div>
        </section>
      ))}
      <section className="py-16 text-center"><div className="container-x max-w-3xl"><Reveal><h2 className="display text-5xl">Give your Child the stage they deserve</h2><p className="mt-3 text-mute">These are not one-off experiences — they are part of a structured pathway we build for every student.</p></Reveal></div></section>
      <LogoMarquee />
      <section className="py-16 text-center bg-ink-2 border-t border-line"><div className="container-x max-w-3xl"><Reveal><h2 className="display text-5xl sm:text-6xl">{everyChild.headline}</h2>{everyChild.copy.map((p) => <p key={p} className="mt-4 text-mute">{p}</p>)}<div className="mt-8"><Button href={BOOK_TRIAL_URL}>BOOK A TRIAL CLASS</Button></div></Reveal></div></section>
      <Locations formTitle="Enquire about the Artiste Programme" preset="Idol / Artiste Training" />
      <FinalCta image="/images/classes/age-10-18/age-10-18-09.jpg" />
    </Shell>
  );
}
