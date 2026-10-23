import React from 'react';
import { ArrowUpRight, Monitor, PenTool, Star, Code2 } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const ServicesSection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'monitor':
        return <Monitor className="w-5 h-5 text-[#0052fe]" />;
      case 'pen':
        return <PenTool className="w-5 h-5 text-[#0052fe]" />;
      case 'star':
        return <Star className="w-5 h-5 text-[#0052fe]" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-[#0052fe]" />;
      default:
        return <Monitor className="w-5 h-5 text-[#0052fe]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Solid Blue Banner Box */}
          <div className="lg:col-span-4 bg-[#0052fe] p-8 sm:p-12 flex flex-col justify-between min-h-[340px] lg:min-h-[460px] shadow-xl shadow-blue-500/15 group relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            {/* Top Arrow Icon */}
            <div>
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0052fe] transition-all duration-300">
                <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Huge Headline */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                SERVICES
              </h2>
              <div className="w-12 h-1 bg-white/40 mt-4 group-hover:w-20 transition-all duration-300" />
            </div>
          </div>

          {/* Right 2x2 Services Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 shadow-sm overflow-hidden">
            {portfolioConfig.services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 sm:p-10 flex items-start gap-5 hover:bg-slate-50/80 transition-colors group"
              >
                {/* Circular Blue Icon */}
                <div className="w-12 h-12 rounded-full border border-[#0052fe]/40 bg-blue-50/60 flex items-center justify-center shrink-0 group-hover:bg-[#0052fe] group-hover:border-[#0052fe] group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  <div className="group-hover:brightness-200 group-hover:contrast-200">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-black tracking-widest text-slate-900 uppercase mb-2 group-hover:text-[#0052fe] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
