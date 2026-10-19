import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import Progression from "@/components/home/Progression";
import Journey from "@/components/home/Journey";
import Pathways from "@/components/home/Pathways";
import ClassesTiles from "@/components/home/ClassesTiles";
import Journeys from "@/components/home/Journeys";
import Testimonials from "@/components/home/Testimonials";
import LogoMarquee from "@/components/LogoMarquee";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Preloader from "@/components/Preloader";
import { pillarsProgression } from "@/content/home";

export default function Home() {
  return (
    <Shell>
      <Preloader />
      <Hero />
      <Progression config={pillarsProgression} />
      <Pathways />
      <ClassesTiles />
      <Journey />
      <Journeys />
      <Testimonials />
      <LogoMarquee />
      <Locations formTitle="Sign Up" />
      <FinalCta />
    </Shell>
  );
}
