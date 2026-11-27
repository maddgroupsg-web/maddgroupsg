"use client";
import Image from "next/image";
import Link from "next/link";
import { maddGroup } from "@/content/home";
import { Reveal } from "@/components/ui";
import { toSentence } from "@/lib/utils";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// The MADD Group — centred heading + four flush photo panels. Normal scrolling (no pin);
// the panels fade in left → right as the row enters view. On phones the row scrolls sideways.
export default function MaddGroupPanels() {
  const reduce = useReducedMotion();
  const row = useRef<HTMLDivElement>(null);
  // scrubbed to the scrollbar: panels light up one by one as the row travels from the bottom of the
  // viewport to its upper third. Scrolling back dims them again. No pin.
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  return (
    <section id="madd-group" ref={section} className={reduce ? "relative" : "relative lg:h-[260vh]"}>
      <div className={`relative overflow-hidden ${reduce ? "py-20" : "py-20 lg:py-0 lg:sticky lg:top-0 lg:h-[100svh] lg:pt-[124px] lg:pb-6 lg:flex lg:flex-col lg:justify-start"}`}>
      <div className="container-x relative">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="display">The MADD Group</h2>
          <p className="mt-3 text-lg sm:text-xl text-white/60">More than a performing arts school.</p>
          <p className="mt-4 text-mute [@media(max-height:760px)]:hidden">{maddGroup.copy[0]}</p>
        </Reveal>

        <div ref={row} className="mt-10 lg:mt-8 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar">
          <div className="flex lg:grid lg:grid-cols-4 lg:overflow-hidden min-w-max lg:min-w-0">
            {maddGroup.pillars.map((p, i) => (
              <Panel key={p.name} p={p} i={i} n={maddGroup.pillars.length} progress={scrollYProgress} reduce={!!reduce} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

type Pillar = (typeof maddGroup.pillars)[number];
function Panel({ p, i, n, progress, reduce }: { p: Pillar; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const a = 0.08 + (i / n) * 0.72, b = a + 0.18;
  const filter = useTransform(progress, [a, b], ["saturate(0.15) brightness(0.45)", "saturate(1) brightness(1)"]);
  const opacity = useTransform(progress, [a, b], [0.35, 1]);
  const still = reduce || i === 0; // first panel always lit
  return (
    <motion.div className="snap-start shrink-0 w-[78vw] sm:w-[48vw] lg:w-auto" style={still ? undefined : { opacity }}>
      <Link href={p.href} className="group relative block aspect-[3/4] lg:aspect-auto lg:h-[min(58vh,600px)] overflow-hidden">
        <motion.div className="absolute inset-0" style={still ? undefined : { filter }}>
          <Image src={p.image} alt={`${p.name} — ${p.verb}`} fill sizes="(max-width: 1024px) 78vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/85 to-transparent" />
        {i > 0 && <div className="hidden lg:block absolute inset-y-0 left-0 w-px bg-white/10" />}
        {p.logo && <div className="absolute top-4 right-4 lg:top-5 lg:right-5 h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex items-start justify-end"><Image src={p.logo} alt="" width={160} height={160} className="max-h-full w-auto object-contain object-right-top drop-shadow-[0_2px_10px_rgba(0,0,0,.6)]" /></div>}
        <div className="absolute inset-x-0 top-[50%] px-5 lg:px-6">
          <div className="font-display text-[2rem] lg:text-[clamp(1.9rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-accent">{p.verb}</div>
          <div className="mt-2 font-display text-lg lg:text-[clamp(1rem,1.35vw,1.3rem)] font-semibold leading-tight tracking-[-0.02em] whitespace-nowrap">{toSentence(p.name)}</div>
          <p className="mt-3 min-h-[3.25em] text-[13px] lg:text-[13.5px] leading-relaxed text-white/80 max-w-[30ch] line-clamp-2">{p.copy}</p>
          <span className="mt-3 inline-block text-[13px] font-medium text-white underline decoration-white/40 underline-offset-4 group-hover:decoration-white">Explore</span>
        </div>
      </Link>
    </motion.div>
  );
}
