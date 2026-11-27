"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Mic, Music2, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { instructors, type Instructor } from "@/content/instructors";
import { cn } from "@/lib/utils";

const filters = [{ key: "vocal", label: "Vocal", icon: Mic }, { key: "dance", label: "Dance", icon: Music2 }] as const;
const EVERY = 4000; // ms between automatic moves

// Instructors as a centred carousel of tall portrait cards. The middle card is in full colour; the cards either
// side are greyed and dimmed. It glides on by itself, pauses on hover, and the arrows sit underneath.
export default function InstructorCarousel() {
  const params = useSearchParams();
  const wanted = params.get("d") === "dance" ? "dance" : "vocal";
  // the URL (?d=vocal|dance) picks the discipline; the toggle can override it until the URL changes again
  const [pick, setPick] = useState<{ when: string; val: (typeof filters)[number]["key"] } | null>(null);
  const filter = pick && pick.when === wanted ? pick.val : wanted;
  const list = instructors.filter((i) => i.discipline === filter);

  const [ref, api] = useEmblaCarousel({ loop: true, align: "center", duration: 38 });
  const [sel, setSel] = useState(0);
  const [hold, setHold] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { if (!api) return; const f = () => setSel(api.selectedScrollSnap()); api.on("select", f); f(); return () => { api.off("select", f); }; }, [api]);
  useEffect(() => { api?.reInit(); api?.scrollTo(0, true); }, [filter, api]);
  useEffect(() => {
    if (!api || hold || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => api.scrollNext(), EVERY);
    return () => clearInterval(t);
  }, [api, hold, paused]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div>
      <div className="flex justify-center">
        <div role="tablist" aria-label="Filter instructors" className="flex border border-white/15 p-1">
          {filters.map((f) => (
            <button key={f.key} role="tab" aria-selected={filter === f.key} onClick={() => setPick({ when: wanted, val: f.key })}
              className={cn("flex items-center gap-2 px-5 py-2 text-[13px] font-medium transition-colors", filter === f.key ? "bg-white text-ink" : "text-white/70 hover:text-white")}>
              <f.icon size={14} />{f.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="mt-12 overflow-hidden cursor-grab active:cursor-grabbing" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        <div className="flex touch-pan-y">
          {list.map((p, i) => <Card key={p.slug} p={p} active={i === sel} onPick={() => api?.scrollTo(i)} paused={paused} onPause={() => setPaused((v) => !v)} />)}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button onClick={prev} aria-label="Previous instructor" className="flex h-12 w-12 items-center justify-center bg-white/[0.07] text-white transition-colors hover:bg-white hover:text-ink"><ArrowLeft size={18} /></button>
        <button onClick={next} aria-label="Next instructor" className="flex h-12 w-12 items-center justify-center bg-white/[0.07] text-white transition-colors hover:bg-white hover:text-ink"><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

function Card({ p, active, onPick, paused, onPause }: { p: Instructor; active: boolean; onPick: () => void; paused: boolean; onPause: () => void }) {
  const mp4 = p.video && !/youtu/.test(p.video) ? p.video : null;
  return (
    <div className="min-w-0 shrink-0 grow-0 basis-[72%] sm:basis-[44%] lg:basis-[30%] xl:basis-[26%] px-2 sm:px-3">
      <div onClick={active ? undefined : onPick}
        className={cn("group relative aspect-[3/4.3] overflow-hidden bg-ink-3 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]", active ? "scale-100 opacity-100" : "scale-[0.93] opacity-45 grayscale cursor-pointer hover:opacity-70")}
        onMouseEnter={(e) => { if (active) e.currentTarget.querySelector("video")?.play().catch(() => {}); }}
        onMouseLeave={(e) => { const v = e.currentTarget.querySelector("video"); if (v) { v.pause(); v.currentTime = 0; } }}>
        <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 30vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
        {mp4 && <video src={mp4} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        {active && (
          <button type="button" onClick={onPause} aria-label={paused ? "Play carousel" : "Pause carousel"} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-ink/50 text-white/80 backdrop-blur-sm hover:text-white">
            {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
          </button>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">{p.role}</div>
          <div className="mt-2 font-display text-2xl sm:text-[1.7rem] font-semibold leading-tight tracking-[-0.02em]">{p.name}</div>
          {active && p.specialities && <div className="mt-3 flex flex-wrap justify-center gap-1.5">{p.specialities.map((s) => <span key={s} className="border border-white/25 px-2 py-0.5 text-[11px] text-white/80">{s}</span>)}</div>}
        </div>
      </div>
    </div>
  );
}
