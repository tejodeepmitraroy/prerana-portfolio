export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  images?: string[];
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
  images?: string[];
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
  name: "Prerana Dutta",
  role: "INDUSTRIAL DESIGNER",
  titleLine1: "I'M A",
  titleHighlight: "INDUSTRIAL &",
  titleLine2: "PRODUCT DESIGNER",
  bio: "I am a product designer passionate about creating lifestyle products that simplify everyday living. My design approach focuses on understanding user needs, solving real-life problems, and transforming ideas into functional, meaningful, and aesthetically pleasing products that enhance the quality of life.",
  location: "Kolkata, West Bengal",
  email: "prerana200226@gmail.com",
  phone: "+91-9123895330",
  badgeText: "AVAILABLE FOR FREELANCE • PRODUCT • PACKAGING • BRANDING •",
  handwrittenScript: "Design Build Create",
  heroImage: "/profile-picture.jpeg",
  aboutImage: "/profile-picture.jpeg",
  aboutBio: "I'm an industrial and product designer with a passion for creating meaningful, functional, and visually striking products and packaging. I help brands turn their ideas into tangible, high-impact consumer experiences.",
  aboutHeadline: "DESIGN IS NOT JUST MY PROFESSION, IT'S MY PASSION.",

  stats: [
    { value: "5+", numeric: 5, label: "YEARS OF EXPERIENCE", suffix: "+" },
    { value: "35+", numeric: 35, label: "HAPPY CLIENTS", suffix: "+" },
    { value: "10+", numeric: 10, label: "INDUSTRY AWARDS", suffix: "+" }
  ] as StatItem[],

  categories: [
    {
      id: "logo-branding",
      name: "Logo & Branding",
      count: 4,
      tagline: "Holistic Product Identity & Commercial Mockups",
      description: "Transforming physical products into cohesive brand ecosystems through bespoke 3D mockups, retail merchandising, and tactile visual identities.",
      images: [
        "/category/logo.png"
      ]
    },
    {
      id: "packaging",
      name: "PACKAGING DESIGN",
      count: 4,
      tagline: "Tactile Consumer Packaging & Shelf Presence",
      description: "Engineering retail standup pouches, eco-conscious boxes, and die-cut production labels that captivate consumers on the shelf.",
      images: [
        "/category/packaging.png"
      ]
    },
    {
      id: "photography",
      name: "PHOTOGRAPHY",
      count: 4,
      tagline: "Visual Systems & Distinctive Identities",
      description: "Crafting iconic brand systems, typography guidelines, and art direction that articulate clear values and command industry presence.",
      images: [
        "/category/photography.jpeg"
      ]
    }
  ] as CategoryInfo[],

  projects: [
    // --- LOGO & BRANDING ---
    {
      id: "design-project-1",
      category: "Design",
      title: "Design Project",
      subtitle: "Designing project",
      image: "/design-project/fridge-project-1.jpeg",
      images: [
        "/design-project/fridge-project-1.jpeg",
        "/design-project/fridge-project-1.jpeg",
        "/design-project/fridge-project-1.jpeg",

      ],
      tags: ["Typography", "Negative Space", "Fruit Branding"],
      client: "Lime Fresh Organics",
      year: "2024",
      featured: false,
      deliverables: ["Bespoke Lettering", "Vector Silhouette Mark", "Monochrome Variants", "Digital Iconography"],
      stat: { value: "100%", label: "Custom Letterforms" },
      overview: "An artistic, negative-space typographic logo sculpted directly inside a sliced lime silhouette, embodying pure freshness, organic simplicity, and playful modern geometry."
    },

    // --- PRODUCT BRANDING ---
    {
      id: "lime-eco-bags",
      category: "PRODUCT BRANDING",
      title: "LIME Sustainable Retail Bags",
      subtitle: "Kraft Paper Carry Bags & Eco Merchandising",
      image: "/product-branding/lime mocab.jpg.jpeg",
      images: [
        "/product-branding/lime mocab.jpg.jpeg",
        "/product-branding/mocab 2.jpg.jpeg",
        "/product-branding/Screenshot 2026-07-03 222402.png"
      ],
      tags: ["Eco Packaging", "Retail Carry Bags", "Kraft Paper"],
      client: "Lime Fresh Organics",
      year: "2024",
      featured: false,
      deliverables: ["Screenprinted Kraft Bags", "Twisted Paper Handles", "Sustainable Store Collateral", "Point-of-Sale Signage"],
      stat: { value: "100%", label: "Biodegradable Materials" },
      overview: "Sustainable, unbleached kraft paper shopping bags featuring organic botanical typography, designed to elevate in-store customer touchpoints and affirm the brand's eco-conscious mission."
    },
    // --- PRODUCT BRANDING ---
    {
      id: "lime-eco-bags",
      category: "PRODUCT BRANDING",
      title: "LIME Sustainable Retail Bags",
      subtitle: "Kraft Paper Carry Bags & Eco Merchandising",
      image: "/product-branding/lime mocab.jpg.jpeg",
      images: [
        "/product-branding/lime mocab.jpg.jpeg",
        "/product-branding/mocab 2.jpg.jpeg",
        "/product-branding/Screenshot 2026-07-03 222402.png"
      ],
      tags: ["Eco Packaging", "Retail Carry Bags", "Kraft Paper"],
      client: "Lime Fresh Organics",
      year: "2024",
      featured: false,
      deliverables: ["Screenprinted Kraft Bags", "Twisted Paper Handles", "Sustainable Store Collateral", "Point-of-Sale Signage"],
      stat: { value: "100%", label: "Biodegradable Materials" },
      overview: "Sustainable, unbleached kraft paper shopping bags featuring organic botanical typography, designed to elevate in-store customer touchpoints and affirm the brand's eco-conscious mission."
    }
  ] as ProjectItem[],

  services: [
    {
      id: "logo-branding",
      title: "LOGO & BRANDING",
      description: "Iconic brand systems, typography guidelines, and distinctive visual identities that articulate clear values.",
      icon: "star"
    },
    {
      id: "package-design",
      title: "PACKAGE DESIGN",
      description: "Consumer retail packaging, standup pouches, eco-conscious boxes, and production-ready die-cut artwork.",
      icon: "monitor"
    },
    {
      id: "product-branding",
      title: "PRODUCT BRANDING",
      description: "Transforming physical products into cohesive brand ecosystems through bespoke 3D mockups and merchandising.",
      icon: "pen"
    },
    {
      id: "industrial-design",
      title: "INDUSTRIAL DESIGN",
      description: "Human-centric lifestyle product design, ergonomic modeling, and aesthetic problem solving for everyday living.",
      icon: "code"
    }
  ] as ServiceItem[],

  skills: [
    { name: "LOGO & BRANDING", percentage: 95 },
    { name: "PACKAGE DESIGN", percentage: 92 },
    { name: "PRODUCT BRANDING", percentage: 90 },
    { name: "INDUSTRIAL DESIGN", percentage: 88 }
  ] as SkillItem[],

  clients: [
    { name: "Bhanu Farms Ltd", iconType: "tech" },
    { name: "Bangur BFL Corp", iconType: "volt" },
    { name: "Lime Fresh Organics", iconType: "lumen" },
    { name: "EVAR Enterprises", iconType: "pixel" },
    { name: "Al Huda Herbal Remedies", iconType: "mind" },
    { name: "TechNova", iconType: "nexora" }
  ],

  socials: [
    // { name: "Behance", url: "https://behance.net" },
    // { name: "Dribbble", url: "https://dribbble.com" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/prerana-dutta-ba6a03377" },
    { name: "Instagram", url: "https://www.instagram.com/prec.on2025?exln=OGVjZWpzeDM0bmVy" }
  ]
};

