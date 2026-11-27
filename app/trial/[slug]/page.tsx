import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { landings } from "@/content/landing";
import { instructors } from "@/content/instructors";
import { contact } from "@/content/site";
import { Button, Reveal } from "@/components/ui";
import { LearnGrid, PathSteps, TrialBox } from "@/components/Blocks";
import VideoEmbed from "@/components/VideoEmbed";
import FAQ from "@/components/FAQ";
import LogoMarquee from "@/components/LogoMarquee";
import { WhatsAppIcon } from "@/components/Social";

export function generateStaticParams() { return landings.map((l) => ({ slug: l.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const l = landings.find((x) => x.slug === slug); if (!l) return {};
  return { title: l.title, description: l.description, robots: { index: false, follow: true }, alternates: { canonical: l.canonical } };
}

export default async function Landing({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = landings.find((x) => x.slug === slug);
  if (!l) notFound();
  const mentors = l.mentors.instructorSlugs.map((s) => instructors.find((i) => i.slug === s)!).filter(Boolean);
  return (
    <div data-theme={l.theme} className="min-h-screen bg-ink text-white">
      {/* minimal campaign nav */}
      <header className="fixed inset-x-0 top-0 z-50 bg-ink/80 backdrop-blur border-b border-line">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="MADDspace"><Image src="/images/brand/maddspace-logo.png" alt="MADDspace" width={738} height={738} className="h-10 w-auto" priority /></Link>
          <nav className="hidden md:flex gap-6 text-[11px] tracking-[0.2em] text-white/80">{l.nav.map((n) => <a key={n.href} href={n.href} className="hover:text-accent">{n.label}</a>)}</nav>
          <a href={l.trial.url} target="_blank" rel="noopener" className="btn btn-outline !py-2.5 !px-4 text-[11px]">BOOK A TRIAL</a>
        </div>
      </header>

      {/* Hero */}
      <section id="programme" className="relative min-h-[100svh] flex items-end lg:items-center overflow-hidden">
        <Image src={l.hero.image} alt="" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        <div className="container-x relative py-28 lg:py-32 max-w-3xl">
          <Reveal>
            {l.hero.eyebrow && <div className="eyebrow">{l.hero.eyebrow}</div>}
            <h1 className="display mt-4 text-[3.2rem] leading-[0.9] sm:text-7xl lg:text-8xl">{l.hero.lines.map((x, i) => <span key={i} className={x.accent ? "text-accent" : ""}>{x.text}{/(\.|\?)\s*$/.test(x.text) && <br />}</span>)}</h1>
            <p className="mt-5 max-w-lg text-base sm:text-lg text-white/85">{l.hero.sub}</p>
            <ul className="mt-6 flex flex-wrap gap-2">{l.hero.chips.map((c) => <li key={c} className="glass rounded-md px-3 py-2 text-[11px] tracking-[0.15em] uppercase">{c}</li>)}</ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center"><Button href={l.trial.url}>{l.hero.cta}</Button><Button href="#learn" variant="ghost">{l.hero.secondary}</Button></div>
          </Reveal>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <Reveal><div className="eyebrow">{l.video.eyebrow}</div><h2 className="display mt-3 text-5xl sm:text-6xl"><span className="block">{l.video.headline[0]}</span><span className="block text-accent">{l.video.headline[1]}</span></h2><div className="mt-5 space-y-3 text-mute">{l.video.copy.map((p) => <p key={p}>{p}</p>)}</div></Reveal>
          <Reveal delay={0.1}>{(l.video.video || l.video.youtube) ? <VideoEmbed url={l.video.video ?? l.video.youtube!} poster={l.video.poster} title={l.video.caption} caption={l.video.caption} /> : <div className="relative aspect-video rounded-xl overflow-hidden"><Image src={l.video.poster} alt="" fill sizes="60vw" className="object-cover" /></div>}</Reveal>
        </div>
      </section>

      <LearnGrid title={l.learn.headline} items={l.learn.items} images={l.learn.items.map((i) => i.image)} />
      <PathSteps title={l.journey.headline} steps={l.journey.steps} images={l.journey.steps.map((s) => s.image)} />

      {/* Mentors */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal><div className="eyebrow">{l.mentors.eyebrow}</div><h2 className="display mt-3 text-5xl sm:text-6xl">{l.mentors.headline}</h2><p className="mt-4 text-mute">{l.mentors.copy}</p><div className="mt-6"><Button href="/instructors" variant="outline">MEET THE INSTRUCTORS</Button></div></Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{mentors.map((m, i) => <Reveal key={m.slug} delay={i * 0.09}><figure className="rounded-lg overflow-hidden border border-line bg-ink-3"><div className="relative aspect-[3/4]"><Image src={m.image} alt={m.name} fill sizes="25vw" className="object-cover object-top" /></div><figcaption className="p-3"><div className="font-semibold text-sm uppercase">{m.name}</div><div className="text-[10px] tracking-wider uppercase text-accent">{m.role}</div></figcaption></figure></Reveal>)}</div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-ink-2 border-y border-line relative overflow-hidden"><div className="container-x relative text-center max-w-3xl mx-auto"><Reveal><div className="eyebrow">PARENTS SAY IT BEST</div><blockquote className="mt-5 text-2xl sm:text-3xl italic leading-relaxed">“{l.quote.text}”</blockquote><div className="mt-4 text-xs tracking-[0.2em] uppercase text-accent">— {l.quote.name}</div></Reveal></div></section>

      <TrialBox title={l.trial.headline} lead={l.trial.copy} included={l.trial.included} meta={l.trial.price} guarantee={l.trial.guarantee} cta={l.trial.cta} url={l.trial.url} />

      <section id="faq" className="py-16 scroll-mt-20"><div className="container-x grid gap-8 lg:grid-cols-[1fr_2fr]"><Reveal><h2 className="display text-5xl">FREQUENTLY<br />ASKED<br />QUESTIONS</h2><a href={`https://wa.me/${contact.whatsappIntl}`} className="btn btn-outline mt-6"><WhatsAppIcon size={16} /> WHATSAPP US</a></Reveal><Reveal delay={0.1}><FAQ items={l.faq} /></Reveal></div></section>
      <LogoMarquee compact title="FEATURED ON" sub="" />

      {/* Final */}
      <section className="relative overflow-hidden"><Image src={l.final.image} alt="" fill sizes="100vw" className="object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" /><Reveal className="container-x relative py-28 lg:py-36 text-center"><h2 className="display text-6xl sm:text-8xl"><span className="block">{l.final.headline[0]}</span><span className="block text-accent">{l.final.headline[1]}</span></h2><div className="mt-8"><Button href={l.trial.url}>{l.final.cta}</Button></div></Reveal></section>
      <footer className="border-t border-line py-6 text-center text-[11px] text-white/50">© 2026 MADDspace. All Rights Reserved. · <Link href="/" className="hover:text-accent">maddspace.com.sg</Link> · <a href={`https://wa.me/${contact.whatsappIntl}`} className="hover:text-accent">WhatsApp {contact.whatsapp}</a></footer>
    </div>
  );
}
