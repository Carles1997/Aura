import { useEffect } from 'react'
// @ts-ignore
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Pugem el lerp per a una resposta més immediata (0.15 - 0.2 és el punt "sport")
      lerp: 0.15, 
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      // Aquesta opció ajuda a que la sincronització sigui total
      syncTouch: true, 
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}