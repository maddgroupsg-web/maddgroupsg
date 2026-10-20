export type ProgrammeItem = {
  title: string;
  badge?: string; // Signature / Popular
  when?: string;
  paragraphs: string[];
  bullets?: { lead?: string; items: string[] };
  closing?: string[];
  video?: string;
  moreInfo?: string;
};

export type AgePage = {
  slug: string;
  h1: string;
  ages: string;
  gallery: string; // folder under /images/classes
  galleryCount: number;
  intro?: string;
  items: ProgrammeItem[];
  formTitle: string;
  formCopy: string;
};

const g = (folder: string, n: number) => Array.from({ length: n }, (_, i) => `/images/classes/${folder}/${folder}-${String(i + 1).padStart(2, "0")}.jpg`);
export const galleryFor = (p: { gallery: string; galleryCount: number }) => g(p.gallery, p.galleryCount);

export const agePages: AgePage[] = [
  {
    slug: "preschool-classes",
    h1: "PRESCHOOL",
    ages: "3 - 5.5 YEARS OLD",
    gallery: "age-3-5",
    galleryCount: 10,
    formTitle: "INTERESTED?",
    formCopy: "Fill in the form below and our team will get back to you shortly!",
    items: [
      {
        title: "Preschool/Pre-Primary Sing & Dance",
        badge: "Signature",
        paragraphs: [
          "Our Preschool / Pre-Primary Sing & Dance Programme introduces children aged 3 to 5 to music, movement and performance in a fun and nurturing environment.",
          "At MADDspace, classes are carefully designed to build confidence, coordination and early musical skills through engaging, play-based activities. Children explore singing, rhythm and simple choreography while developing their ability to express themselves through music and movement.",
        ],
        bullets: { lead: "Students will:", items: ["Build confidence and stage presence", "Develop rhythm, pitch and coordination", "Improve listening and motor skills", "Learn to express themselves through singing and dance"] },
        closing: [
          "This programme lays a strong foundation for progression into structured singing, dance and musical theatre training, while giving young learners their first experience performing on stage.",
          "👉 Ideal for parents searching for preschool singing and dance classes in Singapore that combine fun, structure and performance opportunities.",
        ],
      },
      {
        title: "Preschool Hip Hop & K-Pop Combo",
        badge: "Signature",
        paragraphs: [
          "Our Preschool Hip Hop & K-Pop Combo Programme is specially designed for children aged 3 to 5, introducing them to the exciting world of dance through fun, age-appropriate movement and music.",
          "At MADDspace, young dancers explore basic hip hop grooves and K-pop inspired choreography in a structured yet playful environment. Classes focus on building coordination, rhythm and confidence, while allowing children to express themselves through energetic movement.",
        ],
        bullets: { lead: "Students will:", items: ["Develop coordination, balance and body control", "Build rhythm and musicality through movement", "Improve confidence and classroom independence", "Learn basic hip hop and K-pop dance foundations"] },
        closing: [
          "With engaging music, guided instruction and a supportive environment, children gain a strong foundation in dance while having fun every step of the way.",
          "The programme also prepares students for progression into formal hip hop and K-pop dance training, with opportunities to perform on stage in showcases and recitals.",
          "👉 Ideal for parents looking for preschool hip hop or K-pop dance classes in Singapore that combine fun, structure and confidence-building.",
        ],
      },
      {
        title: "Private Lessons",
        paragraphs: [
          "Our Private Preschool Lessons are designed for children aged 3 to 5 who benefit from personalised attention in a focused and nurturing environment.",
          "At MADDspace, these 1-to-1 sessions are tailored to your child's pace, personality and learning style, allowing our instructors to build confidence, coordination and foundational skills more effectively. Lessons may include singing, movement or a combination of both, depending on your child's interests and goals.",
        ],
        bullets: { lead: "Through customised guidance, students will:", items: ["Build confidence and self-expression at their own pace", "Develop early vocal, rhythm and movement skills", "Improve focus, listening and coordination", "Receive individualised coaching and encouragement"] },
        closing: [
          "Private lessons are ideal for children who are shy, require additional support, or are looking for faster progression in their performing arts journey.",
          "They also serve as a strong foundation before transitioning into group classes, performances and structured training programmes.",
          "👉 Perfect for parents looking for private preschool singing or dance lessons in Singapore with personalised guidance and attention.",
        ],
      },
      {
        title: "Preschool Hip Hop (Parent Accompanied)",
        paragraphs: [
          "Our Parent Accompanied Hip Hop Programme is specially designed for children aged 3 to 4, offering a fun and supportive introduction to dance with a parent by their side.",
          "At MADDspace, this class creates a safe and engaging environment where young children can explore movement, rhythm and basic hip hop grooves while building confidence alongside a familiar adult. With parents actively involved, children feel more secure, allowing them to participate more fully and enjoy the learning process.",
        ],
        bullets: { lead: "Students will:", items: ["Develop coordination, balance and basic motor skills", "Build rhythm and musical awareness through movement", "Gain confidence in a new environment", "Strengthen bonding through shared parent-child activities"] },
        closing: [
          "Classes are structured with age-appropriate music, simple choreography and interactive exercises that keep children engaged while introducing foundational dance concepts.",
          "This programme serves as a gentle transition into independent classes, preparing children for future hip hop and dance training in a structured setting.",
          "👉 Ideal for parents looking for parent accompanied dance classes in Singapore that build confidence, coordination and early interest in hip hop.",
        ],
      },
    ],
  },
  {
    slug: "junior-kids",
    h1: "JUNIOR KIDS",
    ages: "6 - 9 YEARS OLD",
    gallery: "age-6-9",
    galleryCount: 8,
    formTitle: "INTERESTED?",
    formCopy: "Fill in the form below and send the details to us. We will get back to you as soon as possible",
    items: [
      {
        title: "Developing Artiste Programme",
        badge: "Signature",
        when: "MADDspace GR.ID - Saturdays 5 - 630pm",
        paragraphs: [
          "The Developing Artiste Programme is an 'Audition Based Only' Sing & Dance performing group.",
          "Kids in this class will be split according to their respective age group. Through an audition, the Developing Artistes are specially selected and trained by our Studio Director and team of Instructors.",
          "They will be nurtured to become triple threats - performers who are well versed in Singing, Dancing and Performing.",
          "Talents from our MADDartistes Programme will receive multiple performance opportunities as well as to regularly step into our recording studios to record covers of their own.",
        ],
        video: "https://www.youtube.com/watch?v=oFaRwVfumQA",
      },
      {
        title: "Singapore Children's Show Choir",
        badge: "Signature",
        when: "MADDspace GR.ID - Fridays 7 - 830pm, Saturdays 1230 - 2pm, 5 - 630pm",
        paragraphs: [
          "Think you know what a Choir is about? Think again! Our Show Choir is not like your regular Primary School Choir. We sing, dance and act - similar to what you see in shows like \"The Greatest Showman\", \"Glee\", \"Frozen\" and \"Encanto\".",
          "With a Show Choir syllabus specially brought down from Los Angeles, USA, MADDspace is the only school in Singapore who is equipped to offer you an authentic Show Choir 'Sing & Dance' experience.",
          "In the Singapore Children's Show Choir, you will gain exposure and opportunities to do recordings in our recording studio and be taught advanced musicianship and showmanship skills, as well as learn things such as singing techniques and staging.",
        ],
        video: "https://www.youtube.com/watch?v=JRmP6kS3w6c",
      },
      {
        title: "K-Pop, K-pop Combo",
        badge: "Popular",
        when: "Multiple classes available - refer to schedule",
        paragraphs: [
          "K-Pop Music is taking over the world. And why not? Over the past years, we have seen more students wanting to dance to the music of BTS, Blackpink, Twice, ITZY, Enhyphen and more. We have developed an exciting and diversified curriculum for our students. If you love dancing to K-Pop, you can now choose from the following programmes:",
        ],
        bullets: { items: ["K-Pop Foundation/Intermediate - For the beginners or those who are starting out", "Hip Hop K-Pop Combo - For those who wish to infuse Hip Hop steps using K-Pop music", "K-Stars & K-Stars JR - Our Advanced Dance Crew for those who are already ready to form your own group and film your own Music Videos."] },
        closing: ["All our groups get regular performing opportunities. With that many options, no wonder we are one of the top schools when it comes to our K-Pop classes."],
        video: "https://youtu.be/RhBIN9AGEDU",
      },
      {
        title: "Hip Hop",
        badge: "Popular",
        when: "Multiple classes available - refer to schedule",
        paragraphs: [
          "MADDspace Hip Hop classes are best known for being fun, combining crazy concepts and outstanding choreography. Our Crews have clinched top 3 positions in international dance competitions, such as Get The Beat, Born To Perform, and B-Dazzled. With a mix of Breaking, Freestyle, Urban and other street styles, students are constantly challenged to step outside of their comfort zone. We are also one of the only schools to offer the CSTD Hip Hop Exam Syllabus.",
          "You will be split into different groups based off your age and ability to maximise learning. We have the Foundation and Intermediate classes for those who are starting out. Those who wish to take it to the next level can join our Crews - MADDNIFICENT B (6 - 9y/o)",
          "With a mix of Breaking, Freestyle, Urban and other street styles, students are constantly challenged to step outside of their comfort zone. Teamwork, relationship and excellence are also defining traits of what makes our crews unique!",
        ],
        video: "https://youtu.be/myfrvL6JjoA",
      },
      {
        title: "Ballet / Jazz",
        paragraphs: [
          "If you are looking for a small teacher-student ratio class that is not too intimidating, then our ballet and jazz class is the class for you!",
          "We offer the CSTD Exam syllabus - from Pre Jazz/Ballet to Grade 8, eventually preparing our students for performances, competitions and Direct Schools Admission (DSA) applications.",
          "Our Ballet & Jazz classes are age specific, which means that you will always be grouped with students of your age and ability, maximising your learning throughout your time here.",
        ],
        video: "https://youtu.be/ZTLLFfWvEYM",
      },
      {
        title: "Popstars Pop Vocals",
        paragraphs: [
          "An exclusive MADDspace programme launched in 2021 - Popstars - a singing programme created by singers for singers.",
          "Up till today, students who opt to take the London College of Music Pop Vocal examinations have had limited opportunities to perform due to the rigours of the examination preparation.",
          "Hence, we have created a syllabus that allows a combination of exam preparations together with performing opportunities. Students who are part of Popstars will receive access to a series of audio and video lessons on top of their existing classes and experience singing in a group.",
          "In this small group class of not more than 8 pax, you get to kill two birds with one stone - receiving opportunities to perform while preparing for the London College of Music Pop Vocal examinations.",
        ],
        video: "https://youtu.be/8pFmyS_pyuU",
      },
      {
        title: "Theatrical Crew: Broadway Kids",
        paragraphs: [
          "Let your child learn better expression in the form of Music, Dance & Acting!",
          "It will be a foundational level program focused on preparing for end of term performances, and mini musicals.",
          "Recommended for students aged 6-12 years old.",
        ],
        moreInfo: "/singing-classes-singapore",
      },
      {
        title: "Contemporary Dance",
        paragraphs: [
          "Contemporary Dance is a dance form fusing elements of lyrical, ballet and jazz. Our classes are designed for children to express themselves through Dance. We teach you how to tell a story through Choreography. With a top quality syllabus backed by the renowned CSTD (Australia), there is no better place to pursue your Contemporary Dance classes.",
          "We have Foundation classes designed for those who are new as well as our Kinetic Dance Crew for those with Jazz/Ballet background.",
        ],
        video: "https://youtu.be/iX_oeiPmT24",
      },
      {
        title: "'Sing & Play' Keyboard Class",
        paragraphs: [
          "Introducing MADDspace's 'Sing & Play' Pop Keyboard Course, created for children and teens who would love to learn how to play the keyboard and sing to their favourite songs. Develop skills that will allow you to easily play your favourite Pop tunes on the radio.",
          "Our course will go through everything you need to know to sing and play. This includes common chord patterns, structures, pop keyboard playing patterns and more. You will also learn how to sing and play the chords to one song every 4 weeks.",
        ],
        moreInfo: "/singing-classes-singapore",
      },
      {
        title: "Private Vocals / Dance",
        paragraphs: [
          "If you prefer specialised one on one attention from our instructors, then our Private Vocals and Dance classes are most suitable for you.",
          "Learn from our amazing team of instructors. We will charge your progress, talk about your objectives and work something out so that you can see yourself improve day in day out.",
          "Just learning is not enough. We offer your regular opportunities to showcase your pieces through live streams, annual recitals, end of term showcases and more.",
        ],
        video: "https://youtu.be/_RCg4btPkns",
      },
    ],
  },
  {
    slug: "preteens-teens-classes",
    h1: "PRE-TEENS & TEENS",
    ages: "10 - 18 YEARS OLD",
    gallery: "age-10-18",
    galleryCount: 10,
    formTitle: "INTERESTED?",
    formCopy: "Fill in the form below and send the details to us. We will get back to you as soon as possible",
    items: [
      {
        title: "MADDartistes/DAP",
        badge: "Signature",
        paragraphs: [
          "MADDartistes is an Elite Sing & Dance performing group based in Singapore. The group consists of talented individuals between the ages of 10 - 18 years old. These Junior Artistes are specially selected and trained by our Studio Director and team of Instructors. They will be nurtured to become triple threats - performers who are well versed in Singing, Dancing and Performing. Talents from our MADDartistes Programme will receive multiple performance opportunities as well as to regularly step into our recording studios to record covers of their own.",
        ],
        video: "https://www.youtube.com/watch?v=jRshHWm56uk",
      },
      {
        title: "Sing & Dance Show Choir",
        badge: "Signature",
        paragraphs: [
          "Think you know what a Choir is about? Think again! Our Show Choir is not like your regular Choir. We sing, dance and act. With a Show Choir syllabus specially brought down from Los Angeles, USA, MADDspace is the only school in Singapore who is equipped to offers you an authentic Show Choir experience.",
          "In this class, you will gain exposure and opportunities to do recordings in our recording studio and be taught advanced musicianship and showmanship, as well as learn things such as singing techniques and staging.",
        ],
        video: "https://youtu.be/Kklj41cJJD8",
      },
      {
        title: "Hip Hop",
        paragraphs: [
          "MADDspace Hip Hop classes are best known for being fun, combining crazy concepts and outstanding choreography. Our Crews have clinched top 3 positions in international dance competitions, such as Get The Beat, Born To Perform, and B-Dazzled. With a mix of Breaking, Freestyle, Urban and other street styles, students are constantly challenged to step outside of their comfort zone. We are also one of the only schools to offer the CSTD Hip Hop Exam Syllabus.",
          "You will be split into different groups based off your age and ability to maximise learning. We have the Foundation and Intermediate classes for those who are starting out. Those who wish to take it to the next level can join our Crews - MADDNIFICENT (10 - 16y/o) and PROJECT MADD (17 - 21y/o)",
        ],
        video: "https://www.youtube.com/watch?v=MZFbny0JWfs",
      },
      {
        title: "Contemporary Dance",
        paragraphs: [
          "Contemporary Dance is a dance form fusing elements of lyrical, ballet and jazz. Our classes are designed for children to express themselves through Dance. We teach you how to tell a story through Choreography. With a top quality syllabus backed by the renowned CSTD (Australia), there is no better place to pursue your Contemporary Dance classes.",
          "We have Foundation classes designed for those who are new as well as our Kinetic Dance Crew for those with Jazz/Ballet background.",
        ],
        video: "https://www.youtube.com/watch?v=i4XdpoKIwMQ",
      },
      {
        title: "K-Pop/K-Pop Combo",
        paragraphs: [
          "K-Pop Music is taking over the world. And why not? Over the past years, we have seen more students wanting to dance to the music of BTS, Blackpink, Twice, ITZY, Enhyphen and more. We have developed an exciting and diversified curriculum for our students. If you love dancing to K-Pop, you can now choose from the following programmes:",
        ],
        bullets: { items: ["K-Pop Foundation/Intermediate - For the beginners or those who are starting out", "Hip Hop K-Pop Combo - For those who wish to infuse Hip Hop steps using K-Pop music", "K-Stars & K-Stars JR - Our Advanced Dance Crew for those who are already ready to form your own group and film your own Music Videos."] },
        closing: ["All our groups get regular performing opportunities. With that many options, no wonder we are one of the top schools when it comes to our K-Pop classes."],
        video: "https://youtu.be/N5ttZrB2bUI",
      },
      {
        title: "Popstars Pop Vocals",
        paragraphs: [
          "An exclusive MADDspace programme launched in 2021 - Popstars - a singing programme created by singers for singers.",
          "Up till today, students who opt to take the London College of Music Pop Vocal examinations have had limited opportunities to perform due to the rigours of the examination preparation.",
          "Hence, we have created a syllabus that allows a combination of exam preparations together with performing opportunities. Students who are part of Popstars will receive access to a series of audio and video lessons on top of their existing classes and experience singing in a group.",
          "In this small group class of not more than 8 pax, you get to kill two birds with one stone - receiving opportunities to perform while preparing for the London College of Music Pop Vocal examinations.",
        ],
        video: "https://youtu.be/6Nyk6X_7hnQ",
      },
      {
        title: "Jazz Dance",
        paragraphs: [
          "Electrifying, soulful and passionate; these are defining elements of Jazz Dance. Let us take you on a dance journey through dance styles that made Broadway famous and entertained audiences through the 20th century.",
          "Jazz is a dance genre that is fast, rhythmic and energetic. Built upon the basics of ballet, it is a progressive dance class that will take the dancer from being shy and reserved to being confident and showy. We offer the CSTD Exam syllabus - from Pre Jazz to Grade 8, eventually preparing our students for performances, competitions and Direct Schools Admission (DSA) applications.",
          "Our Jazz classes are age specific, which means that you will always be grouped with students of your age and ability, maximising your learning throughout your time here. Students who wish to take it one step further can audition for Enliven, our Jazz Dance Crew. The Enliven Crew maintains a rigorous and challenging dance atmosphere with an emphasis on building the strong technical foundations necessary for today's professional dance world.",
        ],
        video: "https://youtu.be/xhJdRblhgQ8",
      },
      {
        title: "Private Vocals/Dance",
        paragraphs: [
          "If you prefer specialised one on one attention from our instructors, then our Private Vocals and Dance classes are most suitable for you.",
          "Learn from our amazing team of instructors. We will charge your progress, talk about your objectives and work something out so that you can see yourself improve day in day out.",
          "Just learning is not enough. We offer your regular opportunities to showcase your pieces through live streams, annual recitals, end of term showcases and more.",
        ],
        video: "https://youtu.be/e8wv4nJvC3c",
      },
    ],
  },
  {
    slug: "youth-adults",
    h1: "YOUTH / ADULTS",
    ages: "18 - 35 YEARS OLD",
    gallery: "age-18-35",
    galleryCount: 7,
    formTitle: "INTERESTED?",
    formCopy: "Fill up the form below and our team will reach out to you shortly!",
    items: [
      {
        title: "Sing & Dance Adults Show Choir",
        badge: "Signature",
        paragraphs: [
          "Think you know what a Choir is about? Think again!",
          "Our Show Choir is not like your regular Choir. We sing, dance and act. With a Show Choir syllabus specially brought down from Los Angeles, USA, MADDspace is the only school in Singapore who is equipped to offers you an authentic Show Choir experience.",
          "Think Glee, Pitch Perfect, High School Musical. Or those nifty moves from the Spice Girls, Backstreet Boys, Westlife, One Direction and more.",
          "In this class, you will gain exposure and opportunities to do recordings in our recording studio and be taught advanced musicianship and showmanship, as well as learn things such as singing techniques and staging.",
        ],
        video: "https://youtu.be/l8s75boamOM",
      },
      {
        title: "Open Dance Classes",
        when: "(Hip Hop/Girls Style/Street Jazz) $18 per class",
        paragraphs: [
          "Not able to commit to regular classes? MADDspace offers Open Dance classes starting from $18.",
          "MADDspace open classes are best known for being fun and crazy. Kept at small group sizes, our open classes are welcoming and not overly intimidating. Did we mention that our Studio is one of the most instagrammable studios in Singapore, perfect for showing off those nifty moves on your social media.",
          "What are you waiting for? Book your class now!",
        ],
        video: "https://youtu.be/3pEoJBO3KkQ",
        moreInfo: "/open-classes",
      },
      {
        title: "Private Vocals / Dance",
        paragraphs: [
          "If you prefer specialised one on one attention from our instructors, then our Private Vocals and Dance classes are most suitable for you.",
          "Learn from our amazing team of instructors. We will charge your progress, talk about your objectives and work something out so that you can see yourself improve day in day out.",
          "Just learning is not enough. We offer your regular opportunities to showcase your pieces through live streams, annual recitals, end of term showcases and more.",
        ],
      },
      {
        title: "'Sing & Play' Keyboard",
        paragraphs: [
          "Introducing MADDspace's 'Sing & Play' Pop Keyboard Course, created for children and teens who would love to learn how to play the keyboard and sing to their favourite songs. Develop skills that will allow you to easily play your favourite Pop tunes on the radio.",
          "Our course will go through everything you need to know to sing and play. This includes common chord patterns, structures, pop keyboard playing patterns and more. You will also learn how to sing and play the chords to one song every 4 weeks.",
        ],
      },
    ],
  },
];

