export type Person = { name: string; role: string; image: string; group: "leadership" | "operations" | "instructors" };

export const team: Person[] = [
  { name: "John Khoo", role: "CEO, Founder, Vocal Director", image: "/images/team/john-khoo.jpg", group: "leadership" },
  { name: "Gareth", role: "Operations Manager", image: "/images/team/gareth.jpg", group: "operations" },
  { name: "Belinda Joslin", role: "Studio Manager", image: "/images/team/belinda-joslin.jpg", group: "operations" },
  { name: "Jia Min", role: "Administrative Assistant", image: "/images/team/jia-min.jpg", group: "operations" },
  { name: "Daphinia", role: "Accounts Manager", image: "/images/team/blank.jpg", group: "operations" },
  { name: "Isabelle", role: "Admin Team", image: "/images/team/blank.jpg", group: "operations" },
  { name: "Paulo", role: "Associate Instructor (Vocals)", image: "/images/team/paulo.jpg", group: "instructors" },
  { name: "Megan", role: "Events Executive", image: "/images/team/megan.jpg", group: "operations" },
  { name: "Safy Ann", role: "Associate Instructor (Hip Hop)", image: "/images/team/safy-ann.jpg", group: "instructors" },
];

export const leader = {
  name: "JOHN KHOO",
  role: ["CEO, FOUNDER", "VOCAL DIRECTOR"],
  quote: "Our Mission is to educate, develop and inspire our students to excel in various disciplines of Performing Arts.",
  pills: ["Vision", "Vocal Development", "Student Growth"],
  image: "/images/team/john-khoo.jpg",
};

export const about = {
  philosophyTitle: "THE MADD PHILOSOPHY",
  philosophy:
    "MADDspace is one of Singapore's Top Performing Arts Studio. We offer a wide range of Singing and Dancing classes for students of all ages and ability. MADDspace aims to promote self-confidence, discipline, mutual respect and humility amongst our students. We believe that these qualities go a long way in a person's character development. For our Parents, we aim to work hand in hand with you to inspire your Children to become responsible, resilient and confident individuals who will shine not only on stage, but in their future life challenges as well.",
  valuesTitle: "OUR MADD VALUES",
  values: [
    { letter: "M", name: "Mindfulness", copy: "To be mindful of the impact we as educators have on our Students and to inculcate the right values in every individual." },
    { letter: "A", name: "Attainable", copy: "To make sure that our classes are attainable and within reach for all. MADDspace is to offer Scholarships and Bursaries for talented Students who are unable to afford classes and to ensure that those who can afford them are able to do so at a reasonable cost." },
    { letter: "D", name: "Dauntless", copy: "To show fearlessness and determination in the challenges that we face every day and to inculcate that same level of determination to our Students." },
    { letter: "D", name: "Dynamic", copy: "To be a dynamic enterprising Company that constantly revolutionizes and comes up with fresh new ideas to drive ourselves forward despite all the challenges that we may face." },
  ],
  missionTitle: "OUR MISSION:",
  mission: [
    "Our Mission is to educate, develop and inspire our students to excel in various disciplines of Performing Arts. We believe that every individual has the ability to increase their physical, emotional and intellectual well-being through MADD (Music, Art, Drama & Dance).",
    "MADDspace aims to promote self-confidence, discipline, mutual respect and humility amongst our students. We believe that these qualities go a long way in a person's character development.",
    "For our Parents, we aim to work hand in hand with you to inspire your Children to become responsible and confident individuals who will shine not only on stage, but in their future life challenges as well.",
  ],
  visionTitle: "OUR VISION:",
  vision: "Our vision is to become the top leading Performing Arts Studio in Singapore; to build a school that focuses heavily on providing top quality lessons that are affordable to all.",
};
