"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { title: string; ages: string; href: string; image: string; alt: string; programmes: string[] };

// Wavy accordion (after osmo.supply "Wavy Accordion"): panel sizes follow springs, and each panel's edges
// bow like a stretched membrane in proportion to how fast it is growing or shrinking, then settle straight.
const OPEN = 5;          // open panel is OPEN× a closed one
const GAP = 8;           // px between panels
const BOW = 46;          // max edge bow in px
const RADIUS = 16;
const K = 150, C = 19;   // size spring (slightly under-damped → small overshoot)
const BK = 260, BC = 18; // bend spring
const BEND_FACTOR = 0.035;

type Sim = { s: number; v: number; b: number; bv: number };

export default function WavyAccordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const panelEls = useRef<(HTMLAnchorElement | null)[]>([]);
  const clipEls = useRef<(HTMLDivElement | null)[]>([]);
  const dimEls = useRef<(HTMLDivElement | null)[]>([]);
  const sim = useRef<Sim[]>(items.map((_, i) => ({ s: i === 0 ? OPEN : 1, v: 0, b: 0, bv: 0 })));
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [vertical, setVertical] = useState(false);
  const verticalRef = useRef(false);
  const raf = useRef<number | null>(null);
  const last = useRef(0);
  const reduce = useRef(false);
  const pressed = useRef(false); // focus caused by a tap/click, not keyboard

  const paint = useCallback(() => {
    const el = wrap.current; if (!el) return;
    const v = verticalRef.current;
    const main = v ? el.clientHeight : el.clientWidth;
    const cross = v ? el.clientWidth : el.clientHeight;
    const avail = main - GAP * (items.length - 1);
    const sum = sim.current.reduce((a, p) => a + p.s, 0);
    sim.current.forEach((p, i) => {
      const size = (p.s / sum) * avail;
      const panel = panelEls.current[i]; const clip = clipEls.current[i]; const dim = dimEls.current[i];
      if (panel) panel.style.flexGrow = String(p.s);
      if (clip) clip.style.clipPath = `path("${shape(size, cross, p.b, v)}")`;
      if (dim) dim.style.opacity = String(0.62 - 0.5 * Math.min(1, Math.max(0, (p.s - 1) / (OPEN - 1))));
    });
  }, [items.length]);

  const tickRef = useRef<(t: number) => void>(() => {});
  useEffect(() => { tickRef.current = (t: number) => {
    const dt = Math.min(0.032, last.current ? (t - last.current) / 1000 : 0.016); last.current = t;
    const el = wrap.current; if (!el) return;
    const main = verticalRef.current ? el.clientHeight : el.clientWidth;
    const avail = main - GAP * (items.length - 1);
    const sum = sim.current.reduce((a, p) => a + p.s, 0);
    let moving = false;
    sim.current.forEach((p, i) => {
      const target = i === activeRef.current ? OPEN : 1;
      if (reduce.current) { p.s = target; p.v = 0; p.b = 0; p.bv = 0; return; }
      const a = -K * (p.s - target) - C * p.v; p.v += a * dt; p.s += p.v * dt;
      const pxVel = (p.v / sum) * avail; // growth speed in px/s
      const bt = Math.max(-BOW, Math.min(BOW, pxVel * BEND_FACTOR));
      const ba = -BK * (p.b - bt) - BC * p.bv; p.bv += ba * dt; p.b += p.bv * dt;
      if (Math.abs(p.v) > 0.002 || Math.abs(p.s - target) > 0.002 || Math.abs(p.b) > 0.15 || Math.abs(p.bv) > 0.5) moving = true;
      else { p.s = target; p.v = 0; p.b = 0; p.bv = 0; }
    });
    paint();
    raf.current = moving ? requestAnimationFrame((n) => tickRef.current(n)) : null;
    if (!moving) last.current = 0;
  }; }, [items.length, paint]);

  const kick = useCallback(() => { if (raf.current == null) { last.current = 0; raf.current = requestAnimationFrame((n) => tickRef.current(n)); } }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => { verticalRef.current = mq.matches; setVertical(mq.matches); requestAnimationFrame(paint); };
    onMq(); mq.addEventListener("change", onMq);
    const ro = new ResizeObserver(() => paint()); if (wrap.current) ro.observe(wrap.current);
    paint();
    return () => { mq.removeEventListener("change", onMq); ro.disconnect(); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [paint]);

  const open = (i: number) => { if (activeRef.current === i) return; activeRef.current = i; setActive(i); kick(); };

  return (
    <div ref={wrap} className={cn("flex gap-2 h-[40rem] md:h-[34rem] lg:h-[36rem] flex-col md:flex-row", className)} onPointerDown={() => { pressed.current = true; }}>
      {items.map((it, i) => {
        const isOpen = active === i;
        return (
          <Link
            key={it.title}
            href={it.href}
            ref={(n) => { panelEls.current[i] = n; }}
            onPointerEnter={(e) => { if (e.pointerType === "mouse") open(i); }}
            onFocus={() => { if (!pressed.current) open(i); }}
            onClick={(e) => { pressed.current = false; if (activeRef.current !== i) { e.preventDefault(); open(i); } }}
            aria-expanded={isOpen}
            className={cn("group relative block min-w-0 min-h-0 basis-0 outline-none", isOpen ? "z-10" : "z-0")}
            style={{ flexGrow: i === 0 ? OPEN : 1 }}
          >
            {/* clipped image layer: extends BOW px past the panel on the moving axis so edges can bow outward */}
            <div ref={(n) => { clipEls.current[i] = n; }} className="absolute" style={vertical ? { left: 0, right: 0, top: -BOW, bottom: -BOW } : { top: 0, bottom: 0, left: -BOW, right: -BOW }}>
              <Image src={it.image} alt={it.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div ref={(n) => { dimEls.current[i] = n; }} className="absolute inset-0 bg-ink" style={{ opacity: i === 0 ? 0.12 : 0.62 }} />
            </div>

            {/* closed label */}
            <div className={cn("pointer-events-none absolute transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100",
              vertical ? "left-4 top-1/2 -translate-y-1/2" : "bottom-6 left-1/2 -translate-x-1/2")}>
              <div className={cn("flex items-center gap-3 whitespace-nowrap", !vertical && "[writing-mode:vertical-rl] rotate-180")}>
                <span className="display text-2xl md:text-3xl">{it.title}</span>
                <span className="text-[10px] tracking-[0.2em] text-cyan">{it.ages.toUpperCase()}</span>
              </div>
            </div>

            {/* open content */}
            <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7 transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)]",
              isOpen ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-4")}>
              <div className="text-[11px] tracking-[0.25em] text-cyan">CLASSES FOR · {it.ages.toUpperCase()}</div>
              <h3 className="display text-4xl sm:text-5xl lg:text-6xl leading-none mt-2">{it.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5 max-w-xl">
                {it.programmes.map((p) => <li key={p} className="rounded-full border border-white/25 bg-black/30 backdrop-blur px-2.5 py-1 text-[11px] text-white/85">{p}</li>)}
              </ul>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-cyan">EXPLORE CLASSES <ArrowRight size={14} /></span>
            </div>

            <div className={cn("pointer-events-none absolute inset-0 rounded-2xl ring-1 transition-colors", isOpen ? "ring-cyan/50" : "ring-white/10 group-focus-visible:ring-cyan")} />
          </Link>
        );
      })}
    </div>
  );
}

