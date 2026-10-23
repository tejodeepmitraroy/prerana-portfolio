import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Design',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-none shadow-2xl border border-slate-200 p-8 sm:p-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Message Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-xs">
              Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-[#0052fe] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S COLLABORATE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-6">
              Start A <span className="text-[#0052fe]">Project</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052fe] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052fe] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052fe] transition-colors"
                >
                  <option value="Web Design">Web Design</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Project Brief
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me a bit about your timeline, scope and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052fe] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0052fe] hover:bg-[#0042cf] text-white py-3.5 text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-500/20"
              >
                <span>SEND INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Direct: {portfolioConfig.email}</span>
              <span>NY, USA</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
