"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/Social";
import { nav, BOOK_TRIAL_URL, contact, type NavItem } from "@/content/site";
import { cn, toSentence } from "@/lib/utils";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const path = usePathname();
  useEffect(() => { const f = () => setSolid(window.scrollY > 24); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", solid || open ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-gradient-to-b from-black/70 to-transparent")}>
      <div className="hidden lg:flex container-x h-9 items-center justify-between text-[11px] tracking-widest text-white/60">
        <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
        <div className="flex items-center gap-5">
          <a href={`https://wa.me/${contact.whatsappIntl}`} className="flex items-center gap-1.5 hover:text-white"><WhatsAppIcon size={13} /> {contact.whatsapp}</a>
          <a href={`tel:${contact.phoneIntl}`} className="flex items-center gap-1.5 hover:text-white"><Phone size={12} /> {contact.phone}</a>
        </div>
      </div>
      <div className="container-x flex h-16 lg:h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="MADDspace home">
          <Image src="/images/brand/maddspace-logo.png" alt="MADDspace — Music, Art, Drama, Dance Space" width={738} height={738} className="h-10 lg:h-12 w-auto" priority />
        </Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <div key={item.label} className="relative group">
              <Link href={item.href} className={cn("flex items-center gap-1 px-2 xl:px-3 py-2 text-[13.5px] font-medium tracking-[0.005em] whitespace-nowrap text-white/85 hover:text-cyan transition-colors", path === item.href && "text-cyan")}>
                {toSentence(item.label)}{item.children && <ChevronDown size={13} className="opacity-70" />}
              </Link>
              {item.children && <Dropdown item={item} />}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-outline !py-2.5 !px-4 text-[11px] whitespace-nowrap"><span className="btn-label" data-text="Book a trial"><span>Book a trial</span></span></a>
          <button className="lg:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-ink overflow-y-auto border-t border-line">
          <div className="container-x py-4">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-line">
                <div className="flex items-center">
                  <Link href={item.href} className="flex-1 py-4 font-medium text-white">{toSentence(item.label)}</Link>
                  {item.children && (
                    <button className="p-3 text-cyan" onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)} aria-label={`Expand ${item.label}`}>
                      <ChevronDown className={cn("transition-transform", mobileGroup === item.label && "rotate-180")} />
                    </button>
                  )}
                </div>
                {item.children && mobileGroup === item.label && (
                  <div className="pb-3 pl-3">
                    {groupify(item.children).map(([g, items]) => (
                      <div key={g}>
                        {g && <div className="pt-2 pb-1 text-[10px] tracking-[0.25em] text-cyan/80">{g}</div>}
                        {items.map((c) => <Link key={c.href + c.label} href={c.href} className="block py-2 text-sm text-white/80">{toSentence(c.label)}</Link>)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a href={BOOK_TRIAL_URL} target="_blank" rel="noopener" className="btn btn-primary"><span className="btn-label" data-text="Book a trial class"><span>Book a trial class</span></span></a>
              <a href={`https://wa.me/${contact.whatsappIntl}`} className="btn btn-outline"><WhatsAppIcon size={16} /> WHATSAPP {contact.whatsapp}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Photo shown on the right of the Programmes menu for each link.
const menuPhoto: Record<string, string> = {
  "/preschool-classes": "/images/classes/age-3-5/age-3-5-05.jpg",
  "/junior-kids": "/images/classes/age-6-9/age-6-9-06.jpg",
  "/preteens-teens-classes": "/images/classes/age-10-18/age-10-18-07.jpg",
  "/youth-adults": "/images/classes/age-18-35/age-18-35-02.jpg",
  "/idol-training-singapore": "/images/classes/age-10-18/age-10-18-02.jpg",
  "/singing-classes-singapore": "/images/classes/age-10-18/age-10-18-01.jpg",
  "/hiphop": "/images/video-posters/mj-2025-maddnificent.jpg",
  "/kpop": "/images/video-posters/mj-2025-kstars.jpg",
  "/private-classes": "/images/classes/age-3-5/age-3-5-01.jpg",
  "/dance-class-for-toddlers": "/images/classes/age-3-5/age-3-5-08.jpg",
  "/dance-classes-for-kids": "/images/classes/age-6-9/age-6-9-03.jpg",
};

// Desktop dropdown. A grouped menu (Programmes) opens wide, with the links in columns and a photo of the
// hovered link on the right. Plain menus stay a short list.
function Dropdown({ item }: { item: NavItem }) {
  const kids = item.children!;
  const groups = groupify(kids);
  const wide = groups.some(([g]) => g);
  const [hov, setHov] = useState<string>(kids[0].href);
  const photo = menuPhoto[hov] ?? menuPhoto[kids[0].href];
  const current = kids.find((c) => c.href === hov) ?? kids[0];
  if (!wide) {
    return (
      <div className="absolute left-0 top-full pt-3 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
        <div className="min-w-[240px] border border-white/10 bg-[#0b0d10] p-2 shadow-2xl shadow-black/80">
          {kids.map((c) => <Link key={c.href + c.label} href={c.href} className="block px-3 py-2.5 text-[14px] text-white/80 hover:bg-white/5 hover:text-white">{toSentence(c.label)}</Link>)}
        </div>
      </div>
    );
  }
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
      <div className="grid w-[900px] grid-cols-[1fr_1fr_300px] gap-10 border border-white/10 bg-[#0b0d10] p-8 shadow-2xl shadow-black/80">
        {groups.map(([g, items]) => (
          <div key={g}>
            <div className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/45">{toSentence(g)}</div>
            <ul>
              {items.map((c) => (
                <li key={c.href + c.label} className="border-b border-white/10 last:border-0">
                  <Link href={c.href} onMouseEnter={() => setHov(c.href)} onFocus={() => setHov(c.href)} className={cn("block py-3 text-[17px] font-medium transition-colors", hov === c.href ? "text-white" : "text-white/70 hover:text-white")}>{toSentence(c.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href={current.href} className="relative block overflow-hidden bg-ink-2" aria-label={toSentence(current.label)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={photo} src={photo} alt="" className="absolute inset-0 h-full w-full object-cover animate-[previewIn_.5s_ease-out]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10">
            <div className="text-[15px] font-medium">{toSentence(current.label)}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function groupify(items: { group?: string; label: string; href: string }[]) {
  const m = new Map<string, typeof items>();
  for (const i of items) { const k = i.group ?? ""; if (!m.has(k)) m.set(k, []); m.get(k)!.push(i); }
  return [...m.entries()];
}
