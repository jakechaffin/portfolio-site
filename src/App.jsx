// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import GlitchIntroReveal from "./components/GlitchIntroReveal.jsx";
import "./App.css";
import ProjectDetail from "./pages/ProjectDetail.jsx";





export default function App() {
  return (
    <BrowserRouter>
      <GlitchIntroReveal>
        <div className="site">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GlitchIntroReveal>
    </BrowserRouter>
  );
}
