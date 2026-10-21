"use client";
import { useState } from "react";
import { videos, events, type Vid } from "@/content/videos";
import { VideoCard } from "@/components/home/VideoCarousel";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { cn } from "@/lib/utils";

const styles = ["All", "K-Pop", "Hip Hop", "Sing & Dance", "Vocals", "Dance Video"] as const;

export default function PerformancesGallery() {
  const [event, setEvent] = useState<string>("All");
  const [style, setStyle] = useState<string>("All");
  const [open, setOpen] = useState<Vid | null>(null);
  const list = videos.filter((v) => (event === "All" || v.event === event) && (style === "All" || v.style === style));
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">{["All", ...events].map((e) => <Chip key={e} on={event === e} onClick={() => setEvent(e)}>{e}</Chip>)}</div>
        <div className="flex flex-wrap gap-2">{styles.map((s) => <Chip key={s} on={style === s} onClick={() => setStyle(s)} subtle>{s}</Chip>)}</div>
      </div>
      <p className="mt-4 text-xs text-white/50">{list.length} video{list.length === 1 ? "" : "s"}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => <VideoCard key={v.slug} v={v} onOpen={() => setOpen(v)} className="!w-full !shrink" />)}
      </div>
      <VideoPlayerModal video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
function Chip({ on, onClick, children, subtle }: { on: boolean; onClick: () => void; children: React.ReactNode; subtle?: boolean }) {
  return <button onClick={onClick} className={cn("rounded-full border px-4 py-2 text-[11px] tracking-[0.15em] font-semibold transition-colors", on ? (subtle ? "border-white/60 bg-white/10 text-white" : "border-cyan bg-cyan text-ink") : "border-line text-white/70 hover:border-cyan/60 hover:text-white")}>{children}</button>;
}
