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
    region: "eu",
  },
  bridge: true, // activa el Visual Editor
  components: {
    // de moment buit
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="atelier-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)