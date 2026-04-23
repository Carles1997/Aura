import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import EditorialSpread from "@/components/EditorialSpread"
import { siteConfig, projects } from "@/data/content"

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease },
  },
}

export default function HomePage() {
  const indexRef = useRef(null)
  const indexInView = useInView(indexRef, { once: true, margin: "-80px" })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ——— HERO SECTION ——— */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        {/* Línia vertical decorativa */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
          className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-border origin-top hidden md:block opacity-50"
        />

        <div className="max-w-5xl mx-auto w-full text-center py-24 md:py-32">
          {/* Label Superior (Més petit) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-12 opacity-50"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {siteConfig.studioTagline}
          </motion.p>

          {/* ——— MANIFESTO (MIDA REDUÏDA I COMPACTA) ——— */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-0"
          >
            {[
              siteConfig.heroManifesto.line1,
              siteConfig.heroManifesto.line2,
              siteConfig.heroManifesto.line3,
              siteConfig.heroManifesto.line4,
            ].map((line, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="overflow-visible" 
              >
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-normal leading-[0.92] tracking-tighter"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: i % 2 === 1 ? "italic" : "normal",
                  }}
                >
                  {line}
                </h1>
              </motion.div>
            ))}
          </motion.div>

          {/* ——— SUBTÍTOL (MÉS PETIT I LLEGIBLE) ——— */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="mt-14 text-[11px] md:text-[12px] tracking-[0.15em] uppercase font-light opacity-60 max-w-[420px] mx-auto text-center leading-[1.8]"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {siteConfig.heroSubtext}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="text-[8px] tracking-[0.35em] uppercase text-muted-foreground opacity-40"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Selected Works
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-border opacity-30"
          />
        </motion.div>
      </section>

      {/* ——— PROJECT LIST ——— */}
      <section ref={indexRef} className="bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={indexInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-10 py-10 md:py-12 flex items-center justify-between border-b border-border"
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Portfolio — {projects.length} Case Studies
          </span>
          <span
            className="hidden md:block text-[9px] tracking-[0.2em] uppercase text-muted-foreground opacity-30"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Archives 2026
          </span>
        </motion.div>

        <div className="divide-y divide-border/5">
          {projects.map((project, idx) => (
            <EditorialSpread
              key={project.id}
              project={project}
              isFlipped={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}