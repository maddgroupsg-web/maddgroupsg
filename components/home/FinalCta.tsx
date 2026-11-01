import Image from "next/image";
import { finalCta } from "@/content/home";
import { BOOK_TRIAL_URL } from "@/content/site";
import { Button, Reveal, Words } from "@/components/ui";

export default function FinalCta({ image = "/images/classes/age-10-18/age-10-18-08.jpg", headline = finalCta.headline, primary = { label: finalCta.primary, href: "/contact" }, secondary = { label: finalCta.secondary, href: BOOK_TRIAL_URL } }: { image?: string; headline?: string[]; primary?: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="relative overflow-hidden curtain">
      <div className="absolute inset-0"><Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-50" /><div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" /></div>
      <Reveal className="container-x relative py-28 lg:py-36 text-center">
        <div className="eyebrow">THE NEXT PERFORMANCE STARTS WITH ONE STEP</div>
        <h2 className="display mt-3 text-5xl sm:text-7xl lg:text-8xl"><Words><span className="block">{headline[0]}</span><span className="block text-accent">{headline[1]}</span></Words></h2>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button href={primary.href}>{primary.label}</Button>
          <Button href={secondary.href} variant="outline">{secondary.label}</Button>
        </div>
      </Reveal>
    </section>
  );
}
