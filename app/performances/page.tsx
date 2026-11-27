import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PerformancesGallery from "@/components/PerformancesGallery";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = { title: "Student Performances & Recordings | MADDspace Singapore", description: "Watch MADDspace students on stage and in the studio: MADDjestic, MADD to Shine, MADDlodies recitals, B-Dazzled and Asia Pacific International Arts Festival performances, and IdolLab recordings.", alternates: { canonical: "/performances" } };

export default function Page() {
  return (
    <Shell>
      <PerformancesGallery />
      <FinalCta />
    </Shell>
  );
}
