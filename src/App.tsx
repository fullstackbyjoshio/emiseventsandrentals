import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import LoadingScreen from './components/LoadingScreen'

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'))
const Inventory = lazy(() => import('./pages/Inventory'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const location = useLocation()

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenis(lenisInstance)

    // Connect Lenis to GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisInstance.destroy()
      gsap.ticker.remove(lenisInstance.raf as any)
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
  }, [location.pathname, lenis])

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Loading screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-ivory">
            <div className="w-8 h-8 border-2 border-plum border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFAB />
    </>
  )
}
