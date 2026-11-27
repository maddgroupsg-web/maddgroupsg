import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { agePages, galleryFor } from "@/content/programmes";
import PageHero from "@/components/PageHero";
import ProgrammeRow from "@/components/ProgrammeRow";
import Carousel from "@/components/Carousel";
import FinalCta from "@/components/home/FinalCta";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { BOOK_TRIAL_URL } from "@/content/site";

const page = agePages.find((p) => p.slug === "preschool-classes")!;
export const metadata: Metadata = { title: seo["/preschool-classes"].title, description: seo["/preschool-classes"].description, alternates: { canonical: "/preschool-classes" } };

export default function Page() {
  const images = galleryFor(page);
  return (
    <Shell>
      <PageHero eyebrow={"CLASSES FOR " + page.ages} title={page.h1} sub={"(" + page.ages + ")"} image={images[0]}>
        <Button href={BOOK_TRIAL_URL}>BOOK A TRIAL CLASS</Button>
        <Button href="#programmes" variant="outline">SEE PROGRAMMES</Button>
      </PageHero>
      <section id="programmes" className="py-16 lg:py-20 scroll-mt-20">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="PROGRAMMES" title="WHAT WE OFFER" /></Reveal>
          <div className="mt-8"><ProgrammeRow items={page.items} images={[images[4], images[7], images[0], images[9]]} /></div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="IN CLASS & ON STAGE" title="OUR STUDENTS" sub="Real MADDspace students from this age group — in class, at showcases and on stage." /></Reveal>
          <div className="mt-8"><Carousel images={images} alt={"MADDspace " + page.h1 + " students"} /></div>
        </div>
      </section>
      <FinalCta image={images[images.length - 1]} />
    </Shell>
  );
}
