import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface NavbarProps {
  onOpenContact?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/', isPage: true, id: 'home' },
    { name: 'PROJECTS', path: '/projects', isPage: true, id: 'portfolio' },
    // { name: 'SERVICES', path: '/#services', isPage: false, id: 'services' },
    { name: 'ABOUT', path: '/#about', isPage: false, id: 'about' },
    { name: 'CONTACT', path: '/#contact', isPage: false, id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.isPage) {
      if (location.pathname === link.path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(link.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Anchor links like /#services, /#about, /#contact
    const sectionId = link.path.replace('/#', '');
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-slate-100'
          : 'bg-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex items-center space-x-1"
        >
          <span className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-[#0052fe] transition-colors">
            <img src="/logo.png" alt="" className='w-9' />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => {
            const isProjectsActive =
              link.id === 'portfolio' &&
              (location.pathname === '/projects' ||
                location.pathname === '/portfolio' ||
                location.pathname.startsWith('/project/'));

            const isHomeActive =
              link.id === 'home' &&
              location.pathname === '/' &&
              (activeSection === 'home' || !activeSection);

            const isSectionActive =
              location.pathname === '/' && activeSection === link.id;

            const isActive = isProjectsActive || isHomeActive || isSectionActive;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-xs font-bold tracking-widest transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-slate-950 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0052fe] rounded-full animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-2 bg-[#0052fe] hover:bg-[#0042cf] text-white px-5 py-2.5 rounded-sm font-semibold text-xs tracking-wider transition-all duration-300 transform active:scale-95 shadow-md shadow-blue-500/20"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 bg-[#0052fe] text-white px-3 py-1.5 rounded-sm font-bold text-xs tracking-wider"
          >
            TALK <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-[#0052fe] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-slide-up">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-bold tracking-wider text-slate-800 hover:text-[#0052fe] transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0052fe] text-white px-5 py-3 rounded-sm font-bold text-sm tracking-wider"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
