// Google Business Profile — MADDspace (Central), 1 Selegie Rd #02-12
// Aggregate + reviews pulled from Google Maps on 14 Oct 2026. Add more entries as they come in.
export const googleProfile = {
  name: "MADDspace - School of Music, Art, Drama & Dance (Central)",
  rating: 4.7,
  count: 150,
  cid: "12202938206949033253",
  placeId: "ChIJwRtlspEZ2jERJUU9MaWLWak",
  mapsUrl: "https://maps.google.com/?cid=12202938206949033253",
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJwRtlspEZ2jERJUU9MaWLWak",
  topics: ["confidence building", "dedicated teachers", "performance opportunities", "supportive teachers", "private vocal lessons"],
};

export type Review = { name: string; rating: number; when: string; text: string; source: "google" | "facebook" | "site" };

export const reviews: Review[] = [
  { name: "Celine Ang", rating: 5, when: "2 months ago", source: "google", text: "We are thankful for the opportunity for Rianne to be part of Maddspace's \"Under Singapore Skies\" music video! She enjoyed herself very much and made many new friends during the rehearsals and filming. As a parent, it's heartwarming to see her enthusiasm and development through this experience. Rianne's time in the project has sparked her interest and confidence, giving her a fresh sense of direction - becoming a lead singer or dancer next time! :)" },
  { name: "Farrel", rating: 5, when: "2 months ago", source: "google", text: "My girl Raelynn love her vocal teacher, Ms Megan. She looks forward to her singing classes every week and the class always end on a happy note. Maddspace has also provided opportunities for her to perform on stage and in different activities arranged by the schools (for example for NDP) which I believe will help in her confidence that will bring her through life. Thanks Maddspace ❤️" },
  { name: "Linda", rating: 5, when: "2 months ago", source: "google", text: "Really thankful to MADDspace for giving Claire the opportunity to be part of the Under Singapore Skies music video. It was such a meaningful experience for her, especially being able to sing, dance and take part in the actual filming for a song celebrating Singapore. From the rehearsals to the long shooting days, it wasn't always easy, but I could see how much she learnt and grew through the whole experience. Also a big thank you to Teacher Joey, Claire's 1-to-1 vocal teacher. He has been very patient with her and always knows how to encourage and motivate her. Thank you MADDspace for giving the children opportunities beyond their regular lessons and allowing them to experience, learn and grow through performing!!" },
  { name: "Janna Tan", rating: 5, when: "", source: "site", text: "MADDspace is a very interesting with lots of opportunities to perform. My girl enjoys every lesson! The teachers are very caring and patient. Thank you so much ;)" },
  { name: "Ms Calin", rating: 5, when: "", source: "site", text: "Attending music and movement classes at maddspace has greatly improved Evey's motor skills and kindled her love for music and dance classes! When there is no class, she wears her dance shoes at home sometimes and comes up with her own dance for fun!" },
  { name: "Mrs Catherine Tan", rating: 5, when: "", source: "site", text: "We attended the Sing & dance camp. Instructors were professional and the school updated us with photos of the camp promptly towards the end of the day. My boy had a lot of fun and is looking forward to taking regular classes at MADDspace." },
];
