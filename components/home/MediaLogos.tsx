"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mediaLogos } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

const SLOTS = 5; // cells on desktop; phones show the first four
const EVERY = 2200; // ms between swaps

// Media logos in a row of cells, each marked only by small corner brackets. Every couple of seconds one random cell drops its logo down and a logo that is not
// on show comes in from above.
export default function MediaLogos() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(() => mediaLogos.slice(0, SLOTS).map((_, i) => i));

  useEffect(() => {
    if (reduce || mediaLogos.length <= SLOTS) return;
    const t = setInterval(() => {
      setShown((cur) => {
        const spare = mediaLogos.map((_, i) => i).filter((i) => !cur.includes(i));
        const slot = Math.floor(Math.random() * SLOTS);
        const next = [...cur];
        next[slot] = spare[Math.floor(Math.random() * spare.length)];
        return next;
      });
    }, EVERY);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section className="py-20 lg:py-28 border-b border-line">
      <div className="container-x">
        <Reveal><SectionHeading align="center" title="AS FEATURED ON LEADING MEDIA PLATFORMS" /></Reveal>
        <div className="mt-14 lg:mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3 lg:gap-5">
          {shown.map((logoIndex, slot) => {
            const l = mediaLogos[logoIndex];
            return (
              <div key={slot} className={`relative h-32 lg:h-40 ${slot === SLOTS - 1 ? "hidden sm:block" : ""}`}>
                <Corners />
                <div className="absolute inset-0 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div key={l.name} className="absolute inset-0 flex items-center justify-center px-6"
                    initial={{ y: "-60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "60%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={l.src} alt={l.name} width={l.w} height={l.h} className="max-h-7 lg:max-h-8 max-w-[120px] lg:max-w-[140px] w-auto object-contain" />
                  </motion.div>
                </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// four small L-shaped brackets, one in each corner of a cell
function Corners() {
  const c = "pointer-events-none absolute h-3.5 w-3.5 border-white/30";
  return (
    <>
      <span aria-hidden className={`${c} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${c} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${c} left-0 bottom-0 border-l border-b`} />
      <span aria-hidden className={`${c} right-0 bottom-0 border-r border-b`} />
    </>
  );
}
