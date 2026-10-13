// Four campaign landing pages. Copy comes ONLY from the matching live programme page.
export type Landing = {
  slug: string;
  theme: "cyan" | "pink" | "lime" | "gold";
  canonical: string; // SEO page this campaign page points to
  title: string;
  description: string;
  nav: { label: string; href: string }[];
  hero: { eyebrow?: string; lines: { text: string; accent?: boolean }[]; sub: string; chips: string[]; cta: string; secondary: string; image: string };
  video: { eyebrow: string; headline: string[]; copy: string[]; youtube?: string; caption: string; poster: string };
  learn: { headline: string; items: { title: string; copy: string; image: string }[] };
  journey: { headline: string; steps: { n: string; title: string; copy: string; image: string }[] };
  mentors: { eyebrow: string; headline: string; copy: string; instructorSlugs: string[] };
  quote: { text: string; name: string };
  trial: { headline: string; copy: string; included: string[]; price: string; guarantee: string; cta: string; url: string };
  faq: { q: string; a?: string }[]; // answers to be supplied by MADDspace
  final: { headline: string[]; cta: string; image: string };
};

const trialIncluded = ["60-minute 1-to-1 or Group Class", "Personalised assessment of your child's level", "Guidance on the most suitable learning pathway", "Opportunity to meet our instructors"];
const guarantee = "Money-Back Guarantee — If the experience is not the right fit, we'll refund your trial — no questions asked.";
const FILLOUT = "https://maddspace.fillout.com/classes";

