// KÔSMÉA — mannequins photo pour le Virtual Beauty Studio.
// Remplace l'avatar illustré par une vraie photo de personne, sur laquelle
// les essayages (maquillage, coiffure, tenue) sont ensuite superposés sous
// forme de teintes de couleur — un rendu indicatif, jamais présenté comme
// une transformation IA photo-réaliste.

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

export interface Mannequin {
  id: string
  name: string
  skinTone: string
  description: string
  photo: string
}

export const mannequins: Mannequin[] = [
  { id: 'mq-1', name: 'Aïcha', skinTone: '#4A2E1C', description: 'Peau foncée, cheveux courts', photo: img('photo-1544005313-94ddf0286df2') },
  { id: 'mq-2', name: 'Nadège', skinTone: '#7A4B26', description: 'Peau caramel, cheveux longs', photo: img('photo-1580489944761-15a19d654956') },
  { id: 'mq-3', name: 'Karim', skinTone: '#5A3820', description: 'Peau brune, style urbain', photo: img('photo-1519085360753-af0119f7cbe7') },
  { id: 'mq-4', name: 'Nadia', skinTone: '#C98A4B', description: 'Peau miel, cheveux mi-longs', photo: img('photo-1573497019940-1c28c88b4f3e') },
  { id: 'mq-5', name: 'Yves', skinTone: '#8A5A34', description: 'Peau acajou, style classique', photo: img('photo-1500648767791-00dcc994a43e') },
  { id: 'mq-6', name: 'Grace', skinTone: '#3A2416', description: 'Peau ébène, cheveux naturels', photo: img('photo-1544717305-2782549b5136') },
]

export function getMannequin(id: string): Mannequin {
  return mannequins.find((m) => m.id === id) ?? mannequins[0]
}
