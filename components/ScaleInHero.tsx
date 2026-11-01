"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Words } from "@/components/ui";

// After osmo's "Scaling element on scroll with Flip": a small 16:9 image sits under the heading; as the
// visitor scrolls it grows, scrubbed to the scrollbar, until it fills the whole viewport. The heading
// fades out as the image takes over, and the CTAs fade in on top. No pin gaps — content continues after.
const DIMS_Q = () => `${window.innerWidth}x${window.innerHeight}`;
const sub = (cb: () => void) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function ScaleInHero({ eyebrow, title, sub: subtitle, image, alt, logo, youtube, video, children }: { eyebrow: string; title: string; sub?: string; image: string; alt: string; logo?: string; youtube?: string; video?: string; children?: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const dims = useSyncExternalStore(sub, DIMS_Q, () => "1440x900");
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  const apply = useCallback((p: number) => {
    const [vw, vh] = dims.split("x").map(Number);
    const t = reduce ? 1 : clamp01(p);
    const w0 = Math.min(380, vw * 0.74), h0 = (w0 * 9) / 16;
    const top0 = Math.min(vh * 0.6, vh - h0 - 24);
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOut for size
    const b = box.current, h = head.current, c = cta.current;
    if (b) {
      b.style.width = `${lerp(w0, vw, e)}px`;
      b.style.height = `${lerp(h0, vh, e)}px`;
      b.style.top = `${lerp(top0, 0, e)}px`;
      b.style.borderRadius = `${lerp(16, 0, clamp01(t / 0.85))}px`;
    }
    if (h) { const f = 1 - clamp01(t / 0.45); h.style.opacity = String(f); h.style.transform = `translateY(${(1 - f) * -40}px)`; }
    if (c) { const f = clamp01((t - 0.7) / 0.3); c.style.opacity = String(f); c.style.transform = `translateY(${(1 - f) * 24}px)`; c.style.pointerEvents = f > 0.6 ? "auto" : "none"; }
  }, [dims, reduce]);

  useMotionValueEvent(scrollYProgress, "change", apply);
  useEffect(() => { apply(scrollYProgress.get()); }, [apply, scrollYProgress]);

  return (
    <section ref={section} className={reduce ? "relative h-[100svh]" : "relative h-[230svh]"}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        <div className="absolute inset-0 spotlight" />
        {logo && <div className="absolute right-4 sm:right-8 lg:right-10 top-24 lg:top-28 z-30 h-16 sm:h-20 lg:h-24 w-24 sm:w-32 lg:w-40 flex items-start justify-end"><Image src={logo} alt="" width={320} height={320} className="max-h-full w-auto object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,.7)]" /></div>}

        {/* heading — fades as the image grows */}
        <div ref={head} className="absolute inset-x-0 top-[22svh] sm:top-[20svh] z-10 px-4 text-center will-change-transform">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="display mx-auto mt-3 max-w-5xl text-[2.6rem] leading-[0.92] sm:text-6xl lg:text-7xl"><Words>{title}</Words></h1>
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-white/80">{subtitle}</p>}
          <div className="mt-6 text-[10px] tracking-[0.3em] text-white/40">SCROLL</div>
        </div>

        {/* the scaling image */}
        <div ref={box} className="absolute left-1/2 -translate-x-1/2 overflow-hidden bg-ink-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] will-change-[width,height,top]" style={{ width: 380, height: 214, top: "60svh", borderRadius: 16 }}>
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
          {video && !reduce && <video src={video} poster={image} autoPlay muted loop playsInline preload="auto" aria-hidden className="absolute inset-0 h-full w-full object-cover" />}
          {youtube && !video && !reduce && (
            // muted, looping, no controls — the poster above shows until the player paints
            <iframe
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ width: "max(100%, 177.78vh)", height: "max(100%, 56.25vw)", aspectRatio: "16 / 9", transform: "translate(-50%, -50%) scale(1.28)" }}
              src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&mute=1&loop=1&playlist=${youtube}&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=12`}
              title={alt} allow="autoplay; encrypted-media" aria-hidden tabIndex={-1} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          {/* CTAs — appear once the image is (nearly) full screen */}
          <div ref={cta} className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14 opacity-0 will-change-transform">
            <div className="container-x !px-0">
              <div className="eyebrow">{eyebrow}</div>
              <div className="display mt-2 text-4xl sm:text-5xl lg:text-6xl max-w-3xl"><Words>{title}</Words></div>
              {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
