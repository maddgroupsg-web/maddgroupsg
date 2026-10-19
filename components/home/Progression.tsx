"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui";

export type Stage = { n: string; title: string; kicker?: string; items?: string[]; copy?: string; image: string; alt: string; href?: string };
export type ProgressionConfig = {
  id: string;
  eyebrow: string;
  headline: string | string[];
  intro?: string[];
  stages: Stage[];
  footer: [string, string];
  cta: { label: string; href: string };
  aspect?: string;
};

// Pinned section: as the visitor scrolls, the stages light up from LEFT to RIGHT and the neon line draws across.
export default function Progression({ config: c }: { config: ProgressionConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const line = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);
  const n = c.stages.length;
  const [desktop, setDesktop] = useState(true);
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); const f = () => setDesktop(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  const panX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", `-${((n - 1) / n) * 100}%`]);
  const headline = Array.isArray(c.headline) ? c.headline : [c.headline];

  return (
    <section id={c.id} ref={ref} className="relative" style={{ height: reduce ? "auto" : `${260 + n * 25}vh` }}>
      <div className={reduce ? "" : "sticky top-0 h-[100svh] overflow-hidden"}>
        <div className="absolute inset-0 bg-ink">
          <div className="absolute inset-0 spotlight" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(34,211,211,0.12),transparent)]" />
        </div>
        <div className="container-x relative h-full flex flex-col justify-center py-24 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="max-w-3xl">
              <div className="eyebrow">{c.eyebrow}</div>
              <h2 className="display mt-2 text-4xl sm:text-6xl lg:text-7xl">{headline.map((h, i) => <span key={i} className={i > 0 ? "block text-cyan text-[0.6em] normal-case font-sans tracking-normal font-medium mt-1" : "block"}>{h}</span>)}</h2>
              {c.intro && <p className="mt-3 text-sm sm:text-base text-mute max-w-2xl hidden sm:block">{c.intro[0]}</p>}
            </div>
            <p className="hidden lg:block text-xs tracking-[0.2em] text-white/50 whitespace-nowrap">SCROLL TO FOLLOW →</p>
          </div>

          <div className="relative mt-6 lg:mt-10">
            <div className="absolute -inset-x-8 -bottom-6 h-24 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(34,211,211,0.16),transparent)] pointer-events-none" />
            <div className="overflow-hidden">
              <motion.div className="flex gap-3 sm:gap-4 lg:grid" style={{ ...(reduce || desktop ? {} : { x: panX }), gridTemplateColumns: desktop ? `repeat(${n}, minmax(0, 1fr))` : undefined }}>
                {c.stages.map((s, i) => <StageCard key={s.title} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} aspect={c.aspect} />)}
              </motion.div>
            </div>
            <div className="relative mt-6 h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
              <motion.div className="absolute left-0 top-1/2 h-px origin-left bg-cyan shadow-[0_0_12px_#22d3d3]" style={{ scaleX: reduce ? 1 : line, width: "100%" }} />
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                {c.stages.map((s, i) => <Marker key={s.n} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} />)}
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <p className="display text-2xl sm:text-3xl">
              <span className="text-white">{c.footer[0]}</span> <span className="text-cyan normal-case font-sans text-base sm:text-lg tracking-normal">{c.footer[1]}</span>
            </p>
            <Button href={c.cta.href} variant="outline">{c.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function thresholds(i: number, n: number) { const a = 0.12 + (i / n) * 0.7; return [a, a + 0.16] as [number, number]; }

function StageCard({ s, i, n, progress, reduce, aspect }: { s: Stage; i: number; n: number; progress: MotionValue<number>; reduce: boolean; aspect?: string }) {
  const [a, b] = thresholds(i, n);
  const opacity = useTransform(progress, [a, b], [0.22, 1]);
  const scale = useTransform(progress, [a, b], [0.96, 1]);
  const glow = useTransform(progress, [a, b], [0, 1]);
  const shadow = useTransform(glow, (g) => `0 0 ${30 * g}px -6px rgba(34,211,211,${0.6 * g}), inset 0 0 0 1px rgba(34,211,211,${0.2 + 0.6 * g})`);
  const filter = useTransform(progress, [a, b], ["saturate(0.2) brightness(0.55)", "saturate(1) brightness(1)"]);
  const inner = (
    <div className={`relative ${aspect ?? "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/3]"}`}>
      <motion.div style={reduce ? undefined : { filter }} className="absolute inset-0">
        <Image src={s.image} alt={s.alt} fill sizes={`(max-width: 1024px) 80vw, ${Math.round(100 / n)}vw`} className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      <div className="absolute top-4 left-4 display text-cyan text-3xl drop-shadow">{s.n}</div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        {s.kicker && <div className="display text-cyan text-xl sm:text-2xl">{s.kicker}</div>}
        <h3 className="display text-3xl sm:text-4xl leading-none">{s.title}</h3>
        {s.copy && <p className="mt-2 text-[12px] sm:text-sm text-white/80 leading-snug">{s.copy}</p>}
        {s.items && <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-white/80">{s.items.map((it, k) => <li key={it}>{it}{k < s.items!.length - 1 && <span className="ml-2 text-cyan">•</span>}</li>)}</ul>}
        {s.href && <span className="mt-3 inline-block text-[11px] tracking-[0.2em] text-cyan font-semibold">EXPLORE →</span>}
      </div>
    </div>
  );
  return (
    <motion.article style={reduce ? undefined : { opacity, scale, boxShadow: shadow }} className="relative shrink-0 basis-[82%] sm:basis-[60%] lg:basis-auto rounded-xl overflow-hidden glass">
      {s.href ? <Link href={s.href} className="block">{inner}</Link> : inner}
    </motion.article>
  );
}

function Marker({ s, i, n, progress, reduce }: { s: Stage; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const [a, b] = thresholds(i, n);
  const on = useTransform(progress, [a, b], [0, 1]);
  const color = useTransform(on, (v) => `rgba(${34 + (255 - 34) * (1 - v)},${211 + (255 - 211) * (1 - v)},${211 + (255 - 211) * (1 - v)},${0.4 + 0.6 * v})`);
  const bg = useTransform(on, (v) => (v > 0.5 ? "#22d3d3" : "rgba(255,255,255,0.25)"));
  return (
    <div className="relative flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em]">
      <motion.span style={reduce ? { background: "#22d3d3" } : { background: bg }} className="h-3 w-3 rounded-full shadow-[0_0_10px_#22d3d3]" />
      <motion.span style={reduce ? undefined : { color }} className="font-semibold whitespace-nowrap">{s.n}<span className="hidden sm:inline"> {s.kicker ? s.title : s.title}</span></motion.span>
    </div>
  );
}
