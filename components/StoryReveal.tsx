import Image from "next/image";
import { story } from "@/content/story";
import { Reveal } from "@/components/ui";

// How MADDspace came about. Alternating rows: the year, title and line on one side, and the whole photo on the
// other, sitting over a thin outlined frame. The four MADD Group pillars now open the About page as its hero.
export default function StoryReveal() {
  return (
    <section className="relative py-20 lg:py-24 overflow-x-clip border-t border-line" aria-label="How MADDspace came about">
      <div className="container-x">
        <Reveal>
          <h2 className="display grid gap-1 lg:grid-cols-2 lg:gap-10">
            <span className="block">From one studio</span>
            <span className="block lg:mt-10 lg:text-right text-white/60">to a whole stage.</span>
          </h2>
        </Reveal>

        <div className="mt-12 lg:mt-16 space-y-14 lg:space-y-20">
          {story.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.title} className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flip ? "lg:order-2" : ""} x={flip ? 90 : -90} y={0} duration={0.9} stagger={false}>
                  <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-white/55">
                    <span className="h-px w-8 bg-white/30" />{s.year}
                    {s.confirm && <span className="text-[9px] tracking-[0.2em] text-white/35">To confirm</span>}
                  </div>
                  <h3 className="mt-4 flex items-center gap-4 font-display text-[1.6rem] sm:text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em]">
                    <span>{s.title}</span><span className="hidden sm:block h-px w-10 shrink-0 bg-white/25" />
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] sm:text-base leading-relaxed text-mute">{s.line}</p>
                </Reveal>
                <Reveal delay={0.08} className={flip ? "lg:order-1" : ""} x={flip ? -90 : 90} y={0} duration={0.9}>
                  <div className={`relative ${flip ? "mr-6 sm:mr-10" : "ml-6 sm:ml-10"} mt-8`}>
                    {/* thin frame the photo sits over */}
                    <div className={`absolute -top-8 bottom-10 border border-white/15 ${flip ? "left-10 -right-6 sm:-right-10" : "-left-6 sm:-left-10 right-10"}`} aria-hidden />
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
                      <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
