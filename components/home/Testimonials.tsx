"use client";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, MessageCircle, ExternalLink } from "lucide-react";
import { reviews, googleProfile } from "@/content/reviews";
import { contact } from "@/content/site";
import { GoogleG, GoogleWordmark, Stars } from "@/components/GoogleLogo";
import { SectionHeading } from "@/components/ui";
import { waLink } from "@/lib/utils";

export default function Testimonials({ heading = "PARENTS SAY IT BEST", eyebrow = "GOOGLE REVIEWS" }: { heading?: string; eyebrow?: string }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 6500, stopOnMouseEnter: true, stopOnInteraction: false })]);
  const [idx, setIdx] = useState(0);
  useEffect(() => { if (!api) return; const f = () => setIdx(api.selectedScrollSnap()); api.on("select", f); f(); }, [api]);

  return (
    <section className="relative py-20 lg:py-24 curtain overflow-hidden">
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={heading} sub="Find out why we have over 100 positive reviews on Facebook & Google" />
          {/* Google rating badge */}
          <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="glass rounded-xl px-5 py-4 flex items-center gap-4 hover:border-accent/60 transition-colors w-fit" aria-label="See MADDspace on Google">
            <GoogleG size={34} />
            <div>
              <div className="flex items-center gap-2"><span className="display text-4xl leading-none">{googleProfile.rating.toFixed(1)}</span><Stars value={googleProfile.rating} size={16} /></div>
              <div className="text-[11px] tracking-[0.15em] text-white/60 mt-1">{googleProfile.count} GOOGLE REVIEWS</div>
            </div>
          </a>
        </div>

        {/* review cards */}
        <div className="relative mt-10">
          <div ref={ref} className="overflow-hidden">
            <div className="flex gap-4">
              {reviews.map((r) => (
                <figure key={r.name + r.text.slice(0, 12)} className="shrink-0 basis-[88%] sm:basis-[56%] lg:basis-[38%]">
                  <div className="glass rounded-xl p-6 sm:p-7 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent font-semibold">{r.name.charAt(0)}</span>
                        <div><div className="font-semibold text-sm">{r.name}</div><div className="text-[11px] text-white/50">{r.when || "Parent review"}</div></div>
                      </div>
                      {r.source === "google" ? <GoogleG size={18} /> : <span className="text-[10px] tracking-[0.2em] text-white/40">REVIEW</span>}
                    </div>
                    <Stars value={r.rating} size={15} className="mt-3" />
                    <blockquote className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/85 line-clamp-[9]">{r.text}</blockquote>
                  </div>
                </figure>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-1.5">{reviews.map((_, i) => <button key={i} aria-label={`Review ${i + 1}`} onClick={() => api?.scrollTo(i)} className={`h-1 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-3 bg-white/25"}`} />)}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => api?.scrollPrev()} aria-label="Previous review" className="h-11 w-11 rounded-full border border-accent/60 text-accent hover:bg-accent/10 flex items-center justify-center"><ArrowLeft size={18} /></button>
              <button onClick={() => api?.scrollNext()} aria-label="Next review" className="h-11 w-11 rounded-full border border-accent/60 text-accent hover:bg-accent/10 flex items-center justify-center"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <LeaveReview />
      </div>
    </section>
  );
}

// Star-gated: 4–5 stars → Google review page. 1–3 stars → private feedback to the team (never sent to Google).
function LeaveReview() {
  const [hover, setHover] = useState(0);
  const [picked, setPicked] = useState(0);
  const [msg, setMsg] = useState("");
  const shown = hover || picked;
  const positive = picked >= 4;
  return (
    <div className="mt-12 glass rounded-2xl p-6 sm:p-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <div className="eyebrow">HAD A GREAT EXPERIENCE?</div>
        <h3 className="display text-3xl sm:text-4xl mt-1">RATE YOUR CHILD&apos;S MADDSPACE JOURNEY</h3>
        <div className="mt-4 flex items-center gap-1" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Your rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} role="radio" aria-checked={picked === i} aria-label={`${i} star${i > 1 ? "s" : ""}`} onMouseEnter={() => setHover(i)} onClick={() => setPicked(i)} className="p-1 transition-transform hover:scale-110">
              <svg width="34" height="34" viewBox="0 0 24 24" fill={i <= shown ? "#FBBC05" : "none"} stroke={i <= shown ? "#FBBC05" : "rgba(255,255,255,0.4)"} strokeWidth="1.5"><path d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.3 6 20.6l1.3-6.6L2.4 9.4l6.7-.8z" /></svg>
            </button>
          ))}
          <span className="ml-3 text-xs text-white/60">{shown ? ["", "Poor", "Fair", "Good", "Great", "Excellent"][shown] : "Tap a star"}</span>
        </div>

        {picked > 0 && positive && (
          <div className="mt-5">
            <p className="text-sm text-white/80">Thank you! Would you share it on Google? It helps other parents find us.</p>
            <a href={googleProfile.writeReviewUrl} target="_blank" rel="noopener" className="btn btn-primary mt-3"><GoogleG size={16} /> WRITE A GOOGLE REVIEW <ExternalLink size={14} /></a>
          </div>
        )}
        {picked > 0 && !positive && (
          <div className="mt-5 max-w-xl">
            <p className="text-sm text-white/80">We&apos;re sorry it wasn&apos;t a 5-star experience. Tell us what happened and our team will reach out personally.</p>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="What could we have done better?" className="mt-3 w-full rounded-md border border-line bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-accent" />
            <div className="mt-3 flex flex-wrap gap-3">
              <a href={waLink(`Hi MADDspace, I'd like to share some feedback (${picked}/5):\n${msg}`)} target="_blank" rel="noopener" className="btn btn-primary"><MessageCircle size={16} /> SEND TO OUR TEAM</a>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Feedback for MADDspace")}&body=${encodeURIComponent(`Rating: ${picked}/5\n\n${msg}`)}`} className="btn btn-outline">EMAIL INSTEAD</a>
            </div>
          </div>
        )}
      </div>
      <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-xs text-white/60 hover:text-white justify-self-start lg:justify-self-end" aria-label="See all reviews on Google">
        <GoogleWordmark height={20} /><span>Reviews</span>
      </a>
    </div>
  );
}
