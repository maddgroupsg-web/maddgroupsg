import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import MaddGroupPanels from "@/components/home/MaddGroupPanels";
import ScrollAbout from "@/components/home/ScrollAbout";
import ProgrammesSplit from "@/components/home/ProgrammesSplit";
import VideoCarousel from "@/components/home/VideoCarousel";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import MediaLogos from "@/components/home/MediaLogos";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <Shell>
      <Preloader />
      <Hero />
      <ScrollAbout />
      <ProgrammesSplit />
      <VideoCarousel />
      <MaddGroupPanels />
      <MediaLogos />
      <Testimonials />
      <FinalCta />
    </Shell>
  );
}
