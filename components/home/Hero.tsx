"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/home";
import { kpop, hiphop, singing, dsa } from "@/content/typepages";
import { heroLoops, byId } from "@/content/videos";
import { reviews, googleProfile } from "@/content/reviews";
import { BOOK_TRIAL_URL } from "@/content/site";
import HeroVideo from "@/components/HeroVideo";
import { GoogleG, Stars } from "@/components/GoogleLogo";
import { Button } from "@/components/ui";
import { toSentence } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HOLD = 6500; // ms per headline

// Each headline has its own video. The headline, the video and the review card change together.
const slides = [
  { line: hero.h1, video: heroLoops.home },
  { line: kpop.h1, video: heroLoops.kpop },
  { line: hiphop.h1, video: heroLoops.hiphop },
  { line: singing.h1, video: heroLoops.singing },
  { line: dsa.h1, video: heroLoops.dsa },
];
const quotes = reviews.filter((r) => r.source === "google");

// Starts the text once the intro panels have opened (first visit), or straight away on later visits.
let introOpen = false;
function subscribeIntro(cb: () => void) {
  const on = () => { introOpen = true; cb(); };
  window.addEventListener("madd:intro-open", on);
  const fallback = setTimeout(on, 6000);
  return () => { window.removeEventListener("madd:intro-open", on); clearTimeout(fallback); };
}
function readIntro() {
  if (introOpen) return true;
  try { if (sessionStorage.getItem("madd-intro")) return true; } catch {}
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const useIntroGate = () => useSyncExternalStore(subscribeIntro, readIntro, () => false);

export default function Hero() {
  const reduce = useReducedMotion();
  const go = useIntroGate() || !!reduce;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), HOLD);
    return () => clearInterval(t);
  }, [reduce, paused]);
  const cur = slides[i];
  const v = byId(cur.video);
  const q = quotes[i % quotes.length];

  return (
    <section className="pt-20 lg:pt-24 pb-4">
      <div className="container-x">
        <div className="relative min-h-[82svh] overflow-hidden border border-line bg-ink-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence initial={false}>
            <motion.div key={cur.video} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeInOut" }}>
              <HeroVideo loop={v.loop!} poster={v.poster} alt="MADDspace students performing on stage" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" />

          <div className="relative z-10 flex min-h-[82svh] flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.8, ease: EASE }}>
                <div className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 bg-accent" />{toSentence(hero.eyebrow)}</div>
                <h1 className="display display-hero mt-4 max-w-[17ch]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={i} className="block" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.55, ease: EASE }}>
                      {toSentence(cur.line)}
                    </motion.span>
                  </AnimatePresence>
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">{hero.copy}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={BOOK_TRIAL_URL}>{hero.primary.label}</Button>
                  <Button href={hero.secondary.href} variant="outline">{hero.secondary.label}</Button>
                </div>
                <div className="mt-7 flex gap-1.5" aria-label="Headlines">
                  {slides.map((s, k) => (
                    <button key={s.video} type="button" onClick={() => setI(k)} aria-label={toSentence(s.line)} aria-current={k === i} className={`h-[3px] w-8 transition-colors ${k === i ? "bg-accent" : "bg-white/25 hover:bg-white/50"}`} />
                  ))}
                </div>
              </motion.div>

              {/* trust: Google rating and one review, changing with the headline */}
              <motion.aside initial={{ opacity: 0, y: 18 }} animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="border border-white/12 bg-ink/75 p-5 backdrop-blur-sm">
                <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="flex items-center gap-3" aria-label="MADDspace on Google">
                  <GoogleG size={28} />
                  <div>
                    <div className="flex items-center gap-2"><span className="text-2xl font-semibold leading-none tracking-tight">{googleProfile.rating.toFixed(1)}</span><Stars value={googleProfile.rating} size={14} /></div>
                    <div className="mt-1 text-[11px] text-white/55">{googleProfile.count} Google reviews</div>
                  </div>
                </a>
                <div className="mt-4 min-h-[6.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="text-[13.5px] leading-relaxed text-white/80 line-clamp-4">
                      “{q.text}”
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-white/55">
                  <span className="font-medium text-white/85">{q.name}</span>
                  <span>Verified Google review</span>
                </div>
                <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="mt-4 inline-block text-[12.5px] font-medium text-accent hover:text-white">Read all reviews on Google</a>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
