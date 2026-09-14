import type { Product } from '@/lib/data'
import type { AvatarConfig } from '@/lib/store'
import { colorNameToHex } from '@/lib/utils'

/** Calcule un aperçu du mannequin avec la couleur du produit appliquée,
 * sans jamais modifier la configuration enregistrée de l'utilisateur. */
export function applyProductToAvatar(product: Product, config: AvatarConfig): AvatarConfig {
  const next = { ...config }

  if (product.category === 'beaute' && product.shade) {
    const hex = product.shade.hex
    if (product.subcategory === 'Blush') next.blushShade = hex
    else if (product.subcategory === 'Fard à paupières') next.eyeshadowShade = hex
    else if (product.subcategory === 'Fond de teint') next.foundationShade = hex
    else next.lipstickShade = hex
  } else if (product.category === 'cheveux') {
    next.hairColor = colorNameToHex(product.colors?.[0], config.hairColor)
  } else if (product.category === 'mode' || product.category === 'accessoires') {
    next.outfitColor = colorNameToHex(product.colors?.[0], config.outfitColor)
  }

  return next
}
