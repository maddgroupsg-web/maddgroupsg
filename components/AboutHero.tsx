"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { maddGroup } from "@/content/home";
import { byId } from "@/content/videos";
import { toSentence } from "@/lib/utils";

// About page hero: The MADD Group's four pillars as a full-screen slideshow. Each pillar plays a performance clip,
// with its name and line bottom-left, a counter and progress line under it, and the other pillars as 16:9
// thumbnails bottom-right. It moves on by itself; the page below scrolls as normal.
const HOLD = 6500; // ms per pillar
const clips: Record<string, string> = {
  LEARN: "mj-2025-dap-c",
  ACHIEVE: "mts-2026-34-mixxie",
  CREATE: "rec-2026-kstars-hot-sauce",
  LAUNCH: "mj-2025-maddartistes",
};
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutHero() {
  const reduce = useReducedMotion();
  const pillars = maddGroup.pillars;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % pillars.length), HOLD);
    return () => clearTimeout(t);
  }, [i, reduce, pillars.length]);

  const p = pillars[i];
  const v = byId(clips[p.verb]);
  const others = pillars.map((q, k) => ({ q, k })).filter(({ k }) => k !== i);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink" aria-label="The MADD Group">
      <AnimatePresence initial={false}>
        <motion.div key={p.verb} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeInOut" }}>
          <Image src={v.poster} alt="" fill priority sizes="100vw" className="object-cover" />
          <video src={v.loop} poster={v.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-between pt-32 pb-10 lg:pb-14">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">The MADD Group<span className="hidden sm:inline"> · Four pillars, one ecosystem</span></div>

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={p.verb} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
                <div className="flex items-center gap-3">
                  <Image src={p.logo} alt="" width={120} height={120} className="h-9 w-auto object-contain" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75">{p.name}</span>
                </div>
                <h1 className="mt-4 font-display text-[clamp(3.5rem,2rem+6vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{toSentence(p.verb)}</h1>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">{p.copy}</p>
                <Link href={p.href} className="mt-5 inline-block text-[14px] font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">Explore {toSentence(p.name)}</Link>
              </motion.div>
            </AnimatePresence>
            {/* counter and progress line */}
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[13px] tabular-nums text-white/85">{String(i + 1).padStart(2, "0")} <span className="text-white/40">/ {String(pillars.length).padStart(2, "0")}</span></span>
              <div className="relative h-px w-40 bg-white/20">
                <motion.div key={i} className="absolute inset-y-0 left-0 bg-white" initial={{ width: "0%" }} animate={{ width: reduce ? "100%" : "100%" }} transition={{ duration: reduce ? 0 : HOLD / 1000, ease: "linear" }} />
              </div>
            </div>
          </div>

          {/* the other three pillars, 16:9 */}
          <div className="grid grid-cols-3 items-start gap-3 lg:w-[540px]">
            {others.map(({ q, k }) => (
              <button key={q.verb} type="button" onClick={() => setI(k)} className="group block w-full text-left" aria-label={`Show ${toSentence(q.verb)}`}>
                <div className="relative aspect-video overflow-hidden border border-white/15 transition-colors group-hover:border-white/60">
                  <Image src={byId(clips[q.verb]).poster} alt="" fill sizes="180px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/0" />
                </div>
                <div className="mt-2 text-[13px] font-medium text-white/85">{toSentence(q.verb)}</div>
                <div className="hidden sm:block text-[10.5px] uppercase tracking-[0.12em] text-white/45">{q.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
