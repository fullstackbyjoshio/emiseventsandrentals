import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../sections/HeroSection'
import StatementSection from '../sections/StatementSection'
import SplitSection from '../sections/SplitSection'
import CTASection from '../sections/CTASection'

gsap.registerPlugin(ScrollTrigger)

// Section data configurations
const sections = {
  statement1: {
    headline: "We don't just rent—we design moments.",
    subheadline: 'Inventory, styling, delivery, and setup—handled as one seamless experience.',
    image: '/statement_tablescape.jpg',
    zIndex: 20,
  },
  split1: {
    label: 'ABOUT',
    headline: ['Bespoke', 'rentals', 'for events', 'that matter.'],
    body: 'We source and style pieces with intention—so every table setting, lounge corner, and floral accent feels unmistakably you.',
    cta: 'Meet the collection',
    ctaLink: '/inventory',
    image: '/inventory_tableware.jpg',
    imagePosition: 'left' as const,
    zIndex: 30,
  },
  split2: {
    label: 'RENTALS',
    headline: ['Curated', 'for', 'quality.'],
    body: 'Every piece is inspected, cleaned, and prepared—so your setup looks flawless from the first guest arrival to the final toast.',
    cta: 'View inventory',
    ctaLink: '/inventory',
    image: '/process_bouquet.jpg',
    imagePosition: 'right' as const,
    zIndex: 40,
  },
  split3: {
    label: 'STYLING',
    headline: ['Styled', 'for', 'comfort.'],
    body: 'From lounge seating to tablescapes, we compose layouts that invite conversation, connection, and calm.',
    cta: 'See our process',
    ctaLink: '/services',
    image: '/styling_lounge.jpg',
    imagePosition: 'left' as const,
    zIndex: 50,
  },
  statement2: {
    headline: 'Because details set the tone.',
    subheadline: 'Linens, glassware, lighting, florals—every layer considered.',
    image: '/statement_bar_cart.jpg',
    zIndex: 60,
  },
  split4: {
    label: 'SERVICE',
    headline: ['Consistency', 'you', 'can trust.'],
    body: 'Clear timelines, confirmed deliveries, and consistent setups—so your event feels effortless.',
    cta: 'Book a consultation',
    ctaLink: '/contact',
    image: '/service_chairs.jpg',
    imagePosition: 'right' as const,
    zIndex: 70,
  },
  split5: {
    label: 'INVENTORY',
    headline: ['A rental', 'for', 'every', 'occasion.'],
    body: 'Chairs, tables, textiles, tableware, backdrops, and more—coordinated to match your palette and vibe.',
    cta: 'Browse categories',
    ctaLink: '/inventory',
    image: '/inventory_textiles.jpg',
    imagePosition: 'left' as const,
    zIndex: 80,
  },
  split6: {
    label: 'EXPERIENCE',
    headline: ['Designed', 'around', 'you.'],
    body: "Tell us your vision. We'll translate it into a cohesive plan—moodboard to installation.",
    cta: 'Start your design',
    ctaLink: '/contact',
    image: '/experience_flower_wall.jpg',
    imagePosition: 'right' as const,
    zIndex: 90,
  },
  split7: {
    label: 'OUR TEAM',
    headline: ['For the', 'community.'],
    body: "We're a small team with big care—here to support weddings, corporate events, birthdays, and everything in between.",
    cta: 'Read our story',
    ctaLink: '/about',
    image: '/community_table_detail.jpg',
    imagePosition: 'left' as const,
    zIndex: 100,
  },
  split8: {
    label: 'PLAN',
    headline: ['Make your', 'next event', 'unforgettable.'],
    body: "Let's coordinate the details—delivery, setup, styling, and breakdown—so you don't have to.",
    cta: 'Request a quote',
    ctaLink: '/contact',
    image: '/plan_floral_arch.jpg',
    imagePosition: 'right' as const,
    zIndex: 110,
  },
  statement3: {
    headline: 'Great events start with great partners.',
    subheadline: "Let's be yours.",
    image: '/closing_chandelier.jpg',
    zIndex: 120,
  },
}

export default function Home() {
  // No snap logic needed for simplified scroll
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])


  return (
    <>
      <Helmet>
        <title>Event Rentals & Styling in Ogun State | Emis Events and Rentals</title>
        <meta name="description" content="Premium event rentals, coordination, and styling in Ilisan Remo, Ogun State, Nigeria. Chairs, tents, decor & more. Book your event today." />
        <meta name="keywords" content="event rentals, party rentals, wedding styling, Ogun State, Ilisan Remo, Nigeria, chair rental, tent rental, event decor" />
        <link rel="canonical" href="https://emiseventsandrentals.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Event Rentals & Styling in Ogun State | Emis Events and Rentals" />
        <meta property="og:description" content="Premium event rentals, coordination, and styling in Ilisan Remo, Ogun State, Nigeria." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emiseventsandrentals.com/" />
        <meta property="og:image" content="https://emiseventsandrentals.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Event Rentals & Styling in Ogun State | Emis Events and Rentals" />
        <meta name="twitter:description" content="Premium event rentals, coordination, and styling in Ilisan Remo, Ogun State, Nigeria." />
        <meta name="twitter:image" content="https://emiseventsandrentals.com/og-image.jpg" />
      </Helmet>

      <div className="relative">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Statement */}
        <StatementSection {...sections.statement1} />

        {/* Section 3: Split Left */}
        <SplitSection {...sections.split1} />

        {/* Section 4: Split Right */}
        <SplitSection {...sections.split2} />

        {/* Section 5: Split Left */}
        <SplitSection {...sections.split3} />

        {/* Section 6: Statement */}
        <StatementSection {...sections.statement2} />

        {/* Section 7: Split Right */}
        <SplitSection {...sections.split4} />

        {/* Section 8: Split Left */}
        <SplitSection {...sections.split5} />

        {/* Section 9: Split Right */}
        <SplitSection {...sections.split6} />

        {/* Section 10: Split Left */}
        <SplitSection {...sections.split7} />

        {/* Section 11: Split Right */}
        <SplitSection {...sections.split8} />

        {/* Section 12: Statement */}
        <StatementSection {...sections.statement3} />

        {/* Section 13: CTA (flowing, not pinned) */}
        <CTASection />
      </div>
    </>
  )
}