"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, Ticket, User, X } from "lucide-react";
import type { Instructor } from "@/content/instructors";
import { BOOK_TRIAL_URL } from "@/content/site";
import { youtubeId } from "@/lib/utils";

// Grid of instructor cards. Clicking one opens a pop-up with their photo (or video, when there is one),
// a short write-up and the same actions as the carousel.
export default function InstructorGrid({ list }: { list: Instructor[] }) {
  const [open, setOpen] = useState<Instructor | null>(null);
  return (
    <>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {list.map((p) => (
          <button key={p.slug} type="button" onClick={() => setOpen(p)} className="group overflow-hidden border border-line bg-ink-3 text-left transition-colors hover:border-white/50" aria-label={`About ${p.name}`}>
            <div className="relative aspect-square"><Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="p-3">
              <div className="font-semibold text-sm">{p.name}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-white/55">{p.role}</div>
            </div>
          </button>
        ))}
      </div>
      <InstructorModal p={open} onClose={() => setOpen(null)} />
    </>
  );
}

export function InstructorModal({ p, onClose }: { p: Instructor | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [p, onClose]);
  if (!p) return null;
  const yt = youtubeId(p.video);
  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="instructor-name">
      <div className="absolute inset-0 bg-black/80 animate-[fadeIn_.25s_ease-out]" onClick={onClose} />
      <div className="relative grid max-h-[92svh] w-full max-w-[860px] overflow-y-auto border border-white/12 bg-[#0b0d10] shadow-2xl shadow-black/80 md:grid-cols-[0.9fr_1fr] animate-[popIn_.4s_cubic-bezier(.22,1,.36,1)]">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[520px] bg-ink-3">
          {p.video ? (
            yt ? <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&rel=0`} title={p.name} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
               : <video className="absolute inset-0 h-full w-full object-cover" src={p.video} poster={p.image} autoPlay muted loop playsInline controls />
          ) : (
            <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-top" />
          )}
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{p.role}</div>
          <h2 id="instructor-name" className="mt-2 font-display text-[1.75rem] sm:text-3xl font-semibold leading-tight tracking-[-0.02em]">{p.name}</h2>
          {p.specialities && <div className="mt-4 flex flex-wrap gap-1.5">{p.specialities.map((s) => <span key={s} className="border border-white/25 px-2 py-0.5 text-[11px] text-white/80">{s}</span>)}</div>}
          {p.bio
            ? <p className="mt-5 text-[15px] leading-relaxed text-white/75">{p.bio}</p>
            : <p className="mt-5 text-[14px] italic leading-relaxed text-white/40">Write-up coming soon.</p>}
          <div className="mt-auto grid gap-2 pt-8">
            <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-primary w-full"><Ticket size={14} /><span className="btn-label" data-text="Book a trial"><span>Book a trial</span></span></a>
            <div className="grid grid-cols-2 gap-2">
              <a href="/allclasses-schedule" className="btn btn-outline w-full !px-2"><CalendarDays size={14} /><span className="btn-label" data-text="See classes"><span>See classes</span></span></a>
              <a href="/contact" className="btn btn-outline w-full !px-2"><User size={14} /><span className="btn-label" data-text="Enquire"><span>Enquire</span></span></a>
            </div>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-ink/60 text-white/80 hover:text-white"><X size={20} /></button>
      </div>
    </div>
  );
}
