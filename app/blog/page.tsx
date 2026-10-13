import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { seo } from "@/content/seo";
import { Reveal, SectionHeading, Button } from "@/components/ui";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: seo["/blog"].title, description: seo["/blog"].description, alternates: { canonical: "/blog" } };

export default function Page() {
  return (
    <Shell>
      <section className="pt-32 pb-20 min-h-[70svh]"><div className="container-x"><Reveal><SectionHeading as="h1" eyebrow="BLOG" title="STORIES FROM THE STAGE" sub="Blog posts are being migrated from the previous site. Follow us on Instagram and Facebook for the latest performances, achievements and class updates." /><div className="mt-8 flex gap-3 flex-wrap"><Button href={contact.instagram} variant="outline">INSTAGRAM</Button><Button href={contact.facebook} variant="outline">FACEBOOK</Button><Button href={contact.youtube} variant="outline">YOUTUBE</Button></div></Reveal></div></section>
    </Shell>
  );
}
