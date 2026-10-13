"use client";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeId } from "@/lib/utils";

export default function VideoEmbed({ url, poster, title = "Watch video", caption, className = "" }: { url: string; poster: string; title?: string; caption?: string; className?: string }) {
  const [play, setPlay] = useState(false);
  const id = youtubeId(url);
  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-line glow-border bg-black">
        {play && id ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <button onClick={() => (id ? setPlay(true) : window.open(url, "_blank"))} className="group absolute inset-0 w-full" aria-label={`Play: ${title}`}>
            <Image src={poster} alt={title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-black/40 text-accent backdrop-blur-sm transition-transform group-hover:scale-110"><Play size={30} className="ml-1" fill="currentColor" /></span>
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-xs tracking-wide text-white/60">{caption}</figcaption>}
    </figure>
  );
}
