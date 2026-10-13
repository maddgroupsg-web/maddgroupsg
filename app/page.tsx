import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import Progression from "@/components/home/Progression";
import Pathways from "@/components/home/Pathways";
import ClassesTiles from "@/components/home/ClassesTiles";
import MaddGroup from "@/components/home/MaddGroup";
import Journeys from "@/components/home/Journeys";
import Testimonials from "@/components/home/Testimonials";
import LogoMarquee from "@/components/LogoMarquee";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Progression />
      <Pathways />
      <ClassesTiles />
      <MaddGroup />
      <Journeys />
      <Testimonials />
      <LogoMarquee />
      <Locations formTitle="Sign Up" />
      <FinalCta />
    </Shell>
  );
}
