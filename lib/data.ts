// AKWABA IMMOBILIER — couche de données mock
// Cette couche simule une future API/CMS. Toutes les pages du site doivent lire
// leurs données ici plutôt que de coder des valeurs en dur, afin de faciliter
// un futur branchement sur un vrai backend (base de données + CMS + auth).

export type TransactionType = 'vente' | 'location'
export type PropertyCategory =
  | 'villa'
  | 'maison'
  | 'appartement'
  | 'terrain'
  | 'bureau'
  | 'commerce'
  | 'immeuble'
export type PropertyBadge = 'EXCLUSIVITÉ' | 'NOUVEAU' | 'PROMOTION' | 'COUP DE CŒUR'
export type ProgramStatus = 'en_commercialisation' | 'en_construction' | 'a_venir' | 'livre'

export interface Property {
  id: string
  slug: string
  title: string
  transaction: TransactionType
  category: PropertyCategory
  city: string
  district: string
  address: string
  price: number
  priceLabel?: string
  surface: number
  landSurface?: number
  bedrooms?: number
  bathrooms?: number
  parkings?: number
  yearBuilt?: number
  badges: PropertyBadge[]
  images: string[]
  videoUrl?: string
  virtualTourUrl?: string
  description: string
  features: string[]
  documents: { label: string; type: string }[]
  agentId: string
  coordinates: { lat: number; lng: number }
  programStatus?: ProgramStatus
  createdAt: string
  featured?: boolean
}

export interface Project {
  id: string
  slug: string
  name: string
  city: string
  district: string
  status: ProgramStatus
  summary: string
  description: string
  images: string[]
  lots: number
  availableLots: number
  priceFrom: number
  surfaceFrom: number
  equipments: string[]
  progress: { label: string; percent: number }[]
  deliveryDate: string
  documents: { label: string; type: string }[]
  coordinates: { lat: number; lng: number }
}

export interface Agency {
  id: string
  city: string
  address: string
  hours: string
  phone: string
  email: string
  manager: string
  coordinates: { lat: number; lng: number }
}

export type Department =
  | 'direction'
  | 'commercial'
  | 'foncier'
  | 'technique'
  | 'juridique'
  | 'gestion'
  | 'communication'

export interface TeamMember {
  id: string
  name: string
  role: string
  department: Department
  specialty: string
  photo: string
  phone: string
  email: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  city: string
  rating: number
  quote: string
  photo: string
  videoUrl?: string
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

export interface VideoItem {
  id: string
  slug: string
  title: string
  category: string
  thumbnail: string
  embedUrl: string
  description: string
  date: string
}

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  location: string
  category: string
  image: string
  description: string
}

export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  contract: string
  description: string
}

export interface Partner {
  id: string
  category: string
  name: string
}

export const metiers = [
  {
    id: 'achat-vente',
    icon: 'Home',
    title: 'Achat & vente',
    description: 'Maisons, villas, appartements, terrains et locaux, accompagnés jusqu’à la signature.',
  },
  {
    id: 'location',
    icon: 'KeyRound',
    title: 'Location',
    description: 'Appartements, studios, villas, bureaux et commerces disponibles à la location.',
  },
  {
    id: 'construction',
    icon: 'HardHat',
    title: 'Construction',
    description: 'De la conception à la réalisation, un suivi de chantier rigoureux et transparent.',
  },
  {
    id: 'amenagement-foncier',
    icon: 'Trees',
    title: 'Aménagement foncier',
    description: 'Création et développement de lotissements et de projets immobiliers sécurisés.',
  },
  {
    id: 'rehabilitation',
    icon: 'Hammer',
    title: 'Réhabilitation',
    description: 'Rénovation et transformation de bâtiments pour valoriser votre patrimoine.',
  },
  {
    id: 'gestion',
    icon: 'ClipboardList',
    title: 'Gestion immobilière',
    description: 'Gestion locative complète et valorisation de votre patrimoine au quotidien.',
  },
] as const

export const villesCouvertes = [
  'Cocody', 'Riviera', 'Angré', 'Marcory', 'Plateau', 'Yopougon', 'Port-Bouët',
  'Bingerville', 'Grand-Bassam', 'Assinie', 'Songon', 'Yamoussoukro', 'Bouaké', 'San-Pédro',
]

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

