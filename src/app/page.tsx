import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Footer,
  SkillsSection,
  WorkSection,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
