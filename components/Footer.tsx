import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from "@/components/Social";
import { contact, locations, footerBrowse, BOOK_TRIAL_URL } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2 mt-auto">
      <div className="container-x py-14 grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/images/brand/maddspace-logo.png" alt="MADDspace" width={738} height={738} className="h-14 w-auto" />
          <h3 className="display text-3xl mt-6">CONTACT US</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><a href={`tel:${contact.phoneIntl}`} className="hover:text-cyan">{contact.phone}</a></li>
            <li><a href={`https://wa.me/${contact.whatsappIntl}`} className="hover:text-cyan">{contact.whatsapp} (WhatsApp)</a></li>
            <li><a href={`mailto:${contact.email}`} className="hover:text-cyan">{contact.email}</a></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={contact.instagram} aria-label="Instagram" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><InstagramIcon /></a>
            <a href={contact.facebook} aria-label="Facebook" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><FacebookIcon /></a>
            <a href={contact.youtube} aria-label="YouTube" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><YoutubeIcon /></a>
          </div>
        </div>
        <div>
          <h3 className="display text-3xl">LOCATIONS</h3>
          <ul className="mt-4 space-y-5 text-sm">
            {locations.map((l) => (
              <li key={l.key}>
                <div className="font-semibold text-white">{l.name}</div>
                <a href={l.maps} target="_blank" rel="noopener" className="text-white/70 hover:text-cyan">{l.address}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="display text-3xl">BROWSE</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[12px] tracking-[0.1em] text-white/70">
            {footerBrowse.map((b) => <li key={b.label + b.href}><Link href={b.href} className="hover:text-cyan">{b.label}</Link></li>)}
          </ul>
          <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-primary mt-8">BOOK A TRIAL</a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x py-5 text-[12px] text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 MADDspace. All Rights Reserved. Singing and dancing school for Kids Singapore</span>
          <span>GR.ID Central · The Chevrons West</span>
        </div>
      </div>
      <a href={`https://wa.me/${contact.whatsappIntl}`} target="_blank" rel="noopener" aria-label="WhatsApp MADDspace" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition-transform">
        <WhatsAppIcon size={30} />
      </a>
    </footer>
  );
}
