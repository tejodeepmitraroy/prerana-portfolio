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
  location?: string;
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
      count: 1,
      tagline: "Holistic Product Identity & Commercial Mockups",
      description: "Transforming physical products into cohesive brand ecosystems through bespoke 3D mockups, retail merchandising, and tactile visual identities.",
      images: [
        "/category/logo.png"
      ]
    },
    {
      id: "packaging",
      name: "Packaging Design",
      count: 1,
      tagline: "Tactile Consumer Packaging & Shelf Presence",
      description: "Engineering retail standup pouches, eco-conscious boxes, and die-cut production labels that captivate consumers on the shelf.",
      images: [
        "/category/packaging.png"
      ]
    },
    {
      id: "design",
      name: "Design Project",
      count: 1,
      tagline: "Product Ecosystems & Retail Merchandising",
      description: "Bespoke packaging and modern retail mockups that transform everyday items into memorable consumer experiences.",
      images: [
        "/category/design-project.jpeg"
      ]
    },
    {
      id: "photography",
      name: "Photography",
      count: 1,
      tagline: "Visual Systems & Distinctive Identities",
      description: "Crafting iconic brand systems, typography guidelines, and art direction that articulate clear values and command industry presence.",
      images: [
        "/category/photography.jpeg"
      ]
    }
  ] as CategoryInfo[],

  projects: [
    // 1
    {
      id: "design-project-1",
      category: "Design Project",
      title: "Smart Refrigerator",
      subtitle: "Smart Refrigerator Lifestyle Concept",
      image: "/category/design-project.jpeg",
      images: [
        "/product-design/product-design-1.jpg",
        "/product-design/product-design-2.jpg",
        "/product-design/product-design-3.jpg",
        "/product-design/product-design-4.jpg",
        "/product-design/product-design-5.jpg",
        "/product-design/product-design-6.jpg",
        "/product-design/product-design-7.jpg",
        "/product-design/product-design-8.jpg",
        "/product-design/product-design-9.jpg",
        "/product-design/product-design-10.jpg",
        "/product-design/product-design-11.jpg",
        "/product-design/product-design-12.jpg",
        "/product-design/product-design-13.jpg",
        "/product-design/product-design-14.jpg",
        "/product-design/product-design-15.jpg",
        "/product-design/product-design-16.jpg",
        "/product-design/product-design-17.jpg",
        "/product-design/product-design-18.jpg"
      ],
      tags: ["Technology", "Meets", "LifeStyle"],
      client: "Design Project",
      year: "2024",
      location: "India, 2024",
      featured: true,
      deliverables: ["Product CAD", "Ergonomics Research", "3D Renders"],
      stat: { value: "60%", label: "Ergonomic" },
      overview: "An innovative, ergonomic smart refrigerator architecture designed to streamline kitchen workflow, elevate aesthetics, and blend technology with modern lifestyle ergonomics."
    },
    // 2
    {
      id: "bangur-brand-suite",
      category: "Branding",
      title: "Bangur Brand System",
      subtitle: "Corporate Identity & Geometry Mark",
      image: "/logo-banding/logo-bangur-1.png",
      images: [
        "/logo-banding/logo-bangur-1.png",
        "/logo-banding/logo-bangur-2.png",
        "/logo-banding/logo-bangur-3 (1).png",
        "/logo-banding/logo-bangur-3 (2).png",
        "/logo-banding/logo-bangur-3 (3).png",
        "/logo-banding/logo-bangur-3 (4).png",
        "/logo-banding/logo-bangur-3 (5).png",
        "/logo-banding/logo-bangur-3 (6).png",
        "/logo-banding/Screenshot 2026-07-11 145539.png",
        "/logo-banding/Screenshot 2026-07-11 145554.png",
        "/logo-banding/Screenshot 2026-07-11 145607.png",
        "/logo-banding/Screenshot 2026-07-11 145622.png",
        "/logo-banding/Screenshot 2026-07-13 133822.png",
        "/logo-banding/Screenshot 2026-07-13 135716.png",
        "/logo-banding/Screenshot 2026-07-13 135742.png",
        "/logo-banding/Screenshot 2026-07-13 140048.png",
        "/logo-banding/Screenshot 2026-07-13 150934.png"
      ],
      tags: ["Brand Guidelines", "Logomark", "Corporate Identity"],
      client: "Bangur BFL Corp",
      year: "2024",
      location: "Spain, 2024",
      featured: true,
      deliverables: ["Logotype System", "Visual Identity Matrix", "Corporate Stationery", "Brand Book"],
      stat: { value: "100%", label: "Vector Cohesion" },
      overview: "A structured, geometric corporate identity system balancing high structural rigidity with minimalist contemporary finesse."
    },
    // 3
    {
      id: "eco-packaging-pouch",
      category: "Packaging",
      title: "Eco Retail Pouch",
      subtitle: "Matte Foil Standup Pouch Packaging",
      image: "/category/packaging.png",
      images: [
        "/category/packaging.png",
        "/package-design/Gemini_Generated_Image_1gsuup1gsuup1gsu.png",
        "/package-design/Gemini_Generated_Image_l4decil4decil4de.png",
        "/package-design/Gemini_Generated_Image_mbzub8mbzub8mbzu.png",
        "/package-design/Screenshot 2026-07-13 155016.png",
        "/package-design/Screenshot 2026-07-13 155046.png",
        "/package-design/Screenshot 2026-07-14 133309.png",
        "/package-design/Screenshot 2026-07-15 164209.png",
        "/package-design/Screenshot 2026-07-17 164836.png"
      ],
      tags: ["Retail Standup Pouch", "Matte Foil", "Food Packaging"],
      client: "Bhanu Farms Ltd",
      year: "2024",
      location: "Italy, 2024",
      featured: true,
      deliverables: ["Dieline Architecture", "Pantone Spec Sheet", "Spot UV Application", "Nutritional Layout"],
      stat: { value: "350gsm", label: "Recycled Board" },
      overview: "An artisanal, tactile stand-up zipper pouch engineered for organic dried goods, featuring warm organic earth tones and a soft-touch matte protective barrier."
    },
    // 4
    {
      id: "logofolio-collection",
      category: "Logofolio",
      title: "Logofolio",
      subtitle: "Selected Marks & Identity Explorations",
      image: "/logo-banding/logo-1.png",
      images: [
        "/logo-banding/logo-1.png",
        "/logo-banding/Screenshot 2026-07-11 145539.png",
        "/logo-banding/Screenshot 2026-07-11 145607.png"
      ],
      tags: ["Logofolio", "Identity Grid", "Minimal Marks"],
      client: "Various Clients",
      year: "2022-2024",
      location: "2022-2024",
      featured: true,
      deliverables: ["Mark Guidelines", "Vector Library", "Grid Construction"],
      stat: { value: "24+", label: "Marks Created" },
      overview: "A comprehensive grid-based compendium of marks, crests, and emblems crafted for forward-thinking international brands."
    },
    // 5
    {
      id: "soda-can-branding",
      category: "Illustration",
      title: "TechNova Can Branding",
      subtitle: "Aluminum Can Label & Retail Visuals",
      image: "/product-branding/mockup soda can.png",
      images: [
        "/product-branding/mockup soda can.png",
        "/product-branding/Screenshot 2026-06-13 060442.png"
      ],
      tags: ["Beverage Can", "Retail Mockup", "3D Visualization"],
      client: "TechNova Refresh",
      year: "2022",
      location: "USA, 2022",
      featured: true,
      deliverables: ["3D Can Render", "Label Foil Details", "Packaging Mockups", "Print-Ready Vector Files"],
      stat: { value: "330ml", label: "Can Spec" },
      overview: "High-contrast dynamic beverage packaging mockup crafted with vivid typography and metallic accents for maximum shelf impact."
    },
    // 6
    {
      id: "studio-photography",
      category: "Illustration",
      title: "Commercial Stills",
      subtitle: "Studio Lighting & Editorial Stills",
      image: "/category/photography.jpeg",
      images: [
        "/photography/photography-1.jpeg",
        "/photography/photography-2.jpeg",
        "/photography/photography-3.jpeg",
        "/photography/photography-4.jpeg"
      ],
      tags: ["Studio Stills", "Editorial Direction", "Lighting"],
      client: "EVAR Enterprises",
      year: "2024",
      location: "Peru, 2024",
      featured: true,
      deliverables: ["Studio Lighting Setup", "Hi-Res Retouching", "Color Grading", "Social Media Lookbook"],
      stat: { value: "8K", label: "Studio Capture" },
      overview: "High-key editorial and commercial photography capturing tactile product surfaces, material textures, and industrial silhouettes."
    },
    // 7
    {
      id: "lifestyle-appliance",
      category: "Illustration",
      title: "Lifestyle Concepts",
      subtitle: "Industrial Concept Modeling & CMF",
      image: "/product-design/product-design-2.jpg",
      images: [
        "/product-design/product-design-2.jpg",
        "/product-design/product-design-3.jpg",
        "/product-design/product-design-4.jpg"
      ],
      tags: ["Industrial Design", "CMF", "Prototyping"],
      client: "Prerana Dutta Studio",
      year: "2024",
      location: "Peru, 2024",
      featured: true,
      deliverables: ["Ergonomic Prototyping", "CMF Direction", "Form Exploration"],
      stat: { value: "98%", label: "User Satisfaction" },
      overview: "A clean study in modern industrial forms, balancing warm tactile surfaces with seamless functional ergonomics."
    },
    // 8
    {
      id: "carrot-packaging",
      category: "Web Design",
      title: "Carrot Organic Produce",
      subtitle: "Sustainable Produce Box & Labeling",
      image: "/package-design/Gemini_Generated_Image_stpqucstpqucstpq.png",
      images: [
        "/package-design/Gemini_Generated_Image_stpqucstpqucstpq.png",
        "/package-design/new without pic pack.png",
        "/package-design/packing carrot with out picture.png"
      ],
      tags: ["Farm Packaging", "Eco Box", "Label Design"],
      client: "Al Huda Herbal Remedies",
      year: "2024",
      location: "UK, 2024",
      featured: true,
      deliverables: ["Corrugated Box Design", "Die-Cut Windows", "Eco Seal System", "Barcode Architecture"],
      stat: { value: "100%", label: "Compostable" },
      overview: "Ergonomic farm-to-table organic harvest packaging with breathable ventilation die-cuts and minimal eco-ink usage."
    },
    // 9
    {
      id: "cold-brew-packaging",
      category: "Packaging",
      title: "Artisanal Cold Brew",
      subtitle: "Amber Bottle Packaging & Label System",
      image: "/package-design/Gemini_Generated_Image_1gsuup1gsuup1gsu.png",
      images: [
        "/package-design/Gemini_Generated_Image_1gsuup1gsuup1gsu.png",
        "/package-design/Gemini_Generated_Image_l4decil4decil4de.png",
        "/package-design/Gemini_Generated_Image_mbzub8mbzub8mbzu.png"
      ],
      tags: ["Cold Brew", "Bottle Label", "Retail Packaging"],
      client: "Bespoke Brew Co",
      year: "2022",
      location: "Peru, 2022",
      featured: true,
      deliverables: ["Label Design", "Amber Bottle Mockup", "Vector Typography"],
      stat: { value: "100%", label: "Recyclable Glass" },
      overview: "Tactile botanical label system crafted for small-batch amber glass cold brew bottles, radiating warmth and craft heritage."
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

