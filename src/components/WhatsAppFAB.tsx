import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/2348146056321?text=Hello%20Emis%20Events!%20I%27d%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  )
}
