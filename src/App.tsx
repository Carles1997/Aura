import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import HomePage from "@/pages/HomePage"
import ProjectPage from "@/pages/ProjectPage"

export function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
