import { useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { projects } from "@/data/content"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const project = projects.find((p) => p.id === id)
  const currentIndex = projects.findIndex((p) => p.id === id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) return null

  const metaStyle = "font-mono text-[9px] uppercase tracking-[0.3em] opacity-50"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-6 md:px-10 max-w-[1800px] mx-auto pt-20 md:pt-28">
        
        {/* ——— HEADER COMPACTE ——— */}
        <header className="mb-8 md:mb-12"> {/* Reduït de 120px a un marge molt més discret */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className={`${metaStyle} flex items-center gap-2 hover:opacity-100 transition-opacity mb-8`}
          >
            <ArrowLeft size={10} /> Back to index
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-normal tracking-tighter leading-[0.8] mb-12"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            {project.title}
          </motion.h1>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-border font-mono text-[9px] uppercase tracking-[0.2em]"
          >
            <div><p className="opacity-50 mb-1 italic">Year</p><p>{project.year}</p></div>
            <div><p className="opacity-50 mb-1 italic">Client</p><p>{project.client}</p></div>
            <div><p className="opacity-50 mb-1 italic">Category</p><p>{project.category}</p></div>
            <div><p className="opacity-50 mb-1 italic">Role</p><p>Art Direction</p></div>
          </motion.div>
        </header>

        {/* ——— SECCIÓ SPLIT 50/50 COMPACTA ——— */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border mb-[var(--section-gap)]">
          {/* Esquerra: Imatge amb menys padding vertical */}
          <div className="py-12 md:py-16 md:pr-10 flex items-center justify-center">
            <AnimatedSection className="w-full max-w-sm">
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-secondary/5 outline outline-[0.5px] outline-black/[0.07]">
                <img src={project.collageImages[0]?.src || project.heroImage} className="w-full h-full object-cover grayscale" />
              </div>
            </AnimatedSection>
          </div>

          {/* Dreta: Text amb menys padding i línia vertical */}
          <div className="py-12 md:py-16 md:pl-10 md:border-l border-border flex flex-col justify-center">
            <AnimatedSection delay={0.2} className="w-full max-w-sm">
              <div className="space-y-6">
                <p className={metaStyle}>Concept</p>
                <p className="text-base md:text-lg leading-relaxed font-light text-foreground/80 italic">
                  {project.challenge}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ——— GALERIA ——— */}
        <section className="mb-20"> 
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-[var(--section-gap)] items-center">
            {project.images.slice(1).map((img, idx) => {
              let colClasses = idx % 2 === 0 ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8"
              return (
                <AnimatedSection key={idx} className={colClasses}>
                  <div className="overflow-hidden bg-secondary/5 outline outline-[0.5px] outline-black/[0.07]">
                    <img src={img.src} alt={img.alt} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" />
                  </div>
                  {img.alt && <p className={`mt-6 ${metaStyle} lowercase`}>{img.alt}</p>}
                </AnimatedSection>
              )
            })}
          </div>
        </section>

        {/* ——— NAVEGACIÓ FINAL ——— */}
        <nav className="border-t border-border">
          <div className="grid grid-cols-2 divide-x divide-border font-mono text-[9px] uppercase tracking-[0.3em]">
            <Link to={prevProject ? `/project/${prevProject.id}` : "/"} className="py-8 hover:bg-black/[0.02] transition-colors group px-4">
              <span className="opacity-40 italic block mb-2">Previous</span>
              <span className="font-normal">{prevProject?.title || "Index"}</span>
            </Link>
            <Link to={nextProject ? `/project/${nextProject.id}` : "/"} className="py-8 hover:bg-black/[0.02] transition-colors group text-right px-4">
              <span className="opacity-40 italic block mb-2">Next</span>
              <span className="font-normal">{nextProject?.title || "Index"}</span>
            </Link>
          </div>
        </nav>

      </main>
      <Footer />
    </div>
  )
}