export const agents: TeamMember[] = [
  {
    id: 'agt-1', name: 'Aïcha Koffi', role: 'Directrice Générale', department: 'direction',
    specialty: 'Stratégie & développement', photo: img('photo-1580489944761-15a19d654956', 600),
    phone: '+225 07 00 00 00 01', email: 'aicha.koffi@akwaba-immobilier.ci',
    bio: 'Plus de 15 ans d’expérience dans l’immobilier et le développement urbain en Côte d’Ivoire.',
  },
  {
    id: 'agt-2', name: 'Serge Amani', role: 'Directeur Commercial', department: 'commercial',
    specialty: 'Vente & négociation', photo: img('photo-1519085360753-af0119f7cbe7', 600),
    phone: '+225 07 00 00 00 02', email: 'serge.amani@akwaba-immobilier.ci',
    bio: 'Pilote l’équipe commerciale et l’expérience client sur l’ensemble du catalogue.',
  },
  {
    id: 'agt-3', name: 'Fatou Diabaté', role: 'Responsable Foncier', department: 'foncier',
    specialty: 'Sécurisation foncière', photo: img('photo-1544005313-94ddf0286df2', 600),
    phone: '+225 07 00 00 00 03', email: 'fatou.diabate@akwaba-immobilier.ci',
    bio: 'Experte en régularisation et sécurisation des titres fonciers.',
  },
  {
    id: 'agt-4', name: 'Yves Brou', role: 'Chef de Projets Techniques', department: 'technique',
    specialty: 'Construction & suivi de chantier', photo: img('photo-1500648767791-00dcc994a43e', 600),
    phone: '+225 07 00 00 00 04', email: 'yves.brou@akwaba-immobilier.ci',
    bio: 'Supervise la conception et l’exécution des programmes immobiliers Akwaba.',
  },
  {
    id: 'agt-5', name: 'Grace N’Guessan', role: 'Conseillère Juridique', department: 'juridique',
    specialty: 'Droit immobilier & foncier', photo: img('photo-1573497019940-1c28c88b4f3e', 600),
    phone: '+225 07 00 00 00 05', email: 'grace.nguessan@akwaba-immobilier.ci',
    bio: 'Sécurise chaque transaction sur le plan contractuel et réglementaire.',
  },
  {
    id: 'agt-6', name: 'Moussa Traoré', role: 'Gestionnaire Locatif', department: 'gestion',
    specialty: 'Gestion locative', photo: img('photo-1472099645785-5658abf4ff4e', 600),
    phone: '+225 07 00 00 00 06', email: 'moussa.traore@akwaba-immobilier.ci',
    bio: 'Accompagne les propriétaires dans la gestion quotidienne de leurs biens.',
  },
  {
    id: 'agt-7', name: 'Prisca Yao', role: 'Conseillère Immobilière', department: 'commercial',
    specialty: 'Résidentiel haut de gamme', photo: img('photo-1544717305-2782549b5136', 600),
    phone: '+225 07 00 00 00 07', email: 'prisca.yao@akwaba-immobilier.ci',
    bio: 'Accompagne particuliers et investisseurs dans leurs projets résidentiels.',
  },
  {
    id: 'agt-8', name: 'Karim Ouattara', role: 'Responsable Communication', department: 'communication',
    specialty: 'Marque & contenus', photo: img('photo-1519345182560-3f2917c472ef', 600),
    phone: '+225 07 00 00 00 08', email: 'karim.ouattara@akwaba-immobilier.ci',
    bio: 'Pilote la stratégie de contenus, le magazine et Akwaba TV.',
  },
]

export const agencies: Agency[] = [
  {
    id: 'ag-abidjan-cocody', city: 'Abidjan — Cocody', address: 'Boulevard Latrille, Cocody, Abidjan',
    hours: 'Lun – Ven : 8h30 – 18h · Sam : 9h – 13h', phone: '+225 27 22 00 00 00',
    email: 'cocody@akwaba-immobilier.ci', manager: 'Aïcha Koffi', coordinates: { lat: 5.3599, lng: -3.9856 },
  },
  {
    id: 'ag-abidjan-plateau', city: 'Abidjan — Plateau', address: 'Avenue Chardy, Le Plateau, Abidjan',
    hours: 'Lun – Ven : 8h30 – 18h', phone: '+225 27 22 00 00 01',
    email: 'plateau@akwaba-immobilier.ci', manager: 'Serge Amani', coordinates: { lat: 5.3208, lng: -4.0219 },
  },
  {
    id: 'ag-yamoussoukro', city: 'Yamoussoukro', address: 'Avenue Houphouët-Boigny, Yamoussoukro',
    hours: 'Lun – Ven : 8h30 – 17h30', phone: '+225 27 30 00 00 02',
    email: 'yamoussoukro@akwaba-immobilier.ci', manager: 'Yves Brou', coordinates: { lat: 6.8276, lng: -5.2893 },
  },
  {
    id: 'ag-bassam', city: 'Grand-Bassam', address: 'Route Côtière, Grand-Bassam',
    hours: 'Lun – Sam : 9h – 17h', phone: '+225 27 21 00 00 03',
    email: 'bassam@akwaba-immobilier.ci', manager: 'Prisca Yao', coordinates: { lat: 5.2007, lng: -3.7388 },
  },
]

