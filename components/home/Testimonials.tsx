"use client";
import { useEffect, useState } from "react";
import { X, ExternalLink, BadgeCheck, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";
import { reviews, googleProfile, type Review } from "@/content/reviews";
import { contact } from "@/content/site";
import { GoogleG, Stars } from "@/components/GoogleLogo";
import { Reveal } from "@/components/ui";
import { waLink, toSentence } from "@/lib/utils";

// Ron & Rich style: info column on the left, two vertical auto-scrolling columns of review cards on the right.
export default function Testimonials({ heading = "WHAT OUR PARENTS SAY.", eyebrow = "GOOGLE REVIEWS" }: { heading?: string; eyebrow?: string }) {
  const [modal, setModal] = useState(false);
  const colA = reviews.filter((_, i) => i % 2 === 0);
  const colB = reviews.filter((_, i) => i % 2 === 1);
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="container-x relative grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center">
        <Reveal>
          <div className="flex items-center gap-3 text-accent">
            <span className="h-px w-10 bg-accent/70" /><span className="h-1.5 w-1.5 rotate-45 bg-accent" />
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" /><span className="h-px w-10 bg-accent/70" />
          </div>
          <h2 className="display mt-4">{toSentence(heading)}</h2>
          <p className="mt-4 text-mute text-base sm:text-lg leading-relaxed">Verified Google reviews from the parents of the children we train, in their own words.</p>
          <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="mt-8 flex items-center gap-4 w-fit group" aria-label="MADDspace on Google">
            <GoogleG size={44} />
            <div>
              <div className="flex items-center gap-3"><span className="text-4xl font-semibold leading-none tracking-tight">{googleProfile.rating.toFixed(1)}</span><Stars value={googleProfile.rating} size={20} /></div>
              <div className="mt-1 text-[11px] tracking-[0.25em] text-white/60 group-hover:text-white">{googleProfile.count} GOOGLE REVIEWS</div>
            </div>
          </a>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <button onClick={() => setModal(true)} className="btn btn-outline">WRITE A REVIEW</button>
            <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="text-[11px] tracking-[0.25em] text-white/70 hover:text-accent">READ ALL ON GOOGLE ⟶</a>
          </div>
        </Reveal>

        {/* two columns, scrolling in opposite directions; single column on small screens */}
        <div className="relative h-[520px] sm:h-[600px] lg:h-[640px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="grid h-full gap-4 grid-cols-1 sm:grid-cols-2">
            <Column items={colA.length ? colA : reviews} dir="up" />
            <Column items={colB.length ? colB : reviews} dir="down" className="hidden sm:block" />
          </div>
        </div>
      </div>
      {modal && <ReviewModal onClose={() => setModal(false)} />}
    </section>
  );
}

function Column({ items, dir, className = "" }: { items: Review[]; dir: "up" | "down"; className?: string }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className={`review-col ${className}`}>
      <div className={`flex flex-col gap-4 ${dir === "up" ? "review-track-up" : "review-track-down"}`} style={{ animationDuration: `${Math.max(28, items.length * 14)}s` }}>
        {loop.map((r, i) => <Card key={i} r={r} />)}
      </div>
    </div>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <figure className="rounded-xl bg-[#f6f5f2] text-[#15171a] p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-[#15171a] text-white text-sm font-semibold" style={{ borderRadius: 9999 }}>{r.name.charAt(0)}</span>
          <div>
            <div className="flex items-center gap-1 text-sm font-semibold">{r.name}{r.source === "google" && <BadgeCheck size={14} className="text-[#4285F4]" />}</div>
            <div className="text-[11px] text-black/55">{r.source === "google" ? "Google review" : "Parent review"}</div>
          </div>
        </div>
        <GoogleG size={18} />
      </div>
      <div className="mt-3 flex items-center justify-between"><Stars value={r.rating} size={14} />{r.when && <span className="text-[11px] text-black/50">{r.when}</span>}</div>
      <blockquote className="mt-2 text-[13.5px] leading-relaxed text-black/80 line-clamp-5">{r.text}</blockquote>
      <figcaption className="mt-3 flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#1a7f4b] font-semibold"><CheckCircle2 size={12} /> {r.source === "google" ? "VERIFIED GOOGLE REVIEW" : "PARENT REVIEW"}</figcaption>
    </figure>
  );
}

// "How was your experience?" — 4–5 stars go to Google; 1–3 stars send a private message to the team.
function ReviewModal({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = useState(0);
  const [picked, setPicked] = useState(0);
  const [msg, setMsg] = useState("");
  const shown = hover || picked;
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", h); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; }; }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Rate your experience">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-ink-2 border border-line p-7 sm:p-8 shadow-2xl">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-white/60 hover:text-white"><X size={18} /></button>
        <div className="eyebrow">MADDSPACE</div>
        <h3 className="display text-3xl sm:text-4xl mt-2">HOW WAS YOUR EXPERIENCE WITH US?</h3>
        <div className="mt-5 flex items-center gap-1" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Your rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} role="radio" aria-checked={picked === i} aria-label={`${i} star${i > 1 ? "s" : ""}`} onMouseEnter={() => setHover(i)} onClick={() => setPicked(i)} className="p-1 transition-transform hover:scale-110">
              <svg width="38" height="38" viewBox="0 0 24 24" fill={i <= shown ? "#FBBC05" : "none"} stroke={i <= shown ? "#FBBC05" : "rgba(255,255,255,0.4)"} strokeWidth="1.5"><path d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.3 6 20.6l1.3-6.6L2.4 9.4l6.7-.8z" /></svg>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/60">{shown ? ["", "Poor", "Fair", "Good", "Great", "Excellent"][shown] : "Tap a star to rate"}</p>
        {picked >= 4 && (
          <div className="mt-6">
            <p className="text-sm text-white/85">Thank you! Would you share it on Google? It helps other parents find us.</p>
            <a href={googleProfile.writeReviewUrl} target="_blank" rel="noopener" className="btn btn-primary mt-4 w-full"><GoogleG size={16} /> CONTINUE TO GOOGLE <ExternalLink size={14} /></a>
          </div>
        )}
        {picked > 0 && picked < 4 && (
          <div className="mt-6">
            <p className="text-sm text-white/85">We&apos;re sorry it wasn&apos;t a 5-star experience. Tell us what happened and our team will reach out personally.</p>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="What could we have done better?" className="mt-3 w-full rounded-md border border-line bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-accent" />
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <a href={waLink(`Hi MADDspace, I'd like to share some feedback (${picked}/5):\n${msg}`)} target="_blank" rel="noopener" className="btn btn-primary flex-1"><WhatsAppIcon size={16} /> SEND TO MADDSPACE</a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Feedback for MADDspace")}&body=${encodeURIComponent(`Rating: ${picked}/5\n\n${msg}`)}`} className="btn btn-outline flex-1">EMAIL</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
