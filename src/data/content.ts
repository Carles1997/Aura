// ============================================================
// CONTENT CONFIGURATION
// ============================================================
// This is the single source of truth for all website content.
// Edit this file to update any text, images, or project data.
// No technical knowledge required — just update the values below.
// ============================================================

export const siteConfig = {
  studioName: "ATELIER",
  studioTagline: "Brand Strategy & Graphic Design",
  heroManifesto: {
    line1: "Design is the",
    line2: "silent argument",
    line3: "for everything",
    line4: "that matters.",
  },
  heroSubtext:
    "We build visual identities that endure. Strategic thinking, refined craft.",
  // Navigation labels
  nav: {
    index: "INDEX",
    about: "ABOUT",
    contact: "CONTACT",
  },
  // Footer / About section
  about: {
    headline: "A studio built on rigor and restraint.",
    body: "We are a multidisciplinary design studio specialising in brand strategy, visual identity, and editorial design. Based between Lisbon and London, we work with clients who understand that design is not decoration — it is direction.",
    services: [
      "Brand Strategy",
      "Visual Identity",
      "Graphic Design",
      "Art Direction",
      "Editorial Design",
      "Environmental Graphics",
    ],
    contact: {
      email: "studio@atelier.design",
      phone: "+351 912 345 678",
      location: "Lisbon, PT — London, UK",
    },
    photographUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format",
    photographAlt: "Studio interior — abstract composition",
  },
};

