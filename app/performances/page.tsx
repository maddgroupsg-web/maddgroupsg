import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PerformancesGallery from "@/components/PerformancesGallery";
import FinalCta from "@/components/home/FinalCta";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Student Performances & Recordings | MADDspace Singapore", description: "Watch MADDspace students on stage and in the studio: MADDjestic, MADD to Shine, MADDlodies recitals, B-Dazzled and Asia Pacific International Arts Festival performances, and IdolLab recordings.", alternates: { canonical: "/performances" } };

export default function Page() {
  return (
    <Shell>
      <section className="pt-28 lg:pt-36 pb-16">
        <div className="absolute inset-0 spotlight" />
        <div className="container-x relative">
          <Reveal><SectionHeading as="h1" eyebrow="WATCH" title={<><span className="block">STUDENT PERFORMANCES</span><span className="block text-cyan">& RECORDINGS</span></>} sub="Every performance here is a MADDspace student. Filter by event or style and click to watch." /></Reveal>
          <div className="mt-10"><PerformancesGallery /></div>
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
