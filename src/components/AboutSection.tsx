import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  Check,
  Mail,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [resumeRequested, setResumeRequested] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResumeRequest = () => {
    setResumeRequested(true);
    // If contact modal handler exists, trigger it; else open mail client
    setTimeout(() => {
      if (onOpenContact) {
        onOpenContact();
      } else {
        window.location.href = `mailto:${portfolioConfig.email}?subject=Resume%20Request%20-%20Prerana%20Dutta`;
      }
      setResumeRequested(false);
    }, 900);
  };

  const coreDisciplines = [
    'Industrial Design',
    '3D CAD & Prototyping',
    'Packaging Engineering',
    'Ergonomic Studies',
    'CMF Specification',
    'Brand Identity Systems',
    'Commercial 3D Mockups',
    'Production Die-Cuts',
    'Retail Merchandising',
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Subtle Background Blueprint Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0052fe 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* --- SECTION HEADER & EDITORIAL STATEMENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">  
          {/* Left Column: Big Typographic Statement */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0052fe] animate-pulse" />
              <span className="text-xs font-black tracking-[0.25em] uppercase text-[#0052fe]">
                02 // ABOUT & PHILOSOPHY
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.05] mb-6">
              DESIGN IS NOT JUST MY PROFESSION, IT'S MY{' '}
              <span className="text-[#0052fe] underline decoration-4 decoration-[#0052fe]/30 underline-offset-8">
                PASSION.
              </span>
            </h2>

            {/* Design Philosophy Highlight Box */}
            <div className="relative pl-5 border-l-2 border-[#0052fe] bg-slate-50/70 p-5 sm:p-6 mb-2">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed italic">
                "{portfolioConfig.bio}"
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#0052fe]" />
                <span>Human-Centric Industrial Philosophy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Context */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-8 space-y-6">
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {portfolioConfig.aboutBio}
            </p>

            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Based in <span className="text-slate-900 font-semibold">{portfolioConfig.location}</span>, I collaborate with forward-thinking brands, retail creators, and startups to convert complex functional challenges into intuitive products with memorable shelf impact.
            </p>

            {/* Quick Specs List */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px] mb-1">
                  CORE FOCUS
                </span>
                <span className="text-slate-900 font-bold">Industrial & Packaging</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px] mb-1">
                  AVAILABILITY
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                  Open to Projects
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* --- STATS & IMPACT COUNTERS --- */}
         {/*<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {portfolioConfig.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="p-6 sm:p-8 bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#0052fe] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 group-hover:text-[#0052fe] transition-colors tracking-tight">
                  {stat.value}
                </span>
                <Award className="w-5 h-5 text-slate-400 group-hover:text-[#0052fe] transition-colors" />
              </div>
              <div>
                <div className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 group-hover:text-slate-900 uppercase">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Metric // 0{idx + 1}
                </div>
              </div>
            </div>
          ))} 

          {/* 4th Stat Metric: Tailored Craftsmanship */}
          {/* <div className="p-6 sm:p-8 bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-[#0052fe] transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 group-hover:text-[#0052fe] transition-colors tracking-tight">
                100%
              </span>
              <Cpu className="w-5 h-5 text-slate-400 group-hover:text-[#0052fe] transition-colors" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 group-hover:text-slate-900 uppercase">
                TAILORED PROCESS
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Metric // 04
              </div>
            </div>
          </div> 
        </div>*/}

        {/* --- DISCIPLINE TAGS --- */}
        <div className="mb-20 py-8 px-6 sm:px-10 bg-slate-950 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="shrink-0">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-[#0052fe] block mb-1">
              TECHNICAL CAPABILITIES
            </span>
            <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              DISCIPLINES & TOOLING
            </h4>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {coreDisciplines.map((discipline) => (
              <span
                key={discipline}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-slate-200 font-medium tracking-wide transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-[#0052fe]" />
                {discipline}
              </span>
            ))}
          </div>
        </div>

        {/* --- SIGNATURE & COLLABORATION FOOTER BAR --- */}
        <div className="p-8 sm:p-12 border-2 border-slate-950 bg-white flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Handwritten Signature & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div>
              <span className="font-script text-5xl sm:text-6xl text-slate-950 select-none block -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-default">
                {portfolioConfig.name}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mt-1">
                {portfolioConfig.role} &bull; {portfolioConfig.location}
              </span>
            </div>
          </div>

          {/* Right: Actions (Collaborate & Resume Request) */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = `mailto:${portfolioConfig.email}`;
                  }
                }
              }}
              className="inline-flex items-center justify-center gap-3 bg-[#0052fe] hover:bg-[#003ec0] text-white px-7 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer group"
            >
              <span>LET'S COLLABORATE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Resume Request Action Button */}
            <button
              onClick={handleResumeRequest}
              disabled={resumeRequested}
              className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-950 text-slate-900 bg-white hover:bg-slate-50 px-6 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              {resumeRequested ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>PREPARING...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#0052fe]" />
                  <span>REQUEST RESUME</span>
                </>
              )}
            </button>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              title="Copy Email Address"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-[#0052fe] text-slate-600 hover:text-[#0052fe] bg-white px-4 py-3.5 text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>{portfolioConfig.email}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};