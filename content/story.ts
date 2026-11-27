// About page timeline. Facts from sourced research (ABOUT-STORY-PLAN.md). Years marked "confirm" await MADDspace.
export type Stop = { year: string; title: string; line: string; image: string; confirm?: boolean };

export const story: Stop[] = [
  { year: "Before", title: "Glee Studios & the Singapore Show Choir Academy", line: "A show choir syllabus brought from Los Angeles, and the first choirs winning Diamond awards.", image: "/images/classes/age-6-9/age-6-9-06.jpg" },
  { year: "2013", title: "MADDspace opens", line: "Music, Art, Drama & Dance under one roof — to bring the arts community together.", image: "/images/classes/age-3-5/age-3-5-05.jpg", confirm: true },
  { year: "Two studios", title: "GR.ID Central & The Chevrons West", line: "Beside SOTA in the city, and in Jurong East — open for classes, trials and studio hire.", image: "/images/about/about-hero.jpg" },
  { year: "2026", title: "MADD Entertainment & IDOLLAB launch", line: "A 6,000 sq ft home at GR.ID, and the first original releases.", image: "/images/classes/age-10-18/age-10-18-02.jpg" },
];
