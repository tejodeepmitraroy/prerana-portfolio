import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface HeroProps {
  onViewWork?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onOpenContact }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollToWork = () => {
    if (onViewWork) {
      onViewWork();
    } else {
      const element = document.querySelector('#portfolio');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white"
    >
      {/* Background Ambience */}
      <div className="absolute top-12 right-1/4 w-[480px] h-[480px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[660px]">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 mb-4 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-[#0052fe] animate-ping" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-slate-800 uppercase">
                {portfolioConfig.role}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-slate-950 tracking-tight leading-[0.98] uppercase mb-6">
              <span className="block transform hover:translate-x-1 transition-transform duration-200">
                {portfolioConfig.titleLine1}
              </span>
              <span className="block text-[#0052fe] drop-shadow-xs transform hover:translate-x-1 transition-transform duration-200">
                {portfolioConfig.titleHighlight}
              </span>
              <span className="block transform hover:translate-x-1 transition-transform duration-200">
                {portfolioConfig.titleLine2}
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-10">
              {portfolioConfig.bio}
            </p>

            {/* CTA & Stamp Row */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-12 relative">
              {/* View My Work Button */}
              <button
                onClick={scrollToWork}
                className="group flex items-center gap-4 text-slate-900 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0052fe] group-hover:bg-[#003ec0] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <span className="group-hover:text-[#0052fe] transition-colors border-b-2 border-transparent group-hover:border-[#0052fe] pb-0.5">
                  VIEW MY WORK
                </span>
              </button>

              {/* Rotating Circular Stamp Badge */}
              <div
                className="relative group cursor-pointer"
                onClick={onOpenContact}
                title="Click to get in touch"
              >
                <div className="w-32 h-32 md:w-36 md:h-36 relative flex items-center justify-center">
                  {/* Rotating SVG Circular Text */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-full h-full animate-spin-slow transition-transform duration-700 group-hover:scale-105"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                      />
                    </defs>
                    {/* Decorative Outer Dashed Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="74"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                    {/* Inner Solid Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="46"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                    {/* Curving Text Path */}
                    <text className="text-[8.8px] font-black uppercase tracking-[0.22em] fill-slate-900">
                      <textPath href="#circlePath" startOffset="0%">
                        • AVAILABLE FOR FREELANCE • DESIGN • WEB • BRAND
                      </textPath>
                    </text>
                  </svg>

                  {/* Stamp Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                    <span className="text-[9px] font-extrabold uppercase text-slate-900 leading-tight">
                      AVAILABLE
                    </span>
                    <span className="text-[8.5px] font-black uppercase text-[#0052fe] leading-tight mt-0.5">
                      FOR FREELANCE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0052fe] mt-1 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Layered Blue Block & Model */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
            
            {/* Top Right Label: Based in New York */}
            <div className="w-full flex justify-end mb-3 pr-2 sm:pr-4">
              <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-xs text-right">
                <MapPin className="w-3.5 h-3.5 text-[#0052fe] animate-bounce" />
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block leading-none">
                    BASED IN
                  </span>
                  <span className="text-xs font-black tracking-wider text-slate-900 block leading-tight">
                    NEW YORK
                  </span>
                </div>
              </div>
            </div>

            {/* Image Stage Container with Mouse Parallax Effect */}
            <div
              className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3.6/4.8] flex items-end justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`
              }}
            >
              {/* Electric Blue Backdrop Block (Matching Image Geometry) */}
              <div
                className="absolute top-0 right-0 w-[62%] h-[88%] bg-[#0052fe] z-0 rounded-none shadow-2xl shadow-blue-600/30 transition-transform duration-500"
                style={{
                  transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
                }}
              />

              {/* Secondary subtle line accent */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-2 border-slate-900/10 -z-10" />

              {/* Main Model Cutout / Image */}
              <div className="relative z-10 w-[90%] h-[95%] overflow-hidden">
                <img
                  src={portfolioConfig.heroImage}
                  alt="Alex Carter - Creative Digital Designer"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />

                {/* Subtle bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Script Calligraphy Accent: Design Build Create */}
              <div
                className="absolute top-20 -right-6 sm:-right-8 z-20 pointer-events-none transform rotate-[8deg] animate-float"
                style={{
                  transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 14}px) rotate(8deg)`
                }}
              >
                <div className="font-script text-3xl sm:text-4xl text-[#0052fe] drop-shadow-md select-none whitespace-nowrap leading-[1.05] font-bold">
                  Design
                  <br />
                  <span className="ml-4 text-slate-900">Build</span>
                  <br />
                  <span className="ml-8 text-[#0052fe]">Create</span>
                </div>
              </div>

              {/* Floating Interactive Badge (Left Corner) */}
              <div
                className="absolute bottom-6 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-none border border-slate-200/90 shadow-xl shadow-slate-900/10 flex items-center gap-3 animate-float-delayed"
                style={{
                  transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)`
                }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0052fe]">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Art Director
                  </div>
                  <div className="text-xs font-black text-slate-900">
                    UI/UX & Branding
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
