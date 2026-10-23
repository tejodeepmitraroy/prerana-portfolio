import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject?: (project: ProjectItem) => void;
  onViewAllProjects?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white">
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
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-[#0052fe] transition-colors"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioConfig.projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject && onSelectProject(project)}
              className="group relative cursor-pointer bg-slate-900 overflow-hidden flex flex-col justify-end aspect-[4/4.6] transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:filter group-hover:brightness-90"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Bottom Information Card Bar */}
              <div className="relative z-10 p-6 flex items-end justify-between bg-black/85 backdrop-blur-xs border-t border-white/10 group-hover:bg-[#0052fe]/90 transition-colors duration-400">
                <div>
                  <div className="text-xs font-black tracking-widest uppercase text-white mb-1">
                    {project.category}
                  </div>
                  <div className="text-xs text-slate-300 font-medium group-hover:text-white/90 transition-colors">
                    {project.subtitle}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0052fe] transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
