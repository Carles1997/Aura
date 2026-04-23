// ============================================================
// STORYBLOK DATA BRIDGE
// ============================================================
// Aquest fitxer carrega el contingut de Storyblok i el transforma
// a l'estructura que ja esperen els components React.
// No cal tocar aquest fitxer per editar contingut — fes-ho a Storyblok.
// ============================================================

import { useState, useEffect } from "react";
import { getStoryblokApi } from "@storyblok/react";
import type { Project } from "./content";

// =============================
// Estructures intermèdies de Storyblok
// =============================

interface SbAsset {
  filename?: string;
  alt?: string;
}

interface SbHeroBlock {
  component: "hero";
  studio_tagline?: string;
  line_1?: string;
  line_2?: string;
  line_3?: string;
  line_4?: string;
  subtext?: string;
}

interface SbAboutBlock {
  component: "about";
  headline?: string;
  body?: string;
  services?: string[];
  email?: string;
  phone?: string;
  location?: string;
  photograph?: SbAsset;
  photograph_alt?: string;
}

type SbBodyBlock = SbHeroBlock | SbAboutBlock;

interface SbProjectCollageImage {
  src?: SbAsset;
  alt?: string;
  position?: "dominant" | "secondary";
  width?: number;
  height?: number;
}

interface SbProjectGalleryImage {
  src?: SbAsset;
  alt?: string;
  aspect?: "landscape" | "portrait" | "square";
}

interface SbProjectCredit {
  role?: string;
  name?: string;
}

interface SbProjectContent {
  project_index?: number;
  title?: string;
  year?: string;
  client?: string;
  category?: string;
  preview_image?: SbAsset;
  hero_image?: SbAsset;
  challenge?: string;
  solution?: string;
  tags?: string[];
  collage_images?: SbProjectCollageImage[];
  images?: SbProjectGalleryImage[];
  credits?: SbProjectCredit[];
}

interface SbStory<T> {
  slug: string;
  content: T;
}

// =============================
// Tipus de sortida (site config)
// =============================

export interface SiteConfig {
  studioName: string;
  studioTagline: string;
  heroManifesto: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  heroSubtext: string;
  nav: {
    index: string;
    about: string;
    contact: string;
  };
  about: {
    headline: string;
    body: string;
    services: string[];
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    photographUrl: string;
    photographAlt: string;
  };
}

// =============================
// Valors per defecte (fallback si Storyblok falla)
// =============================

const defaultSiteConfig: SiteConfig = {
  studioName: "ATELIER",
  studioTagline: "",
  heroManifesto: { line1: "", line2: "", line3: "", line4: "" },
  heroSubtext: "",
  nav: { index: "INDEX", about: "ABOUT", contact: "CONTACT" },
  about: {
    headline: "",
    body: "",
    services: [],
    contact: { email: "", phone: "", location: "" },
    photographUrl: "",
    photographAlt: "",
  },
};

// =============================
// Transformadors
// =============================

function assetToUrl(asset: SbAsset | undefined): string {
  return asset?.filename || "";
}

function transformHomeStory(
  content: { body?: SbBodyBlock[] } | undefined
): SiteConfig {
  if (!content?.body) return defaultSiteConfig;

  const hero = content.body.find((b) => b.component === "hero") as
    | SbHeroBlock
    | undefined;
  const about = content.body.find((b) => b.component === "about") as
    | SbAboutBlock
    | undefined;

  return {
    studioName: "ATELIER",
    studioTagline: hero?.studio_tagline || "",
    heroManifesto: {
      line1: hero?.line_1 || "",
      line2: hero?.line_2 || "",
      line3: hero?.line_3 || "",
      line4: hero?.line_4 || "",
    },
    heroSubtext: hero?.subtext || "",
    nav: { index: "INDEX", about: "ABOUT", contact: "CONTACT" },
    about: {
      headline: about?.headline || "",
      body: about?.body || "",
      services: about?.services || [],
      contact: {
        email: about?.email || "",
        phone: about?.phone || "",
        location: about?.location || "",
      },
      photographUrl: assetToUrl(about?.photograph),
      photographAlt: about?.photograph_alt || "",
    },
  };
}

function transformProjectStory(story: SbStory<SbProjectContent>): Project {
  const c = story.content;
  return {
    id: story.slug,
    index: c.project_index || 0,
    title: c.title || "",
    year: c.year || "",
    client: c.client || "",
    category: c.category || "",
    previewImage: assetToUrl(c.preview_image),
    heroImage: assetToUrl(c.hero_image),
    challenge: c.challenge || "",
    solution: c.solution || "",
    tags: c.tags || [],
    collageImages: (c.collage_images || []).map((img) => ({
      src: assetToUrl(img.src),
      alt: img.alt || "",
      position: img.position || "secondary",
      width: img.width || 200,
      height: img.height || 200,
    })),
    images: (c.images || []).map((img) => ({
      src: assetToUrl(img.src),
      alt: img.alt || "",
      aspect: img.aspect || "landscape",
    })),
    credits: (c.credits || []).map((cr) => ({
      role: cr.role || "",
      name: cr.name || "",
    })),
  };
}

// =============================
// Hooks
// =============================

export function useSiteConfig(): { siteConfig: SiteConfig; loading: boolean } {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = getStoryblokApi();
    api
      .get("cdn/stories/home", { version: "draft" })
      .then((res) => {
        setSiteConfig(transformHomeStory(res.data.story.content));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading home story:", err);
        setLoading(false);
      });
  }, []);

  return { siteConfig, loading };
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = getStoryblokApi();
    api
      .get("cdn/stories", {
        version: "draft",
        starts_with: "projects/",
        content_type: "project",
      })
      .then((res) => {
        const stories = res.data.stories as SbStory<SbProjectContent>[];
        const transformed = stories
          .map(transformProjectStory)
          .sort((a, b) => a.index - b.index);
        setProjects(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}

export function useProject(slug: string | undefined): {
  project: Project | null;
  loading: boolean;
} {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const api = getStoryblokApi();
    api
      .get(`cdn/stories/projects/${slug}`, { version: "draft" })
      .then((res) => {
        setProject(transformProjectStory(res.data.story));
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading project ${slug}:`, err);
        setLoading(false);
      });
  }, [slug]);

  return { project, loading };
}