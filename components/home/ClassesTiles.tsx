"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ourClasses } from "@/content/home";
import { heroLoops, byId } from "@/content/videos";
import { Reveal, SectionHeading, Button } from "@/components/ui";
import { cn, toSentence } from "@/lib/utils";

// What plays behind the section for each class: a performance loop where we have one, otherwise a few photos in turn.
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

// Our classes: description on the left, six cards on the right. Hovering a card plays that class's video
// (or a run of its photos) across the whole section, behind the description and the cards.
export default function ClassesTiles() {
  const tiles = ourClasses.tiles;
  const [hov, setHov] = useState<number | null>(null);
  const [last, setLast] = useState(0); // keeps the media mounted while it fades out
  const [shot, setShot] = useState(0);
  const cur = tiles[hov ?? last];
  const m = media[cur.href] ?? { photos: [cur.image] };
  const photos = m.photos ?? [];
  const v = m.video ? byId(m.video) : null;

  useEffect(() => {
    if (hov === null || photos.length < 2) return;
    const t = setInterval(() => setShot((n) => n + 1), PHOTO);
    return () => clearInterval(t);
  }, [hov, photos.length]);
  const enter = (i: number) => { setHov(i); setLast(i); setShot(0); };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-ink-2">
      {/* background media for the hovered card */}
      <div className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", hov === null ? "opacity-0" : "opacity-100")} aria-hidden>
        {v ? (
          <video key={v.slug} src={v.loop} poster={v.poster} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          photos.map((src, k) => (
            <Image key={cur.href + src} src={src} alt="" fill sizes="100vw" className={cn("object-cover transition-opacity duration-700", k === shot % photos.length ? "opacity-100" : "opacity-0")} />
          ))
        )}
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      </div>

      <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <SectionHeading title={ourClasses.headline} />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/75">
            {ourClasses.copy.map((p, i) => <p key={i} className={i === 2 ? "text-white font-medium" : ""}>{p}</p>)}
          </div>
          <div className="mt-8"><Button href="/classes" variant="outline">EXPLORE ALL PROGRAMMES</Button></div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3" onMouseLeave={() => setHov(null)}>
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.07}>
              <Link href={t.href} onMouseEnter={() => enter(i)} onFocus={() => enter(i)} onBlur={() => setHov(null)}
                className={cn("group relative block aspect-[4/5] overflow-hidden transition-all duration-500", hov !== null && hov !== i && "opacity-45 grayscale")}>
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/10 to-ink/40" />
                <h3 className="absolute left-4 top-4 right-4 sm:left-5 sm:top-5 font-display text-[15px] sm:text-lg font-semibold uppercase leading-tight tracking-[0.02em]">{toSentence(t.title)}<span className="mt-1 block text-[11px] font-medium normal-case tracking-normal text-white/70 lg:hidden">{t.sub}</span></h3>
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 hidden lg:block w-max max-w-[calc(125%-96px)] origin-bottom-left -rotate-90 translate-x-[1.5em] text-[10.5px] font-medium uppercase leading-[1.5] tracking-[0.16em] text-white/70">{t.sub}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
