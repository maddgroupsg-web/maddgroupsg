import { Button } from "@/components/ui";
import { Reveal } from "@/components/ui";
import type { ProgrammeItem } from "@/content/programmes";
import { Play, CalendarDays } from "lucide-react";

export default function ProgrammeList({ items, galleryImages }: { items: ProgrammeItem[]; galleryImages: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.09}>
          <article className="glass rounded-xl p-6 sm:p-8 grid gap-6 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {it.badge && <span className="rounded bg-cyan/15 border border-cyan/50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-cyan">{it.badge.toUpperCase()}</span>}
                {it.when && <span className="text-[11px] tracking-wider text-white/60">{it.when}</span>}
              </div>
              <h3 className="display text-3xl sm:text-4xl mt-2">{it.title}</h3>
              <div className="mt-3 space-y-3 text-sm sm:text-base text-mute leading-relaxed">
                {it.paragraphs.map((p) => <p key={p}>{p}</p>)}
                {it.bullets && (<div>{it.bullets.lead && <p className="text-white font-semibold">{it.bullets.lead}</p>}<ul className="mt-1 space-y-1">{it.bullets.items.map((b) => <li key={b} className="flex gap-2"><span className="text-cyan">•</span><span>{b}</span></li>)}</ul></div>)}
                {it.closing?.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#enquire" variant="primary" className="!py-2.5 text-[11px]">INTERESTED</Button>
                <Button href="/allclasses-schedule" variant="outline" className="!py-2.5 text-[11px]"><CalendarDays size={14} /> SCHEDULE</Button>
                {it.video && <Button href={it.video} variant="outline" className="!py-2.5 text-[11px]"><Play size={14} /> WATCH VIDEO</Button>}
                {it.moreInfo && <Button href={it.moreInfo} variant="ghost" className="text-[11px]">MORE INFO</Button>}
              </div>
            </div>
            <div className="relative hidden lg:block rounded-lg overflow-hidden border border-line min-h-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={galleryImages[i % galleryImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
