import MediaLogos from "@/components/home/MediaLogos";

// Inner pages use the same media logo section as the home page. Older pages still pass a "sub" line; it is no
// longer shown, so every page reads the same.
export default function LogoMarquee({ title, compact = false }: { title?: string; sub?: string; compact?: boolean }) {
  return <MediaLogos title={title} compact={compact} />;
}