export const properties: Property[] = [
  {
    id: 'p1', slug: 'villa-contemporaine-riviera-golf', title: 'Villa contemporaine Riviera Golf',
    transaction: 'vente', category: 'villa', city: 'Abidjan', district: 'Riviera Golf',
    address: 'Riviera Golf, Abidjan', price: 185_000_000, surface: 420, landSurface: 600,
    bedrooms: 5, bathrooms: 4, parkings: 2, yearBuilt: 2023, badges: ['EXCLUSIVITÉ'],
    images: [img('photo-1600585154340-be6161a56a0c'), img('photo-1600607687939-ce8a6c25118c'), img('photo-1600566753086-00f18fb6b3ea'), img('photo-1600607687644-aac4c3eac7f4')],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', virtualTourUrl: '#visite-360',
    description: 'Villa contemporaine d’exception au cœur de la Riviera Golf, alliant volumes généreux, finitions haut de gamme et piscine à débordement. Un cadre de vie premium à quelques minutes des meilleures écoles et commerces d’Abidjan.',
    features: ['Piscine à débordement', 'Domotique intégrée', 'Groupe électrogène', 'Climatisation centralisée', 'Jardin paysager', 'Sécurité 24h/24'],
    documents: [{ label: 'Titre foncier', type: 'PDF' }, { label: 'Plan architectural', type: 'PDF' }],
    agentId: 'agt-7', coordinates: { lat: 5.3167, lng: -3.9633 }, createdAt: '2026-08-20', featured: true,
  },
  {
    id: 'p2', slug: 'appartement-standing-plateau-vue-lagune', title: 'Appartement standing vue lagune',
    transaction: 'vente', category: 'appartement', city: 'Abidjan', district: 'Plateau',
    address: 'Immeuble Horizon, Le Plateau, Abidjan', price: 95_000_000, surface: 145,
    bedrooms: 3, bathrooms: 2, parkings: 1, yearBuilt: 2022, badges: ['NOUVEAU'],
    images: [img('photo-1600596542815-ffad4c1539a9'), img('photo-1600607687920-4e2a09cf159d'), img('photo-1600210492486-724fe5c67fb0')],
    description: 'Appartement lumineux au 12e étage avec vue imprenable sur la lagune Ébrié, dans une résidence sécurisée avec ascenseur et parking privatif.',
    features: ['Vue lagune', 'Ascenseur', 'Parking privatif', 'Résidence sécurisée', 'Cuisine équipée'],
    documents: [{ label: 'Règlement de copropriété', type: 'PDF' }],
    agentId: 'agt-7', coordinates: { lat: 5.3208, lng: -4.0219 }, createdAt: '2026-09-01', featured: true,
  },
  {
    id: 'p3', slug: 'terrain-loti-bingerville', title: 'Terrain loti sécurisé — Bingerville',
    transaction: 'vente', category: 'terrain', city: 'Bingerville', district: 'Centre',
    address: 'Lotissement Les Palmiers, Bingerville', price: 25_000_000, surface: 600, landSurface: 600,
    badges: ['PROMOTION'], images: [img('photo-1500382017468-9049fed747ef'), img('photo-1500382017946-6c3d5f11c27f')],
    description: 'Parcelle viabilisée dans un lotissement sécurisé, idéale pour un projet résidentiel ou d’investissement. Titre foncier disponible.',
    features: ['Lotissement clôturé', 'Voirie bitumée', 'Électricité à proximité', 'Titre foncier disponible'],
    documents: [{ label: 'Titre foncier', type: 'PDF' }, { label: 'Plan de lotissement', type: 'PDF' }],
    agentId: 'agt-3', coordinates: { lat: 5.3556, lng: -3.8828 }, createdAt: '2026-07-15',
  },
  {
    id: 'p4', slug: 'villa-jardins-azure-bingerville', title: 'Villa — Résidence Les Jardins d’Azur',
    transaction: 'vente', category: 'villa', city: 'Bingerville', district: 'Les Jardins d’Azur',
    address: 'Résidence Les Jardins d’Azur, Bingerville', price: 42_000_000, priceLabel: 'À partir de',
    surface: 120, landSurface: 250, bedrooms: 3, bathrooms: 2, parkings: 1, badges: ['NOUVEAU'],
    images: [img('photo-1600566753190-17f0baa2a6c3'), img('photo-1600047509807-ba8f99d2cdde')],
    description: 'Programme neuf de villas à étage dans un cadre résidentiel arboré. Livraison prévue en 2027, plusieurs plans disponibles.',
    features: ['Programme neuf', 'Lotissement sécurisé', 'Espaces verts', 'Aire de jeux'],
    documents: [{ label: 'Brochure programme', type: 'PDF' }],
    agentId: 'agt-2', coordinates: { lat: 5.3556, lng: -3.8828 }, programStatus: 'en_construction', createdAt: '2026-06-10',
  },
  {
    id: 'p5', slug: 'maison-familiale-angre', title: 'Maison familiale — Angré 8e Tranche',
    transaction: 'vente', category: 'maison', city: 'Abidjan', district: 'Angré',
    address: 'Angré 8e Tranche, Abidjan', price: 68_000_000, surface: 200, landSurface: 300,
    bedrooms: 4, bathrooms: 3, parkings: 2, yearBuilt: 2019, badges: [],
    images: [img('photo-1568605114967-8130f3a36994'), img('photo-1570129477492-45c003edd2be')],
    description: 'Maison familiale de standing dans un quartier calme et résidentiel, proche des écoles internationales et commerces.',
    features: ['Cour clôturée', 'Cuisine ouverte', 'Balcon', 'Quartier calme'],
    documents: [{ label: 'Attestation villageoise', type: 'PDF' }],
    agentId: 'agt-7', coordinates: { lat: 5.3833, lng: -3.9667 }, createdAt: '2026-05-22',
  },
  {
    id: 'p6', slug: 'bureaux-open-space-plateau', title: 'Bureaux open-space — Immeuble Alpha 2000',
    transaction: 'location', category: 'bureau', city: 'Abidjan', district: 'Plateau',
    address: 'Immeuble Alpha 2000, Le Plateau, Abidjan', price: 3_500_000, priceLabel: '/ mois', surface: 300,
    parkings: 6, badges: ['EXCLUSIVITÉ'], images: [img('photo-1497366216548-37526070297c'), img('photo-1497366811353-6870744d04b2')],
    description: 'Plateau de bureaux modulable au cœur du quartier des affaires, climatisation centrale, fibre optique et parking sécurisé.',
    features: ['Climatisation centrale', 'Fibre optique', 'Parking sécurisé', 'Salle de réunion équipée'],
    documents: [], agentId: 'agt-2', coordinates: { lat: 5.3208, lng: -4.0219 }, createdAt: '2026-08-05',
  },
  {
    id: 'p7', slug: 'villa-meublee-assinie', title: 'Villa meublée en bord de lagune — Assinie',
    transaction: 'location', category: 'villa', city: 'Assinie', district: 'Assinie-Mafia',
    address: 'Front lagunaire, Assinie', price: 850_000, priceLabel: '/ nuit', surface: 280,
    bedrooms: 4, bathrooms: 4, badges: ['COUP DE CŒUR'], images: [img('photo-1499793983690-e29da59ef1c2'), img('photo-1615529182904-14819c35db37')],
    description: 'Villa pieds dans l’eau avec ponton privé, idéale pour vos week-ends et réceptions au bord de la lagune Aby.',
    features: ['Ponton privé', 'Piscine', 'Vue lagune', 'Personnel de maison inclus'],
    documents: [], agentId: 'agt-7', coordinates: { lat: 5.1333, lng: -3.2833 }, createdAt: '2026-08-28', featured: true,
  },
  {
    id: 'p8', slug: 'appartement-meuble-marcory', title: 'Appartement meublé — Marcory Résidentiel',
    transaction: 'location', category: 'appartement', city: 'Abidjan', district: 'Marcory',
    address: 'Marcory Résidentiel, Abidjan', price: 450_000, priceLabel: '/ mois', surface: 85,
    bedrooms: 2, bathrooms: 1, parkings: 1, badges: [], images: [img('photo-1502672260266-1c1ef2d93688'), img('photo-1522708323590-d24dbb6b0267')],
    description: 'Appartement entièrement meublé et équipé, idéal pour expatriés et professionnels, dans une résidence calme et sécurisée.',
    features: ['Meublé', 'Sécurisé', 'Internet inclus', 'Proche commerces'],
    documents: [], agentId: 'agt-6', coordinates: { lat: 5.2944, lng: -3.9836 }, createdAt: '2026-07-30',
  },
  {
    id: 'p9', slug: 'local-commercial-yopougon', title: 'Local commercial — Axe principal Yopougon',
    transaction: 'location', category: 'commerce', city: 'Abidjan', district: 'Yopougon',
    address: 'Axe principal, Yopougon, Abidjan', price: 900_000, priceLabel: '/ mois', surface: 180,
    badges: [], images: [img('photo-1441986300917-64674bd600d8'), img('photo-1533619239233-6a3f68c3a2c1')],
    description: 'Local commercial à forte visibilité sur un axe passant, idéal pour commerce de détail ou show-room.',
    features: ['Vitrine sur rue', 'Grand parking', 'Réserve incluse'],
    documents: [], agentId: 'agt-6', coordinates: { lat: 5.3167, lng: -4.0833 }, createdAt: '2026-06-18',
  },
  {
    id: 'p10', slug: 'immeuble-rendement-cocody', title: 'Immeuble de rapport — Cocody Danga',
    transaction: 'vente', category: 'immeuble', city: 'Abidjan', district: 'Cocody Danga',
    address: 'Cocody Danga, Abidjan', price: 310_000_000, surface: 900, landSurface: 500,
    parkings: 8, yearBuilt: 2021, badges: ['EXCLUSIVITÉ'], images: [img('photo-1449844908441-8829872d2607'), img('photo-1460317442991-0ec209397118')],
    description: 'Immeuble R+4 entièrement loué, 8 appartements et 2 commerces, excellent rendement locatif dans un quartier en forte croissance.',
    features: ['8 appartements', '2 commerces', 'Rendement locatif prouvé', 'Ascenseur'],
    documents: [{ label: 'État locatif', type: 'PDF' }, { label: 'Titre foncier', type: 'PDF' }],
    agentId: 'agt-2', coordinates: { lat: 5.3486, lng: -3.9833 }, createdAt: '2026-04-12',
  },
  {
    id: 'p11', slug: 'terrain-agricole-songon', title: 'Terrain à usage mixte — Songon',
    transaction: 'vente', category: 'terrain', city: 'Songon', district: 'Songon Agban',
    address: 'Songon Agban', price: 12_000_000, surface: 1200, landSurface: 1200,
    badges: [], images: [img('photo-1500534623283-312aade485b7')],
    description: 'Grande parcelle à usage mixte dans une zone en développement, adaptée à un projet résidentiel ou agricole.',
    features: ['Zone en développement', 'Accès route principale'],
    documents: [{ label: 'Certificat foncier', type: 'PDF' }],
    agentId: 'agt-3', coordinates: { lat: 5.3333, lng: -4.2333 }, createdAt: '2026-03-02',
  },
  {
    id: 'p12', slug: 'penthouse-riviera-3', title: 'Penthouse panoramique — Riviera 3',
    transaction: 'vente', category: 'appartement', city: 'Abidjan', district: 'Riviera 3',
    address: 'Riviera 3, Abidjan', price: 220_000_000, surface: 260, bedrooms: 4, bathrooms: 3,
    parkings: 2, yearBuilt: 2024, badges: ['EXCLUSIVITÉ', 'NOUVEAU'],
    images: [img('photo-1512917774080-9991f1c4c750'), img('photo-1512918728675-ed5a9ecdebfd')],
    description: 'Penthouse d’exception avec terrasse panoramique de 120 m², jacuzzi et vue dégagée sur Abidjan.',
    features: ['Terrasse panoramique', 'Jacuzzi', 'Cave à vin', 'Domotique'],
    documents: [], agentId: 'agt-7', coordinates: { lat: 5.3389, lng: -3.9639 }, createdAt: '2026-09-05', featured: true,
  },
]