export const classesHub = {
  h1: "OUR CLASSES",
  intro: [
    "We offer a wide range of Singing, Dancing and Performing classes for Kids as young as 3 years old. On top of that, we also conduct workshops and classes for Adults.",
    "Browse below to check out the different options that we have for the various age groups.",
  ],
  philosophyTitle: "TEACHING PHILOSOPHIES",
  philosophy: [
    "Music and Dance encompasses all aspects of education. Our students do not just leave as better performers, but as better human beings.",
    "We harness and realize each child's potential through carefully crafted lesson plans.",
    "Every child is born unique & different, and will never be treated the same.",
    "We inculcate in our students essential life skills such as teamwork, perseverance and social empathy through the mediums of music and dance.",
  ],
};

// Programmes page — BY AGE wavy accordion (programme names as listed on each age page)
export const byAge = [
  { title: "PRESCHOOL", ages: "3 – 5.5 years old", href: "/preschool-classes", image: "/images/classes/age-3-5/age-3-5-05.jpg", alt: "MADDspace preschool students on stage", programmes: ["Sing & Dance", "Hip Hop & K-Pop Combo", "Parent Accompanied Hip Hop", "Private Lessons"] },
  { title: "JUNIOR KIDS", ages: "6 – 9 years old", href: "/junior-kids", image: "/images/classes/age-6-9/age-6-9-06.jpg", alt: "MADDspace junior kids performing", programmes: ["Show Choir", "Developing Artiste Programme", "K-Pop", "Hip Hop", "Ballet / Jazz", "Popstars Pop Vocals"] },
  { title: "PRE-TEENS & TEENS", ages: "10 – 18 years old", href: "/preteens-teens-classes", image: "/images/classes/age-10-18/age-10-18-09.jpg", alt: "MADDspace teens performing on stage", programmes: ["MADDartistes", "Sing & Dance Show Choir", "Hip Hop", "K-Pop", "Contemporary", "Jazz", "Popstars Pop Vocals"] },
  { title: "YOUTH / ADULTS", ages: "18 – 35 years old", href: "/youth-adults", image: "/images/classes/age-18-35/age-18-35-04.jpg", alt: "MADDspace youth and adult dancers", programmes: ["Adults Show Choir", "Open Dance Classes", "Private Vocals / Dance", "'Sing & Play' Keyboard"] },
];

