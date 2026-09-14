import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { MobileBottomNav } from '@/components/site/mobile-bottom-nav'
import { WhatsAppFloat } from '@/components/site/whatsapp-float'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </div>
  )
}
