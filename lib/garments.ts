// KÔSMÉA — base de modèles de vêtements pour le Fashion Designer (Créer ma
// tenue). Chaque catégorie dispose de vraies photos de référence ; la
// couleur choisie par le client est ensuite appliquée en superposition sur
// la photo — un rendu indicatif, jamais un photomontage IA du tissu.

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

export interface GarmentTemplate {
  id: string
  category: string
  cuts: string[]
  label: string
  photo: string
}

export const garmentTemplates: GarmentTemplate[] = [
  { id: 'gt-1', category: 'Robe', cuts: ['Sirène', 'Cintrée'], label: 'Robe longue cintrée', photo: img('photo-1531123897727-8f129e1688ce') },
  { id: 'gt-2', category: 'Robe', cuts: ['Évasée', 'Ample'], label: 'Robe fluide évasée', photo: img('photo-1490481651871-ab68de25d43d') },
  { id: 'gt-3', category: 'Robe', cuts: ['Droite'], label: 'Robe droite épurée', photo: img('photo-1524504388940-b1c1722653e1') },
  { id: 'gt-4', category: 'Ensemble', cuts: ['Cintrée', 'Droite'], label: 'Ensemble deux pièces', photo: img('photo-1490725263030-1901c73f4dfd') },
  { id: 'gt-5', category: 'Ensemble', cuts: ['Ample', 'Évasée'], label: 'Ensemble ample', photo: img('photo-1523381210434-271e8be1f52b') },
  { id: 'gt-6', category: 'Tenue traditionnelle', cuts: ['Ample', 'Droite'], label: 'Tenue traditionnelle brodée', photo: img('photo-1445205170230-053b83016050') },
  { id: 'gt-7', category: 'Tenue traditionnelle', cuts: ['Évasée', 'Sirène'], label: 'Robe wax traditionnelle', photo: img('photo-1594736797933-d0501ba2fe65') },
  { id: 'gt-8', category: 'Tenue traditionnelle', cuts: ['Cintrée'], label: 'Ensemble pagne cintré', photo: img('photo-1509631179647-0177331693ae') },
  { id: 'gt-9', category: 'Tailleur', cuts: ['Droite', 'Cintrée'], label: 'Tailleur pantalon', photo: img('photo-1523381210434-271e8be1f52b') },
  { id: 'gt-10', category: 'Tailleur', cuts: ['Ample'], label: 'Tailleur ample', photo: img('photo-1490114538077-0a7f8cb49889') },
  { id: 'gt-11', category: 'Chemise', cuts: ['Droite', 'Ample'], label: 'Chemise ample en lin', photo: img('photo-1495385794356-15371f348c31') },
  { id: 'gt-12', category: 'Chemise', cuts: ['Cintrée', 'Sirène'], label: 'Chemise cintrée', photo: img('photo-1490114538077-0a7f8cb49889') },
]

/** Retourne les modèles les plus pertinents pour une catégorie + coupe données. */
export function findGarments(category: string, cut: string, limit = 3): GarmentTemplate[] {
  const sameCategory = garmentTemplates.filter((g) => g.category === category)
  const exactCut = sameCategory.filter((g) => g.cuts.includes(cut))
  const rest = sameCategory.filter((g) => !exactCut.includes(g))
  return [...exactCut, ...rest].slice(0, limit)
}

/** Mots-clés produits marketplace correspondant à chaque catégorie du configurateur. */
export const categoryProductKeywords: Record<string, string[]> = {
  'Robe': ['robe'],
  'Ensemble': ['ensemble', 'top', 'tailleur'],
  'Tenue traditionnelle': ['traditionnel', 'boubou', 'pagne', 'wax'],
  'Tailleur': ['tailleur', 'pantalon', 'veste'],
  'Chemise': ['chemise'],
}
