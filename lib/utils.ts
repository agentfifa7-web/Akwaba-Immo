import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Traduit un nom de couleur (FR) en valeur hexadécimale indicative, pour les
 * aperçus d'avatar et de studio de création. Purement illustratif. */
const colorNameMap: Record<string, string> = {
  'émeraude': '#0f5c4a', 'emeraude': '#0f5c4a', 'orange': '#d9762b', 'bleu roi': '#1c3f94',
  'or': '#d8c29d', 'doré': '#d8c29d', 'blanc': '#f8f3ea', 'terracotta': '#b96f55', 'noir': '#171310',
  'obsidian': '#171310', 'champagne': '#d8c29d', 'nude': '#d8b7a3', 'ivoire': '#f8f3ea', 'plum': '#3a1f32',
  'prune': '#3a1f32', 'ocre': '#c08a3e', 'denim brut': '#3a4a63', 'cognac': '#8a5a34', 'multicolore': '#b96f55',
  'écaille': '#5a4632', 'rouge': '#a4342b', 'vert': '#2f6b3f', 'rose': '#d99aa0', 'bleu': '#2c4a7c',
}

export function colorNameToHex(name?: string, fallback = '#b96f55'): string {
  if (!name) return fallback
  return colorNameMap[name.trim().toLowerCase()] ?? fallback
}
