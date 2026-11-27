"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ourClasses } from "@/content/home";
import { heroLoops, byId } from "@/content/videos";
import { cn, toSentence } from "@/lib/utils";

// What plays on the left for each programme: a performance loop where we have one, otherwise a few photos in turn.
const P = (folder: string, ...n: number[]) => n.map((i) => `/images/classes/${folder}/${folder}-${String(i).padStart(2, "0")}.jpg`);
const media: Record<string, { video?: string; photos?: string[] }> = {
  "/preschool-classes": { photos: P("age-3-5", 5, 8, 2, 6) },
  "/junior-kids": { video: heroLoops.junior },
  "/preteens-teens-classes": { video: heroLoops.teens },
  "/youth-adults": { photos: P("age-18-35", 2, 4, 6) },
  "/holiday-camps": { photos: P("holiday-camps", 3, 4, 6, 8) },
  "/dsaacademy": { video: heroLoops.dsa },
};
const PHOTO = 1400; // ms per photo

// Programmes: media on the left, a solid panel on the right with the numbered list of classes.
// Hovering a class switches the left side to that class's video (or photos).
export default function ProgrammesSplit() {
  const tiles = ourClasses.tiles;
  const [i, setI] = useState(0);
  const [shot, setShot] = useState(0);
  const cur = tiles[i];
  const m = media[cur.href] ?? { photos: [cur.image] };
  const photos = m.photos ?? [];
  const v = m.video ? byId(m.video) : null;
  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setShot((n) => n + 1), PHOTO);
    return () => clearInterval(t);
  }, [i, photos.length]);
  const pick = (k: number) => { if (k !== i) { setI(k); setShot(0); } };

  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-x grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        {/* left: the hovered programme */}
        <Link href={cur.href} className="relative block aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[640px] overflow-hidden bg-ink-3" aria-label={toSentence(cur.title)}>
          {v ? (
            <video key={v.slug} src={v.loop} poster={v.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover animate-[previewIn_.6s_ease-out]" />
          ) : (
            photos.map((src, k) => (
              <Image key={cur.href + src} src={src} alt={cur.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className={cn("object-cover transition-opacity duration-700", k === shot % photos.length ? "opacity-100" : "opacity-0")} />
            ))
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 right-6 text-right">
            <div className="font-display text-[clamp(1.6rem,1rem+2vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]">{toSentence(cur.title)}</div>
            <div className="mt-2 text-[13px] text-white/75">{cur.sub}</div>
          </div>
        </Link>

        {/* right: the panel with the list */}
        <div className="flex flex-col bg-[#0c3d40] p-7 sm:p-10">
          <div className="text-[12px] font-medium text-white/70"><span className="mr-2 inline-block h-1.5 w-1.5 bg-accent align-middle" />Programmes</div>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em]">Our classes</h2>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-white/75">{ourClasses.copy[2]}</p>
          <ol className="mt-auto pt-10" onMouseLeave={() => { /* keep the last hovered */ }}>
            {tiles.map((t, k) => (
              <li key={t.href} className="border-t border-white/15">
                <Link href={t.href} onMouseEnter={() => pick(k)} onFocus={() => pick(k)} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-2 py-4">
                  <span className="text-[12px] tabular-nums text-white/50">({String(k + 1).padStart(2, "0")})</span>
                  <span>
                    <span className={cn("block text-[17px] font-medium transition-colors", k === i ? "text-white" : "text-white/70 group-hover:text-white")}>{toSentence(t.title)}</span>
                    <span className="mt-0.5 block text-[12.5px] text-white/50">{t.sub}</span>
                  </span>
                  <ArrowUpRight size={18} className={cn("transition-colors", k === i ? "text-accent" : "text-white/30 group-hover:text-white")} />
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/classes" className="mt-6 flex items-center justify-between border border-white/25 px-4 py-3 text-[13px] font-medium hover:bg-white hover:text-ink transition-colors">Explore all programmes <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
