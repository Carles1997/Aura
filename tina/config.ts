import { defineConfig } from "tinacms";

// La branca que editarà TinaCMS (main per defecte)
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ============================================
      // CONFIGURACIÓ DEL LLOC (Hero, About, Contact)
      // ============================================
      {
        name: "siteConfig",
        label: "Configuració del lloc",
        path: "content/site",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "studioName",
            label: "Nom de l'estudi",
            required: true,
          },
          {
            type: "string",
            name: "studioTagline",
            label: "Tagline de l'estudi",
          },

          // --- HERO ---
          {
            type: "object",
            name: "heroManifesto",
            label: "Hero — Manifest (4 línies)",
            fields: [
              { type: "string", name: "line1", label: "Línia 1" },
              { type: "string", name: "line2", label: "Línia 2" },
              { type: "string", name: "line3", label: "Línia 3" },
              { type: "string", name: "line4", label: "Línia 4" },
            ],
          },
          {
            type: "string",
            name: "heroSubtext",
            label: "Hero — Subtext",
            ui: { component: "textarea" },
          },

          // --- NAVIGATION ---
          {
            type: "object",
            name: "nav",
            label: "Navegació",
            fields: [
              { type: "string", name: "index", label: "Etiqueta Index" },
              { type: "string", name: "about", label: "Etiqueta About" },
              { type: "string", name: "contact", label: "Etiqueta Contact" },
            ],
          },

          // --- ABOUT ---
          {
            type: "object",
            name: "about",
            label: "Sobre nosaltres",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Titular",
              },
              {
                type: "string",
                name: "body",
                label: "Text principal",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "services",
                label: "Serveis",
                list: true,
              },
              {
                type: "object",
                name: "contact",
                label: "Contacte",
                fields: [
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "phone", label: "Telèfon" },
                  { type: "string", name: "location", label: "Ubicació" },
                ],
              },
              {
                type: "image",
                name: "photographUrl",
                label: "Fotografia",
              },
              {
                type: "string",
                name: "photographAlt",
                label: "Text alternatiu de la foto",
              },
            ],
          },
        ],
      },

      // ============================================
      // PROJECTES (un fitxer per projecte)
      // ============================================
      {
        name: "project",
        label: "Projectes",
        path: "content/projects",
        format: "json",
        fields: [
          
          {
            type: "number",
            name: "index",
            label: "Ordre (1, 2, 3...)",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Títol",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "year",
            label: "Any",
          },
          {
            type: "string",
            name: "client",
            label: "Client",
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
          },

          // --- IMATGES PRINCIPALS ---
          {
            type: "image",
            name: "previewImage",
            label: "Imatge de previsualització",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Imatge hero",
          },

          // --- TEXTOS ---
          {
            type: "string",
            name: "challenge",
            label: "Repte",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "solution",
            label: "Solució",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },

          // --- COLLAGE IMAGES ---
          {
            type: "object",
            name: "collageImages",
            label: "Imatges del collage (3 imatges)",
            list: true,
            fields: [
              { type: "image", name: "src", label: "Imatge" },
              { type: "string", name: "alt", label: "Text alternatiu" },
              {
                type: "string",
                name: "position",
                label: "Posició",
                options: ["dominant", "secondary"],
              },
              { type: "number", name: "width", label: "Amplada (px)" },
              { type: "number", name: "height", label: "Alçada (px)" },
            ],
          },

          // --- GALLERY IMAGES ---
          {
            type: "object",
            name: "images",
            label: "Galeria d'imatges",
            list: true,
            fields: [
              { type: "image", name: "src", label: "Imatge" },
              { type: "string", name: "alt", label: "Text alternatiu" },
              {
                type: "string",
                name: "aspect",
                label: "Format",
                options: ["landscape", "portrait", "square"],
              },
            ],
          },

          // --- CREDITS ---
          {
            type: "object",
            name: "credits",
            label: "Crèdits",
            list: true,
            fields: [
              { type: "string", name: "role", label: "Rol" },
              { type: "string", name: "name", label: "Nom" },
            ],
          },
        ],
      },
    ],
  },
});