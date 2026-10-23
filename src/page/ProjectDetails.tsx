import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FooterSection } from '../components/FooterSection';

interface ProjectDetailsProps {
  onOpenContact?: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ onOpenContact }) => {
  const { id } = useParams<{ id: string }>();
  const currentIndex = portfolioConfig.projects.findIndex((p) => p.id === id);
  const project =
    currentIndex !== -1 ? portfolioConfig.projects[currentIndex] : portfolioConfig.projects[0];

  const prevProject =
    currentIndex > 0
      ? portfolioConfig.projects[currentIndex - 1]
      : portfolioConfig.projects[portfolioConfig.projects.length - 1];

  const nextProject =
    currentIndex < portfolioConfig.projects.length - 1
      ? portfolioConfig.projects[currentIndex + 1]
      : portfolioConfig.projects[0];

  return (
    <div className="w-full pt-20 bg-white">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0052fe] hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </div>

        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors"
        >
          Home
        </Link>
      </div>

      {/* Hero Cover */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="text-xs font-black uppercase tracking-widest text-[#0052fe] bg-white px-3 py-1 inline-block mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Project Meta Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-200 mt-8">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              CLIENT
            </div>
            <div className="text-sm font-black text-slate-900 mt-1">
              {project.client || 'Creative Studio'}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              TIMELINE
            </div>
            <div className="text-sm font-black text-slate-900 mt-1">
              {project.year || '2025'} (Delivered)
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              DISCIPLINE
            </div>
            <div className="text-sm font-black text-slate-900 mt-1">
              {project.tags.join(' • ')}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              STATUS
            </div>
            <div className="text-sm font-black text-emerald-600 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Live in Production
            </div>
          </div>
        </div>

        {/* Narrative & Overview */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Overview & Objectives
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {project.overview}
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Our approach placed high emphasis on brand cohesion, modern minimalism, and performance-first responsive architecture. Through deep stakeholder workshops and interactive prototyping, we achieved an aesthetic that feels both commanding and effortless to navigate.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">
                Key Deliverables
              </h3>
              <ul className="space-y-2 text-xs font-bold text-slate-600 uppercase">
                {(project.deliverables || [
                  'Design System Architecture',
                  'Responsive Desktop & Mobile UI',
                  'Interactive Component Kit',
                  'Brand Guideline Documentation'
                ]).map((deliv) => (
                  <li key={deliv}>• {deliv}</li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenContact}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0052fe] hover:bg-[#0042cf] text-white py-3 px-4 text-xs font-black uppercase tracking-wider transition-colors shadow-md"
              >
                <span>REQUEST SIMILAR WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Previous & Next Project Navigation */}
        <div className="pt-10 pb-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to={`/project/${prevProject.id}`}
            className="p-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group flex flex-col justify-between"
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              ← PREVIOUS PROJECT
            </div>
            <div className="text-lg font-black uppercase text-slate-950 group-hover:text-[#0052fe] transition-colors">
              {prevProject.title}
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="p-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group flex flex-col justify-between text-right"
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              NEXT PROJECT →
            </div>
            <div className="text-lg font-black uppercase text-slate-950 group-hover:text-[#0052fe] transition-colors">
              {nextProject.title}
            </div>
          </Link>
        </div>
      </div>

      <FooterSection onOpenContact={onOpenContact} />
    </div>
  );
};

export default ProjectDetails;