import React from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-900 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="water-refract w-full h-full object-cover transition-transform duration-700 hover:scale-103 cursor-pointer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 block mb-1">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {project.subtitle}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Client</span>
              <span className="font-extrabold text-slate-800">{project.client || 'Confidential'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Year</span>
              <span className="font-extrabold text-slate-800">{project.year || '2025'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Role</span>
              <span className="font-extrabold text-slate-800">Lead Designer</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px]">Delivery</span>
              <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {project.overview ||
                'This project represents a holistic fusion of art direction, user experience research, and digital branding execution designed to scale high-growth modern businesses.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Deliverables & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#0052fe] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#0042cf] transition-colors"
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
