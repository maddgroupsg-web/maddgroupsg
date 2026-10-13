import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pathways } from "@/content/home";
import { Reveal, SectionHeading } from "@/components/ui";

export default function Pathways() {
  return (
    <section id="pathway" className="relative py-20 lg:py-28">
      <div className="container-x">
        <Reveal><SectionHeading eyebrow="PATHWAY DISCOVERY" title={pathways.headline} sub={pathways.intro} /></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <Link href={c.href} className="group relative block overflow-hidden rounded-xl border border-line bg-ink-3 aspect-[4/3] sm:aspect-[5/4]">
                <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-cyan/70 transition-all rounded-xl" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="display text-3xl sm:text-4xl">{c.title}</h3>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan/70 text-cyan transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-cyan">{c.tag}</p>
                  <p className="mt-1 text-sm text-white/75">{c.copy}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
