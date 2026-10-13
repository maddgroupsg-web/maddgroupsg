"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { progression } from "@/content/home";
import { Button } from "@/components/ui";

// Pinned section: as the visitor scrolls, the stages light up from LEFT to RIGHT and the neon line draws across.
export default function Progression() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);
  const n = progression.stages.length;
  const [desktop, setDesktop] = useState(true);
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); const f = () => setDesktop(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  // on small screens the row pans horizontally so the reveal still reads left → right
  const panX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", `-${((n - 1) / n) * 100}%`]);

  return (
    <section id="journey" ref={ref} className="relative" style={{ height: reduce ? "auto" : "320vh" }}>
      <div className={reduce ? "" : "sticky top-0 h-[100svh] overflow-hidden"}>
        <div className="absolute inset-0 bg-ink">
          <div className="absolute inset-0 spotlight" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(34,211,211,0.12),transparent)]" />
        </div>
        <div className="container-x relative h-full flex flex-col justify-center py-24 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="eyebrow">{progression.eyebrow}</div>
              <h2 className="display mt-2 text-5xl sm:text-6xl lg:text-7xl">{progression.headline}</h2>
            </div>
            <p className="hidden lg:block text-xs tracking-[0.2em] text-white/50">SCROLL TO FOLLOW THE JOURNEY →</p>
          </div>

          <div className="relative mt-8 lg:mt-12">
            {/* stage floor */}
            <div className="absolute -inset-x-8 -bottom-6 h-24 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(34,211,211,0.16),transparent)] pointer-events-none" />
            <div className="overflow-hidden">
              <motion.div className="flex gap-3 sm:gap-4 lg:grid lg:grid-cols-3" style={reduce || desktop ? undefined : { x: panX }}>
                {progression.stages.map((s, i) => (
                  <Stage key={s.title} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} />
                ))}
              </motion.div>
            </div>
            {/* neon progress line + markers */}
            <div className="relative mt-6 h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
              <motion.div className="absolute left-0 top-1/2 h-px origin-left bg-cyan shadow-[0_0_12px_#22d3d3]" style={{ scaleX: reduce ? 1 : line, width: "100%" }} />
              <div className="absolute inset-0 grid grid-cols-3">
                {progression.stages.map((s, i) => <Marker key={s.n} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} />)}
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <p className="display text-2xl sm:text-3xl">
              <span className="text-white">{progression.keyMessage[0]}</span> <span className="text-cyan normal-case font-sans text-base sm:text-lg tracking-normal">{progression.keyMessage[1]}</span>
            </p>
            <Button href="#pathway" variant="outline">DISCOVER THE PATHWAY</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function thresholds(i: number, n: number) { const a = 0.12 + (i / n) * 0.7; return [a, a + 0.18] as [number, number]; }

function Stage({ s, i, n, progress, reduce }: { s: (typeof progression.stages)[number]; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const [a, b] = thresholds(i, n);
  const opacity = useTransform(progress, [a, b], [0.22, 1]);
  const scale = useTransform(progress, [a, b], [0.96, 1]);
  const glow = useTransform(progress, [a, b], [0, 1]);
  const shadow = useTransform(glow, (g) => `0 0 ${30 * g}px -6px rgba(34,211,211,${0.6 * g}), inset 0 0 0 1px rgba(34,211,211,${0.2 + 0.6 * g})`);
  const filter = useTransform(progress, [a, b], ["saturate(0.2) brightness(0.55)", "saturate(1) brightness(1)"]);
  return (
    <motion.article style={reduce ? undefined : { opacity, scale, boxShadow: shadow }} className="relative shrink-0 basis-[82%] sm:basis-[60%] lg:basis-auto rounded-xl overflow-hidden glass">
      <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/3]">
        <motion.div style={reduce ? undefined : { filter }} className="absolute inset-0">
          <Image src={s.image} alt={s.alt} fill sizes="(max-width: 1024px) 80vw, 33vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute top-4 left-4 display text-cyan text-3xl drop-shadow">{s.n}</div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="display text-4xl sm:text-5xl">{s.title}</h3>
          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-white/80">
            {s.items.map((it, k) => <li key={it}>{it}{k < s.items.length - 1 && <span className="ml-2 text-cyan">•</span>}</li>)}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function Marker({ s, i, n, progress, reduce }: { s: (typeof progression.stages)[number]; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const [a, b] = thresholds(i, n);
  const on = useTransform(progress, [a, b], [0, 1]);
  const color = useTransform(on, (v) => `rgba(${34 + (255 - 34) * (1 - v)},${211 + (255 - 211) * (1 - v)},${211 + (255 - 211) * (1 - v)},${0.4 + 0.6 * v})`);
  const bg = useTransform(on, (v) => (v > 0.5 ? "#22d3d3" : "rgba(255,255,255,0.25)"));
  return (
    <div className="relative flex items-center gap-3 text-xs tracking-[0.2em]">
      <motion.span style={reduce ? { background: "#22d3d3" } : { background: bg }} className="h-3 w-3 rounded-full shadow-[0_0_10px_#22d3d3]" />
      <motion.span style={reduce ? undefined : { color }} className="font-semibold">{s.n} {s.title}</motion.span>
    </div>
  );
}
