import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GoldStar from '../components/GoldStar'

gsap.registerPlugin(ScrollTrigger)

interface StatementSectionProps {
  headline: string
  subheadline: string
  image: string
  zIndex: number
}

export default function StatementSection({
  headline,
  subheadline,
  image,
  zIndex,
}: StatementSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
      },
    })

    // ENTRANCE (0% - 30%)
    // Image scale settles
    scrollTl.fromTo(
      imageContainerRef.current,
      { scale: 1.1 },
      { scale: 1, ease: 'none' },
      0
    )

    // Gold rule draws in
    scrollTl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'power2.out' },
      0.05
    )

    // Headline rises in
    scrollTl.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.1
    )

    // Subheadline rises in
    scrollTl.fromTo(
      subheadlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.15
    )

    // Star fades in
    scrollTl.fromTo(
      starRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
      0.2
    )

    // SETTLE (30% - 70%): elements hold position

    // EXIT (70% - 100%)
    scrollTl.fromTo(
      headlineRef.current,
      { y: 0, opacity: 1 },
      { y: '-26vh', opacity: 0, ease: 'power2.in' },
      0.7
    )

    scrollTl.fromTo(
      subheadlineRef.current,
      { y: 0, opacity: 1 },
      { y: '-20vh', opacity: 0, ease: 'power2.in' },
      0.72
    )

    scrollTl.fromTo(
      imageContainerRef.current,
      { x: 0, opacity: 1 },
      { x: '-10vw', opacity: 0.35, ease: 'power2.in' },
      0.7
    )

    scrollTl.fromTo(
      [ruleRef.current, starRef.current],
      { opacity: 1 },
      { opacity: 0, ease: 'power2.in' },
      0.75
    )

    return () => {
      scrollTl.kill()
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === section)
        .forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      {/* Full-bleed Image */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={image}
          alt="Event styling"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Gold Rule */}
        <div
          ref={ruleRef}
          className="gold-rule w-24 mb-8"
          style={{ transformOrigin: 'center' }}
        />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-h1 text-white max-w-4xl leading-tight text-balance"
        >
          {headline}
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="font-body text-body-lg text-white/80 max-w-2xl mt-6 leading-relaxed"
        >
          {subheadline}
        </p>

        {/* Star */}
        <div ref={starRef} className="mt-8">
          <GoldStar size={16} />
        </div>
      </div>
    </section>
  )
}