export const projects: Project[] = [
  {
    id: 'pr1', slug: 'cite-atlantide-bingerville', name: 'Cité Atlantide', city: 'Bingerville', district: 'Route de Bingerville',
    status: 'en_commercialisation',
    summary: 'Un nouveau territoire, une nouvelle manière de vivre entre nature et modernité.',
    description: 'Cité Atlantide est un programme résidentiel intégré de 180 lots comprenant villas, duplex et espaces communs paysagers, pensé pour les familles en quête de sérénité à 20 minutes du Plateau.',
    images: [img('photo-1600585154340-be6161a56a0c'), img('photo-1600607687939-ce8a6c25118c'), img('photo-1600566753086-00f18fb6b3ea')],
    lots: 180, availableLots: 64, priceFrom: 38_000_000, surfaceFrom: 200,
    equipments: ['Voirie bitumée', 'Réseau électrique enterré', 'Espaces verts', 'Sécurité 24h/24', 'Aire de jeux'],
    progress: [
      { label: 'Conception', percent: 100 }, { label: 'Terrassement', percent: 100 },
      { label: 'Viabilisation', percent: 80 }, { label: 'Construction', percent: 45 }, { label: 'Livraison', percent: 0 },
    ],
    deliveryDate: '2027', documents: [{ label: 'Masterplan', type: 'PDF' }, { label: 'Grille des prix', type: 'PDF' }],
    coordinates: { lat: 5.3556, lng: -3.8828 },
  },
  {
    id: 'pr2', slug: 'residence-andou-mbatto', name: 'Résidence Andou-M’Batto', city: 'Anyama', district: 'Andou-M’Batto',
    status: 'en_construction',
    summary: 'Un cadre de vie paisible aux portes d’Abidjan, pensé pour le confort familial.',
    description: 'Résidence de standing de 96 logements du T2 au T5, avec espaces communs, salle de sport et conciergerie.',
    images: [img('photo-1600047509807-ba8f99d2cdde'), img('photo-1600566753190-17f0baa2a6c3')],
    lots: 96, availableLots: 28, priceFrom: 45_000_000, surfaceFrom: 65,
    equipments: ['Piscine collective', 'Salle de sport', 'Conciergerie', 'Parking souterrain'],
    progress: [
      { label: 'Conception', percent: 100 }, { label: 'Terrassement', percent: 100 },
      { label: 'Gros œuvre', percent: 70 }, { label: 'Second œuvre', percent: 20 }, { label: 'Livraison', percent: 0 },
    ],
    deliveryDate: '2027', documents: [{ label: 'Brochure', type: 'PDF' }], coordinates: { lat: 5.4944, lng: -4.0511 },
  },
  {
    id: 'pr3', slug: 'les-terrasses-grand-bassam', name: 'Les Terrasses de Grand-Bassam', city: 'Grand-Bassam', district: 'Front de mer',
    status: 'a_venir',
    summary: 'Un programme balnéaire d’exception face à l’océan Atlantique.',
    description: 'Résidence balnéaire de standing avec vue sur l’océan, conçue pour la résidence secondaire et l’investissement locatif saisonnier.',
    images: [img('photo-1499793983690-e29da59ef1c2'), img('photo-1615529182904-14819c35db37')],
    lots: 60, availableLots: 60, priceFrom: 55_000_000, surfaceFrom: 90,
    equipments: ['Accès plage privée', 'Piscine à débordement', 'Restaurant'],
    progress: [{ label: 'Conception', percent: 100 }, { label: 'Autorisations', percent: 60 }, { label: 'Terrassement', percent: 0 }],
    deliveryDate: '2028', documents: [], coordinates: { lat: 5.2007, lng: -3.7388 },
  },
  {
    id: 'pr4', slug: 'jardins-azur-bingerville', name: 'Les Jardins d’Azur', city: 'Bingerville', district: 'Centre',
    status: 'en_construction',
    summary: 'Des villas à étage dans un lotissement arboré, pensées pour la vie de famille.',
    description: 'Programme de 40 villas à étage de 3 et 4 chambres, dans un cadre résidentiel calme à quelques minutes d’Abidjan.',
    images: [img('photo-1486406146926-c627a92ad1ab'), img('photo-1600607687920-4e2a09cf159d')],
    lots: 40, availableLots: 12, priceFrom: 42_000_000, surfaceFrom: 120,
    equipments: ['Lotissement sécurisé', 'Espaces verts', 'Aire de jeux'],
    progress: [
      { label: 'Conception', percent: 100 }, { label: 'Terrassement', percent: 100 },
      { label: 'Construction', percent: 50 }, { label: 'Livraison', percent: 0 },
    ],
    deliveryDate: '2027', documents: [{ label: 'Plans des lots', type: 'PDF' }], coordinates: { lat: 5.3556, lng: -3.8828 },
  },
  {
    id: 'pr5', slug: 'residence-riviera-palm', name: 'Résidence Riviera Palm', city: 'Abidjan', district: 'Riviera Palmeraie',
    status: 'livre',
    summary: 'Une résidence fermée livrée, référence de notre savoir-faire en promotion immobilière.',
    description: 'Résidence de 54 appartements livrée en 2024, entièrement commercialisée, illustrant notre expertise en promotion immobilière urbaine.',
    images: [img('photo-1600596542815-ffad4c1539a9'), img('photo-1600210492486-724fe5c67fb0')],
    lots: 54, availableLots: 0, priceFrom: 62_000_000, surfaceFrom: 95,
    equipments: ['Piscine', 'Gardiennage', 'Parking souterrain'],
    progress: [{ label: 'Conception', percent: 100 }, { label: 'Construction', percent: 100 }, { label: 'Livraison', percent: 100 }],
    deliveryDate: '2024 — Livré', documents: [], coordinates: { lat: 5.3167, lng: -3.9633 },
  },
  {
    id: 'pr6', slug: 'quartier-songon-vallon', name: 'Songon Vallon', city: 'Songon', district: 'Vallon',
    status: 'a_venir',
    summary: 'Soyez parmi les premiers informés de notre prochain grand lotissement.',
    description: 'Futur lotissement résidentiel de 220 parcelles viabilisées, en cours de conception, ouvert à la pré-réservation.',
    images: [img('photo-1500534623283-312aade485b7')],
    lots: 220, availableLots: 220, priceFrom: 15_000_000, surfaceFrom: 500,
    equipments: ['Étude en cours'], progress: [{ label: 'Conception', percent: 40 }],
    deliveryDate: '2029 (estimation)', documents: [], coordinates: { lat: 5.3333, lng: -4.2333 },
  },
]

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Marc-Aurèle Kouassi', role: 'Propriétaire', city: 'Cocody', rating: 5,
    quote: 'Notre projet immobilier a été accompagné de A à Z, avec une équipe toujours disponible et transparente sur chaque étape.',
    photo: img('photo-1568602471122-7832951cc4c5', 400) },
  { id: 't2', name: 'Nadège Aka', role: 'Investisseuse', city: 'Abidjan', rating: 5,
    quote: 'Grâce à Akwaba Immobilier, j’ai pu investir dans un terrain sécurisé sans jamais me déplacer depuis la France.',
    photo: img('photo-1580489944761-15a19d654956', 400), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 't3', name: 'Ibrahim Sanogo', role: 'Locataire', city: 'Marcory', rating: 4,
    quote: 'Un processus de location rapide, clair, et une équipe très réactive sur WhatsApp.',
    photo: img('photo-1633332755192-727a05c4013d', 400) },
  { id: 't4', name: 'Cynthia Bamba', role: 'Propriétaire bailleur', city: 'Bingerville', rating: 5,
    quote: 'La gestion locative de mon immeuble est enfin sereine : reporting mensuel et loyers versés à temps.',
    photo: img('photo-1573497019940-1c28c88b4f3e', 400) },
  { id: 't5', name: 'Olivier Kacou', role: 'Promoteur partenaire', city: 'Yamoussoukro', rating: 5,
    quote: 'Un partenaire fiable pour la commercialisation de nos programmes, avec une vraie expertise terrain.',
    photo: img('photo-1519085360753-af0119f7cbe7', 400) },
  { id: 't6', name: 'Aminata Cissé', role: 'Acheteuse', city: 'Riviera', rating: 5,
    quote: 'La visite virtuelle m’a permis de visiter trois villas en une soirée avant de me décider.',
    photo: img('photo-1544005313-94ddf0286df2', 400) },
]

