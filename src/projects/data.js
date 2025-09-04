// src/projects/data.js

export const projects = [
  {
    slug: "jbc-portfolio",
    title: "JBC Portfolio",
    blurb:
      "This website: React + Vite + Tailwind with a custom glitch intro and polished About/Contact.",
    tags: ["React", "Vite", "Tailwind", "UI/UX"],
    cover: "/images/jbc-portfolio-cover.jpg", // optional; add later or leave null
    links: {
      demo: "/", // your live site root
      repo: "https://github.com/yourname/jbc-portfolio", // optional
    },
    sections: [
      {
        heading: "Overview",
        body:
          "A fast, minimal portfolio built with Vite + React and styled with Tailwind. Features a custom GlitchIntro reveal, subtle backgrounds, and responsive layouts."
      },
      {
        heading: "Key Features",
        body:
          "• Fullscreen glitch intro (once per session)\n• Clean About page with subtle grid + glow\n• Working Contact form (Formspree, validation, honeypot)\n• Projects grid with placeholders while content ramps up"
      },
      {
        heading: "Tech",
        body:
          "React, Vite, Tailwind CSS. Deployed on your host of choice."
      }
    ],
    // date or other metadata if you want:
    date: "2025-01-01"
  },

  // Add more projects here as you build them…
];
