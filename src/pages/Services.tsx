import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Calendar, Palette, Package, Truck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Calendar,
    title: 'Event Coordination',
    description: 'We manage the logistics, timeline, and vendor coordination so you can focus on enjoying your event. From setup to breakdown, every detail is handled.',
    features: ['Timeline management', 'Vendor coordination', 'On-site supervision', 'Day-of coordination'],
  },
  {
    icon: Sparkles,
    title: 'Event Planning',
    description: 'Full-service planning from concept to execution. We help you define your vision, select the perfect venue, and create a cohesive experience.',
    features: ['Concept development', 'Budget planning', 'Venue selection', 'Guest management'],
  },
  {
    icon: Palette,
    title: 'Event Styling',
    description: 'Transform your space with our curated design approach. We create moodboards, select color palettes, and style every element to perfection.',
    features: ['Moodboard creation', 'Color palette design', 'Tablescape styling', 'Floral arrangements'],
  },
  {
    icon: Package,
    title: 'Equipment Rentals',
    description: 'Access our extensive inventory of premium event equipment. From tableware to decor, we have everything you need for a stunning event.',
    features: ['Tableware & linens', 'Chairs & tables', 'Decor & backdrops', 'Catering equipment'],
  },
  {
    icon: Truck,
    title: 'Delivery & Setup',
    description: 'We handle delivery, setup, and breakdown within Ogun State and nationwide. Our team ensures everything is perfectly placed and ready.',
    features: ['Ogun State delivery', 'Nationwide shipping', 'Professional setup', 'Post-event breakdown'],
  },
]

const processSteps = [
  { step: '01', title: 'Inquiry', description: 'Reach out via WhatsApp or phone to discuss your event needs.' },
  { step: '02', title: 'Consultation', description: 'We discuss your vision, budget, and requirements in detail.' },
  { step: '03', title: 'Proposal', description: 'Receive a customized plan with itemized pricing and timeline.' },
  { step: '04', title: 'Booking', description: 'Confirm your booking with payment and security deposit.' },
  { step: '05', title: 'Delivery & Setup', description: 'We deliver, set up, and style your event to perfection.' },
  { step: '06', title: 'Enjoy & Return', description: 'Enjoy your event. We handle pickup after the celebration.' },
]

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

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
        '.service-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 80%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={headerRef} className="mb-16">
          <span className="label-upper text-text-muted mb-4 block">What We Do</span>
          <h1 className="font-display text-h1 text-text-primary mb-4">Our Services</h1>
          <p className="font-body text-body-lg text-text-muted max-w-2xl">
            From intimate gatherings to grand celebrations, we provide end-to-end event solutions 
            that combine luxury rentals with expert styling and seamless coordination.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-plum/10 flex items-center justify-center mb-6 group-hover:bg-plum/20 transition-colors">
                <service.icon className="w-6 h-6 text-plum" />
              </div>
              <h3 className="font-display text-xl text-text-primary mb-3">{service.title}</h3>
              <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 font-body text-sm text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div ref={processRef} className="mb-24">
          <div className="text-center mb-12">
            <span className="label-upper text-text-muted mb-4 block">How It Works</span>
            <h2 className="font-display text-h2 text-text-primary">Our Process</h2>
          </div>

          <div className="relative">
            {/* Timeline Line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-plum/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step relative text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-plum flex items-center justify-center relative z-10">
                    <span className="font-display text-2xl text-gold">{step.step}</span>
                  </div>
                  <h4 className="font-display text-lg text-text-primary mb-2">{step.title}</h4>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="bg-plum rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="font-display text-h2 text-white mb-4">Ready to Plan Your Event?</h2>
          <p className="font-body text-body-lg text-white/70 max-w-xl mx-auto mb-8">
            Delivery within Ogun State: ₦60,000 - ₦90,000. 
            Setup/Breakdown Labor: ₦65,000 per hour. Security Deposit: 10% of total rental.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/2348146056321?text=Hello%20Emis%20Events!%20I%27d%20like%20to%20discuss%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-plum font-body font-semibold rounded-full hover:bg-gold/90 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-body font-semibold rounded-full hover:bg-white/20 transition-all"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
