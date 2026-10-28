import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolioData';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Images,
  Maximize2
} from 'lucide-react';
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

  // Gallery images list: fallback to project.image if project.images is empty
  const projectImages =
    project.images && project.images.length > 0 ? project.images : [project.image];

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : projectImages.length - 1) : null
    );
  }, [projectImages.length]);

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev < projectImages.length - 1 ? prev + 1 : 0) : null
    );
  }, [projectImages.length]);

  // Keyboard navigation & lock background scroll during lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handlePrevLightbox, handleNextLightbox]);

  return (
    <div className="w-full pt-20 bg-white font-sans-display selection:bg-[#0052fe] selection:text-white">
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
        <div
          onClick={() => setLightboxIndex(0)}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden shadow-2xl cursor-pointer group rounded-sm"
          title="Click to view full image in lightbox"
        >
          <img
            src={project.image}
            alt={project.title}
            className="water-refract w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Quick Expand Button on Top-Right of Hero */}
          <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-full border border-white/20 shadow-lg">
              <Maximize2 className="w-3.5 h-3.5 text-[#0052fe]" />
              <span>Fullscreen Preview</span>
            </span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#0052fe] bg-white px-3 py-1 inline-block mb-3 shadow-sm">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium max-w-2xl">
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
              {project.year || '2024'} (Delivered)
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
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052fe]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0052fe]">
                PROJECT CONTEXT & CHALLENGE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Overview & Objectives
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {project.overview}
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Our approach placed high emphasis on brand cohesion, modern minimalism, and performance-first responsive architecture. Through deep stakeholder workshops and interactive prototyping, we achieved an aesthetic that feels both commanding and effortless to navigate.
            </p>

            {project.stat && (
              <div className="pt-2">
                <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-3 rounded-sm">
                  <span className="text-2xl font-black text-[#0052fe]">
                    {project.stat.value}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    {project.stat.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-8 border border-slate-200 flex flex-col justify-between rounded-sm">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">
                Key Deliverables
              </h3>
              <ul className="space-y-2.5 text-xs font-bold text-slate-600 uppercase">
                {(project.deliverables || [
                  'Design System Architecture',
                  'Responsive Desktop & Mobile UI',
                  'Interactive Component Kit',
                  'Brand Guideline Documentation'
                ]).map((deliv) => (
                  <li key={deliv} className="flex items-start gap-2">
                    <span className="text-[#0052fe] font-black">•</span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenContact}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0052fe] hover:bg-[#0042cf] text-white py-3.5 px-4 text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                <span>REQUEST SIMILAR WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PROJECT IMAGES & VISUAL ASSETS GALLERY SECTION */}
        {/* ---------------------------------------------------- */}
        <div className="py-14 border-t border-slate-200">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0052fe] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#0052fe]">
                  PROJECT ASSETS & EXHIBIT GALLERY
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
                VISUAL <span className="text-[#0052fe]">DOCUMENTATION</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                Browse the complete collection of high-resolution mockups, design details, and deliverables. Click any image to view in fullscreen lightbox mode.
              </p>
            </div>

            {/* Assets Counter Badge */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-4 py-2 border border-slate-200 shadow-2xs">
                <Images className="w-4 h-4 text-[#0052fe]" />
                <span className="font-black text-slate-950">{projectImages.length}</span>
                <span>{projectImages.length === 1 ? 'High-Res Asset' : 'High-Res Assets'}</span>
              </span>
            </div>
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projectImages.map((imgSrc, index) => (
              <div
                key={imgSrc + index}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-slate-900 rounded-sm overflow-hidden border border-slate-200 hover:border-[#0052fe] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-end"
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={imgSrc}
                    alt={`${project.title} exhibit ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300 opacity-70 group-hover:opacity-85" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2.5 py-1 border border-white/20 shadow-xs">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/90 bg-[#0052fe] px-2 py-0.5 shadow-xs">
                      {project.category}
                    </span>
                  </div>

                  {/* Center Hover Action Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-2 bg-white text-slate-950 text-xs font-black uppercase tracking-wider px-4 py-2.5 shadow-xl shadow-black/40 transform scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-4 h-4 text-[#0052fe]" />
                      <span>View High-Res</span>
                    </span>
                  </div>

                  {/* Bottom Image Caption Bar */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="text-xs font-bold text-white uppercase tracking-wider truncate">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
                      Visual Asset {index + 1} of {projectImages.length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous & Next Project Navigation */}
        <div className="pt-10 pb-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to={`/project/${prevProject.id}`}
            className="p-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group flex flex-col justify-between rounded-sm"
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
            className="p-6 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group flex flex-col justify-between text-right rounded-sm"
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

      {/* Global Footer */}
      <FooterSection onOpenContact={onOpenContact} />

      {/* ---------------------------------------------------- */}
      {/* FULLSCREEN LIGHTBOX MODAL */}
      {/* ---------------------------------------------------- */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Header Bar */}
          <div
            className="flex items-center justify-between text-white w-full max-w-7xl mx-auto py-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0052fe] bg-white px-2.5 py-1">
                {project.category}
              </span>
              <span className="text-sm font-black uppercase tracking-wide text-white truncate max-w-[200px] sm:max-w-md">
                {project.title}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                ({lightboxIndex + 1} / {projectImages.length})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-white hover:text-black rounded-full transition-colors text-white cursor-pointer shadow-md"
                title="Close Lightbox (Esc)"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Stage */}
          <div
            className="relative flex-grow flex items-center justify-center w-full max-w-7xl mx-auto my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Image Arrow */}
            {projectImages.length > 1 && (
              <button
                onClick={handlePrevLightbox}
                className="absolute left-2 sm:left-6 z-20 p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#0052fe] text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl border border-white/10 cursor-pointer"
                title="Previous Image (←)"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Active Image Display */}
            <div className="relative max-h-[75vh] max-w-full flex items-center justify-center">
              <img
                key={lightboxIndex}
                src={projectImages[lightboxIndex]}
                alt={`${project.title} view ${lightboxIndex + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded-xs shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Image Arrow */}
            {projectImages.length > 1 && (
              <button
                onClick={handleNextLightbox}
                className="absolute right-2 sm:right-6 z-20 p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#0052fe] text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl border border-white/10 cursor-pointer"
                title="Next Image (→)"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Filmstrip */}
          {projectImages.length > 1 && (
            <div
              className="w-full max-w-7xl mx-auto py-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 scrollbar-thin scrollbar-thumb-slate-700">
                {projectImages.map((thumbSrc, tIdx) => (
                  <button
                    key={thumbSrc + tIdx}
                    onClick={() => setLightboxIndex(tIdx)}
                    className={`relative w-16 h-12 rounded-xs overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      lightboxIndex === tIdx
                        ? 'border-[#0052fe] scale-110 shadow-lg shadow-blue-500/50 opacity-100 ring-2 ring-blue-400/40'
                        : 'border-white/20 opacity-40 hover:opacity-100 hover:border-white/60'
                    }`}
                    title={`Go to image ${tIdx + 1}`}
                  >
                    <img
                      src={thumbSrc}
                      alt={`Thumbnail ${tIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold text-white px-1">
                      {tIdx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