// Programmes page — BY TYPE hover list. Facts from each programme page; images from the Drive folders.
export const byType = [
  { title: "Idol Artiste Training", href: "/idol-training-singapore", style: "Sing · Dance · Perform", ages: "10 – 21", syllabus: "KMCP (Korea)", images: ["/images/classes/age-10-18/age-10-18-02.jpg", "/images/classes/age-10-18/age-10-18-09.jpg", "/images/achievements/rising-voice.jpg", "/images/classes/age-10-18/age-10-18-01.jpg"] },
  { title: "Singing", href: "/singing-classes-singapore", style: "Private & group vocals", ages: "4 – 21", syllabus: "LCM (UK) · KMCP", images: ["/images/classes/age-6-9/age-6-9-03.jpg", "/images/classes/age-10-18/age-10-18-01.jpg", "/images/classes/age-3-5/age-3-5-02.jpg", "/images/classes/age-6-9/age-6-9-02.jpg"] },
  { title: "Hip Hop", href: "/hiphop", style: "Group & private dance", ages: "3.5 – 18", syllabus: "CSTD (Australia)", images: ["/images/classes/age-18-35/age-18-35-02.jpg", "/images/classes/age-18-35/age-18-35-06.jpg", "/images/classes/age-3-5/age-3-5-08.jpg", "/images/achievements/dap-b.jpg"] },
  { title: "K-Pop", href: "/kpop", style: "Group & private dance", ages: "3 – 18", syllabus: "KMCP (Korea)", images: ["/images/classes/age-10-18/age-10-18-07.jpg", "/images/classes/holiday-camps/holiday-camps-04.jpg", "/images/classes/age-6-9/age-6-9-05.jpg", "/images/classes/holiday-camps/holiday-camps-02.jpg"] },
  { title: "Private Sessions", href: "/private-classes", style: "1-to-1 vocals or dance", ages: "5 and up", syllabus: "Tailored", images: ["/images/classes/age-6-9/age-6-9-02.jpg", "/images/classes/age-10-18/age-10-18-03.jpg", "/images/classes/dsa/dsa-04.jpg", "/images/classes/age-3-5/age-3-5-01.jpg"] },
  { title: "Dance Class for Toddlers", href: "/dance-class-for-toddlers", style: "Music & movement", ages: "3 – 5", syllabus: "CSTD 'Come Dance With Me'", images: ["/images/classes/age-3-5/age-3-5-05.jpg", "/images/classes/age-3-5/age-3-5-09.jpg", "/images/classes/age-3-5/age-3-5-06.jpg", "/images/classes/age-3-5/age-3-5-10.jpg"] },
  { title: "Dance Classes for Kids", href: "/dance-classes-for-kids", style: "Hip Hop · K-Pop · Jazz · Contemporary · Ballet", ages: "3 – 18", syllabus: "CSTD (Australia)", images: ["/images/classes/age-6-9/age-6-9-04.jpg", "/images/classes/holiday-camps/holiday-camps-06.jpg", "/images/classes/age-6-9/age-6-9-05.jpg", "/images/classes/holiday-camps/holiday-camps-07.jpg"] },
];
