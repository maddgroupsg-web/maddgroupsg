import Image from "next/image";
import Link from "next/link";
import { story } from "@/content/story";
import { maddGroup } from "@/content/home";
import { Reveal } from "@/components/ui";

// How MADDspace came about. Alternating rows: the year, title and line on one side, and the whole photo on the
// other, sitting over a thin outlined frame. No cuts, no scrubbing. Ends with the four pillars of The MADD Group.
export default function StoryReveal() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border-t border-line" aria-label="How MADDspace came about">
      <div className="container-x">
        <Reveal>
          <h2 className="display grid gap-1 lg:grid-cols-2 lg:gap-10">
            <span className="block">From one studio</span>
            <span className="block lg:mt-10 lg:text-right text-white/60">to a whole stage.</span>
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-24 space-y-20 lg:space-y-32">
          {story.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-white/55">
                    <span className="h-px w-8 bg-white/30" />{s.year}
                    {s.confirm && <span className="text-[9px] tracking-[0.2em] text-white/35">To confirm</span>}
                  </div>
                  <h3 className="mt-4 flex items-center gap-4 font-display text-[1.6rem] sm:text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em]">
                    <span>{s.title}</span><span className="hidden sm:block h-px w-10 shrink-0 bg-white/25" />
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] sm:text-base leading-relaxed text-mute">{s.line}</p>
                </Reveal>
                <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                  <div className={`relative ${flip ? "mr-6 sm:mr-10" : "ml-6 sm:ml-10"} mt-8`}>
                    {/* thin frame the photo sits over */}
                    <div className={`absolute -top-8 bottom-10 border border-white/15 ${flip ? "left-10 -right-6 sm:-right-10" : "-left-6 sm:-left-10 right-10"}`} aria-hidden />
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                      <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-x mt-24 lg:mt-36">
        <Reveal>
          <h3 className="display text-center !text-[clamp(1.75rem,1.1rem+1.9vw,2.75rem)]">The MADD Group</h3>
          <p className="mt-3 text-center text-white/60">Four pillars. One ecosystem.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4">
          {maddGroup.pillars.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Link href={p.href} className="group relative block aspect-[3/4] overflow-hidden">
                <Image src={p.image} alt={`${p.name} — ${p.verb}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                {i > 0 && <div className="absolute inset-y-0 left-0 w-px bg-white/10" />}
                {p.logo && <div className="absolute top-4 right-4 h-10 w-10 lg:h-12 lg:w-12 flex items-start justify-end"><Image src={p.logo} alt="" width={120} height={120} className="max-h-full w-auto object-contain" /></div>}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-2xl sm:text-3xl font-semibold leading-none tracking-[-0.02em]">{p.verb.charAt(0) + p.verb.slice(1).toLowerCase()}</div>
                  <div className="mt-1.5 text-[11px] tracking-[0.14em] uppercase text-white/60">{p.name}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
