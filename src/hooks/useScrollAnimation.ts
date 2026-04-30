import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Easing constants from the design
export const EASINGS = {
  smoothReveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
  bounceLift: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  dramatic: 'cubic-bezier(0.77, 0, 0.175, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
}

// GSAP easing equivalents
export const GSAP_EASINGS = {
  smoothReveal: 'power3.out',
  bounceLift: 'back.out(1.7)',
  dramatic: 'power4.inOut',
  standard: 'power2.out',
  smoothOut: 'power2.out',
}

interface ScrollAnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
}

export function useScrollAnimation(
  animationCallback: (gsapInstance: typeof gsap, scrollTrigger: typeof ScrollTrigger) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: unknown[] = []
) {
  const elementRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const result = animationCallback(gsap, ScrollTrigger)
      if (result) {
        animationRef.current = result
      }
    }, elementRef)

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return elementRef
}

export function createPinnedSection(
  sectionSelector: string,
  animations: {
    entrance: (tl: gsap.core.Timeline) => void
    settle?: (tl: gsap.core.Timeline) => void
    exit: (tl: gsap.core.Timeline) => void
  },
  options: ScrollAnimationOptions = {}
) {
  const { scrub = 0.6 } = options

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionSelector,
      start: options.start || 'top top',
      end: options.end || '+=130%',
      pin: options.pin ?? true,
      scrub: scrub,
      markers: options.markers || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
    },
  })

  // ENTRANCE (0% - 30%)
  animations.entrance(timeline)

  // SETTLE (30% - 70%)
  if (animations.settle) {
    animations.settle(timeline)
  }

  // EXIT (70% - 100%)
  animations.exit(timeline)

  return timeline
}

export function fadeInUp(
  element: string | Element | null,
  options: { y?: number; duration?: number; delay?: number; ease?: string } = {}
) {
  const { y = 40, duration = 0.8, delay = 0, ease = GSAP_EASINGS.smoothReveal } = options
  
  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, ease }
  )
}

export function slideInFrom(
  element: string | Element | null,
  direction: 'left' | 'right' | 'top' | 'bottom',
  options: { distance?: number; duration?: number; delay?: number } = {}
) {
  const { distance = 60, duration = 0.8, delay = 0 } = options
  
  const fromVars: gsap.TweenVars = { opacity: 0 }
  
  switch (direction) {
    case 'left':
      fromVars.x = -distance
      break
    case 'right':
      fromVars.x = distance
      break
    case 'top':
      fromVars.y = -distance
      break
    case 'bottom':
      fromVars.y = distance
      break
  }

  return gsap.fromTo(element, fromVars, {
    x: 0,
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease: GSAP_EASINGS.smoothReveal,
  })
}

export function scaleReveal(
  element: string | Element | null,
  options: { from?: number; duration?: number; delay?: number } = {}
) {
  const { from = 1.1, duration = 1.2, delay = 0 } = options
  
  return gsap.fromTo(
    element,
    { scale: from, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay, ease: GSAP_EASINGS.dramatic }
  )
}

export function drawLine(
  element: string | Element | null,
  options: { duration?: number; delay?: number } = {}
) {
  const { duration = 0.6, delay = 0 } = options
  
  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration, delay, ease: GSAP_EASINGS.smoothReveal }
  )
}
