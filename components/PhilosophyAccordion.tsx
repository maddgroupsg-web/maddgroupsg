"use client";
import { useState } from "react";
import { Sparkles, Target, Fingerprint, HeartHandshake, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Teaching philosophies as openable cards. Headers are lifted from the sentences themselves; bodies are verbatim.
const items = [
  { icon: Sparkles, title: "Better performers, better human beings", body: "Music and Dance encompasses all aspects of education. Our students do not just leave as better performers, but as better human beings." },
  { icon: Target, title: "Each child's potential", body: "We harness and realize each child's potential through carefully crafted lesson plans." },
  { icon: Fingerprint, title: "Every child is unique", body: "Every child is born unique & different, and will never be treated the same." },
  { icon: HeartHandshake, title: "Teamwork, perseverance & social empathy", body: "We inculcate in our students essential life skills such as teamwork, perseverance and social empathy through the mediums of music and dance." },
];

export default function PhilosophyAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.title} className={cn("glass rounded-xl transition-colors", on && "border-cyan/50")}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center gap-4 p-5 sm:p-6 text-left">
              <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors", on ? "border-cyan bg-cyan text-ink" : "border-cyan/50 text-cyan")}><it.icon size={20} /></span>
              <span className="display text-2xl sm:text-3xl flex-1 leading-none">{it.title}</span>
              <Plus size={20} className={cn("shrink-0 text-cyan transition-transform duration-300", on && "rotate-45")} />
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-400 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden"><p className="px-5 sm:px-6 pb-6 pl-[4.75rem] sm:pl-[5rem] text-mute leading-relaxed">{it.body}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
