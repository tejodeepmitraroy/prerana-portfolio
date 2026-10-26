import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  Grid3X3,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectModal } from '../components/ProjectModal';
import { TrustedBy } from '../components/TrustedBy';
import { FooterSection } from '../components/FooterSection';

interface ProjectsPageProps {
  onOpenContact?: () => void;
}

type ViewMode = 'categorized' | 'grid';
type SortOption = 'latest' | 'alphabetical' | 'featured';

const Projects: React.FC<ProjectsPageProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const initialCategory = (location.state as { category?: string })?.category || 'ALL';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>(initialCategory !== 'ALL' ? 'grid' : 'categorized');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const navCategory = (location.state as { category?: string })?.category;
    if (navCategory) {
      setSelectedCategory(navCategory);
      setViewMode('grid');
    }
  }, [location.state]);

  // Available categories list
  const categoryList = useMemo(() => {
    return [
      { id: 'ALL', name: 'ALL DISCIPLINES', count: portfolioConfig.projects.length },
      ...portfolioConfig.categories.map((c) => ({
        id: c.name,
        name: c.name,
        count: portfolioConfig.projects.filter((p) => p.category === c.name).length
      }))
    ];
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return portfolioConfig.projects
      .filter((project) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'ALL' ||
          project.category.toUpperCase() === selectedCategory.toUpperCase();

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

  // Featured flagship spotlight
  const spotlightProject = useMemo(() => {
    return portfolioConfig.projects.find((p) => p.featured) || portfolioConfig.projects[0];
  }, []);

  return (
    <div className="w-full pt-20 bg-white min-h-screen text-slate-900 font-sans-display selection:bg-[#0052fe] selection:text-white">
      {/* Hero Header Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 border-b border-slate-100 overflow-hidden bg-white">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Top Eyebrow Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052fe] animate-ping" />
              <span className="text-xs font-black tracking-[0.22em] text-[#0052fe] uppercase">
                PORTFOLIO & ARCHIVES • 2024 — 2026
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>PRERANA DUTTA</span>
              <span>•</span>
              <span className="text-slate-900 font-extrabold">{portfolioConfig.projects.length} PROJECTS CATALOGED</span>
            </div>
          </div>

          {/* Main Title & Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 uppercase tracking-tight leading-[0.96] mb-6">
                INDEX OF <span className="text-[#0052fe]">ALL PROJECTS</span> & DISCIPLINES
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Explore a comprehensive collection of visual identities, design systems, modern web platforms, and mobile interfaces. Filter by design discipline or browse categorized case studies below.
              </p>
            </div>

            {/* Quick Meta Stats Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="bg-slate-50 border border-slate-200 p-6 flex items-center justify-between group hover:border-[#0052fe] transition-colors">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">DISCIPLINES</div>
                  <div className="text-2xl font-black text-slate-950 mt-0.5">4 Core Fields</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">Brand • Web • UI/UX • Graphic</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900 text-white p-6 flex items-center justify-between group">
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
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Flagship Case Study */}
      <section className="py-12 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0052fe]" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                FLAGSHIP SPOTLIGHT
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              FEATURED CASE STUDY
            </span>
          </div>

          <div className="relative bg-slate-950 text-white overflow-hidden shadow-xl border border-slate-900 grid grid-cols-1 lg:grid-cols-12 group">
            {/* Image Column */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden">
              <img
                src={spotlightProject.image}
                alt={spotlightProject.title}
                className="water-refract w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <span className="bg-[#0052fe] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  FEATURED
                </span>
                <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-white/20">
                  {spotlightProject.category}
                </span>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                  CLIENT: {spotlightProject.client} • {spotlightProject.year}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                  {spotlightProject.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {spotlightProject.overview}
                </p>

                {/* Key Deliverables Pills */}
                {spotlightProject.deliverables && (
                  <div className="space-y-2 mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      KEY DELIVERABLES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {spotlightProject.deliverables.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-semibold text-slate-200 bg-white/10 px-2.5 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => navigate(`/project/${spotlightProject.id}`)}
                  className="inline-flex items-center gap-2 bg-[#0052fe] hover:bg-[#0042cf] text-white px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors shadow-md group/btn"
                >
                  <span>VIEW FULL CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
                <button
                  onClick={() => setActiveModalProject(spotlightProject)}
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border border-white/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>QUICK PREVIEW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Navigation Bar (Sticky / Accessible) */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categoryList.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'bg-[#0052fe] text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Search, Sort, View Toggle */}
            <div className="flex items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, tags, client..."
                  className="w-full bg-slate-50 border border-slate-200 pl-9 pr-8 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0052fe] transition-colors"
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
              <div className="relative shrink-0 hidden sm:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-slate-50 border border-slate-200 pl-3 pr-8 py-2 text-xs font-bold text-slate-800 uppercase tracking-wider focus:outline-none focus:border-[#0052fe] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="latest">Latest First</option>
                  <option value="alphabetical">Title (A-Z)</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-slate-200 bg-slate-50 p-0.5 shrink-0">
                <button
                  onClick={() => setViewMode('categorized')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'categorized'
                      ? 'bg-[#0052fe] text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Categorised Sections View"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#0052fe] text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Unified Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Active Filter Summary Bar if query or filtered */}
          {(searchQuery || selectedCategory !== 'ALL') && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#0052fe]" />
                <span>
                  Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of{' '}
                  <strong className="text-slate-900">{portfolioConfig.projects.length}</strong> projects
                  {selectedCategory !== 'ALL' && ` in "${selectedCategory}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="text-[#0052fe] hover:underline font-bold text-xs uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* If no search results found */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-slate-200 my-8 bg-slate-50">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-2">
              No Projects Matched Your Search
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any projects matching "{searchQuery}" under the selected filter. Try adjusting your keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 bg-[#0052fe] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#0042cf] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'categorized' && selectedCategory === 'ALL' && !searchQuery ? (
          /* CATEGORISED SECTIONS VIEW: Grouped by category with rich headers */
          <div className="space-y-24">
            {portfolioConfig.categories.map((category, index) => {
              const categoryProjects = portfolioConfig.projects.filter(
                (p) => p.category === category.name
              );
              if (categoryProjects.length === 0) return null;

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-36"
                >
                  {/* Category Header Bar */}
                  <div className="border-b-2 border-slate-950 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-black tracking-widest text-slate-800 bg-slate-100 px-2 py-0.5 border border-slate-200">
                          0{index + 1} / 04
                        </span>
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                          {category.tagline}
                        </span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-3 font-normal leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {categoryProjects.length} Works
                      </span>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#0052fe] hover:text-[#003dbd] hover:underline"
                      >
                        <span>Filter this Category</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Projects Grid for this Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelectProject={() => navigate(`/project/${project.id}`)}
                        onQuickPreview={() => setActiveModalProject(project)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* UNIFIED GRID VIEW (or filtered state) */
          <div>
            {/* Grid Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-black tracking-widest text-[#0052fe] uppercase block mb-1">
                  {selectedCategory === 'ALL' ? 'ALL DISCIPLINES' : selectedCategory}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight">
                  {selectedCategory === 'ALL' ? 'CURATED DIRECTORY' : `${selectedCategory} ARCHIVE`}
                </h2>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Showing {filteredProjects.length} Projects
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={() => navigate(`/project/${project.id}`)}
                  onQuickPreview={() => setActiveModalProject(project)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Collaboration Banner (Matching Home Page Aesthetic) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blue Collaboration Card */}
          <div className="bg-[#0052fe] p-8 sm:p-10 text-white flex flex-col justify-between min-h-[280px] shadow-xl shadow-blue-500/10 group">
            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-200">
                START A COMMISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2 text-white">
                Have a new project or custom requirement?
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-3 max-w-md">
                Available for select freelance engagements, identity transformations, and complete web builds.
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-white hover:underline text-left mt-6"
            >
              <span>LET'S DISCUSS YOUR VISION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Dark Research / Process Card */}
          <div className="bg-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between min-h-[280px] shadow-xl group border border-slate-900">
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
      </section>

      {/* Trusted By Client Logos */}
      <TrustedBy />

      {/* Global Footer */}
      <FooterSection onOpenContact={onOpenContact} />

      {/* Interactive Quick View Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

// Sub-component: Project Card matching the home page SelectedWork design
interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: () => void;
  onQuickPreview: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  onQuickPreview
}) => {
  return (
    <div className="group relative bg-slate-900 overflow-hidden flex flex-col justify-end aspect-[4/4.8] transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer">
      {/* Background Image with Water Wave Refraction */}
      <img
        src={project.image}
        alt={project.title}
        className="water-refract absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
        loading="lazy"
        onClick={onSelectProject}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300"
        onClick={onSelectProject}
      />

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="bg-white/90 backdrop-blur-xs text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 shadow-sm">
          {project.category}
        </span>
        {project.year && (
          <span className="bg-black/60 backdrop-blur-xs text-slate-200 text-[10px] font-bold px-2 py-0.5 border border-white/10">
            {project.year}
          </span>
        )}
      </div>

      {/* Bottom Information Card Bar */}
      <div className="relative z-10 p-6 flex flex-col justify-between bg-black/85 backdrop-blur-xs border-t border-white/10 group-hover:border-white/30 group-hover:bg-black/90 transition-all duration-400">
        <div className="flex items-start justify-between gap-4 mb-3" onClick={onSelectProject}>
          <div>
            <div className="text-xs font-black tracking-widest uppercase text-white mb-1">
              {project.title}
            </div>
            <div className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors">
              {project.subtitle}
            </div>
          </div>

          {/* Arrow Icon Button */}
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:rotate-45 shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Tags and Quick View Row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
          <div className="text-slate-300 group-hover:text-white/80 font-medium truncate max-w-[190px]">
            {project.tags.slice(0, 2).join(' • ')}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickPreview();
            }}
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-300 group-hover:text-white hover:underline shrink-0"
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;