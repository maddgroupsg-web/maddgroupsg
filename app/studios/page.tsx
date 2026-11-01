import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { studios } from "@/content/misc";
import PageHero from "@/components/PageHero";
import Carousel from "@/components/Carousel";
import { Button, Reveal, SectionHeading, Words } from "@/components/ui";

export const metadata: Metadata = { title: seo["/studios"].title, description: seo["/studios"].description, alternates: { canonical: "/studios" } };
const g = ["/images/about/about-hero.jpg", "/images/about/about-1.jpg", "/images/about/about-2.jpg", "/images/about/about-3.jpg", "/images/about/about-4.jpg"];

function Rooms({ h1, rooms }: { h1: string; rooms: typeof studios.central.rooms }) {
  return (
    <section className="py-16 border-t border-line">
      <div className="container-x">
        <Reveal><h2 className="display text-4xl sm:text-5xl"><Words>{h1}</Words></h2><p className="mt-2 text-xs text-white/60">{studios.peak}</p></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => <Reveal key={r.name} delay={i * 0.09} className="glass rounded-xl p-6"><h3 className="display text-3xl">{r.name}</h3><dl className="mt-3 text-sm text-white/80 space-y-1"><div>Size: {r.size}</div><div>Standing Capacity: {r.standing}</div><div>Seating Capacity: {r.seating}</div></dl><div className="mt-4 flex gap-4"><div><div className="display text-2xl text-accent">{r.nonPeak}</div><div className="text-[10px] tracking-widest text-white/60">NON PEAK RATE</div></div><div><div className="display text-2xl">{r.peak}</div><div className="text-[10px] tracking-widest text-white/60">PEAK RATE</div></div></div><div className="mt-5"><Button href="/contact" variant="outline" className="!py-2 text-[11px]">INTERESTED</Button></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Shell>
      <PageHero eyebrow="STUDIO HIRE" title="BOOK A STUDIO" sub={studios.intro} image={g[0]}><Button href="/contact">Book a Studio Now!</Button></PageHero>
      <section className="py-12"><div className="container-x"><Reveal><Carousel images={g} alt="MADDspace studios" aspect="aspect-[4/3]" /></Reveal></div></section>
      <Rooms h1={studios.central.h1} rooms={studios.central.rooms} />
      <Rooms h1={studios.west.h1} rooms={studios.west.rooms} />
    </Shell>
  );
}
