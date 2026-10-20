"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui";

export type Stage = { n: string; title: string; kicker?: string; items?: string[]; copy?: string; image: string; alt: string; href?: string; logo?: string };
export type ProgressionConfig = {
  id: string;
  eyebrow: string;
  headline: string | string[];
  intro?: string[];
  stages: Stage[];
  footer: [string, string];
  cta: { label: string; href: string };
  aspect?: string;
  flush?: boolean;  // no card frames: panels butt together edge to edge
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
        <div className="container-x relative h-full flex flex-col justify-center pt-24 pb-6 lg:pt-28 lg:pb-8">
          <div className="shrink-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="max-w-3xl">
              <div className="eyebrow">{c.eyebrow}</div>
              <h2 className="display mt-2 text-4xl sm:text-5xl lg:text-[clamp(2.4rem,6.5vh,4.5rem)] leading-[0.92]">{headline.map((h, i) => <span key={i} className={i > 0 ? "block text-cyan text-[0.6em] normal-case font-sans tracking-normal font-medium mt-1" : "block"}>{h}</span>)}</h2>
              {c.intro && <p className="mt-3 text-sm text-mute max-w-2xl hidden lg:block [@media(max-height:820px)]:hidden">{c.intro[0]}</p>}
            </div>
            <p className="hidden lg:block text-xs tracking-[0.2em] text-white/50 whitespace-nowrap">SCROLL TO FOLLOW →</p>
          </div>

          <div className="relative mt-6 lg:mt-6 lg:flex-1 lg:min-h-0 lg:flex lg:flex-col">
            <div className="absolute -inset-x-8 -bottom-6 h-24 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(34,211,211,0.16),transparent)] pointer-events-none" />
            <div className="overflow-hidden lg:flex-1 lg:min-h-0">
              <motion.div className={`flex lg:grid lg:h-full ${c.flush ? "gap-0 lg:rounded-2xl lg:overflow-hidden" : "gap-3 sm:gap-4"}`} style={{ ...(reduce || desktop ? {} : { x: panX }), gridTemplateColumns: desktop ? `repeat(${n}, minmax(0, 1fr))` : undefined }}>
                {c.stages.map((s, i) => <StageCard key={s.title} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} aspect={c.aspect} flush={!!c.flush} litFirst={!desktop} />)}
              </motion.div>
            </div>
            <div className="relative mt-4 h-8 shrink-0">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
              <motion.div className="absolute left-0 top-1/2 h-px origin-left bg-cyan shadow-[0_0_12px_#22d3d3]" style={{ scaleX: reduce ? 1 : line, width: "100%" }} />
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
                {c.stages.map((s, i) => <Marker key={s.n} s={s} i={i} n={n} progress={scrollYProgress} reduce={!!reduce} litFirst={!desktop} />)}
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mt-5 shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <p className="display text-xl sm:text-2xl lg:text-[clamp(1.1rem,2.6vh,1.9rem)]">
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

function StageCard({ s, i, n, progress, reduce, aspect, flush, litFirst }: { s: Stage; i: number; n: number; progress: MotionValue<number>; reduce: boolean; aspect?: string; flush?: boolean; litFirst?: boolean }) {
  const [a0, b0] = thresholds(i, n);
  const lit = litFirst && i === 0;
  const [a, b] = [a0, b0];
  const still = reduce || !!lit; // lit-first card renders fully lit with no scroll binding
  const opacity = useTransform(progress, [a, b], [0.3, 1]);
  const scale = useTransform(progress, [a, b], [flush ? 1 : 0.96, 1]);
  const glow = useTransform(progress, [a, b], [0, 1]);
  const shadow = useTransform(glow, (g) => flush ? "none" : `0 0 ${30 * g}px -6px rgba(34,211,211,${0.6 * g}), inset 0 0 0 1px rgba(34,211,211,${0.2 + 0.6 * g})`);
  const filter = useTransform(progress, [a, b], ["saturate(0.15) brightness(0.45)", "saturate(1) brightness(1)"]);
  const inner = (
    <div className={`relative ${aspect ?? "aspect-[4/5] sm:aspect-[4/3]"} lg:aspect-auto lg:h-full`}>
      <motion.div style={still ? { filter: "none" } : { filter }} className="absolute inset-0">
        <Image src={s.image} alt={s.alt} fill sizes={`(max-width: 1024px) 80vw, ${Math.round(100 / n)}vw`} className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      {flush && i > 0 && <div className="absolute inset-y-0 left-0 w-px bg-white/10" />}
      {s.logo && <div className="absolute top-4 right-4 lg:top-5 lg:right-5 h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex items-start justify-end"><Image src={s.logo} alt="" width={160} height={160} className="max-h-full w-auto object-contain object-right-top drop-shadow-[0_2px_10px_rgba(0,0,0,.6)]" /></div>}
      {/* header: verb as the title, name underneath */}
      <div className="absolute inset-x-0 top-0 p-5 pr-20 lg:p-6 lg:pr-24">
        <h3 className="display text-4xl sm:text-5xl lg:text-[clamp(2rem,4.6vh,3.4rem)] leading-none text-white">{s.kicker ?? s.title}</h3>
        {s.kicker && <div className="mt-1.5 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-cyan">{s.title}</div>}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
        {s.copy && <p className="text-[12px] sm:text-sm text-white/85 leading-snug max-w-[34ch] [@media(max-height:760px)]:hidden">{s.copy}</p>}
        {s.items && <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-white/80">{s.items.map((it, k) => <li key={it}>{it}{k < s.items!.length - 1 && <span className="ml-2 text-cyan">•</span>}</li>)}</ul>}
        {s.href && <span className="mt-3 inline-block text-[11px] tracking-[0.2em] text-cyan font-semibold">EXPLORE →</span>}
      </div>
    </div>
  );
  return (
    <motion.article style={still ? { opacity: 1, scale: 1, boxShadow: "none" } : { opacity, scale, boxShadow: shadow }} className={`relative shrink-0 basis-[82%] sm:basis-[60%] lg:basis-auto lg:h-full lg:min-h-0 overflow-hidden ${flush ? "" : "rounded-xl glass"}`}>
      {s.href ? <Link href={s.href} className="block lg:h-full">{inner}</Link> : inner}
    </motion.article>
  );
}

function Marker({ s, i, n, progress, reduce, litFirst }: { s: Stage; i: number; n: number; progress: MotionValue<number>; reduce: boolean; litFirst?: boolean }) {
  const [a0, b0] = thresholds(i, n);
  const [a, b] = [a0, b0];
  const stillOn = reduce || (litFirst && i === 0);
  const on = useTransform(progress, [a, b], [0, 1]);
  const bg = useTransform(on, (v) => (v > 0.5 ? "#22d3d3" : "rgba(255,255,255,0.25)"));
  const glow = useTransform(on, (v) => `0 0 ${10 * v}px #22d3d3`);
  return (
    <div className="relative flex items-center justify-center" aria-label={s.title}>
      <motion.span style={stillOn ? { background: "#22d3d3", boxShadow: "0 0 10px #22d3d3" } : { background: bg, boxShadow: glow }} className="h-3 w-3 rounded-full" />
    </div>
  );
}
