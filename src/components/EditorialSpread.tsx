import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/content"
import ImageCollage from "./ImageCollage"

interface EditorialSpreadProps {
  project: Project
  isFlipped: boolean
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function EditorialSpread({
  project,
  isFlipped,
}: EditorialSpreadProps) {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-150px" })
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/project/${project.id}`)
  }

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 md:py-48 lg:py-56 px-6 md:px-10 border-b border-border group cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`View project: ${project.title}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Alternating grid layout */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center transition-opacity duration-300 group-hover:opacity-80`}
        >
          {/* Left side — Text or Images (alternates) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0, ease }}
            className={isFlipped ? "md:col-span-1 md:order-2" : ""}
          >
            <div className="space-y-6">
              {/* Project number + title */}
              <div className="space-y-3">
                <p
                  className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {String(project.index).padStart(2, "0")} —{" "}
                  {project.category.split("/")[0].trim()}
                </p>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                  }}
                >
                  {project.title}
                </h2>
              </div>

              {/* Meta info */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-[10px] tracking-wider">
                <div style={{ fontFamily: "var(--font-space-mono)" }}>
                  <p className="text-muted-foreground uppercase">Year</p>
                  <p className="text-foreground font-medium">{project.year}</p>
                </div>
                <div style={{ fontFamily: "var(--font-space-mono)" }}>
                  <p className="text-muted-foreground uppercase">Client</p>
                  <p className="text-foreground font-medium">{project.client}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <div
                  className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-foreground group-hover:gap-4 transition-all duration-300"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  View Project
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side — Images or Text (alternates) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15, ease }}
            className={isFlipped ? "md:col-span-1 md:order-1" : ""}
          >
            <ImageCollage images={project.collageImages} isFlipped={isFlipped} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
