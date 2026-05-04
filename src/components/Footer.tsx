import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Music2 } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Event Coordination', href: '/services' },
    { label: 'Event Planning', href: '/services' },
    { label: 'Event Styling', href: '/services' },
    { label: 'Equipment Rentals', href: '/inventory' },
    { label: 'Delivery & Setup', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Inventory', href: '/inventory' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-plum text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-3xl text-white mb-4 inline-block">
              EMIS
            </Link>
            <p className="font-body text-sm text-white/70 leading-relaxed mt-4 max-w-xs">
              Your event, our commitment to perfection. Luxury event rentals and styling for occasions that matter.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://tiktok.com/@emis.event.rental"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="TikTok"
              >
                <Music2 className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/emiseventandrentals?igsh=MTB0dHQ3bmJsNjJnbQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2348131303059"
                  className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  +234 813 130 3059
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348146056321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span className="font-body text-sm text-white/70">
                  New Market, Ilisan Remo,<br />Ogun State, Nigeria
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 font-body text-sm text-white/70">
                  <Mail className="w-4 h-4 text-gold" />
                  8:00 AM - 9:00 PM Daily
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/50">
            &copy; {new Date().getFullYear()} Emis Events and Rentals. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/50 italic">
            Oluwa loni glory
          </p>
        </div>
      </div>
    </footer>
  )
}
