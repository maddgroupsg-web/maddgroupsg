import { clsx, type ClassValue } from "clsx";
export const cn = (...i: ClassValue[]) => clsx(i);

export function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export const waLink = (text: string) => `https://wa.me/6588290800?text=${encodeURIComponent(text)}`;

// Headings in the content files are written in capitals. The revamped type is sentence case, so this turns
// "WHAT WE OFFER" into "What we offer" while keeping names and acronyms the way MADDspace writes them.
// Mixed-case input is returned unchanged.
const KEEP: [RegExp, string][] = [
  [/\bmaddspace\b/g, "MADDspace"], [/\bmadd\b/g, "MADD"], [/\bmaddjestic\b/g, "MADDjestic"], [/\bmaddlodies\b/g, "MADDlodies"],
  [/\bmaddnificent\b/g, "MADDnificent"], [/\bmaddartistes\b/g, "MADDartistes"], [/\bidollab\b/g, "IDOLLAB"], [/\bdsa academy\b/g, "DSA Academy"], [/\bmadd group\b/g, "MADD Group"], [/\bmadd entertainment\b/g, "MADD Entertainment"], [/\bdsa\b/g, "DSA"],
  [/\bk-pop\b/g, "K-Pop"], [/\bk-stars\b/g, "K-Stars"], [/\bm1xxie\b/g, "M1XXIE"], [/\bhip hop\b/g, "Hip Hop"], [/\bshow choir\b/g, "Show Choir"],
  [/\bsing & dance\b/g, "Sing & Dance"], [/\blcm\b/g, "LCM"], [/\bcstd\b/g, "CSTD"], [/\bkmcp\b/g, "KMCP"], [/\bsota\b/g, "SOTA"], [/\bapac\b/g, "APAC"],
  [/\bsingapore\b/g, "Singapore"], [/\bshanghai\b/g, "Shanghai"], [/\bgenting\b/g, "Genting"], [/\bgoogle\b/g, "Google"], [/\bchevrons\b/g, "Chevrons"],
  [/\bgr\.id\b/g, "GR.iD"], [/\biu\b/g, "IU"], [/\bndp\b/g, "NDP"], [/\bsyf\b/g, "SYF"], [/\bfaqs?\b/g, "FAQ"], [/\bsifpa\b/g, "SIFPA"], [/\bi\b/g, "I"],
  [/\bjazz\b/g, "Jazz"], [/\bballet\b/g, "Ballet"], [/\bpre-primary\b/g, "Pre-Primary"], [/\bpopstars\b/g, "Popstars"], [/\bpost-exam\b/g, "Post-Exam"],
];
export function toSentence(s: string): string {
  if (!/[A-Za-z]/.test(s) || s !== s.toUpperCase()) return s;
  let out = s.toLowerCase();
  for (const [re, to] of KEEP) out = out.replace(re, to);
  return out.replace(/(^|[.!?]\s+)([a-z])/g, (_, p, c) => p + c.toUpperCase());
}
