import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import StationPanel from "@/components/room/station-panel";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <StationPanel>
        <Intro />
      </StationPanel>
      <StationPanel>
        <About />
      </StationPanel>
      <StationPanel>
        <Projects />
      </StationPanel>
      <StationPanel>
        <Skills />
      </StationPanel>
      <StationPanel>
        <Experience />
      </StationPanel>
      <StationPanel>
        <Contact />
      </StationPanel>
    </main>
  );
}
