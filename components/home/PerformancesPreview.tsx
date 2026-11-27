import Image from "next/image";
import Link from "next/link";
import { featuredVideos } from "@/content/videos";
import { Button, Reveal, SectionHeading } from "@/components/ui";

// Three performances, laid out like blog posts: poster, event, title. Links to the performances page.
export default function PerformancesPreview() {
  const picks = featuredVideos.slice(0, 3);
  return (
    <section className="py-20 lg:py-24 border-t border-line">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <SectionHeading eyebrow="Real stage experience" title="Performances" />
            <Button href="/performances" variant="outline">All performances</Button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {picks.map((v, i) => (
            <Reveal key={v.slug} delay={i * 0.08}>
              <Link href="/performances" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden border border-line bg-ink-2">
                  <Image src={v.poster} alt={v.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 eyebrow text-white/50">{v.event} · {v.style}</div>
                <h3 className="display text-2xl mt-1.5">{v.title}</h3>
                <div className="mt-2 text-sm text-accent">Watch</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
