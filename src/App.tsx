import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import HomePage from "@/pages/HomePage"
import ProjectPage from "@/pages/ProjectPage"
import ScrollToTop from "@/components/ScrollToTop"
import SmoothScroll from "@/components/SmoothScroll" // <--- Importem el component de Lenis

export function App() {
  return (
    <BrowserRouter>
      {/* Embolcallem tot el contingut amb SmoothScroll per activar el suavitzat */}
      <SmoothScroll>
        
        {/* El vigilant del scroll per a canvis de ruta */}
        <ScrollToTop /> 
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </AnimatePresence>

      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App