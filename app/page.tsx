import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

const stationClass =
  "min-h-screen w-full flex flex-col items-center justify-center px-4";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className={stationClass}>
        <Intro />
      </div>
      <SectionDivider />
      <div className={stationClass}>
        <About />
      </div>
      <div className={stationClass}>
        <Projects />
      </div>
      <div className={stationClass}>
        <Skills />
      </div>
      <div className={stationClass}>
        <Experience />
      </div>
      <div className={stationClass}>
        <Contact />
      </div>
    </main>
  );
}
