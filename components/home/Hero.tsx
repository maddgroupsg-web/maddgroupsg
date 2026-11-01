"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSyncExternalStore } from "react";
import { hero } from "@/content/home";
import { heroLoops, byId } from "@/content/videos";
import HeroVideo from "@/components/HeroVideo";
import { BOOK_TRIAL_URL } from "@/content/site";
import { Button } from "@/components/ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Each discipline arrives its own way: MUSIC rises, ART drops in, DRAMA zooms from the back, DANCE slides in from the side.
const moves: Record<string, Variants> = {
  MUSIC: { hidden: { opacity: 0, y: "0.7em", filter: "blur(10px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } } },
  ART: { hidden: { opacity: 0, y: "-0.7em", filter: "blur(10px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } } },
  DRAMA: { hidden: { opacity: 0, scale: 1.6, filter: "blur(14px)" }, show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.0, ease: EASE } } },
  DANCE: { hidden: { opacity: 0, x: "0.8em", skewX: -12, filter: "blur(10px)" }, show: { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } } },
};
const plain: Variants = { hidden: { opacity: 0, y: "0.3em", filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } } };

function Line({ text, className, start, step, go, accentKeys }: { text: string; className: string; start: number; step: number; go: boolean; accentKeys?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => {
        const key = w.replace(/[^A-Z]/g, "");
        const v = accentKeys && moves[key] ? moves[key] : plain;
        return (
          <motion.span key={i} aria-hidden className="inline-block will-change-transform" variants={v} initial="hidden" animate={go ? "show" : "hidden"} transition={{ delay: start + i * step }} style={{ transformOrigin: "50% 60%" }}>
            {w}{i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}

// Starts the headline once the intro panels have opened (first visit), or straight away on later pages.
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
function useIntroGate() {
  return useSyncExternalStore(subscribeIntro, readIntro, () => false);
}

export default function Hero() {
  const reduce = useReducedMotion();
  const go = useIntroGate() || !!reduce;
  const n1 = hero.eyebrow.split(" ").length;
  return (
    <section className="relative min-h-[100svh] overflow-hidden curtain flex items-center">
      <div className="absolute inset-0">
        <HeroVideo loop={byId(heroLoops.home).loop!} poster={byId(heroLoops.home).poster} alt="MADDspace students performing on stage" position="object-center" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 spotlight opacity-80" />
      </div>
      <div className="container-x relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-none text-center mx-auto">
          <h1 style={{ fontFamily: "var(--font-josefin)" }}>
            <Line text={hero.eyebrow} go={go} start={0.1} step={0.16} accentKeys className="block font-bold uppercase text-[2.1rem] leading-[1.1] sm:text-5xl lg:text-[2.9rem] xl:text-[3.3rem] lg:whitespace-nowrap tracking-[0.01em]" />
            <Line text={hero.h1} go={go} start={0.1 + n1 * 0.16 + 0.15} step={0.05} className="mt-4 sm:mt-6 block font-normal uppercase text-base sm:text-xl lg:text-[1.5rem] xl:text-[1.65rem] lg:whitespace-nowrap tracking-[0.04em] text-white/90" />
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={go ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: 0.7, delay: 0.1 + n1 * 0.16 + 0.15 + hero.h1.split(" ").length * 0.05 + 0.2, ease: EASE }} className="mt-9 sm:mt-11 flex justify-center">
            <Button href={BOOK_TRIAL_URL} className="!px-10 !py-4 text-[13px]">BOOK A TRIAL</Button>
          </motion.div>
        </div>
      </div>
      <a href="#madd-group" aria-label="Scroll to the MADD Group" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cyan/80 animate-bounce hidden lg:block"><ChevronDown /></a>
    </section>
  );
}
