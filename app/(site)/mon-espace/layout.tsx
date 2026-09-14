'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Bell,
  CalendarDays,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  MessageSquare,
} from 'lucide-react'

import { useAuth } from '@/lib/store'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/mon-espace', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/mon-espace/favoris', label: 'Mes favoris', icon: Heart },
  { href: '/mon-espace/rendez-vous', label: 'Mes rendez-vous', icon: CalendarDays },
  { href: '/mon-espace/demandes', label: 'Mes demandes', icon: MessageSquare },
  { href: '/mon-espace/documents', label: 'Mes documents', icon: FileText },
]

export default function MonEspaceLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, hydrated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col justify-between gap-2 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Bell className="size-3.5" /> Espace client
            </p>
            <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
              {hydrated ? `Bonjour, ${user?.name ?? 'bienvenue'}` : 'Bonjour'}
            </h1>
          </div>
          {hydrated && user && (
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {user.accountType === 'professionnel' ? 'Compte professionnel / partenaire' : 'Compte client'} ·{' '}
              {user.email}
            </p>
          )}
        </div>

        {!hydrated && <div className="mt-10 h-32 animate-pulse bg-muted" />}

        {hydrated && !user && (
          <div className="mt-10 flex flex-col items-start gap-4 border border-border bg-card p-8 lg:p-10">
            <p className="font-serif text-2xl">Connectez-vous pour accéder à votre espace</p>
            <p className="max-w-lg leading-7 text-muted-foreground">
              Vos favoris, vos rendez-vous, vos demandes et vos documents vous attendent dès que vous êtes connecté
              à votre compte Akwaba Immobilier.
            </p>
            <Link
              href="/connexion"
              className="mt-2 rounded-lg bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0"
            >
              Se connecter
            </Link>
          </div>
        )}

        {hydrated && user && (
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
            <nav className="flex shrink-0 gap-1 overflow-x-auto border border-border bg-card p-1.5 lg:w-64 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:p-2">
              {navItems.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex shrink-0 items-center gap-2.5 whitespace-nowrap px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors lg:whitespace-normal',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4 shrink-0" /> {item.label}
                  </Link>
                )
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-0 flex shrink-0 items-center gap-2.5 whitespace-nowrap border-t-0 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-primary lg:mt-2 lg:border-t lg:border-border lg:whitespace-normal lg:pt-4"
              >
                <LogOut className="size-4 shrink-0" /> Se déconnecter
              </button>
            </nav>

            <div className="min-w-0 flex-1 border border-border bg-background p-6 lg:p-8">{children}</div>
          </div>
        )}
      </div>
    </div>
  )
}
