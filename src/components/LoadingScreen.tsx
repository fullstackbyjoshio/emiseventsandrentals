import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    // Logo fade in + scale
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    )

    // Progress bar fill
    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      '-=0.4'
    )

    // Hold briefly
    tl.to({}, { duration: 0.3 })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-ivory flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div ref={logoRef} className="text-center">
        <h1 className="font-display text-5xl md:text-6xl text-plum mb-2">EMIS</h1>
        <p className="font-body text-sm text-text-muted tracking-[0.2em] uppercase">
          Events & Rentals
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-48 h-px bg-plum/20 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-plum origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Tagline */}
      <p className="mt-6 font-body text-xs text-text-muted italic">
        Oluwa loni glory
      </p>
    </div>
  )
}
