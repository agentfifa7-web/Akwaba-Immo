'use client'

// KÔSMÉA — état client (espace client, espace pro & back-office admin)
// En l'absence de backend, cette couche persiste l'état dans le localStorage du
// navigateur. Elle est conçue pour être remplacée par de vrais appels API (mêmes
// signatures de hooks) lorsqu'un backend (auth, paiement, commandes...) sera branché.

import { useCallback, useEffect, useState } from 'react'
import { products, type Product } from '@/lib/data'

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // stockage indisponible (mode privé, quota) : on ignore silencieusement
  }
}

/** Hook générique d'état persistant dans le localStorage, hydration-safe. */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setValue(readStorage(key, initialValue))
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    if (hydrated) writeStorage(key, value)
  }, [key, value, hydrated])

  return [value, setValue, hydrated] as const
}

// ---- Panier -----------------------------------------------------------------

export interface CartItem {
  productId: string
  quantity: number
  color?: string
  size?: string
}

export interface CartLine extends CartItem {
  product: Product
}

export function useCart() {
  const [items, setItems, hydrated] = useLocalStorageState<CartItem[]>('kosmea_cart', [])

  const add = useCallback(
    (productId: string, quantity = 1, color?: string, size?: string) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.productId === productId && i.color === color && i.size === size)
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
          return next
        }
        return [...prev, { productId, quantity, color, size }]
      })
    },
    [setItems],
  )

  const updateQuantity = useCallback(
    (productId: string, quantity: number, color?: string, size?: string) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size))
          : prev.map((i) => (i.productId === productId && i.color === color && i.size === size ? { ...i, quantity } : i)),
      )
    },
    [setItems],
  )

  const remove = useCallback(
    (productId: string, color?: string, size?: string) => {
      setItems((prev) => prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size)))
    },
    [setItems],
  )

  const clear = useCallback(() => setItems([]), [setItems])

  const lines: CartLine[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return product ? { ...item, product } : null
    })
    .filter((l): l is CartLine => Boolean(l))

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)

  const linesByBoutique = lines.reduce<Record<string, CartLine[]>>((acc, line) => {
    const key = line.product.boutiqueId
    acc[key] = acc[key] ? [...acc[key], line] : [line]
    return acc
  }, {})

  return { items, lines, linesByBoutique, add, updateQuantity, remove, clear, totalCount, totalPrice, hydrated }
}

// ---- Favoris / Wishlist -------------------------------------------------------

export type WishlistType = 'produits' | 'looks' | 'stylistes' | 'professionnels' | 'boutiques' | 'cours'

export function useWishlist(type: WishlistType) {
  const [ids, setIds, hydrated] = useLocalStorageState<string[]>(`kosmea_wishlist_${type}`, [])

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    },
    [setIds],
  )

  const isSaved = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, isSaved, hydrated }
}

/** Raccourci pour les favoris produits, utilisé dans le header / la nav mobile. */
export function useFavorites() {
  return useWishlist('produits')
}

// ---- Mon Avatar (Try-On) -----------------------------------------------------

export interface AvatarConfig {
  mannequinId: string
  skinTone: string
  faceShape: string
  hairstyle: string
  hairColor: string
  hairLength: string
  foundationShade: string
  blushShade: string
  eyeshadowShade: string
  lipstickShade: string
  eyeliner: boolean
  mascara: boolean
  outfitColor: string
  bodyType: string
  height: string
  clothingSize: string
}

export const defaultAvatar: AvatarConfig = {
  mannequinId: 'mq-1',
  skinTone: '#B97A46',
  faceShape: 'Ovale',
  hairstyle: 'Lace wig lisse',
  hairColor: '#171310',
  hairLength: 'Longue',
  foundationShade: '#A9713F',
  blushShade: '#B96F55',
  eyeshadowShade: '#D8C29D',
  lipstickShade: '#B96F55',
  eyeliner: true,
  mascara: true,
  outfitColor: '#3A1F32',
  bodyType: 'Silhouette moyenne',
  height: '1,65 m',
  clothingSize: 'M',
}

export function useAvatar() {
  const [config, setConfig, hydrated] = useLocalStorageState<AvatarConfig>('kosmea_avatar', defaultAvatar)

  const update = useCallback(
    (patch: Partial<AvatarConfig>) => setConfig((prev) => ({ ...prev, ...patch })),
    [setConfig],
  )

  const reset = useCallback(() => setConfig(defaultAvatar), [setConfig])

  return { config, update, reset, hydrated }
}

// ---- Mes créations (looks, tenues, couleurs sauvegardés) ---------------------

export type CreationType = 'look' | 'tenue' | 'couleur' | 'maquillage'

export interface Creation {
  id: string
  type: CreationType
  title: string
  summary: string
  cover?: string
  config: Record<string, string>
  createdAt: string
}