// Rounded rect whose two moving edges bow by `b` px (positive = outward). Coordinates are inside the clip layer,
// which is BOW px larger than the panel on each side of the moving axis.
function shape(size: number, cross: number, b: number, vertical: boolean) {
  const r = Math.min(RADIUS, size / 2, cross / 2);
  const a0 = BOW, a1 = BOW + size; // moving-axis edges
  const m = cross / 2, d = 2 * b;  // quadratic control at 2b gives a peak of b
  if (!vertical) {
    return `M${a0 + r},0 L${a1 - r},0 Q${a1},0 ${a1},${r} Q${a1 + d},${m} ${a1},${cross - r} Q${a1},${cross} ${a1 - r},${cross} L${a0 + r},${cross} Q${a0},${cross} ${a0},${cross - r} Q${a0 - d},${m} ${a0},${r} Q${a0},0 ${a0 + r},0 Z`;
  }
  return `M0,${a0 + r} Q0,${a0} ${r},${a0} Q${m},${a0 - d} ${cross - r},${a0} Q${cross},${a0} ${cross},${a0 + r} L${cross},${a1 - r} Q${cross},${a1} ${cross - r},${a1} Q${m},${a1 + d} ${r},${a1} Q0,${a1} 0,${a1 - r} Z`;
}
