// AKWABA IMMOBILIER — analyseur de requêtes en langage naturel (local, sans appel externe)
// Recherche de mots-clés simples dans une phrase pour construire des filtres sur `properties`.
// Ceci n'est pas un modèle de langage : c'est une simulation pédagogique de recherche intelligente,
// entièrement basée sur le catalogue existant.

import { properties, villesCouvertes, type Property, type PropertyCategory, type TransactionType } from '@/lib/data'

export interface ParsedQuery {
  budget?: number
  city?: string
  category?: PropertyCategory
  transaction?: TransactionType
  raw: string
}

const categoryKeywords: Record<PropertyCategory, string[]> = {
  villa: ['villa', 'villas'],
  maison: ['maison', 'maisons'],
  appartement: ['appartement', 'appartements', 'appart'],
  terrain: ['terrain', 'terrains', 'parcelle', 'parcelles', 'lot', 'lots'],
  bureau: ['bureau', 'bureaux'],
  commerce: ['commerce', 'commerces', 'local commercial', 'boutique'],
  immeuble: ['immeuble', 'immeubles'],
}

const rentKeywords = ['louer', 'location', 'locatif', 'locative', 'à louer']
const saleKeywords = ['acheter', 'achat', 'vente', 'vendre', 'à vendre', 'acquérir', 'acquisition']

const knownCities = Array.from(new Set([...villesCouvertes, ...properties.map((p) => p.city), ...properties.map((p) => p.district)]))

/** Analyse une phrase libre et en extrait budget, ville, catégorie et type de transaction. */
export function parseQuery(input: string): ParsedQuery {
  const raw = input.trim()
  const lower = raw.toLowerCase()

  // Budget : un nombre suivi de "million(s)" (ex: "100 millions", "45 million")
  let budget: number | undefined
  const millionMatch = lower.match(/(\d+(?:[.,]\d+)?)\s*millions?/)
  if (millionMatch) {
    budget = Math.round(parseFloat(millionMatch[1].replace(',', '.')) * 1_000_000)
  } else {
    // fallback : un grand nombre brut (ex: "20000000 fcfa" ou "20 000 000")
    const rawNumberMatch = lower.match(/(\d[\d\s]{6,})\s*(fcfa)?/)
    if (rawNumberMatch) {
      const cleaned = Number(rawNumberMatch[1].replace(/\s/g, ''))
      if (!Number.isNaN(cleaned) && cleaned >= 1_000_000) budget = cleaned
    }
  }

  // Ville : recherche de correspondance parmi les villes/quartiers connus
  const city = knownCities.find((v) => lower.includes(v.toLowerCase()))

  // Catégorie
  let category: PropertyCategory | undefined
  for (const [cat, keywords] of Object.entries(categoryKeywords) as [PropertyCategory, string[]][]) {
    if (keywords.some((k) => lower.includes(k))) {
      category = cat
      break
    }
  }

  // Transaction
  let transaction: TransactionType | undefined
  if (rentKeywords.some((k) => lower.includes(k))) transaction = 'location'
  else if (saleKeywords.some((k) => lower.includes(k))) transaction = 'vente'

  return { budget, city, category, transaction, raw }
}

/** Filtre le catalogue de biens selon une requête analysée. */
export function matchProperties(query: ParsedQuery, limit = 3): Property[] {
  const results = properties.filter((p) => {
    if (query.category && p.category !== query.category) return false
    if (query.transaction && p.transaction !== query.transaction) return false
    if (query.city && !(p.city.toLowerCase().includes(query.city!.toLowerCase()) || p.district.toLowerCase().includes(query.city!.toLowerCase()))) return false
    if (query.budget && p.price > query.budget) return false
    return true
  })

  return results.slice(0, limit)
}

/** Résumé lisible des filtres détectés, pour affichage sous forme de badges. */
export function describeQuery(query: ParsedQuery): string[] {
  const parts: string[] = []
  if (query.category) {
    const labels: Record<PropertyCategory, string> = {
      villa: 'Villa', maison: 'Maison', appartement: 'Appartement', terrain: 'Terrain',
      bureau: 'Bureau', commerce: 'Commerce', immeuble: 'Immeuble',
    }
    parts.push(labels[query.category])
  }
  if (query.transaction) parts.push(query.transaction === 'location' ? 'À louer' : 'À vendre')
  if (query.city) parts.push(query.city)
  if (query.budget) parts.push(`< ${new Intl.NumberFormat('fr-FR').format(query.budget)} FCFA`)
  return parts
}
