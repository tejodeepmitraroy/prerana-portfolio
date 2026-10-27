import React, { useState } from 'react';
import { Download, Check, Briefcase, FolderCheck, Users, Trophy } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

const statIcons = [Briefcase, FolderCheck, Users, Trophy];

export const AboutSection: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Simulating resume download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'Prerana_Dutta_Resume.pdf');
    setTimeout(() => {
      setDownloaded(false);
    }, 2500);
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Signature */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Tag */}
            <div className="text-xs font-black tracking-[0.2em] uppercase text-[#0052fe] mb-3">
              ABOUT ME
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 uppercase tracking-tight leading-snug mb-6">
              DESIGN IS NOT JUST MY PROFESSION, IT'S MY{' '}
              <span className="text-[#0052fe]">PASSION.</span>
            </h2>

            {/* Bio paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-8">
              {portfolioConfig.aboutBio}
            </p>

            {/* Handwritten Signature */}
            <div className="pt-2">
              <span className="font-script text-4xl sm:text-5xl text-slate-900 select-none block -rotate-3 hover:rotate-0 transition-transform duration-300">
                Prerana Dutta
              </span>
            </div>
          </div>

          {/* Center Column: Portrait Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[300px] aspect-[3.8/4.8] shadow-lg border border-slate-200/80 overflow-hidden">
              <img
                src={portfolioConfig.aboutImage}
                alt="Prerana Dutta"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

          {/* Right Column: Key Stats & Resume Download */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <div>
              <div className="text-xs font-black tracking-[0.2em] uppercase text-[#0052fe] mb-2">
                KEY STATS & IMPACT
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                PROVEN TRACK RECORD
              </h3>
            </div>

            {/* 2x2 Stats Grid */}
            {/* <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {portfolioConfig.stats.map((stat, idx) => {
                const Icon = statIcons[idx % statIcons.length];
                return (
                  <div
                    key={stat.label}
                    className="group relative p-4 sm:p-5 bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-[#0052fe] transition-all duration-300 rounded-none flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 group-hover:text-[#0052fe] transition-colors tracking-tight">
                        {stat.value}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#0052fe]/10 flex items-center justify-center text-slate-400 group-hover:text-[#0052fe] transition-colors shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-500 group-hover:text-slate-800 uppercase leading-snug">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div> */}

            {/* Download Resume Button */}
            {/* <div className="pt-2">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-900 hover:border-[#0052fe] hover:bg-[#0052fe] hover:text-white text-slate-900 px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-xs cursor-pointer"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>RESUME READY!</span>
                  </>
                ) : (
                  <>
                    <span>DOWNLOAD RESUME</span>
                    <Download className="w-4 h-4" />
                  </>
                )}
              </button>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};
