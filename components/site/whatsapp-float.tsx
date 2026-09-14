import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2250700000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter KÔSMÉA sur WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:size-14"
    >
      <MessageCircle className="size-6 fill-white text-[#25D366]" />
    </a>
  )
}