export function useCreations() {
  const [items, setItems, hydrated] = useLocalStorageState<Creation[]>('kosmea_creations', [])

  const add = useCallback(
    (creation: Omit<Creation, 'id' | 'createdAt'>) => {
      const item: Creation = { ...creation, id: `cr-${Date.now()}`, createdAt: new Date().toISOString() }
      setItems((prev) => [item, ...prev])
      return item
    },
    [setItems],
  )

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((c) => c.id !== id)), [setItems])

  return { items, add, remove, hydrated }
}

// ---- Points & Récompenses KÔSMÉA ---------------------------------------------

export interface RewardTransaction {
  id: string
  label: string
  points: number
  date: string
}

export type PrivilegeLevel = 'Silver' | 'Gold' | 'Diamond'

export function privilegeLevel(points: number): PrivilegeLevel {
  if (points >= 6000) return 'Diamond'
  if (points >= 2000) return 'Gold'
  return 'Silver'
}

export function nextLevelThreshold(points: number): number | null {
  if (points < 2000) return 2000
  if (points < 6000) return 6000
  return null
}

const seedTransactions: RewardTransaction[] = [
  { id: 'rw-1', label: 'Bienvenue sur KÔSMÉA', points: 100, date: '2026-08-01' },
  { id: 'rw-2', label: 'Achat — Fond de teint Velours', points: 60, date: '2026-08-20' },
  { id: 'rw-3', label: 'Cours terminé — Maquillage naturel', points: 50, date: '2026-08-27' },
  { id: 'rw-4', label: 'Avis laissé — Éclat de Cocody', points: 20, date: '2026-09-02' },
]

export function usePoints() {
  const [transactions, setTransactions, hydrated] = useLocalStorageState<RewardTransaction[]>(
    'kosmea_points',
    seedTransactions,
  )

  const addPoints = useCallback(
    (label: string, points: number) => {
      setTransactions((prev) => [{ id: `rw-${Date.now()}`, label, points, date: new Date().toISOString() }, ...prev])
    },
    [setTransactions],
  )

  const total = transactions.reduce((sum, t) => sum + t.points, 0)
  const level = privilegeLevel(total)
  const nextThreshold = nextLevelThreshold(total)

  return { transactions, total, level, nextThreshold, addPoints, hydrated }
}

// ---- Rendez-vous (stylistes, maquilleuses, coiffeurs, salons...) -------------

export type AppointmentStatus = 'en_attente' | 'confirme' | 'annule' | 'termine'

export interface Appointment {
  id: string
  providerName: string
  providerType: string
  serviceName: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  status: AppointmentStatus
  createdAt: string
}

export function useAppointments() {
  const [items, setItems, hydrated] = useLocalStorageState<Appointment[]>('kosmea_appointments', [])

  const add = useCallback(
    (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
      const item: Appointment = { ...appointment, id: `rdv-${Date.now()}`, status: 'en_attente', createdAt: new Date().toISOString() }
      setItems((prev) => [item, ...prev])
      return item
    },
    [setItems],
  )

  const updateStatus = useCallback(
    (id: string, status: AppointmentStatus) => {
      setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
    },
    [setItems],
  )

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((a) => a.id !== id)), [setItems])

  return { items, add, updateStatus, remove, hydrated }
}

// ---- Demandes de création sur mesure (styliste) ------------------------------

export type CustomRequestStatus = 'nouvelle' | 'en_discussion' | 'devis_envoye' | 'acceptee' | 'en_production' | 'livree'

export interface CustomRequest {
  id: string
  stylistName: string
  title: string
  description: string
  budget?: number
  name: string
  phone: string
  email: string
  status: CustomRequestStatus
  createdAt: string
}

export function useCustomRequests() {
  const [items, setItems, hydrated] = useLocalStorageState<CustomRequest[]>('kosmea_custom_requests', [])

  const add = useCallback(
    (request: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>) => {
      const item: CustomRequest = { ...request, id: `dem-${Date.now()}`, status: 'nouvelle', createdAt: new Date().toISOString() }
      setItems((prev) => [item, ...prev])
      return item
    },
    [setItems],
  )

  const updateStatus = useCallback(
    (id: string, status: CustomRequestStatus) => {
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    },
    [setItems],
  )

  return { items, add, updateStatus, hydrated }
}

// ---- Commandes ----------------------------------------------------------------

export type OrderStatus = 'recue' | 'paiement_confirme' | 'preparation' | 'prete' | 'expediee' | 'en_livraison' | 'livree'

export interface OrderItem {
  productId: string
  quantity: number
  color?: string
  size?: string
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  deliveryMethod: string
  address: string
  status: OrderStatus
  createdAt: string
}

