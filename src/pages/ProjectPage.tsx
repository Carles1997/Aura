import { useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { projects } from "@/data/content"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
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
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Project not found
          </p>
          <Link
            to="/"
            className="text-[10px] tracking-[0.2em] uppercase text-foreground underline underline-offset-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Return to Index
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      {/* ——— HERO IMAGE ——— */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        className="relative w-full overflow-hidden"
        style={{ height: "85vh" }}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Hero text overlay */}
        <div className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[9px] tracking-[0.3em] uppercase text-white/60 mb-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            {String(project.index).padStart(2, "0")} / {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[0.95]"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            {project.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* ——— CONTENT ——— */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto">

        {/* Back button + meta bar */}
        <div className="flex items-center justify-between py-8 border-b border-border">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            <ArrowLeft
              size={10}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Index
          </button>
          <div className="flex items-center gap-6">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {project.year}
            </span>
            <span
              className="hidden md:block text-[9px] tracking-[0.2em] uppercase text-muted-foreground"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {project.client}
            </span>
          </div>
        </div>

        {/* Tags */}
        <AnimatedSection className="flex flex-wrap gap-3 py-8 border-b border-border">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground border border-border px-3 py-1.5"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {tag}
            </span>
          ))}
        </AnimatedSection>

        {/* Challenge + Solution — two-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 md:py-28">
          {/* The Challenge */}
          <AnimatedSection className="pr-0 md:pr-16 pb-16 md:pb-0 border-b md:border-b-0 md:border-r border-border">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-8"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              The Challenge
            </p>
            <p
              className="text-xl md:text-2xl font-normal leading-relaxed text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.challenge}
            </p>
          </AnimatedSection>

          {/* The Strategic Solution */}
          <AnimatedSection delay={0.15} className="pt-16 md:pt-0 pl-0 md:pl-16">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-8"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              The Strategic Solution
            </p>
            <p
              className="text-xl md:text-2xl font-normal leading-relaxed text-foreground"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              {project.solution}
            </p>
          </AnimatedSection>
        </div>

        {/* Image Grid — asymmetrical collage */}
        <div className="pb-24">
          <AnimatedSection className="mb-2">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-8"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              Visual Documentation
            </p>
          </AnimatedSection>

          {/* Grid layout varies by image count */}
          <div className="space-y-3">
            {/* First row — hero wide image */}
            {project.images[0] && (
              <AnimatedSection>
                <div className="overflow-hidden" style={{ height: "60vh" }}>
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8, ease }}
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <p
                  className="mt-2 text-[9px] tracking-[0.15em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {project.images[0].alt}
                </p>
              </AnimatedSection>
            )}

            {/* Second row — 60/40 split */}
            {project.images.length >= 3 && (
              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-5 gap-3" style={{ height: "50vh" }}>
                  <div className="col-span-3 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.8, ease }}
                      src={project.images[1].src}
                      alt={project.images[1].alt}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="col-span-2 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.8, ease }}
                      src={project.images[2].src}
                      alt={project.images[2].alt}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <p
                    className="flex-[3] text-[9px] tracking-[0.15em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {project.images[1].alt}
                  </p>
                  <p
                    className="flex-[2] text-[9px] tracking-[0.15em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {project.images[2].alt}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Third row — square offset */}
            {project.images[3] && (
              <AnimatedSection delay={0.15}>
                <div
                  className="grid grid-cols-3 gap-3"
                  style={{ height: "45vh" }}
                >
                  <div className="col-span-1 hidden md:block" />
                  <div className="col-span-3 md:col-span-2 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.8, ease }}
                      src={project.images[3].src}
                      alt={project.images[3].alt}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                <p
                  className="mt-2 ml-0 md:ml-[33.33%] text-[9px] tracking-[0.15em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {project.images[3].alt}
                </p>
              </AnimatedSection>
            )}
          </div>
        </div>

        {/* Credits */}
        <AnimatedSection className="border-t border-border py-12">
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Credits
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {project.credits.map((credit) => (
              <div key={credit.role}>
                <p
                  className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {credit.role}
                </p>
                <p
                  className="text-[11px] tracking-wider text-foreground mt-1"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {credit.name}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Prev / Next navigation */}
        <AnimatedSection className="border-t border-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            {/* Prev */}
            <div className="py-10 pr-8">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/project/${prevProject.id}`)}
                  className="group text-left w-full"
                >
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    <ArrowLeft size={9} />
                    Previous
                  </p>
                  <h3
                    className="text-lg md:text-2xl font-normal tracking-tight text-foreground transition-opacity duration-300 group-hover:opacity-50"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                    }}
                  >
                    {prevProject.title}
                  </h3>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="py-10 pl-8 text-right">
              {nextProject ? (
                <button
                  onClick={() => navigate(`/project/${nextProject.id}`)}
                  className="group text-right w-full"
                >
                  <p
                    className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center justify-end gap-2"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    Next
                    <ArrowRight size={9} />
                  </p>
                  <h3
                    className="text-lg md:text-2xl font-normal tracking-tight text-foreground transition-opacity duration-300 group-hover:opacity-50"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                    }}
                  >
                    {nextProject.title}
                  </h3>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}
