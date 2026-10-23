import React, { useEffect, useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';

export const StatsCounter: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const targets = portfolioConfig.stats.map(s => s.numeric);
    const duration = 1400; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const ease = 1 - (1 - progress) * (1 - progress);

      setCounts(targets.map(target => Math.round(target * ease)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#0a0a0a] border-y border-neutral-900 py-12 md:py-16 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-800/80">
          {portfolioConfig.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-0 ${
                idx !== 0 ? 'md:pl-10 lg:pl-14' : ''
              } ${idx !== portfolioConfig.stats.length - 1 ? 'md:pr-10 lg:pr-14' : ''}`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0052fe] tracking-tight mb-2">
                {counts[idx]}
                <span>{stat.suffix || '+'}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
