export const BOOK_TRIAL_URL = "https://maddspace.fillout.com/classes";
export const PRIVATE_BOOKING_URL = "https://maddspace.trafft.com";
export const PRIVATE_VOCAL_TRIAL_URL = "https://maddspace.trafft.com/services/pop-vocal-english";
export const SHORT_COURSE_URL = "https://maddspace.trafft.com/booking/e/short-courses-central";
export const DSA_ACADEMY_URL = "https://www.dsasingapore.com";
export const HOLIDAY_1DAY_URL = "https://hitpay.shop/maddentertainment/product/1day-holiday-camps-2026";
export const HOLIDAY_3DAY_URL = "https://hitpay.shop/maddentertainment/product/3day-holiday-camps-2026";

export const contact = {
  email: "info@maddspace.com.sg",
  phone: "6980 6884",
  phoneIntl: "+6569806884",
  whatsapp: "8829 0800",
  whatsappIntl: "6588290800",
  instagram: "https://www.instagram.com/maddspacesg/",
  facebook: "https://www.facebook.com/maddspacesg/",
  youtube: "https://www.youtube.com/channel/UCUua2rcnssxW3h5Ax3hnzPQ",
  telegramOpenClasses: "https://t.me/maddspaceopenclasses",
};

export const locations = [
  {
    key: "central",
    name: "MADDspace GR.ID (Central)",
    short: "GR.ID Central",
    address: "1 Selegie Road, #02-12, Singapore 188306",
    note: "Beside School Of The Arts (SOTA), 5 minutes walk from Dhoby Ghaut MRT",
    maps: "https://www.google.com/maps/search/?api=1&query=1+Selegie+Road+%2302-12+Singapore+188306",
  },
  {
    key: "west",
    name: "MADDspace Chevrons (West)",
    short: "The Chevrons",
    address: "48 Boon Lay Way, #01-17, Singapore 609961",
    note: "Jurong East, open 24/7 for studio bookings",
    maps: "https://www.google.com/maps/search/?api=1&query=48+Boon+Lay+Way+%2301-17+Singapore+609961",
  },
];

export type NavItem = { label: string; href: string; children?: { group?: string; label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "DSA ACADEMY", href: "/dsaacademy" },
  {
    label: "PROGRAMMES",
    href: "/classes",
    children: [
      { group: "BY AGE", label: "PRESCHOOL", href: "/preschool-classes" },
      { group: "BY AGE", label: "JUNIOR KIDS", href: "/junior-kids" },
      { group: "BY AGE", label: "PRETEENS/TEENS", href: "/preteens-teens-classes" },
      { group: "BY AGE", label: "YOUTH/ADULTS", href: "/youth-adults" },
      { group: "BY TYPE", label: "IDOL ARTISTE TRAINING", href: "/idol-training-singapore" },
      { group: "BY TYPE", label: "SINGING", href: "/singing-classes-singapore" },
      { group: "BY TYPE", label: "HIP HOP", href: "/hiphop" },
      { group: "BY TYPE", label: "K-POP", href: "/kpop" },
      { group: "BY TYPE", label: "PRIVATE SESSIONS", href: "/private-classes" },
      { group: "BY TYPE", label: "DANCE CLASS FOR TODDLERS", href: "/dance-class-for-toddlers" },
      { group: "BY TYPE", label: "DANCE CLASSES FOR KIDS", href: "/dance-classes-for-kids" },
    ],
  },
  { label: "ACHIEVEMENTS", href: "/achievements", children: [{ label: "ACHIEVEMENTS", href: "/achievements" }, { label: "PERFORMANCE VIDEOS", href: "/performances" }] },
  {
    label: "SCHEDULE",
    href: "/allclasses-schedule",
    children: [
      { label: "GROUP CLASSES", href: "/allclasses-schedule" },
      { label: "PRIVATE CLASSES", href: "/private-classes-booking" },
      { label: "SHORT COURSES", href: "/short-courses" },
      { label: "HOLIDAY CAMPS", href: "/holiday-camps" },
    ],
  },
  {
    label: "ABOUT",
    href: "/about",
    children: [
      { label: "ABOUT MADDSPACE", href: "/about" },
      { label: "INSTRUCTORS", href: "/instructors" },
    ],
  },
  { label: "CONTACT", href: "/contact" },
];

export const footerBrowse = [
  { label: "HOME", href: "/" },
  { label: "ABOUT MADDSPACE", href: "/about" },
  { label: "SINGING", href: "/singing-classes-singapore" },
  { label: "DANCE CLASS FOR TODDLERS", href: "/dance-class-for-toddlers" },
  { label: "DANCE CLASSES FOR KIDS", href: "/dance-classes-for-kids" },
  { label: "INSTRUCTORS", href: "/instructors" },
  { label: "PROGRAMMES", href: "/classes" },
  { label: "PRESCHOOL", href: "/preschool-classes" },
  { label: "JUNIOR KIDS", href: "/junior-kids" },
  { label: "PRETEENS/TEENS", href: "/preteens-teens-classes" },
  { label: "YOUTH/ADULTS", href: "/youth-adults" },
  { label: "OPEN CLASS", href: "/open-classes" },
  { label: "GROUP CLASSES", href: "/allclasses-schedule" },
  { label: "PERFORMANCES", href: "/performances" },
  { label: "STUDIOS", href: "/studios" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export const mediaLogos = [
  { name: "The Straits Times", src: "/images/media/straits-times-colour.png", w: 900, h: 70 },
  { name: "Toggle", src: "/images/media/toggle-colour.png", w: 776, h: 263 },
  { name: "Channel NewsAsia", src: "/images/media/cna-colour.png", w: 300, h: 380 },
  { name: "Sassy Mama", src: "/images/media/sassy-mama-colour.png", w: 441, h: 104 },
  { name: "TheSmartLocal", src: "/images/media/thesmartlocal-colour.png", w: 534, h: 80 },
  { name: "Her World Plus", src: "/images/media/herworldplus-colour.png", w: 603, h: 125 },
  { name: "联合早报 Lianhe Zaobao", src: "/images/media/zaobao-colour.png", w: 900, h: 277 },
];

export const awards = [
  { src: "/images/awards/award-1.png", alt: "Best Vocal & Dance Studio for Kids & Youth 2021 — Singapore Business Awards, APAC Insider" },
  { src: "/images/awards/award-2.png", alt: "Best Performing Arts Studio 2022 — Singapore Business Awards, APAC Insider" },
  { src: "/images/awards/award-3.png", alt: "Best Children's Performing Arts & Dance Studio 2023 — Singapore Business Awards, APAC Insider" },
  { src: "/images/awards/award-4.png", alt: "Children's Performing Arts & Dance Studio of the Year 2024 — Singapore Business Awards, APAC Insider" },
  { src: "/images/awards/award-5.png", alt: "Top 100 Asia-Pacific Vocal & Dance Studio 2025 — Asia Pacific Arts Festival" },
  { src: "/images/awards/award-6.png", alt: "KMCP K-Pop Music Certification Programme — Official Singapore Partner" },
];

export const enquiryFields = {
  classes: [
    "Preschool Sing & Dance",
    "Preschool Hip Hop & K-Pop Combo",
    "Sing & Dance Show Choir",
    "K-Pop",
    "Hip Hop",
    "Hip Hop & K-Pop Combo",
    "Singing / Vocals",
    "Private Lessons",
    "DSA Preparation",
    "Idol / Artiste Training",
    "Holiday Camps",
    "Not sure yet",
  ],
  locationOptions: ["MADDspace GR.ID (Central)", "MADDspace Chevrons (West)", "No preference"],
};
