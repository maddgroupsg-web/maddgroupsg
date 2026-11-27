"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/home";
import { singing, idol } from "@/content/typepages";
import { heroLoops, byId } from "@/content/videos";
import { googleProfile } from "@/content/reviews";
import { BOOK_TRIAL_URL } from "@/content/site";
import HeroVideo from "@/components/HeroVideo";
import { GoogleG, Stars } from "@/components/GoogleLogo";
import { Button } from "@/components/ui";
import { toSentence } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HOLD = 6500; // ms per headline

// Each headline has its own video. The headline, the video and the review card change together.
const slides = [
  { line: hero.h1, video: heroLoops.home },     // dance: the outdoor crew video
  { line: singing.h1, video: "mts-2026-09-solo" }, // singing: calm solo, no strobing lights
  { line: idol.h1, video: heroLoops.idol },      // performance: MADDartistes on stage
];

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

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence initial={false}>
            <motion.div key={cur.video} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeInOut" }}>
              <HeroVideo loop={v.loop!} poster={v.poster} alt="MADDspace students performing on stage" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" />

          <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pt-32 pb-12 lg:pb-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.8, ease: EASE }}>
                <div className="text-[12.5px] sm:text-sm font-semibold tracking-[0.14em] text-white">{hero.eyebrow}</div>
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
              </motion.div>

              {/* trust: the Google rating */}
              <motion.aside initial={{ opacity: 0, y: 18 }} animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="w-fit lg:mr-24 lg:mb-2">
                <a href={googleProfile.mapsUrl} target="_blank" rel="noopener" className="flex items-center gap-4 group" aria-label="MADDspace on Google">
                  <GoogleG size={34} />
                  <div>
                    <div className="flex items-center gap-2"><span className="text-3xl font-semibold leading-none tracking-tight">{googleProfile.rating.toFixed(1)}</span><Stars value={googleProfile.rating} size={16} /></div>
                    <div className="mt-1.5 text-[12px] text-white/60">{googleProfile.count} Google reviews</div>
                  </div>
                </a>
              </motion.aside>
            </div>
          </div>
    </section>
  );
}
