"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { hero } from "@/content/home";
import { heroLoops, byId } from "@/content/videos";
import HeroVideo from "@/components/HeroVideo";
import { BOOK_TRIAL_URL } from "@/content/site";
import { Button } from "@/components/ui";


export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden curtain flex items-end lg:items-center">
      <div className="absolute inset-0">
        <HeroVideo loop={byId(heroLoops.home).loop!} poster={byId(heroLoops.home).poster} alt="MADDspace students performing on stage" position="object-[65%_center] lg:object-[60%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 spotlight opacity-80" />
      </div>
      <div className="container-x relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-none">
          <h1 style={{ fontFamily: "var(--font-josefin)" }}>
            <span className="block font-bold uppercase text-[2.1rem] leading-[1.1] sm:text-5xl lg:text-[2.9rem] xl:text-[3.3rem] lg:whitespace-nowrap tracking-[0.01em]">{hero.eyebrow}</span>
            <span className="mt-4 sm:mt-6 block font-normal uppercase text-base sm:text-xl lg:text-[1.5rem] xl:text-[1.65rem] lg:whitespace-nowrap tracking-[0.04em] text-white/90">{hero.h1}</span>
          </h1>
          <div className="mt-9 sm:mt-11">
            <Button href={BOOK_TRIAL_URL} className="!px-10 !py-4 text-[13px]">BOOK A TRIAL</Button>
          </div>
        </motion.div>
      </div>
      <a href="#madd-group" aria-label="Scroll to the MADD Group" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cyan/80 animate-bounce hidden lg:block"><ChevronDown /></a>
    </section>
  );
}
