// src/pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState(""); // honeypot

  const FORMSPREE_ACTION = "https://formspree.io/f/xandnpwg";

  async function handleSubmit(e) {
    e.preventDefault();
    if (hp.trim()) return; // bot detected via honeypot

    const form = e.currentTarget;
    const formData = new FormData(form);

    // basic client validation
    const email = formData.get("email")?.toString() || "";
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err); // logs full error in browser console
      setErrorMsg(`Network error: ${err.message || "Please try again."}`);
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen bg-[#0b0f14] text-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="mt-3 text-gray-300">
            Tell me a bit about your project or opportunity and how I can help.
          </p>
        </header>

        {/* background subtle grid + glow */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293733_1px,transparent_1px),linear-gradient(to_bottom,#1f293733_1px,transparent_1px)] bg-[size:38px_38px] opacity-20" />
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-indigo-500/15 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] bg-cyan-500/15 blur-[100px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10 bg-[#0b0f14]/60 backdrop-blur rounded-2xl border border-gray-800">
            {/* Left: pitch */}
            <div>
              <h2 className="text-2xl font-semibold">Let’s work together</h2>
              <p className="mt-3 text-gray-300 leading-relaxed">
                I partner with teams to build thoughtful websites, apps, and
                audio/visual experiences. Share the details below and I’ll get
                back to you quickly.
              </p>

              <ul className="mt-6 space-y-2 text-gray-400 text-sm">
                <li>• Web apps & sites (React, Node, Tailwind)</li>
                <li>• AV installs (home theaters, networking, smart homes)</li>
                <li>• Consulting / availability requests</li>
              </ul>

              <div className="mt-6 text-sm text-gray-400">
                Prefer email?{" "}
                <span className="text-gray-300">jakechaffin@duck.com</span>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
                name="_gotcha"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" id="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input"
                    placeholder="Jane Doe"
                  />
                </Field>

                <Field label="Email" id="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input"
                    placeholder="jane@email.com"
                  />
                </Field>
              </div>

              <Field label="Company (optional)" id="company">
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="input"
                  placeholder="Acme Inc."
                />
              </Field>

              <Field label="Subject" id="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="input"
                  placeholder="Project inquiry / Availability"
                />
              </Field>

              <Field label="Service" id="service">
                <select id="service" name="service" className="input">
                  <option>Web/App Development</option>
                  <option>AV / Smart Home</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Budget (optional)" id="budget">
                <select id="budget" name="budget" className="input">
                  <option>—</option>
                  <option>Under $1k</option>
                  <option>$1k–$5k</option>
                  <option>$5k–$10k</option>
                  <option>$10k+</option>
                </select>
              </Field>

              <Field label="Message" id="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="input resize-y"
                  placeholder="What are you building? Timelines? Links?"
                />
              </Field>

              {/* consent */}
              <label className="flex items-start gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-600 bg-transparent"
                />
                I agree to be contacted about my inquiry.
              </label>

              {/* submit */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-lg bg-white/90 text-black font-medium px-5 py-2.5 hover:bg-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>

                <div
                  aria-live="polite"
                  className="text-sm min-h-[1.5rem] flex items-center"
                >
                  {status === "success" && (
                    <span className="text-emerald-400">
                      Thanks! I’ll reply shortly.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-rose-400">{errorMsg}</span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Tailwind “component classes” for inputs */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 12px;
          background: rgba(17,24,39,0.8);
          border: 1px solid #374151;
          padding: 10px 12px;
          outline: none;
          transition: box-shadow 150ms ease, border-color 150ms ease, background 150ms ease;
          color: #e5e7eb;
        }
        .input::placeholder { color: #9ca3af; }
        .input:focus {
          border-color: #a5b4fc;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
          background: rgba(17,24,39,0.9);
        }
      `}</style>
    </section>
  );
}

function Field({ label, id, children }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
