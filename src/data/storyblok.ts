// ============================================================
// STORYBLOK DATA BRIDGE
// ============================================================

import { useState, useEffect } from "react"
import { getStoryblokApi } from "@storyblok/react"
import type { Project } from "./content"

interface SbAsset {
  filename?: string
  alt?: string
}

interface SbHeroBlock {
  component: "hero"
  studio_tagline?: string
  line_1?: string
  line_2?: string
  line_3?: string
  line_4?: string
  subtext?: string
  scroll_indicator_text?: string
  portfolio_label?: string
  case_studies_label?: string
  archives_label?: string
  view_project_label?: string
}

interface SbAboutBlock {
  component: "about"
  headline?: string
  body?: string
  services?: string[]
  email?: string
  phone?: string
  location?: string
  photograph?: SbAsset
  photograph_alt?: string
  studio_label?: string
  capabilities_title?: string
  inquiries_title?: string
  index_label?: string
  footer_tagline?: string
  back_to_index?: string
  year_label?: string
  client_label?: string
  category_label?: string
  role_label?: string
  concept_label?: string
  previous_label?: string
  next_label?: string
}

type SbBodyBlock = SbHeroBlock | SbAboutBlock

interface SbProjectCollageImage {
  src?: SbAsset
  alt?: string
  position?: "dominant" | "secondary"
  width?: number
  height?: number
}

interface SbProjectGalleryImage {
  src?: SbAsset
  alt?: string
  aspect?: "landscape" | "portrait" | "square"
}

interface SbProjectCredit {
  role?: string
  name?: string
}

interface SbProjectContent {
  project_index?: number
  title?: string
  year?: string
  client?: string
  category?: string
  role?: string
  preview_image?: SbAsset
  hero_image?: SbAsset
  challenge?: string
  solution?: string
  tags?: string[]
  collage_images?: SbProjectCollageImage[]
  images?: SbProjectGalleryImage[]
  credits?: SbProjectCredit[]
}

interface SbStory<T> {
  slug: string
  id: number
  content: T
}

export interface SiteConfig {
  studioName: string
  studioTagline: string
  heroManifesto: {
    line1: string
    line2: string
    line3: string
    line4: string
  }
  heroSubtext: string
  scrollIndicatorText: string
  portfolioLabel: string
  caseStudiesLabel: string
  archivesLabel: string
  viewProjectLabel: string
  nav: {
    index: string
    about: string
    contact: string
  }
  about: {
    headline: string
    body: string
    services: string[]
    contact: {
      email: string
      phone: string
      location: string
    }
    photographUrl: string
    photographAlt: string
    studioLabel: string
    capabilitiesTitle: string
    inquiriesTitle: string
    indexLabel: string
    footerTagline: string
  }
  labels: {
    backToIndex: string
    yearLabel: string
    clientLabel: string
    categoryLabel: string
    roleLabel: string
    conceptLabel: string
    previousLabel: string
    nextLabel: string
  }
}

