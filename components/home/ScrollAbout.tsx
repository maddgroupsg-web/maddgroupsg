"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Short About paragraph, centred. Words light up one after another as the paragraph scrolls through the screen.
// Copy: the opening of MADDspace's philosophy on the current site.
const TEXT = "MADDspace is one of Singapore's Top Performing Arts Studio. We offer a wide range of Singing and Dancing classes for students of all ages and ability. MADDspace aims to promote self-confidence, discipline, mutual respect and humility amongst our students.";

export default function ScrollAbout() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");
  return (
    <section className="py-28 lg:py-40">
      <div className="container-x">
        <p ref={ref} className="mx-auto max-w-[34ch] text-center font-display text-[clamp(1.35rem,0.9rem+1.6vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} still={!!reduce}>{w}</Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, from, to, still }: { children: string; progress: MotionValue<number>; from: number; to: number; still: boolean }) {
  const opacity = useTransform(progress, [from, to], [0.18, 1]);
  return <><motion.span style={still ? undefined : { opacity }}>{children}</motion.span>{" "}</>;
}
