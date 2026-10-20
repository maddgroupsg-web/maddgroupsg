"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page transition into /classes: a 3D helix of class photos (after osmo's "3D Cards Tornado") spins down
// fast across the screen, then dissolves to reveal the Programmes page. Triggered by any link to /classes.
const CARDS = [
  "/images/classes/age-3-5/age-3-5-05.jpg", "/images/classes/age-10-18/age-10-18-09.jpg", "/images/classes/age-6-9/age-6-9-06.jpg",
  "/images/classes/holiday-camps/holiday-camps-04.jpg", "/images/classes/age-18-35/age-18-35-04.jpg", "/images/classes/dsa/dsa-03.jpg",
  "/images/classes/age-6-9/age-6-9-03.jpg", "/images/classes/age-10-18/age-10-18-07.jpg", "/images/classes/age-3-5/age-3-5-01.jpg",
  "/images/classes/holiday-camps/holiday-camps-02.jpg", "/images/classes/age-18-35/age-18-35-02.jpg", "/images/classes/age-6-9/age-6-9-08.jpg",
];
const DECK = [...CARDS, ...CARDS]; // 24 cards × 15° = one full turn, so position and angle wrap seamlessly
const N = DECK.length;
const STEP_DEG = 360 / N;
const ORBIT = 35;               // em (osmo: orbitDepth)
const Y_SPACING = 0.13;         // × card height — tight enough that >1 full turn fits on screen (true tornado look)
const CARD_H_EM = 22.5;         // 18em wide, 4:5
const DURATION = 1900;          // ms
const TURNS = 2.2;              // how many full loops stream past
const MIN_HOLD = 1900;          // ms before we are allowed to reveal the page

// fast start, long settle (spins hard, then comes to rest)
const easeOut = (p: number) => 1 - Math.pow(1 - p, 4);

export default function ProgrammesTransition() {
  const router = useRouter();
  const path = usePathname();
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(false);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const start = useRef(0);
  const raf = useRef<number | null>(null);
  const arrived = useRef(false);
  const pathRef = useRef(path);
  useEffect(() => { pathRef.current = path; }, [path]);

  useEffect(() => { router.prefetch("/classes"); }, [router]);

  // intercept clicks on internal links to /classes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      let url: URL; try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname !== "/classes" || pathRef.current === "/classes") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault(); e.stopPropagation();
      arrived.current = false; setFade(false); setActive(true);
      router.push("/classes");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => { if (active && path === "/classes") arrived.current = true; }, [path, active]);

  useEffect(() => {
    if (!active) return;
    document.documentElement.style.overflow = "hidden";
    start.current = performance.now();
    const frame = (now: number) => {
      const el = stage.current; if (!el) return;
      const elapsed = now - start.current;
      const p = Math.min(1, elapsed / DURATION);
      const t = easeOut(p) * TURNS * N; // fractional card index streamed so far
      const fs = parseFloat(getComputedStyle(el).fontSize) || 12;
      const cardH = CARD_H_EM * fs, spacing = cardH * Y_SPACING, span = N * spacing;
      const vh = el.clientHeight;
      for (let i = 0; i < N; i++) {
        const c = cards.current[i]; if (!c) continue;
        const k = (((i + t) % N) + N) % N;            // 0..N, wraps
        const ang = (k - N / 2) * STEP_DEG;             // deg; front of the helix (0°) sits at the vertical centre
        const rad = (ang * Math.PI) / 180;
        const x = Math.sin(rad) * ORBIT * fs;
        const z = (Math.cos(rad) - 1) * ORBIT * fs;
        const y = k * spacing - span / 2;
        const depth = (1 - Math.cos(rad)) / 2;          // 0 front, 1 back
        const edge = Math.min(1, Math.max(0, 1 - (Math.abs(y) - vh * 0.32) / (vh * 0.3)));
        const scale = 0.55 + 0.45 * edge;
        c.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${ang}deg) scale(${scale})`;
        c.style.filter = `brightness(${1 - 0.72 * depth}) blur(${0.45 * depth * fs}px)`;
        c.style.opacity = String(0.35 + 0.65 * edge);
        c.style.zIndex = String(Math.round((1 - depth) * 100));
      }
      if (p < 1) raf.current = requestAnimationFrame(frame);
      else {
        // hold until the page has arrived, then fade the overlay away
        const check = () => { if (arrived.current && performance.now() - start.current >= MIN_HOLD) setFade(true); else raf.current = requestAnimationFrame(check); };
        check();
      }
    };
    raf.current = requestAnimationFrame(frame);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); document.documentElement.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    if (!fade) return;
    const id = setTimeout(() => { setActive(false); setFade(false); document.documentElement.style.overflow = ""; window.scrollTo(0, 0); }, 650);
    return () => clearTimeout(id);
  }, [fade]);

  if (!active) return null;
  return (
    <div aria-hidden className={`fixed inset-0 z-[95] bg-ink overflow-hidden transition-opacity duration-[650ms] ease-out ${fade ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute inset-0 spotlight opacity-70" />
      <div ref={stage} className="absolute inset-0 flex items-center justify-center" style={{ perspective: "90em", fontSize: "clamp(.55rem, .8vw, 1.5rem)" }}>
        <div className={`relative transition-transform duration-[650ms] ease-out ${fade ? "scale-[1.08]" : "scale-100"}`} style={{ transformStyle: "preserve-3d", width: 0, height: 0, transform: fade ? undefined : "rotateX(-6deg)" }}>
          {DECK.map((src, i) => (
            <div key={i} ref={(n) => { cards.current[i] = n; }} className="absolute overflow-hidden rounded-[1em] bg-ink-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)] will-change-transform"
              style={{ width: "18em", height: `${CARD_H_EM}em`, left: "-9em", top: `-${CARD_H_EM / 2}em` }}>
              <Image src={src} alt="" fill sizes="20vw" className="object-cover" priority />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 text-center text-[11px] tracking-[0.3em] text-cyan/80">PROGRAMMES</div>
    </div>
  );
}
