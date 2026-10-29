"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { story } from "@/content/story";
import { maddGroup } from "@/content/home";

// "Stage reveal" timeline. Each stop is a photo cut in two; the halves sit apart and slide together as the
// stop scrolls into view. A waveform spine runs down the middle. The last stop widens edge to edge and
// opens into the four pillars of The MADD Group.
export default function StoryReveal() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="How MADDspace came about">
      <div className="container-x text-center max-w-3xl mx-auto">
        <div className="eyebrow">HOW IT STARTED</div>
        <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">From one studio<br />to a whole stage.</h2>
      </div>
      <div className="relative container-x mt-16">
        <Spine />
        <div className="relative space-y-24 lg:space-y-32">
          {story.map((s, i) => <Stop key={s.title} s={s} i={i} reduce={!!reduce} />)}
        </div>
      </div>
      <Finale reduce={!!reduce} />
    </section>
  );
}

function Spine() {
  // a looping waveform, drawn down the centre; animates like audio
  const bars = Array.from({ length: 90 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 hidden md:flex w-10 flex-col items-center justify-between py-6" aria-hidden>
      {bars.map((b) => (
        <span key={b} className="wave-bar block h-px w-full rounded bg-cyan/50" style={{ animationDelay: `${(b % 12) * 0.12}s`, transform: `scaleX(${0.2 + 0.8 * Math.abs(Math.sin(b * 0.7))})` }} />
      ))}
    </div>
  );
}

function Stop({ s, i, reduce }: { s: (typeof story)[number]; i: number; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "center 55%"] });
  const gap = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 1, 0]); // 1 = fully apart
  const left = useTransform(gap, (g) => `${-g * 14}%`);
  const right = useTransform(gap, (g) => `${g * 14}%`);
  const seam = useTransform(gap, (g) => 1 - g);
  const capOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const capY = useTransform(scrollYProgress, [0.55, 1], [16, 0]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`relative grid items-center gap-6 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
      {/* photo, split in two halves that close */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-3 md:px-0">
        <motion.div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden" style={{ x: left }}>
          <div className="relative h-full w-[200%]"><Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
        </motion.div>
        <motion.div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden" style={{ x: right }}>
          <div className="relative h-full w-[200%] -translate-x-1/2"><Image src={s.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
        </motion.div>
        {/* seam glow that fades as halves meet */}
        <motion.div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cyan shadow-[0_0_14px_2px_rgba(34,211,211,.7)]" style={{ opacity: useTransform(seam, (v) => 1 - v) }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 display text-cyan text-2xl sm:text-3xl drop-shadow">{s.year}{s.confirm && <span className="ml-2 align-top text-[9px] tracking-[0.2em] text-white/50">TO CONFIRM</span>}</div>
      </div>
      {/* caption */}
      <motion.div style={{ opacity: capOpacity, y: capY }} className={`md:px-10 ${flip ? "md:text-right" : ""}`}>
        <h3 className="display text-4xl sm:text-5xl leading-none">{s.title}</h3>
        <p className="mt-3 text-mute text-base sm:text-lg max-w-md md:max-w-none">{s.line}</p>
      </motion.div>
    </div>
  );
}

function Finale({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] });
  const width = useTransform(scrollYProgress, [0, 0.6], ["62%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [16, 0]);
  return (
    <div ref={ref} className="relative mt-24 lg:mt-32">
      <div className="container-x text-center"><div className="eyebrow">AND IT OPENS INTO</div><h3 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">The MADD Group</h3><p className="mt-3 text-white/60">Four pillars. One ecosystem.</p></div>
      <motion.div style={reduce ? undefined : { width, borderRadius: radius }} className="mx-auto mt-10 w-full overflow-hidden rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {maddGroup.pillars.map((p, i) => <Pillar key={p.name} p={p} i={i} progress={scrollYProgress} reduce={reduce} />)}
        </div>
      </motion.div>
    </div>
  );
}

function Pillar({ p, i, progress, reduce }: { p: (typeof maddGroup.pillars)[number]; i: number; progress: MotionValue<number>; reduce: boolean }) {
  const a = 0.45 + i * 0.12, b = a + 0.15;
  const filter = useTransform(progress, [a, b], ["saturate(0.1) brightness(0.4)", "saturate(1) brightness(1)"]);
  const y = useTransform(progress, [a, b], [24, 0]);
  const op = useTransform(progress, [a, b], [0, 1]);
  return (
    <Link href={p.href} className="group relative block aspect-[3/4] overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { filter }}>
        <Image src={p.image} alt={`${p.name} — ${p.verb}`} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      {i > 0 && <div className="absolute inset-y-0 left-0 w-px bg-white/10" />}
      {p.logo && <div className="absolute top-4 right-4 h-10 w-10 lg:h-12 lg:w-12 flex items-start justify-end"><Image src={p.logo} alt="" width={120} height={120} className="max-h-full w-auto object-contain" /></div>}
      <motion.div style={reduce ? undefined : { y, opacity: op }} className="absolute inset-x-0 bottom-0 p-5">
        <div className="display text-3xl sm:text-4xl leading-none">{p.verb}</div>
        <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-cyan">{p.name}</div>
      </motion.div>
    </Link>
  );
}
