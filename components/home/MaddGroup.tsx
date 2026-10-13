"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { maddGroup } from "@/content/home";
import { Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function MaddGroup() {
  const [active, setActive] = useState(0);
  return (
    <section id="madd-group" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 spotlight" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading eyebrow="THE MADD GROUP" title={<><span className="block">{maddGroup.headline[0]}</span><span className="block text-cyan text-[0.55em] normal-case font-sans tracking-normal font-medium mt-2">{maddGroup.headline[1]}</span></>} />
          <div className="mt-6 max-w-3xl space-y-3 text-mute leading-relaxed">{maddGroup.copy.map((p) => <p key={p}>{p}</p>)}</div>
        </Reveal>

        {/* Four pillars — expanding strip */}
        <div className="mt-12">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h3 className="display text-4xl sm:text-5xl">{maddGroup.tagline}</h3>
            <p className="text-sm text-white/60">{maddGroup.sub}</p>
          </div>
          <div className="mt-6 flex flex-col lg:flex-row gap-3 lg:h-[460px]">
            {maddGroup.pillars.map((p, i) => (
              <motion.div key={p.name} layout onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className={cn("relative overflow-hidden rounded-xl border cursor-pointer transition-colors", active === i ? "border-cyan/70" : "border-line")}
                style={{ flex: active === i ? 2.6 : 1 }} transition={{ type: "spring", stiffness: 120, damping: 20 }}>
                <div className="relative h-56 lg:h-full">
                  <Image src={p.image} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className={cn("object-cover transition-all duration-700", active === i ? "opacity-80 scale-100" : "opacity-35 scale-105 grayscale")} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                    <div className="display text-cyan text-2xl">{p.verb}</div>
                    <h4 className="display text-3xl lg:text-4xl">{p.name}</h4>
                    <motion.p initial={false} animate={{ opacity: active === i ? 1 : 0, height: active === i ? "auto" : 0 }} className="overflow-hidden text-sm text-white/80 max-w-md">
                      <span className="block pt-2">{p.copy}</span>
                      <Link href={p.href} className="inline-block pt-3 text-cyan text-xs tracking-[0.2em] font-semibold">EXPLORE →</Link>
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ecosystem in action — orbit */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h3 className="display text-5xl sm:text-6xl"><span className="block">{maddGroup.orbit.headline[0]}</span><span className="block text-cyan">{maddGroup.orbit.headline[1]}</span></h3>
            <p className="mt-4 text-mute max-w-md">MADDspace isn't operating in isolation. There is an entire ecosystem behind the student's development.</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {maddGroup.orbit.nodes.map((n) => <li key={n.k}><span className="display text-cyan text-xl">{n.k}</span><div className="text-white/70 text-xs">{n.v}</div></li>)}
            </ul>
          </Reveal>
          <Reveal className="relative mx-auto aspect-square w-full max-w-[520px]">
            <Orbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Orbit() {
  const nodes = maddGroup.orbit.nodes;
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[6%] rounded-full border border-cyan/20" />
      <div className="absolute inset-[22%] rounded-full border border-cyan/15 border-dashed" />
      <motion.div className="absolute inset-[6%] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {nodes.map((n, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 50 * Math.cos(a), y = 50 + 50 * Math.sin(a);
          return (
            <motion.div key={n.k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }} animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
              <div className="glass rounded-full px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.18em] text-cyan whitespace-nowrap shadow-[0_0_18px_-4px_rgba(34,211,211,0.6)]">{n.k}</div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute inset-[30%] overflow-hidden rounded-full glow-border">
        <Image src="/images/classes/age-6-9/age-6-9-08.jpg" alt="A MADDspace student at the centre of the ecosystem" fill sizes="240px" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-center text-[10px] tracking-[0.25em]">THE STUDENT</div>
      </div>
    </div>
  );
}
