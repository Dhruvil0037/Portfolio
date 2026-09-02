"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading index="01 — About">About me</SectionHeading>
      <p className="mb-3">
        I&apos;m a{" "}
        <span className="font-medium">Senior Full Stack Developer</span> at{" "}
        <span className="font-medium">Squadkin Technologies Pvt. Ltd.</span>,
        Ahmedabad, with over{" "}
        <span className="font-medium">2 years of professional experience</span>{" "}
        building scalable web applications. I completed my{" "}
        <span className="font-medium">B.Tech in Information Technology</span>{" "}
        from <span className="font-medium">LJIET University</span> with a{" "}
        <span className="font-medium">8.7 CGPA</span>. I am open to working
        remotely.
      </p>
      <p className="mb-3">
        <span className="italic">My favorite part of programming</span> is
        designing systems that{" "}
        <span className="underline">actually scale</span>. I enjoy{" "}
        <span className="font-medium">system design</span> and{" "}
        <span className="font-medium">schema design</span> — thinking through
        data models, user flows, and load balancing before writing a single line
        of code. I build{" "}
        <span className="font-medium">performance-optimised</span>,{" "}
        <span className="font-medium">SEO-first</span> web applications with a
        focus on Core Web Vitals and real-world load handling. My core stack is{" "}
        <span className="font-medium">
          Next.js, Node.js, Express, and PostgreSQL
        </span>
        . I also work with Python, FastAPI, LangChain, and AI/ML integrations
        — RAG pipelines, embeddings, vector databases, and LLM agents — and
        own the full{" "}
        <span className="font-medium">
          CI/CD, Docker, and deployment pipeline
        </span>{" "}
        (Vercel & VPS) plus database migrations for the products I build
        solo, like Dayzen.
      </p>
      <p>
        <span className="italic">When I&apos;m not coding</span>, I enjoy
        playing video games, watching movies, and reading novels. I also enjoy{" "}
        <span className="font-medium">learning new things</span>.
      </p>
    </motion.section>
  );
}
