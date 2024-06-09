import Contact from "./components/contact";
import FrontPage from "./components/header";
import ProjectPage from "./components/projects";
import SkillsPage from "./components/skills";
import Testimonial from "./components/testimonials";

export default function Home() {
  
  return (
    <>
      <FrontPage />
      <SkillsPage />
      <ProjectPage />
      <Testimonial />
      <Contact />
    </>
  );
}
