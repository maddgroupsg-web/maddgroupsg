import Image from "next/image";

// Muted looping background video with poster fallback. Respects prefers-reduced-motion via CSS (video hidden → poster shows).
export default function HeroVideo({ loop, poster, alt, className = "", position = "object-center" }: { loop: string; poster: string; alt: string; className?: string; position?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image src={poster} alt={alt} fill priority sizes="100vw" className={`object-cover ${position}`} />
      <video src={loop} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden className={`absolute inset-0 h-full w-full object-cover ${position} motion-reduce:hidden`} />
    </div>
  );
}
