import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SectionRail } from "@/components/SectionRail";
import {
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
      <SectionRail />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
