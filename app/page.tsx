import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import MaddGroupPanels from "@/components/home/MaddGroupPanels";
import ClassesTiles from "@/components/home/ClassesTiles";
import Journeys from "@/components/home/Journeys";
import Testimonials from "@/components/home/Testimonials";
import ShowcaseWall from "@/components/home/ShowcaseWall";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <Shell>
      <Preloader />
      <Hero />
      <ShowcaseWall />
      <MaddGroupPanels />
      <ClassesTiles />
      <Journeys />
      <Testimonials />
      <Locations formTitle="Sign Up" />
      <FinalCta />
    </Shell>
  );
}
