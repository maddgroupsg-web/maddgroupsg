import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { agePages, galleryFor } from "@/content/programmes";
import PageHero from "@/components/PageHero";
import ProgrammeList from "@/components/ProgrammeList";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

const page = agePages.find((p) => p.slug === "preteens-teens-classes")!;
export const metadata: Metadata = { title: seo["/preteens-teens-classes"].title, description: seo["/preteens-teens-classes"].description, alternates: { canonical: "/preteens-teens-classes" } };

export default function Page() {
  const images = galleryFor(page);
  return (
    <Shell>
      <PageHero eyebrow={"CLASSES FOR " + page.ages} title={page.h1} sub={"(" + page.ages + ")"} image={images[0]}>
        <Button href={BOOK_TRIAL_URL}>BOOK A TRIAL CLASS</Button>
        <Button href="#programmes" variant="outline">SEE PROGRAMMES</Button>
      </PageHero>
      <section className="py-16 border-b border-line">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="IN CLASS & ON STAGE" title="OUR STUDENTS" sub="Real MADDspace students from this age group — in class, at showcases and on stage." /></Reveal>
          <div className="mt-8"><Carousel images={images} alt={"MADDspace " + page.h1 + " students"} /></div>
        </div>
      </section>
      <section id="programmes" className="py-16 lg:py-20 scroll-mt-20">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="PROGRAMMES" title="WHAT WE OFFER" /></Reveal>
          <div className="mt-8"><ProgrammeList items={page.items} galleryImages={images} /></div>
        </div>
      </section>
      <FinalCta image={images[images.length - 1]} />
    </Shell>
  );
}
