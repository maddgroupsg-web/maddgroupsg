import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { privateClasses } from "@/content/typepages";
import PageHero from "@/components/PageHero";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Carousel from "@/components/Carousel";
import { Button, Reveal } from "@/components/ui";
import { PRIVATE_BOOKING_URL } from "@/content/site";

export const metadata: Metadata = { title: seo["/private-classes"].title, description: seo["/private-classes"].description, alternates: { canonical: "/private-classes" } };
const g = ["/images/classes/age-6-9/age-6-9-02.jpg", "/images/classes/age-10-18/age-10-18-01.jpg", "/images/classes/age-3-5/age-3-5-01.jpg", "/images/classes/age-6-9/age-6-9-03.jpg", "/images/classes/age-10-18/age-10-18-03.jpg", "/images/classes/dsa/dsa-04.jpg"];

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow={privateClasses.ages} title={privateClasses.h1} sub={privateClasses.title} image={g[1]}>
        <Button href={PRIVATE_BOOKING_URL}>BOOK YOUR TRIAL</Button>
        <Button href="#enquire" variant="outline">CONTACT US</Button>
      </PageHero>
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal><h2 className="display text-5xl">{privateClasses.title}</h2><div className="mt-5 space-y-4 text-mute leading-relaxed">{privateClasses.copy.map((p) => <p key={p}>{p}</p>)}</div><div className="mt-6"><Button href={PRIVATE_BOOKING_URL}>BOOK YOUR TRIAL</Button></div></Reveal>
          <Reveal delay={0.1}><Carousel images={g} alt="MADDspace private lesson students" /></Reveal>
        </div>
      </section>
      <Locations formTitle="INTERESTED?" formCopy="Fill in the form below and send the details to us. We will get back to you as soon as possible" preset="Private Lessons" />
      <FinalCta image={g[4]} />
    </Shell>
  );
}
