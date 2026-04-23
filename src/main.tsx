import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { storyblokInit, apiPlugin } from "@storyblok/react"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

// ============================================
// STORYBLOK INITIALIZATION
// ============================================
storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu", // regió europea (coincideix amb el Space)
  },
  components: {
    // Aquí registrarem els components a mesura que els creem.
    // De moment està buit, hi afegirem Hero, About, Project, etc.
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="atelier-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)