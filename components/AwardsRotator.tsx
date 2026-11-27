"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { awards } from "@/content/site";

const SLOTS = 4;
const EVERY = 3200; // ms between swaps

// Four award boxes. Every few seconds one box, picked at random, swaps to an award that is not on show:
// the old one drops away and the new one comes in from above.
export default function AwardsRotator() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(() => awards.slice(0, SLOTS).map((_, i) => i));
  useEffect(() => {
    if (reduce || awards.length <= SLOTS) return;
    const t = setInterval(() => {
      setShown((cur) => {
        const spare = awards.map((_, i) => i).filter((i) => !cur.includes(i));
        const next = [...cur];
        next[Math.floor(Math.random() * SLOTS)] = spare[Math.floor(Math.random() * spare.length)];
        return next;
      });
    }, EVERY);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {shown.map((ai, slot) => {
        const a = awards[ai];
        return (
          <div key={slot} className="relative aspect-square overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div key={a.src} className="absolute inset-0 p-6 sm:p-7" initial={{ y: "-40%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "40%", opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <div className="relative h-full w-full"><Image src={a.src} alt={a.alt} fill sizes="(max-width: 640px) 45vw, 240px" className="object-contain" /></div>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
