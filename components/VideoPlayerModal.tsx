"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { Vid } from "@/content/videos";

export default function VideoPlayerModal({ video, onClose }: { video: Vid | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [video, onClose]);
  if (!video) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={video.title}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl">
        <button onClick={onClose} aria-label="Close" className="absolute -top-10 right-0 text-white/70 hover:text-white"><X size={22} /></button>
        <video key={video.src} src={video.src} poster={video.poster} controls autoPlay playsInline className="w-full aspect-video rounded-xl bg-black shadow-2xl" />
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="display text-2xl sm:text-3xl">{video.title}</div>
          <div className="text-xs tracking-[0.2em] text-cyan">{video.event.toUpperCase()}{video.crew ? ` · ${video.crew.toUpperCase()}` : ""}</div>
        </div>
      </div>
    </div>
  );
}
