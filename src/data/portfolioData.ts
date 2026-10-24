export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
  tags: string[];
  client?: string;
  year?: string;
  overview?: string;
  featured?: boolean;
  deliverables?: string[];
  stat?: {
    value: string;
    label: string;
  };
}

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
  description: string;
  tagline: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'monitor' | 'pen' | 'star' | 'code';
}

export interface StatItem {
  value: string;
  numeric: number;
  label: string;
  suffix?: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export const portfolioConfig = {
  name: "Preana Dutta",
  role: "INDUSTRIAL DESIGNER",
  titleLine1: "I'M A",
  titleHighlight: "INDUSTRIAL &",
  titleLine2: "PRODUCT DESIGNER",
  bio: "I am a product designer passionate about creating lifestyle products that simplify everyday living. My design approach focuses on understanding user needs, solving real-life problems, and transforming ideas into functional, meaningful, and aesthetically pleasing products that enhance the quality of life.",
  location: "Kolkata, West Bengal",
  email: "[EMAIL_ADDRESS]",
  phone: "+91 9062268897",
  badgeText: "AVAILABLE FOR FREELANCE • PRODUCT • UI/UX • DESIGN •",
  handwrittenScript: "Design Build Create",
  heroImage: "/profile-picture.jpeg",
  aboutImage: "/profile-picture.jpeg",
  
  aboutBio: "I'm a freelance designer with a passion for creating meaningful and visually striking designs. I help brands turn their ideas into powerful visual stories.",
  aboutHeadline: "DESIGN IS NOT JUST MY PROFESSION, IT'S MY PASSION.",
  
  stats: [
    { value: "5+", numeric: 5, label: "YEARS OF EXPERIENCE", suffix: "+" },
    { value: "70+", numeric: 70, label: "PROJECTS COMPLETED", suffix: "+" },
    { value: "35+", numeric: 35, label: "HAPPY CLIENTS", suffix: "+" },
    { value: "10+", numeric: 10, label: "INDUSTRY AWARDS", suffix: "+" }
  ] as StatItem[],

  categories: [
    {
      id: "brand-identity",
      name: "BRAND IDENTITY",
      count: 4,
      tagline: "Visual Systems & Distinctive Identities",
      description: "Crafting iconic brand systems, typography guidelines, and art direction that articulate clear values and command industry presence."
    },
    {
      id: "web-design",
      name: "WEB DESIGN",
      count: 4,
      tagline: "High-Performance Digital Architecture",
      description: "Developing modern, monolithic, and responsive web platforms that seamlessly blend bold editorial aesthetics with flawless technical execution."
    },
    {
      id: "uiux-design",
      name: "UI/UX DESIGN",
      count: 4,
      tagline: "Human-Centric Digital Interfaces",
      description: "Engineering friction-free mobile applications, enterprise software dashboards, and design systems optimized for intuitive human interaction."
    },
    {
      id: "graphic-design",
      name: "GRAPHIC DESIGN",
      count: 4,
      tagline: "Print, Editorial & Spatial Communication",
      description: "Creating provocative typography posters, bespoke packaging systems, and digital promotional assets with unmatched visual conviction."
    }
  ] as CategoryInfo[],

  projects: [
    // BRAND IDENTITY
    {
      id: "brand-identity",
      category: "BRAND IDENTITY",
      title: "Aura Creative Studio",
      subtitle: "Logo & Visual Identity",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
      tags: ["Branding", "Art Direction", "Typography"],
      client: "Aura Studios",
      year: "2025",
      featured: true,
      deliverables: ["Brand Identity Guidelines", "Custom Logomark", "Digital Stationery", "Art Direction"],
      stat: { value: "3X", label: "Client Inbound Growth" },
      overview: "Complete visual identity and art direction for a contemporary creative studio, featuring dark-mode aesthetics, custom typography, and digital guidelines."
    },
    {
      id: "zenith-luxury",
      category: "BRAND IDENTITY",
      title: "Zenith Atelier",
      subtitle: "Haute Horlogerie & Luxury Branding",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85",
      tags: ["Luxury Brand", "Packaging", "Embossed Identity"],
      client: "Zenith Group Switzerland",
      year: "2025",
      featured: false,
      deliverables: ["Logomark Suite", "Packaging Design", "Certificate of Authenticity", "Editorial Lookbook"],
      stat: { value: "100%", label: "Bespoke Typography" },
      overview: "A refined brand evolution for a Swiss heritage timepiece brand, balancing traditional Swiss craftsmanship with contemporary architectural minimalism."
    },
    {
      id: "kroma-cosmetics",
      category: "BRAND IDENTITY",
      title: "Kroma Botanicals",
      subtitle: "Organic Skincare Visual Ecosystem",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85",
      tags: ["Packaging", "Sustainable Brand", "Earth Tones"],
      client: "Kroma Life Ltd",
      year: "2024",
      featured: false,
      deliverables: ["Sustainable Bottle Packaging", "Label System", "Color Hierarchy", "Retail Display"],
      stat: { value: "+85%", label: "Shelf Standout Score" },
      overview: "Holistic packaging and brand identity for a zero-waste clean beauty brand, combining recycled stone-paper tactile packaging with organic earth-toned aesthetics."
    },
    {
      id: "nexus-energy",
      category: "BRAND IDENTITY",
      title: "Nexus Clean Tech",
      subtitle: "Renewable Energy Brand Identity",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=85",
      tags: ["Clean Energy", "Corporate Identity", "Vector System"],
      client: "Nexus Infrastructure",
      year: "2024",
      featured: false,
      deliverables: ["Global Identity System", "Motion Identity", "Corporate Annual Report", "Signage Guidelines"],
      stat: { value: "$45M", label: "Series B Announcement" },
      overview: "Rebranding a leading European solar power syndicate into an forward-looking clean infrastructure giant, with dynamic kinetic iconography and modern green energy palettes."
    },

    // WEB DESIGN
    {
      id: "web-design",
      category: "WEB DESIGN",
      title: "Vertex Architecture",
      subtitle: "Monolithic Architectural Portfolio",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
      tags: ["Web Architecture", "UI/UX", "Development"],
      client: "Vertex Architecture",
      year: "2024",
      featured: true,
      deliverables: ["Interactive Blueprint Viewer", "Editorial Typography", "Next.js Web Engine", "Custom CMS"],
      stat: { value: "0.4s", label: "Page Load Speed" },
      overview: "A monolithic, ultra-clean web platform engineered for an architectural firm, highlighting structural clarity, rapid load times, and dynamic interactions."
    },
    {
      id: "lumina-ai",
      category: "WEB DESIGN",
      title: "Lumina Intelligence",
      subtitle: "Enterprise Generative AI Platform",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
      tags: ["Web App", "Dark Mode", "Interactive WebGL"],
      client: "Lumina Labs San Francisco",
      year: "2025",
      featured: false,
      deliverables: ["Product Marketing Landing", "Interactive Demo Playground", "Design Token Library", "SEO Optimization"],
      stat: { value: "+140%", label: "Conversion Rate" },
      overview: "A sleek, cyber-minimalist web platform for an enterprise AI workspace, highlighting multi-agent orchestration through real-time interactive visualizer nodes."
    },
    {
      id: "strata-living",
      category: "WEB DESIGN",
      title: "Strata Residences",
      subtitle: "High-End Real Estate Showcase",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      tags: ["Luxury Real Estate", "Interactive Floorplans", "Full-Screen Video"],
      client: "Strata Properties Manhattan",
      year: "2024",
      featured: false,
      deliverables: ["Virtual 3D Tour Integration", "Floorplan Configurator", "Private Inquire Portal", "Mobile First Layout"],
      stat: { value: "$120M+", label: "Inquiries Handled" },
      overview: "An immersive digital showroom showcasing architectural penthouses in Tribeca, featuring full-screen cinematic transitions and interactive unit selector maps."
    },
    {
      id: "solaris-sound",
      category: "WEB DESIGN",
      title: "Solaris Hi-Fi Audio",
      subtitle: "Direct-to-Consumer Audio Experience",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85",
      tags: ["E-Commerce", "Custom Sound Design", "Micro-Interactions"],
      client: "Solaris Audio Sweden",
      year: "2025",
      featured: false,
      deliverables: ["Headphone Customizer", "Spatial Audio Visualizer", "Headless Shopify Store", "Speed Architecture"],
      stat: { value: "Awwwards", label: "Site of the Day" },
      overview: "A tactile digital flagship for audiophile headphones that allows users to test sound profiles, customize bespoke wood finishes, and checkout in two clicks."
    },

    // UI/UX DESIGN
    {
      id: "uiux-design",
      category: "UI/UX DESIGN",
      title: "Pulse Fintech",
      subtitle: "Next-Gen Mobile Banking Application",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=85",
      tags: ["Mobile App", "Design System", "iOS / Android"],
      client: "Pulse Financial Tech",
      year: "2024",
      featured: true,
      deliverables: ["iOS/Android Native UI", "Design System in Figma", "Micro-haptic Feedback Map", "Security Flows"],
      stat: { value: "4.9 ★", label: "App Store Rating" },
      overview: "Next-generation financial analytics mobile application designed with effortless user flows, dark mode charting, and intuitive gesture controls."
    },
    {
      id: "orbit-health",
      category: "UI/UX DESIGN",
      title: "Orbit Health Tracker",
      subtitle: "Biometric Wellness & Sleep Intelligence",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
      tags: ["HealthTech", "Wearable Sync", "Data Visualization"],
      client: "Orbit Medical Devices",
      year: "2025",
      featured: false,
      deliverables: ["Biometric Dashboard", "Real-Time ECG Visualizer", "Smart Alert Engine", "Apple Watch Companion App"],
      stat: { value: "250K+", label: "Active Daily Users" },
      overview: "Transforming dense clinical telemetry data into beautiful, actionable wellness rings and restorative sleep metrics for patients and practitioners alike."
    },
    {
      id: "velocity-auto",
      category: "UI/UX DESIGN",
      title: "Velocity Automotive HMI",
      subtitle: "Electric Vehicle Cockpit Interface",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
      tags: ["Automotive UI", "Touchscreen Cockpit", "HUD Graphics"],
      client: "Velocity Motors",
      year: "2024",
      featured: false,
      deliverables: ["15-inch Central Console UI", "Head-Up Display Icons", "Driver Ambient Mode Profiles", "Night Mode Optimization"],
      stat: { value: "0.18s", label: "Driver Glance Time" },
      overview: "A safety-first, ultra-responsive digital cockpit interface created for high-performance electric vehicles with zero driver distraction."
    },
    {
      id: "hyperion-workspace",
      category: "UI/UX DESIGN",
      title: "Hyperion Cloud Manager",
      subtitle: "Multi-Cloud DevOps Orchestration Suite",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
      tags: ["SaaS Platform", "Enterprise UI", "Complex Dashboards"],
      client: "Hyperion Networks",
      year: "2025",
      featured: false,
      deliverables: ["Component Design System", "Kubernetes Cluster Topology", "Role-Based Access Maps", "Audit Log Table"],
      stat: { value: "40%", label: "Deployment Workflow Speedup" },
      overview: "Simplifying container cluster monitoring and security posture evaluation into a modular, drag-and-drop workflow canvas for distributed engineering teams."
    },

    // GRAPHIC DESIGN
    {
      id: "tokyo-biennial",
      category: "GRAPHIC DESIGN",
      title: "Tokyo Typography Biennial",
      subtitle: "Experimental Exhibition Poster Series",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85",
      tags: ["Typography", "Silk Screen Print", "Exhibition Design"],
      client: "Tokyo Design Foundation",
      year: "2025",
      featured: false,
      deliverables: ["Screenprinted Poster Collection", "Exhibition Catalog", "Street Banner System", "Digital Motion Posters"],
      stat: { value: "Gold", label: "TDC Tokyo Award" },
      overview: "A series of large-format silk-screened posters celebrating bilingual Kanji and Latin typographic interplay through optical illusions and kinetic letterforms."
    },
    {
      id: "prism-spirits",
      category: "GRAPHIC DESIGN",
      title: "Prism Botanical Spirits",
      subtitle: "Geometric Label & Foil Packaging",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=85",
      tags: ["Packaging Design", "Cold Foil Print", "Spirits Branding"],
      client: "Prism Distilling Co.",
      year: "2024",
      featured: false,
      deliverables: ["Custom Bottle Silhouette", "Prismatic Foil Labels", "Gift Box Packaging", "Cocktail Recipe Book"],
      stat: { value: "12,000", label: "Limited Batch Sold Out" },
      overview: "Bespoke glass bottle labels adorned with dichroic holographic foil, refracting ambient lounge lighting to mimic the refraction of distilled botanical botanicals."
    },
    {
      id: "vanguard-music",
      category: "GRAPHIC DESIGN",
      title: "Vanguard Electronic Festival",
      subtitle: "Visual Identity & Stage Art Direction",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=85",
      tags: ["Festival Graphics", "Stage Visuals", "Merchandise Kit"],
      client: "Vanguard Collective Berlin",
      year: "2025",
      featured: false,
      deliverables: ["Festival Lineup Art", "Stage LED Animations", "Limited Apparel Collection", "Wristband & Ticket System"],
      stat: { value: "65K+", label: "Attendees in Berlin" },
      overview: "An electrifying aesthetic merging brutalist Swiss typography with vibrant laser luminescence for Europe's premier underground electronic and ambient gathering."
    },
    {
      id: "strata-journal",
      category: "GRAPHIC DESIGN",
      title: "Strata Quarterly Journal",
      subtitle: "Hardbound Architectural Monograph",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85",
      tags: ["Editorial Design", "Book Binding", "Monochrome Print"],
      client: "Strata Editorial Board",
      year: "2024",
      featured: false,
      deliverables: ["240-Page Hardcover Monograph", "Custom Linen Slipcase", "Grid System Design", "Curated Paper Stock Selection"],
      stat: { value: "Top 50", label: "AIGA Best Book Designs" },
      overview: "A tactile, 240-page hardcover publication dedicated to brutalist concrete structures across Eastern Europe, printed with duotone black inks on uncoated German paper."
    }
  ] as ProjectItem[],

  services: [
    {
      id: "web-design",
      title: "WEB DESIGN",
      description: "Custom websites that are beautiful, functional and conversion-focused.",
      icon: "monitor"
    },
    {
      id: "uiux-design",
      title: "UI/UX DESIGN",
      description: "Intuitive interfaces and seamless experiences that users love to interact with.",
      icon: "pen"
    },
    {
      id: "branding",
      title: "BRANDING",
      description: "Strong visual identities that make your brand unforgettable.",
      icon: "star"
    },
    {
      id: "graphic-design",
      title: "GRAPHIC DESIGN",
      description: "Clean, modern and creative designs for both print and digital media.",
      icon: "code"
    }
  ] as ServiceItem[],

  skills: [
    { name: "WEB DESIGN", percentage: 95 },
    { name: "UI/UX DESIGN", percentage: 90 },
    { name: "BRANDING", percentage: 85 },
    { name: "GRAPHIC DESIGN", percentage: 80 }
  ] as SkillItem[],

  clients: [
    { name: "TechNova", iconType: "tech" },
    { name: "BrightMind", iconType: "mind" },
    { name: "PixelForge", iconType: "pixel" },
    { name: "Nexora", iconType: "nexora" },
    { name: "VOLT", iconType: "volt" },
    { name: "LUMEN", iconType: "lumen" }
  ],

  socials: [
    { name: "Behance", url: "https://behance.net" },
    { name: "Dribbble", url: "https://dribbble.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Instagram", url: "https://instagram.com" }
  ]
};

