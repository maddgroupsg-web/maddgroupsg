"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Theater, Award, ChevronDown } from "lucide-react";
import { hero } from "@/content/home";
import { BOOK_TRIAL_URL } from "@/content/site";
import { Button } from "@/components/ui";

const icons = { users: Users, stage: Theater, award: Award } as const;

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden curtain flex items-end lg:items-center">
      <div className="absolute inset-0">
        <Image src={hero.image} alt="MADDspace students performing on stage" fill priority sizes="100vw" className="object-cover object-[65%_center] lg:object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 spotlight opacity-80" />
      </div>
      <div className="container-x relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 className="sr-only">{hero.h1}</h1>
          <p className="mt-2 text-[11px] sm:text-xs tracking-[0.25em] text-white/60 uppercase">{hero.h1}</p>
          <p className="display mt-4 text-[3.2rem] leading-[0.9] sm:text-6xl lg:text-[4.8rem] xl:text-[5.6rem]" aria-hidden>
            <span className="block">{hero.headline[0]}</span>
            <span className="block text-cyan">{hero.headline[1]}</span>
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">{hero.copy}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button href={BOOK_TRIAL_URL}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="ghost">{hero.secondary.label}</Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white/75">
            {hero.trust.map((t) => { const I = icons[t.icon as keyof typeof icons]; return <li key={t.label} className="flex items-center gap-2"><I size={18} className="text-cyan" />{t.label}</li>; })}
          </ul>
        </motion.div>
      </div>
      <a href="#madd-group" aria-label="Scroll to the MADD Group" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cyan/80 animate-bounce hidden lg:block"><ChevronDown /></a>
    </section>
  );
}
