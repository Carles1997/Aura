import { motion } from "framer-motion"
import type { Project } from "@/data/content"

interface ImageCollageProps {
  images: Project["collageImages"]
  isFlipped?: boolean
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function ImageCollage({
  images,
  isFlipped = false,
}: ImageCollageProps) {
  if (!images || images.length === 0) return null

  const dominantImage = images.find((img) => img.position === "dominant")
  const secondaryImages = images.filter((img) => img.position === "secondary")

  // Animació de hover mantenint el zoom però sense ombres
  const hoverAnimation = {
    scale: 1.1,
    filter: "grayscale(0%)",
    zIndex: 50,
    transition: { 
      type: "spring" as const, 
      stiffness: 260, 
      damping: 20 
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.99, y: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "grayscale(100%)",
      transition: { duration: 0.8, ease },
    },
  }

  // Estil base per a totes les imatges: eliminem shadows i afegim outline fi
  const imageBaseStyle = "absolute overflow-hidden z-0 bg-secondary/20 cursor-pointer outline outline-[0.5px] outline-black/[0.07]"

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative w-full max-w-[420px] h-[280px]">
        
        {/* Imatge de Base */}
        {secondaryImages[0] && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={hoverAnimation}
            viewport={{ once: true }}
            className={imageBaseStyle}
            style={{
              width: "180px",
              height: "220px",
              right: isFlipped ? "auto" : "80px",
              left: isFlipped ? "80px" : "auto",
              top: "0",
            }}
          >
            <img
              src={secondaryImages[0].src}
              alt={secondaryImages[0].alt}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </motion.div>
        )}

        {/* Imatge Principal (Dominant) */}
        {dominantImage && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={hoverAnimation}
            viewport={{ once: true }}
            className={`${imageBaseStyle} z-10 bg-secondary/40`}
            style={{
              width: "240px",
              height: "180px",
              left: isFlipped ? "auto" : "0",
              right: isFlipped ? "0" : "auto",
              top: "50px",
            }}
          >
            <img
              src={dominantImage.src}
              alt={dominantImage.alt}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </motion.div>
        )}

        {/* Imatge de Detall */}
        {secondaryImages[1] && (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={hoverAnimation}
            viewport={{ once: true }}
            className={`${imageBaseStyle} z-20 bg-secondary/30`}
            style={{
              width: "140px",
              height: "140px",
              right: isFlipped ? "40px" : "0px",
              left: isFlipped ? "0px" : "40px",
              bottom: "10px",
            }}
          >
            <img
              src={secondaryImages[1].src}
              alt={secondaryImages[1].alt}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}