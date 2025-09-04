// src/pages/About.jsx
export default function About() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0b0f14] text-white px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293733_1px,transparent_1px),linear-gradient(to_bottom,#1f293733_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Content */}
      <div className="relative max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Photo */}
        <div className="flex justify-center">
          <img
            src="/profile.png"
            alt="Jake Chaffin"
            className="w-64 h-64 object-cover rounded-2xl shadow-lg border border-gray-700 hover:grayscale-0 grayscale transition duration-500"
          />
        </div>

        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Me
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Hi, I’m Jake Chaffin — a full-stack developer and AV technician who
            loves blending technology and design. My work spans from building
            modern websites and apps to creating seamless audio/visual
            experiences in the real world. I’m passionate about clean design,
            new technology, and creating things that make life easier.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-[#111827]/80 backdrop-blur rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Development</h3>
              <p className="text-sm text-gray-400">React, Node, Tailwind</p>
            </div>
            <div className="p-4 bg-[#111827]/80 backdrop-blur rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">AV & Tech</h3>
              <p className="text-sm text-gray-400">Smart homes, theaters</p>
            </div>
            <div className="p-4 bg-[#111827]/80 backdrop-blur rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Passions</h3>
              <p className="text-sm text-gray-400">
                Clean design, problem-solving
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
