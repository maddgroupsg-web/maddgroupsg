import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { kpop } from "@/content/typepages";
import PageHero from "@/components/PageHero";
import { WhyGrid, LearnGrid, PathSteps, CrewBlocks, TrialBox } from "@/components/Blocks";
import LogoMarquee from "@/components/LogoMarquee";
import Testimonials from "@/components/home/Testimonials";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Carousel from "@/components/Carousel";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/kpop"].title, description: seo["/kpop"].description, alternates: { canonical: "/kpop" } };
const g = ["/images/classes/age-10-18/age-10-18-04.jpg", "/images/classes/age-10-18/age-10-18-07.jpg", "/images/classes/holiday-camps/holiday-camps-02.jpg", "/images/classes/age-6-9/age-6-9-05.jpg", "/images/classes/holiday-camps/holiday-camps-04.jpg", "/images/classes/age-10-18/age-10-18-08.jpg", "/images/classes/age-10-18/age-10-18-05.jpg", "/images/classes/holiday-camps/holiday-camps-03.jpg"];

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow={kpop.h2} title={kpop.h1} sub={<>{kpop.sub}<br /><span className="text-accent font-semibold">{kpop.trialLine}</span> <span className="text-white/70">{kpop.trialMeta}</span></>} image={g[0]} tall>
        <Button href={BOOK_TRIAL_URL}>BOOK A TRIAL LESSON</Button>
        <Button href="#learn" variant="outline">EXPLORE THE PROGRAMME</Button>
      </PageHero>
      <LogoMarquee compact title="FEATURED ON" sub="" />
      <section className="py-16 border-y border-line bg-ink-2"><div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center"><Reveal><SectionHeading title={kpop.perfTitle} sub={kpop.perfCopy} /></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace K-Pop dance students" /></Reveal></div></section>
      <LearnGrid title={kpop.learnTitle} intro={kpop.learnIntro} items={kpop.learn} images={[g[3], g[7], g[6]]} />
      <WhyGrid title={kpop.whyTitle} items={kpop.why} images={[g[1], g[5], g[4]]} />
      <PathSteps title={kpop.pathTitle} intro={kpop.pathIntro} steps={kpop.path} images={[g[3], g[4], g[5]]} />
      <CrewBlocks title={kpop.crewsTitle} crews={kpop.crews} />
      <section className="py-16 bg-ink-2 border-y border-line"><div className="container-x text-center max-w-3xl mx-auto"><Reveal><div className="eyebrow">{kpop.spotlightTitle}</div><h2 className="display text-5xl mt-2">{kpop.spotlight[0]}</h2><p className="mt-3 text-mute">{kpop.spotlight[1]}</p><p className="display text-3xl mt-8 text-accent">{kpop.quote}</p><p className="mt-2 text-white/80">{kpop.quoteSub}</p></Reveal></div></section>
      <Testimonials />
      <TrialBox title="SIGN UP FOR A TRIAL" lead="Our trial lesson allows your child to experience a real class before committing." included={["60-minute 1-to-1 or Group Class", "Personalised assessment of your child's level", "Guidance on the most suitable learning pathway", "Opportunity to meet our instructors"]} meta={kpop.trialMeta} guarantee="Money-Back Guarantee — If the experience is not the right fit, we'll refund your trial — no questions asked." cta="SIGN UP FOR A TRIAL LESSON" url={BOOK_TRIAL_URL} />
      <Locations formTitle="Sign Up For A Trial Class" formCopy="Fill up the form below, and our team will reach out to you shortly!" preset="K-Pop" />
      <FinalCta image={g[1]} />
    </Shell>
  );
}
