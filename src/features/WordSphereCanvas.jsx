import { useEffect, useRef } from "react";

export default function WordSphereCanvas({
  words = [
    "Full-Stack",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Supabase",
    "REST",
    "GraphQL",
    "API",
    "JWT",
    "Vite",
    "Git",
    "Docker",
    "CSS",
    "HTML",
    "Tailwind",
    "Framer Motion",
    "OAuth",
    "Prisma",
    "Zod",
    "Axios",
    "CI/CD",
    "Next.js",
    "Redis",
    "Webhooks",
    "Testing",
    "Jest",
    "Cypress",
    "Netlify",
    "Vercel",
    "Cloud",
    "S3",
    "Auth",
  ],
  size = 420,
  radius = 175,
  speed = 0.0035,
  color = "#c9d4e6",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const angleRef = useRef({ ax: 0, ay: 0 });
  const ptsRef = useRef([]);

  useEffect(() => {
    const N = words.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push({ x, y, z, text: words[i] });
    }
    ptsRef.current = pts;
  }, [words]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "600 14px Inter, system-ui, Segoe UI, Roboto, Arial, sans-serif";

    const center = { x: size / 2, y: size / 2 };
    const persp = 600;

    const draw = () => {
      const { ax, ay } = angleRef.current;
      ctx.clearRect(0, 0, size, size);

      const transformed = ptsRef.current.map((p) => {
        const cosY = Math.cos(ay),
          sinY = Math.sin(ay);
        const cosX = Math.cos(ax),
          sinX = Math.sin(ax);

        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y;

        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        const scale = persp / (persp - z * radius);
        const px = center.x + x * radius * scale;
        const py = center.y + y * radius * scale;

        return { px, py, z, scale, text: p.text };
      });

      transformed.sort((a, b) => a.z - b.z);

      for (const t of transformed) {
        const alpha = 0.35 + 0.65 * (t.scale - 0.6);
        ctx.globalAlpha = Math.max(0.2, Math.min(1, alpha));
        ctx.fillStyle = color;
        ctx.save();
        ctx.translate(t.px, t.py);
        ctx.scale(t.scale, t.scale);
        ctx.fillText(t.text, 0, 0);
        ctx.restore();
      }

      angleRef.current.ay += speed;
      angleRef.current.ax += speed * 0.25;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      angleRef.current.ay += dx * 0.03;
      angleRef.current.ax -= dy * 0.03;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, radius, speed, color]);

  return (
    <div
      className="word-sphere"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
