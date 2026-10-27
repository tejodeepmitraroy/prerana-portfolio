import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './page/home';
import Projects from './page/Projects';
import About from './page/About';
import ProjectDetails from './page/ProjectDetails';
import { ContactModal } from './components/ContactModal';

function AppContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Scroll to top on route change (unless navigating to an anchor)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Scroll spy for sections when on home page
  useEffect(() => {
    if (location.pathname !== '/') {
      if (location.pathname.includes('project') || location.pathname.includes('portfolio')) {
        setActiveSection('portfolio');
      } else if (location.pathname.includes('about')) {
        setActiveSection('about');
      }
      return;
    }

    const sections = ['home', 'portfolio', 'about', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans-display selection:bg-[#0052fe] selection:text-white">
      {/* Global SVG Water Wave Refraction Filter */}
      <svg className="fixed w-0 h-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="water-ripple-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.035"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="4.5s"
                keyTimes="0;0.5;1"
                values="0.012 0.03; 0.022 0.05; 0.012 0.03"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top Navigation */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenContact={() => setIsContactOpen(true)}
                isContactOpen={isContactOpen}
                setIsContactOpen={setIsContactOpen}
              />
            }
          />
          <Route
            path="/portfolio"
            element={<Projects onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/projects"
            element={<Projects onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/about"
            element={<About onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/projects/:id"
            element={<ProjectDetails onOpenContact={() => setIsContactOpen(true)} />}
          />
          <Route
            path="/project/:id"
            element={<ProjectDetails onOpenContact={() => setIsContactOpen(true)} />}
          />
        </Routes>
      </main>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
