export const achievementsPage = {
  h1: "OUR STUDENTS DON'T JUST LEARN",
  h1b: "They Perform, Compete & Achieve",
  sub: "From international stages to DSA success, our students gain real world experience that builds their confidence, portfolio & skills",
  pillarsHeadline: "REAL RESULTS, REAL OPPORTUNITIES",
  pillarsSub: "More than just classes - but a complete all-rounded journey",
  pillars: [
    { title: "International Performances", copy: "Students perform at large-scale events alongside internationally artistes" },
    { title: "Competitions & Awards", copy: "Consistent Gold and Top Awards in both local and international festivals" },
    { title: "DSA Pathway", copy: "Structured training to build their DSA Portfolios to enter their dream school" },
    { title: "Real Stage Experience", copy: "Concerts, productions, competitions and showcases throughout the year" },
  ],
};

export type Story = {
  slug: string;
  title: string;
  place: string;
  copy: string;
  bullets?: string[];
  link?: { label: string; href: string };
  image: string;
  journey?: string[];
};

export const stories: Story[] = [
  {
    slug: "iu",
    title: "Performance opportunity with Korean Superstar IU",
    place: "Singapore Indoor Stadium",
    copy: "MADDspace students were specially selected to perform alongside IU at her sold-out Singapore Indoor Stadium concerts, sharing the stage with one of Asia's biggest music icons.",
    bullets: ['Performed "Holssi" in front of thousands of audiences', "Selected from a competitive audition process", "Featured in IU's global H.E.R. World Tour"],
    link: { label: "Read Article", href: "https://www.straitstimes.com/life/entertainment/k-pop-star-iu-to-perform-with-young-students-of-maddspace-at-singapore-concerts" },
    image: "/images/achievements/iu-concert.jpg",
    journey: ["Regular training", "Audition", "Indoor Stadium stage"],
  },
  {
    slug: "rising-voice",
    title: "Television Performance — Rising Voice 2024",
    place: "China, Shanghai",
    copy: "Selected students performed on Rising Voice, a televised singing platform in China, experiencing professional production environments and large-scale audiences.",
    link: { label: "Watch Video", href: "https://youtu.be/zUCS2IWB6R8" },
    image: "/images/achievements/rising-voice.jpg",
    journey: ["Vocal training", "Performance experience", "Televised stage"],
  },
  {
    slug: "genting",
    title: "International Competition — Asia Pacific Arts Festival",
    place: "Genting, Malaysia",
    copy: "MADDspace students represented Singapore at the Asia Pacific International Arts Festival in Genting, competing against international participants and achieving top placements across vocal, dance and ensemble categories.",
    bullets: ["International judging panel", "Multi-discipline competition platform", "Recognised regional arts festival", "Students regularly achieve Diamond, Platinum and Champion awards at these international platforms."],
    link: { label: "Watch Video", href: "https://youtu.be/Jwj0vY_MZzU?si=a8O1_l2CrCmNwxY2" },
    image: "/images/achievements/genting-gold.jpg",
    journey: ["Foundation", "Crew training", "International competition"],
  },
  {
    slug: "disneyland",
    title: "Special Invitation: Disneyland Performance",
    place: "Shanghai, China",
    copy: "MADDspace students performed at Shanghai Disneyland, gaining experience on an international stage at one of the world's most iconic entertainment venues.",
    bullets: ["Live performance in a world-class entertainment environment", "Exposure to international audiences", "Structured performance preparation and showcase"],
    link: { label: "Watch Video", href: "https://youtu.be/jOsKvtBp4OI?si=xm3JZCwDgl95lzgH" },
    image: "/images/achievements/disneyland.jpg",
    journey: ["Show choir", "Showcases", "Overseas invitation"],
  },
];

export const studentJourneys = [
  {
    name: "Jordin Tan",
    discipline: "Vocals · Artiste Programme",
    intro: "At just 9 years old, Jordin Tan's exceptional talent was discovered, leading her to join the MADDspace family—a decision that marked the beginning of an extraordinary musical journey.",
    steps: [
      "Joined MADDspace at 9, was part of our Artiste Programme and took Private Vocal classes with our Director",
      "Performed at National Day 2019",
      "Had her own sellout Solo Concert in 2021 at the iconic Capitol Theatre.",
      "Released her own debut Chinese single, 《纯属友谊》 (\"Purely Friendship\") in 2024",
    ],
    outro: "Her journey from a young, talented girl to an accomplished artist exemplifies the transformative power of dedication and the nurturing environment at MADDspace. We are super proud of her!",
    image: "/images/classes/age-10-18/age-10-18-01.jpg",
  },
  {
    name: "Emma Wan",
    discipline: "Hip Hop · MADDnificent Crew",
    intro: "From Passion to Performance — A Journey of Growth and Versatility. Emma Wan is a shining example of what it means to grow as a well-rounded dancer at MADDspace.",
    steps: [
      "Award-winning performances at local and international competitions",
      "Core member of the MADDnificent Hip Hop Dance Crew",
      "Successfully completed CSTD Hip Hop Examinations under MADDspace",
    ],
    outro: "Her CSTD certification and competition experience also plays an important role in building a strong and credible DSA portfolio, supporting her journey beyond the studio.",
    video: "https://youtu.be/3rO63yirK0k?si=7NSra0xpDtsr2PZZ",
    image: "/images/classes/age-18-35/age-18-35-06.jpg",
  },
];

export const everyChild = {
  headline: "Every Child Starts Somewhere",
  copy: [
    "From first-time performers to international stages, every student's journey begins with the right guidance, opportunities and environment.",
    "At MADDspace, we don't just train performers — we create pathways for growth, confidence and real-world experience.",
  ],
};
