import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import GoldStar from '../components/GoldStar'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface SplitSectionProps {
  label: string
  headline: string[]
  body: string
  cta: string
  ctaLink: string
  image: string
  imagePosition: 'left' | 'right'
  zIndex: number
}

export default function SplitSection({
  label,
  headline,
  body,
  cta,
  ctaLink,
  image,
  imagePosition,
  zIndex,
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRefs = useRef<HTMLDivElement[]>([])
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const imageEl = imageRef.current
    const isImageLeft = imagePosition === 'left'
    const imageEnterX = isImageLeft ? '-10vw' : '10vw'

    // Create a timeline for the entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // Start when top of section is 80% down the viewport
        toggleActions: 'play none none reverse', // Play on enter, reverse on leave back
      },
    })

    // Image slides in
    tl.fromTo(
      imageEl,
      { x: imageEnterX, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    )

    // Rule draws in
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.out' },
      0.2
    )

    // Label fades in
    tl.fromTo(
      labelRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.3
    )

    // Headline lines stagger in
    headlineRefs.current.forEach((line, i) => {
      if (line) {
        tl.fromTo(
          line,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.4 + i * 0.1
        )
      }
    })

    // Body and CTA
    tl.fromTo(
      [bodyRef.current, ctaRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
      0.6
    )

    // Star
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
  }, [imagePosition])


  const ImagePanel = (
    <div
      ref={imageRef}
      className="relative w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden"
    >
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover"
        loading="lazy"
        width={800}
        height={600}
      />
      <div className="vignette-overlay" />
    </div>
  )

  const TextPanel = (
    <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-[6vw] py-8 lg:py-0 bg-ivory">
      {/* Gold Rule */}
      <div
        ref={ruleRef}
        className="gold-rule w-16 mb-6"
        style={{ transformOrigin: 'left center' }}
      />

      {/* Label */}
      <span ref={labelRef} className="label-upper text-text-muted mb-4 block">
        {label}
      </span>

      {/* Headline */}
      <div className="mb-6">
        {headline.map((line, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) headlineRefs.current[i] = el
            }}
            className="font-display text-h1 text-text-primary leading-[1.1]"
          >
            {line}
          </div>
        ))}
      </div>

      {/* Body */}
      <p
        ref={bodyRef}
        className="font-body text-body text-text-muted max-w-md mb-8 leading-relaxed"
      >
        {body}
      </p>

      {/* CTA */}
      <div ref={ctaRef}>
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-text-primary hover:text-plum transition-colors group"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Star */}
      <div
        ref={starRef}
        className={`absolute bottom-[8vh] ${
          imagePosition === 'left' ? 'right-[6vw]' : 'right-[6vw]'
        } hidden lg:block`}
      >
        <GoldStar size={16} />
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {imagePosition === 'left' ? (
          <>
            {ImagePanel}
            {TextPanel}
          </>
        ) : (
          <>
            {TextPanel}
            {ImagePanel}
          </>
        )}
      </div>
    </section>
  )
}