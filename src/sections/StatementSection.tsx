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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Image scale settles
    tl.fromTo(
      imageContainerRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
      0
    )

    // Gold rule draws in
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.out' },
      0.3
    )

    // Headline rises in
    tl.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0.4
    )

    // Subheadline rises in
    tl.fromTo(
      subheadlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0.6
    )

    // Star fades in
    tl.fromTo(
      starRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      0.8
    )

    return () => {
      tl.kill()
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
          loading="lazy"
          width={1920}
          height={1080}
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