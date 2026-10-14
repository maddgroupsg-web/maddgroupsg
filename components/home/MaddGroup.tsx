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

      </div>
    </section>
  );
}

