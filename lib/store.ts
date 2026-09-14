'use client'

// AKWABA IMMOBILIER — état client (espace client + back-office admin)
// En l'absence de backend, cette couche persiste l'état dans le localStorage
// du navigateur. Elle est conçue pour être remplacée facilement par de vrais
// appels API (même signatures de hooks) lorsqu'un backend sera branché.

import { useCallback, useEffect, useState } from 'react'

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

// ---- Favoris -------------------------------------------------------------

export function useFavorites() {
  const [ids, setIds, hydrated] = useLocalStorageState<string[]>('akwaba_favorites', [])

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    },
    [setIds],
  )

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, isFavorite, hydrated }
}

// ---- Rendez-vous -----------------------------------------------------------

export type AppointmentStatus = 'en_attente' | 'confirme' | 'annule' | 'termine'
export type AppointmentType =
  | 'Visite immobilière'
  | 'Consultation'
  | 'Estimation'
  | 'Projet de construction'
  | 'Projet foncier'
  | 'Gestion immobilière'

export interface Appointment {
  id: string
  type: AppointmentType
  propertyTitle?: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  advisor?: string
  status: AppointmentStatus
  createdAt: string
}

export function useAppointments() {
  const [items, setItems, hydrated] = useLocalStorageState<Appointment[]>('akwaba_appointments', [])

  const add = useCallback(
    (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
      const item: Appointment = {
        ...appointment,
        id: `rdv-${Date.now()}`,
        status: 'en_attente',
        createdAt: new Date().toISOString(),
      }
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

// ---- Demandes (estimation, information, achat, location, investissement...) -----

export type RequestType =
  | 'Achat'
  | 'Location'
  | 'Vente'
  | 'Estimation'
  | 'Terrain'
  | 'Construction'
  | 'Investissement'
  | 'Gestion'
  | 'Information'
  | 'Autre'
export type RequestStatus = 'nouvelle' | 'en_cours' | 'traitee' | 'cloturee'

export interface ClientRequest {
  id: string
  type: RequestType
  subject: string
  message: string
  name: string
  phone: string
  email: string
  propertyTitle?: string
  status: RequestStatus
  createdAt: string
}

export function useRequests() {
  const [items, setItems, hydrated] = useLocalStorageState<ClientRequest[]>('akwaba_requests', [])

  const add = useCallback(
    (request: Omit<ClientRequest, 'id' | 'createdAt' | 'status'>) => {
      const item: ClientRequest = {
        ...request,
        id: `dem-${Date.now()}`,
        status: 'nouvelle',
        createdAt: new Date().toISOString(),
      }
      setItems((prev) => [item, ...prev])
      return item
    },
    [setItems],
  )

  const updateStatus = useCallback(
    (id: string, status: RequestStatus) => {
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    },
    [setItems],
  )

  return { items, add, updateStatus, hydrated }
}

// ---- Documents client ------------------------------------------------------

export interface ClientDocument {
  id: string
  label: string
  type: string
  status: 'disponible' | 'en_attente'
  date: string
}

const seedDocuments: ClientDocument[] = [
  { id: 'doc-1', label: 'Contrat de réservation — Cité Atlantide', type: 'PDF', status: 'disponible', date: '2026-08-14' },
  { id: 'doc-2', label: 'Rapport d’estimation — Villa Riviera Golf', type: 'PDF', status: 'disponible', date: '2026-07-30' },
  { id: 'doc-3', label: 'Quittance de loyer — Septembre 2026', type: 'PDF', status: 'en_attente', date: '2026-09-01' },
]

export function useClientDocuments() {
  const [items, , hydrated] = useLocalStorageState<ClientDocument[]>('akwaba_documents', seedDocuments)
  return { items, hydrated }
}

// ---- Authentification (mock) ------------------------------------------------

export interface AuthUser {
  name: string
  email: string
  phone?: string
  accountType: 'client' | 'professionnel'
}

export function useAuth() {
  const [user, setUser, hydrated] = useLocalStorageState<AuthUser | null>('akwaba_user', null)

  const login = useCallback(
    (email: string, _password: string) => {
      const account: AuthUser = { name: email.split('@')[0] || 'Client Akwaba', email, accountType: 'client' }
      setUser(account)
      return account
    },
    [setUser],
  )

  const register = useCallback(
    (data: { name: string; email: string; phone?: string; accountType: 'client' | 'professionnel' }) => {
      setUser(data)
      return data
    },
    [setUser],
  )

  const logout = useCallback(() => setUser(null), [setUser])

  return { user, login, register, logout, hydrated }
}

// ---- Générique pour les collections du back-office ------------------------

/**
 * Fusionne un jeu de données "seed" (venant de lib/data.ts) avec des éléments
 * ajoutés localement depuis le back-office, et permet add/update/remove.
 * Les éléments seed ne sont jamais supprimés définitivement : un id ajouté à
 * `removedSeedIds` les masque simplement de la vue admin.
 */
export function useAdminCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [extra, setExtra, hydratedExtra] = useLocalStorageState<T[]>(`akwaba_admin_${key}_extra`, [])
  const [removedSeedIds, setRemovedSeedIds] = useLocalStorageState<string[]>(`akwaba_admin_${key}_removed`, [])
  const [overrides, setOverrides, hydratedOverrides] = useLocalStorageState<Record<string, Partial<T>>>(
    `akwaba_admin_${key}_overrides`,
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
