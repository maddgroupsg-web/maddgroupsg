"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { team, type Person } from "@/content/team";
import { instructors } from "@/content/instructors";
import { cn } from "@/lib/utils";

const tabs: { key: Person["group"] | "all"; label: string }[] = [{ key: "all", label: "EVERYONE" }, { key: "leadership", label: "LEADERSHIP" }, { key: "operations", label: "OPERATIONS" }, { key: "instructors", label: "INSTRUCTORS" }];

export default function TeamCarousel() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [ref, api] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
  const list: Person[] = tab === "instructors" ? instructors.map((i) => ({ name: i.name, role: i.role, image: i.image, group: "instructors" })) : team.filter((p) => tab === "all" || p.group === tab);
  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map((t) => <button key={t.key} onClick={() => { setTab(t.key); api?.scrollTo(0); }} className={cn("px-3 py-2 text-xs tracking-[0.2em] border-b-2 transition-colors whitespace-nowrap", tab === t.key ? "border-cyan text-cyan" : "border-transparent text-white/60 hover:text-white")}>{t.label}</button>)}
        </div>
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-cyan">
          <span className="hidden sm:inline">DRAG TO MEET THE TEAM ↔</span>
          <button onClick={() => api?.scrollPrev()} aria-label="Previous" className="h-10 w-10 rounded-full border border-cyan/60 flex items-center justify-center hover:bg-cyan/10"><ArrowLeft size={16} /></button>
          <button onClick={() => api?.scrollNext()} aria-label="Next" className="h-10 w-10 rounded-full border border-cyan/60 flex items-center justify-center hover:bg-cyan/10"><ArrowRight size={16} /></button>
        </div>
      </div>
      <div ref={ref} className="mt-5 overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-3 sm:gap-4">
          {list.map((p) => (
            <figure key={p.name + p.role} className="shrink-0 basis-[46%] sm:basis-[30%] lg:basis-[19%] rounded-lg overflow-hidden border border-line bg-ink-3 hover:border-cyan/60 transition-colors">
              <div className="relative aspect-square">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 46vw, 20vw" className="object-cover" />
                {p.image.endsWith("blank.jpg") && <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.2em] text-cyan/80 bg-ink/40">PORTRAIT TO FOLLOW</div>}
              </div>
              <figcaption className="p-3">
                <div className="font-semibold text-sm tracking-wide uppercase">{p.name}</div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-cyan mt-0.5">{p.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
