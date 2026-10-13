"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Play, User, CalendarDays, Ticket } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { instructors, type Instructor } from "@/content/instructors";
import { BOOK_TRIAL_URL } from "@/content/site";
import { cn, youtubeId } from "@/lib/utils";

const filters = [{ key: "all", label: "ALL" }, { key: "vocal", label: "VOCAL" }, { key: "dance", label: "DANCE" }] as const;

export default function InstructorCarousel({ initial = "all" }: { initial?: "all" | "vocal" | "dance" }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>(initial);
  const list = instructors.filter((i) => filter === "all" || i.discipline === filter);
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!api) return; const f = () => { setSel(api.selectedScrollSnap()); setOpen(false); }; api.on("select", f); f(); return () => { api.off("select", f); }; }, [api]);
  useEffect(() => { api?.reInit(); api?.scrollTo(0, true); }, [filter, api]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [prev, next]);

  return (
    <div>
      <div className="flex items-center justify-end gap-6 text-xs tracking-[0.2em]">
        {filters.map((f) => <button key={f.key} onClick={() => setFilter(f.key)} className={cn("pb-1 border-b-2 transition-colors", filter === f.key ? "border-cyan text-cyan" : "border-transparent text-white/60 hover:text-white")}>{f.label}</button>)}
      </div>
      <div ref={ref} className="mt-8 overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex items-center">
          {list.map((p, i) => <Card key={p.slug} p={p} active={i === sel} open={open && i === sel} setOpen={setOpen} onFocusCard={() => api?.scrollTo(i)} />)}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button onClick={prev} aria-label="Previous instructor" className="h-12 w-12 rounded-full border border-cyan/70 text-cyan flex items-center justify-center hover:bg-cyan/10"><ArrowLeft /></button>
        <div className="flex-1 mx-6 relative h-px bg-white/10"><div className="absolute left-0 top-0 h-px bg-cyan shadow-[0_0_8px_#22d3d3] transition-all" style={{ width: `${((sel + 1) / list.length) * 100}%` }} /><div className="absolute left-1/2 -translate-x-1/2 top-3 text-[11px] tracking-[0.25em] text-cyan whitespace-nowrap">DRAG TO MEET THE TEAM ↔</div></div>
        <button onClick={next} aria-label="Next instructor" className="h-12 w-12 rounded-full border border-cyan/70 text-cyan flex items-center justify-center hover:bg-cyan/10"><ArrowRight /></button>
      </div>
    </div>
  );
}

function Card({ p, active, open, setOpen, onFocusCard }: { p: Instructor; active: boolean; open: boolean; setOpen: (v: boolean) => void; onFocusCard: () => void }) {
  const yt = youtubeId(p.video);
  return (
    <div className={cn("shrink-0 px-1.5 sm:px-2 transition-all duration-500", active ? "basis-[86%] sm:basis-[62%] lg:basis-[46%]" : "basis-[58%] sm:basis-[30%] lg:basis-[17%]")}>
      <div onClick={() => (active ? setOpen(!open) : onFocusCard())} onMouseEnter={() => active && setOpen(true)} onMouseLeave={() => setOpen(false)}
        className={cn("relative overflow-hidden rounded-xl border transition-all duration-500 bg-ink-3", active ? "glow-border aspect-[4/5] sm:aspect-[16/11]" : "border-line aspect-[3/4] opacity-70 scale-95 hover:opacity-100")}>
        {/* video / photo */}
        <div className={cn("absolute inset-0 transition-all duration-500", active && open ? "sm:w-[58%]" : "w-full")}>
          {active && open && p.video ? (
            yt ? <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&rel=0&controls=0&loop=1&playlist=${yt}`} title={p.name} allow="autoplay; encrypted-media" />
               : <video className="absolute inset-0 h-full w-full object-cover" src={p.video} autoPlay muted loop playsInline />
          ) : (
            <Image src={p.image} alt={p.name} fill sizes="(max-width: 1024px) 80vw, 46vw" className="object-cover object-top" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>
        {!active && (
          <div className="absolute inset-x-0 bottom-0 p-3"><div className="display text-xl sm:text-2xl leading-none">{p.name}</div><div className="text-[10px] tracking-[0.15em] uppercase text-cyan mt-1">{p.role}</div></div>
        )}
        {active && !open && (
          <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
            <div><div className="display text-4xl sm:text-5xl">{p.name}</div><div className="text-xs tracking-[0.2em] uppercase text-cyan mt-1">{p.role}</div></div>
            <div className="text-[11px] tracking-[0.2em] text-cyan whitespace-nowrap">{p.video ? "HOVER TO WATCH ▶" : "HOVER TO DISCOVER +"}</div>
          </div>
        )}
        {active && open && (
          <div className="absolute inset-y-0 right-0 w-full sm:w-[42%] bg-ink/85 backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-center border-l border-cyan/30">
            <div className="display text-4xl sm:text-5xl">{p.name}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-cyan mt-1">{p.role}</div>
            {p.specialities && <div className="mt-3 flex flex-wrap gap-1.5">{p.specialities.map((s) => <span key={s} className="rounded border border-cyan/40 px-2 py-0.5 text-[10px] tracking-wider text-cyan">{s}</span>)}</div>}
            {!p.video && <p className="mt-3 text-[11px] text-white/60 flex items-center gap-1.5"><Play size={12} className="text-cyan" /> Performance reel coming soon</p>}
            <div className="mt-5 space-y-2">
              <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-primary w-full !py-2.5 text-[11px]"><Ticket size={14} /> BOOK A TRIAL</a>
              <a href="/allclasses-schedule" className="btn btn-outline w-full !py-2.5 text-[11px]"><CalendarDays size={14} /> SEE CLASSES</a>
              <a href="/contact" className="btn btn-outline w-full !py-2.5 text-[11px]"><User size={14} /> ENQUIRE</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
