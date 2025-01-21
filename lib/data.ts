import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import codrexik from "@/public/codrexik.png";
import Renotary from "@/public/Renotary.png";
import Learnexik from "@/public/Learnexik.png";
import Cormidect from "@/public/Cormidect.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "B.Tech in Information Technology",
    location: "Ahmedabad, Gujarat, India",
    description:
      "Currently pursuing a Bachelor of Technology in Information Technology. Developed a strong foundation in software development and modern web technologies. Expected graduation in July 2025.",
    icon: React.createElement(LuGraduationCap),
    date: "2021 - Present",
  },
  {
    title: "Software Developer Intern",
    location: "Elsner Technologies, Ahmedabad, India",
    description:
      "Worked on front-end development using React for 3 months, then transitioned to full-stack development with the MERN stack and Next.js. Gained hands-on experience delivering scalable and efficient solutions.",
    icon: React.createElement(CgWorkAlt),
    date: "January 2024 - July 2024",
  },
  {
    title: "Associate Software Developer",
    location: "Elsner Technologies, Ahmedabad, India",
    description:
      "Currently working as an Associate Software Developer. Primarily focused on full-stack development using MERN stack and Next.js. Contributed to a notable project integrating React with Laravel, delivering a seamless and efficient user experience.",
    icon: React.createElement(FaReact),
    date: "July 2024 - January 2025",
  },
] as const;

export const projectsData = [
  {
    title: "Codrexik",
    description:
      "Developed a feature-rich online code editor supporting 10 languages and 5 customizable themes, creating a powerful coding environment.",
    tags: ["Next.js", "Zustand", "Convex", "Clerk", "LemonSqueezy"],
    imageUrl: codrexik,
    link: "https://codrexik.vercel.app",
  },
  {
    title: "Learnexik",
    description:
      "An online learning platform for students and teachers. Developed a feature-rich platform for students to access courses and for teachers to create and manage courses.",
    tags: ["Mern Stack", "Redux"],
    imageUrl: Learnexik,
    link: "https://github.com/Dhruvil0037/Learnexik",
  },
  {
    title: "Cormidect",
    description:
      "Cormidect is a web application offering seamless communication and collaboration through text, voice, and video chats, community creation, role management, and real-time interactions.",
    tags: ["Next.js", "Zustand", "Socket.io", "Postgresql", "NeonDB"],
    imageUrl: Cormidect,
    link: "https://github.com/Dhruvil0037/Cormidect",
  },
  {
    title: "Renotary",
    description:
      "A platform for providing notary services online. Developed a user-friendly interface for clients to book appointments and access services for both notaries and clients.",
    tags: ["React", "Redux"],
    imageUrl: Renotary,
    link: " ",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "React",
  "Redux",
  "Zustand",
  "TanStack Query",
  "Shadcn UI",
  "Material UI",
  "Framer Motion",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "RESTful APIs",
  "GraphQL",
  "PHP",
  "Laravel",
  "Python",
  "Git",
  "GitHub",
  "GitLab",
  "Docker",
  "SAAS Development",
  "Socket.io",
  "WebSockets",
  "Jest",
  "Convex",
  "Clerk",
  "Firebase",
] as const;
