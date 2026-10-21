import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import MaddGroupPanels from "@/components/home/MaddGroupPanels";
import ClassesTiles from "@/components/home/ClassesTiles";
import Journeys from "@/components/home/Journeys";
import VideoCarousel from "@/components/home/VideoCarousel";
import Testimonials from "@/components/home/Testimonials";
import ShowcaseWall from "@/components/home/ShowcaseWall";
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
      <VideoCarousel />
      <Journeys />
      <Testimonials />
      <FinalCta />
    </Shell>
  );
}
