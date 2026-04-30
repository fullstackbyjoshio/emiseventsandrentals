import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import GoldStar from '../components/GoldStar'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Flowing section - elements reveal as they enter viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.5,
      },
    })

    tl.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' }
    )

    tl.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.1
    )

    tl.fromTo(
      contactRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' },
      0.2
    )

    return () => {
      tl.kill()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create WhatsApp message
    const text = encodeURIComponent(
      `🎉 NEW BOOKING INQUIRY - Emis Events & Rentals\n\n` +
        `👤 Name: ${formData.name}\n` +
        `📧 Email: ${formData.email}\n` +
        `📅 Event Date: ${formData.eventDate}\n\n` +
        `💬 Message:\n${formData.message}\n\n` +
        `📅 Submitted: ${new Date().toLocaleString()}`
    )

    // Simulate brief loading then open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/2348146056321?text=${text}`, '_blank')
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', eventDate: '', message: '' })
    }, 500)
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-plum py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <GoldStar size={20} className="mx-auto mb-6" />
          <h2 className="font-display text-h1 text-white mb-4">
            Ready when you are.
          </h2>
          <p className="font-body text-body-lg text-white/70 max-w-lg mx-auto">
            Share a few details. We'll reply within one business day.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {submitted ? (
              <div className="bg-white/10 rounded-lg p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-whatsapp" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white mb-2">Message Sent!</h3>
                <p className="font-body text-sm text-white/70">
                  We've opened WhatsApp for you. Send the message to complete your inquiry.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-body text-sm text-gold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg font-body text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg font-body text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg font-body text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs uppercase tracking-wider text-white/60 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg font-body text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-plum font-body font-semibold rounded-full hover:bg-gold/90 transition-all hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-plum border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send inquiry
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={contactRef} className="lg:pl-8">
            <h3 className="font-body text-xs uppercase tracking-wider text-gold mb-6">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <a
                href="tel:+2348131303059"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">Phone</p>
                  <p className="font-body text-white group-hover:text-gold transition-colors">
                    +234 813 130 3059
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/2348146056321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp/20 transition-colors">
                  <svg className="w-5 h-5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">WhatsApp</p>
                  <p className="font-body text-white group-hover:text-whatsapp transition-colors">
                    +234 814 605 6321
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">Location</p>
                  <p className="font-body text-white">
                    New Market, Ilisan Remo,<br />Ogun State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">Business Hours</p>
                  <p className="font-body text-white">
                    8:00 AM - 9:00 PM Daily
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <h4 className="font-body text-xs uppercase tracking-wider text-white/60 mb-4">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Rentals', 'Styling', 'Process', 'FAQ'].map((link) => (
                  <span
                    key={link}
                    className="px-4 py-2 bg-white/10 rounded-full font-body text-sm text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
