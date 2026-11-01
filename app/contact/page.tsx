import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal, SectionHeading, Words } from "@/components/ui";
import { contact, locations } from "@/content/site";
import EnquiryForm from "@/components/EnquiryForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";

export const metadata: Metadata = { title: seo["/contact"].title, description: seo["/contact"].description, alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-20">
        <div className="absolute inset-0 spotlight" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading as="h1" eyebrow="CONTACT" title="HAVE ANY QUESTIONS?" sub="If you got any questions, please do not hesitate to send us a message. We will reply as soon as possible!" />
            <h2 className="display text-3xl mt-10"><Words>ADDRESS</Words></h2>
            <div className="mt-4 space-y-4">
              {locations.map((l, i) => <a key={l.key} href={l.maps} target="_blank" rel="noopener" className="glass block rounded-xl p-5 hover:border-cyan/60"><div className="text-[10px] tracking-[0.25em] text-cyan">{i === 0 ? "MAIN BRANCH" : "WEST"}</div><div className="flex items-start gap-3 mt-1"><MapPin className="text-cyan shrink-0" size={18} /><div><div className="font-semibold">{l.name}</div><div className="text-sm text-white/75">{l.address}</div></div></div></a>)}
            </div>
            <h2 className="display text-3xl mt-10"><Words>CALL/WHATSAPP US</Words></h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-center gap-3"><Phone className="text-cyan" size={18} /><a href={`tel:${contact.phoneIntl}`}>+65 {contact.phone}</a></li>
              <li className="flex items-center gap-3"><WhatsAppIcon className="text-cyan" size={18} /><a href={`https://wa.me/${contact.whatsappIntl}`}>+65 {contact.whatsapp} (Whatsapp)</a></li>
              <li className="flex items-center gap-3"><Mail className="text-cyan" size={18} /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}><EnquiryForm title="Write a message" copy="If you got any questions, please do not hesitate to send us a message. We will reply as soon as possible !" /></Reveal>
        </div>
      </section>
      <section className="grid md:grid-cols-2 border-t border-line">
        {locations.map((l) => <iframe key={l.key} title={`Map — ${l.name}`} className="h-72 w-full grayscale invert-[0.9] contrast-[0.9]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(l.address)}&output=embed`} />)}
      </section>
    </Shell>
  );
}
