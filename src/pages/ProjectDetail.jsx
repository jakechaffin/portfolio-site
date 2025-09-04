// src/pages/ProjectDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../projects/data";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  // If not found, show Coming Soon page
  if (!project) {
    return (
      <section className="min-h-screen bg-[#0b0f14] text-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Coming soon
          </h1>
          <p className="text-gray-300">
            This project page is still being written. Check back soon or reach out.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/projects"
              className="rounded-lg border border-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-800/60 transition"
            >
              Back to Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-lg bg-white/90 text-black px-4 py-2 font-medium hover:bg-white transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0f14] text-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-gray-300">{project.blurb}</p>

          {/* tags & links */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {project.tags?.map((t) => (
              <span
                key={t}
                className="rounded-md bg-gray-700/40 px-2 py-0.5 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-600/40"
              >
                {t}
              </span>
            ))}

            <div className="ml-auto flex gap-3">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  className="rounded-lg bg-white/90 text-black px-3 py-1.5 text-sm font-medium hover:bg-white transition"
                >
                  Live
                </a>
              )}
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800/60 transition"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cover image (optional) */}
        {project.cover && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-gray-800">
            <img
              src={project.cover}
              alt={`${project.title} cover`}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {project.sections?.map((sec, i) => (
            <article key={i} className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-2">{sec.heading}</h2>
              <p className="text-gray-300 whitespace-pre-line">{sec.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
