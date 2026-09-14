import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-akwaba-sans',
  display: 'swap',
})

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-akwaba-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AKWABA IMMOBILIER — L’immobilier qui fait avancer votre vie',
    template: '%s · AKWABA IMMOBILIER',
  },
  description:
    'AKWABA IMMOBILIER — plateforme immobilière premium en Côte d’Ivoire : achat, location, terrains, projets, investissement, construction et gestion immobilière.',
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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
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
