"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// A studio's photos, crossfading one after another.
export default function StudioPhotos({ photos, alt }: { photos: string[]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (photos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % photos.length), 3200);
    return () => clearInterval(t);
  }, [photos.length]);
  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-ink-3">
      {photos.map((src, k) => (
        <Image key={src} src={src} alt={k === i ? alt : ""} fill sizes="(max-width: 1024px) 100vw, 50vw" className={`object-cover transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`} />
      ))}
    </div>
  );
}
