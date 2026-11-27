"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Carousel({ images, alt = "MADDspace students in class and on stage", aspect = "aspect-[4/5]", slide = "basis-[78%] sm:basis-[46%] lg:basis-[31%]", autoplay = true, controls = true, className }: { images: string[]; alt?: string; aspect?: string; slide?: string; autoplay?: boolean; controls?: boolean; className?: string }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start", dragFree: false }, autoplay ? [Autoplay({ delay: controls ? 3800 : 3000, stopOnInteraction: false, stopOnMouseEnter: controls })] : []);
  const [idx, setIdx] = useState(0);
  useEffect(() => { if (!api) return; const f = () => setIdx(api.selectedScrollSnap()); api.on("select", f); f(); }, [api]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  return (
    <div className={cn("relative", className)}>
      <div ref={ref} className="overflow-hidden">
        <div className="flex gap-3 sm:gap-4 touch-pan-y">
          {images.map((src, i) => (
            <div key={src} className={cn("shrink-0 min-w-0", slide)}>
              <div className={cn("relative overflow-hidden rounded-lg border border-line bg-ink-3", aspect)}>
                <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 31vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {controls && <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {images.map((_, i) => <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => api?.scrollTo(i)} className={cn("h-1 rounded-full transition-all", i === idx ? "w-8 bg-accent" : "w-3 bg-white/25")} />)}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous" className="h-11 w-11 rounded-full border border-accent/70 text-accent hover:bg-accent/10 flex items-center justify-center"><ArrowLeft size={18} /></button>
          <button onClick={next} aria-label="Next" className="h-11 w-11 rounded-full border border-accent/70 text-accent hover:bg-accent/10 flex items-center justify-center"><ArrowRight size={18} /></button>
        </div>
      </div>}
    </div>
  );
}