const seedOrders: Order[] = [
  {
    id: 'kos-100234', total: 106500, deliveryMethod: 'Livraison express Abidjan', address: 'Cocody, Abidjan', status: 'en_livraison', createdAt: '2026-09-10',
    items: [{ productId: 'pd-1', quantity: 1, color: 'Caramel', price: 12000 }, { productId: 'pd-9', quantity: 1, price: 5500 }, { productId: 'pd-28', quantity: 1, price: 85000, size: '24"' }],
  },
  {
    id: 'kos-100198', total: 42000, deliveryMethod: 'Retrait en boutique', address: 'Ivoire Wax Couture — Plateau', status: 'livree', createdAt: '2026-08-22',
    items: [{ productId: 'pd-17', quantity: 1, color: 'Émeraude', size: 'M', price: 42000 }],
  },
]

export function useOrders() {
  const [items, setItems, hydrated] = useLocalStorageState<Order[]>('kosmea_orders', seedOrders)

  const add = useCallback(
    (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const item: Order = { ...order, id: `kos-${Math.floor(100000 + Math.random() * 900000)}`, status: 'recue', createdAt: new Date().toISOString() }
      setItems((prev) => [item, ...prev])
      return item
    },
    [setItems],
  )

  const updateStatus = useCallback(
    (id: string, status: OrderStatus) => {
      setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    },
    [setItems],
  )

  return { items, add, updateStatus, hydrated }
}

// ---- Authentification (mock) ------------------------------------------------

export type AccountType = 'client' | 'vendeur' | 'styliste' | 'professionnel'

export interface AuthUser {
  name: string
  email: string
  phone?: string
  accountType: AccountType
}

export function useAuth() {
  const [user, setUser, hydrated] = useLocalStorageState<AuthUser | null>('kosmea_user', null)

  const login = useCallback(
    (email: string, _password: string) => {
      const account: AuthUser = { name: email.split('@')[0] || 'Membre KÔSMÉA', email, accountType: 'client' }
      setUser(account)
      return account
    },
    [setUser],
  )

  const register = useCallback(
    (data: { name: string; email: string; phone?: string; accountType: AccountType }) => {
      setUser(data)
      return data
    },
    [setUser],
  )

  const logout = useCallback(() => setUser(null), [setUser])

  return { user, login, register, logout, hydrated }
}

// ---- Progression Beauty Academy ------------------------------------------

export function useCourseProgress(courseId: string) {
  const [progress, setProgress, hydrated] = useLocalStorageState<Record<string, number[]>>('kosmea_course_progress', {})
  const completedLessons = progress[courseId] ?? []

  const toggleLesson = useCallback(
    (lessonIndex: number) => {
      setProgress((prev) => {
        const current = prev[courseId] ?? []
        const next = current.includes(lessonIndex) ? current.filter((i) => i !== lessonIndex) : [...current, lessonIndex]
        return { ...prev, [courseId]: next }
      })
    },
    [courseId, setProgress],
  )

  return { completedLessons, toggleLesson, hydrated }
}

export function useEnrolledCourses() {
  const [ids, setIds, hydrated] = useLocalStorageState<string[]>('kosmea_enrolled_courses', [])
  const enroll = useCallback((courseId: string) => setIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId])), [setIds])
  const isEnrolled = useCallback((courseId: string) => ids.includes(courseId), [ids])
  return { ids, enroll, isEnrolled, hydrated }
}

// ---- Générique pour les collections du back-office ------------------------

/**
 * Fusionne un jeu de données "seed" (venant de lib/data.ts) avec des éléments
 * ajoutés localement depuis le back-office, et permet add/update/remove.
 * Les éléments seed ne sont jamais supprimés définitivement : un id ajouté à
 * `removedSeedIds` les masque simplement de la vue admin.
 */
export function useAdminCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [extra, setExtra, hydratedExtra] = useLocalStorageState<T[]>(`kosmea_admin_${key}_extra`, [])
  const [removedSeedIds, setRemovedSeedIds] = useLocalStorageState<string[]>(`kosmea_admin_${key}_removed`, [])
  const [overrides, setOverrides, hydratedOverrides] = useLocalStorageState<Record<string, Partial<T>>>(
    `kosmea_admin_${key}_overrides`,
    {},
  )

  const items = [...seed.filter((s) => !removedSeedIds.includes(s.id)), ...extra].map((item) =>
    overrides[item.id] ? { ...item, ...overrides[item.id] } : item,
  )

  const add = useCallback(
    (item: T) => {
      setExtra((prev) => [item, ...prev])
    },
    [setExtra],
  )

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      setExtra((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
      setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
    },
    [setExtra, setOverrides],
  )

  const remove = useCallback(
    (id: string, isSeed: boolean) => {
      if (isSeed) {
        setRemovedSeedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
      } else {
        setExtra((prev) => prev.filter((item) => item.id !== id))
      }
    },
    [setExtra, setRemovedSeedIds],
  )

  return { items, add, update, remove, hydrated: hydratedExtra && hydratedOverrides }
}
