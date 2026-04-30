import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rentals', href: '/inventory' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-medium text-plum tracking-tight hover:opacity-80 transition-opacity"
          >
            EMIS
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm font-medium tracking-wide transition-colors relative group ${
                  location.pathname === link.href
                    ? 'text-plum'
                    : 'text-text-primary hover:text-plum'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px bg-plum transition-all duration-300 ${
                    location.pathname === link.href
                      ? 'w-full -translate-x-1/2'
                      : 'w-0 group-hover:w-full group-hover:-translate-x-1/2'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 -mr-2 text-text-primary hover:text-plum transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* CTA Button (desktop only) */}
          <a
            href="https://wa.me/2348146056321?text=Hello%20Emis%20Events!%20I%27d%20like%20to%20plan%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-plum text-white font-body text-sm font-medium rounded-full hover:bg-plum/90 transition-colors shadow-plum hover:shadow-lg"
          >
            Plan Your Event
          </a>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-plum/95 backdrop-blur-lg transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative h-full flex flex-col items-center justify-center transition-all duration-500 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="font-display text-4xl text-white mb-12"
          >
            EMIS
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-3xl text-white/90 hover:text-gold transition-colors"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col items-center gap-3 text-white/60 font-body text-sm">
            <a href="tel:+2348131303059" className="hover:text-white transition-colors">
              +234 813 130 3059
            </a>
            <span>New Market, Ilisan Remo, Ogun State</span>
          </div>
        </div>
      </div>
    </>
  )
}
