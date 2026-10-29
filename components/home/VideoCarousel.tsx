"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import { featuredVideos, type Vid } from "@/content/videos";
import { Reveal, SectionHeading } from "@/components/ui";
import VideoPlayerModal from "@/components/VideoPlayerModal";

// Homepage: a horizontally scrolling row of performance videos. Hover plays the silent loop; click opens the full video.
export default function VideoCarousel() {
  const [open, setOpen] = useState<Vid | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const scroll = (dir: number) => { const el = scroller.current; if (!el) return; const card = el.querySelector<HTMLElement>("[data-card]"); el.scrollBy({ left: dir * ((card?.offsetWidth ?? 420) + 16), behavior: "smooth" }); };

  // continuous auto-scroll; content is doubled so it wraps seamlessly. Pauses on hover/touch and while the player is open.
  useEffect(() => {
    const el = scroller.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, last = performance.now(), x = el.scrollLeft;
    const SPEED = 40; // px per second
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      const half = el.scrollWidth / 2;
      if (!paused.current && !open) {
        x += SPEED * dt;
        if (x >= half) x -= half;
        el.scrollLeft = x;
      } else { x = el.scrollLeft; if (x >= half) { x -= half; el.scrollLeft = x; } }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);
  return (
    <section className="relative py-20 lg:py-28 bg-ink-2 border-y border-line overflow-hidden">
      <div className="container-x">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading eyebrow="WATCH" title={<><span className="block">ON STAGE.</span><span className="block text-cyan">IN THE STUDIO.</span></>} sub="Recitals, competitions and recording sessions. Click any performance to watch it in full." />
          <div className="flex items-center gap-3">
            <Link href="/performances" className="hidden lg:inline text-[11px] tracking-[0.25em] text-cyan font-semibold">ALL PERFORMANCES →</Link>
            <button onClick={() => scroll(-1)} aria-label="Previous" className="h-11 w-11 rounded-full border border-cyan/60 text-cyan hover:bg-cyan/10 flex items-center justify-center"><ArrowLeft size={18} /></button>
            <button onClick={() => scroll(1)} aria-label="Next" className="h-11 w-11 rounded-full border border-cyan/60 text-cyan hover:bg-cyan/10 flex items-center justify-center"><ArrowRight size={18} /></button>
          </div>
        </Reveal>
      </div>
      <div ref={scroller} id="video-scroller" className="mt-10 flex gap-4 overflow-x-auto hide-scrollbar px-4 lg:px-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] pb-2"
        onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} onTouchStart={() => { paused.current = true; }} onTouchEnd={() => { setTimeout(() => { paused.current = false; }, 2500); }}>
        {[...featuredVideos, ...featuredVideos].map((v, i) => <VideoCard key={`${v.slug}-${i}`} v={v} onOpen={() => setOpen(v)} hidden={i >= featuredVideos.length} />)}
      </div>
      <div className="container-x mt-4 lg:hidden"><Link href="/performances" className="text-[11px] tracking-[0.25em] text-cyan font-semibold">ALL PERFORMANCES →</Link></div>
      <VideoPlayerModal video={open} onClose={() => setOpen(null)} />
    </section>
  );
}

export function VideoCard({ v, onOpen, className = "", hidden }: { v: Vid; onOpen: () => void; className?: string; hidden?: boolean }) {
  return (
    <button data-card onClick={onOpen} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined} className={`group relative shrink-0 w-[78vw] sm:w-[46vw] lg:w-[30vw] aspect-video overflow-hidden rounded-xl border border-white/10 bg-ink-3 text-left ${className}`}
      onMouseEnter={(e) => { const vid = e.currentTarget.querySelector("video"); vid?.play().catch(() => {}); }} onMouseLeave={(e) => { const vid = e.currentTarget.querySelector("video"); if (vid) { vid.pause(); vid.currentTime = 0; } }}>
      <Image src={v.poster} alt={v.title} fill sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      {v.loop && <video src={v.loop} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan bg-black/40 text-cyan backdrop-blur-sm transition-transform group-hover:scale-110"><Play size={22} className="ml-0.5" fill="currentColor" /></span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-[10px] tracking-[0.25em] text-cyan">{v.event.toUpperCase()}</div>
        <div className="display text-2xl sm:text-3xl leading-none mt-1">{v.title}</div>
        {v.crew && <div className="text-[11px] text-white/70 mt-1">{v.crew}</div>}
      </div>
    </button>
  );
}
