import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SelectedWork } from '../components/SelectedWork';
import { AboutSection } from '../components/AboutSection';
import { FooterSection } from '../components/FooterSection';
import { ProjectModal } from '../components/ProjectModal';
import type { ProjectItem } from '../data/portfolioData';

interface HomeProps {
  onOpenContact?: () => void;
  isContactOpen?: boolean;
  setIsContactOpen?: (open: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenContact }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const navigate = useNavigate();

  const handleOpenContact = () => {
    if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section (Animated) */}
      <Hero
        onOpenContact={handleOpenContact}
        onViewWork={() => {
          const el = document.getElementById('portfolio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Dark Stats Counter Banner */}
      {/* <StatsCounter /> */}

      {/* Selected Work / Projects */}
      <SelectedWork
        onSelectCategory={(category) => {
          navigate('/projects', { state: { category: category.name } });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectProject={(project) => setSelectedProject(project)}
        onViewAllProjects={() => {
          navigate('/projects');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Services Section */}
      {/* <ServicesSection /> */}

      {/* About Me & Skills Section */}
      <AboutSection />

      {/* Trusted By Client Logos */}
      {/* <TrustedBy /> */}

      {/* Footer Section & CTA */}
      <FooterSection onOpenContact={handleOpenContact} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Home;