import { clsx, type ClassValue } from "clsx";
export const cn = (...i: ClassValue[]) => clsx(i);

export function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export const waLink = (text: string) => `https://wa.me/6588290800?text=${encodeURIComponent(text)}`;
