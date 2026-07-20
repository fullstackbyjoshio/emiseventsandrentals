import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { useToast } from '../components/Toast' // adjust path if your alias is different

gsap.registerPlugin(ScrollTrigger)

const eventTypes = [
  'Wedding', 'Corporate Event', 'Birthday Party', 'Baby Shower',
  'Graduation', 'Church Event', 'Traditional Wedding', 'Other',
]

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', eventType: '', eventDate: '',
    location: '', guestCount: '', itemsNeeded: '', delivery: false,
    setup: false, notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })
      gsap.fromTo(formRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      })
      gsap.fromTo(infoRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
      })
    })
    return () => ctx.revert()
  }, [])

  const resetForm = () => {
    setFormData({
      name: '', phone: '', email: '', eventType: '', eventDate: '',
      location: '', guestCount: '', itemsNeeded: '', delivery: false,
      setup: false, notes: '',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Missing information', 'Please fill in your name and phone number.')
      return
    }

    setIsSubmitting(true)
    toast.info('Preparing inquiry…', 'Opening WhatsApp with your event details.')

    const text = encodeURIComponent(
      `🎉 NEW BOOKING INQUIRY - Emis Events & Rentals\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email || 'Not provided'}\n\n` +
      `🎊 Event Details:\n` +
      `• Type: ${formData.eventType}\n` +
      `• Date: ${formData.eventDate}\n` +
      `• Location: ${formData.location}\n` +
      `• Guests: ${formData.guestCount}\n\n` +
      `🛒 Equipment Needed:\n${formData.itemsNeeded || 'To be discussed'}\n\n` +
      `🚚 Delivery: ${formData.delivery ? 'Yes' : 'No'}\n` +
      `🔧 Setup/Breakdown: ${formData.setup ? 'Yes' : 'No'}\n\n` +
      `💬 Additional Notes:\n${formData.notes || 'None'}\n\n` +
      `📅 Submitted: ${new Date().toLocaleString()}`
    )

    setTimeout(() => {
      window.open(`https://wa.me/2348146056321?text=${text}`, '_blank')
      setIsSubmitting(false)

      toast.success(
        'Inquiry sent!',
        "We've opened WhatsApp with your details. Send the message to complete your inquiry.",
        {
          duration: 6000,
          action: {
            label: 'Send another',
            onClick: () => {
              resetForm()
              toast.info('Form reset', 'You can now send a new inquiry.')
            },
          },
        }
      )

      resetForm()
    }, 800)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Emis Events and Rentals - Ogun State, Nigeria</title>
        <meta name="description" content="Get in touch with Emis Events and Rentals for event rentals, styling, and coordination in Ilisan Remo, Ogun State, Nigeria. WhatsApp, phone, or inquiry form." />
        <meta name="keywords" content="contact event rentals, book event styling, Ogun State event planner, wedding rental inquiry, party rental booking Nigeria" />
        <link rel="canonical" href="https://emiseventsandrentals.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Emis Events and Rentals - Ogun State, Nigeria" />
        <meta property="og:description" content="Get in touch with Emis Events and Rentals for event rentals, styling, and coordination in Ilisan Remo, Ogun State, Nigeria." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emiseventsandrentals.com/contact" />
        <meta property="og:image" content="https://emiseventsandrentals.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Emis Events and Rentals - Ogun State, Nigeria" />
        <meta name="twitter:description" content="Get in touch with Emis Events and Rentals for event rentals, styling, and coordination in Ilisan Remo, Ogun State, Nigeria." />
        <meta name="twitter:image" content="https://emiseventsandrentals.com/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-ivory pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <span className="label-upper text-text-muted mb-4 block">Get in Touch</span>
            <h1 className="font-display text-h1 text-text-primary mb-4">Contact Us</h1>
            <p className="font-body text-body-lg text-text-muted max-w-2xl">
              Ready to plan your perfect event? Reach out to us via WhatsApp, phone, or fill out
              the form below. We typically respond within hours during business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-card">
                <h2 className="font-display text-xl text-text-primary mb-6">Event Inquiry Form</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors"
                      placeholder="+234..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary focus:outline-none focus:border-plum transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary focus:outline-none focus:border-plum transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Event Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                      Estimated Guest Count
                    </label>
                    <input
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors"
                      placeholder="Number of guests"
                    />
                  </div>
                  <div className="flex items-center gap-6 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.delivery}
                        onChange={(e) => setFormData({ ...formData, delivery: e.target.checked })}
                        className="w-5 h-5 rounded border-border text-plum focus:ring-plum"
                      />
                      <span className="font-body text-sm text-text-primary">Delivery Needed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.setup}
                        onChange={(e) => setFormData({ ...formData, setup: e.target.checked })}
                        className="w-5 h-5 rounded border-border text-plum focus:ring-plum"
                      />
                      <span className="font-body text-sm text-text-primary">Setup Needed</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                    Items Needed
                  </label>
                  <textarea
                    rows={3}
                    value={formData.itemsNeeded}
                    onChange={(e) => setFormData({ ...formData, itemsNeeded: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors resize-none"
                    placeholder="List the items you're interested in renting..."
                  />
                </div>

                <div className="mb-8">
                  <label className="block font-body text-xs uppercase tracking-wider text-text-muted mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-lg font-body text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-plum transition-colors resize-none"
                    placeholder="Any special requests or details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-plum text-white font-body font-semibold rounded-full hover:bg-plum/90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send via WhatsApp
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div ref={infoRef} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-lg text-text-primary mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="tel:+2348131303059" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center group-hover:bg-plum/20 transition-colors">
                      <Phone className="w-5 h-5 text-plum" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted">Phone</p>
                      <p className="font-body text-sm text-text-primary group-hover:text-plum transition-colors">
                        +234 813 130 3059
                      </p>
                    </div>
                  </a>

                  <a href="https://wa.me/2348146056321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-whatsapp/10 flex items-center justify-center group-hover:bg-whatsapp/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-whatsapp" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted">WhatsApp</p>
                      <p className="font-body text-sm text-text-primary group-hover:text-whatsapp transition-colors">
                        +234 814 605 6321
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-plum" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted">Address</p>
                      <p className="font-body text-sm text-text-primary">
                        New Market, Ilisan Remo, Ogun State
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-plum" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-muted">Business Hours</p>
                      <p className="font-body text-sm text-text-primary">
                        8:00 AM - 9:00 PM Daily
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/2348146056321?text=Hello%20Emis%20Events!%20I%27d%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-whatsapp rounded-2xl p-6 text-white text-center hover:bg-whatsapp/90 transition-colors"
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-display text-lg mb-1">Chat on WhatsApp</h3>
                <p className="font-body text-sm text-white/80">
                  Typically replies within minutes
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}