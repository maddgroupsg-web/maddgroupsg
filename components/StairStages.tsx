"use client";
import { motion, useReducedMotion } from "framer-motion";

type Stage = { n: string; title: string; copy: string };
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const RISE = 72; // px each step climbs on desktop

// The four DSA stages as a staircase: stage one sits lowest on the left, stage four highest on the right.
// Steps reveal one by one as you scroll; on smaller screens they stack.
export default function StairStages({ stages, images }: { stages: Stage[]; images: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-0">
      {stages.map((s, i) => {
        const riser = i * RISE;
        return (
          <div key={s.n} className="flex flex-col justify-end lg:px-1.5">
            <motion.div
              className="relative overflow-hidden rounded-xl border border-line min-h-[360px] group text-center"
              initial={reduce ? false : { opacity: 0, y: 56, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.22, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[(i + 1) % images.length]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
              <div aria-hidden className="absolute right-4 top-2 display text-[7rem] leading-none text-white/[0.07] select-none">{i + 1}</div>
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-end">
                <div className="eyebrow">{s.n}</div>
                <h3 className="display text-3xl mt-1">{s.title}</h3>
                <p className="mt-2 text-sm text-white/80 max-w-[30ch]">{s.copy}</p>
              </div>
            </motion.div>
            {/* riser under each step (desktop only) so the four cards read as stairs */}
            {riser > 0 && (
              <motion.div
                aria-hidden
                className="hidden lg:block origin-bottom border-x border-b border-line bg-[linear-gradient(to_bottom,rgba(34,211,211,0.10),rgba(255,255,255,0.02))]"
                style={{ height: riser }}
                initial={reduce ? false : { scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.22 + 0.25, ease: EASE }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
