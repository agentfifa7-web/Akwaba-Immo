// KÔSMÉA — couche de données mock
// Cette couche simule la future API/CMS de la marketplace. Toutes les pages doivent lire
// leurs données ici plutôt que de coder des valeurs en dur, afin de faciliter un futur
// branchement sur un vrai backend (base de données, moteur de recherche, paiement, IA).

export type ProductCategory = 'beaute' | 'mode' | 'cheveux' | 'accessoires'
export type ProductBadge = 'NOUVEAU' | 'PROMOTION' | 'EXCLUSIVITÉ' | 'BEST-SELLER'
export type VendorBadge = 'VERIFIED' | 'PREMIUM' | 'TOP' | 'NOUVEAU'

export interface Shade {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  subcategory: string
  price: number
  previousPrice?: number
  images: string[]
  description: string
  colors?: string[]
  sizes?: string[]
  shade?: Shade
  stock: number
  rating: number
  reviewsCount: number
  boutiqueId: string
  badges: ProductBadge[]
  tags: string[]
  origin?: string
  createdAt: string
  featured?: boolean
}

export interface Boutique {
  id: string
  slug: string
  name: string
  categories: ProductCategory[]
  logo: string
  cover: string
  city: string
  district: string
  description: string
  story: string
  rating: number
  reviewsCount: number
  followers: number
  badge: VendorBadge
  since: number
  delivery: string[]
  whatsapp: string
  coordinates: { lat: number; lng: number }
  openingHours: string
}

export interface StylistService {
  name: string
  price: number
  duration: string
}

export interface Stylist {
  id: string
  slug: string
  name: string
  photo: string
  cover: string
  city: string
  specialties: string[]
  bio: string
  rating: number
  reviewsCount: number
  priceFrom: number
  completedProjects: number
  responseTime: string
  services: StylistService[]
  portfolio: string[]
  availability: string[]
  badge?: VendorBadge
}

export type ProfessionalRole = 'Maquilleuse' | 'Coiffeur·se' | 'Onglerie' | 'Salon de beauté' | 'Photographe beauté' | 'Barbier'

export interface BeautyProfessional {
  id: string
  slug: string
  name: string
  role: ProfessionalRole
  photo: string
  cover: string
  city: string
  district: string
  specialties: string[]
  bio: string
  rating: number
  reviewsCount: number
  priceFrom: number
  services: StylistService[]
  portfolio: string[]
  badge?: VendorBadge
}

export interface Look {
  id: string
  slug: string
  title: string
  cover: string
  images: string[]
  category: string
  author: string
  authorType: 'Styliste' | 'Communauté' | 'KÔSMÉA'
  productIds: string[]
  likes: number
  saves: number
  createdAt: string
  tags: string[]
  featured?: boolean
}

export interface Lesson {
  title: string
  duration: string
  free?: boolean
}

export interface Course {
  id: string
  slug: string
  title: string
  category: string
  level: 'Débutant' | 'Intermédiaire' | 'Professionnel'
  cover: string
  instructor: string
  instructorPhoto: string
  duration: string
  price: number
  rating: number
  studentsCount: number
  lessons: Lesson[]
  description: string
}

export interface CommunityPost {
  id: string
  author: string
  authorPhoto: string
  handle: string
  image: string
  caption: string
  category: string
  productIds: string[]
  likes: number
  comments: number
  createdAt: string
}

export interface Challenge {
  id: string
  slug: string
  title: string
  theme: string
  cover: string
  prize: string
  deadline: string
  entriesCount: number
  status: 'actif' | 'termine'
}

export interface LiveSession {
  id: string
  slug: string
  title: string
  host: string
  hostPhoto: string
  cover: string
  scheduledAt: string
  status: 'live' | 'a_venir' | 'termine'
  viewers: number
  featuredProductId?: string
  discount?: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  city: string
  rating: number
  quote: string
  photo: string
}

export interface Article {
  id: string
  slug: string
  title: string
  category: string
  author: string
  date: string
  image: string
  excerpt: string
  content: string[]
}

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

export interface Partner {
  id: string
  category: string
  name: string
}

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

export const villesCouvertes = [
  'Cocody', 'Plateau', 'Marcory', 'Yopougon', 'Angré', 'Riviera', 'Treichville', 'Abobo',
  'Adjamé', 'Koumassi', 'Bingerville', 'Grand-Bassam', 'Yamoussoukro', 'Bouaké', 'San-Pédro',
]

export const categories: { id: ProductCategory; label: string; subcategories: string[]; cover: string }[] = [
  {
    id: 'beaute', label: 'Beauté', cover: img('photo-1596462502278-27bfdc403348'),
    subcategories: ['Maquillage', 'Fond de teint', 'Anti-cernes', 'Poudre', 'Blush', 'Highlighter', 'Fard à paupières', 'Eyeliner', 'Mascara', 'Rouge à lèvres', 'Gloss', 'Soins de la peau', 'Soins du corps', 'Parfum', 'Onglerie'],
  },
  {
    id: 'mode', label: 'Mode', cover: img('photo-1483985988355-763728e1935b'),
    subcategories: ['Robes', 'Hauts', 'Chemises', 'Pantalons', 'Jeans', 'Jupes', 'Vestes', 'Mode traditionnelle', 'Mode africaine', 'Tenues de soirée', 'Tenues professionnelles'],
  },
  {
    id: 'cheveux', label: 'Cheveux', cover: img('photo-1595959183082-7b570b7e08e2'),
    subcategories: ['Perruques', 'Lace wigs', 'Tresses', 'Extensions', 'Mèches', 'Closures', 'Frontals', 'Accessoires cheveux'],
  },
  {
    id: 'accessoires', label: 'Accessoires', cover: img('photo-1584917865442-de89df76afd3'),
    subcategories: ['Sacs', 'Chaussures', 'Bijoux', 'Montres', 'Lunettes', 'Ceintures'],
  },
]

// ---- Boutiques -------------------------------------------------------------

