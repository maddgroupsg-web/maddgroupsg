"use client";
import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Stage = { n: string; title: string; copy: string };
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const RISE = 72; // px each step climbs on desktop
const STEP = 0.2; // share of the scroll run each step takes

// Desktop only: lg and up. Below that the stairs stack and reveal on view instead of scrubbing.
const mq = "(min-width: 1024px)";
function subscribe(cb: () => void) { const m = window.matchMedia(mq); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); }
function useDesktop() { return useSyncExternalStore(subscribe, () => window.matchMedia(mq).matches, () => false); }

// The four DSA stages as a staircase: stage one sits lowest on the left, stage four highest on the right.
// On desktop the stairs pin while you scroll and build step by step with the scroll position (scrub back and they
// sink again). On smaller screens they stack and fade in one by one.
export default function StairStages({ stages, images }: { stages: Stage[]; images: string[] }) {
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  const scrub = desktop && !reduce;
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.8", "end end"] });
  return (
    <div ref={wrap} className={scrub ? "relative lg:h-[260vh]" : ""}>
      <div className={scrub ? "lg:sticky lg:top-28" : ""}>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-0">
          {stages.map((s, i) => <Step key={s.n} s={s} i={i} image={images[(i + 1) % images.length]} progress={scrollYProgress} scrub={scrub} reduce={!!reduce} />)}
        </div>
      </div>
    </div>
  );
}

function Step({ s, i, image, progress, scrub, reduce }: { s: Stage; i: number; image: string; progress: MotionValue<number>; scrub: boolean; reduce: boolean }) {
  const a = 0.06 + i * STEP; // this step starts rising
  const b = a + 0.16; // fully up
  const opacity = useTransform(progress, [a, b], [0, 1]);
  const y = useTransform(progress, [a, b], [72, 0]);
  const filter = useTransform(progress, [a, b], ["blur(10px)", "blur(0px)"]);
  const riserScale = useTransform(progress, [a + 0.08, b + 0.1], [0, 1]);
  const riserOpacity = useTransform(progress, [a + 0.08, a + 0.14], [0, 1]);
  const riser = i * RISE;
  const view = scrub ? {} : { initial: reduce ? false : { opacity: 0, y: 56, filter: "blur(8px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 0.8, delay: i * 0.22, ease: EASE } };
  return (
    <div className="flex flex-col justify-end lg:px-1.5">
      <motion.div className="relative overflow-hidden rounded-xl border border-line min-h-[360px] group text-center" style={scrub ? { opacity, y, filter } : undefined} {...view}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
        <div aria-hidden className="absolute right-4 top-2 display text-[7rem] leading-none text-white/[0.07] select-none">{i + 1}</div>
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-end">
          <div className="eyebrow">{s.n}</div>
          <h3 className="display text-3xl mt-1">{s.title}</h3>
          <p className="mt-2 text-sm text-white/80 max-w-[30ch]">{s.copy}</p>
        </div>
      </motion.div>
      {/* riser under each step (desktop only) so the four cards read as stairs */}
      {riser > 0 && (
        <motion.div
          aria-hidden
          className="hidden lg:block origin-bottom border-x border-b border-line bg-white/[0.03]"
          style={scrub ? { height: riser, scaleY: riserScale, opacity: riserOpacity } : { height: riser }}
          {...(scrub ? {} : { initial: reduce ? false : { scaleY: 0, opacity: 0 }, whileInView: { scaleY: 1, opacity: 1 }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 0.7, delay: i * 0.22 + 0.25, ease: EASE } })}
        />
      )}
    </div>
  );
}
