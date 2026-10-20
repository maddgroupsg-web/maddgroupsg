"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { mediaLogos } from "@/content/site";

// Two rows of class + performance photos. The wall starts tilted back in 3D and straightens as it scrolls into view;
// the rows also drift in opposite directions.
const ROW_A = [
  { src: "/images/classes/age-3-5/age-3-5-05.jpg", label: "Preschool Sing & Dance", href: "/preschool-classes" },
  { src: "/images/classes/age-6-9/age-6-9-06.jpg", label: "Show Choir", href: "/junior-kids" },
  { src: "/images/classes/age-10-18/age-10-18-07.jpg", label: "K-Pop Crews", href: "/kpop" },
  { src: "/images/classes/age-18-35/age-18-35-02.jpg", label: "Hip Hop", href: "/hiphop" },
  { src: "/images/classes/dsa/dsa-03.jpg", label: "DSA Preparation", href: "/dsaacademy" },
  { src: "/images/classes/holiday-camps/holiday-camps-04.jpg", label: "Holiday Camps", href: "/holiday-camps" },
];
const ROW_B = [
  { src: "/images/achievements/iu-concert.jpg", label: "On stage with IU", href: "/achievements#iu" },
  { src: "/images/classes/age-10-18/age-10-18-01.jpg", label: "Vocals", href: "/singing-classes-singapore" },
  { src: "/images/achievements/rising-voice.jpg", label: "Rising Voice, Shanghai", href: "/achievements#rising-voice" },
  { src: "/images/classes/age-6-9/age-6-9-03.jpg", label: "Junior Kids", href: "/junior-kids" },
  { src: "/images/achievements/genting-gold.jpg", label: "Asia Pacific Arts Festival", href: "/achievements#genting" },
  { src: "/images/classes/age-10-18/age-10-18-02.jpg", label: "Artiste Programme", href: "/idol-training-singapore" },
];

export default function ShowcaseWall() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  // flat diagonal slant (2D) that levels out — no 3D, no vertical drift, so normal scrolling never feels held
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, 0]);

  return (
    <section ref={ref} className="relative pt-14 pb-6 lg:pt-16 lg:pb-10 overflow-hidden">
      <div className="container-x">
        <h2 className="display text-3xl sm:text-4xl lg:text-5xl">AS FEATURED ON LEADING MEDIA PLATFORMS</h2>
      </div>
      <div className="-mx-[8vw] mt-2">
        <motion.div style={reduce ? undefined : { rotate, transformOrigin: "50% 50%" }} className="space-y-4 will-change-transform py-[4vw]">
          {/* media logos ride on the same slanted plane */}
          <div className="marquee relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="marquee-track items-center gap-16 px-8">
              {[...mediaLogos, ...mediaLogos].map((l, i) => (
                <div key={i} className="flex h-16 w-[150px] sm:w-[190px] shrink-0 items-center justify-center">
                  <Image src={l.src} alt={i < mediaLogos.length ? l.name : ""} width={l.w} height={l.h} className="max-h-11 max-w-full w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
          <LoopRow items={ROW_A} dir={-1} still={!!reduce} />
          <LoopRow items={ROW_B} dir={1} still={!!reduce} />
        </motion.div>
      </div>
    </section>
  );
}

// Always-moving row. dir -1 = right→left, 1 = left→right. Scrolling (either way) adds a burst of speed
// in the row's own direction, which eases back to the cruise speed.
const CRUISE = 38;   // px per second
const KICK = 2.2;    // px/s of extra speed per px scrolled
const MAX_BOOST = 220; // px/s cap so fast flicks stay readable
const DRAG = 1.8;    // how fast the burst decays (per second) — slower decay = smoother glide back
function LoopRow({ items, dir, still }: { items: Tile[]; dir: 1 | -1; still: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (still) return;
    let x = 0, boost = 0, last = performance.now(), lastY = window.scrollY, raf = 0;
    const onScroll = () => { const y = window.scrollY; boost = Math.min(MAX_BOOST, boost + Math.min(120, Math.abs(y - lastY)) * KICK); lastY = y; };
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      boost *= Math.exp(-DRAG * dt);
      const el = track.current;
      if (el) {
        const half = el.scrollWidth / 2;
        x -= dir * (CRUISE + boost) * dt; // translate is -x, so dir -1 moves content left
        if (half > 0) { x = ((x % half) + half) % half; }
        el.style.transform = `translate3d(${-x}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [dir, still]);
  return (
    <div className="overflow-hidden">
      <div ref={track} className="flex gap-4 w-max will-change-transform">
        {[...items, ...items].map((t, i) => <TileCard key={i} {...t} hidden={i >= items.length} />)}
      </div>
    </div>
  );
}

type Tile = { src: string; label: string; href: string };

function TileCard({ src, label, href, hidden }: Tile & { hidden?: boolean }) {
  return (
    <Link href={href} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined} className="group relative shrink-0 w-[62vw] sm:w-[38vw] lg:w-[23vw] aspect-[16/11] overflow-hidden rounded-[4px] border border-white/10 bg-ink-3">
      <Image src={src} alt={label} fill sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 23vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
    </Link>
  );
}
