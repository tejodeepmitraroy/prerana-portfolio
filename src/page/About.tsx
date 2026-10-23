import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { StatsCounter } from '../components/StatsCounter';
import { TrustedBy } from '../components/TrustedBy';
import { FooterSection } from '../components/FooterSection';

interface AboutPageProps {
  onOpenContact?: () => void;
}

const About: React.FC<AboutPageProps> = ({ onOpenContact }) => {
  return (
    <div className="w-full pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="border-b border-slate-200 pb-8 mb-8">
          <span className="text-xs font-black tracking-widest text-[#0052fe] uppercase block mb-2">
            BIOGRAPHY & PHILOSOPHY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 uppercase tracking-tight">
            ABOUT <span className="text-[#0052fe]">ALEX CARTER</span>
          </h1>
        </div>
      </div>
      <AboutSection />
      <StatsCounter />
      <TrustedBy />
      <FooterSection onOpenContact={onOpenContact} />
    </div>
  );
};

export default About;