import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsAppIcon } from "@/components/Social";
import { contact, footerBrowse } from "@/content/site";
import { toSentence } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2 mt-auto">
      <div className="container-x py-14 grid gap-12 lg:grid-cols-[1fr_auto]">
        <div>
          <Image src="/images/brand/maddspace-logo.png" alt="MADDspace" width={738} height={738} className="h-14 w-auto" />
          <div className="mt-6 flex gap-3">
            <a href={contact.instagram} aria-label="Instagram" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><InstagramIcon /></a>
            <a href={contact.facebook} aria-label="Facebook" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><FacebookIcon /></a>
            <a href={contact.youtube} aria-label="YouTube" className="p-2 rounded-full border border-line hover:border-cyan hover:text-cyan"><YoutubeIcon /></a>
          </div>
        </div>
        <div className="lg:justify-self-end">
          <h3 className="display text-3xl">Browse</h3>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2 text-[13px] text-white/70">
            {footerBrowse.map((b) => <li key={b.label + b.href}><Link href={b.href} className="hover:text-white">{toSentence(b.label)}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x py-5 text-[12px] text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 MADDspace. All Rights Reserved. Singing and dancing school for Kids Singapore</span>
          <span>GR.ID Central · The Chevrons West</span>
        </div>
      </div>
      <a href={`https://wa.me/${contact.whatsappIntl}`} target="_blank" rel="noopener" aria-label="WhatsApp MADDspace" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition-transform" style={{ borderRadius: 9999 }}>
        <WhatsAppIcon size={30} />
      </a>
    </footer>
  );
}
