// ============================================================
// CONTENT CONFIGURATION
// ============================================================
// Aquest fitxer carrega el contingut dels JSON a /content/.
// NO editis aquest fitxer directament — edita els JSON o fes
// servir el panell de TinaCMS a /admin/index.html
// ============================================================

import siteConfigJson from "../../content/site/config.json";

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

// Importació dinàmica de tots els projectes (Vite)
const projectModules = import.meta.glob<{ default: Omit<Project, "id"> }>(
  "../../content/projects/*.json",
  { eager: true }
);

export const siteConfig = siteConfigJson;

// Ordenem els projectes pel camp "index"
// L'id es genera a partir del nom del fitxer (ex: meridian-capital.json → "meridian-capital")
export const projects: Project[] = Object.entries(projectModules)
  .map(([path, mod]) => {
    const filename = path.split("/").pop() || "";
    const id = filename.replace(".json", "");
    return { ...mod.default, id };
  })
  .sort((a, b) => a.index - b.index);