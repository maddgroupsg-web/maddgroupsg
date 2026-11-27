import type { Metadata } from "next";
import { Suspense } from "react";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal } from "@/components/ui";
import InstructorCarousel from "@/components/InstructorCarousel";
import FinalCta from "@/components/home/FinalCta";
import { instructors } from "@/content/instructors";
import InstructorGrid from "@/components/InstructorGrid";

export const metadata: Metadata = { title: seo["/instructors"].title, description: seo["/instructors"].description, alternates: { canonical: "/instructors" } };

export default function InstructorsPage() {
  const vocal = instructors.filter((i) => i.discipline === "vocal");
  const dance = instructors.filter((i) => i.discipline === "dance");
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-16 overflow-hidden">
        <div className="relative">
          <div className="container-x"><Reveal className="text-center">
            <h1 className="display display-hero">Train with people<br />who know the stage.</h1>
            <p className="mt-4 text-mute">Experienced instructors. Individual guidance. Real performance insight.</p>
          </Reveal></div>
          <div className="mt-10"><Suspense fallback={null}><InstructorCarousel /></Suspense></div>
        </div>
      </section>
      <section id="vocal-grid" className="py-16 scroll-mt-24">
        <div className="container-x"><h2 className="display">Vocal instructors</h2><InstructorGrid list={vocal} /></div>
      </section>
      <section id="dance-grid" className="py-16 bg-ink-2 scroll-mt-24">
        <div className="container-x"><h2 className="display">Dance instructors</h2><InstructorGrid list={dance} /></div>
      </section>
      <FinalCta />
    </Shell>
  );
}

