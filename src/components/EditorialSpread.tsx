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
  const inView = useInView(containerRef, { once: true, margin: "-50px" })
  const navigate = useNavigate()

  return (
    <motion.section
      ref={containerRef}
      /* ESPAIAT MÍNIM: py-4 a py-10 per a un look súper compacte */
      className="relative py-4 md:py-8 lg:py-10 px-6 md:px-10 border-b border-border group cursor-pointer overflow-hidden"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
          
          {/* Bloc de Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className={`md:col-span-5 ${isFlipped ? "md:order-2 md:col-start-8" : "md:col-start-1"}`}
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground font-mono">
                  {String(project.index).padStart(2, "0")} — {project.category.split("/")[0]}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight italic leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  {project.title}
                </h2>
              </div>

              <div className="flex gap-8 text-[9px] uppercase tracking-widest font-mono">
                <div>
                  <p className="text-muted-foreground mb-0.5 text-[7px]">Year</p>
                  <p className="text-foreground">{project.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5 text-[7px]">Client</p>
                  <p className="text-foreground">{project.client}</p>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] font-mono opacity-0 group-hover:opacity-100 group-hover:gap-4 transition-all duration-500">
                View Project <ArrowRight size={10} />
              </div>
            </div>
          </motion.div>

          {/* Bloc de Fotos */}
          <div className={`md:col-span-6 ${isFlipped ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
            <ImageCollage images={project.collageImages} isFlipped={isFlipped} />
          </div>

        </div>
      </div>
    </motion.section>
  )
}