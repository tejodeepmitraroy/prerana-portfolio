import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem, CategoryInfo } from '../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectCategory?: (category: CategoryInfo) => void;
  onViewAllProjects?: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectCategory,
  onViewAllProjects,
}) => {
  const navigate = useNavigate();
  const categories = portfolioConfig.categories;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking state (-1 to 1 normalized coordinates)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Smooth lerp physics loop for buttery-smooth 60+ FPS mouse tracking
  useEffect(() => {
    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;
      const ease = 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      setMousePos({
        x: Number(currentPos.current.x.toFixed(4)),
        y: Number(currentPos.current.y.toFixed(4)),
      });

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Track mouse coordinates across the section
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    targetPos.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetPos.current = { x: 0, y: 0 };
  }, []);

  // Carousel navigation
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  }, [categories.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  }, [categories.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentCategory = categories[activeIndex];

  const handleCategoryClick = useCallback(
    (category: CategoryInfo) => {
      if (onSelectCategory) {
        onSelectCategory(category);
      } else {
        navigate('/projects', { state: { category: category.name.trim() } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [onSelectCategory, navigate]
  );

  // Helper to compute card offset relative to activeIndex
  const getCardOffset = (index: number) => {
    const total = categories.length;
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;
    return diff;
  };

  // 3D tilt calculations for the active center item
  const activeRotateY = mousePos.x * 16; // up to 16 deg tilt
  const activeRotateX = -mousePos.y * 12; // up to 12 deg tilt
  const activeTranslateX = mousePos.x * 18;
  const activeTranslateY = mousePos.y * 10;

  // Ground grid subtle perspective shift
  const gridShiftX = -mousePos.x * 15;
  const gridShiftY = -mousePos.y * 8;

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-16 sm:py-20 md:py-28 bg-[#f6f5f1] text-slate-900 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Studio Radial Ambient Light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(246, 245, 241, 0.4) 60%, rgba(238, 236, 229, 0.95) 100%)',
        }}
      />

      {/* Top Header Row */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 mb-6 sm:mb-10 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#0052fe] block mb-1">
            Featured Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 uppercase">
            SELECTED <span className="text-[#0052fe]">WORK</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold tracking-widest text-slate-400">
            {String(activeIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
          </span>
          <button
            onClick={onViewAllProjects || (() => navigate('/projects'))}
            className="group inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-slate-900 hover:text-[#0052fe] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Perspective Drafting Ground Grid (Studio floor) */}
      <div
        className="absolute bottom-28 sm:bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] h-[240px] pointer-events-none z-10 transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(800px) rotateX(72deg) translate3d(${gridShiftX}px, ${gridShiftY}px, 0)`,
          transformOrigin: 'bottom center',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.85) 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.85) 25%, transparent 75%)',
        }}
      />

      {/* 3D Carousel Stage */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 my-4 sm:my-8">
        <div
          className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] flex items-center justify-center"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Navigation Arrow Left */}
          <button
            onClick={handlePrev}
            aria-label="Previous Category"
            className="absolute left-2 sm:left-[6%] md:left-[10%] lg:left-[13%] top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 border border-black/10 shadow-[0_6px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-slate-900 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            onClick={handleNext}
            aria-label="Next Category"
            className="absolute right-2 sm:right-[6%] md:right-[10%] lg:right-[13%] top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 border border-black/10 shadow-[0_6px_25px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-slate-900 hover:text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Carousel Cards (Visual Category Showcase) */}
          {categories.map((category, index) => {
            const offset = getCardOffset(index);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            const categoryImage = category.images?.[0] || '';
            const categoryTitle = category.name.trim();

            // 3D transform calculations with generous spacing and depth
            let transformStyle = '';
            let zIndex = 10;
            let opacity = 0.4;

            if (isCenter) {
              zIndex = 30;
              opacity = 1;
              transformStyle = `
                perspective(1400px)
                rotateX(${activeRotateX}deg)
                rotateY(${activeRotateY}deg)
                translate3d(${activeTranslateX}px, ${activeTranslateY}px, 60px)
                scale(1)
              `;
            } else if (isLeft) {
              zIndex = 20;
              opacity = 0.42;
              transformStyle = `
                perspective(1400px)
                translateX(-86%)
                translateY(18px)
                translateZ(-180px)
                rotateY(30deg)
                scale(0.78)
              `;
            } else if (isRight) {
              zIndex = 20;
              opacity = 0.42;
              transformStyle = `
                perspective(1400px)
                translateX(86%)
                translateY(18px)
                translateZ(-180px)
                rotateY(-30deg)
                scale(0.78)
              `;
            }

            return (
              <div
                key={category.id}
                onClick={() => {
                  if (isCenter) {
                    handleCategoryClick(category);
                  } else if (isLeft) {
                    handlePrev();
                  } else if (isRight) {
                    handleNext();
                  }
                }}
                className={`absolute w-[300px] sm:w-[440px] md:w-[560px] lg:w-[650px] aspect-[16/10] rounded-3xl transition-all duration-500 select-none ${
                  isCenter ? 'cursor-pointer' : 'cursor-pointer hover:opacity-70'
                }`}
                style={{
                  transform: transformStyle,
                  transformStyle: 'preserve-3d',
                  zIndex,
                  opacity,
                  willChange: 'transform, opacity',
                  transition: isCenter
                    ? 'opacity 0.4s ease, box-shadow 0.3s ease'
                    : 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                {/* Dynamic Contact Floor Shadow under Center Card */}
                {isCenter && (
                  <div
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-12 rounded-full pointer-events-none transition-all duration-200"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 75%)',
                      filter: 'blur(12px)',
                      transform: `translate3d(${-mousePos.x * 22}px, ${mousePos.y * 8}px, -30px) scale(${
                        1 + mousePos.y * 0.12
                      })`,
                    }}
                  />
                )}

                {/* Card Container: Clean Frameless Artwork */}
                <div
                  className={`group relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border transition-all duration-500 ${
                    isCenter
                      ? 'border-black/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.32)] ring-1 ring-black/5'
                      : 'border-black/5 shadow-xl'
                  }`}
                  style={
                    isCenter
                      ? {
                          boxShadow: `
                            ${-mousePos.x * 32}px ${32 + mousePos.y * 18}px 64px -15px rgba(0, 0, 0, 0.28),
                            0 16px 32px -10px rgba(0, 0, 0, 0.12)
                          `,
                        }
                      : {}
                  }
                >
                  {/* Full-Bleed Artwork Image */}
                  <img
                    src={categoryImage}
                    alt={categoryTitle}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Interactive Specular Glare (Center Card only) */}
                  {isCenter && (
                    <div
                      className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 500px at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`,
                        mixBlendMode: 'overlay',
                      }}
                    />
                  )}

                  {/* Subtle Inner Glass Rim */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-white/20 z-10" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                    <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                      {category.count} Projects
                    </span>
                  </div>

                  {/* Minimal Floating Indicator on Hover */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg backdrop-blur-xs">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Category Info & Dual Action Buttons Below */}
      <div className="relative z-20 max-w-xl mx-auto px-6 text-center mt-6 sm:mt-10">
        {/* Category Pill Tag */}
        <div className="inline-block mb-2">
          <span className="text-[11px] font-black tracking-widest uppercase text-[#0052fe] px-3.5 py-1 rounded-full bg-blue-50/80 border border-blue-200/50">
            Discipline • {currentCategory?.count || 4} Works
          </span>
        </div>

        {/* Category Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-2 uppercase">
          {currentCategory?.name.trim()}
        </h3>

        {/* Subtitle / Tagline */}
        <p className="text-sm sm:text-base font-medium text-slate-500 tracking-tight mb-7 max-w-lg mx-auto">
          {currentCategory?.tagline || currentCategory?.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {/* Primary Blue Button */}
          <button
            onClick={() => handleCategoryClick(currentCategory)}
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-[#0052fe] hover:bg-[#0043d9] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
          >
            <span>Explore Discipline</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Secondary Outlined Button */}
          <button
            onClick={onViewAllProjects || (() => navigate('/projects'))}
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-900 border border-slate-300 hover:border-slate-900 text-slate-900 hover:text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>View All Projects</span>
          </button>
        </div>

        {/* Carousel Progress Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-8 bg-[#0052fe]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};



