"use client";
import Image from "next/image";
import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import type { ProgrammeItem } from "@/content/programmes";

// One row of photo tiles. At rest: photo + programme name. On hover (desktop) or tap (touch) the photo zooms and the
// first sentence plus the "Students will" bullets slide up. Copy is the same text as ProgrammeList, just less of it.
export default function ProgrammeRow({ items, images }: { items: ProgrammeItem[]; images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <motion.article
            key={it.title}
            data-open={isOpen || undefined}
            onClick={() => setOpen(isOpen ? null : i)}
            onMouseLeave={() => setOpen((o) => (o === i ? null : o))}
            className="group relative h-[460px] lg:h-[540px] overflow-hidden rounded-xl border border-line bg-ink-2 cursor-pointer select-none"
            initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={images[i % images.length]} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-data-open:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-ink/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-open:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
              <div className="flex items-center justify-between gap-3">
                {it.badge ? <span className="rounded bg-cyan/15 border border-cyan/50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-cyan">{it.badge.toUpperCase()}</span> : <span />}
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white/80 transition-transform duration-500 group-hover:rotate-45 group-data-open:rotate-45"><Plus size={16} /></span>
              </div>
              <h3 className="display mt-3 text-[1.7rem] leading-[0.95] sm:text-3xl">{it.title}</h3>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:grid-rows-[1fr] group-data-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="pt-3 opacity-0 translate-y-3 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0 group-data-open:opacity-100 group-data-open:translate-y-0">
                    <p className="text-[13px] leading-relaxed text-white/80">{it.paragraphs[0]}</p>
                    {it.bullets && (
                      <ul className="mt-3 space-y-1 text-[13px] text-white/90">
                        {it.bullets.items.map((b) => <li key={b} className="flex gap-2"><span className="text-cyan">•</span><span>{b}</span></li>)}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button href="/contact" className="!py-2 !px-3 !text-[10px]">INTERESTED</Button>
                      <Button href="/allclasses-schedule" variant="outline" className="!py-2 !px-3 !text-[10px]"><CalendarDays size={13} /> SCHEDULE</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
