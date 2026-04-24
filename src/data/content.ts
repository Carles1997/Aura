// ============================================================
// CONTENT TYPES
// ============================================================
// Aquest fitxer defineix els tipus que els components React fan 
// servir. Les dades reals venen de Storyblok (veure storyblok.ts).
// ============================================================

export interface Project {
  id: string;
  index: number;
  title: string;
  year: string;
  client: string;
  category: string;
  role: string;
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