export const boutiques: Boutique[] = [
  { id: 'bq-1', slug: 'eclat-de-cocody', name: 'Éclat de Cocody', categories: ['beaute'], logo: img('photo-1596462502278-27bfdc403348', 200), cover: img('photo-1487412720507-e7ab37603c6f'), city: 'Abidjan', district: 'Cocody', description: 'Maquillage et cosmétiques premium sélectionnés pour toutes les carnations africaines.', story: 'Fondée en 2019, Éclat de Cocody a bâti sa réputation sur des teintes de fond de teint réellement adaptées aux peaux noires et métissées.', rating: 4.8, reviewsCount: 412, followers: 8600, badge: 'PREMIUM', since: 2019, delivery: ['Livraison express Abidjan', 'Retrait en boutique', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 01', coordinates: { lat: 5.3599, lng: -3.9856 }, openingHours: 'Lun – Sam : 9h – 19h' },
  { id: 'bq-2', slug: 'ivoire-wax-couture', name: 'Ivoire Wax Couture', categories: ['mode'], logo: img('photo-1594736797933-d0501ba2fe65', 200), cover: img('photo-1531123897727-8f129e1688ce'), city: 'Abidjan', district: 'Plateau', description: 'Créations wax et pagne contemporaines, cousues sur mesure par nos ateliers locaux.', story: 'Un collectif de couturiers ivoiriens qui réinvente le wax pour une clientèle urbaine et internationale.', rating: 4.9, reviewsCount: 587, followers: 15200, badge: 'TOP', since: 2016, delivery: ['Retrait en boutique', 'Livraison nationale', 'Livraison internationale'], whatsapp: '+225 07 00 10 00 02', coordinates: { lat: 5.3208, lng: -4.0219 }, openingHours: 'Lun – Sam : 9h – 18h30' },
  { id: 'bq-3', slug: 'abidjan-hair-house', name: 'Abidjan Hair House', categories: ['cheveux'], logo: img('photo-1522337094846-8a8a56b7e4e1', 200), cover: img('photo-1519699047748-de8e457a634e'), city: 'Abidjan', district: 'Adjamé', description: 'Perruques lace, mèches et extensions 100% cheveux naturels et fibre premium.', story: 'La référence pour les lace wigs à Abidjan, avec un atelier de personnalisation sur place.', rating: 4.7, reviewsCount: 733, followers: 21400, badge: 'VERIFIED', since: 2018, delivery: ['Livraison express Abidjan', 'Click & Collect'], whatsapp: '+225 07 00 10 00 03', coordinates: { lat: 5.3436, lng: -4.0244 }, openingHours: 'Lun – Dim : 8h30 – 20h' },
  { id: 'bq-4', slug: 'nawa-bijoux', name: 'Nawa Bijoux', categories: ['accessoires'], logo: img('photo-1611085583191-a3b181a88401', 200), cover: img('photo-1584917865442-de89df76afd3'), city: 'Abidjan', district: 'Riviera', description: 'Bijoux fantaisie et fine joaillerie inspirés des motifs africains.', story: 'Une créatrice ivoirienne qui mélange perles, laiton doré et pierres locales.', rating: 4.6, reviewsCount: 289, followers: 6100, badge: 'VERIFIED', since: 2021, delivery: ['Livraison express Abidjan', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 04', coordinates: { lat: 5.3389, lng: -3.9639 }, openingHours: 'Mar – Sam : 10h – 18h' },
  { id: 'bq-5', slug: 'glow-lab-cosmetics', name: 'Glow Lab Cosmetics', categories: ['beaute'], logo: img('photo-1585386959984-a4155224a1ad', 200), cover: img('photo-1608248543803-ba4f8c70ae0b'), city: 'Abidjan', district: 'Marcory', description: 'Soins de la peau formulés pour le climat tropical : hydratation, éclat, anti-taches.', story: 'Un laboratoire ivoirien qui développe ses propres formules dermo-cosmétiques.', rating: 4.5, reviewsCount: 164, followers: 3200, badge: 'NOUVEAU', since: 2024, delivery: ['Retrait en boutique', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 05', coordinates: { lat: 5.2944, lng: -3.9836 }, openingHours: 'Lun – Sam : 9h – 18h' },
  { id: 'bq-6', slug: 'sublime-chaussures', name: 'Sublime Chaussures', categories: ['accessoires'], logo: img('photo-1591561954557-26941169b49e', 200), cover: img('photo-1584735175315-9d5df23860e6'), city: 'Abidjan', district: 'Cocody', description: 'Escarpins, sandales et chaussures de cérémonie pour toutes les silhouettes.', story: 'Sublime Chaussures importe et confectionne des modèles adaptés aux pointures et goûts locaux.', rating: 4.7, reviewsCount: 356, followers: 9800, badge: 'TOP', since: 2017, delivery: ['Livraison express Abidjan', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 06', coordinates: { lat: 5.3667, lng: -3.9833 }, openingHours: 'Lun – Sam : 9h30 – 19h' },
  { id: 'bq-7', slug: 'teranga-beauty', name: 'Teranga Beauty', categories: ['beaute'], logo: img('photo-1560750588-73207b1ef5b8', 200), cover: img('photo-1620916566398-39f1143ab7be'), city: 'Abidjan', district: 'Yopougon', description: 'Maquillage professionnel et grand public à prix accessibles.', story: 'Teranga Beauty démocratise le maquillage de qualité dans tous les quartiers d’Abidjan.', rating: 4.4, reviewsCount: 221, followers: 5400, badge: 'VERIFIED', since: 2020, delivery: ['Click & Collect', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 07', coordinates: { lat: 5.3167, lng: -4.0833 }, openingHours: 'Lun – Sam : 8h30 – 19h' },
  { id: 'bq-8', slug: 'pagne-and-style', name: 'Pagne & Style', categories: ['mode'], logo: img('photo-1509631179647-0177331693ae', 200), cover: img('photo-1445205170230-053b83016050'), city: 'Abidjan', district: 'Treichville', description: 'Tenues traditionnelles et cérémonielles cousues sur mesure.', story: 'Un atelier historique de Treichville, référence pour les tenues de mariage traditionnel.', rating: 4.9, reviewsCount: 498, followers: 12300, badge: 'PREMIUM', since: 2014, delivery: ['Retrait en boutique', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 08', coordinates: { lat: 5.2925, lng: -4.0072 }, openingHours: 'Lun – Sam : 8h – 18h' },
  { id: 'bq-9', slug: 'meches-et-merveilles', name: 'Mèches & Merveilles', categories: ['cheveux'], logo: img('photo-1626954079673-7be3c30b6a3f', 200), cover: img('photo-1620331311520-246422fd82f9'), city: 'Abidjan', district: 'Abobo', description: 'Mèches, tresses synthétiques et accessoires capillaires à petits prix.', story: 'Le grossiste préféré des coiffeuses d’Abobo et environs.', rating: 4.3, reviewsCount: 178, followers: 4100, badge: 'VERIFIED', since: 2019, delivery: ['Click & Collect'], whatsapp: '+225 07 00 10 00 09', coordinates: { lat: 5.4189, lng: -4.0169 }, openingHours: 'Lun – Dim : 8h – 20h' },
  { id: 'bq-10', slug: 'maison-sika', name: 'Maison Sika', categories: ['accessoires'], logo: img('photo-1553754257-6cd82db69ba1', 200), cover: img('photo-1524498103555-fbca6b5c85c8'), city: 'Abidjan', district: 'Cocody', description: 'Maroquinerie et sacs à main confectionnés en Côte d’Ivoire.', story: 'Maison Sika valorise le cuir local à travers des sacs contemporains fabriqués à Abidjan.', rating: 4.8, reviewsCount: 245, followers: 7300, badge: 'TOP', since: 2020, delivery: ['Livraison express Abidjan', 'Livraison internationale'], whatsapp: '+225 07 00 10 00 10', coordinates: { lat: 5.3486, lng: -3.9833 }, openingHours: 'Mar – Sam : 10h – 19h' },
  { id: 'bq-11', slug: 'belle-peau-skincare', name: 'Belle Peau Skincare', categories: ['beaute'], logo: img('photo-1608571423902-eed4a5ad8108', 200), cover: img('photo-1519415943484-9fa1873496d4'), city: 'Abidjan', district: 'Riviera', description: 'Routines skincare personnalisées et diagnostics de peau en boutique.', story: 'Belle Peau propose un accompagnement individualisé pour chaque type de peau.', rating: 4.6, reviewsCount: 132, followers: 2800, badge: 'NOUVEAU', since: 2024, delivery: ['Retrait en boutique', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 11', coordinates: { lat: 5.3389, lng: -3.9639 }, openingHours: 'Lun – Sam : 9h – 18h30' },
  { id: 'bq-12', slug: 'diva-fashion-house', name: 'Diva Fashion House', categories: ['mode'], logo: img('photo-1490725263030-1901c73f4dfd', 200), cover: img('photo-1490481651871-ab68de25d43d'), city: 'Abidjan', district: 'Plateau', description: 'Robes de soirée et tenues d’exception pour vos grands événements.', story: 'Diva Fashion House habille les femmes d’Abidjan pour leurs moments les plus marquants.', rating: 4.9, reviewsCount: 391, followers: 11600, badge: 'PREMIUM', since: 2017, delivery: ['Retrait en boutique', 'Livraison nationale'], whatsapp: '+225 07 00 10 00 12', coordinates: { lat: 5.3208, lng: -4.0219 }, openingHours: 'Lun – Sam : 10h – 19h' },
]

// ---- Produits ---------------------------------------------------------------

export const products: Product[] = [
  // BEAUTÉ
  { id: 'pd-1', slug: 'fond-de-teint-velours-caramel', name: 'Fond de teint Velours', brand: 'Éclat de Cocody', category: 'beaute', subcategory: 'Fond de teint', price: 12000, previousPrice: 15000, images: [img('photo-1487412720507-e7ab37603c6f'), img('photo-1512496015851-a90fb38ba796')], description: 'Fini velouté longue tenue, 18 teintes couvrant toutes les carnations africaines.', colors: ['Ivoire', 'Miel', 'Caramel', 'Cacao', 'Ébène'], shade: { name: 'Caramel', hex: '#A9713F' }, stock: 48, rating: 4.7, reviewsCount: 212, boutiqueId: 'bq-1', badges: ['PROMOTION', 'BEST-SELLER'], tags: ['visage', 'longue-tenue'], createdAt: '2026-08-20', featured: true },
  { id: 'pd-2', slug: 'anti-cernes-lumiere-miel', name: 'Anti-cernes Lumière', brand: 'Éclat de Cocody', category: 'beaute', subcategory: 'Anti-cernes', price: 6500, images: [img('photo-1512207736890-6ffed1517513')], description: 'Correcteur haute couvrance à fini lumineux, résiste à l’humidité.', shade: { name: 'Miel', hex: '#C98A4B' }, stock: 60, rating: 4.5, reviewsCount: 98, boutiqueId: 'bq-1', badges: [], tags: ['visage'], createdAt: '2026-07-02' },
  { id: 'pd-3', slug: 'poudre-matifiante-soleil', name: 'Poudre matifiante Soleil', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Poudre', price: 5500, images: [img('photo-1571781926291-c477ebfd024b')], description: 'Fixe le maquillage jusqu’à 12h, contrôle la brillance sans assécher.', shade: { name: 'Ambre', hex: '#B97A46' }, stock: 70, rating: 4.3, reviewsCount: 61, boutiqueId: 'bq-7', badges: [], tags: ['visage'], createdAt: '2026-06-14' },
  { id: 'pd-4', slug: 'blush-poudre-terracotta', name: 'Blush poudre Terracotta', brand: 'Glow Lab', category: 'beaute', subcategory: 'Blush', price: 5000, images: [img('photo-1583241800698-e8ab01c85f3a')], description: 'Pigmentation intense, fini satiné naturel.', shade: { name: 'Terracotta', hex: '#B96F55' }, stock: 55, rating: 4.6, reviewsCount: 87, boutiqueId: 'bq-5', badges: ['NOUVEAU'], tags: ['joues'], createdAt: '2026-09-01' },
  { id: 'pd-5', slug: 'highlighter-eclat-champagne', name: 'Highlighter Éclat', brand: 'Éclat de Cocody', category: 'beaute', subcategory: 'Highlighter', price: 7000, images: [img('photo-1596462502278-27bfdc403348')], description: 'Poudre illuminatrice à reflets dorés pour un teint sublimé.', shade: { name: 'Champagne', hex: '#D8C29D' }, stock: 40, rating: 4.8, reviewsCount: 143, boutiqueId: 'bq-1', badges: ['BEST-SELLER'], tags: ['visage', 'glow'], createdAt: '2026-05-18', featured: true },
  { id: 'pd-6', slug: 'palette-fards-terre-doree', name: 'Palette fards Terre Dorée', brand: 'Glow Lab', category: 'beaute', subcategory: 'Fard à paupières', price: 14500, images: [img('photo-1512496015851-a90fb38ba796')], description: '12 teintes chaudes mates et scintillantes inspirées des couchers de soleil ivoiriens.', stock: 33, rating: 4.7, reviewsCount: 176, boutiqueId: 'bq-5', badges: ['PROMOTION'], previousPrice: 18000, tags: ['yeux'], createdAt: '2026-08-02' },
  { id: 'pd-7', slug: 'eyeliner-noir-intense', name: 'Eyeliner Noir Intense', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Eyeliner', price: 4000, images: [img('photo-1522335789203-aabd1fc54bc9')], description: 'Pointe fine précise, séchage rapide, tenue 16h.', shade: { name: 'Noir profond', hex: '#111111' }, stock: 90, rating: 4.4, reviewsCount: 54, boutiqueId: 'bq-7', badges: [], tags: ['yeux'], createdAt: '2026-04-10' },
  { id: 'pd-8', slug: 'mascara-volume-extreme', name: 'Mascara Volume Extrême', brand: 'Éclat de Cocody', category: 'beaute', subcategory: 'Mascara', price: 6000, images: [img('photo-1487412720507-e7ab37603c6f')], description: 'Brosse volumatrice, formule sans transfert.', stock: 65, rating: 4.5, reviewsCount: 121, boutiqueId: 'bq-1', badges: [], tags: ['yeux'], createdAt: '2026-03-22' },
  { id: 'pd-9', slug: 'rouge-a-levres-mat-terracotta', name: 'Rouge à lèvres mat Terracotta', brand: 'Éclat de Cocody', category: 'beaute', subcategory: 'Rouge à lèvres', price: 5500, images: [img('photo-1560750588-73207b1ef5b8'), img('photo-1512496015851-a90fb38ba796')], description: 'Fini mat velouté, formule hydratante enrichie en beurre de karité.', shade: { name: 'Terracotta', hex: '#B96F55' }, stock: 58, rating: 4.9, reviewsCount: 268, boutiqueId: 'bq-1', badges: ['BEST-SELLER'], tags: ['lèvres'], createdAt: '2026-08-28', featured: true },
  { id: 'pd-10', slug: 'rouge-a-levres-nude-riviera', name: 'Rouge à lèvres Nude Riviera', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Rouge à lèvres', price: 4500, images: [img('photo-1571875257727-256c39da42af')], description: 'Nude universel, parfait au quotidien.', shade: { name: 'Nude', hex: '#D8B7A3' }, stock: 72, rating: 4.6, reviewsCount: 94, boutiqueId: 'bq-7', badges: [], tags: ['lèvres'], createdAt: '2026-06-30' },
  { id: 'pd-11', slug: 'gloss-effet-miroir-plum', name: 'Gloss effet miroir Plum', brand: 'Glow Lab', category: 'beaute', subcategory: 'Gloss', price: 4800, images: [img('photo-1620916566398-39f1143ab7be')], description: 'Brillance extrême non collante, teinte prune profonde.', shade: { name: 'Plum', hex: '#3A1F32' }, stock: 44, rating: 4.5, reviewsCount: 71, boutiqueId: 'bq-5', badges: ['NOUVEAU'], tags: ['lèvres'], createdAt: '2026-09-05' },
  { id: 'pd-12', slug: 'creme-hydratante-beurre-karite', name: 'Crème hydratante Beurre de Karité', brand: 'Belle Peau', category: 'beaute', subcategory: 'Soins de la peau', price: 8500, images: [img('photo-1608248543803-ba4f8c70ae0b')], description: 'Nourrit intensément et protège du dessèchement climatique.', stock: 80, rating: 4.7, reviewsCount: 187, boutiqueId: 'bq-11', badges: [], tags: ['soin', 'visage'], createdAt: '2026-05-11' },
  { id: 'pd-13', slug: 'serum-eclat-vitamine-c', name: 'Sérum Éclat Vitamine C', brand: 'Belle Peau', category: 'beaute', subcategory: 'Soins de la peau', price: 13500, images: [img('photo-1585386959984-a4155224a1ad')], description: 'Unifie le teint et atténue les taches, texture légère non grasse.', stock: 36, rating: 4.8, reviewsCount: 152, boutiqueId: 'bq-11', badges: ['BEST-SELLER'], tags: ['soin', 'visage'], createdAt: '2026-07-19' },
  { id: 'pd-14', slug: 'huile-corps-monoi-ambre', name: 'Huile corps Monoï & Ambre', brand: 'Belle Peau', category: 'beaute', subcategory: 'Soins du corps', price: 7000, images: [img('photo-1519415943484-9fa1873496d4')], description: 'Nourrit la peau et laisse un voile sec parfumé.', stock: 52, rating: 4.6, reviewsCount: 88, boutiqueId: 'bq-11', badges: [], tags: ['soin', 'corps'], createdAt: '2026-04-27' },
  { id: 'pd-15', slug: 'parfum-fleur-de-plume', name: 'Eau de parfum Fleur de Plume', brand: 'Glow Lab', category: 'beaute', subcategory: 'Parfum', price: 22000, images: [img('photo-1608571423902-eed4a5ad8108')], description: 'Notes florales et boisées, sillage longue durée.', stock: 24, rating: 4.9, reviewsCount: 96, boutiqueId: 'bq-5', badges: ['EXCLUSIVITÉ'], tags: ['parfum'], createdAt: '2026-08-09', featured: true },
  { id: 'pd-16', slug: 'kit-manucure-semi-permanente', name: 'Kit manucure semi-permanente', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Onglerie', price: 15000, images: [img('photo-1583241800698-e8ab01c85f3a')], description: 'Kit complet avec 6 teintes tendance et lampe LED.', stock: 20, rating: 4.4, reviewsCount: 43, boutiqueId: 'bq-7', badges: ['NOUVEAU'], tags: ['ongles'], createdAt: '2026-09-08' },
  // MODE
  { id: 'pd-17', slug: 'robe-longue-wax-emeraude', name: 'Robe longue Wax Émeraude', brand: 'Ivoire Wax Couture', category: 'mode', subcategory: 'Mode africaine', price: 42000, images: [img('photo-1531123897727-8f129e1688ce'), img('photo-1594736797933-d0501ba2fe65')], description: 'Robe longue coupe sirène en wax premium, doublure intégrale.', colors: ['Émeraude', 'Orange', 'Bleu roi'], sizes: ['S', 'M', 'L', 'XL'], stock: 18, rating: 4.9, reviewsCount: 201, boutiqueId: 'bq-2', badges: ['BEST-SELLER'], tags: ['robe', 'wax', 'mariage'], createdAt: '2026-08-14', featured: true },
  { id: 'pd-18', slug: 'ensemble-pagne-brode', name: 'Ensemble pagne brodé', brand: 'Pagne & Style', category: 'mode', subcategory: 'Mode traditionnelle', price: 65000, previousPrice: 78000, images: [img('photo-1445205170230-053b83016050')], description: 'Ensemble deux pièces avec broderies main, idéal cérémonie traditionnelle.', colors: ['Or', 'Blanc'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 9, rating: 4.9, reviewsCount: 132, boutiqueId: 'bq-8', badges: ['PROMOTION', 'EXCLUSIVITÉ'], tags: ['traditionnel', 'mariage'], createdAt: '2026-07-25', featured: true },
  { id: 'pd-19', slug: 'robe-cocktail-terracotta', name: 'Robe cocktail Terracotta', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Tenues de soirée', price: 55000, images: [img('photo-1490481651871-ab68de25d43d')], description: 'Robe fluide asymétrique, parfaite pour un mariage ou une soirée.', colors: ['Terracotta', 'Noir'], sizes: ['XS', 'S', 'M', 'L'], stock: 12, rating: 4.8, reviewsCount: 156, boutiqueId: 'bq-12', badges: ['BEST-SELLER'], tags: ['robe', 'soirée'], createdAt: '2026-08-30' },
  { id: 'pd-20', slug: 'top-satin-champagne', name: 'Top satin Champagne', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Hauts', price: 18000, images: [img('photo-1490725263030-1901c73f4dfd')], description: 'Top satiné à fines bretelles, coupe cintrée.', colors: ['Champagne', 'Nude', 'Noir'], sizes: ['XS', 'S', 'M', 'L'], stock: 25, rating: 4.5, reviewsCount: 67, boutiqueId: 'bq-12', badges: [], tags: ['top'], createdAt: '2026-06-05' },
  { id: 'pd-21', slug: 'chemise-lin-ivoire', name: 'Chemise en lin Ivoire', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Chemises', price: 21000, images: [img('photo-1495385794356-15371f348c31')], description: 'Chemise ample en lin respirant, coupe unisexe.', colors: ['Ivoire', 'Terracotta'], sizes: ['S', 'M', 'L', 'XL'], stock: 30, rating: 4.4, reviewsCount: 39, boutiqueId: 'bq-12', badges: [], tags: ['chemise', 'bureau'], createdAt: '2026-05-02' },
  { id: 'pd-22', slug: 'pantalon-tailleur-obsidian', name: 'Pantalon tailleur Obsidian', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Tenues professionnelles', price: 28000, images: [img('photo-1523381210434-271e8be1f52b')], description: 'Coupe droite, taille haute, tissu structuré.', colors: ['Obsidian', 'Plum'], sizes: ['34', '36', '38', '40', '42'], stock: 22, rating: 4.6, reviewsCount: 58, boutiqueId: 'bq-12', badges: [], tags: ['bureau'], createdAt: '2026-04-19' },
  { id: 'pd-23', slug: 'jean-taille-haute-brut', name: 'Jean taille haute brut', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Jeans', price: 19500, images: [img('photo-1490114538077-0a7f8cb49889')], description: 'Denim brut extensible, coupe flatteuse.', colors: ['Denim brut', 'Noir'], sizes: ['34', '36', '38', '40'], stock: 28, rating: 4.3, reviewsCount: 44, boutiqueId: 'bq-12', badges: [], tags: ['casual'], createdAt: '2026-03-11' },
  { id: 'pd-24', slug: 'jupe-plissee-nude', name: 'Jupe plissée Nude', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Jupes', price: 16500, images: [img('photo-1509631179647-0177331693ae')], description: 'Jupe midi plissée, tombé fluide.', colors: ['Nude', 'Terracotta'], sizes: ['S', 'M', 'L'], stock: 26, rating: 4.5, reviewsCount: 52, boutiqueId: 'bq-12', badges: ['NOUVEAU'], tags: ['jupe'], createdAt: '2026-09-02' },
  { id: 'pd-25', slug: 'veste-tailleur-plum', name: 'Veste tailleur Plum', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Vestes', price: 34000, images: [img('photo-1445205170230-053b83016050')], description: 'Veste structurée à épaulettes discrètes, doublure satinée.', colors: ['Plum', 'Obsidian'], sizes: ['S', 'M', 'L', 'XL'], stock: 15, rating: 4.7, reviewsCount: 61, boutiqueId: 'bq-12', badges: [], tags: ['bureau', 'veste'], createdAt: '2026-02-27' },
  { id: 'pd-26', slug: 'robe-wax-bogolan', name: 'Robe wax motif Bogolan', brand: 'Ivoire Wax Couture', category: 'mode', subcategory: 'Mode africaine', price: 38000, images: [img('photo-1594736797933-d0501ba2fe65')], description: 'Robe droite motif Bogolan, coupe moderne et confortable.', colors: ['Ocre', 'Terracotta'], sizes: ['S', 'M', 'L', 'XL'], stock: 19, rating: 4.8, reviewsCount: 84, boutiqueId: 'bq-2', badges: ['NOUVEAU'], tags: ['wax'], createdAt: '2026-08-22' },
  { id: 'pd-27', slug: 'ensemble-soiree-doree', name: 'Ensemble soirée doré', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Tenues de soirée', price: 72000, images: [img('photo-1524504388940-b1c1722653e1')], description: 'Ensemble jupe-crop top brodé de perles dorées, pièce d’exception.', colors: ['Champagne'], sizes: ['S', 'M', 'L'], stock: 6, rating: 5.0, reviewsCount: 38, boutiqueId: 'bq-12', badges: ['EXCLUSIVITÉ'], tags: ['soirée', 'luxe'], createdAt: '2026-09-10', featured: true },
  // CHEVEUX
  { id: 'pd-28', slug: 'lace-wig-bouclee-24-pouces', name: 'Lace wig bouclée 24"', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Lace wigs', price: 85000, previousPrice: 98000, images: [img('photo-1522337094846-8a8a56b7e4e1'), img('photo-1595959183082-7b570b7e08e2')], description: 'Cheveux 100% naturels, densité 180%, lace HD indétectable.', colors: ['Noir naturel', 'Brun chocolat'], sizes: ['18"', '20"', '24"'], stock: 8, rating: 4.9, reviewsCount: 176, boutiqueId: 'bq-3', badges: ['BEST-SELLER'], tags: ['perruque'], createdAt: '2026-08-05', featured: true },
  { id: 'pd-29', slug: 'perruque-bob-lisse', name: 'Perruque bob lisse', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Perruques', price: 45000, images: [img('photo-1595475884562-073c30d45670')], description: 'Coupe bob chic prête à porter, fibre premium résistante à la chaleur.', colors: ['Noir', 'Brun'], stock: 14, rating: 4.6, reviewsCount: 92, boutiqueId: 'bq-3', badges: [], tags: ['perruque', 'bob'], createdAt: '2026-06-21' },
  { id: 'pd-30', slug: 'tresses-box-braids-xl', name: 'Box braids XL pré-tressées', brand: 'Mèches & Merveilles', category: 'cheveux', subcategory: 'Tresses', price: 18000, images: [img('photo-1626954079673-7be3c30b6a3f')], description: 'Tresses synthétiques pré-nouées, pose rapide, résultat naturel.', colors: ['Noir', 'Brun auburn'], stock: 40, rating: 4.5, reviewsCount: 134, boutiqueId: 'bq-9', badges: ['BEST-SELLER'], tags: ['tresses'], createdAt: '2026-05-30' },
  { id: 'pd-31', slug: 'extensions-clip-in-lisses', name: 'Extensions clip-in lisses', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Extensions', price: 32000, images: [img('photo-1620331311520-246422fd82f9')], description: 'Set de 7 bandes clip-in, pose et retrait en 5 minutes.', colors: ['Noir', 'Brun', 'Blond miel'], stock: 21, rating: 4.4, reviewsCount: 58, boutiqueId: 'bq-3', badges: [], tags: ['extensions'], createdAt: '2026-04-14' },
  { id: 'pd-32', slug: 'meches-bresiliennes-lisses', name: 'Mèches brésiliennes lisses', brand: 'Mèches & Merveilles', category: 'cheveux', subcategory: 'Mèches', price: 28000, images: [img('photo-1519699047748-de8e457a634e')], description: 'Mèches 100% naturelles, tenue et brillance longue durée.', sizes: ['16"', '18"', '20"', '22"'], stock: 30, rating: 4.7, reviewsCount: 112, boutiqueId: 'bq-9', badges: [], tags: ['mèches'], createdAt: '2026-03-27' },
  { id: 'pd-33', slug: 'closure-4x4-naturelle', name: 'Closure 4x4 naturelle', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Closures', price: 26000, images: [img('photo-1523264939339-c89f9dc479c9')], description: 'Fermeture invisible, raie libre, finition naturelle.', stock: 17, rating: 4.6, reviewsCount: 47, boutiqueId: 'bq-3', badges: [], tags: ['closure'], createdAt: '2026-02-18' },
  { id: 'pd-34', slug: 'frontal-13x4-hd', name: 'Frontal 13x4 HD', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Frontals', price: 55000, images: [img('photo-1560066984-138dadb4c035')], description: 'Frontal lace HD pour une implantation ultra naturelle.', stock: 10, rating: 4.8, reviewsCount: 69, boutiqueId: 'bq-3', badges: ['EXCLUSIVITÉ'], tags: ['frontal'], createdAt: '2026-07-08' },
  { id: 'pd-35', slug: 'foulard-satin-imprime', name: 'Foulard satin imprimé', brand: 'Mèches & Merveilles', category: 'cheveux', subcategory: 'Accessoires cheveux', price: 4500, images: [img('photo-1626954079673-7be3c30b6a3f')], description: 'Foulard en satin pour protéger vos cheveux la nuit.', colors: ['Terracotta', 'Champagne', 'Plum'], stock: 60, rating: 4.5, reviewsCount: 38, boutiqueId: 'bq-9', badges: [], tags: ['accessoire'], createdAt: '2026-01-30' },
  // ACCESSOIRES
  { id: 'pd-36', slug: 'sac-cabas-cuir-cognac', name: 'Sac cabas cuir Cognac', brand: 'Maison Sika', category: 'accessoires', subcategory: 'Sacs', price: 48000, images: [img('photo-1553754257-6cd82db69ba1')], description: 'Cuir pleine fleur tanné en Côte d’Ivoire, doublure en wax.', colors: ['Cognac', 'Noir'], stock: 11, rating: 4.9, reviewsCount: 143, boutiqueId: 'bq-10', badges: ['BEST-SELLER'], tags: ['sac'], createdAt: '2026-08-01', featured: true },
  { id: 'pd-37', slug: 'pochette-soiree-champagne', name: 'Pochette soirée Champagne', brand: 'Maison Sika', category: 'accessoires', subcategory: 'Sacs', price: 22000, images: [img('photo-1524498103555-fbca6b5c85c8')], description: 'Pochette structurée avec chaîne amovible.', colors: ['Champagne', 'Noir'], stock: 16, rating: 4.7, reviewsCount: 51, boutiqueId: 'bq-10', badges: [], tags: ['sac', 'soirée'], createdAt: '2026-06-10' },
  { id: 'pd-38', slug: 'escarpins-satin-nude', name: 'Escarpins satin Nude', brand: 'Sublime Chaussures', category: 'accessoires', subcategory: 'Chaussures', price: 26000, images: [img('photo-1591561954557-26941169b49e')], description: 'Talon 8cm confortable, semelle rembourrée.', colors: ['Nude', 'Noir', 'Champagne'], sizes: ['36', '37', '38', '39', '40', '41'], stock: 24, rating: 4.6, reviewsCount: 98, boutiqueId: 'bq-6', badges: ['BEST-SELLER'], tags: ['chaussures'], createdAt: '2026-07-14' },
  { id: 'pd-39', slug: 'sandales-plates-tressees', name: 'Sandales plates tressées', brand: 'Sublime Chaussures', category: 'accessoires', subcategory: 'Chaussures', price: 15000, images: [img('photo-1584735175315-9d5df23860e6')], description: 'Cuir tressé artisanal, confort quotidien.', colors: ['Cognac', 'Noir'], sizes: ['36', '37', '38', '39', '40'], stock: 35, rating: 4.4, reviewsCount: 62, boutiqueId: 'bq-6', badges: [], tags: ['chaussures'], createdAt: '2026-05-06' },
  { id: 'pd-40', slug: 'boucles-oreilles-laiton-dore', name: 'Boucles d’oreilles laiton doré', brand: 'Nawa Bijoux', category: 'accessoires', subcategory: 'Bijoux', price: 9500, images: [img('photo-1611085583191-a3b181a88401')], description: 'Créoles artisanales en laiton doré à l’or fin.', stock: 30, rating: 4.8, reviewsCount: 87, boutiqueId: 'bq-4', badges: [], tags: ['bijoux'], createdAt: '2026-04-03' },
  { id: 'pd-41', slug: 'collier-perles-terracotta', name: 'Collier perles Terracotta', brand: 'Nawa Bijoux', category: 'accessoires', subcategory: 'Bijoux', price: 12000, images: [img('photo-1584917865442-de89df76afd3')], description: 'Perles naturelles et laiton, pièce statement.', stock: 22, rating: 4.7, reviewsCount: 64, boutiqueId: 'bq-4', badges: ['NOUVEAU'], tags: ['bijoux', 'collier'], createdAt: '2026-08-19' },
  { id: 'pd-42', slug: 'bracelet-manchette-plume', name: 'Bracelet manchette Plume', brand: 'Nawa Bijoux', category: 'accessoires', subcategory: 'Bijoux', price: 8000, images: [img('photo-1611085583191-a3b181a88401')], description: 'Manchette ajustable en métal doré martelé.', stock: 28, rating: 4.5, reviewsCount: 33, boutiqueId: 'bq-4', badges: [], tags: ['bijoux'], createdAt: '2026-03-15' },
  { id: 'pd-43', slug: 'montre-cuir-obsidian', name: 'Montre cuir Obsidian', brand: 'Maison Sika', category: 'accessoires', subcategory: 'Montres', price: 35000, images: [img('photo-1509941943102-10c232535736')], description: 'Boîtier acier, bracelet cuir véritable, étanche.', colors: ['Noir', 'Cognac'], stock: 13, rating: 4.6, reviewsCount: 41, boutiqueId: 'bq-10', badges: [], tags: ['montre'], createdAt: '2026-02-08' },
  { id: 'pd-44', slug: 'lunettes-soleil-ovales', name: 'Lunettes de soleil ovales', brand: 'Nawa Bijoux', category: 'accessoires', subcategory: 'Lunettes', price: 11000, images: [img('photo-1524498103555-fbca6b5c85c8')], description: 'Monture acétate, protection UV400.', colors: ['Écaille', 'Noir'], stock: 32, rating: 4.5, reviewsCount: 29, boutiqueId: 'bq-4', badges: [], tags: ['lunettes'], createdAt: '2026-01-22' },
  { id: 'pd-45', slug: 'ceinture-cuir-boucle-doree', name: 'Ceinture cuir boucle dorée', brand: 'Maison Sika', category: 'accessoires', subcategory: 'Ceintures', price: 9000, images: [img('photo-1553754257-6cd82db69ba1')], description: 'Cuir souple, boucle dorée statement.', sizes: ['S', 'M', 'L'], stock: 26, rating: 4.4, reviewsCount: 22, boutiqueId: 'bq-10', badges: [], tags: ['ceinture'], createdAt: '2025-12-11' },
  { id: 'pd-46', slug: 'talons-plum-satin', name: 'Talons Plum satin', brand: 'Sublime Chaussures', category: 'accessoires', subcategory: 'Chaussures', price: 29000, images: [img('photo-1591561954557-26941169b49e')], description: 'Talon fin 9cm, coloris prune profond.', colors: ['Plum'], sizes: ['36', '37', '38', '39', '40'], stock: 14, rating: 4.7, reviewsCount: 45, boutiqueId: 'bq-6', badges: ['NOUVEAU'], tags: ['chaussures', 'soirée'], createdAt: '2026-09-03' },
  // Compléments beauté/mode pour dépasser 50 références
  { id: 'pd-47', slug: 'palette-contouring-pro', name: 'Palette contouring Pro', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Fond de teint', price: 16000, images: [img('photo-1571781926291-c477ebfd024b')], description: 'Palette 6 teintes pour sculpter et illuminer tous les teints.', stock: 27, rating: 4.6, reviewsCount: 73, boutiqueId: 'bq-7', badges: [], tags: ['visage', 'contouring'], createdAt: '2026-06-27' },
  { id: 'pd-48', slug: 'gel-douche-karite-vanille', name: 'Gel douche Karité Vanille', brand: 'Belle Peau', category: 'beaute', subcategory: 'Soins du corps', price: 4500, images: [img('photo-1608248543803-ba4f8c70ae0b')], description: 'Nettoie en douceur et parfume délicatement la peau.', stock: 90, rating: 4.3, reviewsCount: 34, boutiqueId: 'bq-11', badges: [], tags: ['soin'], createdAt: '2026-01-05' },
  { id: 'pd-49', slug: 'robe-midi-imprime-pagne', name: 'Robe midi imprimé pagne', brand: 'Ivoire Wax Couture', category: 'mode', subcategory: 'Mode africaine', price: 33000, images: [img('photo-1531123897727-8f129e1688ce')], description: 'Robe midi cintrée, imprimé pagne exclusif.', colors: ['Multicolore'], sizes: ['S', 'M', 'L', 'XL'], stock: 20, rating: 4.7, reviewsCount: 66, boutiqueId: 'bq-2', badges: [], tags: ['wax'], createdAt: '2026-07-30' },
  { id: 'pd-50', slug: 'boubou-brode-or', name: 'Boubou brodé fils d’or', brand: 'Pagne & Style', category: 'mode', subcategory: 'Mode traditionnelle', price: 89000, images: [img('photo-1445205170230-053b83016050')], description: 'Boubou grand modèle, broderies fils d’or faites main.', colors: ['Blanc et or'], sizes: ['Unique (ajustable)'], stock: 5, rating: 5.0, reviewsCount: 27, boutiqueId: 'bq-8', badges: ['EXCLUSIVITÉ'], tags: ['traditionnel', 'luxe'], createdAt: '2026-08-17' },
  { id: 'pd-51', slug: 'perruque-afro-naturelle', name: 'Perruque afro naturelle', brand: 'Abidjan Hair House', category: 'cheveux', subcategory: 'Perruques', price: 62000, images: [img('photo-1595959183082-7b570b7e08e2')], description: 'Texture afro 4C, volume naturel généreux.', stock: 9, rating: 4.8, reviewsCount: 58, boutiqueId: 'bq-3', badges: ['BEST-SELLER'], tags: ['perruque', 'afro'], createdAt: '2026-08-11' },
  { id: 'pd-52', slug: 'sac-bandouliere-wax', name: 'Sac bandoulière wax', brand: 'Ivoire Wax Couture', category: 'accessoires', subcategory: 'Sacs', price: 16000, images: [img('photo-1553754257-6cd82db69ba1')], description: 'Sac bandoulière en wax et simili-cuir, léger et coloré.', colors: ['Multicolore'], stock: 22, rating: 4.4, reviewsCount: 29, boutiqueId: 'bq-2', badges: [], tags: ['sac', 'wax'], createdAt: '2026-05-24' },
  { id: 'pd-53', slug: 'coffret-pinceaux-maquillage', name: 'Coffret pinceaux maquillage', brand: 'Teranga Beauty', category: 'beaute', subcategory: 'Maquillage', price: 9500, images: [img('photo-1620916566398-39f1143ab7be')], description: 'Set de 12 pinceaux professionnels avec trousse.', stock: 38, rating: 4.6, reviewsCount: 77, boutiqueId: 'bq-7', badges: [], tags: ['accessoire-maquillage'], createdAt: '2026-04-06' },
  { id: 'pd-54', slug: 'robe-longue-mousseline-ivoire', name: 'Robe longue mousseline Ivoire', brand: 'Diva Fashion House', category: 'mode', subcategory: 'Tenues de soirée', price: 47000, images: [img('photo-1524504388940-b1c1722653e1')], description: 'Mousseline fluide, dos nu, fente élégante.', colors: ['Ivoire'], sizes: ['XS', 'S', 'M', 'L'], stock: 10, rating: 4.8, reviewsCount: 49, boutiqueId: 'bq-12', badges: [], tags: ['soirée'], createdAt: '2026-06-16' },
  { id: 'pd-55', slug: 'tresses-vanille-naturelles', name: 'Tresses vanille naturelles', brand: 'Mèches & Merveilles', category: 'cheveux', subcategory: 'Tresses', price: 21000, images: [img('photo-1626954079673-7be3c30b6a3f')], description: 'Tresses fines pré-étirées, rendu léger et soyeux.', colors: ['Noir', 'Brun auburn'], stock: 25, rating: 4.5, reviewsCount: 40, boutiqueId: 'bq-9', badges: ['NOUVEAU'], tags: ['tresses'], createdAt: '2026-09-06' },
  { id: 'pd-56', slug: 'sac-a-dos-cuir-cocody', name: 'Sac à dos cuir Cocody', brand: 'Maison Sika', category: 'accessoires', subcategory: 'Sacs', price: 39000, images: [img('photo-1524498103555-fbca6b5c85c8')], description: 'Sac à dos en cuir souple, format quotidien élégant.', colors: ['Cognac', 'Noir'], stock: 12, rating: 4.7, reviewsCount: 36, boutiqueId: 'bq-10', badges: [], tags: ['sac'], createdAt: '2026-03-02' },
]

// ---- Stylistes ---------------------------------------------------------------

export const stylists: Stylist[] = [
  { id: 'st-1', slug: 'aicha-styling', name: 'Aïcha Styling', photo: img('photo-1544717305-2782549b5136', 600), cover: img('photo-1490725263030-1901c73f4dfd'), city: 'Cocody', specialties: ['Mariage', 'Cérémonie traditionnelle', 'Mode africaine'], bio: 'Styliste depuis 10 ans, Aïcha habille les mariées d’Abidjan avec une signature wax contemporaine.', rating: 4.9, reviewsCount: 214, priceFrom: 45000, completedProjects: 380, responseTime: '< 2h', services: [{ name: 'Consultation styling', price: 15000, duration: '45 min' }, { name: 'Tenue de mariage sur mesure', price: 250000, duration: '3 à 5 semaines' }, { name: 'Relooking complet', price: 45000, duration: '2h' }], portfolio: [img('photo-1531123897727-8f129e1688ce'), img('photo-1490481651871-ab68de25d43d'), img('photo-1524504388940-b1c1722653e1')], availability: ['Lun', 'Mar', 'Jeu', 'Ven', 'Sam'], badge: 'TOP' },
  { id: 'st-2', slug: 'karim-couture', name: 'Karim Couture', photo: img('photo-1519085360753-af0119f7cbe7', 600), cover: img('photo-1483985988355-763728e1935b'), city: 'Plateau', specialties: ['Prêt-à-porter', 'Tenues professionnelles', 'Sur mesure homme'], bio: 'Créateur formé à Abidjan et Paris, Karim conçoit des pièces sur mesure élégantes et intemporelles.', rating: 4.8, reviewsCount: 167, priceFrom: 35000, completedProjects: 290, responseTime: '< 4h', services: [{ name: 'Consultation garde-robe', price: 20000, duration: '1h' }, { name: 'Costume sur mesure', price: 180000, duration: '3 semaines' }], portfolio: [img('photo-1490114538077-0a7f8cb49889'), img('photo-1495385794356-15371f348c31')], availability: ['Mar', 'Mer', 'Jeu', 'Sam'], badge: 'VERIFIED' },
  { id: 'st-3', slug: 'nadia-look', name: 'Nadia Look', photo: img('photo-1573497019940-1c28c88b4f3e', 600), cover: img('photo-1524504388940-b1c1722653e1'), city: 'Marcory', specialties: ['Événementiel', 'Soirée', 'Shooting photo'], bio: 'Nadia compose des looks glamour pour vos soirées et shootings, du concept au dernier accessoire.', rating: 4.7, reviewsCount: 132, priceFrom: 30000, completedProjects: 205, responseTime: '< 3h', services: [{ name: 'Look de soirée complet', price: 60000, duration: '2h' }, { name: 'Direction artistique shooting', price: 120000, duration: 'Journée' }], portfolio: [img('photo-1490481651871-ab68de25d43d'), img('photo-1445205170230-053b83016050')], availability: ['Lun', 'Ven', 'Sam', 'Dim'], badge: 'VERIFIED' },
  { id: 'st-4', slug: 'yves-tendance', name: 'Yves Tendance', photo: img('photo-1500648767791-00dcc994a43e', 600), cover: img('photo-1523381210434-271e8be1f52b'), city: 'Riviera', specialties: ['Personal shopping', 'Mode urbaine'], bio: 'Yves accompagne ses clients en boutique pour composer une garde-robe qui leur ressemble.', rating: 4.6, reviewsCount: 88, priceFrom: 25000, completedProjects: 140, responseTime: '< 5h', services: [{ name: 'Session personal shopping', price: 25000, duration: '2h' }], portfolio: [img('photo-1490114538077-0a7f8cb49889')], availability: ['Mer', 'Jeu', 'Sam'] },
  { id: 'st-5', slug: 'grace-elegance', name: 'Grace Élégance', photo: img('photo-1544005313-94ddf0286df2', 600), cover: img('photo-1531123897727-8f129e1688ce'), city: 'Cocody', specialties: ['Mariage', 'Baptême', 'Cérémonies familiales'], bio: 'Grace conçoit des tenues de cérémonie raffinées pour toute la famille.', rating: 4.9, reviewsCount: 176, priceFrom: 50000, completedProjects: 310, responseTime: '< 2h', services: [{ name: 'Tenue de cérémonie', price: 150000, duration: '2 à 4 semaines' }], portfolio: [img('photo-1594736797933-d0501ba2fe65'), img('photo-1509631179647-0177331693ae')], availability: ['Lun', 'Mar', 'Ven', 'Sam'], badge: 'PREMIUM' },
  { id: 'st-6', slug: 'olivier-street', name: 'Olivier Street', photo: img('photo-1519345182560-3f2917c472ef', 600), cover: img('photo-1490114538077-0a7f8cb49889'), city: 'Yopougon', specialties: ['Streetwear', 'Mode urbaine'], bio: 'Olivier crée des looks streetwear inspirés de la culture urbaine ivoirienne.', rating: 4.5, reviewsCount: 61, priceFrom: 18000, completedProjects: 97, responseTime: '< 6h', services: [{ name: 'Look streetwear', price: 18000, duration: '1h' }], portfolio: [img('photo-1495385794356-15371f348c31')], availability: ['Ven', 'Sam', 'Dim'] },
  { id: 'st-7', slug: 'chantal-mariage', name: 'Chantal Mariage', photo: img('photo-1568602471122-7832951cc4c5', 600), cover: img('photo-1445205170230-053b83016050'), city: 'Plateau', specialties: ['Robes de mariée', 'Demoiselles d’honneur'], bio: 'Spécialiste des robes de mariée sur mesure depuis 12 ans.', rating: 5.0, reviewsCount: 245, priceFrom: 80000, completedProjects: 410, responseTime: '< 1h', services: [{ name: 'Robe de mariée sur mesure', price: 400000, duration: '6 à 8 semaines' }, { name: 'Essayage & retouches', price: 20000, duration: '1h' }], portfolio: [img('photo-1524504388940-b1c1722653e1'), img('photo-1490481651871-ab68de25d43d')], availability: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'], badge: 'TOP' },
  { id: 'st-8', slug: 'daniel-officewear', name: 'Daniel Officewear', photo: img('photo-1580489944761-15a19d654956', 600), cover: img('photo-1523381210434-271e8be1f52b'), city: 'Plateau', specialties: ['Tenues professionnelles', 'Entretiens'], bio: 'Daniel aide les cadres et entrepreneurs à soigner leur image professionnelle.', rating: 4.6, reviewsCount: 54, priceFrom: 22000, completedProjects: 83, responseTime: '< 4h', services: [{ name: 'Audit garde-robe pro', price: 22000, duration: '1h30' }], portfolio: [img('photo-1495385794356-15371f348c31')], availability: ['Lun', 'Mar', 'Mer'] },
  { id: 'st-9', slug: 'fatim-glam', name: 'Fatim Glam', photo: img('photo-1633332755192-727a05c4013d', 600), cover: img('photo-1524504388940-b1c1722653e1'), city: 'Riviera', specialties: ['Soirée', 'Anniversaire', 'Look VIP'], bio: 'Fatim crée des looks flamboyants pour les événements les plus glamour d’Abidjan.', rating: 4.8, reviewsCount: 119, priceFrom: 40000, completedProjects: 178, responseTime: '< 3h', services: [{ name: 'Look VIP complet', price: 95000, duration: '2h30' }], portfolio: [img('photo-1490481651871-ab68de25d43d')], availability: ['Jeu', 'Ven', 'Sam'], badge: 'PREMIUM' },
  { id: 'st-10', slug: 'bertin-classique', name: 'Bertin Classique', photo: img('photo-1472099645785-5658abf4ff4e', 600), cover: img('photo-1490114538077-0a7f8cb49889'), city: 'Bingerville', specialties: ['Classique', 'Intemporel'], bio: 'Bertin privilégie des looks élégants et intemporels, jamais démodés.', rating: 4.4, reviewsCount: 37, priceFrom: 20000, completedProjects: 62, responseTime: '< 8h', services: [{ name: 'Conseil style classique', price: 20000, duration: '1h' }], portfolio: [img('photo-1445205170230-053b83016050')], availability: ['Sam', 'Dim'] },
  { id: 'st-11', slug: 'sarah-bridal', name: 'Sarah Bridal', photo: img('photo-1544717305-2782549b5136', 600), cover: img('photo-1594736797933-d0501ba2fe65'), city: 'Cocody', specialties: ['Mariage civil', 'Fiançailles'], bio: 'Sarah accompagne les futures mariées de la première esquisse à la robe finale.', rating: 4.9, reviewsCount: 143, priceFrom: 60000, completedProjects: 201, responseTime: '< 2h', services: [{ name: 'Tenue de fiançailles', price: 120000, duration: '3 semaines' }], portfolio: [img('photo-1531123897727-8f129e1688ce')], availability: ['Lun', 'Mer', 'Sam'], badge: 'VERIFIED' },
  { id: 'st-12', slug: 'junior-avantgarde', name: 'Junior Avant-Garde', photo: img('photo-1519345182560-3f2917c472ef', 600), cover: img('photo-1483985988355-763728e1935b'), city: 'Cocody', specialties: ['Avant-gardiste', 'Editorial'], bio: 'Junior repousse les codes de la mode africaine contemporaine avec des créations audacieuses.', rating: 4.7, reviewsCount: 72, priceFrom: 55000, completedProjects: 118, responseTime: '< 5h', services: [{ name: 'Création éditoriale', price: 200000, duration: '4 semaines' }], portfolio: [img('photo-1524504388940-b1c1722653e1')], availability: ['Mar', 'Jeu', 'Ven'] },
]

// ---- Professionnels de la beauté ------------------------------------------

export const professionals: BeautyProfessional[] = [
  { id: 'pr-1', slug: 'linda-makeup', name: 'Linda Makeup', role: 'Maquilleuse', photo: img('photo-1544005313-94ddf0286df2', 600), cover: img('photo-1512496015851-a90fb38ba796'), city: 'Abidjan', district: 'Cocody', specialties: ['Mariage', 'Peau mature', 'Maquillage HD'], bio: 'Maquilleuse professionnelle formée à Paris, spécialiste des peaux noires et métissées.', rating: 4.9, reviewsCount: 289, priceFrom: 35000, services: [{ name: 'Maquillage mariée', price: 60000, duration: '1h30' }, { name: 'Maquillage soirée', price: 35000, duration: '1h' }], portfolio: [img('photo-1571875257727-256c39da42af'), img('photo-1522335789203-aabd1fc54bc9')], badge: 'TOP' },
  { id: 'pr-2', slug: 'salon-belle-de-cocody', name: 'Salon Belle de Cocody', role: 'Salon de beauté', photo: img('photo-1519415943484-9fa1873496d4', 600), cover: img('photo-1523264939339-c89f9dc479c9'), city: 'Abidjan', district: 'Cocody', specialties: ['Coiffure', 'Soins visage', 'Onglerie'], bio: 'Salon complet proposant coiffure, soins esthétiques et manucure dans un cadre premium.', rating: 4.7, reviewsCount: 356, priceFrom: 8000, services: [{ name: 'Brushing', price: 8000, duration: '45 min' }, { name: 'Soin visage complet', price: 25000, duration: '1h' }], portfolio: [img('photo-1523264939339-c89f9dc479c9')], badge: 'PREMIUM' },
  { id: 'pr-3', slug: 'coiffeur-yannick', name: 'Yannick Coiffure', role: 'Coiffeur·se', photo: img('photo-1519345182560-3f2917c472ef', 600), cover: img('photo-1595959183082-7b570b7e08e2'), city: 'Abidjan', district: 'Yopougon', specialties: ['Pose de perruque', 'Tresses', 'Coloration'], bio: 'Coiffeur expert en pose de lace wigs et coloration naturelle.', rating: 4.6, reviewsCount: 198, priceFrom: 5000, services: [{ name: 'Pose de perruque', price: 10000, duration: '1h' }, { name: 'Tresses box braids', price: 15000, duration: '3h' }], portfolio: [img('photo-1560066984-138dadb4c035')], badge: 'VERIFIED' },
  { id: 'pr-4', slug: 'onglerie-diamant', name: 'Onglerie Diamant', role: 'Onglerie', photo: img('photo-1583241800698-e8ab01c85f3a', 600), cover: img('photo-1583241800698-e8ab01c85f3a'), city: 'Abidjan', district: 'Marcory', specialties: ['Semi-permanent', 'Nail art', 'Extensions'], bio: 'Studio d’onglerie spécialisé en nail art personnalisé.', rating: 4.8, reviewsCount: 214, priceFrom: 7000, services: [{ name: 'Pose gel', price: 12000, duration: '1h' }, { name: 'Nail art personnalisé', price: 7000, duration: '30 min' }], portfolio: [img('photo-1583241800698-e8ab01c85f3a')], badge: 'VERIFIED' },
  { id: 'pr-5', slug: 'photographe-beaute-marc', name: 'Marc Studio Beauté', role: 'Photographe beauté', photo: img('photo-1500648767791-00dcc994a43e', 600), cover: img('photo-1571875257727-256c39da42af'), city: 'Abidjan', district: 'Plateau', specialties: ['Portrait beauté', 'Shooting looks'], bio: 'Photographe spécialisé dans les portraits beauté et les shootings de looks pour créateurs.', rating: 4.7, reviewsCount: 96, priceFrom: 40000, services: [{ name: 'Shooting portrait beauté', price: 60000, duration: '2h' }], portfolio: [img('photo-1571875257727-256c39da42af')] },
  { id: 'pr-6', slug: 'barbier-prestige', name: 'Barbier Prestige', role: 'Barbier', photo: img('photo-1519085360753-af0119f7cbe7', 600), cover: img('photo-1519415943484-9fa1873496d4'), city: 'Abidjan', district: 'Plateau', specialties: ['Dégradé', 'Taille de barbe', 'Soins homme'], bio: 'Barbershop premium pour un rendu net et moderne.', rating: 4.8, reviewsCount: 267, priceFrom: 4000, services: [{ name: 'Coupe + barbe', price: 6000, duration: '45 min' }], portfolio: [img('photo-1519415943484-9fa1873496d4')], badge: 'TOP' },
  { id: 'pr-7', slug: 'estheticienne-grace', name: 'Grace Esthétique', role: 'Salon de beauté', photo: img('photo-1573497019940-1c28c88b4f3e', 600), cover: img('photo-1608248543803-ba4f8c70ae0b'), city: 'Abidjan', district: 'Riviera', specialties: ['Épilation', 'Soins corps', 'Gommage'], bio: 'Institut de beauté dédié aux soins du corps et à l’épilation douce.', rating: 4.5, reviewsCount: 121, priceFrom: 6000, services: [{ name: 'Gommage corps', price: 15000, duration: '1h' }], portfolio: [img('photo-1608248543803-ba4f8c70ae0b')] },
  { id: 'pr-8', slug: 'maquilleuse-precious', name: 'Precious MUA', role: 'Maquilleuse', photo: img('photo-1633332755192-727a05c4013d', 600), cover: img('photo-1522335789203-aabd1fc54bc9'), city: 'Abidjan', district: 'Angré', specialties: ['Maquillage naturel', 'Editorial'], bio: 'Precious réalise des maquillages lumineux pour shootings et événements.', rating: 4.6, reviewsCount: 78, priceFrom: 25000, services: [{ name: 'Maquillage editorial', price: 40000, duration: '1h30' }], portfolio: [img('photo-1522335789203-aabd1fc54bc9')] },
  { id: 'pr-9', slug: 'coiffeuse-rebecca', name: 'Rebecca Tresses', role: 'Coiffeur·se', photo: img('photo-1568602471122-7832951cc4c5', 600), cover: img('photo-1626954079673-7be3c30b6a3f'), city: 'Abidjan', district: 'Abobo', specialties: ['Tresses africaines', 'Vanilles', 'Locks'], bio: 'Spécialiste des coiffures africaines traditionnelles et modernes.', rating: 4.7, reviewsCount: 189, priceFrom: 5000, services: [{ name: 'Vanilles', price: 12000, duration: '3h' }, { name: 'Entretien locks', price: 8000, duration: '1h' }], portfolio: [img('photo-1626954079673-7be3c30b6a3f')], badge: 'VERIFIED' },
  { id: 'pr-10', slug: 'onglerie-luxe-riviera', name: 'Onglerie Luxe Riviera', role: 'Onglerie', photo: img('photo-1611085583191-a3b181a88401', 600), cover: img('photo-1524498103555-fbca6b5c85c8'), city: 'Abidjan', district: 'Riviera', specialties: ['Nail art de luxe', 'Pédicure'], bio: 'Institut haut de gamme spécialisé en pédicure et nail art sophistiqué.', rating: 4.8, reviewsCount: 102, priceFrom: 10000, services: [{ name: 'Pédicure spa', price: 15000, duration: '1h' }], portfolio: [img('photo-1611085583191-a3b181a88401')], badge: 'PREMIUM' },
  { id: 'pr-11', slug: 'maquilleur-steve', name: 'Steve Glow', role: 'Maquilleuse', photo: img('photo-1500648767791-00dcc994a43e', 600), cover: img('photo-1560750588-73207b1ef5b8'), city: 'Abidjan', district: 'Cocody', specialties: ['Maquillage homme', 'Grooming'], bio: 'Steve propose des soins grooming et maquillage discret pour hommes.', rating: 4.4, reviewsCount: 46, priceFrom: 15000, services: [{ name: 'Grooming événementiel', price: 20000, duration: '45 min' }], portfolio: [img('photo-1560750588-73207b1ef5b8')] },
  { id: 'pr-12', slug: 'salon-glam-house', name: 'Glam House Salon', role: 'Salon de beauté', photo: img('photo-1595475884562-073c30d45670', 600), cover: img('photo-1519699047748-de8e457a634e'), city: 'Abidjan', district: 'Marcory', specialties: ['Coiffure', 'Coloration', 'Soins capillaires'], bio: 'Salon polyvalent pour tous types et textures de cheveux.', rating: 4.6, reviewsCount: 154, priceFrom: 7000, services: [{ name: 'Coloration complète', price: 25000, duration: '2h' }], portfolio: [img('photo-1519699047748-de8e457a634e')] },
]

// ---- Looks --------------------------------------------------------------------

export const looks: Look[] = [
  { id: 'lk-1', slug: 'mariee-elegance-wax', title: 'Mariée Élégance Wax', cover: img('photo-1531123897727-8f129e1688ce'), images: [img('photo-1531123897727-8f129e1688ce'), img('photo-1490481651871-ab68de25d43d')], category: 'Mariage', author: 'Aïcha Styling', authorType: 'Styliste', productIds: ['pd-17', 'pd-38', 'pd-40', 'pd-9'], likes: 1240, saves: 380, createdAt: '2026-08-28', tags: ['mariage', 'wax'], featured: true },
  { id: 'lk-2', slug: 'bureau-chic-obsidian', title: 'Bureau Chic Obsidian', cover: img('photo-1523381210434-271e8be1f52b'), images: [img('photo-1523381210434-271e8be1f52b')], category: 'Bureau', author: 'Daniel Officewear', authorType: 'Styliste', productIds: ['pd-22', 'pd-25', 'pd-43'], likes: 512, saves: 140, createdAt: '2026-07-11', tags: ['bureau'] },
  { id: 'lk-3', slug: 'soiree-glamour-champagne', title: 'Soirée Glamour Champagne', cover: img('photo-1524504388940-b1c1722653e1'), images: [img('photo-1524504388940-b1c1722653e1')], category: 'Soirée', author: 'Fatim Glam', authorType: 'Styliste', productIds: ['pd-27', 'pd-46', 'pd-37', 'pd-11'], likes: 980, saves: 302, createdAt: '2026-09-01', tags: ['soirée', 'luxe'], featured: true },
  { id: 'lk-4', slug: 'weekend-decontracte-terracotta', title: 'Weekend Décontracté Terracotta', cover: img('photo-1490114538077-0a7f8cb49889'), images: [img('photo-1490114538077-0a7f8cb49889')], category: 'Casual', author: 'Communauté', authorType: 'Communauté', productIds: ['pd-23', 'pd-39', 'pd-41'], likes: 340, saves: 96, createdAt: '2026-06-19', tags: ['casual'] },
  { id: 'lk-5', slug: 'ceremonie-traditionnelle-or', title: 'Cérémonie Traditionnelle Or', cover: img('photo-1445205170230-053b83016050'), images: [img('photo-1445205170230-053b83016050')], category: 'Traditionnel', author: 'Grace Élégance', authorType: 'Styliste', productIds: ['pd-50', 'pd-18', 'pd-45'], likes: 875, saves: 260, createdAt: '2026-08-17', tags: ['traditionnel'], featured: true },
  { id: 'lk-6', slug: 'natural-glow-quotidien', title: 'Natural Glow Quotidien', cover: img('photo-1571875257727-256c39da42af'), images: [img('photo-1571875257727-256c39da42af')], category: 'Beauté', author: 'Linda Makeup', authorType: 'Styliste', productIds: ['pd-1', 'pd-5', 'pd-10'], likes: 690, saves: 210, createdAt: '2026-07-25', tags: ['maquillage-naturel'] },
  { id: 'lk-7', slug: 'afro-power-look', title: 'Afro Power Look', cover: img('photo-1595959183082-7b570b7e08e2'), images: [img('photo-1595959183082-7b570b7e08e2')], category: 'Cheveux', author: 'Rebecca Tresses', authorType: 'Styliste', productIds: ['pd-51', 'pd-41'], likes: 555, saves: 178, createdAt: '2026-08-11', tags: ['cheveux', 'afro'] },
  { id: 'lk-8', slug: 'entretien-embauche-plum', title: 'Entretien d’embauche Plum', cover: img('photo-1490114538077-0a7f8cb49889'), images: [img('photo-1490114538077-0a7f8cb49889')], category: 'Bureau', author: 'Karim Couture', authorType: 'Styliste', productIds: ['pd-25', 'pd-22'], likes: 233, saves: 61, createdAt: '2026-05-29', tags: ['bureau'] },
  { id: 'lk-9', slug: 'brunch-entre-amies', title: 'Brunch entre amies', cover: img('photo-1509631179647-0177331693ae'), images: [img('photo-1509631179647-0177331693ae')], category: 'Casual', author: 'Communauté', authorType: 'Communauté', productIds: ['pd-24', 'pd-20'], likes: 410, saves: 88, createdAt: '2026-06-04', tags: ['casual'] },
  { id: 'lk-10', slug: 'anniversaire-vip-doree', title: 'Anniversaire VIP Doré', cover: img('photo-1524504388940-b1c1722653e1'), images: [img('photo-1524504388940-b1c1722653e1')], category: 'Soirée', author: 'Fatim Glam', authorType: 'Styliste', productIds: ['pd-27', 'pd-5', 'pd-37'], likes: 720, saves: 199, createdAt: '2026-08-05', tags: ['soirée', 'vip'] },
  { id: 'lk-11', slug: 'lace-wig-glamour', title: 'Lace Wig Glamour', cover: img('photo-1522337094846-8a8a56b7e4e1'), images: [img('photo-1522337094846-8a8a56b7e4e1')], category: 'Cheveux', author: 'KÔSMÉA', authorType: 'KÔSMÉA', productIds: ['pd-28', 'pd-9'], likes: 890, saves: 240, createdAt: '2026-08-24', tags: ['cheveux', 'perruque'], featured: true },
  { id: 'lk-12', slug: 'first-date-nude', title: 'First Date Nude', cover: img('photo-1490481651871-ab68de25d43d'), images: [img('photo-1490481651871-ab68de25d43d')], category: 'Casual', author: 'Communauté', authorType: 'Communauté', productIds: ['pd-19', 'pd-38', 'pd-10'], likes: 388, saves: 101, createdAt: '2026-07-02', tags: ['casual', 'nude'] },
  { id: 'lk-13', slug: 'mode-africaine-contemporaine', title: 'Mode Africaine Contemporaine', cover: img('photo-1594736797933-d0501ba2fe65'), images: [img('photo-1594736797933-d0501ba2fe65')], category: 'Traditionnel', author: 'Junior Avant-Garde', authorType: 'Styliste', productIds: ['pd-26', 'pd-49'], likes: 466, saves: 133, createdAt: '2026-08-30', tags: ['wax', 'afrique'] },
  { id: 'lk-14', slug: 'street-style-abidjan', title: 'Street Style Abidjan', cover: img('photo-1495385794356-15371f348c31'), images: [img('photo-1495385794356-15371f348c31')], category: 'Casual', author: 'Olivier Street', authorType: 'Styliste', productIds: ['pd-21', 'pd-23'], likes: 301, saves: 74, createdAt: '2026-06-27', tags: ['streetwear'] },
  { id: 'lk-15', slug: 'smoky-eyes-signature', title: 'Smoky Eyes Signature', cover: img('photo-1522335789203-aabd1fc54bc9'), images: [img('photo-1522335789203-aabd1fc54bc9')], category: 'Beauté', author: 'Precious MUA', authorType: 'Styliste', productIds: ['pd-6', 'pd-7', 'pd-8'], likes: 512, saves: 150, createdAt: '2026-07-20', tags: ['maquillage', 'yeux'] },
  { id: 'lk-16', slug: 'sac-a-main-du-jour', title: 'Sac à main du jour', cover: img('photo-1553754257-6cd82db69ba1'), images: [img('photo-1553754257-6cd82db69ba1')], category: 'Accessoires', author: 'Communauté', authorType: 'Communauté', productIds: ['pd-36', 'pd-43'], likes: 205, saves: 52, createdAt: '2026-05-15', tags: ['accessoires'] },
  { id: 'lk-17', slug: 'baptism-day-blanc', title: 'Baptism Day Blanc', cover: img('photo-1445205170230-053b83016050'), images: [img('photo-1445205170230-053b83016050')], category: 'Traditionnel', author: 'Grace Élégance', authorType: 'Styliste', productIds: ['pd-18', 'pd-38'], likes: 345, saves: 97, createdAt: '2026-06-08', tags: ['cérémonie'] },
  { id: 'lk-18', slug: 'boho-summer-look', title: 'Boho Summer Look', cover: img('photo-1524498103555-fbca6b5c85c8'), images: [img('photo-1524498103555-fbca6b5c85c8')], category: 'Casual', author: 'Communauté', authorType: 'Communauté', productIds: ['pd-24', 'pd-44', 'pd-39'], likes: 267, saves: 63, createdAt: '2026-07-08', tags: ['boho'] },
  { id: 'lk-19', slug: 'braids-queen', title: 'Braids Queen', cover: img('photo-1626954079673-7be3c30b6a3f'), images: [img('photo-1626954079673-7be3c30b6a3f')], category: 'Cheveux', author: 'Rebecca Tresses', authorType: 'Styliste', productIds: ['pd-30', 'pd-55'], likes: 621, saves: 188, createdAt: '2026-08-02', tags: ['tresses'] },
  { id: 'lk-20', slug: 'diplomate-look-du-jour', title: 'Look du diplomate', cover: img('photo-1523381210434-271e8be1f52b'), images: [img('photo-1523381210434-271e8be1f52b')], category: 'Bureau', author: 'Bertin Classique', authorType: 'Styliste', productIds: ['pd-21', 'pd-22'], likes: 178, saves: 40, createdAt: '2026-04-30', tags: ['bureau', 'classique'] },
  { id: 'lk-21', slug: 'glow-lipstick-duo', title: 'Glow Lipstick Duo', cover: img('photo-1560750588-73207b1ef5b8'), images: [img('photo-1560750588-73207b1ef5b8')], category: 'Beauté', author: 'Linda Makeup', authorType: 'Styliste', productIds: ['pd-9', 'pd-11'], likes: 289, saves: 71, createdAt: '2026-08-13', tags: ['maquillage', 'lèvres'] },
  { id: 'lk-22', slug: 'fiancailles-champetre', title: 'Fiançailles Champêtre', cover: img('photo-1490725263030-1901c73f4dfd'), images: [img('photo-1490725263030-1901c73f4dfd')], category: 'Mariage', author: 'Sarah Bridal', authorType: 'Styliste', productIds: ['pd-54', 'pd-38', 'pd-40'], likes: 502, saves: 156, createdAt: '2026-07-27', tags: ['fiançailles'] },
]

// ---- Beauty Academy -----------------------------------------------------------

export const courses: Course[] = [
  { id: 'co-1', slug: 'maquillage-naturel-10-minutes', title: 'Maquillage naturel en 10 minutes', category: 'Maquillage', level: 'Débutant', cover: img('photo-1571875257727-256c39da42af'), instructor: 'Linda Makeup', instructorPhoto: img('photo-1544005313-94ddf0286df2', 300), duration: '1h20', price: 0, rating: 4.8, studentsCount: 3420, lessons: [{ title: 'Préparer la peau', duration: '8 min', free: true }, { title: 'Fond de teint express', duration: '10 min' }, { title: 'Correction & poudre', duration: '9 min' }, { title: 'Regard naturel', duration: '12 min' }, { title: 'Lèvres et finition', duration: '7 min' }], description: 'Apprenez à réaliser un maquillage naturel et lumineux en un temps record, pour tous les jours.' },
  { id: 'co-2', slug: 'maitriser-le-contouring', title: 'Maîtriser le contouring', category: 'Maquillage', level: 'Intermédiaire', cover: img('photo-1522335789203-aabd1fc54bc9'), instructor: 'Precious MUA', instructorPhoto: img('photo-1633332755192-727a05c4013d', 300), duration: '2h05', price: 8000, rating: 4.7, studentsCount: 1560, lessons: [{ title: 'Comprendre son visage', duration: '10 min', free: true }, { title: 'Techniques de contouring', duration: '20 min' }, { title: 'Sculpter pour photo', duration: '18 min' }, { title: 'Erreurs à éviter', duration: '12 min' }], description: 'Sculptez votre visage comme une professionnelle grâce aux techniques de contouring adaptées à chaque morphologie.' },
  { id: 'co-3', slug: 'poser-une-lace-wig', title: 'Poser une lace wig comme une pro', category: 'Cheveux', level: 'Débutant', cover: img('photo-1522337094846-8a8a56b7e4e1'), instructor: 'Yannick Coiffure', instructorPhoto: img('photo-1519345182560-3f2917c472ef', 300), duration: '1h45', price: 6000, rating: 4.9, studentsCount: 2870, lessons: [{ title: 'Préparer sa lace', duration: '12 min', free: true }, { title: 'Coller sans abîmer', duration: '20 min' }, { title: 'Coiffer et baby hair', duration: '15 min' }], description: 'Toutes les étapes pour poser votre lace wig de façon naturelle et durable.' },
  { id: 'co-4', slug: 'associer-les-couleurs', title: 'Associer les couleurs comme une styliste', category: 'Couleur', level: 'Débutant', cover: img('photo-1490725263030-1901c73f4dfd'), instructor: 'Aïcha Styling', instructorPhoto: img('photo-1544717305-2782549b5136', 300), duration: '1h10', price: 5000, rating: 4.6, studentsCount: 1980, lessons: [{ title: 'La roue chromatique', duration: '10 min', free: true }, { title: 'Couleurs selon carnation', duration: '18 min' }, { title: 'Associer motifs et unis', duration: '14 min' }], description: 'Comprenez les bases de la théorie des couleurs appliquées à la mode africaine.' },
  { id: 'co-5', slug: 'routine-beaute-peau-noire', title: 'Routine beauté pour peau noire', category: 'Soins', level: 'Débutant', cover: img('photo-1608248543803-ba4f8c70ae0b'), instructor: 'Belle Peau', instructorPhoto: img('photo-1573497019940-1c28c88b4f3e', 300), duration: '1h30', price: 7000, rating: 4.8, studentsCount: 2210, lessons: [{ title: 'Diagnostic de peau', duration: '10 min', free: true }, { title: 'Routine matin', duration: '15 min' }, { title: 'Routine soir', duration: '15 min' }, { title: 'Gérer l’hyperpigmentation', duration: '20 min' }], description: 'Construisez une routine skincare adaptée au climat tropical et aux besoins spécifiques de la peau noire.' },
  { id: 'co-6', slug: 'onglerie-debutant', title: 'Onglerie pour débutantes', category: 'Onglerie', level: 'Débutant', cover: img('photo-1583241800698-e8ab01c85f3a'), instructor: 'Onglerie Diamant', instructorPhoto: img('photo-1611085583191-a3b181a88401', 300), duration: '2h20', price: 9000, rating: 4.5, studentsCount: 940, lessons: [{ title: 'Le matériel essentiel', duration: '10 min', free: true }, { title: 'Pose de vernis semi-permanent', duration: '25 min' }, { title: 'Nail art simple', duration: '20 min' }], description: 'Démarrez l’onglerie avec les bases indispensables pour un résultat professionnel.' },
  { id: 'co-7', slug: 'creer-ses-propres-modeles', title: 'Créer ses propres modèles de vêtements', category: 'Mode', level: 'Intermédiaire', cover: img('photo-1523381210434-271e8be1f52b'), instructor: 'Karim Couture', instructorPhoto: img('photo-1519085360753-af0119f7cbe7', 300), duration: '3h00', price: 15000, rating: 4.7, studentsCount: 640, lessons: [{ title: 'Du croquis au patron', duration: '25 min', free: true }, { title: 'Choisir ses tissus', duration: '20 min' }, { title: 'Travailler avec un couturier', duration: '18 min' }], description: 'Apprenez à concevoir vos propres modèles, du croquis à la réalisation avec un créateur.' },
  { id: 'co-8', slug: 'photographier-ses-produits', title: 'Photographier ses produits beauté', category: 'Business', level: 'Débutant', cover: img('photo-1571875257727-256c39da42af'), instructor: 'Marc Studio Beauté', instructorPhoto: img('photo-1500648767791-00dcc994a43e', 300), duration: '1h40', price: 6500, rating: 4.6, studentsCount: 780, lessons: [{ title: 'Lumière naturelle vs studio', duration: '12 min', free: true }, { title: 'Composer une image produit', duration: '18 min' }, { title: 'Retouche simple', duration: '15 min' }], description: 'Sublimez vos photos produits pour vendre davantage sur la marketplace.' },
  { id: 'co-9', slug: 'devenir-makeup-artist-pro', title: 'Devenir Makeup Artist professionnelle', category: 'Maquillage', level: 'Professionnel', cover: img('photo-1512496015851-a90fb38ba796'), instructor: 'Linda Makeup', instructorPhoto: img('photo-1544005313-94ddf0286df2', 300), duration: '6h30', price: 35000, rating: 4.9, studentsCount: 512, lessons: [{ title: 'Construire son book', duration: '20 min', free: true }, { title: 'Maquillage mariée pro', duration: '45 min' }, { title: 'Gérer sa clientèle', duration: '30 min' }, { title: 'Tarification & business', duration: '25 min' }], description: 'Formation complète pour lancer une carrière de maquilleuse professionnelle.' },
  { id: 'co-10', slug: 'coiffures-africaines-modernes', title: 'Coiffures africaines modernes', category: 'Cheveux', level: 'Intermédiaire', cover: img('photo-1626954079673-7be3c30b6a3f'), instructor: 'Rebecca Tresses', instructorPhoto: img('photo-1568602471122-7832951cc4c5', 300), duration: '2h50', price: 11000, rating: 4.8, studentsCount: 1340, lessons: [{ title: 'Vanilles et torsades', duration: '25 min', free: true }, { title: 'Locks entretien', duration: '20 min' }, { title: 'Coiffures événement', duration: '22 min' }], description: 'Maîtrisez les techniques de coiffures africaines traditionnelles revisitées.' },
  { id: 'co-11', slug: 'branding-personnel-createurs', title: 'Branding personnel pour créateurs', category: 'Business', level: 'Professionnel', cover: img('photo-1495385794356-15371f348c31'), instructor: 'Karim Couture', instructorPhoto: img('photo-1519085360753-af0119f7cbe7', 300), duration: '2h15', price: 12000, rating: 4.5, studentsCount: 410, lessons: [{ title: 'Définir son identité de marque', duration: '18 min', free: true }, { title: 'Présence sur les réseaux', duration: '20 min' }], description: 'Construisez une marque personnelle forte en tant que créateur ou professionnel de la beauté.' },
  { id: 'co-12', slug: 'apprendre-a-coiffer', title: 'Apprendre à coiffer au quotidien', category: 'Cheveux', level: 'Débutant', cover: img('photo-1595959183082-7b570b7e08e2'), instructor: 'Yannick Coiffure', instructorPhoto: img('photo-1519345182560-3f2917c472ef', 300), duration: '1h25', price: 4500, rating: 4.4, studentsCount: 1120, lessons: [{ title: 'Entretien capillaire de base', duration: '15 min', free: true }, { title: 'Coiffures rapides', duration: '18 min' }], description: 'Les gestes essentiels pour entretenir et coiffer vos cheveux naturels au quotidien.' },
]

// ---- Communauté --------------------------------------------------------------

export const communityPosts: CommunityPost[] = [
  { id: 'cp-1', author: 'Aya B.', authorPhoto: img('photo-1544717305-2782549b5136', 300), handle: '@aya.style', image: img('photo-1531123897727-8f129e1688ce'), caption: 'Ma tenue pour le mariage de ma cousine ce weekend 💛', category: 'Mariage', productIds: ['pd-17', 'pd-40'], likes: 842, comments: 56, createdAt: '2026-09-08' },
  { id: 'cp-2', author: 'Michael K.', authorPhoto: img('photo-1519085360753-af0119f7cbe7', 300), handle: '@mike.classy', image: img('photo-1523381210434-271e8be1f52b'), caption: 'Look bureau du lundi, simple et efficace.', category: 'Bureau', productIds: ['pd-22', 'pd-43'], likes: 210, comments: 18, createdAt: '2026-09-05' },
  { id: 'cp-3', author: 'Rachel A.', authorPhoto: img('photo-1544005313-94ddf0286df2', 300), handle: '@rachel.glow', image: img('photo-1571875257727-256c39da42af'), caption: 'Avant / après avec le fond de teint Velours 😍', category: 'Beauté', productIds: ['pd-1', 'pd-5'], likes: 1102, comments: 89, createdAt: '2026-09-03' },
  { id: 'cp-4', author: 'Sandra T.', authorPhoto: img('photo-1573497019940-1c28c88b4f3e', 300), handle: '@sandra.wax', image: img('photo-1594736797933-d0501ba2fe65'), caption: 'Nouvelle robe wax reçue aujourd’hui, je suis amoureuse !', category: 'Mode', productIds: ['pd-26'], likes: 654, comments: 41, createdAt: '2026-08-30' },
  { id: 'cp-5', author: 'Prisca Y.', authorPhoto: img('photo-1580489944761-15a19d654956', 300), handle: '@prisca.hair', image: img('photo-1522337094846-8a8a56b7e4e1'), caption: 'Ma nouvelle lace, je ne l’enlève plus 🙌🏾', category: 'Cheveux', productIds: ['pd-28'], likes: 733, comments: 47, createdAt: '2026-08-27' },
  { id: 'cp-6', author: 'Boris D.', authorPhoto: img('photo-1500648767791-00dcc994a43e', 300), handle: '@boris.street', image: img('photo-1495385794356-15371f348c31'), caption: 'Street style du samedi à Cocody.', category: 'Casual', productIds: ['pd-21', 'pd-23'], likes: 388, comments: 22, createdAt: '2026-08-24' },
  { id: 'cp-7', author: 'Chantal M.', authorPhoto: img('photo-1568602471122-7832951cc4c5', 300), handle: '@chantal.bridal', image: img('photo-1524504388940-b1c1722653e1'), caption: 'Essayage robe pour les fiançailles, verdict ?', category: 'Mariage', productIds: ['pd-54'], likes: 967, comments: 112, createdAt: '2026-08-19' },
  { id: 'cp-8', author: 'Grace N.', authorPhoto: img('photo-1519345182560-3f2917c472ef', 300), handle: '@grace.nails', image: img('photo-1583241800698-e8ab01c85f3a'), caption: 'Nail art de la semaine chez Onglerie Diamant 💅🏾', category: 'Beauté', productIds: ['pd-16'], likes: 512, comments: 38, createdAt: '2026-08-15' },
  { id: 'cp-9', author: 'Ismaël O.', authorPhoto: img('photo-1633332755192-727a05c4013d', 300), handle: '@ismael.grooming', image: img('photo-1519415943484-9fa1873496d4'), caption: 'Fresh cut avant l’entretien important.', category: 'Beauté', productIds: [], likes: 176, comments: 9, createdAt: '2026-08-10' },
  { id: 'cp-10', author: 'Nadège K.', authorPhoto: img('photo-1472099645785-5658abf4ff4e', 300), handle: '@nadege.jewels', image: img('photo-1584917865442-de89df76afd3'), caption: 'Mes nouveaux bijoux Nawa, parfaits pour toutes mes tenues.', category: 'Accessoires', productIds: ['pd-40', 'pd-41'], likes: 289, comments: 15, createdAt: '2026-08-06' },
  { id: 'cp-11', author: 'Yvette S.', authorPhoto: img('photo-1544717305-2782549b5136', 300), handle: '@yvette.locks', image: img('photo-1626954079673-7be3c30b6a3f'), caption: 'Mes tresses fraîches pour la rentrée 🔥', category: 'Cheveux', productIds: ['pd-30'], likes: 601, comments: 44, createdAt: '2026-08-02' },
  { id: 'cp-12', author: 'Fabrice L.', authorPhoto: img('photo-1519085360753-af0119f7cbe7', 300), handle: '@fabrice.suit', image: img('photo-1490114538077-0a7f8cb49889'), caption: 'Costume sur mesure signé Karim Couture.', category: 'Bureau', productIds: [], likes: 322, comments: 27, createdAt: '2026-07-29' },
]

// ---- Défis (Look Challenges) --------------------------------------------------

export const challenges: Challenge[] = [
  { id: 'ch-1', slug: 'elegance-ivoirienne-moderne', title: 'Élégance Ivoirienne Moderne', theme: 'Réinventez le wax pour un look contemporain', cover: img('photo-1531123897727-8f129e1688ce'), prize: 'Bon d’achat 100 000 FCFA + séance avec une styliste', deadline: '2026-09-28', entriesCount: 214, status: 'actif' },
  { id: 'ch-2', slug: 'weekend-glam', title: 'Weekend Glam', theme: 'Votre plus beau look de sortie du weekend', cover: img('photo-1524504388940-b1c1722653e1'), prize: 'Produits Éclat de Cocody + visibilité communauté', deadline: '2026-09-21', entriesCount: 187, status: 'actif' },
  { id: 'ch-3', slug: 'office-chic', title: 'Office Chic', theme: 'Le look bureau le plus élégant et professionnel', cover: img('photo-1523381210434-271e8be1f52b'), prize: 'Bon d’achat 50 000 FCFA', deadline: '2026-09-15', entriesCount: 96, status: 'actif' },
  { id: 'ch-4', slug: 'wedding-guest', title: 'Wedding Guest', theme: 'La tenue idéale pour un mariage invité', cover: img('photo-1490481651871-ab68de25d43d'), prize: 'Consultation styliste offerte', deadline: '2026-08-30', entriesCount: 302, status: 'termine' },
  { id: 'ch-5', slug: 'monochrome-challenge', title: 'Monochrome Challenge', theme: 'Composez un look 100% dans une seule couleur', cover: img('photo-1490114538077-0a7f8cb49889'), prize: 'Points KÔSMÉA x2 + cadeaux', deadline: '2026-08-15', entriesCount: 145, status: 'termine' },
  { id: 'ch-6', slug: 'afro-hair-story', title: 'Afro Hair Story', theme: 'Célébrez votre texture naturelle', cover: img('photo-1595959183082-7b570b7e08e2'), prize: 'Kit soins capillaires + visibilité', deadline: '2026-10-05', entriesCount: 58, status: 'actif' },
]

// ---- Live Shopping --------------------------------------------------------------

export const liveSessions: LiveSession[] = [
  { id: 'lv-1', slug: 'live-ivoire-wax-couture', title: 'Nouvelle collection rentrée', host: 'Ivoire Wax Couture', hostPhoto: img('photo-1594736797933-d0501ba2fe65', 300), cover: img('photo-1531123897727-8f129e1688ce'), scheduledAt: '2026-09-14T19:00:00', status: 'live', viewers: 482, featuredProductId: 'pd-17', discount: '-15% pendant 10 minutes' },
  { id: 'lv-2', slug: 'live-eclat-de-cocody', title: 'Masterclass teint parfait', host: 'Éclat de Cocody', hostPhoto: img('photo-1487412720507-e7ab37603c6f', 300), cover: img('photo-1512496015851-a90fb38ba796'), scheduledAt: '2026-09-15T18:30:00', status: 'a_venir', viewers: 0, featuredProductId: 'pd-1' },
  { id: 'lv-3', slug: 'live-abidjan-hair-house', title: 'Déballage lace wigs premium', host: 'Abidjan Hair House', hostPhoto: img('photo-1522337094846-8a8a56b7e4e1', 300), cover: img('photo-1595959183082-7b570b7e08e2'), scheduledAt: '2026-09-16T20:00:00', status: 'a_venir', viewers: 0, featuredProductId: 'pd-28' },
  { id: 'lv-4', slug: 'live-diva-fashion-house', title: 'Défilé privé soirée', host: 'Diva Fashion House', hostPhoto: img('photo-1490725263030-1901c73f4dfd', 300), cover: img('photo-1524504388940-b1c1722653e1'), scheduledAt: '2026-09-12T19:00:00', status: 'termine', viewers: 1240, featuredProductId: 'pd-27' },
  { id: 'lv-5', slug: 'live-nawa-bijoux', title: 'Nouveautés bijoux collection Riviera', host: 'Nawa Bijoux', hostPhoto: img('photo-1611085583191-a3b181a88401', 300), cover: img('photo-1584917865442-de89df76afd3'), scheduledAt: '2026-09-10T17:00:00', status: 'termine', viewers: 356, featuredProductId: 'pd-41' },
  { id: 'lv-6', slug: 'live-teranga-beauty', title: 'Tuto maquillage soirée en direct', host: 'Teranga Beauty', hostPhoto: img('photo-1560750588-73207b1ef5b8', 300), cover: img('photo-1620916566398-39f1143ab7be'), scheduledAt: '2026-09-18T19:30:00', status: 'a_venir', viewers: 0, featuredProductId: 'pd-9' },
]

// ---- Témoignages ----------------------------------------------------------------

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Marie-Claire Kouassi', role: 'Cliente KÔSMÉA', city: 'Cocody', rating: 5, quote: 'J’ai enfin trouvé des teintes de fond de teint qui correspondent vraiment à ma peau. L’essayage virtuel m’a évité bien des erreurs d’achat.', photo: img('photo-1580489944761-15a19d654956', 400) },
  { id: 't2', name: 'Nadège Aka', role: 'Membre Privilège Gold', city: 'Riviera', rating: 5, quote: 'La marketplace regroupe tout ce que j’aime : mode africaine, maquillage et mes stylistes préférées, au même endroit.', photo: img('photo-1544717305-2782549b5136', 400) },
  { id: 't3', name: 'Ismaël Sanogo', role: 'Client', city: 'Marcory', rating: 4, quote: 'L’Assistant Beauté KÔSMÉA m’a proposé un look complet pour un mariage en quelques secondes, budget respecté.', photo: img('photo-1519085360753-af0119f7cbe7', 400) },
  { id: 't4', name: 'Cynthia Bamba', role: 'Créatrice partenaire', city: 'Plateau', rating: 5, quote: 'En tant que styliste, la marketplace m’apporte une visibilité que je n’avais jamais eue avant.', photo: img('photo-1573497019940-1c28c88b4f3e', 400) },
  { id: 't5', name: 'Olivier Kacou', role: 'Vendeur boutique', city: 'Yamoussoukro', rating: 5, quote: 'Le dashboard vendeur est clair et me permet de suivre mes ventes et mon stock en temps réel.', photo: img('photo-1500648767791-00dcc994a43e', 400) },
  { id: 't6', name: 'Aminata Cissé', role: 'Cliente', city: 'Cocody', rating: 5, quote: 'La Beauty Academy m’a permis d’apprendre à me maquiller comme une professionnelle, gratuitement.', photo: img('photo-1544005313-94ddf0286df2', 400) },
  { id: 't7', name: 'Serge Amani', role: 'Client', city: 'Treichville', rating: 4, quote: 'J’ai réservé un styliste directement depuis l’application pour mon costume de mariage. Service impeccable.', photo: img('photo-1519345182560-3f2917c472ef', 400) },
  { id: 't8', name: 'Grace N’Guessan', role: 'Membre communauté', city: 'Bingerville', rating: 5, quote: 'Les challenges de looks sont devenus mon rendez-vous hebdomadaire préféré sur la plateforme.', photo: img('photo-1568602471122-7832951cc4c5', 400) },
]

// ---- Inspiration / Magazine ----------------------------------------------------

export const articles: Article[] = [
  { id: 'a1', slug: 'guide-teintes-fond-de-teint-peau-noire', title: 'Bien choisir sa teinte de fond de teint sur peau noire', category: 'Beauté', author: 'Linda Makeup', date: '2026-08-25', image: img('photo-1487412720507-e7ab37603c6f'), excerpt: 'Sous-ton, indice de couleur, test à la mâchoire : nos conseils pour ne plus jamais se tromper.', content: ['Le sous-ton de peau (chaud, froid ou neutre) est déterminant pour choisir la bonne teinte.', 'Testez toujours le produit sur la mâchoire, à la lumière du jour.', 'Notre Color Lab vous aide à trouver une recommandation indicative de teinte.'] },
  { id: 'a2', slug: 'tendances-mode-africaine-2026', title: 'Les tendances mode africaine à suivre en 2026', category: 'Mode', author: 'Karim Couture', date: '2026-08-18', image: img('photo-1531123897727-8f129e1688ce'), excerpt: 'Wax revisité, coupes structurées, accessoires dorés : ce qui marque la saison.', content: ['Le wax se porte désormais en coupes structurées et minimalistes.', 'Les accessoires dorés discrets remplacent les pièces trop chargées.'] },
  { id: 'a3', slug: 'entretenir-sa-lace-wig', title: 'Comment entretenir sa lace wig au quotidien', category: 'Cheveux', author: 'Yannick Coiffure', date: '2026-08-02', image: img('photo-1522337094846-8a8a56b7e4e1'), excerpt: 'Lavage, produits, fréquence : les bons gestes pour prolonger la durée de vie de votre perruque.', content: ['Lavez votre lace wig toutes les 2 à 3 semaines avec un shampooing doux.', 'Évitez la chaleur excessive et utilisez toujours un protecteur thermique.'] },
  { id: 'a4', slug: 'preparer-mariage-checklist-beaute', title: 'Préparer son mariage : la checklist beauté et mode', category: 'Mariage', author: 'Aïcha Styling', date: '2026-07-22', image: img('photo-1524504388940-b1c1722653e1'), excerpt: 'De la robe aux essais maquillage, notre planning idéal pour un mariage serein.', content: ['3 mois avant : choisissez votre styliste et votre robe.', '1 mois avant : réalisez un essai maquillage et coiffure complet.'] },
  { id: 'a5', slug: 'routine-skincare-saison-seche', title: 'Routine skincare pour la saison sèche', category: 'Soins', author: 'Belle Peau', date: '2026-07-05', image: img('photo-1608248543803-ba4f8c70ae0b'), excerpt: 'Comment protéger sa peau de la déshydratation pendant l’harmattan.', content: ['Privilégiez des textures riches en beurre de karité.', 'N’oubliez jamais la protection solaire, même en saison sèche.'] },
  { id: 'a6', slug: 'lancement-kosmea-academy', title: 'KÔSMÉA lance sa Beauty Academy', category: 'Actualités', author: 'Équipe KÔSMÉA', date: '2026-09-10', image: img('photo-1571875257727-256c39da42af'), excerpt: 'Douze formations en ligne pour apprendre le maquillage, la coiffure et l’entrepreneuriat beauté.', content: ['La Beauty Academy KÔSMÉA regroupe désormais douze parcours certifiants.', 'Chaque cours combine vidéos, quiz et certificat de fin de formation.'] },
  { id: 'a7', slug: 'comment-fonctionne-lessayage-virtuel', title: 'Comment fonctionne l’essayage virtuel KÔSMÉA', category: 'Technologie', author: 'Équipe KÔSMÉA', date: '2026-06-28', image: img('photo-1512496015851-a90fb38ba796'), excerpt: 'Un aperçu transparent de ce que peut et ne peut pas encore faire notre studio d’essayage.', content: ['L’essayage virtuel est une simulation indicative basée sur vos préférences.', 'Nous indiquons toujours clairement quand un rendu est une approximation.'] },
  { id: 'a8', slug: 'devenir-vendeur-sur-kosmea', title: 'Comment devenir vendeur sur KÔSMÉA', category: 'Business', author: 'Équipe KÔSMÉA', date: '2026-06-10', image: img('photo-1495385794356-15371f348c31'), excerpt: 'Les étapes pour ouvrir votre boutique et commencer à vendre sur la marketplace.', content: ['Inscrivez votre boutique et complétez votre catalogue produits.', 'Notre équipe vérifie chaque nouveau vendeur avant validation.'] },
]

// ---- FAQ --------------------------------------------------------------------

export const faqs: FaqItem[] = [
  { id: 'f1', category: 'Commandes', question: 'Comment passer une commande sur KÔSMÉA ?', answer: 'Ajoutez vos produits au panier depuis une ou plusieurs boutiques, puis suivez les étapes du tunnel de commande jusqu’au paiement.' },
  { id: 'f2', category: 'Commandes', question: 'Puis-je commander chez plusieurs boutiques en une seule commande ?', answer: 'Oui, votre panier regroupe automatiquement les articles par boutique, avec des frais de livraison calculés séparément.' },
  { id: 'f3', category: 'Livraison', question: 'Quels sont les modes de livraison disponibles ?', answer: 'Livraison express à Abidjan, livraison nationale, retrait en boutique (Click & Collect) selon les vendeurs.' },
  { id: 'f4', category: 'Paiement', question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Mobile Money, cartes bancaires, portefeuille KÔSMÉA et, selon les vendeurs, le paiement à la livraison.' },
  { id: 'f5', category: 'Essayage virtuel', question: 'L’essayage virtuel est-il un vrai rendu photo-réaliste ?', answer: 'C’est une simulation indicative construite à partir de vos préférences pour vous aider à visualiser un look. Nous l’indiquons toujours clairement à l’écran.' },
  { id: 'f6', category: 'Stylistes', question: 'Comment réserver un styliste ou une professionnelle beauté ?', answer: 'Depuis leur profil, choisissez un service, une date disponible, puis confirmez votre réservation.' },
  { id: 'f7', category: 'Academy', question: 'Les cours de la Beauty Academy sont-ils tous payants ?', answer: 'Non, plusieurs cours sont gratuits, d’autres sont payants et incluent un certificat à la fin.' },
  { id: 'f8', category: 'Vendeurs', question: 'Comment devenir vendeur sur la marketplace ?', answer: 'Inscrivez votre boutique depuis l’espace vendeur, complétez votre catalogue. Notre équipe vérifie chaque boutique avant validation.' },
  { id: 'f9', category: 'Programme fidélité', question: 'Comment gagner des points KÔSMÉA ?', answer: 'Vous gagnez des points à chaque achat, avis laissé, cours terminé, look publié ou parrainage.' },
  { id: 'f10', category: 'Privilège', question: 'Quels sont les avantages de KÔSMÉA Privilège ?', answer: 'Selon votre niveau (Silver, Gold, Diamond) : livraison privilégiée, accès anticipé, offres exclusives et consultations stylistes.' },
  { id: 'f11', category: 'Retours', question: 'Puis-je retourner un produit ?', answer: 'Chaque boutique définit sa politique de retour, indiquée sur la fiche produit avant votre achat.' },
  { id: 'f12', category: 'Compte', question: 'Comment supprimer mon compte ou mes données ?', answer: 'Rendez-vous dans Mon KÔSMÉA > Confidentialité pour gérer vos données personnelles et la suppression de votre compte.' },
]

export const partners: Partner[] = [
  { id: 'pt1', category: 'Paiement', name: 'Orange Money' },
  { id: 'pt2', category: 'Paiement', name: 'MTN MoMo' },
  { id: 'pt3', category: 'Paiement', name: 'Wave' },
  { id: 'pt4', category: 'Paiement', name: 'Visa / Mastercard' },
  { id: 'pt5', category: 'Livraison', name: 'Jumia Logistics' },
  { id: 'pt6', category: 'Livraison', name: 'Gozem Delivery' },
  { id: 'pt7', category: 'Médias', name: 'Trace Africa' },
  { id: 'pt8', category: 'Institutionnel', name: 'Chambre de Commerce de Côte d’Ivoire' },
]

export const keyStats = [
  { label: 'Boutiques partenaires', value: '250+' },
  { label: 'Stylistes & professionnels', value: '400+' },
  { label: 'Produits référencés', value: '12 000+' },
  { label: 'Membres KÔSMÉA', value: '85 000+' },
  { label: 'Looks partagés', value: '30 000+' },
  { label: 'Formations Academy', value: '60+' },
]

// ---- Helpers -----------------------------------------------------------

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' FCFA'
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getBoutiqueBySlug(slug: string): Boutique | undefined {
  return boutiques.find((b) => b.slug === slug)
}

export function getStylistBySlug(slug: string): Stylist | undefined {
  return stylists.find((s) => s.slug === slug)
}

export function getProfessionalBySlug(slug: string): BeautyProfessional | undefined {
  return professionals.find((p) => p.slug === slug)
}

export function getLookBySlug(slug: string): Look | undefined {
  return looks.find((l) => l.slug === slug)
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug)
}

export function getBoutique(id: string): Boutique | undefined {
  return boutiques.find((b) => b.id === id)
}

export function productsByBoutique(boutiqueId: string): Product[] {
  return products.filter((p) => p.boutiqueId === boutiqueId)
}

export function productsByIds(ids: string[]): Product[] {
  return ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p))
}

export function similarProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, count)
}

export function lookTotal(look: Look): number {
  return productsByIds(look.productIds).reduce((sum, p) => sum + p.price, 0)
}

export function productPriceDisplay(product: Product): string {
  return formatFCFA(product.price)
}