export const articles: Article[] = [
  { id: 'a1', slug: 'guide-achat-terrain-cote-ivoire', title: 'Les 7 documents à vérifier avant d’acheter un terrain',
    category: 'Foncier', author: 'Fatou Diabaté', date: '2026-08-12', image: img('photo-1500382017468-9049fed747ef'),
    excerpt: 'Certificat de propriété, ACD, plan de bornage... voici les documents essentiels pour sécuriser votre achat.',
    content: [
      'Acheter un terrain en Côte d’Ivoire nécessite une vigilance particulière sur la documentation foncière.',
      'Le certificat de propriété foncière rurale ou urbaine constitue la base de toute transaction sécurisée.',
      'L’Arrêté de Concession Définitive (ACD) atteste que le terrain a été régulièrement attribué par l’État.',
      'Notre équipe foncière vous accompagne dans la vérification de chacun de ces documents avant signature.',
    ] },
  { id: 'a2', slug: 'investir-immobilier-locatif-abidjan', title: 'Pourquoi investir dans l’immobilier locatif à Abidjan en 2026',
    category: 'Investissement', author: 'Serge Amani', date: '2026-08-28', image: img('photo-1449844908441-8829872d2607'),
    excerpt: 'Croissance démographique, demande locative forte : les fondamentaux du marché abidjanais restent solides.',
    content: [
      'Abidjan connaît une croissance démographique soutenue qui alimente une forte demande locative.',
      'Les quartiers de Cocody, Marcory et Riviera concentrent l’essentiel de la demande premium.',
      'Le rendement locatif brut moyen observé sur nos biens en gestion se situe entre 6 % et 9 % par an.',
    ] },
  { id: 'a3', slug: 'etapes-construire-sa-maison', title: 'Construire sa maison en Côte d’Ivoire : les 6 étapes clés',
    category: 'Construction', author: 'Yves Brou', date: '2026-07-19', image: img('photo-1568605114967-8130f3a36994'),
    excerpt: 'De l’étude de sol à la remise des clés, découvrez notre méthode de suivi de chantier.',
    content: [
      'Étape 1 : étude de sol et validation du terrain.',
      'Étape 2 : conception architecturale et dépôt du permis de construire.',
      'Étape 3 : terrassement et fondations.',
      'Étape 4 : gros œuvre et élévation.',
      'Étape 5 : second œuvre et finitions.',
      'Étape 6 : réception des travaux et remise des clés.',
    ] },
  { id: 'a4', slug: 'marche-immobilier-cote-ivoire-2026', title: 'Marché immobilier ivoirien : les tendances de 2026',
    category: 'Marché', author: 'Aïcha Koffi', date: '2026-09-02', image: img('photo-1460317442991-0ec209397118'),
    excerpt: 'Analyse des prix, des zones en forte croissance et des perspectives pour les investisseurs.',
    content: ['Le marché résidentiel abidjanais confirme sa dynamique, porté par la périphérie Est.', 'Bingerville et Songon s’imposent comme les nouveaux pôles de développement.'] },
  { id: 'a5', slug: 'fiscalite-immobiliere-guide', title: 'Fiscalité immobilière : ce qu’il faut savoir avant d’investir',
    category: 'Conseils', author: 'Grace N’Guessan', date: '2026-06-30', image: img('photo-1497366216548-37526070297c'),
    excerpt: 'Taxes foncières, droits d’enregistrement : un panorama de la fiscalité applicable.',
    content: ['La fiscalité immobilière ivoirienne comprend plusieurs taxes qu’il convient d’anticiper.', 'Nous recommandons toujours de consulter un professionnel habilité pour votre situation spécifique.'] },
  { id: 'a6', slug: 'akwaba-lance-cite-atlantide', title: 'Akwaba Immobilier lance Cité Atlantide à Bingerville',
    category: 'Actualités', author: 'Karim Ouattara', date: '2026-09-10', image: img('photo-1600585154340-be6161a56a0c'),
    excerpt: 'Notre nouveau programme résidentiel de 180 lots ouvre sa commercialisation.',
    content: ['Cité Atlantide marque une nouvelle étape dans notre développement en périphérie d’Abidjan.'] },
  { id: 'a7', slug: 'rendement-locatif-comment-calculer', title: 'Comment calculer le rendement locatif d’un bien',
    category: 'Investissement', author: 'Serge Amani', date: '2026-05-14', image: img('photo-1512917774080-9991f1c4c750'),
    excerpt: 'La méthode simple pour estimer la rentabilité brute et nette de votre investissement.',
    content: ['Le rendement brut se calcule en divisant le loyer annuel par le prix d’achat.', 'Le rendement net intègre les charges, taxes et frais de gestion.'] },
  { id: 'a8', slug: 'conseils-proprietaires-gestion-locative', title: '5 conseils pour bien gérer son bien en location',
    category: 'Conseils aux propriétaires', author: 'Moussa Traoré', date: '2026-04-22', image: img('photo-1472099645785-5658abf4ff4e'),
    excerpt: 'Sélection des locataires, état des lieux, entretien : nos bonnes pratiques de gestionnaire.',
    content: ['Un état des lieux détaillé, à l’entrée comme à la sortie, évite la majorité des litiges.', 'Un entretien préventif régulier préserve la valeur de votre bien sur le long terme.'] },
]

