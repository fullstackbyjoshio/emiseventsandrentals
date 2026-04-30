import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Check, ShoppingBag, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Inventory data from the website content file
const categories = [
  'All',
  'Tableware',
  'Fabrics & Linens',
  'Chairs & Tables',
  'Decor',
  'Catering Equipment',
]

const inventoryItems = [
  { id: 1, name: 'Flat Plate', price: '₦1,000', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/inventory_tableware.jpg' },
  { id: 2, name: 'Amala Bowl', price: '₦1,000', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/statement_tablescape.jpg' },
  { id: 3, name: 'Small Chops Bowl', price: '₦500', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/community_table_detail.jpg' },
  { id: 4, name: 'Charger Plate', price: '₦700', unit: 'per piece', category: 'Tableware', image: '/inventory_tableware.jpg' },
  { id: 5, name: 'Wine Bowl', price: '₦1,500', unit: 'per piece', category: 'Tableware', image: '/statement_tablescape.jpg' },
  { id: 6, name: 'Fabric (White)', price: '₦4,000', unit: 'per piece', category: 'Fabrics & Linens', image: '/inventory_textiles.jpg' },
  { id: 7, name: 'Chair Cover', price: '₦5,000', unit: 'per piece', category: 'Fabrics & Linens', image: '/service_chairs.jpg' },
  { id: 8, name: 'Table Cover', price: '₦3,000', unit: 'per piece', category: 'Fabrics & Linens', image: '/statement_tablescape.jpg' },
  { id: 9, name: 'Children Chiavari Chair', price: '₦800', unit: 'per 10 pcs', category: 'Chairs & Tables', image: '/service_chairs.jpg' },
  { id: 10, name: 'Children Table', price: '₦500', unit: 'per piece', category: 'Chairs & Tables', image: '/community_table_detail.jpg' },
  { id: 11, name: 'VIP Chair', price: '₦5,000', unit: 'per piece', category: 'Chairs & Tables', image: '/styling_lounge.jpg' },
  { id: 12, name: 'Flower', price: '₦500', unit: 'per piece', category: 'Decor', image: '/process_bouquet.jpg' },
  { id: 13, name: 'Flower Vase', price: '₦5,000', unit: 'per piece', category: 'Decor', image: '/process_bouquet.jpg' },
  { id: 14, name: 'Candle Stand', price: '₦200', unit: 'per piece', category: 'Decor', image: '/statement_tablescape.jpg' },
  { id: 15, name: 'Chandelier', price: '₦5,000', unit: 'per piece', category: 'Decor', image: '/closing_chandelier.jpg' },
  { id: 16, name: 'Balloon Arch', price: '₦25,000', unit: 'per piece', category: 'Decor', image: '/experience_flower_wall.jpg' },
  { id: 17, name: 'Walkway Arch', price: '₦5,000', unit: 'per piece', category: 'Decor', image: '/plan_floral_arch.jpg' },
  { id: 18, name: 'Turf Grass', price: '₦20,000', unit: 'per piece', category: 'Decor', image: '/styling_lounge.jpg' },
  { id: 19, name: 'Chafing Dish (Large)', price: '₦500', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
  { id: 20, name: 'Chafing Dish (Small)', price: '₦250', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
  { id: 21, name: 'Dispenser', price: '₦10,000', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
  { id: 22, name: 'Trolley', price: '₦5,000', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
  { id: 23, name: 'Cooling Chest', price: '₦20,000', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
]

export default function Inventory() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<number[]>([])
  const [showCart, setShowCart] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredItems = activeCategory === 'All'
    ? inventoryItems
    : inventoryItems.filter(item => item.category === activeCategory)

  const toggleCartItem = (id: number) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.inventory-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [filteredItems])

  const cartItems = inventoryItems.filter(item => cart.includes(item.id))

  const sendInquiry = () => {
    const items = cartItems.map(item => `• ${item.name} - ${item.price} ${item.unit}`).join('\n')
    const text = encodeURIComponent(
      `🎉 NEW BOOKING INQUIRY - Emis Events & Rentals\n\n🛒 Equipment Needed:\n${items}\n\nPlease provide availability and pricing.`
    )
    window.open(`https://wa.me/2348146056321?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="label-upper text-text-muted mb-4 block">Our Collection</span>
          <h1 className="font-display text-h1 text-text-primary mb-4">Inventory</h1>
          <p className="font-body text-body-lg text-text-muted max-w-2xl">
            Browse our curated collection of luxury event rentals. Each piece is inspected, 
            cleaned, and prepared to ensure your event looks flawless.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-plum text-white shadow-plum'
                  : 'bg-white text-text-primary hover:bg-plum/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="inventory-card group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={() => toggleCartItem(item.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    cart.includes(item.id)
                      ? 'bg-plum text-white'
                      : 'bg-white/90 text-text-primary hover:bg-plum hover:text-white'
                  }`}
                >
                  {cart.includes(item.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <span className="font-body text-xs text-text-muted uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display text-lg text-text-primary mt-1">{item.name}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-body font-semibold text-plum">{item.price}</span>
                  <span className="font-body text-xs text-text-muted">{item.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-text-muted">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-plum text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-4 animate-float">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-body text-sm font-medium">{cart.length} item(s) selected</span>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="px-4 py-1.5 bg-gold text-plum font-body text-sm font-semibold rounded-full hover:bg-gold/90 transition-colors"
          >
            Review
          </button>
          <button
            onClick={() => setCart([])}
            className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-text-primary">Your Selection</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-9 h-9 rounded-full bg-plum/10 flex items-center justify-center hover:bg-plum/20 transition-colors"
                >
                  <X className="w-5 h-5 text-plum" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="font-body text-text-muted text-center py-8">No items selected.</p>
              ) : (
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-body font-medium text-text-primary">{item.name}</h4>
                        <p className="font-body text-sm text-plum">{item.price} {item.unit}</p>
                      </div>
                      <button
                        onClick={() => toggleCartItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <button
                  onClick={sendInquiry}
                  className="w-full py-4 bg-plum text-white font-body font-semibold rounded-full hover:bg-plum/90 transition-colors flex items-center justify-center gap-2"
                >
                  Send Inquiry via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
