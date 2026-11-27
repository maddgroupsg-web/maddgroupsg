"use client";
import { useState } from "react";
import { Play, Search } from "lucide-react";
import { videos, events, byId, type Vid } from "@/content/videos";
import { VideoCard } from "@/components/home/VideoCarousel";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import HeroVideo from "@/components/HeroVideo";
import { cn } from "@/lib/utils";

const styles = ["All", "K-Pop", "Hip Hop", "Sing & Dance", "Vocals"] as const;
const FEATURED = "mts-2026-34-mixxie"; // the performance that opens the page

export default function PerformancesGallery() {
  const [event, setEvent] = useState<string>("All");
  const [style, setStyle] = useState<string>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Vid | null>(null);
  const feat = byId(FEATURED);
  const needle = q.trim().toLowerCase();
  const list = videos.filter((v) =>
    (event === "All" || v.event === event) && (style === "All" || v.style === style) &&
    (!needle || [v.title, v.event, v.style, v.crew ?? ""].join(" ").toLowerCase().includes(needle)));
  return (
    <div>
      {/* one performance as the hero */}
      <section className="relative min-h-[88svh] overflow-hidden bg-ink-2">
        <HeroVideo loop={feat.loop!} poster={feat.poster} alt={feat.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" />
        <div className="container-x relative z-10 flex min-h-[88svh] flex-col justify-end pt-32 pb-12 lg:pb-16">
          <h1 className="display display-hero mt-4 max-w-[17ch]">Student performances &amp; recordings</h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">Every performance here is a MADDspace student. Filter by event or style and click to watch.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => setOpen(feat)} className="btn btn-primary"><Play size={15} fill="currentColor" /><span className="btn-label" data-text={`Play ${feat.title}`}><span>Play {feat.title}</span></span></button>
            <span className="text-[12px] text-white/60">{feat.event} · {feat.style}</span>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">{["All", ...events].map((e) => <Chip key={e} on={event === e} onClick={() => setEvent(e)}>{e}</Chip>)}</div>
              <div className="flex flex-wrap gap-2">{styles.map((s) => <Chip key={s} on={style === s} onClick={() => setStyle(s)} subtle>{s}</Chip>)}</div>
            </div>
            <label className="flex h-11 w-full lg:w-[300px] items-center gap-2 border border-line bg-white/[0.03] px-3 focus-within:border-white/50">
              <Search size={15} className="text-white/50 shrink-0" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search performances" aria-label="Search performances" className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none" />
              {q && <button type="button" onClick={() => setQ("")} className="text-[11px] text-white/50 hover:text-white">Clear</button>}
            </label>
          </div>
          <p className="mt-5 text-xs text-white/50">{list.length} video{list.length === 1 ? "" : "s"}</p>
          <div className="mt-4 grid gap-4 grid-cols-2 lg:grid-cols-4">
            {list.map((v) => <VideoCard key={v.slug} v={v} onOpen={() => setOpen(v)} className="!w-full !shrink" />)}
          </div>
          {list.length === 0 && <p className="mt-8 text-sm text-white/60">No performances match. Try another word or clear the filters.</p>}
        </div>
      </section>
      <VideoPlayerModal video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
function Chip({ on, onClick, children, subtle }: { on: boolean; onClick: () => void; children: React.ReactNode; subtle?: boolean }) {
  return <button onClick={onClick} className={cn("border px-3.5 py-2 text-[13px] font-medium transition-colors", on ? (subtle ? "border-white/60 bg-white/10 text-white" : "border-cyan bg-cyan text-ink") : "border-line text-white/70 hover:border-white/40 hover:text-white")}>{children}</button>;
}
