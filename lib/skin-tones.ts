// KÔSMÉA — palette de teints, pensée pour la diversité des carnations
// africaines (marché initial : Côte d'Ivoire). Utilisée pour le mannequin
// et pour recommander des teintes de fond de teint réellement en stock.

export interface SkinTone {
  id: string
  name: string
  hex: string
}

export const skinTones: SkinTone[] = [
  { id: 'st-1', name: 'Ivoire doré', hex: '#F0D5B8' },
  { id: 'st-2', name: 'Beige sable', hex: '#E8C29E' },
  { id: 'st-3', name: 'Miel', hex: '#D9A876' },
  { id: 'st-4', name: 'Caramel clair', hex: '#C98A4B' },
  { id: 'st-5', name: 'Caramel', hex: '#B97A46' },
  { id: 'st-6', name: 'Noisette', hex: '#A9713F' },
  { id: 'st-7', name: 'Acajou clair', hex: '#8A5A34' },
  { id: 'st-8', name: 'Acajou', hex: '#7A4B26' },
  { id: 'st-9', name: 'Châtaigne', hex: '#6B4226' },
  { id: 'st-10', name: 'Chocolat', hex: '#5A3820' },
  { id: 'st-11', name: 'Ébène clair', hex: '#4A2E1C' },
  { id: 'st-12', name: 'Ébène profond', hex: '#2E1B10' },
]

export function getSkinTone(id: string): SkinTone {
  return skinTones.find((s) => s.id === id) ?? skinTones[4]
}

/** Trouve la teinte la plus proche d'un hex donné (ex: pour suggérer un fond de teint). */
export function closestSkinTone(hex: string): SkinTone {
  const toRgb = (h: string): [number, number, number] => {
    const clean = h.replace('#', '')
    const num = parseInt(clean, 16)
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
  }
  const [r1, g1, b1] = toRgb(hex)
  let best = skinTones[0]
  let bestDist = Infinity
  for (const tone of skinTones) {
    const [r2, g2, b2] = toRgb(tone.hex)
    const dist = (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
    if (dist < bestDist) {
      bestDist = dist
      best = tone
    }
  }
  return best
}
