"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

const headline = [
  "Hello, I'm Dhruvil.",
  "I'm a",
  "Senior Full Stack Developer",
  "with",
  "2+ years",
  "of experience building",
  "AI-powered products,",
  "real-time systems &",
  "SEO-first Next.js applications.",
];

const wordVariants = {
  initial: { opacity: 0, y: 24 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.035 * i, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Image
            src="/dhruvil.webp"
            alt="Dhruvil portrait"
            width="192"
            height="192"
            quality="95"
            priority={true}
            className="h-24 w-24 rounded-full object-cover object-top border-2 border-line shadow-sm"
          />
        </motion.div>
      </div>

      <h1 className="mb-10 mt-6 px-4 font-display text-3xl font-semibold !leading-[1.35] sm:text-5xl">
        {headline.map((word, i) => (
          <motion.span
            key={i}
            className="mr-[0.3em] inline-block"
            custom={i}
            variants={wordVariants}
            initial="initial"
            animate="animate"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 text-base font-medium"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="#contact"
          className="group bg-ink text-paper px-7 py-3 flex items-center gap-2 rounded outline-none border border-ink hover:bg-accent hover:border-accent transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-80 group-hover:translate-x-1 transition" />
        </Link>

        <a
          className="group borderInk px-7 py-3 flex items-center gap-2 rounded outline-none hover:border-accent hover:text-accent transition cursor-pointer"
          href="/CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-70 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="borderInk p-4 text-ink/70 hover:text-accent hover:border-accent flex items-center gap-2 rounded transition cursor-pointer"
          href="https://www.linkedin.com/in/dhruvil-dhamecha-14939b258/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="borderInk p-4 text-ink/70 hover:text-accent hover:border-accent flex items-center gap-2 text-[1.35rem] rounded transition cursor-pointer"
          href="https://github.com/Dhruvil0037"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
