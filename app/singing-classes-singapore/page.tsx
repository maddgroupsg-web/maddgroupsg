import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { singing } from "@/content/typepages";
import { studentJourneys } from "@/content/achievements";
import PageHero from "@/components/PageHero";
import { Checks, WhyGrid, TrialBox } from "@/components/Blocks";
import LogoMarquee from "@/components/LogoMarquee";
import Testimonials from "@/components/home/Testimonials";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Carousel from "@/components/Carousel";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { PRIVATE_VOCAL_TRIAL_URL, BOOK_TRIAL_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/singing-classes-singapore"].title, description: seo["/singing-classes-singapore"].description, alternates: { canonical: "/singing-classes-singapore" } };
const gallery = ["/images/classes/age-10-18/age-10-18-01.jpg", "/images/classes/age-6-9/age-6-9-03.jpg", "/images/classes/age-3-5/age-3-5-02.jpg", "/images/classes/age-6-9/age-6-9-01.jpg", "/images/classes/age-10-18/age-10-18-02.jpg", "/images/classes/age-6-9/age-6-9-02.jpg", "/images/classes/dsa/dsa-03.jpg", "/images/classes/age-6-9/age-6-9-07.jpg"];

export default function Page() {
  const j = studentJourneys[0];
  return (
    <Shell>
      <PageHero eyebrow="VOCAL LESSONS FOR KIDS & TEENS" title={singing.h1} sub={<>{singing.sub}<br /><span className="text-white/70">{singing.intro}</span></>} image={gallery[0]} tall>
        <Button href={PRIVATE_VOCAL_TRIAL_URL}>BOOK A TRIAL LESSON</Button>
        <Button href="#learn" variant="outline">EXPLORE THE PROGRAMME</Button>
      </PageHero>
      <section className="py-12 border-b border-line bg-ink-2">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <Checks items={singing.checks} className="grid sm:grid-cols-2 gap-x-8" />
          <div className="glass rounded-xl p-5 text-center lg:text-left"><div className="display text-2xl">{singing.trialLine}</div><div className="text-sm text-white/80 mt-1">{singing.trialMeta}</div><div className="text-xs text-accent mt-1">{singing.trialNote}</div></div>
        </div>
      </section>
      <LogoMarquee compact title="FEATURED ON" sub="" />
      <WhyGrid title={singing.whyTitle} items={singing.why} images={[gallery[4], gallery[6], gallery[1]]} />
      <section id="learn" className="py-16 lg:py-24 scroll-mt-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal><SectionHeading title={singing.lessonsTitle} sub={singing.lessonsCopy} /><p className="mt-6 font-semibold">Students learn:</p><Checks items={singing.learn} className="mt-2" /><p className="mt-5 text-mute">{singing.lessonsClose}</p></Reveal>
          <Reveal delay={0.1}><Carousel images={gallery} alt="MADDspace singing students" /></Reveal>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-ink-2 border-y border-line">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="STUDENT ACHIEVEMENTS & RESULTS" title={j.name} sub={j.intro} /></Reveal>
          <Reveal className="mt-8 glass rounded-xl p-6 sm:p-8 max-w-3xl">
            <ol className="space-y-2 border-l border-accent/40 pl-4 text-sm sm:text-base text-white/85">{j.steps.map((s) => <li key={s} className="relative"><span className="absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />{s}</li>)}</ol>
            <p className="mt-4 text-mute">{j.outro}</p>
            <div className="mt-6"><Button href={PRIVATE_VOCAL_TRIAL_URL}>Sign up for a Trial Lesson</Button></div>
          </Reveal>
        </div>
      </section>
      <Testimonials heading={singing.joinTitle} eyebrow="THINK NO LONGER!" />
      <TrialBox title={singing.trialBox.title} lead={singing.trialBox.lead} included={singing.trialBox.included} meta={singing.trialMeta} guarantee={singing.trialBox.guarantee} cta="SIGN UP FOR A TRIAL LESSON" url={BOOK_TRIAL_URL} />
      <Locations formTitle="Get in touch!" formCopy="Fill up the form below, and our team will reach out to you shortly!" preset="Singing / Vocals" />
      <FinalCta image={gallery[2]} />
    </Shell>
  );
}
