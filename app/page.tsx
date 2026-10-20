import Shell from "@/components/Shell";
import Hero from "@/components/home/Hero";
import Progression from "@/components/home/Progression";
import ClassesTiles from "@/components/home/ClassesTiles";
import Journeys from "@/components/home/Journeys";
import Testimonials from "@/components/home/Testimonials";
import LogoMarquee from "@/components/LogoMarquee";
import ShowcaseWall from "@/components/home/ShowcaseWall";
import Locations from "@/components/home/Locations";
import FinalCta from "@/components/home/FinalCta";
import Preloader from "@/components/Preloader";
import { pillarsProgression } from "@/content/home";

export default function Home() {
  return (
    <Shell>
      <Preloader />
      <Hero />
      <LogoMarquee compact title="AS FEATURED IN LEADING MEDIA PLATFORMS" sub="" />
      <ShowcaseWall />
      <Progression config={pillarsProgression} />
      <ClassesTiles />
      <Journeys />
      <Testimonials />
      <Locations formTitle="Sign Up" />
      <FinalCta />
    </Shell>
  );
}
