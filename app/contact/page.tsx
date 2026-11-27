import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal } from "@/components/ui";
import { contact, locations } from "@/content/site";
import EnquiryForm from "@/components/EnquiryForm";
import StudioPhotos from "@/components/StudioPhotos";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";

export const metadata: Metadata = { title: seo["/contact"].title, description: seo["/contact"].description, alternates: { canonical: "/contact" } };

// Photos of each studio, from the Studios page of the current MADDspace site.
const P = (loc: string, n: number) => Array.from({ length: n }, (_, i) => `/images/studios/${loc}-0${i + 1}.jpg`);
const photos: Record<string, string[]> = { central: P("central", 6), west: P("west", 3) };

export default function ContactPage() {
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-20">
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <h1 className="display">Have any questions?</h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mute">If you got any questions, please do not hesitate to send us a message. We will reply as soon as possible!</p>

            <div className="mt-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">Address</div>
            <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {locations.map((l, i) => (
                <li key={l.key}>
                  <a href={l.maps} target="_blank" rel="noopener" className="group flex items-start justify-between gap-4 py-4">
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-white/45">{i === 0 ? "Main branch" : "West"}</span>
                      <span className="mt-1 block text-[15px] font-medium">{l.name}</span>
                      <span className="mt-0.5 block text-[13.5px] text-white/65">{l.address}</span>
                    </span>
                    <ArrowUpRight size={17} className="mt-1 shrink-0 text-white/40 transition-colors group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">Call / WhatsApp us</div>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              <li><a className="flex items-center gap-3 hover:text-white text-white/85" href={`tel:${contact.phoneIntl}`}><Phone size={15} className="text-white/50" />+65 {contact.phone}</a></li>
              <li><a className="flex items-center gap-3 hover:text-white text-white/85" href={`https://wa.me/${contact.whatsappIntl}`}><WhatsAppIcon size={15} className="text-white/50" />+65 {contact.whatsapp} (WhatsApp)</a></li>
              <li><a className="flex items-center gap-3 hover:text-white text-white/85" href={`mailto:${contact.email}`}><Mail size={15} className="text-white/50" />{contact.email}</a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}><EnquiryForm title="Write a message" copy="If you got any questions, please do not hesitate to send us a message. We will reply as soon as possible !" /></Reveal>
        </div>
      </section>

      {/* the two studios: photos, address and a map each */}
      <section className="border-t border-line py-20 lg:py-24">
        <div className="container-x">
          <Reveal><h2 className="display">Visit our studios</h2></Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8">
            {locations.map((l, i) => (
              <Reveal key={l.key} delay={i * 0.08}>
                <StudioPhotos photos={photos[l.key] ?? []} alt={`Inside ${l.name}`} />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{l.name}</h3>
                    <p className="mt-1 text-[13.5px] text-white/65">{l.address}</p>
                    {l.note && <p className="mt-1 text-[13px] text-white/45">{l.note}</p>}
                  </div>
                  <a href={l.maps} target="_blank" rel="noopener" className="btn btn-outline shrink-0 !py-2 !px-3"><span className="btn-label" data-text="Directions"><span>Directions</span></span><ArrowUpRight size={14} /></a>
                </div>
                <iframe title={`Map of ${l.name}`} className="mt-5 h-64 w-full grayscale invert-[0.9] contrast-[0.9]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(l.address)}&output=embed`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
