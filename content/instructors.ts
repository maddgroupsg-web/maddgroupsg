export type Instructor = {
  slug: string;
  name: string;
  role: string;
  discipline: "vocal" | "dance";
  image: string;
  video?: string; // mp4 path or YouTube URL — drop in when available
  specialities?: string[];
};

export const instructors: Instructor[] = [
  { slug: "john-khoo", name: "John Khoo", role: "Vocal Director", discipline: "vocal", image: "/images/instructors/john-khoo.jpg" },
  { slug: "paulo", name: "Paulo", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/paulo.jpg" },
  { slug: "dionne", name: "Dionne", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/dionne.jpg" },
  { slug: "yves", name: "Yves", role: "Vocal & Dance Instructor", discipline: "vocal", image: "/images/instructors/yves.jpg" },
  { slug: "megan", name: "Megan", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/megan.jpg" },
  { slug: "joey", name: "Joey", role: "Vocal & Dance Instructor", discipline: "vocal", image: "/images/instructors/joey.jpg" },
  { slug: "yi-ling", name: "Yi Ling", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/yi-ling.jpg" },
  { slug: "noelle", name: "Noelle", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/noelle.jpg" },
  { slug: "kevin", name: "Kevin Brendan", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/kevin.jpg" },
  { slug: "gail", name: "Gail", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/gail.jpg" },
  { slug: "sofiah", name: "Sofiah", role: "Vocal Instructor", discipline: "vocal", image: "/images/instructors/sofiah.jpg" },
  { slug: "safy", name: "Safy Ann", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/safy.jpg" },
  { slug: "cher", name: "Cher", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/cher.jpg" },
  { slug: "desmond", name: "Desmond", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/desmond.jpg" },
  { slug: "izzy", name: "Izzy", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/izzy.jpg" },
  { slug: "kee-hung", name: "Kee Hung (Teacher Lee)", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/kee-hung.jpg" },
  { slug: "prisca", name: "Prisca", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/prisca.jpg" },
  { slug: "joyce", name: "Joyce", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/joyce.jpg" },
  { slug: "vera", name: "Vera", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/vera.jpg" },
  { slug: "kimi", name: "Kimi", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/kimi.jpg" },
  { slug: "tze-yuen", name: "Tze Yuen", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/tze-yuen.jpg" },
  { slug: "charles", name: "Charles", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/charles.jpg" },
  { slug: "yuki", name: "Yuki", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/yuki.jpg" },
  { slug: "jeslyn", name: "Jeslyn", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/jeslyn.jpg" },
  { slug: "caryn", name: "Caryn", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/caryn.jpg" },
  { slug: "hairudin", name: "Hairudin", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/hairudin.jpg" },
  { slug: "celine", name: "Celine", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/celine.jpg" },
  { slug: "qian-qian", name: "Qian Qian", role: "Dance Instructor", discipline: "dance", image: "/images/instructors/qian-qian.jpg" },
];
