// Performance videos (from the MADDspace Drive, "Videos - Performances" and "Videos - Public Recording").
// Full videos are hosted under /videos/full (720p), 10s muted loops under /videos/loops, posters under /images/video-posters.
// "Dance Videos 2026" are the professionally filmed outdoor crew videos (Drive folder "Videos - Public Recording").
// Student names are not used in file names or on the site.
export type Vid = {
  slug: string;
  title: string;
  event: "MADDjestic 2025" | "MADD to Shine 2026" | "MADDlodies 2025" | "B-Dazzled 2025" | "APIAF Genting 2025" | "Dance Videos 2026";
  style: "K-Pop" | "Hip Hop" | "Sing & Dance" | "Vocals" | "Dance Video";
  crew?: string;
  src: string;      // full video (mp4)
  poster: string;
  loop?: string;    // short hero/preview loop
  duration?: string;
  featured?: boolean; // appears in the homepage carousel
  href?: string;      // related programme page
};

export const events = ["MADDjestic 2025", "MADD to Shine 2026", "MADDlodies 2025", "B-Dazzled 2025", "APIAF Genting 2025", "Dance Videos 2026"] as const;

export const videos: Vid[] = [
  { slug: "mj-2025-maddartistes", title: "MADDartistes", event: "MADDjestic 2025", style: "Sing & Dance", crew: "MADDartistes", src: "/videos/full/mj-2025-maddartistes.mp4", loop: "/videos/loops/mj-2025-maddartistes.mp4", poster: "/images/video-posters/mj-2025-maddartistes.jpg", featured: true, href: "/idol-training-singapore" },
  { slug: "mj-2025-kstars", title: "K-Stars", event: "MADDjestic 2025", style: "K-Pop", crew: "K-Stars", src: "/videos/full/mj-2025-kstars.mp4", loop: "/videos/loops/mj-2025-kstars.mp4", poster: "/images/video-posters/mj-2025-kstars.jpg", featured: true, href: "/kpop" },
  { slug: "mj-2025-kstars-junior", title: "K-Stars Junior", event: "MADDjestic 2025", style: "K-Pop", crew: "K-Stars Junior", src: "/videos/full/mj-2025-kstars-junior.mp4", loop: "/videos/loops/mj-2025-kstars-junior.mp4", poster: "/images/video-posters/mj-2025-kstars-junior.jpg", href: "/kpop" },
  { slug: "mj-2025-maddnificent", title: "MADDnificent", event: "MADDjestic 2025", style: "Hip Hop", crew: "MADDnificent", src: "/videos/full/mj-2025-maddnificent.mp4", loop: "/videos/loops/mj-2025-maddnificent.mp4", poster: "/images/video-posters/mj-2025-maddnificent.jpg", featured: true, href: "/hiphop" },
  { slug: "mj-2025-dap-a", title: "Developing Artistes A", event: "MADDjestic 2025", style: "Sing & Dance", crew: "Developing Artiste Programme", src: "/videos/full/mj-2025-dap-a.mp4", loop: "/videos/loops/mj-2025-dap-a.mp4", poster: "/images/video-posters/mj-2025-dap-a.jpg", featured: true, href: "/junior-kids" },
  { slug: "mj-2025-dap-b", title: "Developing Artistes B", event: "MADDjestic 2025", style: "Sing & Dance", crew: "Developing Artiste Programme", src: "/videos/full/mj-2025-dap-b.mp4", loop: "/videos/loops/mj-2025-dap-b.mp4", poster: "/images/video-posters/mj-2025-dap-b.jpg", href: "/junior-kids" },
  { slug: "mj-2025-dap-c", title: "Developing Artistes C", event: "MADDjestic 2025", style: "Sing & Dance", crew: "Developing Artiste Programme", src: "/videos/full/mj-2025-dap-c.mp4", loop: "/videos/loops/mj-2025-dap-c.mp4", poster: "/images/video-posters/mj-2025-dap-c.jpg", href: "/junior-kids" },
  { slug: "mj-2025-c11", title: "Class Showcase", event: "MADDjestic 2025", style: "Sing & Dance", src: "/videos/full/mj-2025-c11.mp4", loop: "/videos/loops/mj-2025-c11.mp4", poster: "/images/video-posters/mj-2025-c11.jpg", href: "/classes" },
  { slug: "mts-2026-34-mixxie", title: "M1XXIE", event: "MADD to Shine 2026", style: "K-Pop", crew: "M1XXIE", src: "/videos/full/mts-2026-34-mixxie.mp4", loop: "/videos/loops/mts-2026-34-mixxie.mp4", poster: "/images/video-posters/mts-2026-34-mixxie.jpg", featured: true, href: "/kpop" },
  { slug: "mts-2026-09-solo", title: "Junior Solo", event: "MADD to Shine 2026", style: "Vocals", src: "/videos/full/mts-2026-09-solo.mp4", loop: "/videos/loops/mts-2026-09-solo.mp4", poster: "/images/video-posters/mts-2026-09-solo.jpg", href: "/junior-kids" },
  { slug: "maddlodies-2025-15-group", title: "Hey Mama", event: "MADDlodies 2025", style: "Vocals", src: "/videos/full/maddlodies-2025-15-group.mp4", loop: "/videos/loops/maddlodies-2025-15-group.mp4", poster: "/images/video-posters/maddlodies-2025-15-group.jpg", featured: true, href: "/singing-classes-singapore" },
  { slug: "maddlodies-2025-03-group", title: "当你", event: "MADDlodies 2025", style: "Vocals", src: "/videos/full/maddlodies-2025-03-group.mp4", loop: "/videos/loops/maddlodies-2025-03-group.mp4", poster: "/images/video-posters/maddlodies-2025-03-group.jpg", href: "/singing-classes-singapore" },
  { slug: "maddlodies-2025-11-solo", title: "Popular", event: "MADDlodies 2025", style: "Vocals", src: "/videos/full/maddlodies-2025-11-solo.mp4", loop: "/videos/loops/maddlodies-2025-11-solo.mp4", poster: "/images/video-posters/maddlodies-2025-11-solo.jpg", href: "/singing-classes-singapore" },
  { slug: "maddlodies-2025-25-solo", title: "母系社会", event: "MADDlodies 2025", style: "Vocals", src: "/videos/full/maddlodies-2025-25-solo.mp4", loop: "/videos/loops/maddlodies-2025-25-solo.mp4", poster: "/images/video-posters/maddlodies-2025-25-solo.jpg", href: "/singing-classes-singapore" },
  { slug: "bdazzled-2025-solo-607", title: "Solo 607", event: "B-Dazzled 2025", style: "Hip Hop", src: "/videos/full/bdazzled-2025-solo-607.mp4", loop: "/videos/loops/bdazzled-2025-solo-607.mp4", poster: "/images/video-posters/bdazzled-2025-solo-607.jpg", href: "/hiphop" },
  { slug: "bdazzled-2025-solo-628", title: "Solo 628", event: "B-Dazzled 2025", style: "Hip Hop", src: "/videos/full/bdazzled-2025-solo-628.mp4", loop: "/videos/loops/bdazzled-2025-solo-628.mp4", poster: "/images/video-posters/bdazzled-2025-solo-628.jpg", href: "/hiphop" },
  { slug: "bdazzled-2025-solo-641", title: "Solo 641", event: "B-Dazzled 2025", style: "Hip Hop", src: "/videos/full/bdazzled-2025-solo-641.mp4", loop: "/videos/loops/bdazzled-2025-solo-641.mp4", poster: "/images/video-posters/bdazzled-2025-solo-641.jpg", href: "/hiphop" },
  { slug: "apiaf-2025-maddnificent", title: "MADDnificent at Genting", event: "APIAF Genting 2025", style: "Hip Hop", crew: "MADDnificent", src: "/videos/full/apiaf-2025-maddnificent.mp4", loop: "/videos/loops/apiaf-2025-maddnificent.mp4", poster: "/images/video-posters/apiaf-2025-maddnificent.jpg", featured: true, href: "/achievements#genting" },
  { slug: "rec-2026-kstars-hot-sauce", title: "K-Stars — Hot Sauce", event: "Dance Videos 2026", style: "Dance Video", crew: "K-Stars", src: "/videos/full/rec-2026-kstars-hot-sauce.mp4", loop: "/videos/loops/rec-2026-kstars-hot-sauce.mp4", poster: "/images/video-posters/rec-2026-kstars-hot-sauce.jpg", href: "/idol-training-singapore#idollab" },
  { slug: "rec-2026-kstars-racecar", title: "K-Stars — Racecar", event: "Dance Videos 2026", style: "Dance Video", crew: "K-Stars", src: "/videos/full/rec-2026-kstars-racecar.mp4", loop: "/videos/loops/rec-2026-kstars-racecar.mp4", poster: "/images/video-posters/rec-2026-kstars-racecar.jpg", featured: true, href: "/idol-training-singapore#idollab" },
  { slug: "rec-2026-m1xxie-its-me", title: "M1XXIE — It's Me", event: "Dance Videos 2026", style: "Dance Video", crew: "M1XXIE", src: "/videos/full/rec-2026-m1xxie-its-me.mp4", loop: "/videos/loops/rec-2026-m1xxie-its-me.mp4", poster: "/images/video-posters/rec-2026-m1xxie-its-me.jpg", href: "/idol-training-singapore#idollab" },
  { slug: "rec-2026-m1xxie-like-jennie", title: "M1XXIE — Like Jennie", event: "Dance Videos 2026", style: "Dance Video", crew: "M1XXIE", src: "/videos/full/rec-2026-m1xxie-like-jennie.mp4", loop: "/videos/loops/rec-2026-m1xxie-like-jennie.mp4", poster: "/images/video-posters/rec-2026-m1xxie-like-jennie.jpg", featured: true, href: "/idol-training-singapore#idollab" },
];

export const featuredVideos = videos.filter((v) => v.featured);

// Hero loops per page (muted, autoplay). Key = page.
export const heroLoops = {
  home: "rec-2026-m1xxie-like-jennie",
  kpop: "rec-2026-kstars-racecar",
  hiphop: "mj-2025-maddnificent",
  singing: "maddlodies-2025-15-group",
  idol: "mj-2025-maddartistes",
  dsa: "mts-2026-34-mixxie",
  junior: "mj-2025-dap-c",
  teens: "mj-2025-kstars",
  showchoir: "maddlodies-2025-03-group",
} as const;
export const byId = (slug: string) => videos.find((v) => v.slug === slug)!;
