import Image from "next/image";
import Link from "next/link";
import { maddGroup } from "@/content/home";
import { Reveal } from "@/components/ui";

// The MADD Group — centred heading + four flush photo panels. Normal scrolling (no pin);
// the panels fade in left → right as the row enters view. On phones the row scrolls sideways.
export default function MaddGroupPanels() {
  return (
    <section id="madd-group" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 spotlight opacity-70" />
      <div className="container-x relative">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="display normal-case text-5xl sm:text-6xl lg:text-7xl">The MADD Group</h2>
          <p className="mt-3 text-lg sm:text-xl text-cyan">More than a performing arts school.</p>
          <p className="mt-4 text-mute">{maddGroup.copy[0]}</p>
        </Reveal>

        <div className="mt-12 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar">
          <div className="flex lg:grid lg:grid-cols-4 lg:rounded-2xl lg:overflow-hidden min-w-max lg:min-w-0">
            {maddGroup.pillars.map((p, i) => (
              <Reveal key={p.name} className="snap-start shrink-0 w-[78vw] sm:w-[48vw] lg:w-auto">
                <Link href={p.href} className="group relative block aspect-[3/4] lg:aspect-[3/4] overflow-hidden">
                  <Image src={p.image} alt={`${p.name} — ${p.verb}`} fill sizes="(max-width: 1024px) 78vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  {i > 0 && <div className="hidden lg:block absolute inset-y-0 left-0 w-px bg-white/10" />}
                  {p.logo && <div className="absolute top-4 right-4 lg:top-5 lg:right-5 h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 flex items-start justify-end"><Image src={p.logo} alt="" width={160} height={160} className="max-h-full w-auto object-contain object-right-top drop-shadow-[0_2px_10px_rgba(0,0,0,.6)]" /></div>}
                  <div className="absolute inset-x-0 top-0 p-5 pr-20 lg:p-6 lg:pr-24">
                    <h3 className="display text-4xl sm:text-5xl lg:text-[clamp(2rem,3.2vw,3.2rem)] leading-none text-white">{p.verb}</h3>
                    <div className="mt-1.5 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-cyan">{p.name}</div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                    <p className="text-[12px] sm:text-sm text-white/85 leading-snug max-w-[34ch]">{p.copy}</p>
                    <span className="mt-3 inline-block text-[11px] tracking-[0.2em] text-cyan font-semibold">EXPLORE →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