export const landings: Landing[] = [
  {
    slug: "singing",
    theme: "cyan",
    canonical: "/singing-classes-singapore",
    title: "Singing Classes in Singapore for Kids & Teens | Book a Trial | MADDspace",
    description: "Private vocal lessons for ages 4–21. Beginner to advanced pathways, LCM / ABRSM exam preparation, performance and competition opportunities. 60-minute private trial · $60 · money-back guarantee.",
    nav: [{ label: "PROGRAMME", href: "#programme" }, { label: "WHAT YOU'LL LEARN", href: "#learn" }, { label: "PATHWAY", href: "#pathway" }, { label: "TRIAL", href: "#trial" }, { label: "FAQ", href: "#faq" }],
    hero: {
      eyebrow: "SINGING CLASSES IN SINGAPORE FOR KIDS & TEENS",
      lines: [{ text: "UNLOCK THEIR " }, { text: "VOICE.", accent: true }, { text: "OWN THE " }, { text: "STAGE.", accent: true }],
      sub: "Unlock your child's confidence, stage presence and vocal potential with professional singing classes in Singapore.",
      chips: ["Ages 4–21", "Beginner to advanced", "LCM / ABRSM exam prep"],
      cta: "BOOK A SINGING TRIAL",
      secondary: "EXPLORE THE PROGRAMME",
      image: "/images/classes/age-10-18/age-10-18-01.jpg",
    },
    video: {
      eyebrow: "REAL PERFORMANCE OPPORTUNITIES",
      headline: ["SEE CONFIDENCE", "TAKE THE MIC"],
      copy: ["At MADDspace, we go beyond just singing—we develop performers through structured training, real stage opportunities, and internationally recognised certifications.", "From internal showcases to international stages, students gain real experience that builds confidence and stage presence."],
      youtube: "https://youtu.be/zUCS2IWB6R8",
      caption: "Rising Voice 2024 — MADDspace students on a televised singing platform in Shanghai",
      poster: "/images/achievements/rising-voice.jpg",
    },
    learn: {
      headline: "WHAT YOUR CHILD WILL LEARN",
      items: [
        { title: "Vocal Technique & Control", copy: "Our singing classes are designed for children and teenagers aged 3 to 18, with a clear progression pathway from beginner to advanced levels.", image: "/images/classes/age-6-9/age-6-9-03.jpg" },
        { title: "Pitch, Tone & Breathing", copy: "No two voices are the same and we have mastered just the way to work with voices of different age groups.", image: "/images/classes/age-3-5/age-3-5-02.jpg" },
        { title: "Stage Confidence & Expression", copy: "From internal showcases to international stages, students gain real experience that builds confidence and stage presence.", image: "/images/classes/age-6-9/age-6-9-01.jpg" },
        { title: "Performance & Audition Skills", copy: "Whether your child is exploring singing for fun or preparing for competitions and DSA auditions, our programmes are structured to support every goal.", image: "/images/classes/dsa/dsa-03.jpg" },
      ],
    },
    journey: {
      headline: "A PERSONALISED GROWTH PATHWAY",
      steps: [
        { n: "01", title: "FOR ENJOYMENT", copy: "We understand that no two children come for the same reason. Whether your child is learning for enjoyment or building confidence, we guide them with the right balance of structure and support.", image: "/images/classes/age-3-5/age-3-5-01.jpg" },
        { n: "02", title: "EXAMS & CERTIFICATION", copy: "Students have the opportunity to take internationally recognised exams with the London College of Music for Pop/Musical Theatre or Korea Music Certification Programme for K-Pop Singing.", image: "/images/classes/age-6-9/age-6-9-02.jpg" },
        { n: "03", title: "COMPETITIONS, ARTISTE & DSA", copy: "Competitions, becoming a professional artiste or DSA — students can also gain real-world exposure through recording sessions in our in-house studio, building confidence and industry-ready skills.", image: "/images/classes/age-10-18/age-10-18-02.jpg" },
      ],
    },
    mentors: { eyebrow: "LEARN FROM", headline: "EXPERIENCED VOCAL INSTRUCTORS", copy: "Learn how to sing better with our experienced instructors. You can even get to step into our recording studio during your singing lessons.", instructorSlugs: ["john-khoo", "yi-ling", "paulo", "noelle"] },
    quote: { text: "MADDspace is a very interesting with lots of opportunities to perform. My girl enjoys every lesson! The teachers are very caring and patient. Thank you so much ;)", name: "Janna Tan, MADDspace Parent" },
    trial: {
      headline: "TRY A PRIVATE VOCAL TRIAL LESSON TODAY",
      copy: "Choosing the right school matters. Our trial lesson allows your child to experience a real class before committing.",
      included: ["60-minute 1-to-1 vocal lesson", "Personalised assessment of your child's level", "Guidance on the most suitable learning pathway", "Opportunity to meet our instructors"],
      price: "60-minute private session · $60 · Limited slots available",
      guarantee,
      cta: "BOOK A TRIAL LESSON",
      url: FILLOUT,
    },
    faq: [{ q: "What age can my child start singing lessons?" }, { q: "Do I need any prior singing experience?" }, { q: "How long is each class and how many students are in a class?" }, { q: "What should my child bring to class?" }, { q: "How do I book a trial class?" }],
    final: { headline: ["READY TO HEAR", "THEIR VOICE?"], cta: "BOOK A TRIAL", image: "/images/classes/age-10-18/age-10-18-01.jpg" },
  },
  {
    slug: "kpop",
    theme: "pink",
    canonical: "/kpop",
    title: "K-Pop Dance Classes Singapore | Train Like an Idol | Trial from $28 | MADDspace",
    description: "Learn real K-pop choreography, build stage presence, and perform like BTS, KATSEYE, BABYMONSTER, BLACKPINK & NewJeans. Group or private lessons · from $28 · limited slots available.",
    nav: [{ label: "PROGRAMME", href: "#programme" }, { label: "WHAT YOU'LL LEARN", href: "#learn" }, { label: "PATHWAY", href: "#pathway" }, { label: "TRIAL", href: "#trial" }, { label: "FAQ", href: "#faq" }],
    hero: {
      eyebrow: "K-POP DANCE CLASSES IN SINGAPORE FOR KIDS & TEENS",
      lines: [{ text: "TRAIN LIKE " }, { text: "AN IDOL.", accent: true }, { text: "PERFORM LIKE " }, { text: "YOU.", accent: true }],
      sub: "Learn real K-pop choreography, build stage presence, and perform like BTS, KATSEYE, BABYMONSTER, BLACKPINK & NewJeans.",
      chips: ["Group or private", "From $28", "Limited slots"],
      cta: "BOOK A K-POP TRIAL",
      secondary: "EXPLORE THE PROGRAMME",
      image: "/images/classes/age-10-18/age-10-18-07.jpg",
    },
    video: {
      eyebrow: "WE DON'T JUST TEACH DANCE, WE TRAIN PERFORMERS",
      headline: ["WATCH", "THE ENERGY"],
      copy: ["Does your child dream of performing on stage, dancing like their favourite K-Pop idols, or even auditioning for global entertainment companies?", "From in-house showcases to international festivals and competitions, students gain real stage experience and the opportunity to share the spotlight alongside global artistes."],
      youtube: "https://www.youtube.com/watch?v=jdTyw7BxWak&t=29s",
      caption: "K-Stars Dance Crew — where passionate dancers evolve into confident performers",
      poster: "/images/classes/age-10-18/age-10-18-07.jpg",
    },
    learn: {
      headline: "WHAT YOUR CHILD WILL LEARN",
      items: [
        { title: "Foundations & Technique", copy: "From grooves and isolations to footwork and control, students build strong fundamentals that form the base for all future dance training.", image: "/images/classes/age-6-9/age-6-9-05.jpg" },
        { title: "Formations & Musicality", copy: "Students are trained in formations, musicality, expressions, and stage presence — the same elements that define real idol performances.", image: "/images/classes/holiday-camps/holiday-camps-02.jpg" },
        { title: "Confidence & Stage Presence", copy: "Through regular performance training, students develop the confidence to express themselves, perform in front of others, and own the stage.", image: "/images/classes/holiday-camps/holiday-camps-03.jpg" },
        { title: "Performance & Teamwork", copy: "Students train towards showcases, recitals, and potential crew performances — learning discipline, teamwork, and what it takes to perform as a group.", image: "/images/classes/age-10-18/age-10-18-08.jpg" },
      ],
    },
    journey: {
      headline: "PROGRESSION PATHWAYS",
      steps: [
        { n: "01", title: "FOUNDATION", copy: "Basic grooves, rhythm, coordination mostly designed for beginner dancers aged 3 - 16 years old", image: "/images/classes/age-6-9/age-6-9-04.jpg" },
        { n: "02", title: "INTERMEDIATE", copy: "Stronger technique, musicality, performance, designed for experienced dancers aged 8 - 18 years old", image: "/images/classes/holiday-camps/holiday-camps-04.jpg" },
        { n: "03", title: "ADVANCED / ELITE", copy: "Performance training, competitions, team routines designed for advanced dancers who are ready to take things to the next level — K-Stars Dance Crew and MYSTIX Sing & Dance K-Pop Crew.", image: "/images/classes/age-10-18/age-10-18-08.jpg" },
      ],
    },
    mentors: { eyebrow: "CERTIFIED & STRUCTURED TRAINING", headline: "SINGAPORE'S ONLY KMCP-CERTIFIED K-POP SCHOOL", copy: "MADDspace is Singapore's only K-Pop school with an internationally recognised certification from KMCP (Korea) and a clear pathway from Foundation to Crews and Artiste-level training, students don't just learn — they evolve into confident performers.", instructorSlugs: ["safy", "cher", "prisca", "joyce"] },
    quote: { text: "Watch your child transform from shy and unsure… to confident, expressive, and ready to take the stage.", name: "Start your K-Pop Dance Journey with us today!" },
    trial: { headline: "SIGN UP FOR A TRIAL", copy: "Choosing the right school matters. Our trial lesson allows your child to experience a real class before committing.", included: trialIncluded, price: "Group or Private Lessons · From $28 · Limited slots available", guarantee, cta: "BOOK A TRIAL LESSON", url: FILLOUT },
    faq: [{ q: "What age can my child start K-Pop dance classes?" }, { q: "Do I need any prior dance experience?" }, { q: "What should my child bring to class?" }, { q: "How do I book a trial class?" }, { q: "What happens after the trial class?" }],
    final: { headline: ["READY TO", "TAKE THE STAGE?"], cta: "BOOK A TRIAL", image: "/images/classes/age-10-18/age-10-18-07.jpg" },
  },
  {
    slug: "hiphop",
    theme: "lime",
    canonical: "/hiphop",
    title: "Hip Hop Dance Classes for Kids & Teens Singapore | Trial from $28 | MADDspace",
    description: "Build confidence, rhythm, and stage presence through structured Hip Hop training designed for real growth. Group & private classes (ages 3.5 – 18), CSTD (Australia) syllabus, DSA preparation pathways.",
    nav: [{ label: "PROGRAMME", href: "#programme" }, { label: "WHAT YOU'LL LEARN", href: "#learn" }, { label: "PATHWAY", href: "#pathway" }, { label: "TRIAL", href: "#trial" }, { label: "FAQ", href: "#faq" }],
    hero: {
      eyebrow: "HIP HOP DANCE CLASSES IN SINGAPORE FOR KIDS & TEENS",
      lines: [{ text: "BUILD THE GROOVE. " }, { text: "BRING THE " }, { text: "CONFIDENCE.", accent: true }],
      sub: "Build confidence, rhythm, and stage presence through structured Hip Hop training designed for real growth.",
      chips: ["CSTD Australia", "Ages 3.5 – 18", "DSA pathway"],
      cta: "BOOK A HIP HOP TRIAL",
      secondary: "EXPLORE THE PROGRAMME",
      image: "/images/classes/age-18-35/age-18-35-02.jpg",
    },
    video: {
      eyebrow: "TRAIN TOWARDS OUR AWARD WINNING CREWS",
      headline: ["SEE THEM MOVE", "WITH PURPOSE"],
      copy: ["Whether your child is dancing for fun, building strong foundations, or working towards competitions and DSA opportunities — MADDspace is for you.", "Our students have graced both local and international stages in countries like China, Thailand, Malaysia, Korea and more."],
      youtube: "https://www.youtube.com/watch?v=jdTyw7BxWak&t=29s",
      caption: "MANIAX JR — one of MADDspace's premier youth Hip Hop dance crews",
      poster: "/images/achievements/k15.jpg",
    },
    learn: {
      headline: "WHAT YOUR CHILD WILL LEARN",
      items: [
        { title: "Foundations & Technique", copy: "From grooves and isolations to footwork and control, students build strong Hip Hop fundamentals that form the base for all future dance training.", image: "/images/classes/age-3-5/age-3-5-08.jpg" },
        { title: "Confidence & Stage Presence", copy: "Through regular performance training, students develop the confidence to express themselves, perform in front of others, and own the stage.", image: "/images/classes/age-18-35/age-18-35-06.jpg" },
        { title: "Performance & Teamwork", copy: "Students train towards showcases, recitals, and potential crew performances — learning discipline, teamwork, and what it takes to perform as a group.", image: "/images/classes/age-18-35/age-18-35-01.jpg" },
        { title: "Accredited CSTD Syllabus", copy: "Our Hip Hop programme follows the internationally recognised CSTD (Australia) syllabus, helping students develop strong technique, musicality, and control through a clear progression pathway.", image: "/images/classes/age-3-5/age-3-5-09.jpg" },
      ],
    },
    journey: {
      headline: "PROGRESSION PATHWAYS",
      steps: [
        { n: "01", title: "FOUNDATION", copy: "Basic grooves, rhythm, coordination mostly designed for beginner dancers aged 3 - 16 years old", image: "/images/classes/age-3-5/age-3-5-10.jpg" },
        { n: "02", title: "INTERMEDIATE", copy: "Stronger technique, musicality, performance, designed for experienced dancers aged 8 - 18 years old", image: "/images/classes/age-18-35/age-18-35-05.jpg" },
        { n: "03", title: "ADVANCED / ELITE", copy: "Performance training, competitions, team routines designed for advanced dancers who are ready to take things to the next level — MANIAX JR and MADDnificent crews.", image: "/images/achievements/dap-b.jpg" },
      ],
    },
    mentors: { eyebrow: "LEARN FROM", headline: "EXPERIENCED. DEDICATED. REAL.", copy: "Whether your child is learning for fun, building confidence, or preparing for competitions or DSA — we guide them with the right balance of structure and support.", instructorSlugs: ["safy", "desmond", "hairudin", "charles"] },
    quote: { text: "Watch your child transform from shy and unsure… to confident, expressive, and ready to take the stage.", name: "MADDspace Hip Hop" },
    trial: { headline: "SIGN UP FOR A TRIAL", copy: "Choosing the right school matters. Our trial lesson allows your child to experience a real class before committing.", included: trialIncluded, price: "Group or Private Lessons · From $28 · Limited slots available", guarantee, cta: "BOOK A TRIAL LESSON", url: FILLOUT },
    faq: [{ q: "What age can my child start hip hop classes?" }, { q: "Do I need any prior dance experience?" }, { q: "What should my child bring to class?" }, { q: "How do I book a trial class?" }, { q: "What happens after the trial class?" }],
    final: { headline: ["READY TO FIND", "THEIR GROOVE?"], cta: "BOOK A TRIAL", image: "/images/classes/age-18-35/age-18-35-04.jpg" },
  },
  {
    slug: "show-choir",
    theme: "gold",
    canonical: "/junior-kids",
    title: "Sing & Dance Show Choir Singapore | Kids & Teens | MADDspace",
    description: "Our Show Choir is not like your regular choir. We sing, dance and act. With a Show Choir syllabus specially brought down from Los Angeles, USA, MADDspace is the only school in Singapore equipped to offer an authentic Show Choir experience.",
    nav: [{ label: "PROGRAMME", href: "#programme" }, { label: "WHAT YOU'LL LEARN", href: "#learn" }, { label: "PATHWAY", href: "#pathway" }, { label: "TRIAL", href: "#trial" }, { label: "FAQ", href: "#faq" }],
    hero: {
      eyebrow: "SING & DANCE SHOW CHOIR — MADDSPACE SIGNATURE PROGRAMME",
      lines: [{ text: "SING. DANCE. " }, { text: "TAKE THE STAGE.", accent: true }],
      sub: "Think you know what a Choir is about? Think again! Our Show Choir is not like your regular Choir. We sing, dance and act.",
      chips: ["Singing + Dance + Acting", "LA Show Choir syllabus", "Ages 6 – 16"],
      cta: "BOOK A SHOW CHOIR TRIAL",
      secondary: "DISCOVER SHOW CHOIR",
      image: "/images/classes/age-6-9/age-6-9-07.jpg",
    },
    video: {
      eyebrow: "SINGAPORE CHILDREN'S SHOW CHOIR",
      headline: ["WATCH THE", "STAGE COME ALIVE"],
      copy: ["Similar to what you see in shows like \"The Greatest Showman\", \"Glee\", \"Frozen\" and \"Encanto\".", "With a Show Choir syllabus specially brought down from Los Angeles, USA, MADDspace is the only school in Singapore who is equipped to offer you an authentic Show Choir 'Sing & Dance' experience."],
      youtube: "https://www.youtube.com/watch?v=JRmP6kS3w6c",
      caption: "Inside the Singapore Children's Show Choir",
      poster: "/images/classes/age-6-9/age-6-9-06.jpg",
    },
    learn: {
      headline: "WHAT YOUR CHILD WILL LEARN",
      items: [
        { title: "Singing Techniques", copy: "Be taught advanced musicianship and showmanship skills, as well as learn things such as singing techniques and staging.", image: "/images/classes/age-6-9/age-6-9-03.jpg" },
        { title: "Choreography & Staging", copy: "We sing, dance and act — combining both disciplines into one performance experience.", image: "/images/classes/age-6-9/age-6-9-04.jpg" },
        { title: "Recording Studio Exposure", copy: "Gain exposure and opportunities to do recordings in our recording studio.", image: "/images/about/about-hero.jpg" },
        { title: "Performance Opportunities", copy: "Our Signature Sing & Dance Show Choir programme is an exclusive curriculum brought over from Los Angeles, USA — with regular opportunities to perform on stage.", image: "/images/classes/age-6-9/age-6-9-08.jpg" },
      ],
    },
    journey: {
      headline: "YOUR SHOW CHOIR JOURNEY",
      steps: [
        { n: "01", title: "PRE-PRIMARY SING & DANCE", copy: "Ages 4 – 6. Children explore singing, rhythm and simple choreography while developing their ability to express themselves through music and movement.", image: "/images/classes/age-3-5/age-3-5-06.jpg" },
        { n: "02", title: "SHOW CHOIR FOUNDATION", copy: "Ages 6 – 9. A 60-minute class building core skills in vocals, movement and expression.", image: "/images/classes/age-6-9/age-6-9-05.jpg" },
        { n: "03", title: "PREPARATORY / CONCERT", copy: "Ages 6 – 16. 90-minute classes preparing for concerts, showcases and recordings — with the MADDartistes and Developing Artistes programmes beyond.", image: "/images/classes/age-10-18/age-10-18-10.jpg" },
      ],
    },
    mentors: { eyebrow: "LEARN FROM", headline: "EXPERIENCED MENTORS", copy: "Trained by our Studio Director and team of Instructors — nurtured to become triple threats: performers who are well versed in Singing, Dancing and Performing.", instructorSlugs: ["john-khoo", "yves", "joey", "megan"] },
    quote: { text: "We attended the Sing & dance camp. Instructors were professional and the school updated us with photos of the camp promptly towards the end of the day. My boy had a lot of fun and is looking forward to taking regular classes at MADDspace.", name: "Mrs Catherine Tan, Mother of Preston Lim" },
    trial: { headline: "SIGN UP FOR A TRIAL", copy: "Choosing the right school matters. Our trial lesson allows your child to experience a real class before committing.", included: trialIncluded, price: "Group or Private Lessons · From $28 · Limited slots available", guarantee, cta: "BOOK A TRIAL LESSON", url: FILLOUT },
    faq: [{ q: "What is show choir?" }, { q: "Who can join?" }, { q: "Do I need prior singing or dance experience?" }, { q: "What should my child bring to class?" }, { q: "How do I book a trial class?" }, { q: "What happens after the trial class?" }],
    final: { headline: ["THEIR STAGE", "STARTS HERE."], cta: "BOOK A TRIAL", image: "/images/classes/age-6-9/age-6-9-06.jpg" },
  },
];
