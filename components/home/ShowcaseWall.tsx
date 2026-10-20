"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { mediaLogos } from "@/content/site";

// Two rows of class + performance photos. The wall starts tilted back in 3D and straightens as it scrolls into view;
// the rows also drift in opposite directions.
const ROW_A = [
  { src: "/images/classes/age-3-5/age-3-5-05.jpg", label: "Preschool Sing & Dance", href: "/preschool-classes" },
  { src: "/images/classes/age-6-9/age-6-9-06.jpg", label: "Show Choir", href: "/junior-kids" },
  { src: "/images/classes/age-10-18/age-10-18-07.jpg", label: "K-Pop Crews", href: "/kpop" },
  { src: "/images/classes/age-18-35/age-18-35-02.jpg", label: "Hip Hop", href: "/hiphop" },
  { src: "/images/classes/dsa/dsa-03.jpg", label: "DSA Preparation", href: "/dsaacademy" },
  { src: "/images/classes/holiday-camps/holiday-camps-04.jpg", label: "Holiday Camps", href: "/holiday-camps" },
];
const ROW_B = [
  { src: "/images/achievements/iu-concert.jpg", label: "On stage with IU", href: "/achievements#iu" },
  { src: "/images/classes/age-10-18/age-10-18-01.jpg", label: "Vocals", href: "/singing-classes-singapore" },
  { src: "/images/achievements/rising-voice.jpg", label: "Rising Voice, Shanghai", href: "/achievements#rising-voice" },
  { src: "/images/classes/age-6-9/age-6-9-03.jpg", label: "Junior Kids", href: "/junior-kids" },
  { src: "/images/achievements/genting-gold.jpg", label: "Asia Pacific Arts Festival", href: "/achievements#genting" },
  { src: "/images/classes/age-10-18/age-10-18-02.jpg", label: "Artiste Programme", href: "/idol-training-singapore" },
];

export default function ShowcaseWall() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 40%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [62, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const xA = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["22%", "0%"]);

  return (
    <section ref={ref} className="relative pt-10 pb-10 lg:pt-14 lg:pb-16 overflow-hidden">
      <div style={{ perspective: "1100px" }}>
        <motion.div style={reduce ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }} className="space-y-4 will-change-transform">
          {/* media logos ride on the same tilted plane */}
          <h2 className="sr-only">As featured in leading media platforms</h2>
          <div className="marquee relative overflow-hidden pb-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="marquee-track items-center gap-16 px-8">
              {[...mediaLogos, ...mediaLogos].map((l, i) => (
                <div key={i} className="flex h-16 w-[150px] sm:w-[190px] shrink-0 items-center justify-center">
                  <Image src={l.src} alt={i < mediaLogos.length ? l.name : ""} width={l.w} height={l.h} className="max-h-11 max-w-full w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
          <motion.div style={reduce ? undefined : { x: xA }} className="flex gap-4 pl-4 lg:pl-10">
            {ROW_A.map((t) => <Tile key={t.src} {...t} />)}
          </motion.div>
          <motion.div style={reduce ? undefined : { x: xB }} className="flex gap-4 pl-24 lg:pl-40">
            {ROW_B.map((t) => <Tile key={t.src} {...t} />)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Tile({ src, label, href }: { src: string; label: string; href: string }) {
  return (
    <Link href={href} className="group relative shrink-0 w-[62vw] sm:w-[38vw] lg:w-[23vw] aspect-[16/11] overflow-hidden rounded-[4px] border border-white/10 bg-ink-3">
      <Image src={src} alt={label} fill sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 23vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <div className="absolute left-4 bottom-3 text-[11px] tracking-[0.2em] uppercase text-white/90">{label}</div>
    </Link>
  );
}
