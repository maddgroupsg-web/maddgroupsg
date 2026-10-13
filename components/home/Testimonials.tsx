"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/content/home";
import { SectionHeading } from "@/components/ui";

export default function Testimonials({ heading = "PARENTS SAY IT BEST", eyebrow = "PARENT STORIES" }: { heading?: string; eyebrow?: string }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false })]);
  return (
    <section className="relative py-20 lg:py-24 curtain overflow-hidden">
      <div className="container-x relative">
        <SectionHeading align="center" eyebrow={eyebrow} title={heading} sub="Find out why we have over 100 positive reviews on Facebook & Google" />
        <div className="relative mt-10">
          <div ref={ref} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((t) => (
                <figure key={t.name} className="shrink-0 basis-full sm:basis-[80%] lg:basis-[64%] px-2">
                  <div className="glass rounded-xl p-8 sm:p-10 text-center">
                    <Quote className="mx-auto text-accent" />
                    <blockquote className="mt-4 text-lg sm:text-2xl leading-relaxed italic text-white/90">“{t.quote}”</blockquote>
                    <figcaption className="mt-5 text-xs tracking-[0.2em] uppercase text-accent">— {t.name}, {t.role}</figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
          <button onClick={() => api?.scrollPrev()} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 text-accent hover:bg-accent/10"><ArrowLeft size={18} /></button>
          <button onClick={() => api?.scrollNext()} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 text-accent hover:bg-accent/10"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
