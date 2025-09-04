/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f14",
        panel: "#111826",
        line: "#1b2230",
        brand: "#60a5fa",
        muted: "#94a3b8",
        text: "#e6edf3",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
