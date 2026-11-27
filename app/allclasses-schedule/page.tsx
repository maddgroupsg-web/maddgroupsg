import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal, Button } from "@/components/ui";
import ClassFinder from "@/components/ClassFinder";
import { BOOK_TRIAL_URL, PRIVATE_BOOKING_URL } from "@/content/site";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = { title: seo["/allclasses-schedule"].title, description: seo["/allclasses-schedule"].description, alternates: { canonical: "/allclasses-schedule" } };

export default function SchedulePage() {
  return (
    <Shell>
      <section className="relative pt-28 lg:pt-36 pb-16">
        <div className="container-x relative">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="eyebrow">PERSONALISED CLASS FINDER</div>
              <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">GROUP CLASS SCHEDULE</h1>
              <h2 className="mt-3 text-mute text-lg">Find the perfect class here! Tell us a little about your child and we&apos;ll show the most suitable classes.</h2>
            </div>
            <div className="flex flex-wrap gap-3"><Button href={PRIVATE_BOOKING_URL} variant="outline">PRIVATE CLASSES</Button><Button href={BOOK_TRIAL_URL}>BOOK A TRIAL</Button></div>
          </Reveal>
          <div className="mt-10"><ClassFinder /></div>
          <p className="mt-10 text-xs text-white/50 max-w-2xl">Check out our available group classes here! Live availability is confirmed when you book. Short Courses and Holiday Camps have their own pages. <a href="/images/misc/schedule-2026.png" target="_blank" className="text-cyan">View the full term schedule (PDF/image) →</a></p>
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