export interface Project {
  id: string;
  index: number;
  title: string;
  year: string;
  client: string;
  category: string;
  previewImage: string;
  heroImage: string;
  challenge: string;
  solution: string;
  tags: string[];
  collageImages: {
    src: string;
    alt: string;
    position: "dominant" | "secondary";
    width: number;
    height: number;
  }[];
  images: {
    src: string;
    alt: string;
    aspect: "landscape" | "portrait" | "square";
  }[];
  credits: {
    role: string;
    name: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "meridian-capital",
    index: 1,
    title: "Meridian Capital",
    year: "2024",
    client: "Meridian Capital Group",
    category: "Brand Strategy / Visual Identity",
    previewImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80&auto=format",
        alt: "Brand identity application",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80&auto=format",
        alt: "Wordmark construction",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80&auto=format",
        alt: "Material palette",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "Meridian Capital Group, a pan-European private equity firm managing €4.2 billion in assets, faced a fundamental identity crisis. Their existing visual language communicated aggression where sophistication was required. In an industry where trust is the primary currency, their brand was undermining decades of institutional credibility.",
    solution:
      "We developed a brand architecture rooted in the concept of 'considered permanence' — visual language that signals stability without stagnation. A custom wordmark with subtle geometric tension, a monochromatic palette drawing from aged stone and oxidised copper, and a typographic system that prioritises legibility at every scale. The result is a brand that whispers authority rather than demanding attention.",
    tags: ["Private Equity", "Identity System", "Wordmark", "Brand Guidelines"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format",
        alt: "Brand identity application — stationery",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format",
        alt: "Wordmark construction and spacing",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format",
        alt: "Environmental signage application",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&auto=format",
        alt: "Brand palette and material exploration",
        aspect: "square",
      },
    ],
    credits: [
      { role: "Creative Direction", name: "E. Voss" },
      { role: "Brand Strategy", name: "M. Carvalho" },
      { role: "Typography", name: "Studio Atelier" },
    ],
  },
  {
    id: "forma-ceramics",
    index: 2,
    title: "Forma Ceramics",
    year: "2024",
    client: "Forma Studio",
    category: "Brand Identity / Packaging",
    previewImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80&auto=format",
        alt: "Packaging design",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=300&q=80&auto=format",
        alt: "Logo application",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1609687829522-1e01e9ff6849?w=300&q=80&auto=format",
        alt: "Brand mark",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "Forma Studio, a Lisbon-based ceramics atelier producing hand-thrown functional objects, needed a brand identity that could hold its own against the noise of the lifestyle market without betraying the meditative quietude of the craft itself. The challenge was to market without merchandising.",
    solution:
      "We took the imperfection inherent in hand-throwing as the central strategic proposition. The brand identity celebrates the fingerprint — the evidence of the maker's hand. A logotype set in a classical serif with deliberate weight variation echoes the uneven rim of a thrown vessel. The packaging system uses kraft and ash paper stocks with blind-embossing, allowing the material to speak before ink does.",
    tags: ["Ceramics", "Packaging", "Artisan Brand", "Identity"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80&auto=format",
        alt: "Packaging system — kraft and blind emboss",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80&auto=format",
        alt: "Logotype application on ceramic surface",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80&auto=format",
        alt: "Product and packaging composition",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1609687829522-1e01e9ff6849?w=800&q=80&auto=format",
        alt: "Brand mark — stamp and wax seal",
        aspect: "square",
      },
    ],
    credits: [
      { role: "Creative Direction", name: "Studio Atelier" },
      { role: "Packaging Design", name: "R. Oliveira" },
      { role: "Photography", name: "J. Antunes" },
    ],
  },
  {
    id: "revue-nord",
    index: 3,
    title: "Revue Nord",
    year: "2023",
    client: "Revue Nord Publishing",
    category: "Editorial Design / Art Direction",
    previewImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80&auto=format",
        alt: "Cover design",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80&auto=format",
        alt: "Interior spread",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&q=80&auto=format",
        alt: "Layout grid",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "Revue Nord, a quarterly literary and cultural journal based in Copenhagen, required an editorial identity capable of communicating Nordic intellectual rigour while competing for shelf presence in an increasingly visual magazine market. The previous design had become indistinguishable from the ambient noise of Scandinavian lifestyle publishing.",
    solution:
      "We designed a system built on tension and negative space. The masthead operates at extremes — set in condensed grotesque at maximum weight, it commands the cover without decoration. Interior spreads use a strict six-column grid that is deliberately broken on feature openings, creating moments of visual rupture that mirror the journal's editorial ambition. The colour system is restricted to one accent per issue — a discipline that creates collectability.",
    tags: ["Editorial", "Print", "Publication Design", "Art Direction"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=1200&q=80&auto=format",
        alt: "Cover design — Issue 12",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1200&q=80&auto=format",
        alt: "Interior spread typography system",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&auto=format",
        alt: "Grid and layout architecture",
        aspect: "square",
      },
      {
        src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80&auto=format",
        alt: "Multi-issue cover system",
        aspect: "landscape",
      },
    ],
    credits: [
      { role: "Art Direction", name: "E. Voss" },
      { role: "Typography", name: "P. Lindberg" },
      { role: "Editorial Strategy", name: "M. Carvalho" },
    ],
  },
  {
    id: "haus-frankfurt",
    index: 4,
    title: "Haus Frankfurt",
    year: "2023",
    client: "Haus Frankfurt GmbH",
    category: "Brand Strategy / Spatial Identity",
    previewImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&crop=top",
    heroImage:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80&auto=format",
        alt: "Signage system",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&q=80&auto=format",
        alt: "Prospect book",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1430285561322-7808604715df?w=300&q=80&auto=format",
        alt: "Wayfinding",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "Haus Frankfurt, a developer of premium residential properties in the Rhine-Main region, required a brand capable of communicating their philosophy: that architecture is not backdrop but protagonist. Their previous marketing language focused on amenities rather than meaning — a common failure in luxury real estate communication.",
    solution:
      "We built a brand identity around the proposition 'Architecture is Memory' — positioning Haus Frankfurt not as a developer of buildings but as a curator of lived experience. A refined visual system using precise geometric forms extracted from the Bauhaus legacy provides a conceptual through-line. The identity system scales seamlessly from architectural hoardings to intimate prospect books.",
    tags: ["Real Estate", "Luxury", "Spatial Identity", "Brand Architecture"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format",
        alt: "Hoarding and site signage system",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80&auto=format",
        alt: "Prospect book interior spread",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1430285561322-7808604715df?w=1200&q=80&auto=format",
        alt: "Environmental wayfinding application",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
        alt: "Brand mark construction",
        aspect: "square",
      },
    ],
    credits: [
      { role: "Brand Strategy", name: "M. Carvalho" },
      { role: "Spatial Design", name: "Studio Atelier" },
      { role: "Art Direction", name: "E. Voss" },
    ],
  },
  {
    id: "sol-institute",
    index: 5,
    title: "SOL Institute",
    year: "2022",
    client: "SOL Contemporary Art Institute",
    category: "Cultural Identity / Wayfinding",
    previewImage:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=500&q=80&auto=format",
        alt: "Institution entrance",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80&auto=format",
        alt: "Interior wayfinding",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?w=300&q=80&auto=format",
        alt: "Digital identity",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "SOL Contemporary Art Institute, a newly established privately funded art space in Porto, required an institutional identity that could command the respect of a major cultural institution despite its emerging status. The identity needed to feel neither derivative of existing museum models nor so aggressively experimental as to alienate collectors and lenders.",
    solution:
      "We created an identity system built on spatial grammar — the same logic that governs the organisation of artworks within a white cube. The wordmark exists at the intersection of conceptual art practice and institutional rigour: set in a custom cut of a geometric sans-serif with deliberate optical corrections. The wayfinding system treats text as object, with large-format type used architecturally rather than informationally.",
    tags: ["Cultural Institution", "Museum", "Wayfinding", "Identity System"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=1200&q=80&auto=format",
        alt: "Institution entrance — large-format signage",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format",
        alt: "Wayfinding system — interior application",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&auto=format",
        alt: "Exhibition catalogue and collateral",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?w=800&q=80&auto=format",
        alt: "Digital identity and screen applications",
        aspect: "square",
      },
    ],
    credits: [
      { role: "Creative Direction", name: "Studio Atelier" },
      { role: "Wayfinding", name: "L. Ferreira" },
      { role: "Brand Strategy", name: "M. Carvalho" },
    ],
  },
  {
    id: "veil-fragrance",
    index: 6,
    title: "Veil Fragrance",
    year: "2022",
    client: "Veil Perfumery",
    category: "Brand Identity / Luxury Packaging",
    previewImage:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=80&auto=format",
    collageImages: [
      {
        src: "https://images.unsplash.com/photo-1547887538-047f814d7f2f?w=500&q=80&auto=format",
        alt: "Packaging system",
        position: "dominant",
        width: 360,
        height: 480,
      },
      {
        src: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=300&q=80&auto=format",
        alt: "Bottle detail",
        position: "secondary",
        width: 200,
        height: 260,
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&q=80&auto=format",
        alt: "Brand system",
        position: "secondary",
        width: 200,
        height: 200,
      },
    ],
    challenge:
      "Veil Perfumery, a niche fragrance house specialising in botanical extractions, needed to establish itself in the ultra-luxury sector of an increasingly crowded market. The founders brought extraordinary olfactory expertise but no visual language capable of communicating that expertise to a discerning audience.",
    solution:
      "The brand identity is built on the idea of the invisible made perceptible — the same transformation that occurs in fragrance. A logotype set in a high-contrast didone serif, intentionally light in weight, communicates delicacy and precision. The packaging system uses optically translucent papers and frosted glass to literalise the brand concept. Gold used as a functional — rather than decorative — material: stamped, not printed.",
    tags: ["Luxury", "Fragrance", "Packaging", "Retail Identity"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1547887538-047f814d7f2f?w=1200&q=80&auto=format",
        alt: "Packaging system — primary and secondary",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=800&q=80&auto=format",
        alt: "Bottle and carton — detail photography",
        aspect: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=80&auto=format",
        alt: "Retail environment and display system",
        aspect: "landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&auto=format",
        alt: "Brand typography and colour system",
        aspect: "square",
      },
    ],
    credits: [
      { role: "Creative Direction", name: "E. Voss" },
      { role: "Packaging Engineering", name: "R. Oliveira" },
      { role: "Retail Design", name: "Studio Atelier" },
    ],
  },
];
