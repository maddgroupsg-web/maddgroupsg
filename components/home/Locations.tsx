import { MapPin, Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";
import { locations, contact } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";
import EnquiryForm from "@/components/EnquiryForm";

export default function Locations({ formTitle = "Sign Up", formCopy, preset }: { formTitle?: string; formCopy?: string; preset?: string }) {
  return (
    <section id="locations" className="relative py-20 lg:py-28 bg-ink-2 border-t border-line">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="TWO STUDIOS" title="CENTRAL & WEST" sub="Choose the studio closest to you. Both run group classes, private lessons and trials." />
          <div className="mt-8 space-y-4">
            {locations.map((l) => (
              <a key={l.key} href={l.maps} target="_blank" rel="noopener" className="glass block rounded-xl p-5 hover:border-cyan/60 transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="text-cyan shrink-0 mt-0.5" />
                  <div>
                    <div className="display text-2xl">{l.name}</div>
                    <div className="text-sm text-white/80">{l.address}</div>
                    <div className="text-xs text-white/50 mt-1">{l.note}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <ul className="mt-8 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone size={15} className="text-cyan" /><a href={`tel:${contact.phoneIntl}`}>{contact.phone}</a></li>
            <li className="flex items-center gap-2"><WhatsAppIcon size={15} className="text-cyan" /><a href={`https://wa.me/${contact.whatsappIntl}`}>{contact.whatsapp} (WhatsApp)</a></li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-cyan" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}><EnquiryForm title={formTitle} copy={formCopy} preset={preset} /></Reveal>
      </div>
    </section>
  );
}
