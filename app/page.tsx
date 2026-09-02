import StationPanel from "@/components/room/station-panel";
import {
  HomeMark,
  AboutChapter,
  ProjectsChapter,
  SkillsChapter,
  ExperienceChapter,
  ContactChapter,
} from "@/components/room/chapters";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <StationPanel id="home" sectionName="Home" align="start" bare>
        <HomeMark />
      </StationPanel>
      <StationPanel id="about" sectionName="About">
        <AboutChapter />
      </StationPanel>
      <StationPanel id="projects" sectionName="Projects">
        <ProjectsChapter />
      </StationPanel>
      <StationPanel id="skills" sectionName="Skills">
        <SkillsChapter />
      </StationPanel>
      <StationPanel id="experience" sectionName="Experience">
        <ExperienceChapter />
      </StationPanel>
      <StationPanel id="contact" sectionName="Contact">
        <ContactChapter />
      </StationPanel>
    </main>
  );
}
