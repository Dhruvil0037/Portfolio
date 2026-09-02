"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading index="05 — Experience">My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f4f2ec" : "rgba(245, 242, 234, 0.05)",
                boxShadow: "none",
                border:
                  theme === "light"
                    ? "1px solid rgba(22, 19, 15, 0.12)"
                    : "1px solid rgba(245, 242, 234, 0.16)",
                borderRadius: "4px",
                textAlign: "left",
                padding: "1.3rem 2rem",
                fontFamily: "var(--font-body)",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #c2410c"
                    : "0.4rem solid #fb923c",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light" ? "#faf9f6" : "rgba(245, 242, 234, 0.1)",
                border:
                  theme === "light"
                    ? "1px solid rgba(22, 19, 15, 0.12)"
                    : "1px solid rgba(245, 242, 234, 0.16)",
                boxShadow: "none",
                fontSize: "1.5rem",
              }}
            >
              <h3 className="font-display font-semibold capitalize">
                {item.title}
              </h3>
              <p className="font-mono text-sm !mt-1">{item.location}</p>
              <p className="!mt-2 !font-normal text-ink/70">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
