import { Check } from "lucide-react";
import { Reveal } from "@/components/ui";
import Image from "next/image";
import VideoEmbed from "@/components/VideoEmbed";
import { Button } from "@/components/ui";

export function Checks({ items, className = "" }: { items: string[]; className?: string }) {
  return <ul className={`space-y-2 ${className}`}>{items.map((c) => <li key={c} className="flex gap-2.5 text-sm sm:text-base text-white/85"><Check size={18} className="text-accent shrink-0 mt-0.5" />{c}</li>)}</ul>;
}

export function WhyGrid({ title, items, images }: { title: string; items: { title: string; copy: string[] }[]; images: string[] }) {
  return (
    <section className="py-16 lg:py-24 border-y border-line bg-ink-2">
      <div className="container-x">
        <Reveal><h2 className="display text-4xl sm:text-6xl max-w-3xl">{title}</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.09} className="group rounded-xl overflow-hidden border border-line bg-ink-3 hover:border-accent/60 transition-colors">
              <div className="relative aspect-[4/3]"><Image src={images[i % images.length]} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink-3 to-transparent" /></div>
              <div className="p-6"><h3 className="display text-3xl">{w.title}</h3>{w.copy.map((p) => <p key={p} className="mt-2 text-sm text-mute leading-relaxed">{p}</p>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LearnGrid({ title, intro, items, images }: { title: string; intro?: string; items: { title: string; copy: string }[]; images: string[] }) {
  return (
    <section id="learn" className="py-16 lg:py-24 scroll-mt-20">
      <div className="container-x">
        <Reveal><h2 className="display text-4xl sm:text-6xl">{title}</h2>{intro && <p className="mt-4 max-w-3xl text-mute">{intro}</p>}</Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.09} className="glass rounded-xl overflow-hidden">
              <div className="relative aspect-[16/10]"><Image src={images[i % images.length]} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /></div>
              <div className="p-5"><h3 className="display text-2xl sm:text-3xl">{l.title}</h3><p className="mt-2 text-sm text-mute">{l.copy}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PathSteps({ title, intro, steps, images }: { title: string; intro?: string; steps: { n: string; title: string; copy: string }[]; images: string[] }) {
  return (
    <section id="pathway" className="py-16 lg:py-24 bg-ink-2 border-y border-line scroll-mt-20">
      <div className="container-x">
        <Reveal><h2 className="display text-4xl sm:text-6xl">{title}</h2>{intro && <p className="mt-3 text-mute">{intro}</p>}</Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09} className="relative rounded-xl overflow-hidden border border-line min-h-[320px] group">
              <Image src={images[i % images.length]} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="display text-accent text-5xl">{s.n.padStart(2, "0")}</div>
                <h3 className="display text-3xl sm:text-4xl">{s.title}</h3>
                <p className="mt-2 text-sm text-white/80">{s.copy}</p>
              </div>
              {i < steps.length - 1 && <div className="hidden md:block absolute right-[-14px] top-1/2 z-10 h-7 w-7 rounded-full bg-accent text-ink items-center justify-center text-xs font-bold md:flex">→</div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrewBlocks({ title, crews }: { title: string; crews: { name: string; copy: string[]; bullets?: string[]; video?: string; image: string }[] }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal><h2 className="display text-4xl sm:text-6xl">{title}</h2></Reveal>
        <div className="mt-10 space-y-10">
          {crews.map((c, i) => (
            <div key={c.name} className={`grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>{c.video ? <VideoEmbed url={c.video} poster={c.image} title={c.name} /> : <div className="relative aspect-video rounded-xl overflow-hidden glow-border"><Image src={c.image} alt={c.name} fill sizes="50vw" className="object-cover" /></div>}</Reveal>
              <Reveal delay={0.1}>
                <h3 className="display text-4xl sm:text-5xl">{c.name}</h3>
                <div className="mt-3 space-y-3 text-sm sm:text-base text-mute leading-relaxed">{c.copy.map((p) => <p key={p}>{p}</p>)}</div>
                {c.bullets && <ul className="mt-3 space-y-1.5 text-sm text-white/85">{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                {c.video && <div className="mt-5"><Button href={c.video} variant="ghost">WATCH VIDEO</Button></div>}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrialBox({ title, lead, included, meta, guarantee, cta, url }: { title: string; lead: string; included: string[]; meta?: string; guarantee: string; cta: string; url: string }) {
  return (
    <section id="trial" className="py-16 lg:py-20 scroll-mt-20">
      <div className="container-x">
        <Reveal className="glass glow-border rounded-2xl p-8 sm:p-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow">CHOOSING THE RIGHT SCHOOL MATTERS</div>
            <h2 className="display text-4xl sm:text-6xl mt-2">{title}</h2>
            <p className="mt-3 text-mute">{lead}</p>
            <p className="mt-4 font-semibold text-white">What&apos;s included:</p>
            <Checks items={included} className="mt-2" />
            <p className="mt-5 text-sm text-accent font-semibold">{guarantee}</p>
          </div>
          <div className="text-center lg:text-left">
            {meta && <p className="text-lg text-white/90">{meta}</p>}
            <a href={url} target="_blank" rel="noopener" className="btn btn-primary mt-5 w-full sm:w-auto">{cta}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
