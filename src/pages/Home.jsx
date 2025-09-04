import { Link } from "react-router-dom";
import { motion as fm } from "framer-motion";
import WordSphereCanvas from "../features/WordSphereCanvas.jsx";

const MotionH1 = fm.h1;
const MotionP = fm.p;
const MotionDiv = fm.div;

export default function Home() {
  return (
    <section className="hero-decor">
      {/* background layers */}
      <div className="hero-bg-blob" aria-hidden="true" />
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="container min-h-[72vh] py-24">
        {/* Two columns on desktop, stacked on smaller screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <MotionH1
              className="text-[clamp(2.6rem,4vw+1rem,4rem)] leading-tight font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hey, I’m <span className="text-brand">Jake</span>.<br />
              Full-Stack Dev in Progress 🚀
            </MotionH1>

            <MotionP
              className="text-muted max-w-[52rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I build clean, modern apps with React, Node, and a love for tech.
              This site is where I showcase what I’m learning and creating.
            </MotionP>

            <MotionDiv
              className="mt-5 flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </MotionDiv>
          </div>

          {/* Right: globe */}
          <div className="flex justify-center lg:justify-end">
            <WordSphereCanvas size={420} radius={175} speed={0.0035} />
          </div>
        </div>
      </div>
    </section>
  );
}
