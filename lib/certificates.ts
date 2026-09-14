// KÔSMÉA — Certificats d'authenticité
//
// Chaque certificat correspond à un exemplaire physique d'un produit (sac,
// chaussure…) sur lequel un QR code est imprimé. Le QR pointe vers une page
// publique /certificat/[code] qui affiche une dédicace personnalisée pour le
// client final : nom & prénom, message personnalisé, logo de l'entreprise et
// mot de remerciement.

export interface Certificate {
  id: string
  code: string
  productId: string
  customerFirstName: string
  customerLastName: string
  message: string
  thankYou: string
  issuedAt: string
}

export function generateCertificateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `KSM-${code}`
}

export const defaultThankYou =
  "Merci d'avoir choisi KÔSMÉA. Chaque pièce est vérifiée par nos artisans partenaires pour vous garantir une authenticité et une qualité irréprochables."

export const seedCertificates: Certificate[] = []

export function certificateUrl(code: string): string {
  return `/certificat/${encodeURIComponent(code)}`
}
