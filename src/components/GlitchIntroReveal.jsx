import React, { useEffect, useRef, useState } from "react";

/**
 * GlitchIntroReveal (JBC logo)
 * - Glitch → deglitch → pixel-dissolve → reveal site
 * - Fullscreen, scroll locked while active, once-per-session
 */
export default function GlitchIntroReveal({ children }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [active, setActive] = useState(() =>
    reduced ? false : !sessionStorage.getItem("introSeen")
  );
  const [phase, setPhase] = useState("glitch"); // 'glitch' | 'deglitch' | 'dissolve' | 'done'

  const rafRef = useRef(null);
  const canvasRef = useRef(null);

  const finish = () => {
    setPhase("done");
    setActive(false);
    sessionStorage.setItem("introSeen", "1");
  };

  const skip = () => finish();

  // Lock page scroll while intro is active
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [active]);

  // Static noise renderer sized to viewport
  useEffect(() => {
    if (!active || reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    let running = true;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const width = window.innerWidth;
      const height = window.innerHeight;

      // match CSS box to viewport
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // DPR-scaled drawing buffer
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawNoise = () => {
      if (!running) return;

      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const tileW = Math.max(160, Math.floor(cssW / 6));
      const tileH = Math.max(90, Math.floor(cssH / 6));

      const img = ctx.createImageData(tileW, tileH);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }

      ctx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, tileW, tileH, 0, 0, cssW, cssH);

      rafRef.current = requestAnimationFrame(drawNoise);
    };

    resize();
    window.addEventListener("resize", resize);
    drawNoise();

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, reduced]);

  // Timeline: glitch → deglitch → dissolve → done
  useEffect(() => {
    if (!active || reduced) return;
    const timers = [];
    timers.push(setTimeout(() => setPhase("deglitch"), 1800));
    timers.push(setTimeout(() => setPhase("dissolve"), 3000));
    timers.push(setTimeout(() => finish(), 4200));
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  return (
    <div className="glitch-intro-root">
      {children}

      {active && !reduced && (
        <div className={`glitch-overlay ${phase}`} aria-hidden="true">
          <button className="gi-skip" onClick={skip}>
            Skip
          </button>

          <canvas ref={canvasRef} className="gi-noise" />
          <div className="gi-scanlines" />
          <div className="gi-vignette" />
          <div className="gi-rgb gi-gray" />
          <div className="gi-rgb gi-white" />

          {/* JBC Logo */}
          <div className="gi-logo">
            <img src="/jbc-logo.svg" alt="JBC Logo" />
          </div>
        </div>
      )}

      <style>{styles}</style>
    </div>
  );
}

const styles = `
.glitch-intro-root { position: relative; min-height: 100%; }

/* Overlay */
.glitch-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: grid; place-items: center;
  background: #000;
  overflow: hidden;
  transition: opacity 900ms ease, filter 600ms ease;
}
.glitch-overlay.deglitch { filter: contrast(1.05) saturate(0.95) blur(0.5px); }
.glitch-overlay.dissolve { opacity: 0; }

/* Skip */
.gi-skip {
  position: absolute; top:14px; right:14px;
  padding:8px 12px; font-size:14px; border-radius:6px;
  border:1px solid rgba(255,255,255,0.22);
  background:rgba(0,0,0,0.45); color:#fff;
  cursor:pointer; backdrop-filter:blur(4px);
}
.gi-skip:hover { background:rgba(255,255,255,0.08); }

/* Noise canvas */
.gi-noise { position:absolute; inset:0; width:100%!important; height:100%!important; display:block; }

/* Scanlines */
.gi-scanlines { position:absolute; inset:0; background:repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.12) 3px); animation:scanShift 6s linear infinite; }
@keyframes scanShift { 0%{background-position-y:0;}100%{background-position-y:8px;} }

/* Vignette */
.gi-vignette { position:absolute; inset:0; pointer-events:none; background:radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); }

/* Jitter edges (space gray + ultra white) */
.gi-rgb { position:absolute; inset:-2%; mix-blend-mode:screen; animation:rgbJitter 900ms steps(2) infinite; }
.gi-gray { box-shadow:0 0 0 1px rgba(160,160,160,0.35) inset; }
.gi-white { box-shadow:0 0 0 1px rgba(255,255,255,0.30) inset; animation-delay:150ms; }
@keyframes rgbJitter { 0%{transform:translate(0,0);} 50%{transform:translate(1px,-1px);} 100%{transform:translate(0,0);} }

/* Logo */
.gi-logo {
  position: relative;
  width: clamp(140px, 30vw, 320px);
  animation: logoGlitch 700ms steps(2) infinite;
}
.gi-logo img { width: 100%; height: auto; display: block; }

/* Glitch layers */
.gi-logo::before,
.gi-logo::after {
  content: "";
  position: absolute; inset: 0;
  background: url("/jbc-logo.svg") center/contain no-repeat;
}
.gi-logo::before {
  clip-path: inset(0 0 50% 0);
  transform: translate(-2px,-1px);
  filter: drop-shadow(0 0 2px #a0a0a0);
  animation: slice1 450ms steps(2) infinite;
}
.gi-logo::after {
  clip-path: inset(50% 0 0 0);
  transform: translate(2px,1px);
  filter: drop-shadow(0 0 2px #ffffff);
  animation: slice2 420ms steps(2) infinite;
}

@keyframes logoGlitch { 0%,100%{transform:translate(0,0);} 40%{transform:translate(1px,-1px);} 80%{transform:translate(-1px,1px);} }
@keyframes slice1 { 0%,100%{transform:translate(-2px,-1px);} 50%{transform:translate(-1px,-2px);} }
@keyframes slice2 { 0%,100%{transform:translate(2px,1px);} 50%{transform:translate(3px,0px);} }

/* Pixel dissolve exit */
.glitch-overlay.dissolve .gi-logo {
  animation: pixelDissolve 1000ms steps(18) forwards;
}
@keyframes pixelDissolve {
  0%   { opacity: 1; clip-path: inset(0% 0% 0% 0%); }
  100% { opacity: 0; clip-path: inset(100% 100% 100% 100%); }
}

@media (prefers-reduced-motion: reduce) {
  .glitch-overlay { display:none!important; }
}
`;
