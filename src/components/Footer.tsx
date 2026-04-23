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
  const inView = useInView(ref, { once: true, margin: "-20px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const photoRef = useRef(null)
  const photoInView = useInView(photoRef, { once: true, margin: "-50px" })
  const { about } = siteConfig

  return (
    <footer id="about" className="relative border-t border-black/10 bg-background">
      
      {/* ——— LÍNIA VERTICAL DEFINITIVA (Forçada) ——— */}
      {/* Utilitzem black/10 en comptes de border/10 per garantir visibilitat sobre el crema */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/10 hidden md:block z-30" />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] md:min-h-[450px] relative">
        
        {/* ——— ESQUERRA: FOTOGRAFIA ——— */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0 }}
          animate={photoInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease }}
          className="relative overflow-hidden h-[260px] md:h-auto"
        >
          <img
            src={about.photographUrl}
            alt={about.photographAlt}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
          <div className="absolute bottom-6 left-6 z-20">
            <p
              className="text-[8px] tracking-[0.4em] uppercase text-white/50"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {about.photographAlt}
            </p>
          </div>
        </motion.div>

        {/* ——— DRETA: CONTINGUT ——— */}
        <div className="flex flex-col justify-between p-6 md:p-10 lg:p-12 bg-[#f2f0eb] relative z-10">
          <div>
            <FadeItem delay={0}>
              <p
                className="text-[8px] tracking-[0.3em] uppercase text-foreground/40 mb-3 italic"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                The Studio
              </p>
            </FadeItem>

            <FadeItem delay={0.1}>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl leading-[0.9] tracking-tighter mb-6 text-foreground italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {about.headline}
              </h2>
            </FadeItem>

            <FadeItem delay={0.15}>
              <p
                className="text-[12px] leading-relaxed tracking-wide text-foreground/70 mb-10 max-w-[380px]"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {about.body}
              </p>
            </FadeItem>

            {/* ——— GRID D'INFORMACIÓ ——— */}
            <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-6">
              <FadeItem delay={0.2}>
                <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/30 mb-4 italic" style={{ fontFamily: "var(--font-space-mono)" }}>
                  Capabilities
                </p>
                <ul className="space-y-1.5">
                  {about.services.map((service, i) => (
                    <li
                      key={i}
                      className="text-[10px] tracking-[0.1em] uppercase text-foreground/80 font-light"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </FadeItem>

              <FadeItem delay={0.25}>
                <p className="text-[8px] tracking-[0.4em] uppercase text-foreground/30 mb-4 italic" style={{ fontFamily: "var(--font-space-mono)" }}>
                  Inquiries
                </p>
                <div className="space-y-4">
                  <a
                    href={`mailto:${about.contact.email}`}
                    className="block text-[10px] md:text-[11px] tracking-wider text-foreground hover:opacity-50 transition-opacity underline underline-offset-4 decoration-black/20"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {about.contact.email}
                  </a>
                  <p
                    className="text-[10px] md:text-[11px] leading-relaxed tracking-wider text-foreground/50 max-w-[160px]"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {about.contact.location}
                  </p>
                </div>
              </FadeItem>
            </div>
          </div>

          {/* ——— PEU DE PÀGINA FINAL ——— */}
          <FadeItem delay={0.3} className="mt-12">
            <div className="pt-6 border-t border-black/10 flex items-end justify-between">
              <Link
                to="/"
                className="group flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-foreground font-medium"
                style={{ fontFamily: "var(--font-space-mono)" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Index
                <ArrowRight
                  size={10}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] tracking-[0.4em] uppercase text-foreground/30" style={{ fontFamily: "var(--font-space-mono)" }}>
                  © {new Date().getFullYear()}
                </span>
                <span className="text-[8px] tracking-[0.4em] uppercase text-foreground/20" style={{ fontFamily: "var(--font-space-mono)" }}>
                  Rigor
                </span>
              </div>
            </div>
          </FadeItem>
        </div>
      </div>
    </footer>
  )
}