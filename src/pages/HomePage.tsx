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
    transition: { staggerChildren: 0.07 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease },
  },
}

export default function HomePage() {
  const indexRef = useRef(null)
  const indexInView = useInView(indexRef, { once: true, margin: "-80px" })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ——— HERO ——— */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        {/* Vertical rule */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
          className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-border origin-top hidden md:block"
        />

        <div className="max-w-4xl mx-auto w-full text-center py-32">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-16"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {siteConfig.studioTagline}
          </motion.p>

          {/* Manifesto */}
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
              <motion.div key={i} variants={fadeUp} className="overflow-hidden">
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[0.95] tracking-tight text-foreground"
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

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="mt-14 text-[10px] tracking-[0.2em] uppercase text-muted-foreground max-w-xs mx-auto"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {siteConfig.heroSubtext}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Selected Works
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-border"
          />
        </motion.div>
      </section>

      {/* ——— EDITORIAL SPREADS ——— */}
      <section ref={indexRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={indexInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-10 py-12 md:py-16 flex items-center justify-between border-b border-border"
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Selected Works — {projects.length} Projects
          </span>
          <span
            className="hidden md:block text-[9px] tracking-[0.2em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            2022 — 2024
          </span>
        </motion.div>

        {/* Editorial spreads */}
        {projects.map((project, idx) => (
          <EditorialSpread
            key={project.id}
            project={project}
            isFlipped={idx % 2 === 1}
          />
        ))}
      </section>

      {/* ——— FOOTER ——— */}
      <Footer />
    </div>
  )
}