const defaultSiteConfig: SiteConfig = {
  studioName: "ATELIER",
  studioTagline: "",
  heroManifesto: { line1: "", line2: "", line3: "", line4: "" },
  heroSubtext: "",
  scrollIndicatorText: "Selected Works",
  portfolioLabel: "Portfolio",
  caseStudiesLabel: "Case Studies",
  archivesLabel: "Archives 2026",
  viewProjectLabel: "View Project",
  nav: { index: "INDEX", about: "ABOUT", contact: "CONTACT" },
  about: {
    headline: "",
    body: "",
    services: [],
    contact: { email: "", phone: "", location: "" },
    photographUrl: "",
    photographAlt: "",
    studioLabel: "The Studio",
    capabilitiesTitle: "Capabilities",
    inquiriesTitle: "Inquiries",
    indexLabel: "Index",
    footerTagline: "Rigor",
  },
  labels: {
    backToIndex: "Back to index",
    yearLabel: "Year",
    clientLabel: "Client",
    categoryLabel: "Category",
    roleLabel: "Role",
    conceptLabel: "Concept",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
}

function assetToUrl(asset: SbAsset | undefined): string {
  return asset?.filename || ""
}

function transformHomeStory(
  content: { body?: SbBodyBlock[] } | undefined
): SiteConfig {
  if (!content?.body) return defaultSiteConfig

  const hero = content.body.find((b) => b.component === "hero") as SbHeroBlock | undefined
  const about = content.body.find((b) => b.component === "about") as SbAboutBlock | undefined

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
    scrollIndicatorText: hero?.scroll_indicator_text || "Selected Works",
    portfolioLabel: hero?.portfolio_label || "Portfolio",
    caseStudiesLabel: hero?.case_studies_label || "Case Studies",
    archivesLabel: hero?.archives_label || "Archives 2026",
    viewProjectLabel: hero?.view_project_label || "View Project",
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
      studioLabel: about?.studio_label || "The Studio",
      capabilitiesTitle: about?.capabilities_title || "Capabilities",
      inquiriesTitle: about?.inquiries_title || "Inquiries",
      indexLabel: about?.index_label || "Index",
      footerTagline: about?.footer_tagline || "Rigor",
    },
    labels: {
      backToIndex: about?.back_to_index || "Back to index",
      yearLabel: about?.year_label || "Year",
      clientLabel: about?.client_label || "Client",
      categoryLabel: about?.category_label || "Category",
      roleLabel: about?.role_label || "Role",
      conceptLabel: about?.concept_label || "Concept",
      previousLabel: about?.previous_label || "Previous",
      nextLabel: about?.next_label || "Next",
    },
  }
}

function transformProjectStory(story: SbStory<SbProjectContent>): Project {
  const c = story.content
  return {
    id: story.slug,
    index: c.project_index || 0,
    title: c.title || "",
    year: c.year || "",
    client: c.client || "",
    category: c.category || "",
    role: c.role || "",
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
  }
}

type StoryblokBridgeInstance = {
  on: (events: string[], cb: () => void) => void
}

function getBridge(): StoryblokBridgeInstance | null {
  if (typeof window === "undefined") return null
  const win = window as unknown as {
    StoryblokBridge?: new (opts: { resolveRelations: string[] }) => StoryblokBridgeInstance
  }
  if (!win.StoryblokBridge) return null
  return new win.StoryblokBridge({ resolveRelations: [] })
}

export function useSiteConfig(): { siteConfig: SiteConfig; loading: boolean } {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig)
  const [loading, setLoading] = useState(true)

  const load = () => {
    const api = getStoryblokApi()
    api
      .get("cdn/stories/home", { version: "draft" })
      .then((res) => {
        setSiteConfig(transformHomeStory(res.data.story.content))
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading home story:", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
    const sb = getBridge()
    if (sb) sb.on(["published", "change", "input"], () => load())
  }, [])

  return { siteConfig, loading }
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    const api = getStoryblokApi()
    api
      .get("cdn/stories", {
        version: "draft",
        starts_with: "projects/",
        content_type: "project",
      })
      .then((res) => {
        const stories = res.data.stories as SbStory<SbProjectContent>[]
        const transformed = stories
          .map(transformProjectStory)
          .sort((a, b) => a.index - b.index)
        setProjects(transformed)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading projects:", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
    const sb = getBridge()
    if (sb) sb.on(["published", "change", "input"], () => load())
  }, [])

  return { projects, loading }
}

export function useProject(slug: string | undefined): {
  project: Project | null
  loading: boolean
} {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    if (!slug) return
    const api = getStoryblokApi()
    api
      .get(`cdn/stories/projects/${slug}`, { version: "draft" })
      .then((res) => {
        setProject(transformProjectStory(res.data.story))
        setLoading(false)
      })
      .catch((err) => {
        console.error(`Error loading project ${slug}:`, err)
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
    const sb = getBridge()
    if (sb) sb.on(["published", "change", "input"], () => load())
  }, [slug])

  return { project, loading }
}