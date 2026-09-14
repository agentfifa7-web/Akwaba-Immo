// KÔSMÉA ADMIN — structure de navigation du back-office
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Package,
  Store,
  Sparkles as StylistIcon,
  UserRound,
  ShoppingBag,
  CalendarClock,
  Tag,
  GraduationCap,
  Users2,
  Radio,
  Quote,
  Wand2,
  Users,
  Bell,
  BarChart3,
  Settings,
} from 'lucide-react'

export interface AdminNavItem {
  href: string
  label: string
  icon: LucideIcon
}

export interface AdminNavGroup {
  label: string | null
  items: AdminNavItem[]
}

export const adminNav: AdminNavGroup[] = [
  {
    label: null,
    items: [{ href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard }],
  },
  {
    label: 'Catalogue',
    items: [
      { href: '/admin/produits', label: 'Produits', icon: Package },
      { href: '/admin/boutiques', label: 'Boutiques', icon: Store },
      { href: '/admin/stylistes', label: 'Stylistes', icon: StylistIcon },
      { href: '/admin/professionnels', label: 'Professionnels', icon: UserRound },
    ],
  },
  {
    label: 'Activité',
    items: [
      { href: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
      { href: '/admin/rendez-vous', label: 'Réservations', icon: CalendarClock },
      { href: '/admin/promotions', label: 'Promotions', icon: Tag },
    ],
  },
  {
    label: 'Contenu',
    items: [
      { href: '/admin/formations', label: 'Formations', icon: GraduationCap },
      { href: '/admin/communaute', label: 'Communauté', icon: Users2 },
      { href: '/admin/live', label: 'Live', icon: Radio },
      { href: '/admin/avis', label: 'Avis', icon: Quote },
    ],
  },
  {
    label: 'Intelligence artificielle',
    items: [{ href: '/admin/ia', label: 'IA & Essayage', icon: Wand2 }],
  },
  {
    label: 'Système',
    items: [
      { href: '/admin/clients', label: 'Utilisateurs', icon: Users },
      { href: '/admin/notifications', label: 'Notifications', icon: Bell },
      { href: '/admin/statistiques', label: 'Statistiques', icon: BarChart3 },
      { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
    ],
  },
]
