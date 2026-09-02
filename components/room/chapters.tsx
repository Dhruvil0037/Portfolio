"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillsData, projectsData, experiencesData, links } from "@/lib/data";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="section-index mb-3">{children}</div>;
}

/** Opening beat — no card, no paragraph, just a small mark so the room is
 * the first thing seen. Still a real <h1> for SEO/accessibility. */
export function HomeMark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="pointer-events-none select-none"
    >
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Dhruvil Dhamecha
      </h1>
      <p className="font-mono text-xs tracking-widest text-accent uppercase mt-1">
        Senior Full Stack Developer
      </p>
    </motion.div>
  );
}

export function AboutChapter() {
  return (
    <div className="text-center">
      <Eyebrow>01 — About</Eyebrow>
      <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-4">
        On the shelf
      </h2>
      <p className="text-ink/75 leading-relaxed">
        Senior Full Stack Developer at Squadkin Technologies, 2+ years
        building scalable web apps — Next.js, Node.js, Python, and enough
        AI/ML to be dangerous. B.Tech from LJIET, 8.7 CGPA. Open to remote
        work.
      </p>
      <p className="text-ink/60 text-sm mt-3 italic">
        Every spine on that shelf is something I actually use.
      </p>
    </div>
  );
}

export function ProjectsChapter() {
  const top = projectsData.slice(0, 4);
  return (
    <div>
      <Eyebrow>02 — Projects</Eyebrow>
      <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-5">
        On the screen
      </h2>
      <ul className="space-y-4">
        {top.map((p) => (
          <li key={p.title} className="border-b border-line pb-3 last:border-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display font-semibold">{p.title}</span>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  className="font-mono text-xs text-accent shrink-0"
                >
                  visit ↗
                </a>
              )}
            </div>
            <p className="text-ink/65 text-sm mt-1">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsChapter() {
  return (
    <div className="text-center">
      <Eyebrow>03 — Skills</Eyebrow>
      <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-5">
        On the keys
      </h2>
      <ul className="flex flex-wrap justify-center gap-2 font-mono text-xs">
        {skillsData.slice(0, 24).map((s) => (
          <li key={s} className="borderInk px-3 py-1.5 text-ink/75">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceChapter() {
  return (
    <div className="text-center">
      <Eyebrow>04 — Experience</Eyebrow>
      <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-4">
        On the wall
      </h2>
      <p className="text-ink/70 leading-relaxed">
        Three roles, one thread — front-end intern to full-stack to leading
        a stack end to end. The timeline&apos;s framed behind you.
      </p>
      <ul className="mt-4 space-y-1 font-mono text-xs text-ink/55">
        {experiencesData.map((e) => (
          <li key={e.title}>
            {e.date} — {e.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactChapter() {
  const [form, setForm] = useState({ senderEmail: "", message: "" });
  const [pending, setPending] = useState(false);

  return (
    <div className="text-center">
      <Eyebrow>05 — Contact</Eyebrow>
      <h2 className="font-display text-2xl font-semibold sm:text-3xl mb-4">
        Through the window
      </h2>
      <p className="text-ink/70 mb-5">
        Reach me directly at{" "}
        <a href="mailto:dhruvildhamecha2003@gmail.com" className="text-accent underline">
          dhruvildhamecha2003@gmail.com
        </a>
        , or send a note here.
      </p>
      <form
        className="flex flex-col gap-3 text-left"
        action={async (formData) => {
          setPending(true);
          const { error } = await sendEmail(formData);
          setPending(false);
          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Sent — I'll reply soon.");
          setForm({ senderEmail: "", message: "" });
        }}
      >
        <input
          className="h-12 px-4 rounded borderInk bg-paper text-ink outline-none focus:border-accent"
          name="senderEmail"
          type="email"
          required
          placeholder="Your email"
          value={form.senderEmail}
          onChange={(e) => setForm((f) => ({ ...f, senderEmail: e.target.value }))}
        />
        <textarea
          className="h-28 px-4 py-3 rounded borderInk bg-paper text-ink outline-none focus:border-accent"
          name="message"
          required
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <button
          type="submit"
          disabled={pending}
          className="self-center bg-ink text-paper px-6 py-2.5 rounded border border-ink hover:bg-accent hover:border-accent transition disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send"}
        </button>
      </form>
      <div className="flex justify-center gap-4 mt-5 font-mono text-xs text-ink/55">
        <a href="https://www.linkedin.com/in/dhruvil-dhamecha-14939b258/" target="_blank">
          LinkedIn
        </a>
        <a href="https://github.com/Dhruvil0037" target="_blank">
          GitHub
        </a>
        <a href="/CV.pdf" download>
          CV
        </a>
      </div>
    </div>
  );
}

export const chapterLinks = links;
