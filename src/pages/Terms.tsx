import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const terms = [
  {
    title: 'Rental Period',
    content: 'All items are rented for a maximum period of 48 hours only. Extensions may be available upon request with additional charges.',
  },
  {
    title: 'Booking & Payment',
    content: 'Full payment is required upfront before delivery. Payment methods include Cash and Bank Transfer. No online payment on the website; payment is discussed via WhatsApp after form submission. A 10% security deposit is required and will be refunded after items are returned undamaged.',
  },
  {
    title: 'Delivery',
    content: 'Delivery available within Ogun State at ₦60,000 - ₦90,000 depending on location and items rented. Nationwide delivery is available across all regions of Nigeria. Delivery fees are zone-based.',
  },
  {
    title: 'Setup & Breakdown',
    content: 'Setup and breakdown services are charged separately at ₦65,000 per hour. These services are available upon request.',
  },
  {
    title: 'Pickup Options',
    content: 'Both pickup and delivery options are available. Clients can pick up items from our location in Ilisan Remo, Ogun State.',
  },
  {
    title: 'Damage & Loss Policy',
    content: 'Any damage, loss, or misuse of rented items will attract additional repair or replacement costs. The cost depends on the extent of the damage. No refund after items have been used or damaged. The security deposit (10%) will be refunded only after items are returned in good condition.',
  },
  {
    title: 'Cancellation Policy',
    content: 'Cancellations must be made before items are delivered. Once items are in use, no refunds will be issued.',
  },
  {
    title: 'Minimum Rental',
    content: 'There is no minimum rental period and no minimum order quantity.',
  },
  {
    title: 'Discounts',
    content: 'Discounts are available for bulk orders, repeat customers, and off-peak seasons. Contact us via WhatsApp for discount details.',
  },
  {
    title: 'Business Hours',
    content: 'Inquiry response time is 8:00 AM - 9:00 PM daily.',
  },
]

export default function Terms() {
  const headerRef = useRef<HTMLDivElement>(null)
  const termsRef = useRef<HTMLDivElement>(null)

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
        '.term-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: termsRef.current, start: 'top 80%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Emis Events and Rentals</title>
        <meta name="description" content="Read the terms and conditions for renting event equipment from Emis Events and Rentals. Rental period, payment, delivery, and damage policies." />
        <meta name="keywords" content="event rental terms, rental conditions Nigeria, party equipment rental policy, event styling terms Ogun State" />
        <link rel="canonical" href="https://emiseventsandrentals.com/terms" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms & Conditions | Emis Events and Rentals" />
        <meta property="og:description" content="Read the terms and conditions for renting event equipment from Emis Events and Rentals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emiseventsandrentals.com/terms" />
        <meta property="og:image" content="https://emiseventsandrentals.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions | Emis Events and Rentals" />
        <meta name="twitter:description" content="Read the terms and conditions for renting event equipment from Emis Events and Rentals." />
        <meta name="twitter:image" content="https://emiseventsandrentals.com/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-ivory pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={headerRef} className="mb-12">
            <span className="label-upper text-text-muted mb-4 block">Legal</span>
            <h1 className="font-display text-h1 text-text-primary mb-4">Terms & Conditions</h1>
            <p className="font-body text-body-lg text-text-muted">
              Please read these terms carefully before making a booking. By renting from Emis Events 
              and Rentals, you agree to the following conditions.
            </p>
          </div>

          {/* Terms List */}
          <div ref={termsRef} className="space-y-4">
            {terms.map((term, index) => (
              <div
                key={index}
                className="term-item bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-plum/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-display text-sm text-plum">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-text-primary mb-2">{term.title}</h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-plum rounded-2xl p-8 text-center">
            <h2 className="font-display text-xl text-white mb-3">Have Questions?</h2>
            <p className="font-body text-sm text-white/70 mb-6">
              If you have any questions about our terms and conditions, please don't hesitate to contact us.
            </p>
            <a
              href="https://wa.me/2348146056321?text=I%20have%20a%20question%20about%20your%20terms%20and%20conditions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-plum font-body font-semibold rounded-full hover:bg-gold/90 transition-colors"
            >
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Service Pricing Summary */}
          <div className="mt-12">
            <h2 className="font-display text-h2 text-text-primary mb-6">Service Pricing</h2>
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-plum/5">
                    <th className="text-left px-6 py-4 font-body text-xs uppercase tracking-wider text-text-muted">Service</th>
                    <th className="text-right px-6 py-4 font-body text-xs uppercase tracking-wider text-text-muted">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-body text-sm text-text-primary">Delivery (Ogun State)</td>
                    <td className="px-6 py-4 font-body text-sm text-plum font-medium text-right">₦60,000 - ₦90,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-body text-sm text-text-primary">Setup/Breakdown Labor</td>
                    <td className="px-6 py-4 font-body text-sm text-plum font-medium text-right">₦65,000/hour</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-body text-sm text-text-primary">Security Deposit</td>
                    <td className="px-6 py-4 font-body text-sm text-plum font-medium text-right">10% of total (refundable)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}