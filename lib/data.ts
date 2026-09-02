import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import squadexa from "@/public/squadexa.png";
import casa39 from "@/public/casa39.png";
import dayzen from "@/public/dayzen.png";
import kartipr from "@/public/kartipr.png";
import soniandsoni from "@/public/soniandsoni.png";
import codrexik from "@/public/codrexik.png";
import Cormidect from "@/public/Cormidect.png";
import Learnexik from "@/public/Learnexik.png";
import Renotary from "@/public/Renotary.png";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export const experiencesData = [
  {
    title: "Software Developer Intern",
    location: "Elsner Technologies, Ahmedabad, India",
    description:
      "Front-end in React, then full-stack with MERN + Next.js. Delivered production features across multiple client projects.",
    icon: React.createElement(CgWorkAlt),
    date: "January 2024 – July 2024",
  },
  {
    title: "Associate Software Developer",
    location: "Elsner Technologies, Ahmedabad, India",
    description:
      "Full-stack with MERN + Next.js. Led a large-scale React + Laravel integration for a key client.",
    icon: React.createElement(FaReact),
    date: "July 2024 – January 2025",
  },
  {
    title: "Senior Full Stack Developer",
    location: "Squadkin Technologies Pvt. Ltd., Ahmedabad, India",
    description:
      "Leading web & eCommerce development with React, Next.js, Node.js, and Python — building scalable solutions for global clients.",
    icon: React.createElement(CgWorkAlt),
    date: "April 2025 – Present",
  },
] as const;

export const projectsData = [
  {
    title: "Squadexa AI",
    description:
      "AI writing platform in 180+ countries. Built NLP pipelines with custom tokenisation, RAG models & LangChain. Features AI humaniser, plagiarism checker, AI detector & admin panel.",
    tags: ["Next.js", "Python", "LangChain", "RAG", "NLP", "GSAP"],
    imageUrl: squadexa,
    link: "https://www.squadexa.ai",
  },
  {
    title: "Casa39 AI Chatbot",
    description:
      "Conversational AI for an Italian eCommerce — full shopping journey from product discovery to checkout. Admin panel with lead gen, tracking & chatbot customisation.",
    tags: ["Next.js", "Python", "NLP", "LangChain", "Admin Panel"],
    imageUrl: casa39,
    link: "https://www.casa39.it",
  },
  {
    title: "Dayzen",
    description:
      "Solo-built HRMS + WMS combining Keka & Jira — attendance, payroll, leave, project tracking & warehouse ops. Full admin panel, CI/CD-driven deploys & schema migrations handled end-to-end solo. Under active development.",
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "Docker", "CI/CD"],
    imageUrl: dayzen,
    link: "",
  },
  {
    title: "KartIPR",
    description:
      "Marketplace to buy, sell & license IP — patents, copyrights & trademarks. Admin panel with listing management, lead tracking, analytics & blog CMS.",
    tags: ["Next.js", "MySQL", "Zustand", "Tailwind CSS", "Framer Motion"],
    imageUrl: kartipr,
    link: "https://www.kartipr.com",
  },
  {
    title: "Soni & Soni",
    description:
      "Legal services site with lawyer slot booking & Google Calendar 2-way sync. Admin panel for bookings, leads & content. SEO-optimised, performance-first.",
    tags: ["Next.js", "MySQL", "Tailwind CSS", "Google Calendar API"],
    imageUrl: soniandsoni,
    link: "https://www.soniandsoni.legal",
  },
  {
    title: "Codrexik",
    description:
      "In-browser code editor supporting 10 languages & 5 themes with real-time execution and a polished developer experience.",
    tags: ["Next.js", "Zustand", "Convex", "Clerk", "LemonSqueezy"],
    imageUrl: codrexik,
    link: "https://codrexik.vercel.app",
  },
  {
    title: "Cormidect",
    description:
      "Real-time communication platform with text, voice & video, community creation, role management & live interactions.",
    tags: ["Next.js", "Socket.io", "PostgreSQL", "Zustand"],
    imageUrl: Cormidect,
    link: "https://github.com/Dhruvil0037/Cormidect",
  },
  {
    title: "Learnexik",
    description:
      "Full-stack LMS for students & teachers — course creation, management & structured content delivery.",
    tags: ["MERN Stack", "Redux"],
    imageUrl: Learnexik,
    link: "https://github.com/Dhruvil0037/Learnexik",
  },
  {
    title: "Renotary",
    description:
      "Online notary services platform for booking appointments and managing client-notary workflows.",
    tags: ["React", "Redux"],
    imageUrl: Renotary,
    link: "",
  },
] as const;

export const skillsData = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "Express",
  "Redux",
  "Zustand",
  "Socket.io",
  "GraphQL",
  "RESTful APIs",
  "Prisma ORM",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Three.js",
  "TanStack Query",
  "WebSockets",
  "PHP",
  "Laravel",
  "NumPy",
  "Pandas",
  "AI/ML",
  "LangChain",
  "Prompt Engineering",
  "Embeddings",
  "Vector Databases",
  "AI Agents",
  "OpenAI API",
  "Anthropic API",
  "Apache",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Shadcn UI",
  "Material UI",
  "Git",
  "GitHub",
  "GitLab",
  "Docker",
  "CI/CD Pipelines",
  "Database Migrations",
  "Vercel",
  "VPS Deployment",
  "SAAS Development",
  "Jest",
  "Convex",
  "Clerk",
] as const;

