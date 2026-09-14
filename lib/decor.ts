// AKWABA IMMOBILIER — Décorateur virtuel 3D
// Catalogue de mobilier et types partagés entre le canvas 3D et le store.
// Tous les meubles sont générés proceduralement (aucun modèle 3D externe),
// ce qui évite toute dépendance réseau/licence et garde la scène légère.

export type FurnitureType =
  | 'canape'
  | 'fauteuil'
  | 'table-basse'
  | 'table-manger'
  | 'chaise'
  | 'lit'
  | 'armoire'
  | 'bureau'
  | 'bibliotheque'
  | 'meuble-tv'
  | 'television'
  | 'tapis'
  | 'lampe'

export type FurnitureCategory = 'Salon' | 'Salle à manger' | 'Chambre' | 'Bureau' | 'Multimédia' | 'Rangement' | 'Déco'

export interface FurnitureCatalogItem {
  type: FurnitureType
  label: string
  category: FurnitureCategory
  defaultColor: string
  /** Emprise au sol en mètres [largeur, profondeur], pour le placement et les limites de la pièce. */
  footprint: [number, number]
}

export const furnitureCatalog: FurnitureCatalogItem[] = [
  { type: 'canape', label: 'Canapé 3 places', category: 'Salon', defaultColor: '#3a332c', footprint: [2.0, 0.9] },
  { type: 'fauteuil', label: 'Fauteuil', category: 'Salon', defaultColor: '#8a5a3c', footprint: [0.8, 0.85] },
  { type: 'table-basse', label: 'Table basse', category: 'Salon', defaultColor: '#6b4a33', footprint: [1.1, 0.55] },
  { type: 'tapis', label: 'Tapis', category: 'Déco', defaultColor: '#c9a876', footprint: [2.2, 1.5] },
  { type: 'lampe', label: 'Lampadaire', category: 'Déco', defaultColor: '#d9cdb8', footprint: [0.4, 0.4] },
  { type: 'table-manger', label: 'Table à manger', category: 'Salle à manger', defaultColor: '#5b3d28', footprint: [1.6, 0.9] },
  { type: 'chaise', label: 'Chaise', category: 'Salle à manger', defaultColor: '#2c2c2c', footprint: [0.45, 0.5] },
  { type: 'lit', label: 'Lit double', category: 'Chambre', defaultColor: '#e8e2d8', footprint: [1.6, 2.0] },
  { type: 'armoire', label: 'Armoire', category: 'Chambre', defaultColor: '#f5f1ea', footprint: [1.2, 0.6] },
  { type: 'bureau', label: 'Bureau', category: 'Bureau', defaultColor: '#7a5236', footprint: [1.2, 0.6] },
  { type: 'bibliotheque', label: 'Bibliothèque', category: 'Rangement', defaultColor: '#4a3423', footprint: [0.9, 0.35] },
  { type: 'meuble-tv', label: 'Meuble TV', category: 'Multimédia', defaultColor: '#2b2b2b', footprint: [1.4, 0.4] },
  { type: 'television', label: 'Télévision', category: 'Multimédia', defaultColor: '#111111', footprint: [1.1, 0.08] },
]

export function getCatalogItem(type: FurnitureType): FurnitureCatalogItem {
  const item = furnitureCatalog.find((f) => f.type === type)
  if (!item) throw new Error(`Meuble inconnu: ${type}`)
  return item
}

export const furnitureCategories: FurnitureCategory[] = [
  'Salon',
  'Salle à manger',
  'Chambre',
  'Bureau',
  'Multimédia',
  'Rangement',
  'Déco',
]

export const wallColorPresets = [
  { label: 'Blanc cassé', value: '#f4f0e8' },
  { label: 'Gris perle', value: '#d9d4cb' },
  { label: 'Terracotta', value: '#c17a54' },
  { label: 'Vert sauge', value: '#8a9a7e' },
  { label: 'Bleu nuit', value: '#2c3e50' },
  { label: 'Graphite Akwaba', value: '#241f1a' },
  { label: 'Ocre', value: '#c99a4b' },
  { label: 'Rouge Akwaba', value: '#b3261e' },
]

export const floorColorPresets = [
  { label: 'Parquet clair', value: '#c9a876' },
  { label: 'Parquet foncé', value: '#6b4a33' },
  { label: 'Carrelage clair', value: '#e8e4dc' },
  { label: 'Carrelage graphite', value: '#3a3530' },
  { label: 'Béton ciré', value: '#a8a29a' },
  { label: 'Marbre blanc', value: '#efece6' },
]

export interface PlacedItem {
  id: string
  type: FurnitureType
  /** Position en mètres, origine au centre de la pièce. */
  x: number
  z: number
  rotationY: number
  color: string
}

export interface DecorProject {
  id: string
  name: string
  propertyId?: string
  propertyTitle?: string
  width: number
  depth: number
  height: number
  wallColor: string
  floorColor: string
  items: PlacedItem[]
  createdAt: string
  updatedAt: string
}

export interface RoomPreset {
  label: string
  width: number
  depth: number
  height: number
}

export const roomPresets: RoomPreset[] = [
  { label: 'Chambre (12 m²)', width: 3.5, depth: 3.5, height: 2.6 },
  { label: 'Salon (25 m²)', width: 5.5, depth: 4.5, height: 2.7 },
  { label: 'Salle à manger (16 m²)', width: 4.5, depth: 3.5, height: 2.7 },
  { label: 'Bureau (10 m²)', width: 3.2, depth: 3.2, height: 2.6 },
  { label: 'Grand séjour (40 m²)', width: 7, depth: 5.7, height: 2.9 },
]
