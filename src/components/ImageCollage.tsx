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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative" style={{ width: "520px", height: "500px" }}>
        {/* Dominant image — large, left side */}
        {dominantImage && (
          <motion.div
            variants={imageVariants}
            className="absolute overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
            style={{
              width: dominantImage.width,
              height: dominantImage.height,
              left: isFlipped ? "160px" : "0",
              top: "10px",
            }}
          >
            <img
              src={dominantImage.src}
              alt={dominantImage.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Secondary images — smaller, offset stacking */}
        {secondaryImages[0] && (
          <motion.div
            variants={imageVariants}
            className="absolute overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
            style={{
              width: secondaryImages[0].width,
              height: secondaryImages[0].height,
              right: isFlipped ? "0" : "160px",
              top: "0",
            }}
          >
            <img
              src={secondaryImages[0].src}
              alt={secondaryImages[0].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Tertiary image — small square, bottom right offset */}
        {secondaryImages[1] && (
          <motion.div
            variants={imageVariants}
            className="absolute overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
            style={{
              width: secondaryImages[1].width,
              height: secondaryImages[1].height,
              right: isFlipped ? "40px" : "80px",
              bottom: "40px",
            }}
          >
            <img
              src={secondaryImages[1].src}
              alt={secondaryImages[1].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
