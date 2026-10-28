import React from 'react';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface FooterSectionProps {
  onOpenContact?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  return (
    <footer id="contact" className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-neutral-900 items-center">
          
          {/* Left CTA Card: Blue Banner */}
          {/* <div
            onClick={onOpenContact}
            className="lg:col-span-6 bg-[#0052fe] hover:bg-[#0047df] transition-colors duration-300 rounded-sm p-8 sm:p-10 flex items-center justify-between cursor-pointer group shadow-xl shadow-blue-500/10"
          >
            <div>
              <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-blue-200 mb-1">
                LET'S CREATE
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                SOMETHING GREAT <br /> TOGETHER.
              </h3>
            </div>

            {/* Circular Arrow Button 
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/40 flex items-center justify-center shrink-0 ml-4 group-hover:bg-white group-hover:text-[#0052fe] transition-all duration-300 transform group-hover:scale-105">
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          </div> */}

          {/* Right Section: Get in touch & Follow */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:pl-6">
            {/* Get in touch */}
            <div className="space-y-4">
              <div className="text-xs font-black tracking-[0.2em] uppercase text-slate-400">
                GET IN TOUCH
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
                <li>
                  <a
                    href={`tel:${portfolioConfig.phone}`}
                    className="flex items-center gap-2.5 hover:text-[#0052fe] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#0052fe]" />
                    <span>{portfolioConfig.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${portfolioConfig.email}`}
                    className="flex items-center gap-2.5 hover:text-[#0052fe] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#0052fe]" />
                    <span>{portfolioConfig.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#0052fe]" />
                  <span>{portfolioConfig.location}</span>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div className="space-y-4">
              <div className="text-xs font-black tracking-[0.2em] uppercase text-slate-400">
                FOLLOW
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                {portfolioConfig.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0052fe] transition-colors"
                    >
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-white tracking-tighter">
              <img src="/logo.png" alt="" className='w-6 invert-100' />
            </span>
            <span>© 2025 Prerana Dutta. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-neutral-800">|</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
