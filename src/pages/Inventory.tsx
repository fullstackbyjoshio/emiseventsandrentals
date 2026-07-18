import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { InventoryItem } from './inventoryTypes';
import { generatedInventory } from './InventoryGenerated.ts';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Check, ShoppingBag, X, Minus } from 'lucide-react'
import { useToast } from '../components/Toast'

gsap.registerPlugin(ScrollTrigger)

const imageModules = import.meta.glob('/public/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const categories = [
  'All',
  'Tableware',
  'Fabrics & Linens',
  'Chairs & Tables',
  'Decor',
  'Catering Equipment',
]

const inventoryItems: InventoryItem[] = [
  { id: 1, name: 'Flat Plate', price: '₦1,000', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/inventory_tableware.jpg' },
  { id: 2, name: 'Amala Bowl', price: '₦1,000', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/Amala-Bowl.jpg' },
  { id: 3, name: 'Charger Plate', price: '₦500', unit: 'per dozen (12 pcs)', category: 'Tableware', image: '/community_table_detail.jpg' },
  { id: 4, name: 'Wine Bowl', price: '₦200', unit: 'per piece', category: 'Tableware', image: '/wine-bowl.jpg' },
  { id: 5, name: 'Wine Bowl', price: '₦1,500', unit: 'per piece', category: 'Tableware', image: '/serving-dish-2.jpg' },
  { id: 6, name: 'Chaffing Dish', price: '₦2,000', unit: 'per piece', category: 'Tableware', image: '/Serving-dish-1.jpg' },
  { id: 7, name: 'Fabric (White)', price: '₦4,000', unit: 'per piece', category: 'Fabrics & Linens', image: '/inventory_textiles.jpg' },
  { id: 8, name: 'Chair Cover', price: '₦80', unit: 'per piece', category: 'Fabrics & Linens', image: '/service_chairs.jpg' },
  { id: 9, name: 'Table Cloth', price: '₦700', unit: 'per piece', category: 'Fabrics & Linens', image: '/Table-Cloth.jpg' },
  { id: 11, name: 'Children Table', price: '₦500', unit: 'per piece', category: 'Chairs & Tables', image: '/styling_lounge.jpg' },
  { id: 33, name: 'Executive Chairs', price: '₦5,000', unit: 'per piece', category: 'Chairs & Tables', image: '/executiive-chairs.jpg' },
  { id: 13, name: 'Flower', price: '₦7,500', unit: 'per piece', category: 'Decor', image: '/flower.jpg' },
  { id: 14, name: 'Flower Vase', price: '₦1,000', unit: 'per piece', category: 'Decor', image: '/Flower-vase.jpg' },
  { id: 15, name: 'Rafia Flower Vase with leafs', price: '₦20,000', unit: 'per piece', category: 'Decor', image: '/rafia-flower-vase.jpg' },
  { id: 16, name: 'Velvet Rose', price: '₦1,200', unit: 'per piece', category: 'Decor', image: '/velvet-rose.jpg' },
  { id: 17, name: 'Chandelier', price: '₦3,000', unit: 'per piece', category: 'Decor', image: '/closing_chandelier.jpg' },
  { id: 18, name: 'Balloon Arch', price: '₦25,000', unit: 'per piece', category: 'Decor', image: '/experience_flower_wall.jpg' },
  { id: 19, name: 'Balloon Pump', price: '₦20,000', unit: 'per piece', category: 'Decor', image: '/Baloon-Pump.jpg' },
  { id: 20, name: 'Walkway Arch', price: '₦5,000', unit: 'per piece', category: 'Decor', image: '/plan_floral_arch.jpg' },
  { id: 21, name: 'Back Drop', price: '₦3,000', unit: 'per piece', category: 'Decor', image: '/back-drop.jpg' },
  { id: 22, name: 'Hero Archway', price: '₦30,000', unit: 'per piece', category: 'Decor', image: '/hero_archway.jpg' },
  { id: 23, name: '2-in-1 Vine Flower', price: '₦4,500', unit: 'per piece', category: 'Decor', image: '/2in1-vine-flower.jpg' },
  { id: 24, name: '3-Head Rose', price: '₦1,800', unit: 'per piece', category: 'Decor', image: '/3head-rose.jpg' },
  { id: 25, name: 'Cotton Flower', price: '₦6,500', unit: 'per piece', category: 'Decor', image: '/cotton-flower.jpg' },
  { id: 26, name: 'Rafia Fan', price: '₦4,500', unit: 'per piece', category: 'Decor', image: '/handfan.jpg' },
  { id: 27, name: "Plastic Baby's Breath", price: '₦1,000', unit: 'per stem', category: 'Decor', image: '/plastic-baby-breath.jpg' },
  { id: 28, name: 'Process Bouquet', price: '₦12,000', unit: 'per piece', category: 'Decor', image: '/process_bouquet.jpg' },
  { id: 32, name: 'Party Popper', price: '₦2,000', unit: 'per piece', category: 'Decor', image: '/Party-popper.jpg' },
  { id: 29, name: 'Chafing Dish (Large)', price: '₦500', unit: 'per piece', category: 'Catering Equipment', image: '/statement_bar_cart.jpg' },
  { id: 31, name: 'Cooling Chest', price: '₦20,000', unit: 'per piece', category: 'Catering Equipment', image: '/Cooling-Chest.jpg' },
]

const uniqueStaticItemsMap = new Map<string, typeof inventoryItems[0]>()
inventoryItems.forEach(item => {
  const key = item.name.toLowerCase()
  if (!uniqueStaticItemsMap.has(key)) {
    uniqueStaticItemsMap.set(key, item)
  }
})
const uniqueStaticItems = Array.from(uniqueStaticItemsMap.values())

function buildAllItems() {
  const usedNames = new Set<string>(uniqueStaticItems.map((i: InventoryItem) => i.name.toLowerCase()))
  const usedImages = new Set<string>(uniqueStaticItems.map((i: InventoryItem) => i.image))
  const extra: InventoryItem[] = []
  let nextId = Math.max(...uniqueStaticItems.map((i: InventoryItem) => i.id)) + 1

  Object.keys(imageModules).forEach(modulePath => {
    const fileName = modulePath.split('/').pop()!
    const publicUrl = '/' + fileName
    if (!usedImages.has(publicUrl)) {
      const rawName = fileName.replace(/\.[^.]+$/i, '')
      const displayName = rawName
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
      if (usedNames.has(displayName.toLowerCase())) return
      extra.push({
        id: nextId++,
        name: displayName,
        price: '₦1,000',
        unit: 'per piece',
        category: 'Uncategorized',
        image: publicUrl,
      })
      usedNames.add(displayName.toLowerCase())
      usedImages.add(publicUrl)
    }
  })

  const overrides: Record<string, Partial<InventoryItem>> = {
    'Amala Bowl': { price: '₦1,000', unit: 'per dozen (12 pcs) for rent', category: 'Tableware' },
    'Wooden Flower Vase': { price: '₦7,500', unit: 'for sale', category: 'Decor' },
    'Small Flower Vase': { price: '₦2,000', unit: 'for sale', category: 'Decor' },
    'Chapman Fruits Dispenser': { price: '₦10,000', unit: 'for rent', category: 'Catering Equipment' },
    'Children Chairs': { price: '₦500', unit: 'per piece for rent', category: 'Chairs & Tables' },
    'Candle Stand': { price: '₦12,000', unit: 'for sale', category: 'Decor' },
    'Candle Light': { price: '₦1,500', unit: 'for sale', category: 'Decor' },
  }
  extra.forEach(item => {
    const override = overrides[item.name]
    if (override) {
      if (override.price) item.price = override.price
      if (override.unit) item.unit = override.unit
    }
  })
  generatedInventory.splice(0, generatedInventory.length, ...extra)
  return [...uniqueStaticItems, ...extra]
}
const allItems = buildAllItems()

export default function Inventory() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<Record<number, number>>({}) // { [id]: quantity }
  const [showCart, setShowCart] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const filteredItems = activeCategory === 'All'
    ? allItems
    : allItems.filter(item => item.category === activeCategory)

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const cartItemIds = Object.keys(cart).map(Number).filter(id => cart[id] > 0)
  const cartItems = allItems.filter(item => cartItemIds.includes(item.id))

  const toggleCartItem = (id: number) => {
    const item = allItems.find(i => i.id === id)
    const isInCart = cart[id] && cart[id] > 0

    if (isInCart) {
      setCart(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      toast.info('Removed', `${item?.name} removed from your selection.`)
    } else {
      setCart(prev => ({ ...prev, [id]: 1 }))
      toast.success('Added to cart', `${item?.name} added to your selection.`)
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0
      const nextQty = Math.max(1, current + delta)
      return { ...prev, [id]: nextQty }
    })
  }

  const removeFromCart = (id: number) => {
    const item = allItems.find(i => i.id === id)
    setCart(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    toast.info('Removed', `${item?.name} removed from your selection.`)
  }

  const clearCart = () => {
    if (cartCount === 0) return
    setCart({})
    toast.info('Cart cleared', 'All items have been removed.')
  }

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
        '.inventory-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [filteredItems])

  const sendInquiry = () => {
    if (cartCount === 0) {
      toast.error('Cart is empty', 'Select at least one item before sending an inquiry.')
      return
    }

    const items = cartItems.map(item => {
      const qty = cart[item.id]
      return `• ${item.name} x${qty} — ${item.price} ${item.unit}`
    }).join('\n')

    const text = encodeURIComponent(
      `🎉 NEW BOOKING INQUIRY - Emis Events & Rentals\n\n🛒 Equipment Needed:\n${items}\n\nPlease provide availability and pricing.`
    )

    toast.info('Opening WhatsApp…', 'Preparing your inquiry message.')

    setTimeout(() => {
      window.open(`https://wa.me/2348146056321?text=${text}`, '_blank')
      toast.success(
        'Inquiry sent!',
        `${cartCount} item(s) ready in WhatsApp. Send the message to complete.`,
        {
          duration: 6000,
          action: {
            label: 'Keep browsing',
            onClick: () => setShowCart(false),
          },
        }
      )
    }, 600)
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
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${activeCategory === cat
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
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="inventory-card group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative flex items-center justify-center bg-white min-h-[200px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full max-h-[280px] object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={() => toggleCartItem(item.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${cart[item.id]
                    ? 'bg-plum text-white'
                    : 'bg-white/90 text-text-primary hover:bg-plum hover:text-white'
                    }`}
                >
                  {cart[item.id] ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-text-muted">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-plum text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-4 animate-float">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-body text-sm font-medium">{cartCount} item(s) selected</span>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="px-4 py-1.5 bg-gold text-plum font-body text-sm font-semibold rounded-full hover:bg-gold/90 transition-colors"
          >
            Review
          </button>
          <button
            onClick={clearCart}
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
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-medium text-text-primary truncate">{item.name}</h4>
                        <p className="font-body text-sm text-plum">{item.price} {item.unit}</p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted hover:border-plum hover:text-plum transition-colors"
                            disabled={cart[item.id] <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm font-semibold text-text-primary w-6 text-center">
                            {cart[item.id]}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-muted hover:border-plum hover:text-plum transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0"
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