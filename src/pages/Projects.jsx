// src/pages/Projects.jsx
import { Link } from "react-router-dom";

export default function Projects() {
  const cards = [
    {
      type: "real",
      id: "jbc-portfolio",
      title: "JBC Portfolio",
      blurb: "This site — React, Vite, Tailwind, custom glitch intro and pages.",
      href: "/projects/jbc-portfolio",
      cover: "/images/jbc-portfolio-cover.jpg", // <-- put your screenshot here
    },
    ...Array.from({ length: 5 }).map((_, i) => ({
      type: "placeholder",
      id: `ph-${i + 1}`,
      title: "Coming soon",
      blurb: "A new build is on the way.",
    })),
  ];

  return (
    <section className="min-h-screen bg-[#0b0f14] text-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="mt-3 text-gray-300">
            This portfolio itself is my first live project. More case studies
            will appear here soon.
          </p>
        </header>

        {/* subtle grid + glow background */}
        <div className="relative rounded-2xl border border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293733_1px,transparent_1px),linear-gradient(to_bottom,#1f293733_1px,transparent_1px)] bg-[size:38px_38px] opacity-20" />
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-indigo-500/15 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-cyan-500/15 blur-[100px] rounded-full" />

          <div className="relative z-10 p-6 md:p-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) =>
                c.type === "real" ? (
                  <RealCard key={c.id} {...c} />
                ) : (
                  <PlaceholderCard key={c.id} title={c.title} blurb={c.blurb} />
                )
              )}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-300">Want to collaborate or see in-progress work?</p>
              <Link
                to="/contact"
                className="inline-flex mt-3 items-center justify-center rounded-lg bg-white/90 text-black font-medium px-5 py-2.5 hover:bg-white transition"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealCard({ title, blurb, href, cover }) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0e141b]/70 backdrop-blur hover:ring-1 hover:ring-white/10 transition"
    >
      {/* cover image */}
      {cover ? (
        <img
          src={cover}
          alt={`${title} cover`}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="h-40 w-full bg-gradient-to-b from-[#151b23] to-[#0e141b]" />
      )}

      <div className="p-5">
        <span className="inline-flex items-center rounded-md bg-emerald-600/30 px-2 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-700/40">
          Live
        </span>
        <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-400">{blurb}</p>
      </div>
    </Link>
  );
}

function PlaceholderCard({ title, blurb }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0e141b]/70 backdrop-blur">
      <img
        src="/coming-soon.svg"
        alt="Coming soon"
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <span className="inline-flex items-center rounded-md bg-gray-700/40 px-2 py-0.5 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-600/40">
          {title}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-white">New case study</h3>
        <p className="mt-1 text-sm text-gray-400">{blurb}</p>
      </div>
    </div>
  );
}
