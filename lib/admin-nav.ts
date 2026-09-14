// AKWABA ADMIN — structure de navigation du back-office
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Building2,
  Building,
  Trees,
  Users,
  Inbox,
  UserRound,
  CalendarClock,
  FileText,
  Newspaper,
  Clapperboard,
  Quote,
  HelpCircle,
  MapPinned,
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
      { href: '/admin/biens', label: 'Biens', icon: Building2 },
      { href: '/admin/projets', label: 'Projets', icon: Building },
      { href: '/admin/terrains', label: 'Terrains', icon: Trees },
    ],
  },
  {
    label: 'CRM',
    items: [
      { href: '/admin/clients', label: 'Clients', icon: Users },
      { href: '/admin/leads', label: 'Leads', icon: Inbox },
      { href: '/admin/agents', label: 'Agents', icon: UserRound },
      { href: '/admin/rendez-vous', label: 'Rendez-vous', icon: CalendarClock },
    ],
  },
  {
    label: 'Contenu',
    items: [
      { href: '/admin/documents', label: 'Documents', icon: FileText },
      { href: '/admin/magazine', label: 'Magazine', icon: Newspaper },
      { href: '/admin/tv', label: 'TV', icon: Clapperboard },
      { href: '/admin/temoignages', label: 'Témoignages', icon: Quote },
      { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
      { href: '/admin/agences', label: 'Agences', icon: MapPinned },
    ],
  },
  {
    label: 'Système',
    items: [
      { href: '/admin/notifications', label: 'Notifications', icon: Bell },
      { href: '/admin/statistiques', label: 'Statistiques', icon: BarChart3 },
      { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
    ],
  },
]
