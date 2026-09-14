// KÔSMÉA AI — moteur local de compréhension de requêtes en langage naturel.
// Important : ceci n'est PAS un modèle de langage. C'est une simulation pédagogique
// de recherche/assistant IA, entièrement basée sur des mots-clés et sur le catalogue
// réel de la plateforme (produits, looks). Elle ne recommande jamais un produit ou un
// look qui n'existe pas réellement dans `lib/data.ts` — conformément à la règle du
// projet : ne jamais inventer une disponibilité produit.

import {
  looks,
  products,
  productsByIds,
  lookTotal,
  type Look,
  type Product,
  type ProductCategory,
} from '@/lib/data'

export interface ParsedQuery {
  raw: string
  budget?: number
  occasion?: string
  category?: ProductCategory
  color?: string
  keywords: string[]
}

const occasionKeywords: Record<string, string[]> = {
  Mariage: ['mariage', 'mariée', 'noces', 'fiançailles'],
  Soirée: ['soirée', 'soiree', 'gala', 'anniversaire', 'vip', 'fête', 'fete'],
  Bureau: ['bureau', 'entretien', 'travail', 'professionnel', 'professionnelle'],
  Traditionnel: ['traditionnel', 'traditionnelle', 'cérémonie', 'ceremonie', 'baptême', 'bapteme'],
  Casual: ['casual', 'décontracté', 'decontracte', 'weekend', 'quotidien'],
  Cheveux: ['coiffure', 'perruque', 'cheveux', 'tresses'],
  Beauté: ['maquillage', 'makeup', 'teint', 'lèvres', 'levres'],
}

const categoryKeywords: Record<ProductCategory, string[]> = {
  beaute: ['maquillage', 'makeup', 'rouge à lèvres', 'fond de teint', 'blush', 'mascara', 'parfum', 'soin', 'skincare'],
  mode: ['robe', 'tenue', 'chemise', 'pantalon', 'jupe', 'veste', 'wax', 'pagne', 'jean'],
  cheveux: ['perruque', 'lace', 'mèche', 'meche', 'tresse', 'extension', 'wig'],
  accessoires: ['sac', 'chaussure', 'bijou', 'bijoux', 'montre', 'lunette', 'ceinture', 'boucle'],
}

const colorKeywords = [
  'rouge', 'noir', 'blanc', 'doré', 'dore', 'or', 'terracotta', 'nude', 'bleu', 'vert',
  'rose', 'champagne', 'prune', 'plum', 'ivoire', 'orange', 'cognac',
]

/** Analyse une phrase libre et en extrait budget, occasion, catégorie et couleur. */
export function parseQuery(input: string): ParsedQuery {
  const raw = input.trim()
  const lower = raw.toLowerCase()

  // Budget : "100 000 FCFA", "100 000", "100000 FCFA", "moins de 75 000"
  let budget: number | undefined
  const numberMatch = lower.match(/(\d[\d\s]{3,})\s*(fcfa)?/)
  if (numberMatch) {
    const cleaned = Number(numberMatch[1].replace(/\s/g, ''))
    if (!Number.isNaN(cleaned) && cleaned >= 1000) budget = cleaned
  }

  let occasion: string | undefined
  for (const [label, keywords] of Object.entries(occasionKeywords)) {
    if (keywords.some((k) => lower.includes(k))) {
      occasion = label
      break
    }
  }

  let category: ProductCategory | undefined
  for (const [cat, keywords] of Object.entries(categoryKeywords) as [ProductCategory, string[]][]) {
    if (keywords.some((k) => lower.includes(k))) {
      category = cat
      break
    }
  }

  const color = colorKeywords.find((c) => lower.includes(c))
  const keywords = lower.split(/\s+/).filter((w) => w.length > 2)

  return { raw, budget, occasion, category, color, keywords }
}

/** Filtre le catalogue produits selon une requête analysée. */
export function matchProducts(query: ParsedQuery, limit = 6): Product[] {
  const results = products.filter((p) => {
    if (query.category && p.category !== query.category) return false
    if (query.budget && p.price > query.budget) return false
    if (query.color) {
      const inColors = p.colors?.some((c) => c.toLowerCase().includes(query.color!))
      const inShade = p.shade?.name.toLowerCase().includes(query.color!)
      const inTags = p.tags.some((t) => t.toLowerCase().includes(query.color!))
      if (!inColors && !inShade && !inTags) return false
    }
    return true
  })
  return results.slice(0, limit)
}

/** Compose des propositions de looks complets (Beauty AI / AI Personal Stylist). */
export function matchLooks(query: ParsedQuery, limit = 3): Look[] {
  let candidates = looks
  if (query.occasion) {
    candidates = candidates.filter((l) => l.category === query.occasion)
  }
  if (candidates.length === 0) candidates = looks

  const scored = candidates
    .map((look) => ({ look, total: lookTotal(look) }))
    .filter(({ total }) => (query.budget ? total <= query.budget * 1.15 : true))
    .sort((a, b) => {
      if (query.budget) return Math.abs(a.total - query.budget) - Math.abs(b.total - query.budget)
      return b.look.likes - a.look.likes
    })

  return scored.slice(0, limit).map((s) => s.look)
}

export interface LookProposal {
  look: Look
  items: Product[]
  total: number
  withinBudget: boolean
}

export function buildLookProposals(query: ParsedQuery, limit = 3): LookProposal[] {
  return matchLooks(query, limit).map((look) => {
    const items = productsByIds(look.productIds)
    const total = lookTotal(look)
    return { look, items, total, withinBudget: query.budget ? total <= query.budget : true }
  })
}

/** Résumé lisible des filtres détectés, pour affichage sous forme de badges. */
export function describeQuery(query: ParsedQuery): string[] {
  const parts: string[] = []
  if (query.occasion) parts.push(query.occasion)
  if (query.category) {
    const labels: Record<ProductCategory, string> = { beaute: 'Beauté', mode: 'Mode', cheveux: 'Cheveux', accessoires: 'Accessoires' }
    parts.push(labels[query.category])
  }
  if (query.color) parts.push(query.color.charAt(0).toUpperCase() + query.color.slice(1))
  if (query.budget) parts.push(`< ${new Intl.NumberFormat('fr-FR').format(query.budget)} FCFA`)
  return parts
}

// ---- Suggestions rapides pour l'interface de l'assistant ---------------------

export const assistantSuggestions = [
  'Je vais à un mariage samedi, budget 100 000 FCFA',
  'Je cherche une tenue professionnelle pour un entretien',
  'Rouge à lèvres nude pour tous les jours',
  'Une tenue traditionnelle élégante pour une cérémonie',
  'J’ai un budget de 50 000 FCFA pour une soirée',
]
