import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { siteConfig } from "@/data/content"

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

function FadeItem({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const photoRef = useRef(null)
  const photoInView = useInView(photoRef, { once: true, margin: "-100px" })
  const { about } = siteConfig

  return (
    <footer id="about" className="relative border-t border-border">
      {/* Split-screen layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        {/* Left — Photograph */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0 }}
          animate={photoInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease }}
          className="relative overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          <img
            src={about.photographUrl}
            alt={about.photographAlt}
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply" />
          <div className="absolute bottom-6 left-6">
            <p
              className="text-[9px] tracking-[0.2em] uppercase text-white/60"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {about.photographAlt}
            </p>
          </div>
        </motion.div>

        {/* Right — Details */}
        <div className="flex flex-col justify-between p-10 md:p-14 lg:p-20">
          <div>
            <FadeItem delay={0}>
              <p
                className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                About the Studio
              </p>
            </FadeItem>

            <FadeItem delay={0.1}>
              <h2
                className="text-2xl md:text-3xl leading-tight mb-8 text-foreground"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                {about.headline}
              </h2>
            </FadeItem>

            <FadeItem delay={0.15}>
              <p
                className="text-[11px] leading-relaxed tracking-wider text-muted-foreground mb-10"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {about.body}
              </p>
            </FadeItem>

            <FadeItem delay={0.2}>
              <div className="mb-10">
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-4"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Services
                </p>
                <ul className="space-y-2">
                  {about.services.map((service, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[10px] tracking-[0.15em] uppercase text-foreground"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      <span className="w-4 h-px bg-border" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeItem>

            <FadeItem delay={0.25}>
              <div className="space-y-2">
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-4"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Contact
                </p>
                <a
                  href={`mailto:${about.contact.email}`}
                  className="block text-[10px] tracking-wider text-foreground hover:text-muted-foreground transition-colors"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {about.contact.email}
                </a>
                <p
                  className="text-[10px] tracking-wider text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {about.contact.location}
                </p>
              </div>
            </FadeItem>
          </div>

          {/* Bottom — View All Work link */}
          <FadeItem delay={0.3}>
            <div className="mt-14 pt-8 border-t border-border flex items-center justify-between">
              <Link
                to="/"
                className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-foreground hover:text-muted-foreground transition-colors"
                style={{ fontFamily: "var(--font-space-mono)" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                View All Work
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <span
                className="text-[9px] tracking-wider text-muted-foreground"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                © {new Date().getFullYear()} {siteConfig.studioName}
              </span>
            </div>
          </FadeItem>
        </div>
      </div>
    </footer>
  )
}
