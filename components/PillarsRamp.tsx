import Image from "next/image";
import Link from "next/link";
import { maddGroup } from "@/content/home";

// One continuous, slanted "ramp": the four pillars rise from small (Learn) to big (Launch), no card gaps.
const H = [66, 77, 88, 99]; // % height of each step, left → right (gentle, continuous slope)

export default function PillarsRamp() {
  const p = maddGroup.pillars;
  return (
    <div className="relative">
      {/* desktop / tablet ramp */}
      <div className="relative hidden md:block h-[460px] lg:h-[560px]">
        {/* neon diagonal along the top edge */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-20 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline points={`0,${100 - H[0]} 100,${100 - H[H.length - 1] - (H[1] - H[0])}`} fill="none" stroke="#22d3d3" strokeWidth="0.35" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 6px rgba(34,211,211,.9))" }} />
        </svg>
        <div className="absolute inset-0 flex">
          {p.map((pl, i) => {
            const step = H[1] - H[0]; const top = 100 - H[i], next = 100 - (H[i] + step);
            return (
              <Link key={pl.name} href={pl.href} className="group relative flex-1 -ml-px first:ml-0" style={{ clipPath: `polygon(0 ${top}%, 100% ${next}%, 100% 100%, 0 100%)` }}>
                <Image src={pl.image} alt={`${pl.name} — ${pl.verb}`} fill sizes="25vw" className="object-cover opacity-55 transition-all duration-700 group-hover:opacity-90 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                  <div className="display text-accent text-xl lg:text-2xl">{String(i + 1).padStart(2, "0")} · {pl.verb}</div>
                  <div className="display text-3xl lg:text-4xl leading-none mt-1">{pl.name}</div>
                  <p className="mt-2 hidden lg:block text-xs text-white/75 max-w-[26ch] leading-snug">{pl.copy}</p>
                  <span className="mt-3 inline-block text-[11px] tracking-[0.2em] text-accent font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">EXPLORE →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* mobile: stacked steps that grow downwards, slanted bottoms */}
      <div className="md:hidden flex flex-col">
        {p.map((pl, i) => (
          <Link key={pl.name} href={pl.href} className="relative -mt-2 first:mt-0" style={{ height: 160 + i * 34, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 88%)" }}>
            <Image src={pl.image} alt={`${pl.name} — ${pl.verb}`} fill sizes="100vw" className="object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute left-4 bottom-11"><div className="display text-accent text-lg">{String(i + 1).padStart(2, "0")} · {pl.verb}</div><div className="display text-3xl leading-none">{pl.name}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
