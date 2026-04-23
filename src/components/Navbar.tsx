import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { siteConfig } from "@/data/content"

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 md:py-6"
      style={{ mixBlendMode: "normal" }}
    >
      {/* Studio wordmark */}
      <Link
        to="/"
        className="group flex items-center gap-3"
        aria-label="Home"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase text-foreground transition-opacity duration-300 group-hover:opacity-60"
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {siteConfig.studioName}
        </span>
        <span
          className="h-px w-6 bg-foreground/30 transition-all duration-500 group-hover:w-10 group-hover:bg-foreground"
        />
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className={`text-[10px] tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-100 ${
            isHome ? "opacity-100" : "opacity-40"
          }`}
          style={{ fontFamily: "var(--font-space-mono)" }}
        >
          {siteConfig.nav.index}
        </Link>
        <a
          href="#about"
          className="text-[10px] tracking-[0.25em] uppercase opacity-40 transition-opacity duration-300 hover:opacity-100"
          style={{ fontFamily: "var(--font-space-mono)" }}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {siteConfig.nav.about}
        </a>
      </nav>
    </motion.header>
  )
}
