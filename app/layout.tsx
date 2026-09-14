import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-kosmea-sans',
  display: 'swap',
})

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-kosmea-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'KÔSMÉA — Discover. Try. Create. Shop.',
    template: '%s · KÔSMÉA',
  },
  description:
    'KÔSMÉA — la première super-plateforme ivoirienne dédiée à la beauté, à la mode et au style : marketplace, essayage virtuel, stylistes, Beauty Academy et communauté.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F3EA' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`bg-background ${sans.variable} ${serif.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
