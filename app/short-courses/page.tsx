import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { shortCourses as sc } from "@/content/misc";
import PageHero from "@/components/PageHero";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal } from "@/components/ui";
import { SHORT_COURSE_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/short-courses"].title, description: seo["/short-courses"].description, alternates: { canonical: "/short-courses" } };
const g = ["/images/classes/holiday-camps/holiday-camps-02.jpg", "/images/classes/age-10-18/age-10-18-07.jpg", "/images/classes/age-6-9/age-6-9-06.jpg", "/images/classes/age-10-18/age-10-18-10.jpg", "/images/classes/holiday-camps/holiday-camps-02.jpg"];

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow={`${sc.season} · ${sc.status}`} title={<>{sc.h1[0]}<br />{sc.h1[1]}</>} sub={sc.copy} image={g[0]} tall><Button href={SHORT_COURSE_URL}>SIGN UP NOW</Button><Button href={SHORT_COURSE_URL} variant="outline">SHORT COURSE REGISTRATION</Button></PageHero>
      <section className="py-16 lg:py-24"><div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center"><Reveal><div className="grid gap-3">{sc.courses.map((c, i) => <div key={c} className="glass rounded-xl p-5 flex items-center gap-4"><div className="display text-accent text-4xl">0{i + 1}</div><div><div className="display text-3xl">{c}</div><div className="text-xs text-white/60">6 weeks · Ages 9 to 16 · No prior experience required</div></div></div>)}</div><p className="mt-5 text-xs text-white/60">{sc.note}</p><div className="mt-6"><Button href={SHORT_COURSE_URL}>SHORT COURSE REGISTRATION</Button></div></Reveal><Reveal delay={0.1}><Carousel images={g} alt="MADDspace short course students" /></Reveal></div></section>
      <FinalCta image={g[3]} primary={{ label: "SIGN UP NOW", href: SHORT_COURSE_URL }} />
    </Shell>
  );
}