export const videos: VideoItem[] = [
  { id: 'v1', slug: 'visite-villa-riviera-golf', title: 'Visite guidée — Villa contemporaine Riviera Golf',
    category: 'Visites', thumbnail: img('photo-1600585154340-be6161a56a0c'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Une visite complète de notre villa d’exception à la Riviera Golf.', date: '2026-08-25' },
  { id: 'v2', slug: 'presentation-cite-atlantide', title: 'Présentation du projet Cité Atlantide',
    category: 'Projets', thumbnail: img('photo-1600607687939-ce8a6c25118c'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Découvrez le concept et le masterplan de notre programme phare à Bingerville.', date: '2026-08-10' },
  { id: 'v3', slug: 'interview-directrice-generale', title: 'Interview — Aïcha Koffi, Directrice Générale',
    category: 'Interviews', thumbnail: img('photo-1580489944761-15a19d654956'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Notre Directrice Générale revient sur la vision et les ambitions d’Akwaba Immobilier.', date: '2026-07-02' },
  { id: 'v4', slug: 'temoignage-nadege-aka', title: 'Témoignage — Nadège Aka, investisseuse',
    category: 'Témoignages', thumbnail: img('photo-1580489944761-15a19d654956'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Nadège partage son expérience d’investissement à distance avec Akwaba Immobilier.', date: '2026-06-18' },
  { id: 'v5', slug: 'conseils-achat-terrain', title: 'Conseils — Bien choisir son terrain',
    category: 'Conseils', thumbnail: img('photo-1500382017468-9049fed747ef'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Notre responsable foncier partage ses conseils pour bien choisir son terrain.', date: '2026-05-30' },
  { id: 'v6', slug: 'reportage-chantier-andou-mbatto', title: 'Reportage chantier — Résidence Andou-M’Batto',
    category: 'Reportages', thumbnail: img('photo-1600047509807-ba8f99d2cdde'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Immersion sur le chantier de notre résidence en cours de construction.', date: '2026-05-05' },
  { id: 'v7', slug: 'evenement-inauguration-riviera-palm', title: 'Inauguration de la Résidence Riviera Palm',
    category: 'Événements', thumbnail: img('photo-1600596542815-ffad4c1539a9'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Retour en images sur l’inauguration de notre résidence livrée.', date: '2026-03-14' },
  { id: 'v8', slug: 'actualites-akwaba-2026', title: 'Akwaba Immobilier en 2026 : bilan et perspectives',
    category: 'Actualités de l’entreprise', thumbnail: img('photo-1460317442991-0ec209397118'), embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Un bilan de nos réalisations et les grandes lignes de notre feuille de route.', date: '2026-01-20' },
]

export const faqs: FaqItem[] = [
  { id: 'f1', category: 'Achat', question: 'Quelles garanties ai-je lors de l’achat d’un bien avec Akwaba Immobilier ?',
    answer: 'Chaque bien proposé fait l’objet d’une vérification documentaire par notre équipe juridique et foncière avant sa mise en ligne. Nous recommandons toujours de faire valider l’acte final par un notaire.' },
  { id: 'f2', category: 'Achat', question: 'Puis-je acheter un bien à distance, depuis l’étranger ?', answer: 'Oui, une grande partie de nos clients investissent depuis l’étranger. Nous proposons des visites virtuelles, un suivi à distance et un accompagnement par procuration si nécessaire.' },
  { id: 'f3', category: 'Location', question: 'Quels documents dois-je fournir pour louer un bien ?', answer: 'En général : pièce d’identité, justificatif de revenus, et selon les cas une caution ou un garant. La liste précise est communiquée par votre conseiller.' },
  { id: 'f4', category: 'Location', question: 'Quel est le montant de la caution demandée ?', answer: 'La caution varie généralement entre 1 et 3 mois de loyer selon le type de bien et le propriétaire.' },
  { id: 'f5', category: 'Terrain', question: 'Comment vérifier qu’un terrain est sécurisé ?', answer: 'Vérifiez l’existence d’un titre de propriété (ACD, certificat foncier ou titre foncier) et faites confirmer sa validité par un professionnel avant tout engagement.' },
  { id: 'f6', category: 'Construction', question: 'Proposez-vous un accompagnement complet pour construire ?', answer: 'Oui, de la conception architecturale au suivi de chantier jusqu’à la livraison, notre pôle technique vous accompagne à chaque étape.' },
  { id: 'f7', category: 'Financement', question: 'Puis-je obtenir un financement bancaire via Akwaba Immobilier ?', answer: 'Nous travaillons avec plusieurs partenaires bancaires et pouvons vous orienter vers une solution de financement adaptée à votre projet.' },
  { id: 'f8', category: 'Investissement', question: 'Quel rendement locatif puis-je espérer ?', answer: 'Le rendement dépend fortement de la localisation et du type de bien. Nos simulations sont indicatives et ne constituent pas une garantie de rendement.' },
  { id: 'f9', category: 'Gestion', question: 'Comment fonctionne la gestion locative ?', answer: 'Nous prenons en charge la recherche de locataires, l’état des lieux, l’encaissement des loyers et le reporting mensuel au propriétaire.' },
  { id: 'f10', category: 'Documents', question: 'Où puis-je retrouver mes documents personnels ?', answer: 'Tous vos documents liés à vos dossiers sont disponibles dans votre espace client, rubrique « Mes documents ».' },
  { id: 'f11', category: 'Visites', question: 'Comment planifier une visite ?', answer: 'Depuis la fiche du bien, cliquez sur « Prendre rendez-vous », choisissez une date, une heure, puis confirmez vos coordonnées.' },
  { id: 'f12', category: 'Visites', question: 'Les visites virtuelles remplacent-elles une visite physique ?', answer: 'Elles permettent une première sélection à distance, mais nous recommandons une visite physique avant toute décision d’achat.' },
]

export const events: EventItem[] = [
  { id: 'e1', title: 'Inauguration Cité Atlantide', date: '2026-10-18', location: 'Bingerville', category: 'Inauguration',
    image: img('photo-1600585154340-be6161a56a0c'), description: 'Cérémonie d’inauguration officielle du programme Cité Atlantide.' },
  { id: 'e2', title: 'Salon de l’Habitat Abidjan 2026', date: '2026-11-05', location: 'Palais de la Culture, Abidjan', category: 'Salon',
    image: img('photo-1497366811353-6870744d04b2'), description: 'Akwaba Immobilier présente ses programmes sur son stand au Salon de l’Habitat.' },
  { id: 'e3', title: 'Conférence — Investir dans le foncier ivoirien', date: '2026-09-28', location: 'Hôtel Ivoire, Abidjan', category: 'Conférence',
    image: img('photo-1460317442991-0ec209397118'), description: 'Une conférence pour comprendre les opportunités et précautions liées à l’investissement foncier.' },
  { id: 'e4', title: 'Visite de chantier — Andou-M’Batto', date: '2026-10-02', location: 'Anyama', category: 'Visite de chantier',
    image: img('photo-1600047509807-ba8f99d2cdde'), description: 'Journée portes ouvertes sur le chantier de la Résidence Andou-M’Batto.' },
  { id: 'e5', title: 'Petit-déjeuner partenaires', date: '2026-09-20', location: 'Cocody, Abidjan', category: 'Partenaires',
    image: img('photo-1497366216548-37526070297c'), description: 'Rencontre annuelle avec nos partenaires banques, notaires et promoteurs.' },
]

export const jobOpenings: JobOpening[] = [
  { id: 'j1', title: 'Conseiller(ère) immobilier', department: 'Commercial', location: 'Abidjan — Cocody', contract: 'CDI', description: 'Accompagner nos clients dans leurs projets d’achat, de vente et de location.' },
  { id: 'j2', title: 'Chargé(e) de gestion locative', department: 'Gestion', location: 'Abidjan — Plateau', contract: 'CDI', description: 'Gérer un portefeuille de biens en location pour le compte de propriétaires.' },
  { id: 'j3', title: 'Juriste immobilier', department: 'Juridique', location: 'Abidjan', contract: 'CDI', description: 'Sécuriser juridiquement les transactions et accompagner les équipes commerciales.' },
  { id: 'j4', title: 'Conducteur(trice) de travaux', department: 'Technique', location: 'Bingerville', contract: 'CDI', description: 'Superviser l’exécution des chantiers de nos programmes immobiliers.' },
  { id: 'j5', title: 'Stagiaire Marketing Digital', department: 'Communication', location: 'Abidjan', contract: 'Stage', description: 'Contribuer à la stratégie de contenus, réseaux sociaux et Akwaba TV.' },
]

export const partners: Partner[] = [
  { id: 'pt1', category: 'Banques', name: 'NSIA Banque' },
  { id: 'pt2', category: 'Banques', name: 'Ecobank Côte d’Ivoire' },
  { id: 'pt3', category: 'Assurances', name: 'SUNU Assurances' },
  { id: 'pt4', category: 'Notaires', name: 'Étude Notariale du Plateau' },
  { id: 'pt5', category: 'Architectes', name: 'Atelier d’Architecture Ivoire' },
  { id: 'pt6', category: 'Entreprises de construction', name: 'BTP Excellence CI' },
  { id: 'pt7', category: 'Promoteurs', name: 'Ivoire Habitat Promotion' },
  { id: 'pt8', category: 'Investisseurs', name: 'Fonds Akwaba Capital' },
  { id: 'pt9', category: 'Partenaires institutionnels', name: 'Chambre de Commerce de Côte d’Ivoire' },
  { id: 'pt10', category: 'Banques', name: 'Banque Atlantique' },
]

export const keyStats = [
  { label: 'Années d’expertise', value: '15+' },
  { label: 'Métiers immobiliers', value: '06' },
  { label: 'Biens commercialisés', value: '1 200+' },
  { label: 'Clients accompagnés', value: '3 400+' },
  { label: 'Projets livrés', value: '18' },
  { label: 'Villes couvertes', value: '14' },
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

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getVideoBySlug(slug: string): VideoItem | undefined {
  return videos.find((v) => v.slug === slug)
}

export function getAgentById(id: string): TeamMember | undefined {
  return agents.find((a) => a.id === id)
}

export function similarProperties(property: Property, count = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.city === property.city))
    .slice(0, count)
}

export function propertyPriceDisplay(property: Property): string {
  const prefix = property.priceLabel ? `${property.priceLabel} ` : ''
  const suffix = property.priceLabel && property.priceLabel.startsWith('/') ? '' : ''
  if (property.priceLabel?.startsWith('/')) {
    return `${formatFCFA(property.price)} ${property.priceLabel}`
  }
  return `${prefix}${formatFCFA(property.price)}${suffix}`
}
