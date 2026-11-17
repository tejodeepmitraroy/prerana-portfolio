import React, { useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem, CategoryInfo } from '../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectCategory?: (category: CategoryInfo) => void;
  onViewAllProjects?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const navigate = useNavigate();

  // Show up to 9 projects in the grid
  const gridProjects = portfolioConfig.projects.slice(0, 9);

  const handleProjectClick = useCallback(
    (project: ProjectItem) => {
      if (onSelectProject) {
        onSelectProject(project);
      } else {
        navigate(`/projects/${project.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [onSelectProject, navigate]
  );

  return (
    <section
      id="portfolio"
      className="w-full py-16 sm:py-20 md:py-28 bg-white text-slate-900"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Projects
          </h2>
        </div>

        {/* 3-Column Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {gridProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onViewAllProjects || (() => navigate('/projects'))}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ─── Project Card Sub-Component ─── */
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  // Build the location+year display string
  const locationYear = project.location
    ? project.location
    : project.year
    ? project.year
    : '';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image Box */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        {/* Numbered Badge */}
        <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
          <span className="text-[11px] font-black text-slate-800 leading-none">
            {index + 1}
          </span>
        </div>

        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300 rounded-2xl" />
      </div>

      {/* Card Info */}
      <div className="mt-3.5 px-1">
        {/* Title row + Location */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-[#0052fe] transition-colors duration-200 flex-1 min-w-0 truncate">
            {project.title}
          </h3>
          {locationYear && (
            <span className="text-[13px] text-slate-500 font-medium whitespace-nowrap shrink-0 mt-0.5">
              {locationYear}
            </span>
          )}
        </div>

        {/* Category / discipline */}
        <p className="text-[13px] text-slate-500 font-medium mt-0.5">
          {project.category}
        </p>
      </div>
    </div>
  );
};
