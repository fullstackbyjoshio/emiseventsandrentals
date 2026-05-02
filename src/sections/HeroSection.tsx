import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import GoldStar from '../components/GoldStar'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const headlineRefs = useRef<HTMLDivElement[]>([])
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  // Entrance animation (auto-play on load)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 }) // Wait for loading screen

    // Image slides in from left
    tl.fromTo(
      imageRef.current,
      { x: '-12vw', opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // Gold rule draws in
    tl.fromTo(
      ruleRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.6'
    )

    // Eyebrow fades in
    tl.fromTo(
      eyebrowRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    // Headline lines stagger in
    headlineRefs.current.forEach((line, i) => {
      if (line) {
        tl.fromTo(
          line,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          `-=${0.72 - i * 0.08}`
        )
      }
    })

    // Body text fades in
    tl.fromTo(
      bodyRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    // CTA fades in
    tl.fromTo(
      ctaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    // Star fades in
    tl.fromTo(
      starRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  // Scroll-driven effects (parallax and fade out)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })

    // Parallax for the image as you scroll
    scrollTl.to(
      imageRef.current,
      { y: '10vh', ease: 'none' },
      0
    )

    // Fade out elements as they leave the top
    scrollTl.to(
      [ruleRef.current, eyebrowRef.current, ...headlineRefs.current, bodyRef.current, ctaRef.current, starRef.current],
      { opacity: 0, y: -20, stagger: 0.02, ease: 'none' },
      0.2
    )

    return () => {
      scrollTl.kill()
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === section)
        .forEach(st => st.kill())
    }
  }, [])


  const headlineLines = ['Your', 'Event,', 'Our Commitment', 'to Perfection.']

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-ivory z-10"
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Image Panel */}
        <div
          ref={imageRef}
          className="relative w-full lg:w-1/2 h-[45vh] lg:h-full overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/hero_archway.jpg"
            alt="Luxury event venue"
            className="w-full h-full object-cover"
          />
          <div className="vignette-overlay" />
        </div>

        {/* Right Text Panel */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-[6vw] py-8 lg:py-0">
          {/* Gold Rule */}
          <div
            ref={ruleRef}
            className="gold-rule w-24 mb-6"
            style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
          />

          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="label-upper text-text-muted mb-4 block"
            style={{ opacity: 0 }}
          >
            Luxury Event Rentals
          </span>

          {/* Headline */}
          <div className="mb-6 lg:mb-8">
            {headlineLines.map((line, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) headlineRefs.current[i] = el
                }}
                className="font-display text-hero text-text-primary leading-[1.05]"
                style={{ opacity: 0 }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Body */}
          <p
            ref={bodyRef}
            className="font-body text-body-lg text-text-muted max-w-md mb-8 leading-relaxed"
            style={{ opacity: 0 }}
          >
            From intimate gatherings to grand celebrations, we provide curated rentals, 
            thoughtful design, and seamless service—so you can be present for every moment.
          </p>

          {/* CTA Row */}
          <div ref={ctaRef} className="flex items-center gap-6" style={{ opacity: 0 }}>
            <a
              href="https://wa.me/2348146056321?text=Hello%20Emis%20Events!%20I%27d%20like%20to%20plan%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-plum text-white font-body text-sm font-medium rounded-full hover:bg-plum/90 transition-all hover:shadow-plum hover:scale-[1.02]"
            >
              Plan your event
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/inventory"
              className="font-body text-sm text-text-primary hover:text-plum transition-colors relative group"
            >
              Explore rentals
              <span className="absolute -bottom-1 left-0 w-full h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </div>

          {/* Decorative Star */}
          <div
            ref={starRef}
            className="absolute bottom-[8vh] right-[6vw] hidden lg:block"
            style={{ opacity: 0 }}
          >
            <GoldStar size={18} />
          </div>
        </div>
      </div>
    </section>
  )
}
