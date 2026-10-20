"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HOVER_Q = "(hover: hover) and (pointer: fine)";
const subscribeHover = (cb: () => void) => { const mq = window.matchMedia(HOVER_Q); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); };

export type PreviewRow = { title: string; href: string; style: string; ages: string; syllabus: string; images: string[] };

// Table-style list; a photo preview follows the cursor and "plays" through the row's images while hovered.
export default function HoverPreviewList({ rows }: { rows: PreviewRow[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const canHover = useSyncExternalStore(subscribeHover, () => window.matchMedia(HOVER_Q).matches, () => false);
  const target = useRef({ x: 0, y: 0 }); const pos = useRef({ x: 0, y: 0 });
  const preview = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  // cursor follower with easing
  useEffect(() => {
    if (hover === null || !canHover) return;
    pos.current = { ...target.current };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const el = preview.current;
      if (el) el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${(target.current.x - pos.current.x) * 0.04}deg)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [hover, canHover]);

  // play through the images
  useEffect(() => {
    if (hover === null) return;
    const id = setInterval(() => setFrame((f) => f + 1), 650);
    return () => clearInterval(id);
  }, [hover]);

  const row = hover !== null ? rows[hover] : null;

  return (
    <div className="relative" onMouseMove={(e) => { target.current = { x: e.clientX, y: e.clientY }; }}>
      <div className="hidden md:grid grid-cols-[1.6fr_1.4fr_.7fr_1fr_auto] gap-6 px-4 pb-3 text-[10px] tracking-[0.25em] text-white/45">
        <span>PROGRAMME</span><span>STYLE</span><span>AGES</span><span>SYLLABUS</span><span className="w-5" />
      </div>
      <ul className="border-t border-line">
        {rows.map((r, i) => (
          <li key={r.href} className="border-b border-line">
            <Link href={r.href} onMouseEnter={() => { setFrame(0); setHover(i); }} onMouseLeave={() => setHover(null)} onFocus={() => { setFrame(0); setHover(i); }} onBlur={() => setHover(null)}
              className={cn("group grid grid-cols-[1fr_auto] md:grid-cols-[1.6fr_1.4fr_.7fr_1fr_auto] gap-x-6 gap-y-1 items-center px-4 py-5 md:py-6 transition-colors", hover === i ? "bg-white/[0.04]" : "")}>
              <span className={cn("display text-3xl sm:text-4xl md:text-[2.6rem] leading-none transition-transform duration-300", hover === i && "md:translate-x-3 text-cyan")}>{r.title}</span>
              <ArrowRight size={18} className={cn("md:hidden justify-self-end text-cyan transition-transform", hover === i && "translate-x-1")} />
              <span className="col-span-2 md:col-span-1 text-sm text-white/70">{r.style}</span>
              <span className="text-sm text-white/70 hidden md:block">{r.ages}</span>
              <span className="text-sm text-white/70 hidden md:block">{r.syllabus}</span>
              <ArrowRight size={18} className={cn("hidden md:block text-cyan transition-transform", hover === i && "translate-x-1")} />
              {/* phones: inline strip since there is no hover */}
              {!canHover && (
                <div className="col-span-2 mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
                  {r.images.map((src) => <span key={src} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border border-line"><Image src={src} alt="" fill sizes="112px" className="object-cover" /></span>)}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* cursor-following preview */}
      {canHover && (
        <div ref={preview} className={cn("pointer-events-none fixed left-0 top-0 z-40 w-[260px] aspect-[4/5] overflow-hidden rounded-xl bg-ink-3 border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] transition-opacity duration-200", row ? "opacity-100" : "opacity-0")} style={{ transform: "translate3d(-9999px,-9999px,0)" }}>
          {row && (() => { const n = row.images.length, cur = frame % n, prev = (frame - 1 + n) % n; return (
            <>
              <Image key={`p${prev}`} src={row.images[prev]} alt="" fill sizes="260px" className="object-cover" />
              <Image key={`c${frame}`} src={row.images[cur]} alt="" fill sizes="260px" className="object-cover animate-[previewIn_.45s_ease-out]" />
            </>
          ); })()}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.25em] text-white/80">VIEW CLASSES</span>
            <span className="flex gap-1">{row?.images.map((_, k) => <span key={k} className={cn("h-1 w-3 rounded-full", k === frame % (row?.images.length || 1) ? "bg-cyan" : "bg-white/30")} />)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
