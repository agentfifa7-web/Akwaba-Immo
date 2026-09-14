'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Heart, Search, User, X, Menu as MenuIcon } from 'lucide-react'

import { useFavorites } from '@/lib/store'
import { cn } from '@/lib/utils'

const mainNav = [
  { href: '/acheter', label: 'Acheter' },
  { href: '/louer', label: 'Louer' },
  { href: '/terrains', label: 'Terrains' },
  { href: '/projets', label: 'Nos projets' },
  { href: '/investir', label: 'Investir' },
]

const services = [
  { href: '/services/construction', label: 'Construction' },
  { href: '/services/gestion', label: 'Gestion immobilière' },
  { href: '/services/renovation', label: 'Réhabilitation & rénovation' },
  { href: '/services/estimation', label: 'Estimation immobilière' },
  { href: '/services/conseil', label: 'Conseil & accompagnement' },
  { href: '/services/juridique', label: 'Accompagnement juridique' },
  { href: '/decoration', label: 'Décorateur virtuel 3D' },
]

const secondaryNav = [
  { href: '/magazine', label: 'Magazine' },
  { href: '/a-propos', label: 'À propos' },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { ids, hydrated } = useFavorites()

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled && !menuOpen
  const textClass = transparent ? 'text-white' : 'text-foreground'

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-30 border-b transition-colors duration-300',
        transparent ? 'absolute border-white/15 bg-transparent' : 'border-border bg-background/95 backdrop-blur',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <Link href="/" className={cn('font-serif text-xl font-semibold tracking-tight', textClass)}>
          AKWABA <span className="text-primary">IMMOBILIER</span>
        </Link>

        <nav className={cn('hidden shrink-0 items-center gap-5 whitespace-nowrap text-xs font-medium uppercase tracking-[0.12em] xl:flex', textClass)}>
          <Link href="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button type="button" className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-primary">
              Nos services <ChevronDown className="size-3" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-lg border border-border bg-background pt-1 normal-case tracking-normal text-foreground shadow-xl">
                <div className="flex flex-col py-2">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} className="px-5 py-2.5 text-sm normal-case hover:bg-muted hover:text-primary">
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/recherche-intelligente"
            aria-label="Recherche intelligente"
            className={cn('hidden size-9 items-center justify-center transition-colors hover:text-primary sm:flex', textClass)}
          >
            <Search className="size-[18px]" />
          </Link>
          <Link
            href="/mon-espace/favoris"
            aria-label="Mes favoris"
            className={cn('relative hidden size-9 items-center justify-center transition-colors hover:text-primary sm:flex', textClass)}
          >
            <Heart className="size-[18px]" />
            {hydrated && ids.length > 0 && (
              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
                {ids.length}
              </span>
            )}
          </Link>
          <Link
            href="/connexion"
            aria-label="Mon espace"
            className={cn('hidden size-9 items-center justify-center transition-colors hover:text-primary sm:flex', textClass)}
          >
            <User className="size-[18px]" />
          </Link>
          <Link
            href="/contact"
            className="hidden shrink-0 whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md xl:block"
          >
            Contacter un conseiller
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors', transparent ? 'border-white/30 text-white' : 'border-border text-foreground', 'xl:hidden')}
          >
            {menuOpen ? <X className="size-[18px]" /> : <MenuIcon className="size-[18px]" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex max-h-[75vh] flex-col gap-0.5 overflow-y-auto border-t border-border bg-background px-5 py-4 text-sm uppercase tracking-widest text-foreground xl:hidden">
          <Link href="/" className="py-2.5">Accueil</Link>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2.5">
              {item.label}
            </Link>
          ))}
          <p className="pt-3 text-[10px] text-muted-foreground">Nos services</p>
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="py-2 pl-3 text-xs normal-case">
              {service.label}
            </Link>
          ))}
          <div className="mt-1 border-t border-border pt-3" />
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2.5">
              {item.label}
            </Link>
          ))}
          <Link href="/plan-du-site" className="py-2.5 text-muted-foreground">Plan du site</Link>
          <Link href="/contact" className="mt-3 mb-2 rounded-lg bg-primary px-5 py-3.5 text-center text-primary-foreground shadow-sm">
            Contacter un conseiller
          </Link>
        </nav>
      )}
    </header>
  )
}
