import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import MaddGroupPanels from "@/components/home/MaddGroupPanels";
import ClassesTiles from "@/components/home/ClassesTiles";
import VideoCarousel from "@/components/home/VideoCarousel";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import MediaLogos from "@/components/home/MediaLogos";
import PerformancesPreview from "@/components/home/PerformancesPreview";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <Shell>
      <Preloader />
      <Hero />
      <MediaLogos />
      <MaddGroupPanels />
      <ClassesTiles />
      <VideoCarousel />
      <PerformancesPreview />
      <Testimonials />
      <FinalCta />
    </Shell>
  );
}
