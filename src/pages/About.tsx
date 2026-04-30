import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Users, Calendar, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Calendar, value: '500+', label: 'Events Styled' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: Award, value: '50+', label: 'Rental Items' },
  { icon: MapPin, value: '36', label: 'States Covered' },
]

const values = [
  {
    title: 'Quality First',
    description: 'Every piece in our inventory is carefully inspected, cleaned, and maintained to ensure it meets our premium standards.',
  },
  {
    title: 'Personalized Service',
    description: 'We treat every event as unique. Our team works closely with you to understand your vision and bring it to life.',
  },
  {
    title: 'Reliability',
    description: 'On-time delivery, professional setup, and clear communication. We keep our promises so you can focus on your celebration.',
  },
  {
    title: 'Community Focus',
    description: "We're proud to serve Ogun State and beyond, supporting local events and building lasting relationships with our clients.",
  },
]

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        storyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.value-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="label-upper text-text-muted mb-4 block">Our Story</span>
          <h1 className="font-display text-h1 text-text-primary mb-4">About Emis Events</h1>
          <p className="font-body text-body-lg text-text-muted max-w-2xl">
            Your trusted partner for luxury event rentals and styling in Ogun State and beyond.
          </p>
        </div>

        {/* Story Section */}
        <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src="/hero_archway.jpg"
              alt="Emis Events"
              className="w-full h-full object-cover"
            />
            <div className="vignette-overlay" />
          </div>
          <div>
            <span className="label-upper text-gold mb-4 block">Our Story</span>
            <h2 className="font-display text-h2 text-text-primary mb-6">
              Creating Unforgettable Moments
            </h2>
            <div className="space-y-4 font-body text-body text-text-muted leading-relaxed">
              <p>
                Emis Events and Rentals was founded with a simple mission: to make every event 
                extraordinary. Based in Ilisan Remo, Ogun State, we started as a small rental 
                service and have grown into a full-service event styling and rental company 
                serving clients across Nigeria.
              </p>
              <p>
                Our name carries our promise — <em className="text-text-primary">"Oluwa loni glory"</em> 
                (God owns the glory) — reflecting our commitment to excellence and our gratitude 
                for every event we're privileged to be part of.
              </p>
              <p>
                We believe that every detail matters. From the curve of a champagne flute to 
                the drape of a tablecloth, we curate each element with intention and care. 
                Our inventory combines timeless elegance with modern sophistication, ensuring 
                your event feels both classic and contemporary.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item bg-white rounded-xl p-6 text-center shadow-card"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-plum/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-plum" />
              </div>
              <div className="font-display text-3xl text-plum mb-1">{stat.value}</div>
              <div className="font-body text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div ref={valuesRef}>
          <div className="text-center mb-12">
            <span className="label-upper text-text-muted mb-4 block">What We Stand For</span>
            <h2 className="font-display text-h2 text-text-primary">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <h3 className="font-display text-xl text-text-primary mb-3">{value.title}</h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-24 bg-white rounded-2xl overflow-hidden shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <span className="label-upper text-gold mb-4 block">Find Us</span>
              <h2 className="font-display text-h2 text-text-primary mb-6">Visit Our Showroom</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-plum" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-text-primary">Address</p>
                    <p className="font-body text-sm text-text-muted">
                      New Market, Ilisan Remo,<br />Ogun State, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-plum" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-text-primary">Business Hours</p>
                    <p className="font-body text-sm text-text-muted">
                      8:00 AM - 9:00 PM Daily
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[300px] bg-plum/5">
              {/* Map placeholder - styled to look like a map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-plum mx-auto mb-4" />
                  <p className="font-body text-text-muted">
                    New Market, Ilisan Remo<br />
                    Ogun State, Nigeria
                  </p>
                  <a
                    href="https://www.google.com/maps/search/New+Market,+Ilisan+Remo,+Ogun+State"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-plum text-white font-body text-sm font-medium rounded-full hover:bg-plum/90 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
