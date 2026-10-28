import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  Filter,
  Eye,
  CheckCircle2,
  FolderOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem, CategoryInfo } from '../data/portfolioData';
import { ProjectModal } from '../components/ProjectModal';
import { TrustedBy } from '../components/TrustedBy';
import { FooterSection } from '../components/FooterSection';

interface ProjectsPageProps {
  onOpenContact?: () => void;
}

type SortOption = 'featured' | 'latest' | 'alphabetical';

interface CarouselCategoryItem {
  id: string;
  name: string;
  count: number;
  tagline: string;
  description: string;
  image: string;
}

const Projects: React.FC<ProjectsPageProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Initial category from route state or default to ALL
  const initialCategory = (location.state as { category?: string })?.category || 'ALL';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Sync category if navigated with new state
  useEffect(() => {
    const navCategory = (location.state as { category?: string })?.category;
    if (navCategory) {
      setSelectedCategory(navCategory);
    }
  }, [location.state]);

  // Build complete carousel categories including 'ALL DISCIPLINES'
  const carouselItems: CarouselCategoryItem[] = useMemo(() => {
    const allItem: CarouselCategoryItem = {
      id: 'ALL',
      name: 'ALL DISCIPLINES',
      count: portfolioConfig.projects.length,
      tagline: 'Complete Creative Catalog',
      description: 'Explore the full spectrum of industrial design, visual identities, packaging systems, and creative direction.',
      image: portfolioConfig.categories[0]?.images?.[0] || '/category/logo.png'
    };

    const categoryCards: CarouselCategoryItem[] = portfolioConfig.categories.map((c: CategoryInfo) => {
      const catProjects = portfolioConfig.projects.filter(
        (p) => p.category.toLowerCase() === c.name.toLowerCase()
      );
      return {
        id: c.id,
        name: c.name,
        count: catProjects.length > 0 ? catProjects.length : c.count,
        tagline: c.tagline,
        description: c.description,
        image: c.images?.[0] || '/category/logo.png'
      };
    });

    return [allItem, ...categoryCards];
  }, []);

  // Carousel Active Slide State
  const [carouselIndex, setCarouselIndex] = useState<number>(() => {
    if (initialCategory === 'ALL') return 0;
    const foundIdx = carouselItems.findIndex(
      (item) => item.name.toLowerCase() === initialCategory.toLowerCase()
    );
    return foundIdx !== -1 ? foundIdx : 0;
  });

  // Keep carousel index in sync when selectedCategory changes externally
  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setCarouselIndex(0);
    } else {
      const idx = carouselItems.findIndex(
        (item) => item.name.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (idx !== -1) setCarouselIndex(idx);
    }
  }, [selectedCategory, carouselItems]);

  const handlePrevSlide = useCallback(() => {
    setCarouselIndex((prev) => {
      const nextIdx = prev === 0 ? carouselItems.length - 1 : prev - 1;
      const targetCategory = carouselItems[nextIdx].id === 'ALL' ? 'ALL' : carouselItems[nextIdx].name;
      setSelectedCategory(targetCategory);
      return nextIdx;
    });
  }, [carouselItems]);

  const handleNextSlide = useCallback(() => {
    setCarouselIndex((prev) => {
      const nextIdx = prev === carouselItems.length - 1 ? 0 : prev + 1;
      const targetCategory = carouselItems[nextIdx].id === 'ALL' ? 'ALL' : carouselItems[nextIdx].name;
      setSelectedCategory(targetCategory);
      return nextIdx;
    });
  }, [carouselItems]);

  const handleSelectCarouselCard = (item: CarouselCategoryItem, index: number) => {
    setCarouselIndex(index);
    const targetCategory = item.id === 'ALL' ? 'ALL' : item.name;
    setSelectedCategory(targetCategory);
  };

  // Filter and sort projects for the grid
  const filteredProjects = useMemo(() => {
    return portfolioConfig.projects
      .filter((project) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'ALL' ||
          project.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

        // Search query filter
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.subtitle.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          (project.client && project.client.toLowerCase().includes(query)) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.year || '2024').localeCompare(a.year || '2024');
        }
        if (sortBy === 'latest') {
          return (b.year || '2024').localeCompare(a.year || '2024');
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  // Navigate to specific project subpage
  const handleOpenProjectSubPage = (projectId: string) => {
    navigate(`/project/${projectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full pt-20 bg-white min-h-screen text-slate-900 font-sans-display selection:bg-[#0052fe] selection:text-white">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-10 pb-12 md:pt-14 md:pb-16 border-b border-slate-100 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Eyebrow Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052fe] animate-ping" />
              <span className="text-xs font-black tracking-[0.22em] text-[#0052fe] uppercase">
                PORTFOLIO & ARCHIVES • 2024 — 2026
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>{portfolioConfig.name}</span>
              <span>•</span>
              <span className="text-slate-900 font-extrabold">
                {portfolioConfig.projects.length} PROJECTS CATALOGED
              </span>
            </div>
          </div>

          {/* Main Title & Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 uppercase tracking-tight leading-[0.96] mb-5">
                INDEX OF <span className="text-[#0052fe]">ALL PROJECTS</span> & DISCIPLINES
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Explore a comprehensive collection of visual identities, tactile packaging systems,
                modern product mockups, and commercial photography. Browse categories in the interactive carousel
                above, and open any project image to view its full case study sub-page.
              </p>
            </div> */}

            {/* Quick Meta Stats Box */}
            {/* <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 p-5 flex items-center justify-between group hover:border-[#0052fe] transition-colors shadow-xs">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">DISCIPLINES</div>
                  <div className="text-2xl font-black text-slate-950 mt-0.5">
                    {portfolioConfig.categories.length} Core Fields
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Branding • Packaging • Product • Photography
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-950 text-white p-5 flex items-center justify-between group shadow-sm">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-blue-400">COMMISSIONS</div>
                  <div className="text-2xl font-black text-white mt-0.5">100% Bespoke</div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">Global & Local Clients</div>
                </div>
                <button
                  onClick={onOpenContact}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0052fe] transition-all transform hover:rotate-45"
                  title="Discuss a new project"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>  */}
          </div>
        </div>
      </section>

      {/* 2. TOP CATEGORY CAROUSEL SECTION */}
      <section className="relative py-12 md:py-16 bg-[#f7f8fa] border-b border-slate-200 overflow-hidden">
        {/* Subtle decorative radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle 800px at 50% 20%, rgba(0, 82, 254, 0.06), transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Carousel Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#0052fe]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0052fe]">
                  DISCIPLINE ARCHIVE & NAVIGATION
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-950">
                BROWSE BY <span className="text-[#0052fe]">CATEGORY</span>
              </h2>
            </div>

            {/* Carousel Navigation Buttons & Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mr-2">
                {String(carouselIndex + 1).padStart(2, '0')} / {String(carouselItems.length).padStart(2, '0')}
              </span>
              <button
                onClick={handlePrevSlide}
                aria-label="Previous Category"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0052fe] text-slate-800 hover:text-white hover:bg-[#0052fe] flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                aria-label="Next Category"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#0052fe] text-slate-800 hover:text-white hover:bg-[#0052fe] flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Horizontal Category Carousel Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {carouselItems.map((item, idx) => {
              const isActive =
                selectedCategory === 'ALL'
                  ? item.id === 'ALL'
                  : item.name.toLowerCase() === selectedCategory.toLowerCase();

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectCarouselCard(item, idx)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xl shadow-blue-500/20 ring-2 ring-[#0052fe] -translate-y-1'
                      : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                  style={{ minHeight: '260px' }}
                >
                  {/* Card Background Visual */}
                  <div className="relative w-full h-36 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`water-refract w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                        isActive ? 'opacity-90 brightness-105' : 'opacity-70 group-hover:opacity-85'
                      }`}
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? 'bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent'
                          : 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
                      }`}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-[#0052fe] text-white shadow-xs'
                            : 'bg-black/60 backdrop-blur-xs text-white border border-white/20'
                        }`}
                      >
                        {item.count} {item.count === 1 ? 'Project' : 'Projects'}
                      </span>

                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-black uppercase tracking-tight line-clamp-1 mb-1 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-900 group-hover:text-[#0052fe]'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-[11px] leading-relaxed line-clamp-2 ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {item.tagline}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100/10 flex items-center justify-between text-[11px] font-black tracking-wider uppercase">
                      <span className={isActive ? 'text-blue-400' : 'text-[#0052fe]'}>
                        {isActive ? 'Filtered Below' : 'Select Category'}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isActive
                            ? 'translate-x-1 text-blue-400'
                            : 'text-slate-400 group-hover:translate-x-1 group-hover:text-[#0052fe]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Category Banner Details with Filter Quick Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052fe]" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Current Filter:{' '}
                <strong className="text-slate-950 font-black text-sm">
                  {selectedCategory === 'ALL' ? 'ALL DISCIPLINES' : selectedCategory}
                </strong>{' '}
                <span className="text-slate-400 font-medium ml-1">
                  ({filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'} showing)
                </span>
              </div>
            </div>

            {/* Quick Category Pill Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {carouselItems.map((cat) => {
                const isSelected =
                  selectedCategory === 'ALL'
                    ? cat.id === 'ALL'
                    : cat.name.toLowerCase() === selectedCategory.toLowerCase();

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id === 'ALL' ? 'ALL' : cat.name);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0052fe] text-white shadow-sm font-black'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY FILTER & SEARCH CONTROLS BAR */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Left Result Count Text */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0052fe]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Displaying{' '}
                <strong className="text-slate-950 font-black">{filteredProjects.length}</strong> of{' '}
                <strong className="text-slate-950 font-black">{portfolioConfig.projects.length}</strong>{' '}
                Projects
              </span>
            </div>

            {/* Right Controls: Search, Sort Dropdown */}
            <div className="flex items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, client, tag..."
                  className="w-full bg-slate-50 border border-slate-200 pl-9 pr-8 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0052fe] transition-colors rounded-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-slate-50 border border-slate-200 pl-3 pr-8 py-2 text-xs font-bold text-slate-800 uppercase tracking-wider focus:outline-none focus:border-[#0052fe] cursor-pointer rounded-sm"
                >
                  <option value="featured">Featured First</option>
                  <option value="latest">Latest First</option>
                  <option value="alphabetical">Title (A-Z)</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Clear filters shortcut */}
              {(searchQuery || selectedCategory !== 'ALL') && (
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSearchQuery('');
                  }}
                  className="text-xs font-black uppercase tracking-wider text-[#0052fe] hover:underline whitespace-nowrap pl-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN PROJECTS GRID SECTION */}
      <main
        ref={gridSectionRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16"
      >
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#0052fe] mb-1">
              {selectedCategory === 'ALL' ? 'CURATED DIRECTORY' : `${selectedCategory} ARCHIVE`}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
              {selectedCategory === 'ALL' ? 'ALL PROJECT CASE STUDIES' : selectedCategory}
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Click any image to open full project sub-page</span>
          </div>
        </div>

        {/* Empty State if No Projects Match Search */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-slate-300 my-8 bg-slate-50 rounded-xl">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-2">
              No Projects Matched Your Filter
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any projects matching &quot;{searchQuery}&quot; under the selected category.
              Try adjusting your keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 bg-[#0052fe] text-white px-6 py-3 text-xs font-black uppercase tracking-wider hover:bg-[#0042cf] transition-colors shadow-md rounded-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* PROJECT GRID FORMAT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectGridCard
                key={project.id}
                project={project}
                onOpenSubPage={() => handleOpenProjectSubPage(project.id)}
                onQuickPreview={() => setActiveModalProject(project)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. COLLABORATION & METHODOLOGY CARDS */}
      {/* <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blue Commission Card *
          <div className="bg-[#0052fe] p-8 sm:p-10 text-white flex flex-col justify-between min-h-[260px] shadow-xl shadow-blue-500/10 group rounded-xl">
            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-200">
                START A COMMISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2 text-white">
                Have a new project or custom requirement?
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-3 max-w-md">
                Available for select freelance engagements, identity transformations, packaging architecture, and complete product mockups.
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-white hover:underline text-left mt-6 cursor-pointer"
            >
              <span>LET&apos;S DISCUSS YOUR VISION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Dark Methodology Card 
          <div className="bg-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between min-h-[260px] shadow-xl group border border-slate-900 rounded-xl">
            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400">
                METHODOLOGY & QUALITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2 text-white">
                Engineered with Design Systems & High Standards
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-md">
                Every project is crafted using modular components, scalable architecture, and strict attention to typographic hierarchy.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-300 mt-6">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Production Grade
              </span>
              <span>•</span>
              <span>Responsive On All Screens</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Trusted Client Logos */}
      {/* <TrustedBy /> */}

      {/* Global Footer */}
      <FooterSection onOpenContact={onOpenContact} />

      {/* Quick Preview Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

// Sub-component: Project Grid Card with Image click redirecting directly to sub-page
interface ProjectGridCardProps {
  project: ProjectItem;
  onOpenSubPage: () => void;
  onQuickPreview: () => void;
}

const ProjectGridCard: React.FC<ProjectGridCardProps> = ({
  project,
  onOpenSubPage,
  onQuickPreview
}) => {
  return (
    <div
      onClick={onOpenSubPage}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden flex flex-col justify-end aspect-[4/4.8] transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer border border-slate-800"
    >
      {/* 
        Background Project Image:
        When the user clicks/opens the image, redirect directly to the project subpage!
      */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden cursor-pointer"
        onClick={onOpenSubPage}
        title={`Open ${project.title} case study sub-page`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="water-refract w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
          loading="lazy"
        />

        {/* Hover Clickable Visual Cue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 opacity-90 group-hover:opacity-80" />

        {/* Central View Project Pill that appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
          <span className="inline-flex items-center gap-2 bg-[#0052fe] text-white px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-blue-500/40">
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="bg-white/95 backdrop-blur-xs text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
          {project.category}
        </span>
        {project.year && (
          <span className="bg-black/70 backdrop-blur-xs text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-white/10">
            {project.year}
          </span>
        )}
      </div>

      {/* Bottom Information Card Bar */}
      <div className="relative z-10 p-6 flex flex-col justify-between bg-black/85 backdrop-blur-md border-t border-white/10 group-hover:border-white/20 group-hover:bg-black/90 transition-all duration-300">
        <div
          className="flex items-start justify-between gap-4 mb-3 cursor-pointer"
          onClick={onOpenSubPage}
        >
          <div>
            <h3 className="text-sm font-black tracking-widest uppercase text-white mb-1 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          {/* Arrow Icon Button that redirects to subpage */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenSubPage();
            }}
            title="Open project sub-page"
            className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:rotate-45 shadow-sm cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tags and Quick Preview Row */}
        <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px]">
          <div className="text-slate-300 group-hover:text-white/80 font-medium truncate max-w-[200px]">
            {project.tags.slice(0, 2).join(' • ')}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickPreview();
              }}
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Quick preview without leaving page"
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenSubPage();
              }}
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
            >
              <span>Subpage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;