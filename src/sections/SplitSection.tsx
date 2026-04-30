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
    const imageEnterX = isImageLeft ? '-55vw' : '55vw'
    const imageExitX = isImageLeft ? '-18vw' : '18vw'
    const headlineExitX = isImageLeft ? '18vw' : '-18vw'

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
    // Image slides in
    scrollTl.fromTo(
      imageEl,
      { x: imageEnterX, opacity: 0 },
      { x: 0, opacity: 1, ease: 'power2.out' },
      0
    )

    // Rule draws in
    scrollTl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'power2.out' },
      0.05
    )

    // Label fades in
    scrollTl.fromTo(
      labelRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.08
    )

    // Headline lines stagger in
    headlineRefs.current.forEach((line, i) => {
      if (line) {
        scrollTl.fromTo(
          line,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.1 + i * 0.03
        )
      }
    })

    // Body and CTA
    scrollTl.fromTo(
      bodyRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.2
    )

    scrollTl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.22
    )

    // Star
    scrollTl.fromTo(
      starRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'back.out(1.7)' },
      0.25
    )

    // SETTLE (30% - 70%): hold

    // EXIT (70% - 100%)
    scrollTl.fromTo(
      headlineRefs.current,
      { x: 0, opacity: 1 },
      { x: headlineExitX, opacity: 0, ease: 'power2.in' },
      0.7
    )

    scrollTl.fromTo(
      imageEl,
      { x: 0, opacity: 1 },
      { x: imageExitX, opacity: 0.35, ease: 'power2.in' },
      0.7
    )

    scrollTl.fromTo(
      [bodyRef.current, ctaRef.current],
      { y: 0, opacity: 1 },
      { y: '10vh', opacity: 0, ease: 'power2.in' },
      0.72
    )

    scrollTl.fromTo(
      [ruleRef.current, labelRef.current, starRef.current],
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
