import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const navigate = useNavigate();

  // Reset image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  const imagesList = project
    ? project.images && project.images.length > 0
      ? project.images
      : [project.image]
    : [];

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  }, [imagesList.length]);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  }, [imagesList.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, handlePrev, handleNext]);

  if (!project) return null;

  const currentImage = imagesList[activeImageIndex] || project.image;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col rounded-sm"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white p-2.5 rounded-full transition-all shadow-lg hover:scale-105 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Display Stage with Lightbox Controls */}
        <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-slate-950 shrink-0 flex items-center justify-center overflow-hidden select-none">
          {/* Main Active Image */}
          <img
            key={currentImage}
            src={currentImage}
            alt={`${project.title} - view ${activeImageIndex + 1}`}
            className="w-full h-full object-contain p-2 sm:p-4 transition-all duration-300"
          />

          {/* Navigation Arrows (if multiple images) */}
          {imagesList.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#0052fe] text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#0052fe] text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Top Bar Badges */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#0052fe] text-white px-2.5 py-1 shadow-sm">
              {project.category}
            </span>
            {imagesList.length > 1 && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/70 backdrop-blur-xs px-2.5 py-1 border border-white/15">
                <Images className="w-3 h-3 text-blue-400" />
                <span>
                  {activeImageIndex + 1} / {imagesList.length} Images
                </span>
              </span>
            )}
          </div>

          {/* Bottom Title Gradient on Image */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 pointer-events-none">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-sm">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium drop-shadow-sm">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Thumbnail Filmstrip (List of Images) */}
        {imagesList.length > 1 && (
          <div className="bg-slate-900 px-4 py-2.5 border-y border-slate-800 flex items-center gap-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Images className="w-3 h-3 text-[#0052fe]" /> LIST:
            </span>
            {imagesList.map((imgUrl, idx) => (
              <button
                key={imgUrl + idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative shrink-0 w-16 h-12 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#0052fe] scale-105 shadow-md shadow-blue-500/30'
                    : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-400'
                }`}
                title={`View image ${idx + 1}`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold text-white px-1">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Modal Body Info */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px] tracking-wider">
                CLIENT
              </span>
              <span className="font-extrabold text-slate-900">{project.client || 'Client Project'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px] tracking-wider">
                TIMELINE
              </span>
              <span className="font-extrabold text-slate-900">{project.year || '2024'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px] tracking-wider">
                CATEGORY
              </span>
              <span className="font-extrabold text-[#0052fe]">{project.category}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold block text-[10px] tracking-wider">
                STATUS
              </span>
              <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {project.overview}
            </p>
          </div>

          {/* Key Deliverables Pills */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                Key Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-3 py-1 border border-slate-200"
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Discipline & Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                navigate(`/project/${project.id}`);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0052fe] hover:underline cursor-pointer"
            >
              <span>View Dedicated Case Study Page</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenContact) {
                    onOpenContact();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 bg-[#0052fe] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#0042cf] transition-colors shadow-sm cursor-pointer"
              >
                <span>Discuss Similar Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
