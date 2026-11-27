"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredVideos, type Vid } from "@/content/videos";
import { Reveal, SectionHeading } from "@/components/ui";
import VideoPlayerModal from "@/components/VideoPlayerModal";

// Homepage: a horizontally scrolling row of performance videos. Hover plays the silent loop; click opens the full video.
export default function VideoCarousel() {
  const [open, setOpen] = useState<Vid | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const pos = useRef(0);       // the auto-scroll loop's position; the arrows move this so the two never fight
  const scroll = (dir: number) => { const el = scroller.current; if (!el) return; const card = el.querySelector<HTMLElement>("[data-card]"); const half = el.scrollWidth / 2; pos.current = (pos.current + dir * ((card?.offsetWidth ?? 420) + 16) + half) % half; el.scrollTo({ left: pos.current, behavior: "smooth" }); paused.current = true; setTimeout(() => { paused.current = false; }, 900); };

  // continuous auto-scroll; content is doubled so it wraps seamlessly. Pauses on hover/touch and while the player is open.
  useEffect(() => {
    const el = scroller.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, last = performance.now(); pos.current = el.scrollLeft;
    const SPEED = 40; // px per second
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      const half = el.scrollWidth / 2;
      if (!paused.current && !open) {
        pos.current += SPEED * dt;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      } else { pos.current = el.scrollLeft; if (pos.current >= half) { pos.current -= half; el.scrollLeft = pos.current; } }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);
  return (
    <section className="relative py-20 lg:py-28 bg-ink-2 border-y border-line overflow-hidden">
      <div className="container-x">
        <Reveal><SectionHeading align="center" title="On stage. In the studio." sub="Recitals, competitions and recording sessions. Click any performance to watch it in full." /></Reveal>
      </div>
      <div ref={scroller} id="video-scroller" className="mt-12 flex gap-4 overflow-x-auto hide-scrollbar px-4 lg:px-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] pb-2"
        onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} onTouchStart={() => { paused.current = true; }} onTouchEnd={() => { setTimeout(() => { paused.current = false; }, 2500); }}>
        {[...featuredVideos, ...featuredVideos].map((v, i) => <VideoCard key={`${v.slug}-${i}`} v={v} onOpen={() => setOpen(v)} hidden={i >= featuredVideos.length} />)}
      </div>
      <div className="container-x mt-10 flex items-center justify-center gap-3">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="flex h-12 w-12 items-center justify-center border border-white/25 text-white hover:bg-white hover:text-ink transition-colors"><ArrowLeft size={18} /></button>
        <Link href="/performances" className="btn btn-primary"><span className="btn-label" data-text="All performances"><span>All performances</span></span></Link>
        <button onClick={() => scroll(1)} aria-label="Next" className="flex h-12 w-12 items-center justify-center border border-white/25 text-white hover:bg-white hover:text-ink transition-colors"><ArrowRight size={18} /></button>
      </div>
      <VideoPlayerModal video={open} onClose={() => setOpen(null)} />
    </section>
  );
}

// Portrait performance card: event and style top-left, an arrow top-right, title and crew bottom-left.
// Hover plays the silent loop; click opens the full video.
export function VideoCard({ v, onOpen, className = "", hidden }: { v: Vid; onOpen: () => void; className?: string; hidden?: boolean }) {
  return (
    <button data-card onClick={onOpen} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined} aria-label={`Watch ${v.title}`} className={`group relative shrink-0 w-[72vw] sm:w-[42vw] lg:w-[25vw] xl:w-[22vw] aspect-[3/4] overflow-hidden border border-white/10 bg-ink-3 text-left ${className}`}
      onMouseEnter={(e) => { const vid = e.currentTarget.querySelector("video"); vid?.play().catch(() => {}); }} onMouseLeave={(e) => { const vid = e.currentTarget.querySelector("video"); if (vid) { vid.pause(); vid.currentTime = 0; } }}>
      <Image src={v.poster} alt={v.title} fill sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      {v.loop && <video src={v.loop} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/90" />
      <div className="absolute left-4 top-4 text-[12px] leading-snug text-white/85">
        <div>{v.event}</div>
        <div className="text-white/60">{v.style}</div>
      </div>
      <ArrowUpRight size={20} className="absolute right-4 top-4 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <div className="font-display text-xl lg:text-2xl font-semibold leading-tight tracking-[-0.02em]">{v.title}</div>
        <div className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-white/65"><Play size={12} fill="currentColor" /> Watch{v.crew && v.crew !== v.title ? ` · ${v.crew}` : ""}</div>
      </div>
    </button>
  );
}
