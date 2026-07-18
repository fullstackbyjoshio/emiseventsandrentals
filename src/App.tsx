import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import LoadingScreen from './components/LoadingScreen'
import { ToastProvider } from './components/Toast'

// Vercel Analytics & Speed Insights
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

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

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenis(lenisInstance)
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

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
  }, [location.pathname, lenis])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ToastProvider>
      <div className="grain-overlay" aria-hidden="true" />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar />

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

      <Footer />
      <WhatsAppFAB />

      <Analytics />
      <SpeedInsights route={location.pathname} />
    </ToastProvider>
  )
}