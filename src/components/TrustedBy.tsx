import React from 'react';
import { Cpu, Sun, Layers, Compass, Zap, Triangle } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const TrustedBy: React.FC = () => {
  const getClientIcon = (iconType: string) => {
    switch (iconType) {
      case 'tech':
        return <Cpu className="w-4 h-4 text-slate-800" />;
      case 'mind':
        return <Sun className="w-4 h-4 text-slate-800" />;
      case 'pixel':
        return <Layers className="w-4 h-4 text-slate-800" />;
      case 'nexora':
        return <Compass className="w-4 h-4 text-slate-800" />;
      case 'volt':
        return <Zap className="w-4 h-4 text-slate-800" />;
      case 'lumen':
        return <Triangle className="w-4 h-4 text-slate-800" />;
      default:
        return <Layers className="w-4 h-4 text-slate-800" />;
    }
  };

  return (
    <section className="py-12 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Label */}
          <div className="shrink-0 text-xs font-black tracking-[0.25em] uppercase text-[#0052fe]">
            TRUSTED BY
          </div>

          {/* Logos Row */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
            {portfolioConfig.clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-2 text-slate-800 hover:text-[#0052fe] transition-colors duration-300 opacity-80 hover:opacity-100 cursor-default"
              >
                {getClientIcon(client.iconType)}
                <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
