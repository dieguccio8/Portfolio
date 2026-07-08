"use client"

/**
 * @author: @emerald-ui
 * @description: A 3D marquee component that rotates images in a 3D space.
 * @version: 1.0.0
 * @date: 2026-02-12
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
}

const defaultImages = [
  '/project-01/app/mobile/Dettagli pianta - 6.jpg',
  '/project-01/app/mobile/Home.jpg',
  '/project-01/app/mobile/Mappa.jpg',
  '/project-01/app/mobile/Ricerca piante.jpg',
  '/project-01/app/mobile/Scansione QR Code.jpg',
  '/project-01/app/mobile/Scelta percorso - Percorso breve.jpg',
  '/project-01/app/mobile/Scelta percorso - Percorso scoperta.jpg',
  '/project-01/app/mobile/Scelta percorso - Visualizzazione mappa.jpg',
]

const ThreeDMarquee = ({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) => {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      className={cn(
        'mx-auto block h-140 w-full overflow-hidden rounded-md max-xl:h-120 max-sm:h-100',
        className
      )}
    >
      <div className='flex size-full items-center justify-center'>
        <div className='aspect-square size-180 shrink-0 scale-135 max-xl:size-full max-xl:scale-110 max-sm:scale-130'>
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)' }}
            className='relative top-0 right-[-55%] grid size-full origin-top-left grid-cols-3 gap-5 transform-3d max-xl:-top-30 max-xl:right-[-45%] max-sm:top-0 max-sm:gap-2'
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{
                  y: colIndex % 2 === 0 ? ["-50%", "-33.333333%"] : ["-33.333333%", "-50%"]
                }}
                transition={{
                  duration: colIndex % 2 === 0 ? 40 : 50,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                key={colIndex + 'marquee'}
                className='flex flex-col items-start gap-5 max-sm:gap-2 w-full'
              >
                {Array(6).fill(subarray).flat().map((src, imageIndex) => (
                  <div className='relative w-full' key={imageIndex + src + colIndex}>
                    <img
                      className='aspect-[9/19.5] h-auto w-full rounded-2xl bg-neutral-100 object-cover select-none dark:bg-neutral-900 shadow-2xl'
                      src={src}
                      draggable={false}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarquee
