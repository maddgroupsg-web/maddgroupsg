import type { Metadata } from "next";
import Image from "next/image";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { achievementsPage, stories, studentJourneys } from "@/content/achievements";
import { BOOK_TRIAL_URL } from "@/content/site";
import { Reveal, SectionHeading, Button } from "@/components/ui";
import LogoMarquee from "@/components/LogoMarquee";
import AwardsRotator from "@/components/AwardsRotator";
import VideoEmbed from "@/components/VideoEmbed";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = { title: seo["/achievements"].title, description: seo["/achievements"].description, alternates: { canonical: "/achievements" } };
// one photo per result, in the same order as achievementsPage.pillars
const pillarPhotos = ["/images/achievements/iu-concert.jpg", "/images/achievements/genting-gold.jpg", "/images/achievements/k15.jpg", "/images/achievements/disneyland.jpg"];

// Student journey stories (Jordin Tan, Emma Wan) are hidden for now. Set to true to show them again.
const SHOW_JOURNEYS = false;

export default function AchievementsPage() {
  return (
    <Shell>
      <section className="relative min-h-[80svh] flex items-end overflow-hidden">
        <Image src="/images/achievements/iu-concert.jpg" alt="MADDspace students performing with IU at the Singapore Indoor Stadium" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="container-x relative pb-16 pt-40">
          <Reveal>
            <h1 className="display text-5xl sm:text-7xl lg:text-8xl">{achievementsPage.h1}<span className="block text-cyan text-[0.6em]">{achievementsPage.h1b}</span></h1>
            <h2 className="mt-4 max-w-2xl text-lg text-white/85">{achievementsPage.sub}</h2>
            <div className="mt-7 flex flex-wrap gap-3"><Button href={BOOK_TRIAL_URL}>BOOK A TRIAL CLASS</Button><Button href="/classes" variant="outline">EXPLORE OUR PROGRAMMES</Button></div>
          </Reveal>
        </div>
      </section>

      <LogoMarquee />
      {stories.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`py-16 lg:py-24 scroll-mt-24 ${i % 2 ? "bg-ink-2" : ""}`}>
          <div className={`container-x grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal>
              {s.link?.href.includes("youtu") ? <VideoEmbed url={s.link.href} poster={s.image} title={s.title} /> : <div className="relative aspect-video rounded-xl overflow-hidden"><Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>}
            </Reveal>
            <Reveal delay={0.1}>
              <div className="eyebrow">{s.place}</div>
              <h2 className="display mt-2 text-4xl sm:text-5xl">{s.title}</h2>
              <p className="mt-4 text-mute leading-relaxed">{s.copy}</p>
              {s.bullets && <ul className="mt-4 space-y-2 text-sm text-white/85">{s.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-cyan">•</span>{b}</li>)}</ul>}
              {s.link && <div className="mt-6"><Button href={s.link.href} variant="ghost">{s.link.label}</Button></div>}
            </Reveal>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24 bg-ink-2">
        <div className="container-x">
          {SHOW_JOURNEYS && <>
          <Reveal><SectionHeading eyebrow="STUDENT ACHIEVEMENTS & RESULTS" title="Give your Child the stage they deserve" sub="These are not one-off experiences — they are part of a structured pathway we build for every student." /></Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {studentJourneys.map((j) => (
              <Reveal key={j.name} className="glass rounded-xl p-6 sm:p-8">
                <div className="eyebrow">{j.discipline}</div>
                <h3 className="display text-4xl mt-1">{j.name}</h3>
                <p className="mt-3 text-sm text-mute">{j.intro}</p>
                <ol className="mt-4 space-y-2 border-l border-cyan/40 pl-4 text-sm text-white/85">{j.steps.map((s) => <li key={s} className="relative"><span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan" />{s}</li>)}</ol>
                <p className="mt-4 text-sm text-mute">{j.outro}</p>
                {j.video && <div className="mt-4"><Button href={j.video} variant="ghost">WATCH VIDEO</Button></div>}
              </Reveal>
            ))}
          </div>
          </>}
          <Reveal className={SHOW_JOURNEYS ? "mt-14" : ""}>
            <div className="text-center eyebrow">AWARDS & ACCREDITATIONS</div>
            <div className="mt-8"><AwardsRotator /></div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-x">
          <Reveal><SectionHeading title={achievementsPage.pillarsHeadline} sub={achievementsPage.pillarsSub} align="center" /></Reveal>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
          {achievementsPage.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group relative aspect-[3/4] overflow-hidden">
                <Image src={pillarPhotos[i]} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl lg:text-2xl font-semibold leading-tight tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/75">{p.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </Shell>
  );
}
