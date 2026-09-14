'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Heart, Search, ShoppingBag, User, X, Menu as MenuIcon, Sparkles } from 'lucide-react'

import { useCart, useFavorites } from '@/lib/store'
import { cn } from '@/lib/utils'

const mainNav = [
  { href: '/shop', label: 'Shop' },
  { href: '/stylistes', label: 'Stylistes' },
  { href: '/academy', label: 'Academy' },
  { href: '/communaute', label: 'Communauté' },
  { href: '/live', label: 'Live' },
]

const experienceMenu = [
  { href: '/essayer', label: 'Try-On Hub' },
  { href: '/essayer/maquillage', label: 'Essayer — Maquillage' },
  { href: '/essayer/mode', label: 'Essayer — Mode' },
  { href: '/essayer/coiffure', label: 'Essayer — Coiffure' },
  { href: '/essayer/avatar', label: 'Mon Avatar' },
  { href: '/creer/look', label: 'Créer mon look' },
  { href: '/creer/tenue', label: 'Créer ma tenue' },
  { href: '/creer/couleurs', label: 'Color Lab' },
]

const secondaryNav = [
  { href: '/boutiques', label: 'Boutiques' },
  { href: '/privilege', label: 'Privilège' },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [experienceOpen, setExperienceOpen] = useState(false)
  const { ids: wishIds, hydrated: wishHydrated } = useFavorites()
  const { totalCount, hydrated: cartHydrated } = useCart()

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
        <Link href="/" className={cn('font-serif text-xl font-semibold tracking-[0.15em]', textClass)}>
          KÔSMÉA<span className="text-accent">.</span>
        </Link>

        <nav className={cn('hidden shrink-0 items-center gap-5 whitespace-nowrap text-xs font-medium uppercase tracking-[0.12em] xl:flex', textClass)}>
          <Link href="/" className="transition-colors hover:text-accent">
            Accueil
          </Link>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setExperienceOpen(true)} onMouseLeave={() => setExperienceOpen(false)}>
            <button type="button" className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-accent">
              <Sparkles className="size-3.5" /> Essayer &amp; Créer <ChevronDown className="size-3" />
            </button>
            {experienceOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-lg border border-border bg-background pt-1 normal-case tracking-normal text-foreground shadow-xl">
                <div className="flex flex-col py-2">
                  {experienceMenu.map((item) => (
                    <Link key={item.href} href={item.href} className="px-5 py-2.5 text-sm normal-case hover:bg-muted hover:text-accent">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/recherche"
            aria-label="Recherche"
            className={cn('hidden size-9 items-center justify-center transition-colors hover:text-accent sm:flex', textClass)}
          >
            <Search className="size-[18px]" />
          </Link>
          <Link
            href="/mon-kosmea/favoris"
            aria-label="Mes favoris"
            className={cn('relative hidden size-9 items-center justify-center transition-colors hover:text-accent sm:flex', textClass)}
          >
            <Heart className="size-[18px]" />
            {wishHydrated && wishIds.length > 0 && (
              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] text-accent-foreground">
                {wishIds.length}
              </span>
            )}
          </Link>
          <Link
            href="/panier"
            aria-label="Mon panier"
            className={cn('relative hidden size-9 items-center justify-center transition-colors hover:text-accent sm:flex', textClass)}
          >
            <ShoppingBag className="size-[18px]" />
            {cartHydrated && totalCount > 0 && (
              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] text-accent-foreground">
                {totalCount}
              </span>
            )}
          </Link>
          <Link
            href="/connexion"
            aria-label="Mon compte"
            className={cn('hidden size-9 items-center justify-center transition-colors hover:text-accent sm:flex', textClass)}
          >
            <User className="size-[18px]" />
          </Link>
          <Link
            href="/essayer"
            className="hidden shrink-0 whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md xl:block"
          >
            Essayer mon look
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
          <p className="pt-3 text-[10px] text-muted-foreground">Essayer &amp; Créer</p>
          {experienceMenu.map((item) => (
            <Link key={item.href} href={item.href} className="py-2 pl-3 text-xs normal-case">
              {item.label}
            </Link>
          ))}
          <div className="mt-1 border-t border-border pt-3" />
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="py-2.5">
              {item.label}
            </Link>
          ))}
          <Link href="/pres-de-moi" className="py-2.5 text-muted-foreground">Près de moi</Link>
          <Link href="/plan-du-site" className="py-2.5 text-muted-foreground">Plan du site</Link>
          <Link href="/essayer" className="mt-3 mb-2 rounded-lg bg-primary px-5 py-3.5 text-center text-primary-foreground shadow-sm">
            Essayer mon look
          </Link>
        </nav>
      )}
    </header>
  )
}
