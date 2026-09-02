"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 bg-paper/85 backdrop-blur-md border border-line rounded-lg p-8 sm:p-10"
    >
      <SectionHeading index="04 — Skills">My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 font-mono text-sm">
        {skillsData.map((skill, index) => (
          <motion.li
            className="borderInk px-4 py-2 text-ink/80 transition-colors hover:border-accent hover:text-accent"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
