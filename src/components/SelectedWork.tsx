import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject?: (project: ProjectItem) => void;
  onViewAllProjects?: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject?: (project: ProjectItem) => void;
}

const ProjectCardWithWaterWave: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastRippleTime.current < 120) return;
    lastRippleTime.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple: Ripple = { id: now, x, y };

    setRipples((prev) => [...prev.slice(-3), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 850);
  }, []);

  const handleMouseLeave = () => {
    setRipples([]);
  };

  return (
    <div
      onClick={() => onSelectProject && onSelectProject(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer bg-slate-900 overflow-hidden flex flex-col justify-end aspect-[4/4.6] transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 select-none rounded-sm"
    >
      {/* Project Image with Zoom and Liquid Water Wave Refraction on Hover */}
      <img
        src={project.image}
        alt={project.title}
        className="water-refract absolute inset-0 w-full h-full object-cover group-hover:scale-106 group-hover:brightness-95"
        loading="lazy"
      />

      {/* Shimmering Liquid Surface Reflection on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-15 bg-gradient-to-tr from-transparent via-white/12 to-transparent" />

      {/* Interactive Water Ripple Rings on Mouse Movement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full border border-white/50 pointer-events-none animate-water-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '80px',
              height: '80px',
              boxShadow: '0 0 16px rgba(255, 255, 255, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.25)',
            }}
          />
        ))}
      </div>

      {/* Dark Ambient Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-500 z-10 pointer-events-none opacity-100 group-hover:opacity-60" />

      {/* Bottom Information Card Bar */}
      <div className="relative z-20 p-6 flex items-end justify-between transition-all duration-400 border-t border-white/10 bg-black/85 backdrop-blur-xs group-hover:border-white/30 group-hover:bg-black/90">
        <div>
          <div className="text-xs font-black tracking-widest uppercase text-white mb-1 drop-shadow-sm">
            {project.category}
          </div>
          <div className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors drop-shadow-sm">
            {project.subtitle}
          </div>
        </div>

        {/* Interactive Arrow Button */}
        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 transform group-hover:rotate-45 shadow-sm">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white">
      {/* Global SVG Water Wave Refraction Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="water-ripple-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.035"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="4.5s"
                keyTimes="0;0.5;1"
                values="0.012 0.03; 0.022 0.05; 0.012 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 uppercase">
              SELECTED <span className="text-[#0052fe]">WORK</span>
            </h2>
          </div>
          <div>
            <button
              onClick={onViewAllProjects}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-[#0052fe] transition-colors cursor-pointer"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioConfig.projects.slice(0, 3).map((project) => (
            <ProjectCardWithWaterWave
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
