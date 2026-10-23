import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Simulating resume download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'Alex_Carter_Resume.pdf');
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
                Alex Carter
              </span>
            </div>
          </div>

          {/* Center Column: Portrait with Layered Blue Block */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[300px] aspect-[3.8/4.8]">
              {/* Offset Electric Blue Box */}
              <div className="absolute top-0 right-0 w-[80%] h-[92%] bg-[#0052fe] z-0 shadow-lg shadow-blue-500/20" />

              {/* Portrait Image */}
              <div className="relative z-10 w-[88%] h-[94%] overflow-hidden mt-6 ml-0">
                <img
                  src={portfolioConfig.aboutImage}
                  alt="Alex Carter"
                  className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700 contrast-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Skill Bars & Resume Download */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-7">
            {/* Skill Bars */}
            <div className="space-y-6">
              {portfolioConfig.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black tracking-wider uppercase text-slate-900">
                    <span>{skill.name}</span>
                    <span className="text-slate-500 font-bold">{skill.percentage}%</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0052fe] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Download Resume Button */}
            <div className="pt-4">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-900 hover:border-[#0052fe] hover:bg-[#0052fe] hover:text-white text-slate-900 px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-xs"
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
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
