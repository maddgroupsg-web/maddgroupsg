import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { hiphop } from "@/content/typepages";
import { studentJourneys } from "@/content/achievements";
import PageHero from "@/components/PageHero";
import { heroLoops, byId } from "@/content/videos";
import { Checks, WhyGrid, LearnGrid, PathSteps, CrewBlocks, TrialBox } from "@/components/Blocks";
import LogoMarquee from "@/components/LogoMarquee";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import Carousel from "@/components/Carousel";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/hiphop"].title, description: seo["/hiphop"].description, alternates: { canonical: "/hiphop" } };
const g = ["/images/classes/age-18-35/age-18-35-02.jpg", "/images/classes/age-18-35/age-18-35-06.jpg", "/images/classes/age-18-35/age-18-35-01.jpg", "/images/classes/age-3-5/age-3-5-08.jpg", "/images/classes/age-3-5/age-3-5-09.jpg", "/images/classes/age-18-35/age-18-35-05.jpg", "/images/classes/age-3-5/age-3-5-10.jpg", "/images/classes/age-18-35/age-18-35-04.jpg"];

export default function Page() {
  const j = studentJourneys[1];
  return (
    <Shell>
      <PageHero eyebrow="HIP HOP DANCE CLASSES AT MADDSPACE" title={hiphop.h1} sub={<>{hiphop.sub}<br /><span className="text-white/70">{hiphop.intro}</span></>} image={byId(heroLoops.hiphop).poster} video={byId(heroLoops.hiphop).loop} tall>
        <Button href={BOOK_TRIAL_URL}>BOOK A TRIAL LESSON</Button>
        <Button href="#learn" variant="outline">EXPLORE THE PROGRAMME</Button>
      </PageHero>
      <section className="py-12 border-b border-line bg-ink-2"><div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><Checks items={hiphop.checks} className="grid sm:grid-cols-2 gap-x-8" /><div className="glass rounded-xl p-5 text-center lg:text-left"><div className="display text-2xl">{hiphop.trialLine}</div><div className="text-sm text-white/80 mt-1">{hiphop.trialMeta}</div></div></div></section>
      <LogoMarquee compact title="FEATURED ON" sub="" />
      <LearnGrid title={hiphop.learnTitle} intro={hiphop.learnIntro} items={hiphop.learn} images={[g[3], g[1], g[2]]} />
      <WhyGrid title={hiphop.whyTitle} items={hiphop.why} images={[g[7], g[4], g[6]]} />
      <PathSteps title={hiphop.pathTitle} intro={hiphop.pathIntro} steps={hiphop.path} images={[g[6], g[5], "/images/achievements/dap-b.jpg"]} />
      <CrewBlocks title={hiphop.crewsTitle} crews={hiphop.crews} />
      <section className="py-16 bg-ink-2 border-y border-line">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal><div className="eyebrow">{hiphop.spotlightTitle}</div><h2 className="display text-5xl mt-2">{hiphop.spotlight[0]}</h2><p className="mt-3 text-mute">{hiphop.spotlight[1]}</p>
            <div className="mt-8 glass rounded-xl p-6"><h3 className="display text-4xl">{j.name}</h3><p className="mt-2 text-sm text-mute">{j.intro}</p><p className="mt-3 font-semibold">🏆 Achievements & Milestones</p><ul className="mt-1 space-y-1 text-sm text-white/85">{j.steps.map((s) => <li key={s}>• {s}</li>)}</ul><p className="mt-3 text-sm text-mute">{j.outro}</p>{j.video && <div className="mt-4"><Button href={j.video} variant="ghost">WATCH VIDEO</Button></div>}</div></Reveal>
          <Reveal delay={0.1}><Carousel images={g} alt="MADDspace hip hop students" /></Reveal>
        </div>
      </section>
      <Testimonials />
      <TrialBox title="SIGN UP FOR A TRIAL" lead="Our trial lesson allows your child to experience a real class before committing." included={["60-minute 1-to-1 or Group Class", "Personalised assessment of your child's level", "Guidance on the most suitable learning pathway", "Opportunity to meet our instructors"]} meta={hiphop.trialMeta} guarantee="Money-Back Guarantee — If the experience is not the right fit, we'll refund your trial — no questions asked." cta="SIGN UP FOR A TRIAL LESSON" url={BOOK_TRIAL_URL} />
      <FinalCta image={g[7]} />
    </Shell>
  );
}
